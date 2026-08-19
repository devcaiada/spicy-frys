import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loopProgress, wave} from '../../lib/animation';
import {Reel} from './Reel';

export const ReelLeft = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const loopedFrame = frame % durationInFrames;
  const progress = loopProgress(frame, durationInFrames);
  const rotation = interpolate(
    loopedFrame,
    [0, durationInFrames],
    [0, 720],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const wobble = wave(progress, 1.15, 0.1) + wave(progress * 3, 0.34, 0.18);

  return <Reel angle={rotation + wobble} className="cassette-reel--left" tone="left" />;
};
