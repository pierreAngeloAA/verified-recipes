# Evaluation

This measures whether the recipes help an agent write correct code. Each task runs with and without the recipes. The agent can only write a file, not run it, so the score shows whether its first answer is correct.

```bash
npm run eval -- --self-check            # Checks accept the correct code and reject the mistake
npm run eval -- --model haiku --runs 3  # Uses your Claude Code account and costs money
```

## Results on 2026-11-05

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

## Limits

- Only one model, five tasks and three runs per task, so this is a small sample.
- The prompts are specific, which may guide the model toward the right answer.
- Agents were told to search the recipes, so this does not measure whether they would do it unprompted.
- The agent could not run its code, so this does not measure recovery after an error.
