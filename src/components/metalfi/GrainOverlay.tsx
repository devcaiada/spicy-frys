import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

type GrainOverlayProps = {
  intensity?: number;
};

export const GrainOverlay = ({intensity = 1}: GrainOverlayProps) => {
  const frame = useCurrentFrame();
  const animatedOpacity = interpolate(Math.sin(frame * 0.7), [-1, 1], [0.16, 0.28]);

  return (
    <AbsoluteFill
      className="metalfi-grain"
      style={{opacity: animatedOpacity * intensity}}
    />
  );
};
