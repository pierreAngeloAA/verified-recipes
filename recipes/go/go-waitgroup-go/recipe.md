---
id: go-waitgroup-go
title: wg.Add inside the goroutine races with Wait; use wg.Go
stack: go
applies_to: ">= 1.25"
tags: ["sync", "waitgroup", "goroutines", "concurrency", "vet"]
errors: ["WaitGroup.Add called from inside new goroutine"]
sources: ["https://go.dev/doc/go1.25", "https://pkg.go.dev/sync#WaitGroup.Go"]
---

## Mistake

```go
go func() {
	wg.Add(1) // Wait may return before this runs
	defer wg.Done()
	work()
}()
```

## Correct

```go
wg.Go(func() {
	work()
})
wg.Wait()
```

## Why

`Add` must happen before the goroutine starts. `WaitGroup.Go` (Go 1.25) does `Add`, the goroutine and `Done` for you, and vet in Go 1.25 reports the mistake.
