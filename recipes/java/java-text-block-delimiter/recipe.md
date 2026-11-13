---
id: java-text-block-delimiter
title: Text blocks need a line break after the opening """
stack: java
applies_to: ">= 15"
tags: ["strings", "text-blocks", "syntax"]
errors: ["illegal text block open delimiter sequence, missing line terminator"]
sources: ["https://openjdk.org/jeps/378"]
---

## Mistake

```java
String sql = """SELECT * FROM users""";
```

## Correct

```java
String sql = """
    SELECT * FROM users
    """;
```

## Why

Content starts on the next line; indentation is stripped relative to the closing delimiter.
