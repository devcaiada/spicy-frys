#!/usr/bin/env python3
"""
Spicy Frys - Whisper Lyrics & Closed Caption Transcriber
Transcribes Suno AI heavy-metal/punk tracks and outputs synchronized JSON subtitles.
"""

import sys
import os
import json
import argparse
from pathlib import Path

def get_audio_files(music_dir: Path):
    valid_exts = {".wav", ".mp3", ".ogg", ".flac", ".m4a"}
    return [p for p in music_dir.iterdir() if p.suffix.lower() in valid_exts and not p.name.startswith(".")]

def main():
    parser = argparse.ArgumentParser(description="Transcribe music track lyrics with Whisper to JSON format.")
    parser.add_argument("--audio", type=str, help="Path to specific audio file. If omitted, scans assets/musics/ automatically.")
    parser.add_argument("--model", type=str, default="small", help="Whisper model size (tiny, base, small, medium, large-v3). Default: small")
    parser.add_argument("--device", type=str, default="auto", help="Compute device (auto, cpu, cuda). Default: auto")
    parser.add_argument("--fps", type=int, default=30, help="Target video FPS for frame calculation. Default: 30")
    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent
    music_dir = project_root / "assets" / "musics"
    lyrics_dir = project_root / "assets" / "lyrics"
    lyrics_dir.mkdir(parents=True, exist_ok=True)

    if args.audio:
        audio_path = Path(args.audio)
        if not audio_path.is_absolute():
            audio_path = project_root / audio_path
    else:
        if not music_dir.exists():
            print(f"[Error] Music directory not found at {music_dir}")
            sys.exit(1)
        audio_files = get_audio_files(music_dir)
        if not audio_files:
            print(f"[Error] No audio files found in {music_dir}")
            sys.exit(1)
        audio_path = audio_files[0]

    song_title = audio_path.stem
    output_json = lyrics_dir / f"{song_title}.json"
    prompt_txt = lyrics_dir / f"{song_title}.txt"

    print(f"==================================================")
    print(f"🎵 Spicy Frys - Transcribing Lyrics: '{song_title}'")
    print(f"📁 Audio Input: {audio_path.name}")
    print(f"📄 Output JSON: {output_json}")
    print(f"==================================================")

    initial_prompt = None
    if prompt_txt.exists():
        initial_prompt = prompt_txt.read_text(encoding="utf-8").strip()
        print(f"💡 Found lyrics guide prompt in '{prompt_txt.name}' ({len(initial_prompt)} chars).")

    # Attempt faster-whisper first, then standard openai-whisper
    segments_data = []

    try:
        from faster_whisper import WhisperModel
        print(f"🚀 Initializing faster-whisper (model='{args.model}', device='{args.device}')...")
        device = "cuda" if args.device == "cuda" else ("cpu" if args.device == "cpu" else "auto")
        compute_type = "float16" if device == "cuda" else "int8"
        model = WhisperModel(args.model, device=device, compute_type=compute_type)

        segments, info = model.transcribe(
            str(audio_path),
            beam_size=5,
            initial_prompt=initial_prompt,
            vad_filter=True,
            vad_parameters=dict(min_silence_duration_ms=500),
        )

        print(f"Detected language: '{info.language}' (probability {info.language_probability:.2f})")

        for idx, segment in enumerate(segments):
            text = segment.text.strip().upper()
            if not text:
                continue
            start = round(segment.start, 2)
            end = round(segment.end, 2)
            start_frame = int(round(start * args.fps))
            end_frame = int(round(end * args.fps))

            segments_data.append({
                "id": idx,
                "start": start,
                "end": end,
                "startFrame": start_frame,
                "endFrame": end_frame,
                "text": text
            })
            print(f"  [{start:05.2f}s -> {end:05.2f}s | Frame {start_frame:04d}-{end_frame:04d}]: {text}")

    except ImportError:
        try:
            import whisper
            print(f"🚀 Initializing openai-whisper (model='{args.model}')...")
            model = whisper.load_model(args.model)
            result = model.transcribe(
                str(audio_path),
                initial_prompt=initial_prompt,
                verbose=False
            )
            for idx, segment in enumerate(result.get("segments", [])):
                text = segment.get("text", "").strip().upper()
                if not text:
                    continue
                start = round(segment.get("start", 0), 2)
                end = round(segment.get("end", 0), 2)
                start_frame = int(round(start * args.fps))
                end_frame = int(round(end * args.fps))

                segments_data.append({
                    "id": idx,
                    "start": start,
                    "end": end,
                    "startFrame": start_frame,
                    "endFrame": end_frame,
                    "text": text
                })
                print(f"  [{start:05.2f}s -> {end:05.2f}s | Frame {start_frame:04d}-{end_frame:04d}]: {text}")

        except ImportError:
            print("\n❌ Error: Neither 'faster-whisper' nor 'openai-whisper' is installed.")
            print("Please install faster-whisper by running:")
            print("   pip install faster-whisper")
            print("or install standard whisper with:")
            print("   pip install openai-whisper")
            sys.exit(1)

    # Save formatted JSON
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(segments_data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Successfully generated {len(segments_data)} lyric subtitles in:")
    print(f"   {output_json}")

if __name__ == "__main__":
    main()
