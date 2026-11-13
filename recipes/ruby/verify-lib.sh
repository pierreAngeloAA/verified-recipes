# Sourced by each recipe's verify.sh. Runs correct.rb / mistake.rb in fresh Ruby processes (so missing
# requires are real): correct must exit 0, mistake must fail with every listed error.
verify_ruby_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local good bad
  good="$(cd "$dir" && ruby correct.rb 2>&1)" || { echo "$good"; echo "correct.rb failed"; return 1; }
  if bad="$(cd "$dir" && ruby mistake.rb 2>&1)"; then echo "$bad"; echo "mistake.rb ran"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"ruby\":\"$(ruby -e 'print RUBY_VERSION')\"}"
}
