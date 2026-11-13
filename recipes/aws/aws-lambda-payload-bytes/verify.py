import boto3
from support import aws_client, check
import io, json
from botocore.response import StreamingBody
from botocore.stub import Stubber

def correct():
    lam = aws_client("lambda"); st = Stubber(lam)
    st.add_response("invoke", {"StatusCode": 200, "Payload": StreamingBody(io.BytesIO(b"1"), 1)}); st.activate()
    assert json.loads(lam.invoke(FunctionName="f", Payload=json.dumps({"a": 1}))["Payload"].read()) == 1

def mistake():
    aws_client("lambda").invoke(FunctionName="f", Payload={"a": 1})

check(__file__, correct, mistake)
