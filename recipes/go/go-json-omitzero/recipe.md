---
id: go-json-omitzero
title: omitempty does not omit a zero time.Time or struct; use omitzero
stack: go
applies_to: ">= 1.24"
tags: ["encoding-json", "json", "omitempty", "omitzero", "time"]
errors: ["\"at\":\"0001-01-01T00:00:00Z\""]
sources: ["https://go.dev/doc/go1.24", "https://pkg.go.dev/encoding/json#Marshal"]
---

## Mistake

```go
At time.Time `json:"at,omitempty"` // emits "0001-01-01T00:00:00Z"
```

## Correct

```go
At time.Time `json:"at,omitzero"`
```

## Why

`omitempty` only skips false, 0, nil and empty strings, slices and maps, never structs. `omitzero` (Go 1.24) skips zero values and calls `IsZero()` when the type has it.
