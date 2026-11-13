---
id: java-sun-misc-base64-removed
title: sun.misc.BASE64Encoder is gone; use java.util.Base64
stack: java
applies_to: ">= 9"
tags: ["base64", "internal-api", "migration"]
errors: ["symbol:   class BASE64Encoder"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Base64.html"]
---

## Mistake

```java
String s = new sun.misc.BASE64Encoder().encode(bytes);
byte[] b = new sun.misc.BASE64Decoder().decodeBuffer(s);
```

## Correct

```java
String s = Base64.getEncoder().encodeToString(bytes);
byte[] b = Base64.getDecoder().decode(s);  // getMimeDecoder() for line-wrapped input
```

## Why

Internal JDK classes were removed; `java.util.Base64` exists since Java 8.
