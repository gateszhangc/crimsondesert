const defaultSiteName = "Crimson Desert Guide";
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
  brandName: "Crimson Desert",
  domain: new URL(siteUrl).hostname,
  url: siteUrl,
  language: "en-US",
  locale: "en_US",
  category: "games",
  homeTitle: "Crimson Desert Guide: Release Date, Platforms, Launch FAQ",
  homeDescription:
    "Get the confirmed Crimson Desert release date, unlock time, platforms, and launch FAQ from official Pearl Abyss sources in one fast guide.",
  description:
    "Independent Crimson Desert companion covering the release date, platforms, world details, characters, performance notes, and launch support through official Pearl Abyss sources.",
  updatedAt: "2026-03-21",
  officialSiteUrl: "https://crimsondesert.pearlabyss.com/en-US/Main/Index",
  steamUrl: "https://store.steampowered.com/app/3321460/Crimson_Desert/",
  launchFaqUrl: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=63",
  performanceUrl: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=62",
  defaultKeywords: [
    "crimson desert",
    "crimson desert guide",
    "crimson desert release date",
    "crimson desert platforms",
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
  { href: "/release-date", label: "Release" },
  { href: "/gameplay", label: "World & Combat" },
  { href: "/characters", label: "Characters" },
  { href: "/platforms", label: "Platforms" },
  { href: "/system-requirements", label: "Performance" },
  { href: "/faq", label: "Support" },
];

export const homeHero = {
  eyebrow: "Pearl Abyss's open-world action-adventure",
  title: "A kingdom in ruin. A mercenary on the march.",
  description:
    "Crimson Desert follows Kliff and the Greymanes across the fractured continent of Pywel, where siege warfare, roaming exploration, brutal combat, and hard-won survival all collide.",
  primaryCta: {
    href: "https://www.easyclaw.pro",
    label: "One-click deploy",
  },
  secondaryCta: {
    href: "/platforms",
    label: "View platforms",
  },
  tertiaryCta: {
    href: "/faq",
    label: "Read launch support",
  },
} as const;

export const keyFacts = [
  {
    label: "Worldwide launch",
    value: "March 19, 2026",
    note: "Pearl Abyss confirmed a simultaneous worldwide release across official launch materials.",
  },
  {
    label: "Confirmed platforms",
    value: "PS5, Xbox, PC, Mac, cloud",
    note: "The launch FAQ confirms console, PC storefronts, Mac support, and GeForce NOW.",
  },
  {
    label: "Full voiceover",
    value: "EN / KR / Simplified Chinese",
    note: "The launch FAQ lists full voice support in English, Korean, and Simplified Chinese.",
  },
];

export const homeWorldPillars = [
  {
    title: "Pywel",
    description:
      "A fractured continent of wilderness, ruined strongholds, cities, and battlefields that Pearl Abyss treats as a place to cross, not just observe.",
  },
  {
    title: "The Greymanes",
    description:
      "Kliff's scattered company gives the journey its emotional center, turning the campaign into a march to rebuild what has been broken.",
  },
  {
    title: "Brutal Combat",
    description:
      "Weapons, chained skills, equipment growth, and heavy close-quarters action drive the official pitch for every major encounter.",
  },
  {
    title: "Life Between Battles",
    description:
      "Camp life, downtime systems, and the wider rhythm of travel keep the world from collapsing into a string of boss fights.",
  },
] as const;

export const quickStartLinks = [
  {
    href: "/release-date",
    title: "Launch Timeline",
    description:
      "From the State of Play reveal to the worldwide unlock, follow how Pearl Abyss framed the arrival.",
    icon: "Compass",
  },
  {
    href: "/platforms",
    title: "Where You Can Play",
    description:
      "See the official console, PC, Mac, and cloud rollout before you choose a storefront.",
    icon: "MonitorPlay",
  },
  {
    href: "/faq",
    title: "Launch Support",
    description:
      "Get the practical answers on setup, controllers, editions, languages, and cross-save.",
    icon: "CircleHelp",
  },
];

export const sourceHighlights = [
  {
    title: "Release Date Notice",
    date: "September 24, 2025",
    summary:
      "Pearl Abyss confirmed March 19, 2026 and tied the reveal to PlayStation State of Play.",
    href: "https://crimsondesert.pearlabyss.com/en-US/News/Notice/Detail?_boardNo=50",
  },
  {
    title: "Launch FAQ",
    date: "March 12, 2026",
    summary:
      "Launch timing, platform list, supported languages, internet requirement, controller support, and edition questions.",
    href: "https://crimsondesert.pearlabyss.com/en-us/News/Notice/Detail?_boardNo=63",
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
      "Yes. Pearl Abyss launched Crimson Desert worldwide on March 19, 2026, after publishing the official launch FAQ on March 12, 2026.",
  },
  {
    question: "What time did Crimson Desert unlock?",
    answer:
      "The official launch FAQ listed a simultaneous release at March 19, 2026 15:00 PT and March 19, 2026 22:00 GMT, which was March 20, 2026 7:00 KST.",
  },
  {
    question: "Does Crimson Desert require an internet connection?",
    answer:
      "Yes. Pearl Abyss requires an internet connection for the initial setup and day-one patch. After installation, the game can be played offline, but future updates still need internet.",
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
