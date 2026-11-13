---
id: aws-streamingbody-read
title: get_object Body is a stream; call .read()
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "s3", "json"]
errors: ["the JSON object must be str, bytes or bytearray, not StreamingBody"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/get_object.html"]
---

## Mistake

```python
data = json.loads(s3.get_object(Bucket=b, Key=k)["Body"])
```

## Correct

```python
data = json.loads(s3.get_object(Bucket=b, Key=k)["Body"].read())
```

## Why

The body streams once; `.read()` returns bytes. Large files: `iter_lines()` or `download_file`.
