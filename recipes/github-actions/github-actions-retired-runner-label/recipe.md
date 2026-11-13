---
id: github-actions-retired-runner-label
title: Retired runner images like ubuntu-20.04 never start
stack: github-actions
applies_to: ">= 2024"
tags: ["runners", "ubuntu"]
errors: ["label \"ubuntu-20.04\" is unknown"]
sources: ["https://docs.github.com/en/actions/reference/runners/github-hosted-runners"]
---

## Mistake

```yaml
runs-on: ubuntu-20.04
```

## Correct

```yaml
runs-on: ubuntu-24.04  # or ubuntu-latest
```

## Why

Jobs on retired labels wait in the queue and then fail. Also ubuntu-18.04, macos-12, windows-2019.
