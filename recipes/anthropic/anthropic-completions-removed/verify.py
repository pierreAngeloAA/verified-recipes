from support import anthropic_client, check

def correct():
    r = anthropic_client().messages.create(
        model="claude-opus-5-5", max_tokens=1024, messages=[{"role": "user", "content": "Capital of France?"}])
    assert r.content[0].text == "Paris"

def mistake():
    anthropic_client().completions.create(
        model="claude-opus-5-5", max_tokens_to_sample=1024, prompt="\n\nHuman: Capital of France?\n\nAssistant:")

check(__file__, correct, mistake)
