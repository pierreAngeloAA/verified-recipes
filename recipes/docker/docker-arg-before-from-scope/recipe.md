---
id: docker-arg-before-from-scope
title: An ARG before FROM is not visible inside the stage
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "args", "multi-stage"]
errors: ["Usage of undefined variable '$NODE_VERSION'"]
sources: ["https://docs.docker.com/reference/build-checks/undefined-var/"]
---

## Mistake

```dockerfile
ARG NODE_VERSION=26
FROM node:${NODE_VERSION}-alpine
ENV V=$NODE_VERSION  # empty
```

## Correct

```dockerfile
ARG NODE_VERSION=26
FROM node:${NODE_VERSION}-alpine
ARG NODE_VERSION  # re-declare to use it in the stage
ENV V=$NODE_VERSION
```

## Why

Global ARGs only feed FROM lines. Each stage must re-declare the ARG (no value needed) to read it.
