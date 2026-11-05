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

To add a short instruction to your project's `AGENTS.md` or `CLAUDE.md`, so agents know when to use the tools, run this from your project. It shows the change and asks first:

```bash
node /absolute/path/to/verified-recipes/mcp/cli.mjs init
```

The server answers from its bundled recipes and updates them from the published index in the background. Set `VERIFIED_RECIPES_INDEX_URL=off` to stay offline.

## Status

Early stage. The recipe format and tooling are still changing.

**The evidence so far is weak:** on older Rails changes, a model passed 15/15 tasks both with and without the recipes. On more recent Spring Boot changes, it passed 13/15 without them and 15/15 with them, which is too small a sample to prove a gain. With the server connected and no instruction to use it, the model used the recipes in only 3 of 30 runs. See [the evaluation](eval/README.md) for the data and limits.

## Usage history

A weekly workflow saves npm downloads, Git clones, repository views, stars and forks to the [`metrics` branch](https://github.com/pierreAngeloAA/verified-recipes/tree/metrics). These numbers show interest, not how often agents use the recipes. The MCP server sends no usage data.

## License

[MIT](LICENSE)
