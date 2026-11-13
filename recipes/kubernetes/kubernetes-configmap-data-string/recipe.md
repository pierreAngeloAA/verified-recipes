---
id: kubernetes-configmap-data-string
title: ConfigMap data values must be strings
stack: kubernetes
applies_to: ">= 1.0"
tags: ["configmap", "yaml", "config"]
errors: ["cannot unmarshal bool into Go struct field ConfigMap.data of type string"]
sources: ["https://kubernetes.io/docs/concepts/configuration/configmap/"]
---

## Mistake

```yaml
data:
  DEBUG: true
  PORT: 8080
```

## Correct

```yaml
data:
  DEBUG: "true"
  PORT: "8080"
```

## Why

Same for Secret stringData and Helm-rendered values: unquoted true/8080 are not strings.
