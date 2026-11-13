from support import anthropic_client, check

ARGS = dict(model="claude-opus-5-5", max_tokens=1024, system="long stable prompt", messages=[{"role": "user", "content": "hi"}])

def correct():
    anthropic_client().messages.create(**ARGS, cache_control={"type": "ephemeral"})

def mistake():
    anthropic_client().beta.prompt_caching.messages.create(**ARGS)

check(__file__, correct, mistake)
