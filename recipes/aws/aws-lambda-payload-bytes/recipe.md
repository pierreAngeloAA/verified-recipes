---
id: aws-lambda-payload-bytes
title: lambda.invoke Payload must be JSON text, not a dict
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "lambda", "json"]
errors: ["Invalid type for parameter Payload, value: {'a': 1}"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/lambda/client/invoke.html"]
---

## Mistake

```python
lam.invoke(FunctionName="f", Payload={"a": 1})
```

## Correct

```python
r = lam.invoke(FunctionName="f", Payload=json.dumps({"a": 1}))
result = json.loads(r["Payload"].read())
```

## Why

Same for SQS MessageBody and SNS Message: they take strings. The response Payload is a stream.
