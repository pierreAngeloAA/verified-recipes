import boto3
from support import aws_client, check
from botocore.stub import Stubber
EMPTY = {"KeyCount": 0, "IsTruncated": False}

def client():
    s3 = aws_client("s3"); st = Stubber(s3); st.add_response("list_objects_v2", EMPTY); st.activate()
    return s3

def correct():
    pages = client().get_paginator("list_objects_v2").paginate(Bucket="b")
    assert [o["Key"] for page in pages for o in page.get("Contents", [])] == []

def mistake():
    [o["Key"] for o in client().list_objects_v2(Bucket="b")["Contents"]]

check(__file__, correct, mistake)
