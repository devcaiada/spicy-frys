import {execSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

console.log('[render-shorts] Synchronizing assets...');
execSync('node scripts/sync-assets.mjs', {stdio: 'inherit', cwd: projectRoot});

const {SONG_TITLE} = await import('../src/config/spicyFrysAssets.ts');
const cleanTitle = (SONG_TITLE || 'Spicy_Frys').trim();
const outputDir = path.join(projectRoot, 'renders');
mkdirSync(outputDir, {recursive: true});

const short1Path = path.join(outputDir, `${cleanTitle} - Short 1.mp4`);
const short2Path = path.join(outputDir, `${cleanTitle} - Short 2.mp4`);

console.log(`\n========================================`);
console.log(`[render-shorts] 1/2: Rendering Short 1 (Opening / Lobbying) -> "${short1Path}"`);
console.log(`========================================`);
execSync(`npx remotion render src/index.ts IntergalacticLobbyistsShort1 "${short1Path}"`, {
  stdio: 'inherit',
  cwd: projectRoot,
});

console.log(`\n========================================`);
console.log(`[render-shorts] 2/2: Rendering Short 2 (Guitar Solo Climax) -> "${short2Path}"`);
console.log(`========================================`);
execSync(`npx remotion render src/index.ts IntergalacticLobbyistsShort2 "${short2Path}"`, {
  stdio: 'inherit',
  cwd: projectRoot,
});

console.log(`\n[render-shorts] All 2 YouTube Shorts (9:16) rendered successfully!`);
