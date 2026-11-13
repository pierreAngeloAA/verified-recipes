---
id: github-actions-if-always-true
title: Text outside ${{ }} in if: makes it always true
stack: github-actions
applies_to: ">= 2024"
tags: ["conditions", "expressions"]
errors: ["is always evaluated to true because extra characters are around ${{ }}"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/expressions"]
---

## Mistake

```yaml
if: ${{ github.ref == 'refs/heads/main' }} && success()
```

## Correct

```yaml
if: github.ref == 'refs/heads/main' && success()
```

## Why

The result is a non-empty string, which is truthy. Write the whole condition inside one expression, or drop ${{ }}.
