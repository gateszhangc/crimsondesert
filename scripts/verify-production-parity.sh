#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STANDALONE_HOST="${STANDALONE_HOST:-127.0.0.1}"
STANDALONE_PORT="${STANDALONE_PORT:-3021}"
STANDALONE_BASE_URL="http://${STANDALONE_HOST}:${STANDALONE_PORT}"
CONTAINER_PORT="${CONTAINER_PORT:-3022}"
CONTAINER_BASE_URL="http://127.0.0.1:${CONTAINER_PORT}"
IMAGE_TAG="${IMAGE_TAG:-crimsondesert:parity}"
CONTAINER_NAME="${CONTAINER_NAME:-crimsondesert-parity-$RANDOM}"
TIMEOUT_MS="${TIMEOUT_MS:-30000}"
CANONICAL_BASE_URL="${CANONICAL_BASE_URL:-https://crimsondesert.lol}"
LIVE_BASE_URL="${LIVE_BASE_URL:-}"

cd "$ROOT_DIR"

cleanup() {
  if [[ -n "${preview_pid:-}" ]]; then
    kill "$preview_pid" >/dev/null 2>&1 || true
    wait "$preview_pid" >/dev/null 2>&1 || true
  fi
  if command -v docker >/dev/null 2>&1; then
    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  fi
  rm -f "${preview_log:-}"
  rm -rf "${artifact_dir:-}"
}
trap cleanup EXIT

if ! command -v docker >/dev/null 2>&1; then
  echo "[error] docker is required for parity verification" >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "[error] docker daemon is not available" >&2
  exit 1
fi

if lsof -nP -iTCP:"$CONTAINER_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "[error] port $CONTAINER_PORT is already in use" >&2
  exit 1
fi

if lsof -nP -iTCP:"$STANDALONE_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "[error] port $STANDALONE_PORT is already in use" >&2
  exit 1
fi

extract_stylesheet_href() {
  local base_url="$1"
  curl -fsS "$base_url/" | node -e '
    const fs = require("fs");
    const html = fs.readFileSync(0, "utf8");
    const match = html.match(/<link rel="stylesheet" href="([^"]+)"/);
    if (!match) {
      process.exit(1);
    }
    process.stdout.write(match[1]);
  '
}

fetch_stylesheet() {
  local base_url="$1"
  local output_file="$2"
  local href
  href="$(extract_stylesheet_href "$base_url")"
  curl -fsS "${base_url}${href}" >"$output_file"
}

wait_for_http() {
  local url="$1"
  for ((i = 0; i < 30; i += 1)); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

assert_css_contains() {
  local label="$1"
  local file_path="$2"
  shift 2
  local token
  for token in "$@"; do
    if ! rg -F "$token" "$file_path" >/dev/null 2>&1; then
      echo "[error] $label CSS is missing '$token'" >&2
      exit 1
    fi
  done
}

artifact_dir="$(mktemp -d)"
standalone_css_file="$artifact_dir/standalone.css"
container_css_file="$artifact_dir/container.css"
live_css_file="$artifact_dir/live.css"
standalone_screenshot="$artifact_dir/standalone.png"
container_screenshot="$artifact_dir/container.png"
live_screenshot="$artifact_dir/live.png"
preview_log="$(mktemp)"

npm run build

HOSTNAME="$STANDALONE_HOST" PORT="$STANDALONE_PORT" bash scripts/run-standalone-preview.sh >"$preview_log" 2>&1 &
preview_pid=$!

if ! wait_for_http "$STANDALONE_BASE_URL/"; then
  cat "$preview_log" >&2
  echo "[error] standalone preview did not become ready on $STANDALONE_BASE_URL/" >&2
  exit 1
fi

docker build -t "$IMAGE_TAG" .
docker run -d --rm --name "$CONTAINER_NAME" -p "$CONTAINER_PORT:3000" "$IMAGE_TAG" >/dev/null

if ! wait_for_http "$CONTAINER_BASE_URL/"; then
  docker logs "$CONTAINER_NAME" >&2 || true
  echo "[error] container preview did not become ready on $CONTAINER_BASE_URL/" >&2
  exit 1
fi

bash scripts/verify-seo-copy-browser.sh "$STANDALONE_BASE_URL" "$TIMEOUT_MS" "$CANONICAL_BASE_URL"
bash scripts/verify-seo-copy-browser.sh "$CONTAINER_BASE_URL" "$TIMEOUT_MS" "$CANONICAL_BASE_URL"

fetch_stylesheet "$STANDALONE_BASE_URL" "$standalone_css_file"
fetch_stylesheet "$CONTAINER_BASE_URL" "$container_css_file"

assert_css_contains "standalone" "$standalone_css_file" font-heading max-w-6xl backdrop-blur-xl pb-18
assert_css_contains "container" "$container_css_file" font-heading max-w-6xl backdrop-blur-xl pb-18

standalone_css_sha="$(shasum -a 256 "$standalone_css_file" | awk "{print \$1}")"
container_css_sha="$(shasum -a 256 "$container_css_file" | awk "{print \$1}")"
standalone_css_size="$(wc -c <"$standalone_css_file" | tr -d " ")"
container_css_size="$(wc -c <"$container_css_file" | tr -d " ")"

if [[ "$standalone_css_sha" != "$container_css_sha" ]]; then
  echo "[error] CSS hash mismatch" >&2
  echo "standalone size=$standalone_css_size sha=$standalone_css_sha" >&2
  echo "container  size=$container_css_size sha=$container_css_sha" >&2
  exit 1
fi

BASE_URL="$STANDALONE_BASE_URL" SCREENSHOT_PATH="$standalone_screenshot" TIMEOUT_MS="$TIMEOUT_MS" \
  npx --yes --package=playwright node <<'NODE'
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(process.env.BASE_URL, { waitUntil: "domcontentloaded", timeout: Number(process.env.TIMEOUT_MS) });
  await page.waitForLoadState("networkidle", { timeout: Number(process.env.TIMEOUT_MS) }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
  await page.screenshot({ path: process.env.SCREENSHOT_PATH, fullPage: false });
  await browser.close();
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
NODE

BASE_URL="$CONTAINER_BASE_URL" SCREENSHOT_PATH="$container_screenshot" TIMEOUT_MS="$TIMEOUT_MS" \
  npx --yes --package=playwright node <<'NODE'
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(process.env.BASE_URL, { waitUntil: "domcontentloaded", timeout: Number(process.env.TIMEOUT_MS) });
  await page.waitForLoadState("networkidle", { timeout: Number(process.env.TIMEOUT_MS) }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
  await page.screenshot({ path: process.env.SCREENSHOT_PATH, fullPage: false });
  await browser.close();
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
NODE

rmse_output="$(magick compare -metric RMSE "$standalone_screenshot" "$container_screenshot" null: 2>&1 || true)"
if [[ "$rmse_output" != "0 (0)" ]]; then
  echo "[error] screenshot mismatch: $rmse_output" >&2
  exit 1
fi

if [[ -n "$LIVE_BASE_URL" ]]; then
  bash scripts/verify-seo-copy-browser.sh "$LIVE_BASE_URL" "$TIMEOUT_MS" "$CANONICAL_BASE_URL"
  fetch_stylesheet "$LIVE_BASE_URL" "$live_css_file"
  assert_css_contains "live" "$live_css_file" font-heading max-w-6xl backdrop-blur-xl pb-18

  live_css_sha="$(shasum -a 256 "$live_css_file" | awk "{print \$1}")"
  live_css_size="$(wc -c <"$live_css_file" | tr -d " ")"

  if [[ "$container_css_sha" != "$live_css_sha" ]]; then
    echo "[error] live CSS hash mismatch" >&2
    echo "container size=$container_css_size sha=$container_css_sha" >&2
    echo "live      size=$live_css_size sha=$live_css_sha" >&2
    exit 1
  fi

  BASE_URL="$LIVE_BASE_URL" SCREENSHOT_PATH="$live_screenshot" TIMEOUT_MS="$TIMEOUT_MS" \
    npx --yes --package=playwright node <<'NODE'
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(process.env.BASE_URL, { waitUntil: "domcontentloaded", timeout: Number(process.env.TIMEOUT_MS) });
  await page.waitForLoadState("networkidle", { timeout: Number(process.env.TIMEOUT_MS) }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
  await page.screenshot({ path: process.env.SCREENSHOT_PATH, fullPage: false });
  await browser.close();
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
NODE

  rmse_output="$(magick compare -metric RMSE "$container_screenshot" "$live_screenshot" null: 2>&1 || true)"
  if [[ "$rmse_output" != "0 (0)" ]]; then
    echo "[error] live screenshot mismatch: $rmse_output" >&2
    exit 1
  fi
fi

echo "[PASS] production parity verified"
echo "standalone css sha: $standalone_css_sha"
