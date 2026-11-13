---
id: kubernetes-cronjob-v1beta1-removed
title: CronJob is batch/v1
stack: kubernetes
applies_to: ">= 1.25"
tags: ["cronjob", "jobs", "apiversion", "migration"]
errors: ["no matches for kind \"CronJob\" in version \"batch/v1beta1\""]
sources: ["https://kubernetes.io/docs/reference/using-api/deprecation-guide/"]
---

## Mistake

```yaml
apiVersion: batch/v1beta1
kind: CronJob
```

## Correct

```yaml
apiVersion: batch/v1
kind: CronJob  # same spec; optional spec.timeZone: "Etc/UTC"
```

## Why

batch/v1beta1 was removed in 1.25.
