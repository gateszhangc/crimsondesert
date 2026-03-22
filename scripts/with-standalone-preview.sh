#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOSTNAME="${HOSTNAME:-127.0.0.1}"
PORT="${PORT:-3021}"
BUILD="${BUILD:-0}"
WAIT_SECONDS="${WAIT_SECONDS:-30}"

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <command...>" >&2
  exit 1
fi

cd "$ROOT_DIR"

if [[ "$BUILD" == "1" ]]; then
  npm run build
fi

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "[error] port $PORT is already in use" >&2
  exit 1
fi

preview_log="$(mktemp)"
cleanup() {
  local exit_code=$?
  if [[ -n "${preview_pid:-}" ]]; then
    kill "$preview_pid" >/dev/null 2>&1 || true
    wait "$preview_pid" >/dev/null 2>&1 || true
  fi
  rm -f "$preview_log"
  exit "$exit_code"
}
trap cleanup EXIT

HOSTNAME="$HOSTNAME" PORT="$PORT" bash scripts/run-standalone-preview.sh >"$preview_log" 2>&1 &
preview_pid=$!

for ((i = 0; i < WAIT_SECONDS; i += 1)); do
  if curl -fsS "http://$HOSTNAME:$PORT/" >/dev/null 2>&1; then
    "$@"
    exit 0
  fi
  sleep 1
done

cat "$preview_log" >&2
echo "[error] standalone preview did not become ready on http://$HOSTNAME:$PORT/" >&2
exit 1
