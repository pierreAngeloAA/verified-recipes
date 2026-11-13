---
id: kubernetes-memory-quantity-units
title: Memory units are Mi/Gi (or M/G), not mb/gb
stack: kubernetes
applies_to: ">= 1.0"
tags: ["resources", "memory", "limits", "pods"]
errors: ["quantities must match the regular expression"]
sources: ["https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory"]
---

## Mistake

```yaml
resources:
  limits: {memory: 512mb, cpu: 0.5cores}
```

## Correct

```yaml
resources:
  requests: {memory: 256Mi, cpu: 250m}
  limits: {memory: 512Mi}
```

## Why

Suffixes are case-sensitive: `Mi` = 2^20, `M` = 10^6, and `m` means milli (512m memory is 0.5 bytes).
