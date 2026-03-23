#!/usr/bin/env bash
set -euo pipefail

PRIMARY_INPUT="${1:-${SEO_COPY_BASE_URL:-http://127.0.0.1:3000}}"
TIMEOUT_MS="${2:-30000}"
CANONICAL_BASE_INPUT="${3:-https://crimsondesert.lol}"

if [[ "$PRIMARY_INPUT" != http://* && "$PRIMARY_INPUT" != https://* ]]; then
  PRIMARY_INPUT="https://$PRIMARY_INPUT"
fi

if [[ "$CANONICAL_BASE_INPUT" != http://* && "$CANONICAL_BASE_INPUT" != https://* ]]; then
  CANONICAL_BASE_INPUT="https://$CANONICAL_BASE_INPUT"
fi

BASE_URL="${PRIMARY_INPUT%/}"
CANONICAL_BASE_URL="${CANONICAL_BASE_INPUT%/}"

echo "[verify] ensure Playwright Chromium runtime"
npx playwright install chromium >/dev/null

echo "[verify] browser-check SEO copy: $BASE_URL"
BASE_URL="$BASE_URL" \
CANONICAL_BASE_URL="$CANONICAL_BASE_URL" \
TIMEOUT_MS="$TIMEOUT_MS" \
node <<'NODE'
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL;
const canonicalBaseUrl = process.env.CANONICAL_BASE_URL;
const timeoutMs = Number(process.env.TIMEOUT_MS || "30000");

const routes = [
  {
    path: "/",
    title: "Crimson Desert Guide: Release Date, Platforms, Launch FAQ",
    h1: "Crimson Desert",
    metaIncludes: ["confirmed Crimson Desert release date", "official Pearl Abyss sources"],
    bodyIncludes: [
      "A kingdom in ruin. A mercenary on the march.",
      "Built from official material, not rumor loops",
      "A march shaped by four forces",
      "World & Combat",
      "Launch Support",
    ],
    bodyExcludes: [
      "Get the confirmed answers first",
      "Open answer",
      "Find the answer, then check the source.",
    ],
    primaryCta: {
      label: "One-click deploy",
      href: "https://www.easyclaw.pro/",
      target: "_blank",
      relIncludes: "noreferrer",
    },
  },
  {
    path: "/release-date",
    title: "Crimson Desert Release Date: March 19, 2026 Unlock Time",
    h1: "Launch Timeline",
    metaIncludes: ["released on March 19, 2026", "launch FAQ timeline"],
    bodyIncludes: ["Crimson Desert released on March 19, 2026", "What the launch confirms"],
    bodyExcludes: ["If you searched for the Crimson Desert release date"],
  },
  {
    path: "/gameplay",
    title: "Crimson Desert Gameplay: Combat, Exploration, Progression",
    h1: "World and Combat",
    metaIncludes: ["gameplay footage reveals", "life in Pywel"],
    bodyIncludes: ["combat progression", "Life in Pywel between battles"],
    bodyExcludes: ["source-backed reason to say"],
  },
  {
    path: "/characters",
    title: "Crimson Desert Characters: Kliff, Oongka, and the Greymanes",
    h1: "Kliff and the Greymanes",
    metaIncludes: ["Pearl Abyss has actually highlighted", "Oongka, and Damiane"],
    bodyIncludes: ["Pearl Abyss keeps Kliff at the center of the story", "The clearest official picture"],
    bodyExcludes: ["The shortest accurate Crimson Desert characters answer starts with"],
  },
  {
    path: "/platforms",
    title: "Crimson Desert Platforms: PS5, Xbox, PC, and Mac",
    h1: "Where You Can Play",
    metaIncludes: ["PS5 Pro", "GeForce NOW"],
    bodyIncludes: ["Mac App Store", "The practical takeaway"],
  },
  {
    path: "/system-requirements",
    title: "Crimson Desert System Requirements: PC, Console, and Mac",
    h1: "Performance and Hardware",
    metaIncludes: ["DirectX 12", "HDMI 2.1"],
    bodyIncludes: ["DirectX 12", "The practical takeaway"],
  },
  {
    path: "/faq",
    title: "Crimson Desert FAQ: Release Time, Internet, Cross-Save",
    h1: "Launch Support",
    metaIncludes: ["internet setup", "edition upgrades"],
    bodyIncludes: ["Cross-save is not available", "The practical role of this page"],
    bodyExcludes: ["fast answers on release time"],
  },
];

function assertIncludes(haystack, needle, context) {
  if (!haystack.toLowerCase().includes(needle.toLowerCase())) {
    throw new Error(`${context} missing "${needle}"`);
  }
}

function assertExcludes(haystack, needle, context) {
  if (haystack.toLowerCase().includes(needle.toLowerCase())) {
    throw new Error(`${context} unexpectedly included "${needle}"`);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const route of routes) {
    const page = await context.newPage();
    const url = `${baseUrl}${route.path}`;
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeoutMs,
    });

    if (!response || response.status() >= 400) {
      throw new Error(`${route.path} returned HTTP ${response ? response.status() : "no-response"}`);
    }

    await page.waitForLoadState("networkidle", { timeout: timeoutMs }).catch(() => {});

    const details = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      h1Count: document.querySelectorAll("h1").length,
      h1: document.querySelector("h1")
        ? Array.from(document.querySelector("h1").childNodes)
            .map((node) => node.textContent ?? "")
            .join(" ")
            .replace(/\s+/g, " ")
            .trim()
        : "",
      body: document.body.innerText.replace(/\s+/g, " ").trim(),
      links: Array.from(document.querySelectorAll("a")).map((link) => ({
        label: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
        href: link.href,
        target: link.target,
        rel: link.rel,
      })),
    }));

    if (details.title !== route.title) {
      throw new Error(`${route.path} title mismatch: expected "${route.title}" but found "${details.title}"`);
    }

    const expectedCanonical = `${canonicalBaseUrl}${route.path === "/" ? "/" : route.path}`;

    if (details.canonical !== expectedCanonical) {
      throw new Error(
        `${route.path} canonical mismatch: expected "${expectedCanonical}" but found "${details.canonical}"`,
      );
    }

    if (details.h1Count !== 1) {
      throw new Error(`${route.path} expected exactly one h1 but found ${details.h1Count}`);
    }

    if (details.h1 !== route.h1) {
      throw new Error(`${route.path} h1 mismatch: expected "${route.h1}" but found "${details.h1}"`);
    }

    if (details.description.length < 110 || details.description.length > 170) {
      throw new Error(
        `${route.path} meta description length out of range: ${details.description.length} characters`,
      );
    }

    for (const needle of route.metaIncludes) {
      assertIncludes(details.description, needle, `${route.path} meta description`);
    }

    for (const needle of route.bodyIncludes) {
      assertIncludes(details.body, needle, `${route.path} body`);
    }

    for (const needle of route.bodyExcludes ?? []) {
      assertExcludes(details.body, needle, `${route.path} body`);
    }

    if (route.primaryCta) {
      const primaryCta = details.links.find((link) => link.label === route.primaryCta.label);

      if (!primaryCta) {
        throw new Error(`${route.path} missing primary CTA "${route.primaryCta.label}"`);
      }

      if (primaryCta.href !== route.primaryCta.href) {
        throw new Error(
          `${route.path} primary CTA href mismatch: expected "${route.primaryCta.href}" but found "${primaryCta.href}"`,
        );
      }

      if (primaryCta.target !== route.primaryCta.target) {
        throw new Error(
          `${route.path} primary CTA target mismatch: expected "${route.primaryCta.target}" but found "${primaryCta.target}"`,
        );
      }

      assertIncludes(primaryCta.rel, route.primaryCta.relIncludes, `${route.path} primary CTA rel`);
    }

    await page.close();
    console.log(`[PASS] ${route.path}`);
  }

  await browser.close();
  console.log("[PASS] SEO copy verified in browser");
})().catch(async (error) => {
  console.error(`[FAIL] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
NODE
