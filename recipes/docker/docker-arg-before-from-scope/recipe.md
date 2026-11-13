---
id: docker-arg-before-from-scope
title: An ARG before FROM is not visible inside the stage
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "args", "multi-stage"]
errors: ["Usage of undefined variable '$ALPINE_VERSION'"]
sources: ["https://docs.docker.com/reference/build-checks/undefined-var/"]
---

## Mistake

```dockerfile
ARG ALPINE_VERSION=3.22
FROM alpine:${ALPINE_VERSION}
# empty here:
ENV BASE=$ALPINE_VERSION
```

## Correct

```dockerfile
ARG ALPINE_VERSION=3.22
FROM alpine:${ALPINE_VERSION}
# re-declare to use it in the stage:
ARG ALPINE_VERSION
ENV BASE=$ALPINE_VERSION
```

## Why

Global ARGs only feed FROM lines. Each stage must re-declare the ARG (no value needed) to read it. If the base image has an ENV of the same name (node sets NODE_VERSION), you silently get the image's value.
