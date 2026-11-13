---
id: terraform-for-each-list
title: for_each needs a map or set, not a list
stack: terraform
applies_to: ">= 0.12.6"
tags: ["for_each", "loops", "collections"]
errors: ["Invalid for_each argument", "must be a map, or set of strings, and you have provided a value of type"]
sources: ["https://developer.hashicorp.com/terraform/language/meta-arguments/for_each"]
---

## Mistake

```hcl
for_each = ["a", "b"]
```

## Correct

```hcl
for_each = toset(["a", "b"])  # each.key == each.value
# objects: for_each = { for u in var.users : u.name => u }
```

## Why

Keys must be stable strings so removing one item doesn't shift the others, which happens with count.
