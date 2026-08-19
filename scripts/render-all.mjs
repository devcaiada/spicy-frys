import {execFileSync} from 'node:child_process';

execFileSync('node', ['scripts/sync-assets.mjs'], {stdio: 'inherit'});

const compositions = ['SpicyFrysMetalFi', 'LoopingOrbits', 'CassetteLoopScene'];

for (const composition of compositions) {
  execFileSync(
    'npx',
    [
      'remotion',
      'render',
      'src/index.ts',
      composition,
      `renders/${composition}.mp4`,
    ],
    {stdio: 'inherit'},
  );
}
