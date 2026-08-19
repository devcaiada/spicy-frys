import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CassetteBody} from '../components/cassette/CassetteBody';
import {CRTOverlay} from '../components/cassette/CRTOverlay';
import {GlowLayer} from '../components/cassette/GlowLayer';
import {ReelLeft} from '../components/cassette/ReelLeft';
import {ReelRight} from '../components/cassette/ReelRight';
import {loopProgress, wave} from '../lib/animation';

export const CassetteLoopScene = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = loopProgress(frame, durationInFrames);
  const driftX = wave(progress, 12, 0.08);
  const driftY = wave(progress, 7, 0.32);
  const scale = interpolate(wave(progress, 1, 0.18), [-1, 1], [0.992, 1.008]);
  const analogSkew = wave(progress * 2, 0.08, 0.41);

  return (
    <AbsoluteFill className="cassette-scene">
      <GlowLayer />
      <AbsoluteFill
        className="cassette-camera"
        style={{
          transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale}) skewX(${analogSkew}deg)`,
        }}
      >
        <div className="cassette-rig">
          <div className="cassette-shadow" />
          <CassetteBody />
          <ReelLeft />
          <ReelRight />
        </div>
      </AbsoluteFill>
      <CRTOverlay />
    </AbsoluteFill>
  );
};
