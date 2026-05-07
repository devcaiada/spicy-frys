import {circlePoint} from '../lib/animation';

type OrbitingDotProps = {
  progress: number;
  radius: number;
  size: number;
  color: string;
  offset?: number;
};

export const OrbitingDot = ({
  progress,
  radius,
  size,
  color,
  offset = 0,
}: OrbitingDotProps) => {
  const point = circlePoint(progress, radius, offset);

  return (
    <div
      className="orbiting-dot"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        transform: `translate(${point.x}px, ${point.y}px)`,
      }}
    />
  );
};
