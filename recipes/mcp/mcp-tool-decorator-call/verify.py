import asyncio
from support import check

def correct():
    from mcp.server.mcpserver import MCPServer
    server = MCPServer("demo")

    @server.tool()
    def echo(text: str) -> str:
        return text

    assert asyncio.run(server.call_tool("echo", {"text": "hi"})).content[0].text == "hi"

def mistake():
    from mcp.server.mcpserver import MCPServer
    server = MCPServer("demo")

    @server.tool
    def echo(text: str) -> str:
        return text

check(__file__, correct, mistake)
