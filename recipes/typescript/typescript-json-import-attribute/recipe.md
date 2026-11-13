---
id: typescript-json-import-attribute
title: JSON imports in ESM need with { type: "json" }
stack: typescript
applies_to: ">= 5.7"
tags: ["esm", "json", "imports", "node"]
errors: ["TS1543: Importing a JSON file into an ECMAScript module requires a 'type: \"json\"' import attribute"]
sources: ["https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html"]
---

## Mistake

```ts
import data from "./data.json";
```

## Correct

```ts
import data from "./data.json" with { type: "json" };
```

## Why

Node rejects JSON modules without the attribute, so tsc does too under `module: nodenext`. Only default import.
