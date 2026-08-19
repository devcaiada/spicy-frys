import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {LOGO_ASSET} from '../../config/spicyFrysAssets';

type LogoRevealProps = {
  durationInFrames: number;
};

export const LogoReveal = ({durationInFrames}: LogoRevealProps) => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, durationInFrames * 0.3], [32, 0], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 18, 42, durationInFrames], [0, 0.28, 1, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, durationInFrames], [0.9, 1.02], {
    extrapolateRight: 'clamp',
  });
  const glitchShift = Math.sin(frame * 0.5) * 4;
  const stretch = 1 + Math.sin(frame * 0.25) * 0.015;

  return (
    <div className="metalfi-logo" style={{opacity, transform: `translateY(${rise}px)`}}>
      <div className="metalfi-logo__bloom" />
      <div className="metalfi-logo__ring metalfi-logo__ring--outer" />
      <div className="metalfi-logo__ring metalfi-logo__ring--inner" />
      <div
        className="metalfi-logo__glitch"
        style={{transform: `translate3d(${glitchShift}px, 0, 0)`}}
      />
      <Img
        alt="Spicy Frys"
        src={staticFile(LOGO_ASSET)}
        className="metalfi-logo__image"
        style={{transform: `scale(${scale}) scaleX(${stretch})`}}
      />
    </div>
  );
};
