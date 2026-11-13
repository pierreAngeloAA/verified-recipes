from support import check
import socket, ssl

def correct():
    ctx = ssl.create_default_context()
    with socket.socket() as s, ctx.wrap_socket(s, server_hostname="example.com", do_handshake_on_connect=False) as t:
        assert ctx.check_hostname and t.server_hostname == "example.com"

def mistake():
    with socket.socket() as s:
        ssl.wrap_socket(s)

check(__file__, correct, mistake)
