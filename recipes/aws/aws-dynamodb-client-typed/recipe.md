---
id: aws-dynamodb-client-typed
title: The DynamoDB client needs typed attribute values
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "dynamodb"]
errors: ["Invalid type for parameter Item.id, value: 1"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/client/put_item.html"]
---

## Mistake

```python
ddb = boto3.client("dynamodb")
ddb.put_item(TableName="t", Item={"id": 1, "name": "a"})
```

## Correct

```python
ddb.put_item(TableName="t", Item={"id": {"N": "1"}, "name": {"S": "a"}})
# or plain values via the resource: boto3.resource("dynamodb").Table("t").put_item(Item={...})
```

## Why

The low-level client sends DynamoDB JSON. `boto3.dynamodb.types.TypeSerializer` converts plain values.
