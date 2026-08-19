import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import React from 'react';
import {SovietCRTWrapper} from '../components/effects/SovietCRTWrapper';
import {SovietOutro} from '../components/outro/SovietOutro';
import {BeatSyncedSequencer} from '../components/sequencer/BeatSyncedSequencer';
import {SovietClosedCaptions} from '../components/subtitles/SovietClosedCaptions';
import {LOOPING_VIDEOS, LYRICS_DATA, MUSIC_TRACKS} from '../config/spicyFrysAssets';

export type SpicyFrysShortsProps = {
  musicOffsetFrame?: number;
  mainDurationInFrames?: number;
  outroDurationInFrames?: number;
  bpm?: number;
  minCutSeconds?: number;
  maxCutSeconds?: number;
  customClips?: readonly string[];
};

export const SHORTS_CONFIG = {
  width: 1080,
  height: 1920, // 9:16 Vertical
  fps: 30,
  mainDurationInFrames: 840, // 28s music & visuals
  outroDurationInFrames: 60, // 2s outro
  totalDurationInFrames: 900, // 30s total
} as const;

/**
 * YouTube Shorts Composition in 9:16 Vertical (1080x1920)
 *
 * Features:
 * 1. Immediate start at frame 0.
 * 2. Visuals stretched & cropped (objectFit: cover) to fully fill 9:16 vertically.
 * 3. Fast beat-synced cuts (4-6s) with repetition variation engine.
 * 4. Soviet Brutalism CRT/VHS degradation overlay.
 * 5. Closed Captions: 80s Soviet Teletext / CCTV subtitles (synchronized to audio segment).
 * 6. Responsive Soviet Outro ("Спайси Фрайс" + calibrated static + blackout).
 */
export const SpicyFrysShorts: React.FC<SpicyFrysShortsProps> = ({
  musicOffsetFrame = 0,
  mainDurationInFrames = SHORTS_CONFIG.mainDurationInFrames,
  outroDurationInFrames = SHORTS_CONFIG.outroDurationInFrames,
  bpm = 140,
  minCutSeconds = 3,
  maxCutSeconds = 6,
  customClips = LOOPING_VIDEOS,
}) => {
  const outroStartFrame = mainDurationInFrames;

  return (
    <AbsoluteFill className="metalfi-scene">
      {/* Master Audio Track cut to the chosen punchy section */}
      {MUSIC_TRACKS.length > 0 && (
        <Sequence from={0} durationInFrames={mainDurationInFrames}>
          <Audio
            src={staticFile(MUSIC_TRACKS[0])}
            startFrom={musicOffsetFrame}
            volume={0.95}
          />
        </Sequence>
      )}

      {/* Global Soviet Brutalism CRT Degradation */}
      <SovietCRTWrapper intensity={0.92} enableNoise={true}>
        {/* Main 9:16 Visual Sequencer */}
        <Sequence from={0} durationInFrames={mainDurationInFrames}>
          <BeatSyncedSequencer
            durationInFrames={mainDurationInFrames}
            bpm={bpm}
            minCutSeconds={minCutSeconds}
            maxCutSeconds={maxCutSeconds}
            customClips={customClips}
          />
        </Sequence>

        {/* 80s Soviet Closed Captions (Active only when lyrics JSON is present) */}
        {LYRICS_DATA && LYRICS_DATA.length > 0 && (
          <Sequence from={0} durationInFrames={mainDurationInFrames}>
            <SovietClosedCaptions
              lyrics={LYRICS_DATA}
              musicOffsetFrame={musicOffsetFrame}
            />
          </Sequence>
        )}

        {/* Responsive 9:16 Soviet Outro */}
        <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
          <SovietOutro durationInFrames={outroDurationInFrames} />
        </Sequence>
      </SovietCRTWrapper>
    </AbsoluteFill>
  );
};
