import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

const listFilesRecursive = (dir) => {
  if (!existsSync(dir)) {
    return [];
  }

  const results = [];
  const entries = readdirSync(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }

  return results;
};

// 1. Curated Narrative Weighting for Storyboard Pacing
const narrativeKeywords = [
  // Act I: World Building & Establishing Atmosphere
  {match: /bunker|banner|monument|landscape|exterior/i, score: 10},
  {match: /crt|tv|screen|monitor|satellite/i, score: 20},
  {match: /ufo.*hovering|arrival|sky|river|pyramid/i, score: 30},
  {match: /furniture.*desert|desert.*sand/i, score: 40},

  // Act II: Diplomatic Meetings & Corporate Lobbying
  {match: /shaking.*hand|meeting|diplomat|greet/i, score: 50},
  {match: /holo|presentation|pitch/i, score: 60},
  {match: /tablet|charts|graph|metrics/i, score: 70},
  {match: /stamping|stamp|paperwork|approval/i, score: 80},

  // Act III: Corporate Monotony, Lines & Labor Overload
  {match: /workers.*sitting|office.*workers|desk/i, score: 90},
  {match: /carrying.*satellite|labor|haul/i, score: 100},
  {match: /mummies.*line|waiting.*line|queue/i, score: 110},
  {match: /dropping.*paperwork|paperwork.*drop/i, score: 120},

  // Act IV: Collapse & High-Energy Climax
  {match: /workers.*dropping|collapse|floor/i, score: 130},
  {match: /furniture.*\(1\)|wasteland/i, score: 140},
  {match: /guitar.*1434|guitar.*solo|obelisk/i, score: 150},
  {match: /guitar.*1435|shred|climax/i, score: 160},
];

const scoreAsset = (fileName) => {
  for (const rule of narrativeKeywords) {
    if (rule.match.test(fileName)) {
      return rule.score;
    }
  }
  return 100;
};

// Sync videos
const videoSourceDirs = [
  path.join(projectRoot, 'assets', 'videos'),
  path.join(projectRoot, 'assets', 'looping'),
];

let rawVideoFiles = [];
const videoDestBase = path.join(projectRoot, 'public', 'assets', 'videos');
mkdirSync(videoDestBase, {recursive: true});

for (const vDir of videoSourceDirs) {
  if (existsSync(vDir)) {
    const files = listFilesRecursive(vDir).filter((f) => /\.(mp4|mov|webm)$/i.test(f));
    for (const file of files) {
      const relPath = path.relative(vDir, file).replace(/\\/g, '/');
      const destPath = path.join(videoDestBase, relPath);
      mkdirSync(path.dirname(destPath), {recursive: true});
      copyFileSync(file, destPath);
      rawVideoFiles.push({
        fullPath: file,
        pubPath: `assets/videos/${relPath}`,
        fileName: path.basename(file),
      });
    }
  }
}

// Sort by narrative score for storyboard coherence
rawVideoFiles.sort((a, b) => {
  const scoreA = scoreAsset(a.fileName);
  const scoreB = scoreAsset(b.fileName);
  if (scoreA !== scoreB) return scoreA - scoreB;
  return a.fileName.localeCompare(b.fileName);
});

const videoAssets = rawVideoFiles.map((v) => v.pubPath);

// Sync music
const musicSourceDir = path.join(projectRoot, 'assets', 'musics');
const musicDestDir = path.join(projectRoot, 'public', 'assets', 'music');
mkdirSync(musicDestDir, {recursive: true});

const musicAssets = [];
let detectedAudioDurationFrames = 5194;
let songTitle = 'Intergalactic Lobbyists';

if (existsSync(musicSourceDir)) {
  const files = listFilesRecursive(musicSourceDir).filter((f) => /\.(wav|mp3|ogg|m4a|flac)$/i.test(f));
  for (const file of files) {
    const fileName = path.basename(file);
    const destPath = path.join(musicDestDir, fileName);
    copyFileSync(file, destPath);
    const pubPath = `assets/music/${fileName}`;
    musicAssets.push(pubPath);
    songTitle = path.parse(fileName).name;

    try {
      if (file.toLowerCase().endsWith('.wav')) {
        const buf = readFileSync(file);
        const byteRate = buf.readUInt32LE(28);
        let pos = 36;
        while (pos < buf.length - 8) {
          const chunkId = buf.toString('ascii', pos, pos + 4);
          const chunkSize = buf.readUInt32LE(pos + 4);
          if (chunkId === 'data' && byteRate > 0) {
            const durationSec = chunkSize / byteRate;
            detectedAudioDurationFrames = Math.round(durationSec * 30);
            break;
          }
          pos += 8 + chunkSize;
        }
      }
    } catch {
      // fallback
    }
  }
}

// Sync logo
const logoSourceDir = path.join(projectRoot, 'assets', 'logo');
const logoDestDir = path.join(projectRoot, 'public', 'assets', 'logo');
mkdirSync(logoDestDir, {recursive: true});

const logoAssets = [];
if (existsSync(logoSourceDir)) {
  const files = listFilesRecursive(logoSourceDir).filter((f) => /\.(jpeg|jpg|png|svg|webp)$/i.test(f));
  for (const file of files) {
    const fileName = path.basename(file);
    const destPath = path.join(logoDestDir, fileName);
    copyFileSync(file, destPath);
    logoAssets.push(`assets/logo/${fileName}`);
  }
}

// Sync lyrics
const lyricsSourceDir = path.join(projectRoot, 'assets', 'lyrics');
const lyricsDestDir = path.join(projectRoot, 'public', 'assets', 'lyrics');
mkdirSync(lyricsDestDir, {recursive: true});

let lyricsData = [];
if (existsSync(lyricsSourceDir)) {
  const jsonFiles = listFilesRecursive(lyricsSourceDir).filter((f) => f.toLowerCase().endsWith('.json'));
  for (const file of jsonFiles) {
    const fileName = path.basename(file);
    const destPath = path.join(lyricsDestDir, fileName);
    copyFileSync(file, destPath);
    if (fileName === `${songTitle}.json` || jsonFiles.length === 1) {
      try {
        lyricsData = JSON.parse(readFileSync(file, 'utf-8'));
      } catch {
        // ignore invalid JSON
      }
    }
  }
}

// Generate src/config/spicyFrysAssets.ts
const manifestPath = path.join(projectRoot, 'src', 'config', 'spicyFrysAssets.ts');

writeFileSync(
  manifestPath,
  [
    'import type {LyricSubtitle} from "../components/subtitles/SovietClosedCaptions";',
    '',
    `export const SONG_TITLE = ${JSON.stringify(songTitle)};`,
    '',
    'export const LOOPING_VIDEOS: readonly string[] = [',
    ...videoAssets.map((asset) => `  ${JSON.stringify(asset)},`),
    '] as const;',
    '',
    'export const MUSIC_TRACKS: readonly string[] = [',
    ...musicAssets.map((asset) => `  ${JSON.stringify(asset)},`),
    '] as const;',
    '',
    `export const DETECTED_AUDIO_DURATION_IN_FRAMES = ${detectedAudioDurationFrames};`,
    '',
    `export const LOGO_ASSET = ${JSON.stringify(logoAssets[0] ?? 'assets/logo/Spicy_Frys_logo.jpeg')};`,
    '',
    `export const LYRICS_DATA: readonly LyricSubtitle[] = ${JSON.stringify(lyricsData, null, 2)} as const;`,
    '',
  ].join('\n'),
);

console.log(`[sync-assets] Song: "${songTitle}" | Duration: ${detectedAudioDurationFrames} frames (${(detectedAudioDurationFrames / 30).toFixed(2)}s) | Ordered ${videoAssets.length} clips.`);
