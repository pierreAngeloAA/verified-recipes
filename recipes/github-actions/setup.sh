#!/usr/bin/env bash
# Installs the latest actionlint into .cache/bin.
set -euo pipefail
cd "$(dirname "$0")/../.."
GOBIN="$PWD/.cache/bin" go install github.com/rhysd/actionlint/cmd/actionlint@latest
.cache/bin/actionlint -version | head -1
