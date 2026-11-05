# verified-recipes

Short, executable coding recipes for AI agents. Each recipe covers one thing agents tend to get wrong, and is backed by a script that runs against the latest framework versions.

## The problem

AI coding agents write from memory. When a framework changes, they can confidently produce code that no longer works, then burn several attempts recovering from the error.

## How it works

Before writing code, or after hitting an error, an agent looks up a recipe and gets a compact answer:

- **The mistake:** what agents commonly write.
- **The fix:** the form that works today.
- **The error messages:** what the failure looks like, so it can be found by searching for the message.
- **The evidence:** the versions and date of the last run, plus whether it passed.

The verification script checks both sides: the correct form must work **and** the mistake must still fail. If a new release changes either result, the recipe is flagged instead of quietly going stale.

## Who it is for

- **People using AI coding tools** who want fewer failed attempts.
- **Agent builders** who need a small, free source of version-aware facts.

It does not replace official documentation, and it knows nothing about your project. It only covers specific, testable traps.

## Connect an agent

The MCP server runs on your machine and has two read-only tools: `search_recipes` and `get_recipe`. To run it from a clone:

```bash
git clone https://github.com/pierreAngeloAA/verified-recipes.git
cd verified-recipes
npm install
npm run build
```

Then add it to your client's MCP configuration, using the absolute path to your clone:

```json
{
  "mcpServers": {
    "verified-recipes": {
      "command": "node",
      "args": ["/absolute/path/to/verified-recipes/mcp/server.mjs"]
    }
  }
}
```

The server looks for the newest published index and falls back to its bundled copy. Set `VERIFIED_RECIPES_INDEX_URL=off` to stay offline.

## Status

Early stage. The recipe format and tooling are still changing.

## License

[MIT](LICENSE)
