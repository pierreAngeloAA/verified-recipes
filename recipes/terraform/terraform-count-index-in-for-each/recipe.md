---
id: terraform-count-index-in-for-each
title: count.index only exists with count
stack: terraform
applies_to: ">= 0.12"
tags: ["for_each", "count", "loops"]
errors: ["Reference to \"count\" in non-counted context"]
sources: ["https://developer.hashicorp.com/terraform/language/meta-arguments/for_each"]
---

## Mistake

```hcl
for_each = toset(var.names)
name     = "web-${count.index}"
```

## Correct

```hcl
for_each = toset(var.names)
name     = "web-${each.key}"
```

## Why

for_each exposes each.key and each.value; there is no numeric index.
