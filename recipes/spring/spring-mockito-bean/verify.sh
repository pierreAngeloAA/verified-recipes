#!/usr/bin/env bash
set -euo pipefail

recipe_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$recipe_dir/../verify-lib.sh"
verify_spring_recipe "$recipe_dir"
