---
id: terraform-sensitive-output
title: Outputs of sensitive values must be marked sensitive
stack: terraform
applies_to: ">= 0.15"
tags: ["outputs", "secrets", "security"]
errors: ["Output refers to sensitive values"]
sources: ["https://developer.hashicorp.com/terraform/language/values/outputs#sensitive"]
---

## Mistake

```hcl
output "db_password" { value = var.db_password }
```

## Correct

```hcl
output "db_password" {
  value     = var.db_password
  sensitive = true  # read with: terraform output -raw db_password
}
```

## Why

The value is still stored in plain text in state; protect the state backend. Use nonsensitive() only for derived non-secret values.
