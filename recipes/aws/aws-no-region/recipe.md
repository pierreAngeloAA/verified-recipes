---
id: aws-no-region
title: boto3 clients need a region
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "config", "region"]
errors: ["NoRegionError: You must specify a region."]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html"]
---

## Mistake

```python
sqs = boto3.client("sqs")  # no AWS_REGION / ~/.aws/config in CI or Lambda tests
```

## Correct

```python
sqs = boto3.client("sqs", region_name=os.environ.get("AWS_REGION", "us-east-1"))
```

## Why

Credentials and region resolve separately; containers and CI often have neither config file. Lambda sets AWS_REGION.
