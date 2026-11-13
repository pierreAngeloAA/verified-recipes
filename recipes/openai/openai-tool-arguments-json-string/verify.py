import json
from support import chat_completion, check, openai_client

CALL = {"content": None, "tool_calls": [{"id": "t1", "type": "function", "function": {"name": "weather", "arguments": "{\"city\": \"Paris\"}"}}]}

def call():
    r = openai_client(chat_completion(CALL)).chat.completions.create(model="gpt-test", messages=[{"role": "user", "content": "hi"}])
    return r.choices[0].message.tool_calls[0]

def correct():
    assert json.loads(call().function.arguments)["city"] == "Paris"

def mistake():
    call().function.arguments["city"]

check(__file__, correct, mistake)
