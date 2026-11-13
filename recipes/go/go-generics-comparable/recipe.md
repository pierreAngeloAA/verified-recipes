---
id: go-generics-comparable
title: A type parameter compared with == needs comparable, not any
stack: go
applies_to: ">= 1.18"
tags: ["generics", "comparable", "constraints", "type-parameters"]
errors: ["incomparable types in type set"]
sources: ["https://go.dev/ref/spec#Type_constraints", "https://go.dev/blog/comparable"]
---

## Mistake

```go
func Index[T any](items []T, target T) int // item == target does not compile
```

## Correct

```go
func Index[T comparable](items []T, target T) int
// < and > need cmp.Ordered; or just use slices.Index
```

## Why

`any` allows slices, maps and funcs, which do not support `==`. `comparable` restricts the type to ones that do.
