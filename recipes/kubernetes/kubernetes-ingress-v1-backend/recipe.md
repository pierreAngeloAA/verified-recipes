---
id: kubernetes-ingress-v1-backend
title: Ingress v1 backend is service.name and service.port
stack: kubernetes
applies_to: ">= 1.19"
tags: ["ingress", "networking", "migration"]
errors: ["unknown field \"spec.rules[0].http.paths[0].backend.serviceName\""]
sources: ["https://kubernetes.io/docs/concepts/services-networking/ingress/"]
---

## Mistake

```yaml
backend:
  serviceName: web
  servicePort: 80
```

## Correct

```yaml
backend:
  service:
    name: web
    port: {number: 80}  # or {name: http}
```

## Why

The flat beta fields do not exist in v1; spec.backend became spec.defaultBackend.
