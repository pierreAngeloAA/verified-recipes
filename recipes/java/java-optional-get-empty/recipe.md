---
id: java-optional-get-empty
title: Optional.get() throws when empty
stack: java
applies_to: ">= 8"
tags: ["optional", "null-safety"]
errors: ["java.util.NoSuchElementException: No value present"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html"]
---

## Mistake

```java
User u = repo.findById(id).get();
```

## Correct

```java
User u = repo.findById(id).orElseThrow(() -> new NotFound(id));
// or .orElse(defaultUser), .map(...), .ifPresent(...)
```

## Why

get() is a hidden null check; orElseThrow() (no args, JDK 10+) makes the intent explicit.
