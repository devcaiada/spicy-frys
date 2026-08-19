import {Composition} from 'remotion';
import {CassetteLoopScene} from './compositions/CassetteLoopScene';
import {LoopingOrbits} from './compositions/LoopingOrbits';
import {SpicyFrysMetalFi} from './compositions/SpicyFrysMetalFi';
import {SHORTS_CONFIG, SpicyFrysShorts} from './compositions/SpicyFrysShorts';
import {CASSETTE_VIDEO} from './config/cassette';
import {METALFI_TOTAL_DURATION_IN_FRAMES, METALFI_VIDEO} from './config/metalfi';
import {LOOPING_VIDEOS} from './config/spicyFrysAssets';
import {VIDEO} from './config/video';
import './styles/global.css';

// Short 1 Curated Clips (Act I & II: World Building & Diplomatic Lobbying)
const SHORT_1_CLIPS = LOOPING_VIDEOS.slice(0, 10);

// Short 2 Curated Clips (Act III & IV: Labor, Mummies, Chaos & Guitar Solo Climax)
const SHORT_2_CLIPS = LOOPING_VIDEOS.slice(8);

export const RemotionRoot = () => {
  return (
    <>
      {/* Main 16:9 Full Music Video */}
      <Composition
        id="SpicyFrysMetalFi"
        component={SpicyFrysMetalFi}
        durationInFrames={METALFI_TOTAL_DURATION_IN_FRAMES}
        fps={METALFI_VIDEO.fps}
        width={METALFI_VIDEO.width}
        height={METALFI_VIDEO.height}
      />

      {/* YouTube Short 1: 9:16 (Opening & Corporate Lobbying) */}
      <Composition
        id="IntergalacticLobbyistsShort1"
        component={SpicyFrysShorts}
        durationInFrames={SHORTS_CONFIG.totalDurationInFrames}
        fps={SHORTS_CONFIG.fps}
        width={SHORTS_CONFIG.width}
        height={SHORTS_CONFIG.height}
        defaultProps={{
          musicOffsetFrame: 0,
          customClips: SHORT_1_CLIPS,
          minCutSeconds: 3,
          maxCutSeconds: 5,
        }}
      />

      {/* YouTube Short 2: 9:16 (Climax, Guitar Solo & Obelisk Shred) */}
      <Composition
        id="IntergalacticLobbyistsShort2"
        component={SpicyFrysShorts}
        durationInFrames={SHORTS_CONFIG.totalDurationInFrames}
        fps={SHORTS_CONFIG.fps}
        width={SHORTS_CONFIG.width}
        height={SHORTS_CONFIG.height}
        defaultProps={{
          musicOffsetFrame: 3350, // Best guitar solo / climax section
          customClips: SHORT_2_CLIPS,
          minCutSeconds: 2.5,
          maxCutSeconds: 5,
        }}
      />

      {/* Auxiliary scenes */}
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
