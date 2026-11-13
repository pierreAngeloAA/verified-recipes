---
id: go-math-rand-v2-names
title: math/rand/v2 renamed Intn to IntN and removed Seed
stack: go
applies_to: ">= 1.22"
tags: ["math-rand", "rand", "random", "v2"]
errors: ["undefined: rand.Intn"]
sources: ["https://go.dev/doc/go1.22", "https://pkg.go.dev/math/rand/v2"]
---

## Mistake

```go
import "math/rand/v2"

rand.Seed(time.Now().UnixNano()) // undefined: rand.Seed
n := rand.Intn(6)                // undefined: rand.Intn
```

## Correct

```go
import "math/rand/v2"

n := rand.IntN(6) // also Int64N, Uint32N, N(d)
```

## Why

`math/rand/v2` (Go 1.22) renamed `Intn`, `Int63n`, `Int31n` to `IntN`, `Int64N`, `Int32N` and removed `Seed` and `Read`; the global generator is seeded randomly. For a fixed sequence use `rand.New(rand.NewPCG(s1, s2))`.
