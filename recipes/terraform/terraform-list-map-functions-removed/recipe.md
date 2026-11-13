---
id: terraform-list-map-functions-removed
title: list() and map() functions are removed
stack: terraform
applies_to: ">= 0.15"
tags: ["functions", "collections", "migration"]
errors: ["Call to function \"list\" failed"]
sources: ["https://developer.hashicorp.com/terraform/language/functions/tolist"]
---

## Mistake

```hcl
value = list("a", "b")
tags  = map("Name", "web")
```

## Correct

```hcl
value = ["a", "b"]   # or tolist([...])
tags  = { Name = "web" }  # or tomap({...})
```

## Why

Removed in 0.15; literal syntax replaces them.
