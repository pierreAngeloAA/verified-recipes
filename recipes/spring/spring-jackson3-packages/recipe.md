---
id: spring-jackson3-packages
title: Spring Boot 4 uses Jackson 3, with new package names
stack: spring
applies_to: ">= 4.0"
tags: ["jackson", "json", "objectmapper", "jsonmapper", "upgrade", "java"]
errors: ["package com.fasterxml.jackson.databind does not exist"]
sources: ["https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide"]
---

## Mistake

```java
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
class Exporter {
    private final ObjectMapper mapper;

    Exporter(ObjectMapper mapper) {
        this.mapper = mapper;
    }
}
```

## Correct

```java
import tools.jackson.databind.json.JsonMapper;

@Service
class Exporter {
    private final JsonMapper mapper;

    Exporter(JsonMapper mapper) {
        this.mapper = mapper;
    }
}
```

Annotations keep their old package, so `com.fasterxml.jackson.annotation.JsonProperty` is still correct. In Jackson 3, `writeValueAsString` no longer needs a `throws` clause or a `try` block for checked exceptions.

## Why

Spring Boot 4.0 prefers Jackson 3, which moved from `com.fasterxml.jackson` to `tools.jackson`. The `jackson-annotations` module is the exception. Jackson 2 can still be added for libraries that need it, but it is a separate dependency.
