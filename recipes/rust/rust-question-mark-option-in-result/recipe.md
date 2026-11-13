---
id: rust-question-mark-option-in-result
title: ? on an Option in a fn returning Result needs ok_or
stack: rust
applies_to: ">= 1.0"
tags: ["errors", "option", "result"]
errors: ["the `?` operator can only be used on `Result`s, not `Option`s, in a function that returns `Result`"]
sources: ["https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html"]
---

## Mistake

```rust
fn first(v: &[i32]) -> Result<i32, String> {
    let x = v.first()?;
    Ok(*x)
}
```

## Correct

```rust
fn first(v: &[i32]) -> Result<i32, String> {
    let x = v.first().ok_or("empty list")?;  // ok_or_else for costly errors
    Ok(*x)
}
```

## Why

`?` converts errors between Result types, but never None into an Err.
