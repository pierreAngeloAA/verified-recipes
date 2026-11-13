---
id: go-servemux-exact-root
title: The "/" pattern matches every path; use "/{$}" for the root only
stack: go
applies_to: ">= 1.22"
tags: ["net-http", "servemux", "routing", "404"]
errors: ["GET /missing returned 200, want 404"]
sources: ["https://go.dev/doc/go1.22", "https://pkg.go.dev/net/http#ServeMux"]
---

## Mistake

```go
mux.HandleFunc("GET /", home) // also serves /missing with 200
```

## Correct

```go
mux.HandleFunc("GET /{$}", home) // only "/"; others get 404
```

## Why

A pattern ending in `/` matches the whole subtree. `{$}` (Go 1.22) anchors the match to the exact path. The listed error is the symptom in a test.
