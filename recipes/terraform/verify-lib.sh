# Sourced by each recipe's verify.sh. Runs terraform init + plan on copies of correct/ and mistake/.
# Recipes use only the built-in terraform_data resource, so no provider download or credentials.
tf_run() {
  local work; work="$(mktemp -d)"
  cp -r "$1/." "$work"
  (cd "$work" && terraform init -input=false -no-color && terraform plan -input=false -lock=false -no-color) 2>&1
  local rc=$?
  rm -rf "$work"
  return $rc
}

verify_terraform_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local good bad
  good="$(tf_run "$dir/correct")" || { echo "$good"; echo "correct/ failed"; return 1; }
  if bad="$(tf_run "$dir/mistake")"; then echo "$bad"; echo "mistake/ was accepted"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"terraform\":\"$(terraform version -json | node -e 'console.log(JSON.parse(require("fs").readFileSync(0)).terraform_version)')\"}"
}
