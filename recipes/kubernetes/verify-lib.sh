# Sourced by each recipe's verify.sh. Starts a throwaway etcd + kube-apiserver, then runs
# kubectl apply --dry-run=server: correct.yaml must pass, mistake.yaml must fail with every listed error.
verify_k8s_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  local bin; bin="$(cd "$dir/../../.." && pwd)/.cache/envtest/current"
  local work; work="$(mktemp -d)"
  trap 'kill -9 $(jobs -p) 2>/dev/null; wait 2>/dev/null; rm -rf "$work"' RETURN
  openssl genrsa -out "$work/sa.key" 2048 2>/dev/null
  echo "token,admin,admin,system:masters" >"$work/tokens.csv"
  "$bin/etcd" --data-dir "$work/etcd" --listen-client-urls http://127.0.0.1:23790 \
    --advertise-client-urls http://127.0.0.1:23790 --listen-peer-urls http://127.0.0.1:23800 >"$work/etcd.log" 2>&1 &
  "$bin/kube-apiserver" --etcd-servers http://127.0.0.1:23790 --secure-port 26443 --bind-address 127.0.0.1 \
    --cert-dir "$work/certs" --token-auth-file "$work/tokens.csv" --authorization-mode AlwaysAllow \
    --service-account-issuer https://kubernetes.default.svc --service-account-key-file "$work/sa.key" \
    --service-account-signing-key-file "$work/sa.key" --service-cluster-ip-range 10.0.0.0/24 \
    --disable-admission-plugins ServiceAccount >"$work/apiserver.log" 2>&1 &
  local k=("$bin/kubectl" --server https://127.0.0.1:26443 --token token --insecure-skip-tls-verify)
  local i
  for i in $(seq 120); do "${k[@]}" get ns default >/dev/null 2>&1 && break; sleep 0.5; done
  [ "$i" -lt 120 ] || { tail -5 "$work/apiserver.log"; echo "kube-apiserver did not start"; return 1; }
  local good bad
  good="$("${k[@]}" apply --dry-run=server -f "$dir/correct.yaml" 2>&1)" || { echo "$good"; echo "correct.yaml failed"; return 1; }
  if bad="$("${k[@]}" apply --dry-run=server -f "$dir/mistake.yaml" 2>&1)"; then echo "$bad"; echo "mistake.yaml was accepted"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"kubernetes\":\"$("$bin/kube-apiserver" --version | awk '{print $2}')\"}"
}
