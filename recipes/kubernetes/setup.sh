#!/usr/bin/env bash
# Downloads the latest kube-apiserver, etcd and kubectl (envtest binaries, no Docker) into .cache/envtest.
set -euo pipefail
cd "$(dirname "$0")/../.."
export GOBIN="$PWD/.cache/bin"
go install sigs.k8s.io/controller-runtime/tools/setup-envtest@latest
dir="$("$GOBIN/setup-envtest" use latest --bin-dir "$PWD/.cache/envtest" -p path)"
ln -sfn "$dir" .cache/envtest/current
