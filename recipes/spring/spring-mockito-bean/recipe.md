---
id: spring-mockito-bean
title: Spring Boot 4 removed @MockBean and @SpyBean
stack: spring
applies_to: ">= 4.0"
tags: ["test", "mockbean", "mockito", "spybean", "upgrade", "java"]
errors: ["package org.springframework.boot.test.mock.mockito does not exist"]
sources: ["https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide", "https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-mockitobean.html"]
---

## Mistake

```java
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class OrderServiceTest {
    @MockBean
    PaymentClient paymentClient;
}
```

## Correct

```java
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
class OrderServiceTest {
    @MockitoBean
    PaymentClient paymentClient;
}
```

Replace `@SpyBean` with `@MockitoSpyBean` from the same package.

## Why

Spring Boot 4.0 removed its own `@MockBean` and `@SpyBean`. The replacements belong to Spring Framework, so the package no longer starts with `org.springframework.boot`.
