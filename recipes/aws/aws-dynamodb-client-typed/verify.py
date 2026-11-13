import boto3
from support import aws_client, check
from botocore.stub import Stubber

def correct():
    ddb = aws_client("dynamodb"); st = Stubber(ddb)
    st.add_response("put_item", {}, {"TableName": "t", "Item": {"id": {"N": "1"}}}); st.activate()
    ddb.put_item(TableName="t", Item={"id": {"N": "1"}})

def mistake():
    aws_client("dynamodb").put_item(TableName="t", Item={"id": 1})

check(__file__, correct, mistake)
