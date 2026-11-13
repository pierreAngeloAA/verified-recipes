---
id: rust-sort-floats
title: f64 is not Ord; sort floats with total_cmp
stack: rust
applies_to: ">= 1.62"
tags: ["sorting", "floats", "traits"]
errors: ["the trait bound `f64: Ord` is not satisfied"]
sources: ["https://doc.rust-lang.org/std/primitive.f64.html#method.total_cmp"]
---

## Mistake

```rust
let mut v: Vec<f64> = vec![2.5, 1.0];
v.sort();
let max = v.iter().max();
```

## Correct

```rust
v.sort_by(|a, b| a.total_cmp(b));
let max = v.iter().copied().fold(f64::NAN, f64::max);
```

## Why

NaN breaks total ordering. `total_cmp` defines one (NaN sorts last); `partial_cmp().unwrap()` panics on NaN.
