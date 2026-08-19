import {AbsoluteFill, Audio, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import React, {useMemo} from 'react';
import {createAggressiveStaticDataUri} from '../../lib/audio';

const {fontFamily: antonFont} = loadAnton();

type SovietOutroProps = {
  durationInFrames: number;
};

/**
 * SovietOutro - Crucial Final Step
 *
 * Requirements:
 * 1. Displays the brutalist Cyrillic title "Спайси Фрайс" on screen.
 * 2. Plays heavy, aggressive audio static noise burst.
 * 3. Immediately followed by a hard cut to black, ending the transmission abruptly.
 */
export const SovietOutro: React.FC<SovietOutroProps> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isPortrait = height > width;

  const aggressiveStaticSrc = useMemo(
    () => createAggressiveStaticDataUri(Math.max(1, durationInFrames / fps)),
    [durationInFrames, fps],
  );

  // Text title reveals abruptly, jitters slightly, then cuts off to black at the end
  const blackCutFrame = durationInFrames - 2; // Hard cut to black on final frames
  const isCutToBlack = frame >= blackCutFrame;

  // Harsh text jitter & flicker
  const jitterX = Math.sin(frame * 18.2) * 5 + (Math.random() - 0.5) * 6;
  const jitterY = Math.cos(frame * 14.7) * 3;
  const glitchOpacity = Math.sin(frame * 2.4) > 0.95 ? 0.4 : 1;

  if (isCutToBlack) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#000000',
        }}
      />
    );
  }

  const titleFontSize = isPortrait ? '68px' : '110px';
  const titleLetterSpacing = isPortrait ? '6px' : '14px';
  const boxPadding = isPortrait ? '24px 24px' : '28px 64px';
  const stampFontSize = isPortrait ? '14px' : '18px';
  const sealFontSize = isPortrait ? '13px' : '15px';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0e1112',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Calibrated comfortable audio static sound effect */}
      <Audio src={aggressiveStaticSrc} volume={0.12} />

      {/* Industrial brutalist grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(215, 206, 178, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215, 206, 178, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Outer brutalist border box */}
      <div
        style={{
          border: '4px solid #d7ceb2',
          padding: boxPadding,
          maxWidth: isPortrait ? '92%' : 'auto',
          backgroundColor: 'rgba(24, 28, 30, 0.88)',
          boxShadow: '0 0 35px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(0, 0, 0, 0.8)',
          transform: `translate(${jitterX}px, ${jitterY}px)`,
          opacity: glitchOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '12px',
        }}
      >
        {/* Top Soviet department stamp */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: stampFontSize,
            letterSpacing: isPortrait ? '3px' : '6px',
            color: '#a89f81',
            textTransform: 'uppercase',
          }}
        >
          МИНИСТЕРСТВО ТЯЖЕЛОГО ПАНКА
        </div>

        {/* Main "Спайси Фрайс" Title */}
        <h1
          style={{
            fontFamily: `${antonFont}, 'Impact', sans-serif`,
            fontSize: titleFontSize,
            letterSpacing: titleLetterSpacing,
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1,
            color: '#ede8d0',
            textShadow: `
              3px 0 0 rgba(255, 40, 40, 0.75),
              -3px 0 0 rgba(40, 200, 255, 0.75),
              0 0 15px rgba(237, 232, 208, 0.4)
            `,
          }}
        >
          Спайси Фрайс
        </h1>

        {/* Bottom classification seal */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: sealFontSize,
            letterSpacing: isPortrait ? '2px' : '4px',
            color: '#c2593f',
            fontWeight: 'bold',
          }}
        >
          СЕРИЯ № 84-ПНК // КОНЕЦ ПЕРЕДАЧИ
        </div>
      </div>
    </AbsoluteFill>
  );
};
