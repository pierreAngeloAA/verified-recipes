---
id: java-format-conversion
title: %d needs an integer; use %f or %.2f for doubles
stack: java
applies_to: ">= 8"
tags: ["strings", "format"]
errors: ["java.util.IllegalFormatConversionException: d != java.lang.Double"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Formatter.html"]
---

## Mistake

```java
String.format("Total: %d", 9.5)
```

## Correct

```java
String.format(Locale.ROOT, "Total: %.2f", 9.5)  // %s for anything
```

## Why

Specifiers are checked at runtime against the argument type. `%f` follows the default locale (9,50 in es/de), so pass `Locale.ROOT` for machine-readable text.
