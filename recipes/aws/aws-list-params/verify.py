import boto3
from support import aws_client, check
from botocore.stub import Stubber

def correct():
    ec2 = aws_client("ec2"); st = Stubber(ec2)
    st.add_response("describe_instances", {"Reservations": []}, {"InstanceIds": ["i-1"]}); st.activate()
    assert ec2.describe_instances(InstanceIds=["i-1"])["Reservations"] == []

def mistake():
    aws_client("ec2").describe_instances(InstanceIds="i-1")

check(__file__, correct, mistake)
