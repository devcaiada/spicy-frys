import {execFileSync} from 'node:child_process';

const compositions = ['LoopingOrbits'];

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
