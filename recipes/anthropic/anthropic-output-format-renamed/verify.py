from support import anthropic_client, check

SCHEMA = {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"], "additionalProperties": False}
ARGS = dict(model="claude-opus-5-5", max_tokens=1024, messages=[{"role": "user", "content": "hi"}])

def correct():
    anthropic_client().messages.create(**ARGS, output_config={"format": {"type": "json_schema", "schema": SCHEMA}})

def mistake():
    anthropic_client().messages.create(**ARGS, output_format={"type": "json_schema", "schema": SCHEMA})

check(__file__, correct, mistake)
