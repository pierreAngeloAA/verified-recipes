---
id: aws-head-object-404
title: head_object raises ClientError 404, not NoSuchKey
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "s3", "errors"]
errors: ["An error occurred (404) when calling the HeadObject operation: Not Found"]
sources: ["https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html"]
---

## Mistake

```python
try:
    s3.head_object(Bucket=b, Key=k)
except s3.exceptions.NoSuchKey:  # never matches
    exists = False
```

## Correct

```python
try:
    s3.head_object(Bucket=b, Key=k)
except botocore.exceptions.ClientError as e:
    if e.response["Error"]["Code"] != "404": raise
    exists = False
```

## Why

HEAD responses have no body, so S3 returns only the status code; boto3 maps it to code "404" (403 without s3:ListBucket).
