#!/usr/bin/env bash
set -euo pipefail

PRIMARY_INPUT="${1:-https://crimsondesert.lol}"
TIMEOUT_MS="${2:-30000}"
EXPECTED_GA_ID="${EXPECTED_GA_ID:-G-TD5HH2DCJL}"
EXPECTED_CLARITY_ID="${EXPECTED_CLARITY_ID:-vunjltc3xv}"

if [[ "$PRIMARY_INPUT" != http://* && "$PRIMARY_INPUT" != https://* ]]; then
  PRIMARY_INPUT="https://$PRIMARY_INPUT"
fi

BASE_URL="${PRIMARY_INPUT%/}"

echo "[verify] ensure Playwright Chromium runtime"
npx --yes playwright@latest install chromium >/dev/null

echo "[verify] browser-check analytics: $BASE_URL/"
BASE_URL="$BASE_URL" \
TIMEOUT_MS="$TIMEOUT_MS" \
EXPECTED_GA_ID="$EXPECTED_GA_ID" \
EXPECTED_CLARITY_ID="$EXPECTED_CLARITY_ID" \
npx --yes --package=playwright node <<'NODE'
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL;
const timeoutMs = Number(process.env.TIMEOUT_MS || "30000");
const expectedGaId = (process.env.EXPECTED_GA_ID || "").trim();
const expectedClarityId = (process.env.EXPECTED_CLARITY_ID || "").trim();
const url = `${baseUrl}/`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];

  page.on("request", (request) => {
    requests.push(request.url());
  });

  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: timeoutMs,
  });

  if (!response || response.status() >= 400) {
    throw new Error(`homepage returned HTTP ${response ? response.status() : "no-response"}`);
  }

  await page.waitForFunction(
    ({ expectedGaId, expectedClarityId }) => {
      const doc = document.documentElement;
      const gaScript = document.getElementById("google-analytics-src");
      const clarityScript = document.getElementById("microsoft-clarity-loader");
      const analyticsWindow = window;

      return (
        doc.getAttribute("data-site-analytics-ready") === "true" &&
        doc.getAttribute("data-site-analytics-ga") === expectedGaId &&
        doc.getAttribute("data-site-analytics-clarity") === expectedClarityId &&
        Boolean(gaScript) &&
        Boolean(clarityScript) &&
        typeof analyticsWindow.gtag === "function" &&
        typeof analyticsWindow.clarity === "function"
      );
    },
    { expectedGaId, expectedClarityId },
    { timeout: timeoutMs }
  );

  await page.waitForTimeout(1500);

  const requestSummary = {
    ga: requests.some((requestUrl) =>
      requestUrl.includes(`https://www.googletagmanager.com/gtag/js?id=${expectedGaId}`)
    ),
    clarity: requests.some((requestUrl) =>
      requestUrl.includes(`https://www.clarity.ms/tag/${expectedClarityId}`)
    ),
  };

  if (!requestSummary.ga || !requestSummary.clarity) {
    throw new Error(`analytics requests missing: ${JSON.stringify(requestSummary)}`);
  }

  const details = await page.evaluate(() => ({
    finalUrl: window.location.href,
    gaAttr: document.documentElement.getAttribute("data-site-analytics-ga"),
    clarityAttr: document.documentElement.getAttribute("data-site-analytics-clarity"),
    hasGaScript: Boolean(document.getElementById("google-analytics-src")),
    hasClarityScript: Boolean(document.getElementById("microsoft-clarity-loader")),
    hasGtag: typeof window.gtag === "function",
    hasClarity: typeof window.clarity === "function",
  }));

  await browser.close();
  console.log(`[PASS] analytics verified: ${JSON.stringify(details)}`);
})().catch(async (error) => {
  console.error(`[FAIL] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
NODE
