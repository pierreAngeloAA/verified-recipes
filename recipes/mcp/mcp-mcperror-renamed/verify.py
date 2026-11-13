from support import check

def correct():
    from mcp.shared.exceptions import MCPError
    try:
        raise MCPError(-32602, "bad input")
    except MCPError as e:
        assert e.message == "bad input"

def mistake():
    from mcp.shared.exceptions import McpError  # noqa: F401

check(__file__, correct, mistake)
