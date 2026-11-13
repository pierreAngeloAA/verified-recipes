from support import check, openai_client

def ask():
    return openai_client().chat.completions.create(model="gpt-test", messages=[{"role": "user", "content": "hi"}])

def correct():
    assert ask().choices[0].message.content == "Paris"

def mistake():
    ask()["choices"][0]["message"]["content"]

check(__file__, correct, mistake)
