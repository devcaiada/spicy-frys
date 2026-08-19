import {execSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

// 1. Sync assets first
console.log('[render-video] Synchronizing assets...');
execSync('node scripts/sync-assets.mjs', {stdio: 'inherit', cwd: projectRoot});

// 2. Import dynamic song title
const {SONG_TITLE} = await import('../src/config/spicyFrysAssets.ts');
const cleanTitle = (SONG_TITLE || 'Spicy_Frys_Video').trim();
const outputDir = path.join(projectRoot, 'renders');
mkdirSync(outputDir, {recursive: true});

const outputPath = path.join(outputDir, `${cleanTitle}.mp4`);
console.log(`[render-video] Target output: "${outputPath}"`);

// 3. Run Remotion Render
const command = `npx remotion render src/index.ts SpicyFrysMetalFi "${outputPath}"`;
console.log(`[render-video] Executing: ${command}`);
execSync(command, {stdio: 'inherit', cwd: projectRoot});
