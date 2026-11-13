import asyncio
import socket
from support import check

def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]

def correct():
    from mcp.server.mcpserver import MCPServer
    port = free_port()

    async def main():
        task = asyncio.create_task(MCPServer("demo").run_streamable_http_async(port=port))
        for _ in range(50):
            try:
                await asyncio.open_connection("127.0.0.1", port)
                break
            except OSError:
                await asyncio.sleep(0.1)
        else:
            raise AssertionError("server did not listen on the port")
        task.cancel()

    asyncio.run(main())

def mistake():
    from mcp.server.mcpserver import MCPServer
    MCPServer("demo", port=9000)

check(__file__, correct, mistake)
