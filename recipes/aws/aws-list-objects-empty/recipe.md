---
id: aws-list-objects-empty
title: list_objects_v2 omits Contents when nothing matches
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "s3", "pagination"]
errors: ["KeyError: 'Contents'"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/list_objects_v2.html"]
---

## Mistake

```python
keys = [o["Key"] for o in s3.list_objects_v2(Bucket=b, Prefix=p)["Contents"]]
```

## Correct

```python
pages = s3.get_paginator("list_objects_v2").paginate(Bucket=b, Prefix=p)
keys = [o["Key"] for page in pages for o in page.get("Contents", [])]
```

## Why

Empty results have no Contents key, and one call returns at most 1000 keys; the paginator handles both.
