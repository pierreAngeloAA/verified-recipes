---
id: swift-global-mutable-state
title: Swift 6 mode rejects unprotected global mutable state
stack: swift
applies_to: ">= 6.0 in Swift 6 language mode"
tags: ["concurrency", "global", "static", "singleton", "actor", "upgrade"]
errors: ["is not concurrency-safe because it is nonisolated global shared mutable state"]
sources: ["https://www.swift.org/migration/documentation/swift-6-concurrency-migration-guide/commonproblems/"]
---

## Mistake

```swift
var counter = 0

final class Config {
    static var shared = Config()
}
```

## Correct

Use the option that matches how the value is used:

```swift
// The value never changes
final class Config: Sendable {
    static let shared = Config()
}

// Only UI code uses the value
@MainActor var counter = 0

// Any code may change the value
actor Counter {
    static let shared = Counter()
    private var value = 0

    func increment() -> Int {
        value += 1
        return value
    }
}
```

## Why

Swift 6 language mode treats possible data races as compile errors, and any code can reach a global `var` or `static var`. The same code compiles in Swift 5 language mode.

This recipe is verified with the Linux compiler, so it does not cover SwiftUI or other Apple-only frameworks.
