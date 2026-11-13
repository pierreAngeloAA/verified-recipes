# Sourced by each recipe's verify.sh. Runs Correct.cs and Mistake.cs as .NET file-based apps (dotnet run file.cs):
# Correct must exit 0, Mistake must fail (build or runtime) with every listed error.
export DOTNET_NOLOGO=1 DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_CLI_UI_LANGUAGE=en LC_ALL=C.UTF-8 MSBUILDDISABLENODEREUSE=1

verify_csharp_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local dotnet; dotnet="$(cd "$dir/../../.." && pwd)/.cache/dotnet/dotnet"
  trap '"$dotnet" build-server shutdown >/dev/null 2>&1' RETURN  # file-based apps still start a compiler server
  local good bad
  good="$(timeout 300 "$dotnet" run "$dir/Correct.cs" -p:UseSharedCompilation=false 2>&1)" || { echo "$good"; echo "Correct.cs failed"; return 1; }
  if bad="$(timeout 300 "$dotnet" run "$dir/Mistake.cs" -p:UseSharedCompilation=false 2>&1)"; then echo "$bad"; echo "Mistake.cs ran"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"dotnet\":\"$("$dotnet" --version)\"}"
}
