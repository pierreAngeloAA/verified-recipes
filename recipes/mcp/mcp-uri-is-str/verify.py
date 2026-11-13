from urllib.parse import urlparse
from support import check

def resource():
    from mcp.types import Resource
    return Resource(uri="https://example.com/a.txt", name="a")

def correct():
    assert urlparse(resource().uri).hostname == "example.com"

def mistake():
    resource().uri.host

check(__file__, correct, mistake)
