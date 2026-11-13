---
id: terraform-quoted-type-constraint
title: Variable types are not quoted
stack: terraform
applies_to: ">= 0.15"
tags: ["variables", "types", "migration"]
errors: ["Invalid quoted type constraints"]
sources: ["https://developer.hashicorp.com/terraform/language/values/variables"]
---

## Mistake

```hcl
variable "region" { type = "string" }
```

## Correct

```hcl
variable "region" { type = string }  # list(string), map(number), object({...})
```

## Why

Quoted types are 0.11 syntax and fail at init. Same for quoted references in depends_on and ignore_changes (deprecated).
