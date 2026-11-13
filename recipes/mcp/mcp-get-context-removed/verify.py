import asyncio
from support import check

def correct():
    from mcp.server.mcpserver import Context, MCPServer
    server = MCPServer("demo")

    @server.tool()
    async def whoami(ctx: Context) -> str:
        return ctx.mcp_server.name

    assert asyncio.run(server.call_tool("whoami", {})).content[0].text == "demo"

def mistake():
    from mcp.server.mcpserver import MCPServer
    MCPServer("demo").get_context()

check(__file__, correct, mistake)
