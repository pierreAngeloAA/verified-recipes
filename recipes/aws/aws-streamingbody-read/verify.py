import boto3
from support import aws_client, check
import io, json
from botocore.response import StreamingBody
from botocore.stub import Stubber

def obj():
    s3 = aws_client("s3"); st = Stubber(s3)
    st.add_response("get_object", {"Body": StreamingBody(io.BytesIO(b'{"a":1}'), 7)}); st.activate()
    return s3.get_object(Bucket="b", Key="k")

def correct():
    assert json.loads(obj()["Body"].read()) == {"a": 1}

def mistake():
    json.loads(obj()["Body"])

check(__file__, correct, mistake)
