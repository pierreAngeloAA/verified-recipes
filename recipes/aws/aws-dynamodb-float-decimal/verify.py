import boto3
from support import aws_client, check
from decimal import Decimal
from boto3.dynamodb.types import TypeSerializer

def correct():
    assert TypeSerializer().serialize(Decimal("9.99")) == {"N": "9.99"}

def mistake():
    TypeSerializer().serialize(9.99)  # what Table.put_item runs on each value

check(__file__, correct, mistake)
