from support import anthropic_client, check

TOOL = {"name": "get_weather", "description": "Weather for a city", "input_schema": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}
ARGS = dict(model="claude-opus-5-5", max_tokens=1024, tools=[TOOL], messages=[{"role": "user", "content": "Weather in Paris?"}])

def correct():
    anthropic_client().messages.create(**ARGS)

def mistake():
    anthropic_client().beta.tools.messages.create(**ARGS)

check(__file__, correct, mistake)
