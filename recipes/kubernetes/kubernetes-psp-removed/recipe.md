---
id: kubernetes-psp-removed
title: PodSecurityPolicy is gone; use Pod Security Admission labels
stack: kubernetes
applies_to: ">= 1.25"
tags: ["security", "psp", "pod-security", "migration"]
errors: ["no matches for kind \"PodSecurityPolicy\" in version \"policy/v1beta1\""]
sources: ["https://kubernetes.io/docs/concepts/security/pod-security-admission/"]
---

## Mistake

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
```

## Correct

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app
  labels:
    pod-security.kubernetes.io/enforce: restricted  # or baseline
```

## Why

PSP was removed in 1.25 with no direct replacement API. The built-in admission enforces the Pod Security Standards per namespace.
