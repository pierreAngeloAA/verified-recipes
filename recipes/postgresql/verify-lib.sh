# Sourced by each recipe's verify.sh. Starts a throwaway PostgreSQL (postgres:latest in Docker, or local
# binaries when Docker is unavailable), runs correct.sql and mistake.sql in fresh databases with
# ON_ERROR_STOP: correct must succeed, mistake must fail with every listed error.
pg_up() {
  if docker info >/dev/null 2>&1; then
    PG_ID="$(docker run -d --rm -e POSTGRES_HOST_AUTH_METHOD=trust postgres:latest)"
    PSQL=(docker exec -i "$PG_ID" psql -X -q -h 127.0.0.1 -U postgres -v ON_ERROR_STOP=1)
  else
    local bin; bin="$(pg_config --bindir 2>/dev/null || dirname "$(ls /usr/lib/postgresql/*/bin/initdb | sort -V | tail -1)")"
    PG_DIR="$(mktemp -d)"
    "$bin/initdb" -D "$PG_DIR/data" -U postgres -A trust >/dev/null
    "$bin/pg_ctl" -D "$PG_DIR/data" -o "-p 54329 -k $PG_DIR -c listen_addresses=''" -l "$PG_DIR/log" -w start >/dev/null
    PG_STOP=("$bin/pg_ctl" -D "$PG_DIR/data" -m immediate stop)
    PSQL=(psql -X -q -h "$PG_DIR" -p 54329 -U postgres -v ON_ERROR_STOP=1)
  fi
  local i
  for i in $(seq 60); do "${PSQL[@]}" -c 'SELECT 1' >/dev/null 2>&1 && return 0; sleep 1; done
  echo "postgres did not start"; return 1
}

pg_down() {
  if [ -n "${PG_ID:-}" ]; then docker rm -f "$PG_ID" >/dev/null 2>&1; fi
  if [ -n "${PG_DIR:-}" ]; then "${PG_STOP[@]}" >/dev/null 2>&1; rm -rf "$PG_DIR"; fi
}

verify_postgresql_recipe() {
  local dir; dir="$(cd "$1" && pwd)"
  trap pg_down RETURN
  pg_up || return 1
  "${PSQL[@]}" -c 'CREATE DATABASE c' -c 'CREATE DATABASE m' >/dev/null
  local good bad
  good="$("${PSQL[@]}" -d c <"$dir/correct.sql" 2>&1)" || { echo "$good"; echo "correct.sql failed"; return 1; }
  if bad="$("${PSQL[@]}" -d m <"$dir/mistake.sql" 2>&1)"; then echo "$bad"; echo "mistake.sql succeeded"; return 1; fi
  local missing=0 err
  while IFS= read -r err; do
    grep -qF -- "$err" <<<"$bad" || { echo "missing listed error: $err"; missing=1; }
  done < <(node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8");for(const e of JSON.parse(t.match(/^errors: (\[.*\])$/m)[1]))console.log(e)' "$dir/recipe.md")
  [ "$missing" = 0 ] || { echo "$bad"; return 1; }
  echo "VERSIONS {\"postgresql\":\"$("${PSQL[@]}" -At -c 'SHOW server_version' | awk '{print $1}')\"}"
}
