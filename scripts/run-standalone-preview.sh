#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOSTNAME="${HOSTNAME:-127.0.0.1}"
PORT="${PORT:-3021}"

cd "$ROOT_DIR"

if [[ ! -f .next/standalone/server.js ]]; then
  echo "[error] missing .next/standalone/server.js; run 'npm run build' first" >&2
  exit 1
fi

# Keep standalone assets aligned with the current build output.
rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static

cd .next/standalone
HOSTNAME="$HOSTNAME" PORT="$PORT" node server.js
