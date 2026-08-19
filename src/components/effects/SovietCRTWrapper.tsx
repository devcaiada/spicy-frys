import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import React, {ReactNode} from 'react';
import {NoiseCanvasOverlay} from './NoiseCanvasOverlay';

type SovietCRTWrapperProps = {
  children: ReactNode;
  intensity?: number;
  enableNoise?: boolean;
};

/**
 * SovietCRTWrapper - Global Higher-Order Component / Layout Wrapper
 *
 * Implements 80s Eastern Bloc Soviet Brutalism visual degradation:
 * 1. Muted pastel color matrix (desaturated, warm sepia, slight green-cyan tint)
 * 2. CRT raster scanlines with vertical tracking roll
 * 3. Chromatic aberration / color bleeding
 * 4. CRT curvature vignette and subtle phosphor glow
 * 5. Procedural @remotion/noise film grain
 */
export const SovietCRTWrapper: React.FC<SovietCRTWrapperProps> = ({
  children,
  intensity = 1,
  enableNoise = true,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 60Hz CRT phosphor flicker calculation
  const flicker = interpolate(
    Math.sin((frame / fps) * Math.PI * 2 * 29.97) +
      Math.sin((frame / fps) * Math.PI * 2 * 11.5) * 0.35,
    [-1.35, 1.35],
    [0.96, 1.04],
  );

  // Scanline roll position
  const scanlineRoll = (frame * 1.6) % 100;

  return (
    <AbsoluteFill className="soviet-crt-root">
      {/* Visual Content Layer with Eastern Bloc Color Grading */}
      <AbsoluteFill
        style={{
          filter: `
            sepia(0.22)
            contrast(1.16)
            saturate(0.85)
            brightness(${0.94 * flicker})
            hue-rotate(-6deg)
          `,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* CRT Scanline Overlay */}
      <AbsoluteFill
        className="soviet-crt-scanlines"
        style={{
          backgroundPositionY: `${scanlineRoll}%`,
          opacity: 0.45 * intensity,
          pointerEvents: 'none',
        }}
      />

      {/* RGB Chromatic Aberration / Color Bleed */}
      <AbsoluteFill
        className="soviet-crt-chromatic"
        style={{
          opacity: 0.65 * intensity,
          pointerEvents: 'none',
        }}
      />

      {/* Barrel Distortion & CRT Vignette */}
      <AbsoluteFill
        className="soviet-crt-vignette"
        style={{
          opacity: 0.75 * intensity,
          pointerEvents: 'none',
        }}
      />

      {/* Procedural Tape Noise */}
      {enableNoise && <NoiseCanvasOverlay intensity={0.6 * intensity} />}
    </AbsoluteFill>
  );
};
