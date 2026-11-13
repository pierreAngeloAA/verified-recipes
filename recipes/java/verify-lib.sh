# Sourced by each recipe's verify.sh. Runs Correct.java and Mistake.java with the JDK's
# source launcher (compile + run, no build tool): Correct must exit 0, Mistake must fail with every listed error.
verify_java_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local java; java="$(cd "$dir/../../.." && pwd)/.cache/jdk/bin/java"
  local good bad
  good="$(cd "$(mktemp -d)" && "$java" "$dir/Correct.java" 2>&1)" || { echo "$good"; echo "Correct.java failed"; return 1; }
  if bad="$(cd "$(mktemp -d)" && "$java" "$dir/Mistake.java" 2>&1)"; then echo "$bad"; echo "Mistake.java ran"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"java\":\"$("$java" --version | head -1 | awk '{print $2}')\"}"
}
