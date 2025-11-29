"""
Run emotion classification over each segment and aggregate by speaker.

Model: j-hartmann/emotion-english-distilroberta-base (7 labels).
Uses text only (no audio diarization), but aggregates per speaker from the labeled JSON.

Inputs:
  - 39472_N_Darner_Dr_2.json              (Whisper output with segments)
  - data/transcript_with_speakers.json    ({"labels": [...] } or raw list)

Outputs:
  - data/emotion_analysis.json

Usage:
  source .venv/bin/activate
  python scripts/emotion_analysis.py
"""

import json
from collections import Counter, defaultdict
from pathlib import Path
from typing import Dict, List

from transformers import pipeline


INPUT_AUDIO_JSON = Path("39472_N_Darner_Dr_2.json")
INPUT_SPEAKER_JSON = Path("data/transcript_with_speakers.json")
OUT_JSON = Path("data/emotion_analysis.json")


def load_labels() -> List[Dict]:
    data = json.loads(INPUT_SPEAKER_JSON.read_text())
    if isinstance(data, dict) and "labels" in data:
        return data["labels"]
    return data


def main() -> None:
    if not INPUT_AUDIO_JSON.exists():
        raise SystemExit(f"Missing {INPUT_AUDIO_JSON}")
    if not INPUT_SPEAKER_JSON.exists():
        raise SystemExit(f"Missing {INPUT_SPEAKER_JSON}")

    segments = json.loads(INPUT_AUDIO_JSON.read_text())["segments"]
    labels = load_labels()

    emo_pipe = pipeline(
        "text-classification",
        model="j-hartmann/emotion-english-distilroberta-base",
        top_k=None,
    )

    speaker_results = defaultdict(list)
    for item in labels:
        seg = segments[item["index"]]
        text = seg["text"].strip()
        if not text:
            continue
        preds = emo_pipe(text, truncation=True)[0]
        # preds is list of dicts {label, score}
        top = max(preds, key=lambda p: p["score"])
        speaker_results[item["speaker"]].append(
            {
                "index": item["index"],
                "start": seg["start"],
                "end": seg["end"],
                "text": text,
                "top_label": top["label"],
                "top_score": round(float(top["score"]), 4),
                "all": [
                    {"label": p["label"], "score": round(float(p["score"]), 4)}
                    for p in preds
                ],
            }
        )

    summary = {}
    for speaker, entries in speaker_results.items():
        counter = Counter(e["top_label"] for e in entries)
        total = sum(counter.values())
        top3 = counter.most_common(3)
        avg_len = sum(len(e["text"].split()) for e in entries) / max(len(entries), 1)
        summary[speaker] = {
            "total_segments": total,
            "top_emotions": top3,
            "avg_segment_words": round(avg_len, 2),
        "samples": entries[:5],  # first 5 samples for quick view
      }

    OUT_JSON.write_text(
        json.dumps(
            {
                "summary": summary,
                "by_speaker": speaker_results,
            },
            indent=2,
        )
    )
    print(f"Saved emotion analysis to {OUT_JSON}")


if __name__ == "__main__":
    main()
