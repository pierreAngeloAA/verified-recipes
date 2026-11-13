---
id: node-ts-enum-strip-only
title: node file.ts rejects enum, namespace and parameter properties
stack: node
applies_to: ">= 22.18"
tags: ["typescript", "type-stripping", "esm"]
errors: ["ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX"]
sources: ["https://nodejs.org/api/typescript.html#type-stripping"]
---

## Mistake

```ts
enum Color { Red, Blue }
class A { constructor(private x: number) {} }
```

## Correct

```ts
const Color = { Red: 0, Blue: 1 } as const;
type Color = (typeof Color)[keyof typeof Color];
class A { private x: number; constructor(x: number) { this.x = x; } }
```

## Why

Node only erases types; syntax that emits code fails. Set `erasableSyntaxOnly: true` in tsconfig to catch it in the editor.
