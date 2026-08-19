import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CRTOverlay} from './CRTOverlay';
import {GrainOverlay} from './GrainOverlay';
import {LogoReveal} from './LogoReveal';

type VHSIntroProps = {
  durationInFrames: number;
};

export const VHSIntro = ({durationInFrames}: VHSIntroProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const staticRamp = interpolate(frame, [0, fps * 0.35, fps * 1.1], [0, 1, 0.42], {
    extrapolateRight: 'clamp',
  });
  const flicker = Math.sin(frame * 1.7) * 0.02 + Math.sin(frame * 0.11) * 0.04;
  const tapeJitter = Math.sin(frame * 0.24) * 10;
  const bloom = interpolate(frame, [0, fps * 1.4, durationInFrames], [0.02, 0.14, 0.1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="metalfi-intro">
      <div
        className="metalfi-intro__static"
        style={{opacity: staticRamp, transform: `translate3d(${tapeJitter}px, 0, 0)`}}
      />
      <div
        className="metalfi-intro__bloom"
        style={{opacity: bloom, transform: `scale(${1 + bloom * 0.35})`}}
      />
      <div className="metalfi-intro__pulse" style={{opacity: 1 + flicker}} />
      <LogoReveal durationInFrames={durationInFrames} />
      <CRTOverlay intensity={1.2} />
      <GrainOverlay intensity={0.75} />
    </AbsoluteFill>
  );
};
