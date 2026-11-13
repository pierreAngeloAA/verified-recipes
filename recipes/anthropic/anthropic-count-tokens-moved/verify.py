from support import anthropic_client, check

def correct():
    n = anthropic_client({"input_tokens": 5}).messages.count_tokens(model="claude-opus-5-5", messages=[{"role": "user", "content": "hi"}])
    assert n.input_tokens == 5

def mistake():
    anthropic_client().count_tokens("hi")

check(__file__, correct, mistake)
