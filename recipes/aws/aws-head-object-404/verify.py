import boto3
from support import aws_client, check
import botocore
from botocore.stub import Stubber

def head(catch):
    s3 = aws_client("s3"); st = Stubber(s3)
    st.add_client_error("head_object", "404", "Not Found", http_status_code=404); st.activate()
    try:
        s3.head_object(Bucket="b", Key="k")
    except catch(s3) as e:
        return e

def correct():
    assert head(lambda s3: botocore.exceptions.ClientError).response["Error"]["Code"] == "404"

def mistake():
    head(lambda s3: s3.exceptions.NoSuchKey)

check(__file__, correct, mistake)
