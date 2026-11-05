---
id: spring-rest-template-builder-package
title: Spring Boot 4 moved RestTemplateBuilder to the restclient module
stack: spring
applies_to: ">= 4.0"
tags: ["resttemplate", "resttemplatebuilder", "http-client", "modules", "upgrade", "java"]
errors: ["package org.springframework.boot.web.client does not exist"]
sources: ["https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide"]
---

## Mistake

```java
import org.springframework.boot.web.client.RestTemplateBuilder;
```

## Correct

```java
import org.springframework.boot.restclient.RestTemplateBuilder;
```

It also needs its own starter:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-restclient</artifactId>
</dependency>
```

## Why

Spring Boot 4.0 split its code into smaller modules, so REST client support now has its own module and starter.
