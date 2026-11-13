---
id: aws-dynamodb-float-decimal
title: DynamoDB rejects Python floats; use Decimal
stack: aws
applies_to: ">= 1.20"
tags: ["boto3", "dynamodb", "decimal", "json"]
errors: ["Float types are not supported. Use Decimal types instead."]
sources: ["https://boto3.amazonaws.com/v1/documentation/api/latest/reference/customizations/dynamodb.html"]
---

## Mistake

```python
table.put_item(Item={"id": "1", "price": 9.99})
table.put_item(Item=json.loads(body))  # floats inside
```

## Correct

```python
from decimal import Decimal
table.put_item(Item={"id": "1", "price": Decimal("9.99")})
table.put_item(Item=json.loads(body, parse_float=Decimal))
```

## Why

Floats lose precision, so the serializer refuses them. Reads return Decimal; dump with `json.dumps(item, default=str)`.
