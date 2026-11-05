---
id: spring-security-lambda-dsl
title: Spring Security 7 requires the lambda configuration style
stack: spring
applies_to: ">= 4.0 with Spring Security 7"
tags: ["security", "httpsecurity", "csrf", "filter-chain", "lambda", "upgrade", "java"]
errors: ["method csrf in class HttpSecurity cannot be applied to given types", "Fatal error compiling: Cannot load from object array"]
sources: ["https://docs.spring.io/spring-security/reference/7.0/whats-new.html"]
---

## Mistake

```java
http
    .csrf().disable()
    .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
    .and()
    .httpBasic();
```

## Correct

```java
http
    .csrf(AbstractHttpConfigurer::disable)
    .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
    .httpBasic(Customizer.withDefaults());
```

## Misleading error

With Maven's default settings, this mistake can stop the build with an internal compiler failure that does not mention `csrf`:

```text
Fatal error compiling: Cannot load from object array because "this.hashes" is null
```

To see the real message, run:

```bash
mvn test-compile -Dmaven.compiler.fork=true
```

## Why

Spring Security 7 removed the chained configuration style, including `and()` on `HttpSecurity`. Each section now takes a lambda or method reference. Disable CSRF protection only for APIs that do not rely on browser sessions or cookies.
