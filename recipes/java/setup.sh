#!/usr/bin/env bash
# Installs the newest GA Temurin JDK into .cache/jdk (skipped when already current).
set -euo pipefail
cd "$(dirname "$0")/../.."
feature="$(curl -fsSL https://api.adoptium.net/v3/info/available_releases | node -e 'console.log(JSON.parse(require("fs").readFileSync(0)).most_recent_feature_release)')"
if [ "$(cat .cache/jdk/FEATURE 2>/dev/null)" != "$feature" ]; then
  rm -rf .cache/jdk && mkdir -p .cache/jdk
  curl -fsSL "https://api.adoptium.net/v3/binary/latest/$feature/ga/linux/x64/jdk/hotspot/normal/eclipse" | tar xz -C .cache/jdk --strip-components 1
  echo "$feature" > .cache/jdk/FEATURE
fi
.cache/jdk/bin/java --version | head -1
