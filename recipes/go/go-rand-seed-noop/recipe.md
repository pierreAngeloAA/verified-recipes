---
id: go-rand-seed-noop
title: rand.Seed is a no-op, so a fixed seed no longer repeats the sequence
stack: go
applies_to: ">= 1.24"
tags: ["math-rand", "rand", "seed", "deterministic", "tests"]
errors: ["same seed produced different sequences"]
sources: ["https://go.dev/doc/go1.24", "https://pkg.go.dev/math/rand#Seed"]
---

## Mistake

```go
rand.Seed(42) // ignored
n := rand.Intn(1000)
```

## Correct

```go
r := rand.New(rand.NewPCG(42, 0)) // math/rand/v2
n := r.IntN(1000)
```

## Why

Since Go 1.24 the top-level `math/rand.Seed` does nothing unless `GODEBUG=randseednop=0` is set. Reproducible sequences need a local generator. The listed error is the symptom in a test, not a Go message.
