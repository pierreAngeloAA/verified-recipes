---
id: kubernetes-deployment-selector-required
title: apps/v1 Deployments need spec.selector matching the template labels
stack: kubernetes
applies_to: ">= 1.16"
tags: ["deployment", "labels", "selector"]
errors: ["spec.selector: Required value", "`selector` does not match template `labels`"]
sources: ["https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"]
---

## Mistake

```yaml
spec:
  template:
    metadata: {labels: {app: web}}
```

## Correct

```yaml
spec:
  selector: {matchLabels: {app: web}}  # immutable after creation
  template:
    metadata: {labels: {app: web}}
```

## Why

Old beta APIs defaulted the selector from the labels; apps/v1 does not. Also applies to StatefulSet, DaemonSet and ReplicaSet.
