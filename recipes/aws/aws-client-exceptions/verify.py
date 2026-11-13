import boto3
from support import aws_client, check
from botocore.stub import Stubber

def get(exc_of):
    s3 = aws_client("s3"); st = Stubber(s3); st.add_client_error("get_object", "NoSuchKey"); st.activate()
    try:
        s3.get_object(Bucket="b", Key="k")
    except exc_of(s3):
        return None

def correct():
    assert get(lambda s3: s3.exceptions.NoSuchKey) is None

def mistake():
    get(lambda s3: boto3.exceptions.NoSuchKey)

check(__file__, correct, mistake)
