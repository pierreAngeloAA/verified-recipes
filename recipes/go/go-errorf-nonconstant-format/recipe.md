---
id: go-errorf-nonconstant-format
title: fmt.Errorf(msg) with a variable format breaks go test
stack: go
applies_to: ">= 1.24"
tags: ["fmt", "errors", "vet", "printf", "go-test"]
errors: ["non-constant format string in call to fmt.Errorf"]
sources: ["https://go.dev/doc/go1.24", "https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/printf"]
---

## Mistake

```go
return fmt.Errorf(msg) // vet fails; "%" in msg is also misread
```

## Correct

```go
return errors.New(msg)
// or: fmt.Errorf("%s", msg)
```

## Why

Since Go 1.24, vet reports a non-constant format string with no other arguments when `go.mod` says `go 1.24` or later. `go test` runs this check, so the tests fail. The same applies to `Printf`, `t.Fatalf`, `log.Printf` and similar.
