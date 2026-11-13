---
id: docker-workdir-relative
title: Use an absolute WORKDIR
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "paths"]
errors: ["Relative workdir \"app\" can have unexpected results if the base image changes"]
sources: ["https://docs.docker.com/reference/build-checks/workdir-relative-path/"]
---

## Mistake

```dockerfile
WORKDIR app
```

## Correct

```dockerfile
WORKDIR /app
```

## Why

A relative WORKDIR is joined to the base image's WORKDIR, which can change between tags.
