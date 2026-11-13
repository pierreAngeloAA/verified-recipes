import json
from support import check, openai_client

def chunk(delta, finish=None):
    return "data: " + json.dumps({"id": "c1", "object": "chat.completion.chunk", "created": 0, "model": "gpt-test",
                                  "choices": [{"index": 0, "delta": delta, "finish_reason": finish}]}) + "\n\n"

SSE = chunk({"role": "assistant", "content": "Par"}) + chunk({"content": "is"}) + chunk({}, "stop") + "data: [DONE]\n\n"

def stream():
    return openai_client(SSE, "text/event-stream").chat.completions.create(
        model="gpt-test", messages=[{"role": "user", "content": "hi"}], stream=True)

def correct():
    assert "".join(c.choices[0].delta.content or "" for c in stream() if c.choices) == "Paris"

def mistake():
    "".join(c.choices[0].delta.content for c in stream())

check(__file__, correct, mistake)
