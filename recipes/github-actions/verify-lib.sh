# Sourced by each recipe's verify.sh. Lints correct.yml and mistake.yml with actionlint:
# correct must be clean, mistake must report every listed error.
verify_actions_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local lint; lint="$(cd "$dir/../../.." && pwd)/.cache/bin/actionlint"
  local good bad
  good="$("$lint" -shellcheck= -pyflakes= -no-color -oneline "$dir/correct.yml" 2>&1)" || { echo "$good"; echo "correct.yml has errors"; return 1; }
  if bad="$("$lint" -shellcheck= -pyflakes= -no-color -oneline "$dir/mistake.yml" 2>&1)"; then echo "mistake.yml passed actionlint"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"actionlint\":\"$("$lint" -version | head -1)\"}"
}
