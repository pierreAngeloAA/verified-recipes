---
id: java-thread-stop-removed
title: Thread.stop/suspend/resume are removed; use interrupt()
stack: java
applies_to: ">= 27"
tags: ["threads", "concurrency", "migration"]
errors: ["symbol:   method stop()"]
sources: ["https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/doc-files/threadPrimitiveDeprecation.html"]
---

## Mistake

```java
worker.stop();
```

## Correct

```java
worker.interrupt();
// in the worker: while (!Thread.currentThread().isInterrupted()) { ... }
// executors: future.cancel(true) / executor.shutdownNow()
```

## Why

JDK 20-25 compile it but throw UnsupportedOperationException; newer JDKs removed the methods.
