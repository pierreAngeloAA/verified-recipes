---
id: docker-from-platform-constant
title: Don't hardcode --platform in FROM
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "platform", "arm64", "multi-arch"]
errors: ["FROM --platform flag should not use constant value \"linux/amd64\""]
sources: ["https://docs.docker.com/reference/build-checks/from-platform-flag-const-disallowed/"]
---

## Mistake

```dockerfile
FROM --platform=linux/amd64 node:26-alpine
```

## Correct

```dockerfile
FROM node:26-alpine
# docker build --platform linux/amd64 .
# cross-compile stage: FROM --platform=$BUILDPLATFORM golang AS build
```

## Why

A constant forces emulation on ARM (Apple Silicon, Graviton) and blocks multi-arch builds.
