---
id: docker-expose-host-mapping
title: EXPOSE takes container ports only
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "ports", "networking"]
errors: ["EXPOSE instruction should not define an IP address or host-port mapping, found '8080:80'"]
sources: ["https://docs.docker.com/reference/build-checks/expose-invalid-format/"]
---

## Mistake

```dockerfile
EXPOSE 8080:80
```

## Correct

```dockerfile
EXPOSE 80
# map at run time: docker run -p 8080:80 / compose ports: ["8080:80"]
```

## Why

EXPOSE is documentation of the container port; host mapping belongs to `docker run -p` or compose.
