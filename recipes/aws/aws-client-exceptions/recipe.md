---
id: aws-client-exceptions
title: Service errors live on client.exceptions, not boto3.exceptions
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "s3", "errors"]
errors: ["module 'boto3.exceptions' has no attribute 'NoSuchKey'"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/guide/error-handling.html"]
---

## Mistake

```python
except boto3.exceptions.NoSuchKey:
```

## Correct

```python
except s3.exceptions.NoSuchKey:
# or: except botocore.exceptions.ClientError as e: e.response["Error"]["Code"] == "NoSuchKey"
```

## Why

Service exceptions are generated per client from the API model.
