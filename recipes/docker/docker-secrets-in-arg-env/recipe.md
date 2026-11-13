---
id: docker-secrets-in-arg-env
title: Never pass secrets with ARG or ENV
stack: docker
applies_to: ">= 27.0"
tags: ["dockerfile", "security", "secrets", "buildkit"]
errors: ["Do not use ARG or ENV instructions for sensitive data (ARG \"NPM_TOKEN\")"]
sources: ["https://docs.docker.com/reference/build-checks/secrets-used-in-arg-or-env/"]
---

## Mistake

```dockerfile
ARG NPM_TOKEN
RUN NPM_TOKEN=$NPM_TOKEN npm ci
```

## Correct

```dockerfile
RUN --mount=type=secret,id=npm_token,env=NPM_TOKEN npm ci
# docker build --secret id=npm_token,env=NPM_TOKEN .
```

## Why

ARG and ENV values are stored in the image history and layers. Secret mounts exist only during that RUN.
