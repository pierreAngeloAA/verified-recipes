# Contributing

## What makes a good recipe

The [first evaluation](eval/README.md) found that models already know older, well-documented changes, so recipes on those topics do not add much. The most useful contributions are:

1. **Failures you saw in a real agent session.** Include the wrong code the agent wrote and the error it got.
2. **Changes in recent releases**, which models may not have learned yet.

A recipe must cover one specific trap, and the mistake must fail or misbehave when run. Style preferences and general advice do not qualify.

## Add a recipe

You need Node.js 20 or later, plus the tool for your stack: Go for Go and Kubernetes, Terraform for Terraform, Python 3 for Python and the AI SDK and AWS stacks (anthropic, openai, mcp, langchain, aws), Ruby for Rails, or Docker for Docker, Spring Boot and Swift. Node.js, React and TypeScript need only Node.js.

1. Copy `recipes/TEMPLATE.md` to `recipes/<stack>/<id>/recipe.md`. The [recipe guide](recipes/README.md) describes each field.
2. Add the verification script. It must prove that the correct code works **and** that the mistake still fails with a listed error.
3. Run the checks:

   ```bash
   npm install
   npm test
   npm run validate
   npm run verify -- --id <id>
   ```

4. Break your correct code on purpose and confirm that verification fails, then restore it.
5. Open a pull request. Include the versions you tested and a link to an official source. If the recipe comes from a real session, include that failure too.

## Before you open a pull request

- Do not add dates or tested versions to a recipe. Verification records them.
- Add new source hosts to the allowlist in `tools/lib/recipes.mjs`, and explain why in the pull request.
- Read the [security rules](SECURITY.md). Recipes are read by AI agents, so every recipe and script gets a human review before it is merged.
- To measure a recipe's effect, add a task to `eval/tasks/` with `good.rb` and `bad.rb`, then confirm it with `npm run eval -- --self-check`.

## Report a problem

Open an issue if a recipe is wrong or out of date. Include the versions you used and the output. Report security problems [privately](SECURITY.md#reporting-a-problem).
