---
id: go-maps-keys-iterator
title: maps.Keys returns an iterator, not a slice
stack: go
applies_to: ">= 1.23"
tags: ["maps", "slices", "iterators", "iter", "sort"]
errors: ["of func type iter.Seq[string]) as []string value"]
sources: ["https://go.dev/doc/go1.23", "https://pkg.go.dev/maps#Keys"]
---

## Mistake

```go
keys := maps.Keys(m) // iter.Seq[string], not []string
sort.Strings(keys)
```

## Correct

```go
keys := slices.Sorted(maps.Keys(m))
// unsorted: slices.Collect(maps.Keys(m))
```

## Why

The standard `maps` package (Go 1.23) returns `iter.Seq`. The slice-returning `maps.Keys` was in `golang.org/x/exp/maps`. Same for `maps.Values`.
