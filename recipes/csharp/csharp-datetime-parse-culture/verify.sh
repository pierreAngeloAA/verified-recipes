#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/../verify-lib.sh"
verify_csharp_recipe "$(dirname "$0")"
