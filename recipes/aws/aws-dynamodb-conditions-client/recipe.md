---
id: aws-dynamodb-conditions-client
title: Key()/Attr() conditions work only with the resource Table
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "dynamodb", "query"]
errors: ["Invalid type for parameter KeyConditionExpression"]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/customizations/dynamodb.html#ref-dynamodb-conditions"]
---

## Mistake

```python
ddb = boto3.client("dynamodb")
ddb.query(TableName="t", KeyConditionExpression=Key("pk").eq("u1"))
```

## Correct

```python
table = boto3.resource("dynamodb").Table("t")
table.query(KeyConditionExpression=Key("pk").eq("u1"))
# client: KeyConditionExpression="pk = :v", ExpressionAttributeValues={":v": {"S": "u1"}}
```

## Why

Only the resource layer turns condition objects into expression strings and placeholders.
