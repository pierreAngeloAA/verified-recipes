---
id: terraform-index-for-each-resource
title: Resources with for_each are maps; index by key
stack: terraform
applies_to: ">= 0.12.6"
tags: ["for_each", "references", "outputs"]
errors: ["Invalid index", "object only supports looking up attributes by name, not by numeric index"]
sources: ["https://developer.hashicorp.com/terraform/language/meta-arguments/for_each#referring-to-instances"]
---

## Mistake

```hcl
value = aws_instance.web[0].id
```

## Correct

```hcl
value = aws_instance.web["a"].id
# all: [for k, v in aws_instance.web : v.id] or values(aws_instance.web)[*].id
```

## Why

`[0]` and `.*` only work with count.
