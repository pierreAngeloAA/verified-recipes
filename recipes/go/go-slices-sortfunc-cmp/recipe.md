---
id: go-slices-sortfunc-cmp
title: slices.SortFunc takes a cmp func returning int, not a less func
stack: go
applies_to: ">= 1.21"
tags: ["slices", "sort", "sortfunc", "cmp", "generics"]
errors: ["does not match inferred type func(a User, b User) int for func(a E, b E) int"]
sources: ["https://pkg.go.dev/slices#SortFunc", "https://pkg.go.dev/cmp#Compare"]
---

## Mistake

```go
slices.SortFunc(users, func(a, b User) bool { return a.Age < b.Age })
```

## Correct

```go
slices.SortFunc(users, func(a, b User) int { return cmp.Compare(a.Age, b.Age) })
// several keys: cmp.Or(cmp.Compare(a.Age, b.Age), strings.Compare(a.Name, b.Name))
```

## Why

`sort.Slice` takes `less(i, j) bool`; `slices.SortFunc`, `SortStableFunc`, `BinarySearchFunc` and `MaxFunc` take `cmp(a, b) int` (negative, zero or positive).
