from support import anthropic_client, check

def ask():
    return anthropic_client().messages.create(model="claude-opus-5-5", max_tokens=1024, messages=[{"role": "user", "content": "hi"}])

def correct():
    assert "".join(b.text for b in ask().content if b.type == "text") == "Paris"

def mistake():
    ask().content.strip()

check(__file__, correct, mistake)
