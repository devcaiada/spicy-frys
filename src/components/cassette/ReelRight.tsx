import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loopProgress, wave} from '../../lib/animation';
import {Reel} from './Reel';

export const ReelRight = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const loopedFrame = frame % durationInFrames;
  const progress = loopProgress(frame, durationInFrames);
  const rotation = interpolate(
    loopedFrame,
    [0, durationInFrames],
    [0, -1080],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const wobble = wave(progress, 0.88, 0.62) + wave(progress * 2, 0.28, 0.08);

  return <Reel angle={rotation + wobble} className="cassette-reel--right" tone="right" />;
};
