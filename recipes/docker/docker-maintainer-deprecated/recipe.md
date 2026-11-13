---
id: docker-maintainer-deprecated
title: MAINTAINER is deprecated; use a LABEL
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "labels", "metadata"]
errors: ["Maintainer instruction is deprecated in favor of using label"]
sources: ["https://docs.docker.com/reference/build-checks/maintainer-deprecated/"]
---

## Mistake

```dockerfile
MAINTAINER Jane <jane@example.com>
```

## Correct

```dockerfile
LABEL org.opencontainers.image.authors="jane@example.com"
```

## Why

Labels are the standard OCI metadata and show in `docker inspect`.
