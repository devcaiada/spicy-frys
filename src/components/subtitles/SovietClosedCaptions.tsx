import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import React, {useMemo} from 'react';

export type LyricSubtitle = {
  id?: number;
  start: number;
  end: number;
  startFrame: number;
  endFrame: number;
  text: string;
};

type SovietClosedCaptionsProps = {
  lyrics?: readonly LyricSubtitle[];
  musicOffsetFrame?: number;
};

/**
 * SovietClosedCaptions - 80s Eastern Bloc Teletext / CCTV Closed Captions
 *
 * Visual Identity:
 * - Faded chalk-white monospace text
 * - Solid brutalist dark rectangular ribbon
 * - Responsive safe zones for both 16:9 Widescreen and 9:16 YouTube Shorts
 * - Integrates seamlessly under SovietCRTWrapper
 */
export const SovietClosedCaptions: React.FC<SovietClosedCaptionsProps> = ({
  lyrics = [],
  musicOffsetFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isPortrait = height > width;

  // Active subtitle for current timeline frame
  const currentSubtitle = useMemo(() => {
    if (!lyrics || lyrics.length === 0) return null;

    return lyrics.find((item) => {
      const adjustedStart = item.startFrame - musicOffsetFrame;
      const adjustedEnd = item.endFrame - musicOffsetFrame;
      return frame >= adjustedStart && frame <= adjustedEnd;
    });
  }, [lyrics, frame, musicOffsetFrame]);

  if (!currentSubtitle || !currentSubtitle.text.trim()) {
    return null;
  }

  // Positioning & Typography responsive to aspect ratio
  const containerBottom = isPortrait ? '280px' : '72px';
  const fontSize = isPortrait ? '28px' : '26px';
  const padding = isPortrait ? '14px 22px' : '12px 28px';
  const maxWidth = isPortrait ? '88%' : '78%';

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: containerBottom,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth,
          backgroundColor: 'rgba(10, 12, 14, 0.92)',
          border: '2px solid rgba(215, 206, 178, 0.35)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.85)',
          padding,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', 'Lucida Console', 'Liberation Mono', monospace",
            fontWeight: 800,
            fontSize,
            color: '#ede8d0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            lineHeight: 1.25,
            textShadow: '0 0 8px rgba(237, 232, 208, 0.3)',
          }}
        >
          {currentSubtitle.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
