---
id: rust-thread-spawn-move
title: thread::spawn closures need move
stack: rust
applies_to: ">= 1.0"
tags: ["threads", "closures", "ownership"]
errors: ["closure may outlive the current function, but it borrows `v`"]
sources: ["https://doc.rust-lang.org/std/thread/fn.spawn.html"]
---

## Mistake

```rust
let h = thread::spawn(|| println!("{:?}", v));
```

## Correct

```rust
let h = thread::spawn(move || println!("{:?}", v));
// borrow instead: thread::scope(|s| { s.spawn(|| println!("{:?}", &v)); });
```

## Why

Spawned threads may outlive the caller, so they need 'static data. Share with Arc when several threads need it.
