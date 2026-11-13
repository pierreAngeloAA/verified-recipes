---
id: terraform-file-path-module
title: file() paths in modules need path.module
stack: terraform
applies_to: ">= 0.12"
tags: ["modules", "functions", "paths"]
errors: ["no file exists at \"policy.json\""]
sources: ["https://developer.hashicorp.com/terraform/language/expressions/references#filesystem-and-workspace-info"]
---

## Mistake

```hcl
policy = file("policy.json")
```

## Correct

```hcl
policy = file("${path.module}/policy.json")  # also templatefile()
```

## Why

Relative paths resolve from the working directory where terraform runs, not the module folder.
