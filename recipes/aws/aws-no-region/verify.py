import boto3
from support import aws_client, check
import os
os.environ.update(AWS_CONFIG_FILE="/dev/null", AWS_SHARED_CREDENTIALS_FILE="/dev/null")
for k in ("AWS_REGION", "AWS_DEFAULT_REGION"): os.environ.pop(k, None)

def correct():
    assert boto3.client("sqs", region_name="us-east-1").meta.region_name == "us-east-1"

def mistake():
    boto3.client("sqs")

check(__file__, correct, mistake)
