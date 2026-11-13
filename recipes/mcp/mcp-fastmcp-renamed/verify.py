import asyncio
from support import check

def correct():
    from mcp.server.mcpserver import MCPServer
    server = MCPServer("demo")

    @server.tool()
    def add(a: int, b: int) -> int:
        return a + b

    assert asyncio.run(server.call_tool("add", {"a": 1, "b": 2})).structured_content == {"result": 3}

def mistake():
    from mcp.server.fastmcp import FastMCP  # noqa: F401

check(__file__, correct, mistake)
