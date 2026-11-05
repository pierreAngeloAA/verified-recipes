# Evaluation

This measures whether the recipes help an agent write correct code. Each task runs with and without the recipes. The agent can only write a file, not run it, so the score shows whether its first answer is correct.

```bash
npm run eval -- --self-check            # Checks accept the correct code and reject the mistake
npm run eval -- --model haiku --runs 3  # Uses your Claude Code account and costs money
npm run eval -- --filter spring-        # Runs only the tasks with this name prefix
```

Spring Boot tasks need Docker, and run offline using packages cached by `npm run verify -- --stack spring`.

## Results on Rails, 2026-11-05

Claude Haiku, 5 Rails tasks, 3 runs per task in each mode, 30 runs in total. Raw data is in `results/`.

| Measure | Without recipes | With recipes |
|---|---|---|
| Tasks passed | 15/15 | 15/15 |
| Average time | 7.4 s | 9.6 s |
| Average tool calls | 1.2 | 4.3 |
| Average cost | $0.0024 | $0.0022 |

**The recipes did not improve correctness.** The model already knew all five changes and wrote the current form without help. Agents with the recipes took longer.

The one visible difference was in `user-params`. With the recipes, the agent used the one-line `params.expect` in all 3 runs. Without them, it used `params.require` in all 3 runs, and the run inspected in full added about 12 lines of manual checks. Both versions passed.

## What this means

These Rails changes date from 2023 to 2024, well before the model's training cutoff, so testing them shows little. The recipes would need to prove themselves on changes the model cannot know, or on failures logged from real sessions.

## Results on Spring Boot 4, 2026-11-05

Same design, with five tasks on more recent changes:

| Measure | Without recipes | With recipes |
|---|---|---|
| Tasks passed | 13/15 | 15/15 |
| Average time | 10.7 s | 15.7 s |
| Average tool calls | 1.0 | 5.2 |
| Average cost | $0.0025 | $0.0026 |

**This is the first sign of a gain, but the sample is too small to prove one.** Both failures were in `spring-rest-client`, where the agent imported `RestTemplateBuilder` from its old package, the exact mistake in the recipe. The other four tasks passed in every run, so the model already knew most of these changes. The recipes also added about 5 seconds per task.

## Do agents use the recipes unprompted? 2026-11-05

Same 10 tasks, 3 runs each, with the MCP server connected and no instruction to use it:

| Measure | Result |
|---|---|
| Runs that used the recipes | 3/30 |
| Rails tasks that used the recipes | 0/15 |
| Spring Boot tasks that used the recipes | 3/15 |
| Passed when the recipes were used | 3/3 |
| Passed when they were not used | 24/27 |
| Total cost reported | $0.051 |

**Connecting the server is not enough.** All three failures imported a Spring Boot class from its old package, a mistake covered by a recipe, and none of those runs searched the recipes. Agents could not see a compile error, which is one of the moments the tool description targets.

## With the `init` instruction, 2026-11-05

Same 10 tasks and 3 runs each, with the block from `init` in the project's `CLAUDE.md`:

| Measure | Server only | Server and instruction |
|---|---|---|
| Runs that used the recipes | 3/30 | 30/30 |
| Tasks passed | 27/30 | 30/30 |
| Average time per run | 7.9 s | 9.6 s |
| Average tool calls | 1.4 | 3.4 |
| Total cost reported | $0.051 | $0.062 |

**The instruction is what makes agents use the recipes.** It also makes them search on tasks where the model already knew the answer, which adds time and cost. The sample is small, and every task here is covered by a recipe, so results will be lower on real work.

## Limits

- Only one model, five tasks per stack and three runs per task, so these are small samples.
- The prompts are specific, which may guide the model toward the right answer.
- In the comparisons above, agents were told to search the recipes.
- The agent could not run its code, so this does not measure recovery after an error.
