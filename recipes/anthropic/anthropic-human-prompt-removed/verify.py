from support import anthropic_client, check

def correct():
    messages = [{"role": "user", "content": "hi"}, {"role": "assistant", "content": "Hello"}, {"role": "user", "content": "Capital of France?"}]
    assert anthropic_client().messages.create(model="claude-opus-5-5", max_tokens=1024, messages=messages).content[0].text == "Paris"

def mistake():
    from anthropic import AI_PROMPT, HUMAN_PROMPT  # noqa: F401

check(__file__, correct, mistake)
