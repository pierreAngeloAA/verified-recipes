---
id: terraform-variables-in-backend
title: Backend blocks cannot use variables
stack: terraform
applies_to: ">= 0.9"
tags: ["backend", "state", "variables"]
errors: ["Variables not allowed"]
sources: ["https://developer.hashicorp.com/terraform/language/backend#partial-configuration"]
---

## Mistake

```hcl
backend "s3" {
  bucket = var.state_bucket
}
```

## Correct

```hcl
backend "s3" {}  # partial configuration
# terraform init -backend-config="bucket=my-state" (or -backend-config=prod.s3.tfbackend)
```

## Why

The backend is configured before variables exist. Locals and functions are not allowed either.
