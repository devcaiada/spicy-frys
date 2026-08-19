import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import React, {useMemo} from 'react';

type NoiseCanvasOverlayProps = {
  intensity?: number;
  grainScale?: number;
};

/**
 * Procedural grain and tape noise generator powered by @remotion/noise
 * Generates analog static without needing heavy external video overlays.
 */
export const NoiseCanvasOverlay: React.FC<NoiseCanvasOverlayProps> = ({
  intensity = 0.65,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  // Low-resolution procedural grid for fast, smooth rendering
  const rows = 18;
  const cols = 24;

  const noiseBlocks = useMemo(() => {
    const blocks: {x: number; y: number; opacity: number}[] = [];
    const seed = 'soviet-vhs-noise';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = noise2D(seed, (c * 3.7 + frame * 1.8), (r * 3.7 + frame * 2.3));
        if (Math.abs(n) > 0.35) {
          blocks.push({
            x: (c / cols) * 100,
            y: (r / rows) * 100,
            opacity: Math.min(1, Math.abs(n) * 0.45 * intensity),
          });
        }
      }
    }
    return blocks;
  }, [frame, intensity, rows, cols]);

  // Animated static line jitter
  const staticBarY = (frame * 7.5) % 100;
  const staticBarOpacity = (Math.sin(frame * 0.45) > 0.6 ? 0.35 : 0.08) * intensity;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        zIndex: 50,
      }}
    >
      {/* High-frequency animated CSS grain texture */}
      <div
        className="soviet-procedural-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45 * intensity,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Procedural noise clusters */}
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.7 * intensity,
        }}
      >
        {noiseBlocks.map((b, i) => (
          <rect
            key={i}
            x={`${b.x}%`}
            y={`${b.y}%`}
            width={`${100 / cols}%`}
            height={`${100 / rows}%`}
            fill="#ffffff"
            opacity={b.opacity}
          />
        ))}
      </svg>

      {/* VHS Horizontal Tracking Bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${staticBarY}%`,
          height: '24px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          opacity: staticBarOpacity,
          filter: 'blur(1px)',
        }}
      />
    </AbsoluteFill>
  );
};
