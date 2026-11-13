from support import check

def result():
    from mcp.types import CallToolResult, TextContent
    return CallToolResult(content=[TextContent(type="text", text="boom")], is_error=True)

def correct():
    assert result().is_error and result().model_dump(by_alias=True)["isError"]

def mistake():
    result().isError

check(__file__, correct, mistake)
