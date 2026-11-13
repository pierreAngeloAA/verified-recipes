---
id: java-jaxb-datatypeconverter-removed
title: javax.xml.bind is gone; use java.util.Base64 or HexFormat
stack: java
applies_to: ">= 11"
tags: ["jaxb", "base64", "hex", "migration"]
errors: ["package javax.xml.bind does not exist"]
sources: ["https://openjdk.org/jeps/320"]
---

## Mistake

```java
import javax.xml.bind.DatatypeConverter;
String b64 = DatatypeConverter.printBase64Binary(bytes);
String hex = DatatypeConverter.printHexBinary(bytes);
```

## Correct

```java
String b64 = Base64.getEncoder().encodeToString(bytes);
String hex = HexFormat.of().withUpperCase().formatHex(bytes);  // JDK 17+
```

## Why

Java EE modules (JAXB, JAX-WS, javax.annotation) were removed in JDK 11. For XML binding add `jakarta.xml.bind-api` + an implementation.
