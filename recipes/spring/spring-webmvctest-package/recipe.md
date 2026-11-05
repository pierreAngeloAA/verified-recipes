---
id: spring-webmvctest-package
title: Spring Boot 4 moved @WebMvcTest and @AutoConfigureMockMvc
stack: spring
applies_to: ">= 4.0"
tags: ["test", "webmvctest", "mockmvc", "autoconfiguremockmvc", "modules", "upgrade", "java"]
errors: ["package org.springframework.boot.test.autoconfigure.web.servlet does not exist"]
sources: ["https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide"]
---

## Mistake

```java
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
```

## Correct

```java
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
```

These annotations also need the test starter:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webmvc-test</artifactId>
  <scope>test</scope>
</dependency>
```

## Why

Spring Boot 4.0 split its code into smaller modules, each with its own test module and starter. Test support for Spring MVC now lives under `org.springframework.boot.webmvc.test`.
