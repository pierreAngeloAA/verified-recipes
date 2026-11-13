from support import check

def correct():
    from mcp.client.streamable_http import streamable_http_client  # noqa: F401

def mistake():
    from mcp.client.streamable_http import streamablehttp_client  # noqa: F401

check(__file__, correct, mistake)
