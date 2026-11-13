---
id: node-ts-type-import
title: node file.ts needs import type for types
stack: node
applies_to: ">= 22.18"
tags: ["typescript", "type-stripping", "esm", "imports"]
errors: ["does not provide an export named 'User'"]
sources: ["https://nodejs.org/api/typescript.html#importing-types-without-type-keyword"]
---

## Mistake

```ts
import { User, load } from './user.ts';
```

## Correct

```ts
import { type User, load } from './user.ts';
```

## Why

Types vanish when stripped, so the import names a missing export. tsconfig `verbatimModuleSyntax: true` flags it.
