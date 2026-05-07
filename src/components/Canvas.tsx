import {AbsoluteFill} from 'remotion';
import type {ReactNode} from 'react';

type CanvasProps = {
  children: ReactNode;
};

export const Canvas = ({children}: CanvasProps) => {
  return (
    <AbsoluteFill className="canvas">
      <div className="canvas__glow canvas__glow--warm" />
      <div className="canvas__glow canvas__glow--cool" />
      {children}
    </AbsoluteFill>
  );
};
