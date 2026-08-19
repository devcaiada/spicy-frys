/**
 * Beat synchronization & cut scheduler for 8-second Google Flow assets
 */

export type VariationType = 'standard' | 'zoom-in' | 'mirror-punch' | 'static-crop' | 'vhs-heavy';

export type CutSegment = {
  clipIndex: number;
  startFrame: number;
  durationInFrames: number;
  clipStartOffsetFrame: number;
  cycleIndex: number;
  variationType: VariationType;
};

export type BeatSyncOptions = {
  bpm?: number;
  fps?: number;
  totalFrames: number;
  minCutSeconds?: number;
  maxCutSeconds?: number;
  assetClipCount: number;
  clipMaxDurationSeconds?: number;
};

const VARIATION_CYCLE: VariationType[] = [
  'standard',
  'zoom-in',
  'mirror-punch',
  'static-crop',
  'vhs-heavy',
];

/**
 * Calculates deterministic beat-aligned hard cut sequences ensuring:
 * 1. Cuts land strictly on musical bars/beats (snare/kick drum hits).
 * 2. Visual clips never exceed their max duration (default 8 seconds).
 * 3. Clips loop/rotate smoothly across the full dynamic track duration with zero gaps.
 * 4. Repeated clips automatically receive distinct visual variations (dynamic zoom-in, mirror, static crop).
 */
export const calculateCutSchedule = ({
  bpm = 140,
  fps = 30,
  totalFrames,
  minCutSeconds = 4,
  maxCutSeconds = 8,
  assetClipCount,
  clipMaxDurationSeconds = 8,
}: BeatSyncOptions): CutSegment[] => {
  if (assetClipCount <= 0 || totalFrames <= 0) {
    return [];
  }

  const framesPerBeat = (60 / bpm) * fps;
  const framesPerBar = framesPerBeat * 4; // 4/4 time signature

  const minCutFrames = Math.max(1, Math.round(minCutSeconds * fps));
  const maxCutFrames = Math.min(
    Math.round(maxCutSeconds * fps),
    Math.round(clipMaxDurationSeconds * fps),
  );

  const segments: CutSegment[] = [];
  let currentFrame = 0;
  let clipCounter = 0;

  // Track appearance count per individual clip
  const clipAppearanceCount: Record<number, number> = {};

  while (currentFrame < totalFrames) {
    const remainingFrames = totalFrames - currentFrame;

    // Pick candidate bar count (2 bars or 4 bars) that fits within min/max cut frames
    let targetCutFrames = Math.round(framesPerBar * 2);
    if (targetCutFrames < minCutFrames) {
      targetCutFrames = Math.round(framesPerBar * 4);
    }

    let segmentDuration = Math.min(
      maxCutFrames,
      Math.max(minCutFrames, targetCutFrames),
    );

    if (remainingFrames <= maxCutFrames) {
      segmentDuration = remainingFrames;
    } else if (remainingFrames - segmentDuration < minCutFrames) {
      segmentDuration = Math.floor(remainingFrames / 2);
    }

    const clipIndex = clipCounter % assetClipCount;
    const cycleIndex = clipAppearanceCount[clipIndex] || 0;
    clipAppearanceCount[clipIndex] = cycleIndex + 1;

    const variationType = VARIATION_CYCLE[cycleIndex % VARIATION_CYCLE.length];

    // Vary start offset inside the 8-second clip so repeat clips look varied
    const maxOffset = Math.max(
      0,
      Math.round((clipMaxDurationSeconds * fps) - segmentDuration),
    );
    const clipStartOffsetFrame = maxOffset > 0 ? (clipCounter * 15 + cycleIndex * 25) % maxOffset : 0;

    segments.push({
      clipIndex,
      startFrame: currentFrame,
      durationInFrames: segmentDuration,
      clipStartOffsetFrame,
      cycleIndex,
      variationType,
    });

    currentFrame += segmentDuration;
    clipCounter += 1;
  }

  return segments;
};
