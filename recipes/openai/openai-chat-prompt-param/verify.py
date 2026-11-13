from support import check, openai_client

def correct():
    openai_client().chat.completions.create(model="gpt-test", messages=[{"role": "user", "content": "hi"}])

def mistake():
    openai_client().chat.completions.create(model="gpt-test", prompt="hi")

check(__file__, correct, mistake)
