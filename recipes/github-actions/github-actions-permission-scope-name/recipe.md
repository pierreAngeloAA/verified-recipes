---
id: github-actions-permission-scope-name
title: Permission scopes are plural (contents, pull-requests)
stack: github-actions
applies_to: ">= 2024"
tags: ["permissions", "security", "token"]
errors: ["unknown permission scope \"content\""]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions"]
---

## Mistake

```yaml
permissions:
  content: write
  pull-request: write
```

## Correct

```yaml
permissions:
  contents: write
  pull-requests: write
```

## Why

Least privilege: set `permissions: {contents: read}` at the top and widen per job.
