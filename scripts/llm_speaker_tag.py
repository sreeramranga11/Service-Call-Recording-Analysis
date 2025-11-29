"""
Use an LLM to label each Whisper segment as Technician or Customer.

Inputs:
  - 39472_N_Darner_Dr_2.json (Whisper output)
  - .env with OPENAI_API_KEY (and optionally OPENAI_MODEL, default gpt-4o-mini)

Outputs:
  - data/transcript_with_speakers.txt (time-stamped, speaker-labeled text)
  - data/transcript_with_speakers.json (array of {start,end,text,speaker})

Run:
  source .venv/bin/activate
  python scripts/llm_speaker_tag.py
"""

import json
import os
import sys
import time
from pathlib import Path
from typing import List, Dict

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()

MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
API_KEY = os.getenv("OPENAI_API_KEY")
BASE_URL = os.getenv("OPENAI_BASE_URL")
INPUT_JSON = Path("39472_N_Darner_Dr_2.json")
OUT_TXT = Path("data/transcript_with_speakers.txt")
OUT_JSON = Path("data/transcript_with_speakers.json")
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "30"))
REQUEST_TIMEOUT = float(os.getenv("OPENAI_REQUEST_TIMEOUT", "60"))


def fmt_time(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int(seconds // 60 % 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def chunk_segments(segments: List[Dict], size: int = CHUNK_SIZE) -> List[List[Dict]]:
    return [segments[i : i + size] for i in range(0, len(segments), size)]


def build_prompt(chunk: List[Dict], offset: int) -> List[Dict]:
    instructions = (
        "Label each segment as either Technician or Customer/Homeowner.\n"
        "- Technician: explains options, pricing, rebates, work scope, warranties, or closes.\n"
        "- Customer: asks/answers questions, mentions spouse/email/financing preferences, or says yes/no.\n"
        "- Keep the original order. Do not rewrite text.\n"
        "Return ONLY JSON:\n"
        "{ \"labels\": [ {\"index\": <int>, \"start\": <seconds>, \"end\": <seconds>, \"speaker\": \"Technician\"|\"Customer\"} ] }"
    )
    body_lines = []
    for i, seg in enumerate(chunk, start=offset):
        body_lines.append(f"{i}) {fmt_time(seg['start'])}-{fmt_time(seg['end'])} {seg['text'].strip()}")
    user_content = "Segments:\n" + "\n".join(body_lines)
    return [
        {"role": "system", "content": instructions},
        {"role": "user", "content": user_content},
    ]


def llm_label(client: OpenAI, segments: List[Dict]) -> List[Dict]:
    labeled = []
    start_time = time.time()
    for chunk_index, chunk in enumerate(chunk_segments(segments, size=CHUNK_SIZE)):
        start_idx = chunk_index * CHUNK_SIZE
        print(f"[chunk {chunk_index+1}/{(len(segments)+CHUNK_SIZE-1)//CHUNK_SIZE}] "
              f"calling {MODEL} for segments {start_idx}-{start_idx+len(chunk)-1}...", flush=True)
        messages = build_prompt(chunk, start_idx)
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=messages,
                response_format={"type": "json_object"},
                timeout=REQUEST_TIMEOUT,
            )
            payload = resp.choices[0].message.content
            data = []
            try:
                payload_json = json.loads(payload)
                data = payload_json.get("labels", [])
            except json.JSONDecodeError as je:
                print(f"  !! JSON decode error: {je}; raw response:\n{payload}", file=sys.stderr, flush=True)
                raise
            labeled.extend(data)
            elapsed = time.time() - start_time
            print(f"  -> received {len(data)} labels (total {len(labeled)}/{len(segments)}) "
                  f"in {elapsed:.1f}s", flush=True)
        except Exception as exc:
            print(f"  !! error on chunk {chunk_index+1}: {exc}", file=sys.stderr, flush=True)
            raise
    return labeled


def merge_labels(segments: List[Dict], labels: List[Dict]) -> List[Dict]:
    by_index = {item["index"]: item["speaker"] for item in labels}
    merged = []
    for idx, seg in enumerate(segments):
        merged.append(
            {
                "start": seg["start"],
                "end": seg["end"],
                "text": seg["text"].strip(),
                "speaker": by_index.get(idx, "Technician"),
            }
        )
    return merged


def write_outputs(labeled: List[Dict]) -> None:
    OUT_JSON.write_text(json.dumps(labeled, indent=2))
    OUT_TXT.write_text(
        "\n".join(
            f"[{fmt_time(item['start'])}-{fmt_time(item['end'])}] {item['speaker']}: {item['text']}"
            for item in labeled
        )
    )


def main() -> None:
    if not API_KEY:
        raise SystemExit("OPENAI_API_KEY not set. Add it to .env or environment.")

    if not INPUT_JSON.exists():
        raise SystemExit(f"Missing input {INPUT_JSON}")

    segments = json.loads(INPUT_JSON.read_text())["segments"]
    print(
        f"Using model={MODEL}, segments={len(segments)}, chunk_size={CHUNK_SIZE}, timeout={REQUEST_TIMEOUT}s",
        flush=True,
    )
    client_kwargs = {"api_key": API_KEY, "timeout": REQUEST_TIMEOUT}
    if BASE_URL:
        client_kwargs["base_url"] = BASE_URL
    client = OpenAI(**client_kwargs)

    labels = llm_label(client, segments)
    merged = merge_labels(segments, labels)
    write_outputs(merged)
    print(f"Saved {len(merged)} labeled lines to {OUT_TXT}")


if __name__ == "__main__":
    main()
