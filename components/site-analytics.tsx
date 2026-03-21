"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type AnalyticsConfig = {
  googleAnalyticsId?: string;
  clarityProjectId?: string;
};

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
  const [config, setConfig] = useState<AnalyticsConfig | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadConfig = async () => {
      const response = await fetch("/api/site-analytics", {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as AnalyticsConfig;
      setConfig({
        googleAnalyticsId: normalizeAnalyticsValue(data.googleAnalyticsId),
        clarityProjectId: normalizeAnalyticsValue(data.clarityProjectId),
      });
    };

    void loadConfig().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  const googleAnalyticsId = config?.googleAnalyticsId;
  const clarityProjectId = config?.clarityProjectId;

  return (
    <>
      <span hidden aria-hidden="true" data-site-analytics-root="" />
      {googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`}
          </Script>
        </>
      ) : null}

      {clarityProjectId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityProjectId}");`}
        </Script>
      ) : null}
    </>
  );
}
