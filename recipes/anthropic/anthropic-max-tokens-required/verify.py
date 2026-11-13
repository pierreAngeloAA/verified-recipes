from support import anthropic_client, check

def correct():
    anthropic_client().messages.create(model="claude-opus-5-5", max_tokens=16000, messages=[{"role": "user", "content": "hi"}])

def mistake():
    anthropic_client().messages.create(model="claude-opus-5-5", messages=[{"role": "user", "content": "hi"}])

check(__file__, correct, mistake)
