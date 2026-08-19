import {Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';
import {MUSIC_TRACKS} from '../../config/spicyFrysAssets';
import {createHissDataUri, createStartupDataUri} from '../../lib/audio';

type AudioManagerProps = {
  introDurationInFrames: number;
  musicStartFrame: number;
  musicDurationInFrames: number;
};

const hissSrc = createHissDataUri();
const startupSrc = createStartupDataUri();

export const AudioManager: React.FC<AudioManagerProps> = ({
  introDurationInFrames,
  musicStartFrame,
  musicDurationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const introFadeIn = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const introFadeOut = interpolate(
    frame,
    [Math.max(1, introDurationInFrames - 15), Math.max(2, introDurationInFrames)],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <>
      {/* Optional Intro cold tape hiss and relay click (only if introDurationInFrames > 0) */}
      {introDurationInFrames > 0 && (
        <Sequence from={0} durationInFrames={introDurationInFrames}>
          <Audio src={hissSrc} volume={0.3 * introFadeIn * introFadeOut} loop />
          <Audio src={startupSrc} volume={0.75 * introFadeIn} startFrom={0} />
        </Sequence>
      )}

      {/* Suno AI Punk / Heavy Metal Track */}
      {MUSIC_TRACKS.length > 0 && (
        <Sequence from={musicStartFrame} durationInFrames={musicDurationInFrames}>
          <Audio
            src={staticFile(MUSIC_TRACKS[0])}
            volume={0.95}
            loop={MUSIC_TRACKS.length === 1}
          />
        </Sequence>
      )}
    </>
  );
};
