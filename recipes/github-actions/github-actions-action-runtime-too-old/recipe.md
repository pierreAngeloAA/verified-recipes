---
id: github-actions-action-runtime-too-old
title: Old major versions of actions no longer run
stack: github-actions
applies_to: ">= 2024"
tags: ["actions", "versions", "node"]
errors: ["the runner of \"actions/checkout@v2\" action is too old to run on GitHub Actions"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/metadata-syntax#runs-for-javascript-actions"]
---

## Mistake

```yaml
- uses: actions/checkout@v2
- uses: actions/setup-node@v3
```

## Correct

```yaml
- uses: actions/checkout@v5
- uses: actions/setup-node@v5
# pin to a commit SHA and let Dependabot (github-actions ecosystem) bump it
```

## Why

Actions built for Node 12/16 are refused by current runners. Training data is full of @v2/@v3.
