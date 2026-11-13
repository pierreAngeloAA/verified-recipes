---
id: docker-env-legacy-format
title: ENV and LABEL need key=value
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "env"]
errors: ["\"ENV key=value\" should be used instead of legacy \"ENV key value\" format"]
sources: ["https://docs.docker.com/reference/build-checks/legacy-key-value-format/"]
---

## Mistake

```dockerfile
ENV NODE_ENV production
```

## Correct

```dockerfile
ENV NODE_ENV=production
```

## Why

The space form is deprecated and sets only one variable, swallowing the rest of the line into the value.
