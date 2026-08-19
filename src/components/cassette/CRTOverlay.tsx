import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loopProgress, wave} from '../../lib/animation';

export const CRTOverlay = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = loopProgress(frame, durationInFrames);
  const flicker = interpolate(
    wave(progress * 12, 1, 0.07) + wave(progress * 29, 0.28, 0.21),
    [-1.28, 1.28],
    [0.055, 0.115],
  );
  const roll = interpolate(frame % durationInFrames, [0, durationInFrames], [0, 42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="crt-overlay" style={{opacity: flicker}}>
      <div className="crt-overlay__scanlines" style={{backgroundPositionY: roll}} />
      <div className="crt-overlay__grain" />
      <div className="crt-overlay__vignette" />
    </AbsoluteFill>
  );
};
