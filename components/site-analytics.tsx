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

  return (
    <>
      <span hidden aria-hidden="true" data-site-analytics-root="" />
      {googleAnalyticsId ? (
        <>
          <script
            async
            id="google-analytics-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`,
            }}
          />
        </>
      ) : null}

      {clarityProjectId ? (
        <script
          id="microsoft-clarity"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityProjectId}");`,
          }}
        />
      ) : null}
    </>
  );
}
