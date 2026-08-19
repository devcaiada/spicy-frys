import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loopProgress, wave} from '../../lib/animation';

export const GlowLayer = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = loopProgress(frame, durationInFrames);
  const pulse = interpolate(wave(progress, 1), [-1, 1], [0.45, 0.68]);

  return (
    <AbsoluteFill
      className="cassette-glow-layer"
      style={{
        opacity: pulse,
      }}
    >
      <div className="cassette-glow cassette-glow--amber" />
      <div className="cassette-glow cassette-glow--red" />
      <div className="cassette-glow cassette-glow--rim" />
    </AbsoluteFill>
  );
};
