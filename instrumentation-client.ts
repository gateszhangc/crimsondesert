const fallbackGoogleAnalyticsId = "G-TD5HH2DCJL";
const fallbackClarityProjectId = "vunjltc3xv";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type GtagFn = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  __siteAnalyticsInitialized?: boolean;
  clarity?: ClarityFn;
  dataLayer?: unknown[];
  gtag?: GtagFn;
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

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function setDocumentMarker(name: string, value: string | undefined) {
  if (!value) {
    document.documentElement.removeAttribute(name);
    return;
  }

  document.documentElement.setAttribute(name, value);
}

function initGoogleAnalytics(googleAnalyticsId: string | undefined) {
  if (!googleAnalyticsId) {
    return;
  }

  appendScript(
    "google-analytics-src",
    `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
  );

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];

  if (!analyticsWindow.gtag) {
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args);
    };
  }

  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", googleAnalyticsId, {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

function initClarity(clarityProjectId: string | undefined) {
  if (!clarityProjectId) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;

  if (!analyticsWindow.clarity) {
    const shim: ClarityFn = (...args: unknown[]) => {
      shim.q = shim.q || [];
      shim.q.push(args);
    };

    analyticsWindow.clarity = shim;
  }

  appendScript(
    "microsoft-clarity-loader",
    `https://www.clarity.ms/tag/${clarityProjectId}`,
  );
}

const googleAnalyticsId = normalizeAnalyticsValue(
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? fallbackGoogleAnalyticsId,
);
const clarityProjectId = normalizeAnalyticsValue(
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? fallbackClarityProjectId,
);

if (!(window as AnalyticsWindow).__siteAnalyticsInitialized) {
  initGoogleAnalytics(googleAnalyticsId);
  initClarity(clarityProjectId);

  setDocumentMarker("data-site-analytics-ready", "true");
  setDocumentMarker("data-site-analytics-ga", googleAnalyticsId);
  setDocumentMarker("data-site-analytics-clarity", clarityProjectId);

  (window as AnalyticsWindow).__siteAnalyticsInitialized = true;
}

export function onRouterTransitionStart(url: string) {
  if (!googleAnalyticsId) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;

  if (!analyticsWindow.gtag) {
    return;
  }

  const pageUrl = new URL(url, window.location.origin);

  analyticsWindow.gtag("event", "page_view", {
    page_location: pageUrl.toString(),
    page_path: `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`,
  });
}
