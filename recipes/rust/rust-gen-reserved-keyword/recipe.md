---
id: rust-gen-reserved-keyword
title: gen is a reserved keyword in edition 2024 (rand: rng.gen())
stack: rust
applies_to: ">= 1.85"
tags: ["edition-2024", "keywords", "rand"]
errors: ["expected identifier, found reserved keyword `gen`"]
sources: ["https://doc.rust-lang.org/edition-guide/rust-2024/gen-keyword.html"]
---

## Mistake

```rust
let n: u8 = rng.gen();
let gen = 1;
```

## Correct

```rust
let n: u8 = rng.random();  // rand 0.9 renamed gen -> random, gen_range -> random_range
let r#gen = 1;            // raw identifier if you must keep the name
```

## Why

`gen` is reserved for generator blocks.
