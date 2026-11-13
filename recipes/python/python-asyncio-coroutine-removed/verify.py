from support import check
import asyncio

def correct():
    async def fetch():
        await asyncio.sleep(0)
        return 1
    assert asyncio.run(fetch()) == 1

def mistake():
    @asyncio.coroutine
    def fetch():
        yield from asyncio.sleep(0)

check(__file__, correct, mistake)
