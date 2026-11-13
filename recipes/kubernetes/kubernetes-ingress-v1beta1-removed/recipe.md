---
id: kubernetes-ingress-v1beta1-removed
title: Ingress is networking.k8s.io/v1
stack: kubernetes
applies_to: ">= 1.22"
tags: ["ingress", "apiversion", "migration"]
errors: ["no matches for kind \"Ingress\" in version \"networking.k8s.io/v1beta1\""]
sources: ["https://kubernetes.io/docs/reference/using-api/deprecation-guide/"]
---

## Mistake

```yaml
apiVersion: networking.k8s.io/v1beta1  # or extensions/v1beta1
kind: Ingress
```

## Correct

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
# v1 also changes backend and requires pathType:
#   kubernetes-ingress-v1-backend, kubernetes-ingress-pathtype-required
```

## Why

Both beta APIs were removed in 1.22. `kubectl convert` is no longer bundled.
