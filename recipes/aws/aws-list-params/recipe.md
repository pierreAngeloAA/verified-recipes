---
id: aws-list-params
title: Id list parameters need a list, even for one id
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "ec2", "params"]
errors: ["Invalid type for parameter InstanceIds, value: i-1"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ec2/client/describe_instances.html"]
---

## Mistake

```python
ec2.describe_instances(InstanceIds="i-0abc")
```

## Correct

```python
ec2.describe_instances(InstanceIds=["i-0abc"])
```

## Why

Applies to every plural parameter (InstanceIds, GroupIds, Filters[].Values, Entries...).
