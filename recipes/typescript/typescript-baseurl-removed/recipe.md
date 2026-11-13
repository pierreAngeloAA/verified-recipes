---
id: typescript-baseurl-removed
title: baseUrl is removed; write paths relative to tsconfig
stack: typescript
applies_to: ">= 7.0"
tags: ["tsconfig", "paths", "aliases", "migration"]
errors: ["TS5102: Option 'baseUrl' has been removed"]
sources: ["https://www.typescriptlang.org/tsconfig/#paths"]
---

## Mistake

```json
{ "compilerOptions": { "baseUrl": "src", "paths": { "@/*": ["*"] } } }
```

## Correct

```json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

## Why

`paths` resolves from the tsconfig folder. Bare imports through `baseUrl` need an explicit `"*": ["./src/*"]` entry.
