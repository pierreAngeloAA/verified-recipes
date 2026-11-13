---
id: terraform-for-each-unknown-keys
title: for_each keys must be known at plan time
stack: terraform
applies_to: ">= 0.12.6"
tags: ["for_each", "plan", "unknown-values"]
errors: ["Invalid for_each argument", "set includes values derived from resource attributes that"]
sources: ["https://developer.hashicorp.com/terraform/language/meta-arguments/for_each#limitations-on-values-used-in-for_each"]
---

## Mistake

```hcl
for_each = toset(aws_instance.web[*].id)
```

## Correct

```hcl
# key on values you write; keep computed ids in the value
for_each = { for name in var.names : name => aws_instance.web[name].id }
```

## Why

Keys decide how many instances exist, so they cannot depend on IDs created by the same apply. Avoid `-target` workarounds.
