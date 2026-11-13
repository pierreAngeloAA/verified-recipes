import asyncio
import warnings
from support import chat_completion, check

def client():
    import httpx2
    import openai
    transport = httpx2.MockTransport(lambda req: httpx2.Response(200, json=chat_completion({"content": "Paris"})))
    return openai.AsyncOpenAI(api_key="test", http_client=httpx2.AsyncClient(transport=transport), max_retries=0)

ARGS = dict(model="gpt-test", messages=[{"role": "user", "content": "hi"}])

def correct():
    async def run():
        return (await client().chat.completions.create(**ARGS)).choices[0].message.content
    assert asyncio.run(run()) == "Paris"

def mistake():
    warnings.simplefilter("ignore", RuntimeWarning)
    client().chat.completions.create(**ARGS).choices

check(__file__, correct, mistake)
