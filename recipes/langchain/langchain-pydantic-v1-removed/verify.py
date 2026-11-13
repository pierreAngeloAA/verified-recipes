from support import check

def correct():
    from langchain_core.tools import tool
    from pydantic import BaseModel

    class City(BaseModel):
        name: str

    @tool(args_schema=City)
    def weather(name: str) -> str:
        """Weather for a city."""
        return f"sunny in {name}"

    assert weather.invoke({"name": "Paris"}) == "sunny in Paris"

def mistake():
    from langchain_core.pydantic_v1 import BaseModel  # noqa: F401

check(__file__, correct, mistake)
