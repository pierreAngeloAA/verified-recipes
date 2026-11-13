---
id: github-actions-untrusted-input-in-run
title: Don't interpolate event text into run scripts
stack: github-actions
applies_to: ">= 2024"
tags: ["security", "injection", "pull-requests"]
errors: ["\"github.event.issue.title\" is potentially untrusted"]
sources: ["https://docs.github.com/en/actions/reference/security/secure-use#use-an-intermediate-environment-variable"]
---

## Mistake

```yaml
on: issues
...
- run: echo "${{ github.event.issue.title }}"
```

## Correct

```yaml
- env:
    TITLE: ${{ github.event.issue.title }}
  run: echo "$TITLE"
```

## Why

${{ }} is pasted into the script before the shell runs, so a title like `$(whoami)` runs as shell code. Also PR titles, branch names, commit messages.
