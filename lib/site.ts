const defaultSiteName = "Crimson Desert Hub";
const defaultSiteUrl = "https://crimsondesert.lol";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return defaultSiteUrl;
  }

  const candidate = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return defaultSiteUrl;
  }
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_WEB_URL);
const siteName = process.env.NEXT_PUBLIC_PROJECT_NAME?.trim() || defaultSiteName;

export const siteConfig = {
  name: siteName,
  domain: new URL(siteUrl).hostname,
  url: siteUrl,
  language: "en-US",
  locale: "en_US",
  category: "games",
  homeTitle: "Crimson Desert Release Date, Platforms, Gameplay and FAQ",
  homeDescription:
    "Independent Crimson Desert guide covering the confirmed release date, platform list, system requirements, gameplay breakdown, cast notes, and official launch FAQ.",
  description:
    "Independent, source-backed guide to Crimson Desert covering the release date, platforms, gameplay, characters, system requirements, and official FAQ.",
  updatedAt: "2026-03-21",
  officialSiteUrl: "https://crimsondesert.pearlabyss.com/en-US/Main/Index",
  steamUrl: "https://store.steampowered.com/app/3321460/Crimson_Desert/",
  launchFaqUrl: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=63",
  performanceUrl: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=62",
  defaultKeywords: [
    "crimson desert",
    "crimson desert release date",
    "crimson desert gameplay",
    "crimson desert characters",
    "crimson desert system requirements",
    "crimson desert faq",
  ],
  pageOrder: [
    "release-date",
    "gameplay",
    "characters",
    "platforms",
    "system-requirements",
    "faq",
  ],
} as const;

export const navItems = [
  { href: "/release-date", label: "Release Date" },
  { href: "/gameplay", label: "Gameplay" },
  { href: "/characters", label: "Characters" },
  { href: "/platforms", label: "Platforms" },
  { href: "/system-requirements", label: "System Requirements" },
  { href: "/faq", label: "FAQ" },
];

export const keyFacts = [
  {
    label: "Launch date",
    value: "March 19, 2026",
    note: "Pearl Abyss confirmed a simultaneous worldwide launch in its official launch FAQ.",
  },
  {
    label: "Core pitch",
    value: "Open-world action-adventure",
    note: "Pearl Abyss consistently describes Crimson Desert as an open-world action-adventure set in Pywel.",
  },
  {
    label: "Platforms",
    value: "PS5, Xbox, PC, Mac, cloud",
    note: "The official FAQ lists console, PC, Mac App Store, and GeForce NOW availability.",
  },
];

export const quickStartLinks = [
  {
    href: "/platforms",
    title: "Where can you play it?",
    description: "The official platform list and storefront coverage, including Steam, Epic, Mac App Store, and GeForce NOW.",
    icon: "MonitorPlay",
  },
  {
    href: "/faq",
    title: "Need straight answers?",
    description: "Launch timing, internet requirements, languages, controller support, and cross-save status from the official FAQ.",
    icon: "CircleHelp",
  },
  {
    href: "/gameplay",
    title: "How does it actually play?",
    description: "A source-backed breakdown of exploration, combat, progression, and life in Pywel.",
    icon: "Compass",
  },
];

export const sourceHighlights = [
  {
    title: "Launch FAQ",
    date: "March 12, 2026",
    summary:
      "Launch timing, platform list, supported languages, internet requirement, controller support, and edition questions.",
    href: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=63",
  },
  {
    title: "Meet the Cast",
    date: "February 28, 2026",
    summary:
      "Voice cast spotlight covering Alec Newman, Stewart Scudamore, and Rebecca Hanssen as Kliff, Oongka, and Damiane.",
    href: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=60",
  },
  {
    title: "Performance Specs",
    date: "March 10, 2026",
    summary:
      "Official PC, console, and Mac performance notes, including DirectX 12, VRR notes, and macOS recommendations.",
    href: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=62",
  },
];

export const homeFaq = [
  {
    question: "Is Crimson Desert out now?",
    answer:
      "Yes. Pearl Abyss said Crimson Desert launches worldwide on March 19, 2026, and the official launch FAQ was published one week before release.",
  },
  {
    question: "What time did Crimson Desert unlock?",
    answer:
      "The official FAQ listed a simultaneous launch at March 19, 15:00 PT and March 19, 22:00 GMT, which was March 20, 7:00 KST.",
  },
  {
    question: "Does Crimson Desert require an internet connection?",
    answer:
      "Yes for the initial setup and day-one patch. After installation, Pearl Abyss says the game can be enjoyed offline, but internet is still needed for future updates.",
  },
  {
    question: "Does Crimson Desert support cross-save?",
    answer:
      "No. Pearl Abyss explicitly says cross-save is not available between different platforms.",
  },
];

const sourceTitleMap: Record<string, string> = {
  "https://www.pearlabyss.com/en-US/Board/Detail?_boardNo=14504":
    "Pearl Abyss release date press release",
  "https://www.pearlabyss.com/en-us/Board/Detail?_boardNo=14594":
    "Pearl Abyss gone gold press release",
  "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=55":
    "Official gone gold notice",
  "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=50":
    "Official release date notice",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=57":
    "Features Overview #1",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=58":
    "Features Overview #2",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=59":
    "Features Overview #3",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=60":
    "Meet the Cast",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=62":
    "Performance Specs",
  "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=63":
    "Launch FAQ",
  "https://crimsondesert.pearlabyss.com/en-US/Main/Index":
    "Official Crimson Desert site",
  "https://store.steampowered.com/app/3321460/Crimson_Desert/":
    "Steam store page",
};

const heroThemes = {
  emberfall: {
    backgroundClass:
      "bg-[linear-gradient(180deg,rgba(101,28,20,0.5),transparent_40%),linear-gradient(180deg,#181115_0%,#0e1014_100%)]",
    overlayClass:
      "bg-[radial-gradient(circle_at_20%_18%,rgba(235,179,117,0.2),transparent_20%),radial-gradient(circle_at_78%_22%,rgba(143,49,36,0.28),transparent_24%)]",
  },
  pywel: {
    backgroundClass:
      "bg-[linear-gradient(180deg,rgba(30,61,58,0.42),transparent_40%),linear-gradient(180deg,#131517_0%,#0b0e11_100%)]",
    overlayClass:
      "bg-[radial-gradient(circle_at_18%_22%,rgba(128,187,170,0.18),transparent_22%),radial-gradient(circle_at_82%_16%,rgba(226,131,83,0.18),transparent_22%)]",
  },
  steel: {
    backgroundClass:
      "bg-[linear-gradient(180deg,rgba(39,45,56,0.5),transparent_44%),linear-gradient(180deg,#14161a_0%,#0b0d10_100%)]",
    overlayClass:
      "bg-[radial-gradient(circle_at_24%_20%,rgba(123,152,184,0.18),transparent_22%),radial-gradient(circle_at_80%_16%,rgba(229,175,116,0.14),transparent_20%)]",
  },
} as const;

export function getSourceTitle(url: string) {
  return sourceTitleMap[url] ?? new URL(url).hostname.replace("www.", "");
}

export function getHeroTheme(key: string) {
  return heroThemes[key as keyof typeof heroThemes] ?? heroThemes.emberfall;
}
