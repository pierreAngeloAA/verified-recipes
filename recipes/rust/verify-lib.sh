# Sourced by each recipe's verify.sh. Compiles and runs correct.rs / mistake.rs with rustc (edition 2024):
# correct must build and exit 0, mistake must fail (compile or run) with every listed error.
rust_run() {
  local out; out="$(mktemp -d)"
  { rustc --edition 2024 -o "$out/bin" "$1" && "$out/bin"; } 2>&1
  local rc=$?
  rm -rf "$out"
  return $rc
}

verify_rust_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local good bad
  good="$(rust_run "$dir/correct.rs")" || { echo "$good"; echo "correct.rs failed"; return 1; }
  if bad="$(rust_run "$dir/mistake.rs")"; then echo "$bad"; echo "mistake.rs ran"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"rust\":\"$(rustc --version | awk '{print $2}')\"}"
}
