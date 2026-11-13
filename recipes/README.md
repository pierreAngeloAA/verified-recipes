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
| `anthropic`, `openai`, `mcp`, `langchain`, `aws`, `redis` | `verify.py`, using `recipes/support.py` | Python, with the newest packages from the stack's `requirements.txt`; HTTP calls are mocked (botocore Stubber for AWS), so no API key or credentials are needed; `redis` runs against a throwaway `redis:latest` container or local redis-server |
| `php` | `verify.sh`, with `correct.php` and `mistake.php` | The official `php:cli` Docker image (latest PHP) |
| `postgresql` | `verify.sh`, with `correct.sql` and `mistake.sql` | A throwaway `postgres:latest` container (or local PostgreSQL binaries), `psql -v ON_ERROR_STOP=1` |
| `python` | `verify.py`, using `recipes/support.py` | The newest stable Python, installed in CI; standard library only |
| `csharp` | `verify.sh`, with `Correct.cs` and `Mistake.cs` | .NET file-based apps (`dotnet run file.cs`) on the newest supported .NET SDK, installed with dotnet-install |
| `docker` | `verify.sh`, with `correct/` and `mistake/` Dockerfiles | `docker build --check` (BuildKit lint rules) on the runner's Docker engine |
| `go` | `verify.sh`, with `correct/`, `mistake/` and optional `shared/` folders | The latest stable Go, installed in CI |
| `rails` | `verify.rb` | Ruby, with the latest Rails from `recipes/rails/Gemfile` |
| `react` | `verify.mjs` | Node.js, with the latest React from `recipes/react/package.json` |
| `java` | `verify.sh`, with `Correct.java` and `Mistake.java` | The JDK source launcher (`java File.java`) on the newest GA Temurin JDK, downloaded from Adoptium |
| `kubernetes` | `verify.sh`, with `correct.yaml` and `mistake.yaml` | `kubectl apply --dry-run=server` against a throwaway kube-apiserver + etcd (latest envtest binaries, installed with Go) |
| `node` | `verify.mjs`, using `recipes/node/support.mjs` | The latest Node.js LTS; no packages |
| `terraform` | `verify.sh`, with `correct/` and `mistake/` folders | `terraform init` + `plan` with the latest Terraform; only the built-in `terraform_data` resource, so no provider or credentials |
| `typescript` | `verify.mjs`, using `recipes/typescript/support.mjs` | Node.js, with the latest `typescript` (tsc) and `@types/node` |
| `rust` | `verify.sh`, with `correct.rs` and `mistake.rs` | `rustc --edition 2024` on the newest stable Rust (rustup) |
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
