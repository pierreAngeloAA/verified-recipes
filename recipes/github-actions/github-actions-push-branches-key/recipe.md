---
id: github-actions-push-branches-key
title: The filter key is branches, not branch
stack: github-actions
applies_to: ">= 2024"
tags: ["triggers", "branches"]
errors: ["unexpected key \"branch\" for \"push\" section"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onpushbranchestagsbranches-ignoretags-ignore"]
---

## Mistake

```yaml
on:
  push:
    branch: [main]
```

## Correct

```yaml
on:
  push:
    branches: [main]
```

## Why

GitHub rejects the unknown key, so the workflow never triggers.
