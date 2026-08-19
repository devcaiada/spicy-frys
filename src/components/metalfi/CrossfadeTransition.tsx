import {AbsoluteFill, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type CrossfadeTransitionProps = {
  from: string;
  to?: string;
  transitionStartFrame: number;
  transitionDurationInFrames: number;
};

export const CrossfadeTransition = ({
  from,
  to,
  transitionStartFrame,
  transitionDurationInFrames,
}: CrossfadeTransitionProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const transitionProgress = interpolate(
    frame,
    [transitionStartFrame, transitionStartFrame + transitionDurationInFrames],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const outgoingOpacity = 1 - transitionProgress;
  const incomingOpacity = transitionProgress;

  return (
    <AbsoluteFill>
      <Video
        src={staticFile(from)}
        style={{
          width,
          height,
          objectFit: 'cover',
          transform: 'scale(1.04)',
          opacity: outgoingOpacity,
        }}
        muted
        startFrom={0}
        loop
      />
      {to ? (
        <Video
          src={staticFile(to)}
          style={{
            width,
            height,
            objectFit: 'cover',
            transform: 'scale(1.045)',
            opacity: incomingOpacity,
          }}
          muted
          startFrom={0}
          loop
        />
      ) : null}
    </AbsoluteFill>
  );
};
