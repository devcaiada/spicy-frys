import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type CRTOverlayProps = {
  intensity?: number;
};

export const CRTOverlay = ({intensity = 1}: CRTOverlayProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const flicker = interpolate(
    Math.sin((frame / fps) * Math.PI * 2 * 19) +
      Math.sin((frame / fps) * Math.PI * 2 * 7.5) * 0.42,
    [-1.42, 1.42],
    [0.82, 1.18],
  );
  const roll = (frame * 1.3) % 100;

  return (
    <AbsoluteFill
      className="metalfi-crt"
      style={{opacity: 0.58 * intensity * flicker}}
    >
      <div
        className="metalfi-crt__scanlines"
        style={{backgroundPositionY: `${roll}%`}}
      />
      <div className="metalfi-crt__chromatic" />
      <div className="metalfi-crt__vignette" />
    </AbsoluteFill>
  );
};
