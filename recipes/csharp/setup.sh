#!/usr/bin/env bash
# Installs the newest supported .NET SDK (first active channel in Microsoft's release index) into .cache/dotnet.
set -euo pipefail
cd "$(dirname "$0")/../.."
channel="$(curl -fsSL https://builds.dotnet.microsoft.com/dotnet/release-metadata/releases-index.json \
  | node -e 'const r=JSON.parse(require("fs").readFileSync(0))["releases-index"].find(x=>x["support-phase"]==="active");console.log(r["channel-version"])')"
curl -fsSL https://dot.net/v1/dotnet-install.sh | bash -s -- --channel "$channel" --install-dir .cache/dotnet >/dev/null
DOTNET_NOLOGO=1 .cache/dotnet/dotnet --version
