---
id: docker-undefined-arg-in-from
title: Declare an ARG before using it in FROM
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "args", "multi-stage"]
errors: ["FROM argument 'VERSION' is not declared"]
sources: ["https://docs.docker.com/reference/build-checks/undefined-arg-in-from/"]
---

## Mistake

```dockerfile
FROM node:${VERSION}-alpine
```

## Correct

```dockerfile
ARG VERSION=26
FROM node:${VERSION}-alpine
```

## Why

Without a global ARG the reference expands to an empty string, giving `node:-alpine`.
