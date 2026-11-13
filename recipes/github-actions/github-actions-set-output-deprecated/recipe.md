---
id: github-actions-set-output-deprecated
title: ::set-output is deprecated; write to $GITHUB_OUTPUT
stack: github-actions
applies_to: ">= 2024"
tags: ["outputs", "workflow-commands", "deprecation"]
errors: ["workflow command \"set-output\" was deprecated"]
sources: ["https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-output-parameter"]
---

## Mistake

```yaml
- id: version
  run: echo "::set-output name=tag::v1.2.3"
```

## Correct

```yaml
- id: version
  run: echo "tag=v1.2.3" >> "$GITHUB_OUTPUT"
# read: ${{ steps.version.outputs.tag }}
```

## Why

Same for ::save-state (use $GITHUB_STATE) and ::set-env / ::add-path (use $GITHUB_ENV / $GITHUB_PATH).
