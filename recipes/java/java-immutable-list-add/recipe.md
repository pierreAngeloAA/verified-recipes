---
id: java-immutable-list-add
title: List.of, Stream.toList and Arrays.asList can't grow
stack: java
applies_to: ">= 16"
tags: ["collections", "immutable", "streams"]
errors: ["java.lang.UnsupportedOperationException"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/List.html#unmodifiable"]
---

## Mistake

```java
List<String> l = List.of("a");  // or stream.toList(), Arrays.asList(...)
l.add("b");
```

## Correct

```java
List<String> l = new ArrayList<>(List.of("a"));
l.add("b");
// streams: .collect(Collectors.toCollection(ArrayList::new))
```

## Why

These return unmodifiable (Arrays.asList: fixed-size) lists. List.of also rejects nulls.
