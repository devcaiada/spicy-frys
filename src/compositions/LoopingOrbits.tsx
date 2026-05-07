import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Canvas} from '../components/Canvas';
import {OrbitingDot} from '../components/OrbitingDot';
import {TitleLockup} from '../components/TitleLockup';
import {loopProgress, wave} from '../lib/animation';

type LoopingOrbitsProps = {
  title: string;
  accent: string;
};

export const LoopingOrbits = ({title, accent}: LoopingOrbitsProps) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = loopProgress(frame, durationInFrames);
  const pulse = 1 + wave(progress, 0.035);

  return (
    <Canvas>
      <AbsoluteFill className="orbit-stage">
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />
        <OrbitingDot
          progress={progress}
          radius={310}
          size={52}
          color={accent}
        />
        <OrbitingDot
          progress={progress}
          radius={210}
          size={34}
          color="#ffd166"
          offset={0.38}
        />
        <OrbitingDot
          progress={progress}
          radius={132}
          size={24}
          color="#4ecdc4"
          offset={0.72}
        />
        <TitleLockup title={title} accent={accent} scale={pulse} />
      </AbsoluteFill>
    </Canvas>
  );
};
