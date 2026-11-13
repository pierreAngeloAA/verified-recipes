---
id: rust-rc-not-send
title: Rc and RefCell can't cross threads; use Arc and Mutex
stack: rust
applies_to: ">= 1.0"
tags: ["threads", "rc", "arc", "send"]
errors: ["`Rc<i32>` cannot be sent between threads safely"]
sources: ["https://doc.rust-lang.org/std/sync/struct.Arc.html"]
---

## Mistake

```rust
let shared = Rc::new(RefCell::new(0));
thread::spawn(move || *shared.borrow_mut() += 1);
```

## Correct

```rust
let shared = Arc::new(Mutex::new(0));
let s = Arc::clone(&shared);
thread::spawn(move || *s.lock().unwrap() += 1);
```

## Why

Rc's counter is not atomic. Async tasks on multi-threaded runtimes (tokio::spawn) need Send too.
