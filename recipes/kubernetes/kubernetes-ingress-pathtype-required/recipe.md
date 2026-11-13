---
id: kubernetes-ingress-pathtype-required
title: Ingress v1 paths require pathType
stack: kubernetes
applies_to: ">= 1.19"
tags: ["ingress", "networking"]
errors: ["pathType: Required value: pathType must be specified"]
sources: ["https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types"]
---

## Mistake

```yaml
paths:
- path: /
  backend: {service: {name: web, port: {number: 80}}}
```

## Correct

```yaml
paths:
- path: /
  pathType: Prefix  # Exact | Prefix | ImplementationSpecific
  backend: {service: {name: web, port: {number: 80}}}
```

## Why

`Prefix` matches by path segment (/app matches /app/x, not /apple).
