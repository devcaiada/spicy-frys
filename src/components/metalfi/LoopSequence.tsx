import {AbsoluteFill, Video, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {LOOPING_VIDEOS} from '../../config/spicyFrysAssets';
import {CrossfadeTransition} from './CrossfadeTransition';

type LoopSequenceProps = {
  durationInFrames: number;
  transitionDurationInFrames: number;
};

export const LoopSequence = ({durationInFrames, transitionDurationInFrames}: LoopSequenceProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const videoSlotDuration = Math.max(
    1,
    Math.floor(
      (durationInFrames - transitionDurationInFrames * (LOOPING_VIDEOS.length - 1)) /
        LOOPING_VIDEOS.length,
    ),
  );
  const slotIndex = Math.min(
    LOOPING_VIDEOS.length - 1,
    Math.floor(frame / Math.max(1, videoSlotDuration + transitionDurationInFrames)),
  );
  const currentSource = LOOPING_VIDEOS[slotIndex];
  const nextSource = LOOPING_VIDEOS[slotIndex + 1];
  const slotStart = slotIndex * (videoSlotDuration + transitionDurationInFrames);
  const transitionStartFrame = slotStart + videoSlotDuration - transitionDurationInFrames;
  const pulse = 1 + Math.sin(frame * 0.03) * 0.01;

  if (LOOPING_VIDEOS.length === 1) {
    return (
      <AbsoluteFill>
        <Video
          src={staticFile(currentSource)}
          style={{
            width,
            height,
            objectFit: 'cover',
            transform: `scale(${1.045 * pulse})`,
            filter: 'saturate(1.05) contrast(1.04) brightness(0.94)',
          }}
          muted
          startFrom={0}
          loop
        />
      </AbsoluteFill>
    );
  }

  return (
    <CrossfadeTransition
      from={currentSource}
      to={nextSource}
      transitionStartFrame={transitionStartFrame}
      transitionDurationInFrames={transitionDurationInFrames}
    />
  );
};
