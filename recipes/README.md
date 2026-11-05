# Recipes

## Layout

Each recipe is a folder with a description and a script that proves it:

```text
recipes/
  TEMPLATE.md
  <stack>/
    <stack>-<short-description>/
      recipe.md
      verify.<ext>
```

The folder name must equal the recipe `id`, and the `id` must start with the stack name.

## Stacks

| Stack | Verification file | Runs on |
|---|---|---|
| `rails` | `verify.rb` | Ruby, with the latest Rails from `recipes/rails/Gemfile` |
| `react` | `verify.mjs` | Node.js, with the latest React from `recipes/react/package.json` |
| `spring` | `verify.sh`, with `correct/` and `mistake/` folders | The official Maven Docker image, with the latest Spring Boot |
| `swift` | `verify.sh` | The official Swift Docker image |

## Fields

| Field | Required | Purpose |
|---|---|---|
| `id` | Yes | Stable identifier, in lowercase with hyphens |
| `title` | Yes | One line naming the trap |
| `stack` | Yes | One of the stacks above |
| `applies_to` | Yes | Version range the recipe covers |
| `tags` | Yes | Lowercase search terms |
| `errors` | Yes | Exact error messages, so agents can search by message |
| `sources` | Yes | Official links that back the recipe |

Dates and tested versions are not written by hand. The verification run records them in `verification/status.json`.

## Verification scripts

A script exits with `0` only when both of these are true:

1. The **Correct** code works.
2. The **Mistake** code still fails with a message listed in `errors`.

If a release makes the mistake work again, the recipe needs a review, so that also counts as a failure.
