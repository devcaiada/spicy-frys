import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import React from 'react';

type VHSSpliceTransitionProps = {
  active: boolean;
  intensity?: number;
};

/**
 * VHS Splice / Channel Drop effect simulating faulty magnetic tape splices
 * on hard cut boundaries.
 */
export const VHSSpliceTransition: React.FC<VHSSpliceTransitionProps> = ({
  active,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  if (!active) {
    return null;
  }

  // Quick horizontal glitch jitter
  const glitchX = (Math.sin(frame * 12.7) * 28 + (Math.random() - 0.5) * 40) * intensity;
  const rgbShift = Math.sin(frame * 8.3) * 14 * intensity;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      {/* Tape tracking flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#e3dfd3',
          opacity: 0.22 * intensity,
          mixBlendMode: 'color-dodge',
        }}
      />

      {/* Horizontal tearing bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${(frame * 23) % 85}%`,
          height: '42px',
          backgroundColor: '#ffffff',
          opacity: 0.4 * intensity,
          transform: `translateX(${glitchX}px) skewX(${glitchX * 0.4}deg)`,
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* VHS Chromatic Split flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: `inset ${rgbShift}px 0 rgba(255, 30, 30, 0.4), inset -${rgbShift}px 0 rgba(0, 220, 255, 0.4)`,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
