# Sourced by each recipe's verify.sh. Runs correct.php / mistake.php in the official php:cli image:
# correct must exit 0, mistake must fail with every listed error.
php_run() {
  docker run --rm -v "$1:/r:ro" -w /r php:cli php -d display_errors=stderr "$2" 2>&1
}

verify_php_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local good bad
  good="$(php_run "$dir" correct.php)" || { echo "$good"; echo "correct.php failed"; return 1; }
  if bad="$(php_run "$dir" mistake.php)"; then echo "$bad"; echo "mistake.php ran"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"php\":\"$(docker run --rm php:cli php -r 'echo PHP_VERSION;')\"}"
}
