import {AbsoluteFill, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import React, {useMemo} from 'react';
import {LOOPING_VIDEOS} from '../../config/spicyFrysAssets';
import {CutSegment, calculateCutSchedule} from '../../lib/beatSync';
import {VHSSpliceTransition} from '../effects/VHSSpliceTransition';

type BeatSyncedSequencerProps = {
  durationInFrames: number;
  bpm?: number;
  minCutSeconds?: number;
  maxCutSeconds?: number;
};

const ClipRenderer: React.FC<{
  segment: CutSegment;
  videoSrc: string;
  width: number;
  height: number;
}> = ({segment, videoSrc, width, height}) => {
  const localFrame = useCurrentFrame();

  let transform = 'scale(1.03)';
  let filter = 'contrast(1.05) brightness(0.96)';

  switch (segment.variationType) {
    case 'zoom-in': {
      const zoom = interpolate(localFrame, [0, segment.durationInFrames], [1.06, 1.28], {
        extrapolateRight: 'clamp',
      });
      transform = `scale(${zoom})`;
      filter = 'contrast(1.08) brightness(0.98)';
      break;
    }
    case 'mirror-punch': {
      transform = 'scaleX(-1) scale(1.18)';
      filter = 'contrast(1.12) brightness(0.94) saturate(1.15)';
      break;
    }
    case 'static-crop': {
      transform = 'scale(1.38) translate3d(0, -2%, 0)';
      filter = 'contrast(1.14) brightness(0.92)';
      break;
    }
    case 'vhs-heavy': {
      const jitter = Math.sin(localFrame * 0.8) * 1.5;
      transform = `scale(1.14) translate3d(${jitter}px, 0, 0)`;
      filter = 'contrast(1.22) brightness(0.95) sepia(0.18)';
      break;
    }
    case 'standard':
    default: {
      transform = 'scale(1.03)';
      filter = 'contrast(1.05) brightness(0.96)';
      break;
    }
  }

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <OffthreadVideo
        src={staticFile(videoSrc)}
        startFrom={segment.clipStartOffsetFrame}
        muted
        style={{
          width,
          height,
          objectFit: 'cover',
          transform,
          filter,
        }}
      />
      {segment.variationType === 'vhs-heavy' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 2px, transparent 4px)',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export const BeatSyncedSequencer: React.FC<BeatSyncedSequencerProps> = ({
  durationInFrames,
  bpm = 140,
  minCutSeconds = 4,
  maxCutSeconds = 8,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  const segments = useMemo(() => {
    return calculateCutSchedule({
      bpm,
      fps,
      totalFrames: durationInFrames,
      minCutSeconds,
      maxCutSeconds,
      assetClipCount: Math.max(1, LOOPING_VIDEOS.length),
      clipMaxDurationSeconds: 8,
    });
  }, [bpm, fps, durationInFrames, minCutSeconds, maxCutSeconds]);

  const isCutFrame = useMemo(() => {
    return segments.some((segment) => {
      const distFromStart = Math.abs(frame - segment.startFrame);
      return distFromStart >= 0 && distFromStart <= 3 && segment.startFrame > 0;
    });
  }, [segments, frame]);

  if (LOOPING_VIDEOS.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#1b1e20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d7ceb2',
          fontFamily: 'monospace',
        }}
      >
        [ NO ASSETS FOUND ]
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      {segments.map((seg, idx) => {
        const videoSrc = LOOPING_VIDEOS[seg.clipIndex];

        return (
          <Sequence
            key={`${seg.startFrame}-${idx}`}
            from={seg.startFrame}
            durationInFrames={seg.durationInFrames}
          >
            <ClipRenderer
              segment={seg}
              videoSrc={videoSrc}
              width={width}
              height={height}
            />
          </Sequence>
        );
      })}

      <VHSSpliceTransition active={isCutFrame} intensity={1.1} />
    </AbsoluteFill>
  );
};
