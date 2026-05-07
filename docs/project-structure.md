# Project structure

This project is a small Remotion + TypeScript setup for reusable looping animations.

```text
src/
  components/    Reusable visual building blocks.
  compositions/  Complete Remotion compositions registered in Root.tsx.
  config/        Shared video settings.
  lib/           Pure animation helpers.
  styles/        Global CSS used by compositions.
```

Add new animations by creating a component in `src/compositions/` and registering it in `src/Root.tsx`.
