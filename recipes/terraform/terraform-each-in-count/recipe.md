---
id: terraform-each-in-count
title: each.value only exists with for_each
stack: terraform
applies_to: ">= 0.12.6"
tags: ["for_each", "count", "loops"]
errors: ["each.value cannot be used in this context"]
sources: ["https://developer.hashicorp.com/terraform/language/meta-arguments/count"]
---

## Mistake

```hcl
count = length(var.names)
name  = each.value
```

## Correct

```hcl
for_each = toset(var.names)
name     = each.value
# with count: name = var.names[count.index]
```

## Why

count exposes only count.index. Prefer for_each for named items.
