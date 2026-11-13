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

PACKAGES = {"aws": ["boto3", "botocore"], "redis": ["redis"], "langchain": ["langchain", "langchain-core"], "python": []}


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
    print("VERSIONS " + json.dumps({**versions, **SERVER_VERSIONS, "python": platform.python_version()}))


SERVER_VERSIONS = {}


def redis_client():
    """Real throwaway Redis: redis:latest in Docker, else a local redis-server on a free port. Stopped at exit."""
    import atexit, shutil, socket, subprocess, time
    import redis
    if shutil.which("docker") and subprocess.run(["docker", "info"], capture_output=True).returncode == 0:
        cid = subprocess.check_output(["docker", "run", "-d", "--rm", "-p", "127.0.0.1::6379", "redis:latest"], text=True).strip()
        atexit.register(subprocess.run, ["docker", "rm", "-f", cid], capture_output=True)
        port = int(subprocess.check_output(["docker", "port", cid, "6379"], text=True).split(":")[-1])
    else:
        with socket.socket() as s:
            s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]
        proc = subprocess.Popen(["redis-server", "--port", str(port), "--save", "", "--appendonly", "no"], stdout=subprocess.DEVNULL)
        atexit.register(proc.kill)
    client = redis.Redis(port=port)
    for _ in range(100):
        try:
            client.ping(); break
        except redis.ConnectionError:
            time.sleep(0.1)
    SERVER_VERSIONS["redis-server"] = client.info()["redis_version"]
    return client


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
