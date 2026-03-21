import Script from "next/script";

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

const googleAnalyticsId = normalizeAnalyticsValue(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
const clarityProjectId = normalizeAnalyticsValue(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);

export function SiteAnalytics() {
  if (!googleAnalyticsId && !clarityProjectId) {
    return null;
  }

  return (
    <>
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
