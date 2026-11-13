from support import check, openai_client

def correct():
    r = openai_client().chat.completions.create(model="gpt-test", messages=[{"role": "user", "content": "hi"}])
    assert r.choices[0].message.content == "Paris"

def mistake():
    import openai
    openai.ChatCompletion.create(model="gpt-test", messages=[{"role": "user", "content": "hi"}])

check(__file__, correct, mistake)
