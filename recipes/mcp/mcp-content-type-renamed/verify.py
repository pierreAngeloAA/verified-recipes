from support import check

def correct():
    from mcp.types import ContentBlock, TextContent
    block: ContentBlock = TextContent(type="text", text="hi")
    assert block.text == "hi"

def mistake():
    from mcp.types import Content  # noqa: F401

check(__file__, correct, mistake)
