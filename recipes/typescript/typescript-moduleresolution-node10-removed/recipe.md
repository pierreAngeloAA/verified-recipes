---
id: typescript-moduleresolution-node10-removed
title: moduleResolution node/node10 is removed
stack: typescript
applies_to: ">= 7.0"
tags: ["tsconfig", "modules", "migration"]
errors: ["TS5108: Option 'moduleResolution=node10' has been removed"]
sources: ["https://www.typescriptlang.org/tsconfig/#moduleResolution"]
---

## Mistake

```json
{ "compilerOptions": { "module": "commonjs", "moduleResolution": "node" } }
```

## Correct

```json
// Node.js
{ "compilerOptions": { "module": "nodenext" } }
// bundler (Vite, webpack, esbuild)
{ "compilerOptions": { "module": "esnext", "moduleResolution": "bundler" } }
```

## Why

Deprecated in TS 6, removed in 7. `nodenext` implies its own moduleResolution.
