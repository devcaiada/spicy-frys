export const loopProgress = (frame: number, durationInFrames: number) => {
  return (frame % durationInFrames) / durationInFrames;
};

export const wave = (progress: number, amplitude = 1, offset = 0) => {
  return Math.sin((progress + offset) * Math.PI * 2) * amplitude;
};

export const circlePoint = (
  progress: number,
  radius: number,
  offset = 0,
) => {
  const angle = (progress + offset) * Math.PI * 2;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};
