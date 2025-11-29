# Service Call Analysis Dashboard

Interactive static dashboard for the HVAC service call (`39472_N_Darner_Dr_2.m4a`). It shows:
- Transcript with speaker labels (technician vs customer) and downloadable text.
- Call structure radar chart for stage effectiveness.
- Sales insights and next-step actions.
- Emotion sentiment donuts per speaker, with click-to-drill into timestamped samples and audio snippets.
- Timeline of key moments.

## How to replicate locally
```bash
# 1) Activate venv (Python 3.11)
source .venv/bin/activate

# 2) Install deps (FFmpeg must be installed separately)
pip install -r requirements.txt

# 3) (Optional) Re-transcribe audio to refresh JSON/timestamps
whisper 39472_N_Darner_Dr_2.m4a \
  --model small --language en --output_format json \
  --verbose False --fp16 False --threads 4

# 4) Regenerate human-readable transcripts
python scripts/generate_chatgpt_prompt.py   # if you need a prompt for labeling
# OR rebuild the timestamped view directly:
python - <<'PY'
import json; from pathlib import Path
fmt=lambda t:f"{int(t//3600):02d}:{int(t//60%60):02d}:{int(t%60):02d}"
data=json.load(open("39472_N_Darner_Dr_2.json"))
lines=[f"[{fmt(seg['start'])}-{fmt(seg['end'])}] {seg['text'].strip()}" for seg in data["segments"]]
Path("data/transcript_with_timestamps.txt").write_text("\n".join(lines))
PY

# 5) Run the site
python -m http.server 8000
# then open http://localhost:8000
```

### Speaker labels / LLM tagging
- API path: set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) in `.env`, then run `python scripts/llm_speaker_tag.py`.
- Manual path: `python scripts/generate_chatgpt_prompt.py`, paste into ChatGPT, save JSON to `data/transcript_with_speakers.json`, then rebuild `data/transcript_with_speakers.txt` with the snippet above.

### Emotion analysis
Run `python scripts/emotion_analysis.py` to refresh `data/emotion_analysis.json` for the donut charts and drill-down samples.

### Deploy (static)
No build step. Serve the repo root via any static host (Vercel, Netlify, GitHub Pages). Keep `data/` and the audio file alongside `index.html` so relative fetches work.
