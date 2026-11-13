---
id: java-switch-not-exhaustive
title: Pattern switch expressions must be exhaustive
stack: java
applies_to: ">= 21"
tags: ["switch", "pattern-matching", "sealed"]
errors: ["the switch expression does not cover all possible input values"]
sources: ["https://openjdk.org/jeps/441"]
---

## Mistake

```java
return switch (obj) {
  case Integer i -> "int";
  case String s -> "str";
};
```

## Correct

```java
return switch (obj) {
  case Integer i -> "int";
  case String s -> "str";
  default -> "other";  // not needed when switching on a sealed type with all cases
};
```

## Why

Only enums and sealed hierarchies can be exhaustive without default; `case null` is separate.
