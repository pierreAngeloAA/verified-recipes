---
id: kubernetes-env-value-string
title: Env var values must be YAML strings
stack: kubernetes
applies_to: ">= 1.0"
tags: ["env", "yaml", "pods", "config"]
errors: ["cannot unmarshal number into Go struct field EnvVar.spec.containers.env.value of type string"]
sources: ["https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/"]
---

## Mistake

```yaml
env:
- {name: PORT, value: 3000}
- {name: DEBUG, value: true}
```

## Correct

```yaml
env:
- {name: PORT, value: "3000"}
- {name: DEBUG, value: "true"}
```

## Why

YAML parses 3000, true, yes and 1.10 as numbers or booleans. Quote every value.
