# Sourced by each recipe's verify.sh. Runs BuildKit's checks (docker build --check):
# correct/Dockerfile must have no warnings; mistake/Dockerfile must report every listed error.
verify_docker_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local good bad
  good="$(docker build --check "$dir/correct" 2>&1)" || { echo "$good"; echo "correct Dockerfile failed"; return 1; }
  grep -q "no warnings found" <<<"$good" || { echo "$good"; echo "correct Dockerfile has warnings"; return 1; }
  bad="$(docker build --check "$dir/mistake" 2>&1)" || true
  local missing=0
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"docker\":\"$(docker version --format '{{.Server.Version}}')\",\"buildx\":\"$(docker buildx version | awk '{print $2}')\"}"
}
