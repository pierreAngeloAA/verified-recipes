import boto3
from support import aws_client, check
from boto3.dynamodb.conditions import Key
from botocore.stub import Stubber

def correct():
    table = aws_client("dynamodb", resource=True).Table("t")
    st = Stubber(table.meta.client)
    st.add_response("query", {"Items": []})
    st.activate()
    assert table.query(KeyConditionExpression=Key("pk").eq("u1"))["Items"] == []

def mistake():
    aws_client("dynamodb").query(TableName="t", KeyConditionExpression=Key("pk").eq("u1"))

check(__file__, correct, mistake)
