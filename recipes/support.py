"""Shared by the Python stacks. A recipe's verify.py calls check(__file__, correct, mistake):
correct() must run, and mistake() must raise an exception whose text holds every listed error.
Mock clients answer HTTP calls locally, so no API key or network is used."""
import json
import platform
import re
import sys
import warnings
from importlib.metadata import version
from pathlib import Path

PACKAGES = {"aws": ["boto3", "botocore"], "langchain": ["langchain", "langchain-core"], "python": []}


def check(recipe_file, correct, mistake):
    path = Path(recipe_file).resolve()
    errors = json.loads(re.search(r"^errors: (\[.*\])$", path.with_name("recipe.md").read_text(), re.M)[1])
    stack = path.parent.parent.name
    if stack == "python":  # stdlib only: deprecations fail like removals
        warnings.simplefilter("error")
    correct()
    try:
        mistake()
    except Exception as exc:
        text = f"{type(exc).__name__}: {exc}"
    else:
        sys.exit("the mistake ran, but the recipe says it must fail")
    missing = [e for e in errors if e not in text]
    if missing:
        sys.exit(f"listed errors did not appear: {missing}\ngot: {text}")
    versions = {name: version(name) for name in PACKAGES.get(stack, [stack])}
    print("VERSIONS " + json.dumps({**versions, "python": platform.python_version()}))


def mock_http(body, content_type="application/json"):
    import httpx2

    def respond(request):
        if content_type == "application/json":
            return httpx2.Response(200, json=body)
        return httpx2.Response(200, text=body, headers={"content-type": content_type})

    return httpx2.Client(transport=httpx2.MockTransport(respond))


MESSAGE = {
    "id": "msg_1", "type": "message", "role": "assistant", "model": "claude-opus-5-5",
    "content": [{"type": "text", "text": "Paris"}], "stop_reason": "end_turn",
    "stop_sequence": None, "usage": {"input_tokens": 1, "output_tokens": 1},
}


def anthropic_client(body=MESSAGE):
    import anthropic
    return anthropic.Anthropic(api_key="test", http_client=mock_http(body), max_retries=0)


def chat_completion(message):
    return {
        "id": "c1", "object": "chat.completion", "created": 0, "model": "gpt-test",
        "choices": [{"index": 0, "finish_reason": "stop", "message": {"role": "assistant", **message}}],
    }


def openai_client(body=None, content_type="application/json"):
    import openai
    body = chat_completion({"content": "Paris"}) if body is None else body
    return openai.OpenAI(api_key="test", http_client=mock_http(body, content_type), max_retries=0)


def aws_client(service, resource=False):
    """Offline boto3 client: fake credentials, fixed region; pair with botocore.stub.Stubber for responses."""
    import boto3
    make = boto3.resource if resource else boto3.client
    return make(service, region_name="us-east-1", aws_access_key_id="test", aws_secret_access_key="test")
