---
id: github-actions-needs-for-outputs
title: Reading another job's outputs requires needs:
stack: github-actions
applies_to: ">= 2024"
tags: ["jobs", "outputs", "dependencies"]
errors: ["property \"build\" is not defined in object type {}"]
sources: ["https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs"]
---

## Mistake

```yaml
deploy:
  steps:
    - run: echo ${{ needs.build.outputs.tag }}
```

## Correct

```yaml
deploy:
  needs: build
  steps:
    - run: echo ${{ needs.build.outputs.tag }}
# and in build: outputs: { tag: ${{ steps.version.outputs.tag }} }
```

## Why

Without needs, jobs run in parallel and the needs context is empty.
