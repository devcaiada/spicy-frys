# Spicy Frys

A clean Remotion + TypeScript project for reusable looping animations.

## Scripts

- `npm run dev` opens Remotion Studio.
- `npm run render` renders the example loop to `renders/looping-orbits.mp4`.
- `npm run render:still` exports a still frame to `renders/looping-orbits.png`.
- `npm run typecheck` runs TypeScript checks.

## Structure

- `src/Root.tsx` registers all Remotion compositions.
- `src/compositions/` contains complete animations.
- `src/components/` contains reusable visual pieces.
- `src/lib/` contains pure animation helpers.
- `renders/` and `exports/` are ignored output folders.
