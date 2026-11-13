from support import check
import asyncio

async def main():
    return asyncio.get_running_loop() is not None

def correct():
    assert asyncio.run(main())

def mistake():
    asyncio.set_event_loop(None)
    asyncio.get_event_loop().run_until_complete(main())

check(__file__, correct, mistake)
