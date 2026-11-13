from support import check

def correct():
    from mcp.server.lowlevel import Server
    from mcp.types import ListToolsResult

    async def list_tools(ctx, params):
        return ListToolsResult(tools=[])

    Server("demo", on_list_tools=list_tools)

def mistake():
    from mcp.server.lowlevel import Server
    server = Server("demo")

    @server.list_tools()
    async def list_tools():
        return []

check(__file__, correct, mistake)
