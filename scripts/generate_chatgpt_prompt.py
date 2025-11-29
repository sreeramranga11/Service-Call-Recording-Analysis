"""
Generate a ready-to-paste ChatGPT prompt with labeling instructions and the full segments list.

Usage:
  source .venv/bin/activate
  python scripts/generate_chatgpt_prompt.py

Outputs:
  - data/chatgpt_speaker_prompt.txt
    Copy/paste this into ChatGPT, wait for the JSON response, and save that
    response as data/transcript_with_speakers.json. Then run the merge script
    from README to build data/transcript_with_speakers.txt.
"""

import json
from pathlib import Path

INPUT_JSON = Path("39472_N_Darner_Dr_2.json")
OUT_PROMPT = Path("data/chatgpt_speaker_prompt.txt")

INSTRUCTIONS = """You are labeling HVAC call transcript segments as either “Technician” or “Customer”.

Rules:
- Technician: explains options, pricing, rebates, scope, warranties, installation steps, or tries to close.
- Customer: asks/answers questions, requests emails/financing/spouse review, expresses preferences/constraints, or says yes/no.
- Keep the original order; do NOT rewrite text.
- Output ONLY JSON (no markdown): {"labels":[{"index":<int>,"start":<seconds>,"end":<seconds>,"speaker":"Technician"|"Customer"}]}

Here are the segments (index, timestamps, text):
"""


def fmt_time(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int(seconds // 60 % 60)
    s = int(seconds % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def main() -> None:
    if not INPUT_JSON.exists():
        raise SystemExit(f"Missing input {INPUT_JSON}")

    data = json.loads(INPUT_JSON.read_text())
    segments = data["segments"]

    lines = []
    lines.append(INSTRUCTIONS)
    for idx, seg in enumerate(segments):
        lines.append(f"{idx}) {fmt_time(seg['start'])}-{fmt_time(seg['end'])} {seg['text'].strip()}")

    OUT_PROMPT.write_text("\n".join(lines))
    print(f"Wrote prompt with {len(segments)} segments to {OUT_PROMPT}")


if __name__ == "__main__":
    main()
