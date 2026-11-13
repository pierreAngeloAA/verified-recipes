---
id: kubernetes-hpa-v2beta2-removed
title: HorizontalPodAutoscaler is autoscaling/v2
stack: kubernetes
applies_to: ">= 1.26"
tags: ["autoscaling", "hpa", "apiversion", "migration"]
errors: ["no matches for kind \"HorizontalPodAutoscaler\" in version \"autoscaling/v2beta2\""]
sources: ["https://kubernetes.io/docs/reference/using-api/deprecation-guide/"]
---

## Mistake

```yaml
apiVersion: autoscaling/v2beta2  # or v2beta1
kind: HorizontalPodAutoscaler
```

## Correct

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler  # same metrics schema as v2beta2
```

## Why

v2beta1 went in 1.25 and v2beta2 in 1.26. `autoscaling/v1` only supports CPU.
