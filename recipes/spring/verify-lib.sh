#!/usr/bin/env bash
# Shared by Spring recipes. The correct code must pass real tests, and the mistake
# must fail to compile with a listed error. Everything runs inside the Maven image.
set -euo pipefail

SPRING_IMAGE="maven:3-eclipse-temurin-21"
METADATA_URL="https://repo1.maven.org/maven2/org/springframework/boot/spring-boot/maven-metadata.xml"

verify_spring_recipe() {
  local recipe_dir="$1"
  local profile="${2:-}"
  local boot_version
  boot_version="$(curl -fsSL "$METADATA_URL" \
    | grep -oE '<version>[0-9]+\.[0-9]+\.[0-9]+</version>' \
    | sed 's/<[^>]*>//g' | sort -V | tail -1)"
  [ -n "$boot_version" ] || { echo "could not find the latest Spring Boot release"; return 1; }

  docker run --rm -i \
    -v "$recipe_dir:/recipe:ro" \
    -v "$recipe_dir/../pom.xml:/pom.xml:ro" \
    -v verified-recipes-m2:/root/.m2 \
    -e BOOT_VERSION="$boot_version" \
    -e MAVEN_PROFILE="$profile" \
    "$SPRING_IMAGE" bash -s <<'SCRIPT'
set -euo pipefail

args=(-B -q "-Dboot.version=$BOOT_VERSION")
[ -z "$MAVEN_PROFILE" ] || args+=("-P$MAVEN_PROFILE")

prepare() {
  rm -rf /tmp/work
  mkdir -p /tmp/work/src/test/java/verify
  cp /pom.xml /tmp/work/pom.xml
  cp "/recipe/$1"/*.java /tmp/work/src/test/java/verify/
  cd /tmp/work
}

prepare correct
mvn "${args[@]}" test
# Maven also succeeds when it finds no tests, which would prove nothing.
if ! cat target/surefire-reports/*.txt 2>/dev/null | grep -qE 'Tests run: [1-9]'; then
  echo "the correct form ran no tests"
  exit 1
fi

prepare mistake
if mvn "${args[@]}" test-compile > /tmp/mistake.log 2>&1; then
  echo "the mistake compiled, but the recipe says it must fail"
  exit 1
fi
# Maven's default in-process compiler and a forked javac can report the same
# mistake differently, and every listed message must really appear.
mvn "${args[@]}" -Dmaven.compiler.fork=true test-compile >> /tmp/mistake.log 2>&1 || true

while IFS= read -r message; do
  if ! grep -qF -- "$message" /tmp/mistake.log; then
    echo "the listed error did not appear: $message"
    grep -E 'ERROR.*(\.java|Fatal)' /tmp/mistake.log | head -5 || true
    exit 1
  fi
done < <(sed -n 's/^errors: \[\(.*\)\]$/\1/p' /recipe/recipe.md | grep -oE '"[^"]*"' | tr -d '"')

java_version="$(java -version 2>&1 | sed -n 's/.*version "\([^"]*\)".*/\1/p' | head -1)"
echo "VERSIONS {\"spring-boot\":\"$BOOT_VERSION\",\"java\":\"$java_version\"}"
SCRIPT
}
