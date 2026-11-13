from support import anthropic_client, check

def correct():
    anthropic_client().messages.create(model="claude-opus-5-5", max_tokens=1024, output_config={"effort": "low"},
                                       messages=[{"role": "user", "content": "hi"}])

def mistake():
    anthropic_client().messages.create(model="claude-opus-5-5", max_tokens=1024, temperature=0.2,
                                       messages=[{"role": "user", "content": "hi"}])

check(__file__, correct, mistake)
