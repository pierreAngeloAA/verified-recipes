#!/usr/bin/env bash
# Shared by Go recipes. Files in shared/ are copied into both correct/ and mistake/.
# The correct module must pass `go vet` and real tests. The mistake module must fail
# `go vet` or `go test` with every message listed in the recipe's `errors`.
set -euo pipefail

export GOTOOLCHAIN=local GOFLAGS=-mod=mod

go_check() {
  go vet ./... && go test -count=1 ./...
}

verify_go_recipe() {
  local recipe_dir="$1" work
  work="$(mktemp -d)"
  trap 'rm -rf "$work"' RETURN

  for side in correct mistake; do
    mkdir -p "$work/$side"
    [ ! -d "$recipe_dir/shared" ] || cp -r "$recipe_dir/shared/." "$work/$side/"
    cp -r "$recipe_dir/$side/." "$work/$side/"
  done

  if ! (cd "$work/correct" && go_check) > "$work/correct.log" 2>&1; then
    echo "the correct form failed:"; cat "$work/correct.log"; return 1
  fi
  # go test also succeeds when a package has no tests, which would prove nothing.
  if grep -q 'no test files' "$work/correct.log" || ! grep -q '^ok' "$work/correct.log"; then
    echo "the correct form ran no tests:"; cat "$work/correct.log"; return 1
  fi

  if (cd "$work/mistake" && go_check) > "$work/mistake.log" 2>&1; then
    echo "the mistake passed, but the recipe says it must fail"; return 1
  fi
  local message
  while IFS= read -r message; do
    if ! grep -qF -- "$message" "$work/mistake.log"; then
      echo "the listed error did not appear: $message"; cat "$work/mistake.log"; return 1
    fi
  done < <(node -e '
    const raw = require("fs").readFileSync(process.argv[1], "utf8");
    for (const message of JSON.parse(raw.match(/^errors: (\[.*\])$/m)[1])) console.log(message);
  ' "$recipe_dir/recipe.md")

  echo "VERSIONS {\"go\":\"$(go env GOVERSION | sed 's/^go//')\"}"
}
