import {DETECTED_AUDIO_DURATION_IN_FRAMES, SONG_TITLE} from './spicyFrysAssets';

export const METALFI_VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  bpm: 140, // High-energy punk tempo
  introDurationInFrames: 0, // Direct start: NO INTRO, starts immediately at frame 0
  mainDurationInFrames: DETECTED_AUDIO_DURATION_IN_FRAMES || 5194, // Dynamic based on Suno track
  outroDurationInFrames: 90, // 3s brutalist "Спайси Фрайс" + static burst + hard cut to black
  minCutSeconds: 4,
  maxCutSeconds: 8,
  songTitle: SONG_TITLE,
} as const;

export const METALFI_TOTAL_DURATION_IN_FRAMES =
  METALFI_VIDEO.introDurationInFrames +
  METALFI_VIDEO.mainDurationInFrames +
  METALFI_VIDEO.outroDurationInFrames;
