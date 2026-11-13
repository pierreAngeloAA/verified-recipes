---
id: java-localdate-parse-pattern
title: LocalDate.parse needs ISO yyyy-MM-dd; pass a formatter otherwise
stack: java
applies_to: ">= 8"
tags: ["dates", "time", "parsing"]
errors: ["java.time.format.DateTimeParseException: Text '2026-1-5' could not be parsed at index 5"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/format/DateTimeFormatter.html"]
---

## Mistake

```java
LocalDate d = LocalDate.parse("2026-1-5");
LocalDate e = LocalDate.parse("05/01/2026");
```

## Correct

```java
LocalDate d = LocalDate.parse("2026-1-5", DateTimeFormatter.ofPattern("yyyy-M-d"));
LocalDate e = LocalDate.parse("05/01/2026", DateTimeFormatter.ofPattern("dd/MM/yyyy"));
```

## Why

ISO_LOCAL_DATE requires zero-padded months and days. `MM` is month, `mm` is minutes; use `uuuu` with ResolverStyle.STRICT.
