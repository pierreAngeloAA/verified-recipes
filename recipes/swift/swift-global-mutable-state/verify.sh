#!/usr/bin/env bash
# Runs inside the official Swift image, so no local toolchain is needed.
set -euo pipefail

recipe_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

docker run --rm -i -v "$recipe_dir:/recipe:ro" swift:latest bash -s <<'SCRIPT'
set -euo pipefail
cd "$(mktemp -d)"

expected="$(sed -n 's/^errors: \["\(.*\)"\]$/\1/p' /recipe/recipe.md)"
[ -n "$expected" ] || { echo "no error message listed"; exit 1; }

cat > correct.swift <<'SWIFT'
final class Config: Sendable {
    static let shared = Config()
}

@MainActor var mainActorCounter = 0

actor Counter {
    static let shared = Counter()
    private var value = 0

    func increment() -> Int {
        value += 1
        return value
    }
}

@main
struct Main {
    static func main() async {
        let value = await Counter.shared.increment()
        precondition(value == 1)
        _ = Config.shared
        print("correct form ran")
    }
}
SWIFT
swiftc -swift-version 6 -parse-as-library correct.swift -o correct
./correct

check_mistake() {
  local name="$1"
  if swiftc -swift-version 6 -parse-as-library -typecheck "$name.swift" 2> "$name.log"; then
    echo "$name compiled, but the recipe says it must fail"
    exit 1
  fi
  grep -qF "$expected" "$name.log" || { echo "$name failed with an unlisted error:"; cat "$name.log"; exit 1; }
  # Language mode 5 must accept it, or the recipe's explanation is wrong.
  swiftc -swift-version 5 -parse-as-library -typecheck "$name.swift"
}

echo 'var counter = 0' > global_var.swift
check_mistake global_var

echo 'final class Config { static var shared = Config() }' > static_var.swift
check_mistake static_var

version="$(swift --version 2>&1 | sed -n 's/.*Swift version \([0-9.]*\).*/\1/p' | head -1)"
echo "VERSIONS {\"swift\":\"$version\"}"
SCRIPT
