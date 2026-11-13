---
id: java-concurrent-modification
title: Don't remove from a list inside for-each
stack: java
applies_to: ">= 8"
tags: ["collections", "iteration", "bugs"]
errors: ["java.util.ConcurrentModificationException"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ConcurrentModificationException.html"]
---

## Mistake

```java
for (Integer x : list) if (x % 2 == 0) list.remove(x);
```

## Correct

```java
list.removeIf(x -> x % 2 == 0);
// maps: map.entrySet().removeIf(e -> ...); or use an explicit Iterator.remove()
```

## Why

The iterator detects the structural change on its next step. Same for HashMap.
