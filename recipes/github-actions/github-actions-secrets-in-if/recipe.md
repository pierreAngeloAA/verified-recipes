---
id: github-actions-secrets-in-if
title: The secrets context isn't available in if:
stack: github-actions
applies_to: ">= 2024"
tags: ["secrets", "conditions"]
errors: ["context \"secrets\" is not allowed here"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#context-availability"]
---

## Mistake

```yaml
- if: ${{ secrets.DEPLOY_TOKEN != '' }}
  run: ./deploy.sh
```

## Correct

```yaml
env:
  HAS_TOKEN: ${{ secrets.DEPLOY_TOKEN != '' }}
steps:
  - if: env.HAS_TOKEN == 'true'
    run: ./deploy.sh
```

## Why

Map the secret into env at job level and test that. Fork PRs get empty secrets.
