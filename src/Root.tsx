import {Composition} from 'remotion';
import {LoopingOrbits} from './compositions/LoopingOrbits';
import {VIDEO} from './config/video';
import './styles/global.css';

export const RemotionRoot = () => {
  return (
    <Composition
      id="LoopingOrbits"
      component={LoopingOrbits}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      defaultProps={{
        title: 'Spicy Frys',
        accent: '#ff5a1f',
      }}
    />
  );
};
