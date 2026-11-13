---
id: go-iter-yield-return
title: An iterator must stop when yield returns false
stack: go
applies_to: ">= 1.23"
tags: ["iter", "iterators", "range-over-func", "yield", "panic"]
errors: ["range function continued iteration after function for loop body returned false"]
sources: ["https://go.dev/doc/go1.23", "https://go.dev/ref/spec#For_range"]
---

## Mistake

```go
return func(yield func(int) bool) {
	for i := range n {
		yield(i) // keeps going after the caller's break
	}
}
```

## Correct

```go
return func(yield func(int) bool) {
	for i := range n {
		if !yield(i) {
			return
		}
	}
}
```

## Why

`yield` returns false when the loop body runs `break` or `return`. Calling it again panics at runtime.
