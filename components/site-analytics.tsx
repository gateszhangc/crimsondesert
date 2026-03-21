"use client";

import { useEffect } from "react";
import Script from "next/script";

const fallbackGoogleAnalyticsId = "G-TD5HH2DCJL";
const fallbackClarityProjectId = "vunjltc3xv";

function normalizeAnalyticsValue(value: string | undefined) {
  const normalized = value?.trim();

  if (!normalized) {
    return undefined;
  }

  if (["disabled", "skip", "false", "off", "none"].includes(normalized.toLowerCase())) {
    return undefined;
  }

  return normalized;
}

export function SiteAnalytics() {
  const googleAnalyticsId = normalizeAnalyticsValue(
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? fallbackGoogleAnalyticsId,
  );
  const clarityProjectId = normalizeAnalyticsValue(
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? fallbackClarityProjectId,
  );

  useEffect(() => {
    if (!clarityProjectId) {
      return;
    }

    const existingScript = document.getElementById("microsoft-clarity-loader");

    if (existingScript) {
      return;
    }

    type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
    const clarityWindow = window as Window & { clarity?: ClarityFn };

    if (!clarityWindow.clarity) {
      const shim: ClarityFn = (...args: unknown[]) => {
        shim.q = shim.q || [];
        shim.q.push(args);
      };

      clarityWindow.clarity = shim;
    }

    const script = document.createElement("script");
    script.id = "microsoft-clarity-loader";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
    document.head.appendChild(script);
  }, [clarityProjectId]);

  return (
    <>
      <span
        hidden
        aria-hidden="true"
        data-site-analytics-root=""
      />
      {googleAnalyticsId ? (
        <>
          <Script
            async
            id="google-analytics-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
