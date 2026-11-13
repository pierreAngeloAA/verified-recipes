from support import anthropic_client, check

ARGS = dict(model="claude-opus-5-5", max_tokens=1024, messages=[{"role": "user", "content": "hi"}], betas=["context-management-2025-06-27"])

def correct():
    anthropic_client().beta.messages.create(**ARGS)

def mistake():
    anthropic_client().messages.create(**ARGS)

check(__file__, correct, mistake)
