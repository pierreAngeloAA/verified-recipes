#!/usr/bin/env bash
# Usage: spring-check.sh <task dir> <solution file> <solution name> <profile>
# Compiles a solution with the task's harness and runs its tests in Docker.
set -euo pipefail

task_dir="$1"
solution="$2"
solution_name="$3"
profile="${4:-}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
boot_version="$(curl -fsSL https://repo1.maven.org/maven2/org/springframework/boot/spring-boot/maven-metadata.xml \
  | grep -oE '<version>[0-9]+\.[0-9]+\.[0-9]+</version>' | sed 's/<[^>]*>//g' | sort -V | tail -1)"

docker run --rm -i --network none \
  -v "$task_dir:/task:ro" \
  -v "$solution:/solution:ro" \
  -v "$root/recipes/spring/pom.xml:/pom.xml:ro" \
  -v verified-recipes-m2:/root/.m2 \
  -e BOOT_VERSION="$boot_version" -e SOLUTION_NAME="$solution_name" -e MAVEN_PROFILE="$profile" \
  maven:3-eclipse-temurin-21 bash -s <<'SCRIPT'
set -euo pipefail
mkdir -p /tmp/work/src/test/java/verify
cp /pom.xml /tmp/work/pom.xml
cp /task/harness/*.java /tmp/work/src/test/java/verify/
cp /solution "/tmp/work/src/test/java/verify/$SOLUTION_NAME"
cd /tmp/work
args=(-B -q -o "-Dboot.version=$BOOT_VERSION")
[ -z "$MAVEN_PROFILE" ] || args+=("-P$MAVEN_PROFILE")
mvn "${args[@]}" test
cat target/surefire-reports/*.txt | grep -qE 'Tests run: [1-9]'
SCRIPT
