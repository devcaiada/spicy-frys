import {AbsoluteFill, Sequence} from 'remotion';
import React from 'react';
import {SovietCRTWrapper} from '../components/effects/SovietCRTWrapper';
import {AudioManager} from '../components/metalfi/AudioManager';
import {VHSIntro} from '../components/metalfi/VHSIntro';
import {SovietOutro} from '../components/outro/SovietOutro';
import {BeatSyncedSequencer} from '../components/sequencer/BeatSyncedSequencer';
import {METALFI_VIDEO} from '../config/metalfi';

/**
 * SpicyFrysMetalFi - Main Composition
 *
 * Pipeline:
 * 1. Direct Start: Starts immediately with music & visuals (no intro, no logo sequence).
 * 2. Visual Assembly: Curated narrative ordering of Google Flow clips with beat-synced cuts & repetition variations.
 * 3. Degradation Layer: SovietCRTWrapper (muted pastel palette, scanlines, chromatic shift, noise).
 * 4. Calibrated Outro: "Спайси Фрайс" with softened atmospheric static burst and hard cut to black.
 */
export const SpicyFrysMetalFi: React.FC = () => {
  const {
    introDurationInFrames,
    mainDurationInFrames,
    outroDurationInFrames,
    bpm,
    minCutSeconds,
    maxCutSeconds,
  } = METALFI_VIDEO;

  const mainStartFrame = introDurationInFrames;
  const outroStartFrame = introDurationInFrames + mainDurationInFrames;

  return (
    <AbsoluteFill className="metalfi-scene">
      {/* Master Audio Manager */}
      <AudioManager
        introDurationInFrames={introDurationInFrames}
        musicStartFrame={mainStartFrame}
        musicDurationInFrames={mainDurationInFrames}
      />

      {/* Global Soviet Brutalism CRT Degradation */}
      <SovietCRTWrapper intensity={0.9} enableNoise={true}>
        {introDurationInFrames > 0 && (
          <Sequence from={0} durationInFrames={introDurationInFrames}>
            <VHSIntro durationInFrames={introDurationInFrames} />
          </Sequence>
        )}

        {/* Direct video start with beat-synced narrative sequencing */}
        <Sequence from={mainStartFrame} durationInFrames={mainDurationInFrames}>
          <BeatSyncedSequencer
            durationInFrames={mainDurationInFrames}
            bpm={bpm}
            minCutSeconds={minCutSeconds}
            maxCutSeconds={maxCutSeconds}
          />
        </Sequence>

        {/* Signature Outro: "Спайси Фрайс" + atmospheric static + hard cut to black */}
        <Sequence from={outroStartFrame} durationInFrames={outroDurationInFrames}>
          <SovietOutro durationInFrames={outroDurationInFrames} />
        </Sequence>
      </SovietCRTWrapper>
    </AbsoluteFill>
  );
};
