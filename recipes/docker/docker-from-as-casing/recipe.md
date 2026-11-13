---
id: docker-from-as-casing
title: Match the casing of FROM and AS
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "multi-stage", "style"]
errors: ["'as' and 'FROM' keywords' casing do not match"]
sources: ["https://docs.docker.com/reference/build-checks/from-as-casing/"]
---

## Mistake

```dockerfile
FROM node:26-alpine as build
```

## Correct

```dockerfile
FROM node:26-alpine AS build
```

## Why

Mixed casing is flagged by every `docker build`; keep keywords uppercase.
