---
id: github-actions-cron-five-fields
title: schedule cron needs exactly 5 fields (UTC)
stack: github-actions
applies_to: ">= 2024"
tags: ["schedule", "cron"]
errors: ["invalid CRON format \"0 6 * *\" in schedule event: expected exactly 5 fields, found 4"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule"]
---

## Mistake

```yaml
on:
  schedule:
    - cron: '0 6 * *'
```

## Correct

```yaml
on:
  schedule:
    - cron: '0 6 * * 1'  # minute hour day month weekday, in UTC
```

## Why

No seconds field and no timezone (unless `timezone:` is set). Scheduled runs only fire on the default branch.
