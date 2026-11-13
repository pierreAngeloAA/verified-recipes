from support import check, openai_client

RESP = {"id": "r1", "object": "response", "created_at": 0, "model": "gpt-test", "status": "completed",
        "output": [{"type": "reasoning", "id": "rs1", "summary": []},
                   {"type": "message", "id": "m1", "role": "assistant", "status": "completed",
                    "content": [{"type": "output_text", "text": "Paris", "annotations": []}]}],
        "parallel_tool_calls": True, "tool_choice": "auto", "tools": []}

def correct():
    assert openai_client(RESP).responses.create(model="gpt-test", input="hi").output_text == "Paris"

def mistake():
    openai_client(RESP).responses.create(model="gpt-test", input="hi").output[0].content[0].text

check(__file__, correct, mistake)
