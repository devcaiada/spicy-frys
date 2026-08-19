import {Composition} from 'remotion';
import {CassetteLoopScene} from './compositions/CassetteLoopScene';
import {LoopingOrbits} from './compositions/LoopingOrbits';
import {SpicyFrysMetalFi} from './compositions/SpicyFrysMetalFi';
import {CASSETTE_VIDEO} from './config/cassette';
import {METALFI_TOTAL_DURATION_IN_FRAMES, METALFI_VIDEO} from './config/metalfi';
import {VIDEO} from './config/video';
import './styles/global.css';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SpicyFrysMetalFi"
        component={SpicyFrysMetalFi}
        durationInFrames={METALFI_TOTAL_DURATION_IN_FRAMES}
        fps={METALFI_VIDEO.fps}
        width={METALFI_VIDEO.width}
        height={METALFI_VIDEO.height}
      />
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
      <Composition
        id="CassetteLoopScene"
        component={CassetteLoopScene}
        durationInFrames={CASSETTE_VIDEO.durationInFrames}
        fps={CASSETTE_VIDEO.fps}
        width={CASSETTE_VIDEO.width}
        height={CASSETTE_VIDEO.height}
      />
    </>
  );
};
