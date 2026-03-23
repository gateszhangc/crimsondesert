import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp, Compass, MonitorPlay, ShieldCheck } from "lucide-react";

import { FaqList } from "@/components/faq-list";
import { StructuredData } from "@/components/structured-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPageSummaries, formatDisplayDate } from "@/lib/content";
import {
  getSourceTitle,
  homeFaq,
  homeHero,
  homeWorldPillars,
  keyFacts,
  quickStartLinks,
  siteConfig,
  sourceHighlights,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.homeTitle,
  },
  description: siteConfig.homeDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [...siteConfig.defaultKeywords],
  openGraph: {
    type: "website",
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.homeTitle,
    description: siteConfig.homeDescription,
    images: ["/opengraph-image"],
  },
};

const sectionShell = "mx-auto w-full max-w-6xl px-6 lg:px-8";

export default async function HomePage() {
  const pages = await getAllPageSummaries();
  const primaryCtaIsExternal =
    homeHero.primaryCta.href.startsWith("http://") ||
    homeHero.primaryCta.href.startsWith("https://");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Crimson Desert",
    url: siteConfig.url,
    description: siteConfig.description,
    genre: ["Open-world action-adventure"],
    datePublished: "2026-03-19",
    gamePlatform: [
      "PlayStation 5",
      "PlayStation 5 Pro",
      "Xbox Series X|S",
      "Xbox on PC",
      "Steam",
      "Epic Games Store",
      "Mac App Store",
      "GeForce NOW",
    ],
    publisher: {
      "@type": "Organization",
      name: "Pearl Abyss",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={[websiteSchema, videoGameSchema, faqSchema]} />
      <main className="overflow-hidden pb-18">
        <section className="relative isolate border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(223,125,76,0.32),transparent_28%),radial-gradient(circle_at_75%_20%,rgba(143,49,36,0.28),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_40%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d29b5f] to-transparent" />
          <div className={`${sectionShell} relative py-16 sm:py-20 lg:py-26`}>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
              <div>
                <div className="mb-6 flex flex-wrap gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#e8be8a]">
                  <span className="rounded-full border border-[#f5c07d]/25 bg-[#f5c07d]/8 px-4 py-1.5 text-[#f6d8b2]">
                    Independent companion
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/72">
                    Updated March 21, 2026
                  </span>
                </div>

                <p className="text-sm uppercase tracking-[0.32em] text-white/45">
                  {homeHero.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
                  {siteConfig.brandName}
                </h1>
                <p className="mt-4 max-w-4xl font-heading text-3xl leading-[1.02] text-[#d9a86b] sm:text-4xl lg:text-5xl">
                  {homeHero.title}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  <span className="text-white">{siteConfig.brandName}</span> {homeHero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={homeHero.primaryCta.href}
                    target={primaryCtaIsExternal ? "_blank" : undefined}
                    rel={primaryCtaIsExternal ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-[#ddb37a] px-5 py-3 text-sm font-semibold text-[#19110f] transition hover:bg-[#edc391]"
                  >
                    {homeHero.primaryCta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={homeHero.secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/10"
                  >
                    {homeHero.secondaryCta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={homeHero.tertiaryCta.href}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-white/74 transition hover:text-white"
                  >
                    {homeHero.tertiaryCta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                  {keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-[0.26em] text-white/42">
                        {fact.label}
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-white">{fact.value}</dd>
                      <p className="mt-2 text-sm leading-6 text-white/62">{fact.note}</p>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative">
                <div className="absolute -right-8 top-4 hidden h-48 w-48 rounded-full bg-[#9e3325]/30 blur-3xl lg:block" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111317]/88 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.4)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ebb375] to-transparent" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e1b77e]">
                    The launch frame
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold text-white">
                    Built from official material, not rumor loops
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/64">
                    This companion keeps the launch, platforms, performance notes, and support
                    details close to the pages Pearl Abyss actually published.
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Release timing stays tied to the official date notice and launch FAQ.",
                      "Platforms and storefronts come from Pearl Abyss launch materials.",
                      "Performance details stay inside the official specs page instead of padded guesswork.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.35rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-6 text-white/72"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={siteConfig.officialSiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.4rem] border border-white/8 bg-white/4 p-4 transition hover:border-[#f0ba82]/25 hover:bg-white/8"
                    >
                      <p className="text-sm font-semibold text-white">Official site</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        Open Pearl Abyss&apos;s main Crimson Desert page.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#f0c790]">
                        Visit official site
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                    <Link
                      href={siteConfig.steamUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1.4rem] border border-white/8 bg-white/4 p-4 transition hover:border-[#f0ba82]/25 hover:bg-white/8"
                    >
                      <p className="text-sm font-semibold text-white">Storefront</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        Jump to the Steam listing and release details.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#f0c790]">
                        Open Steam page
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className={sectionShell}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                  The world of Crimson Desert
                </p>
                <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                  A march shaped by four forces
                </h2>
                <p className="mt-3 text-base leading-7 text-white/64">
                  The official pitch lands because it keeps one foot in scale and one foot in
                  survival: a broken company, a continent in chaos, and a campaign that keeps
                  widening as you ride deeper into Pywel.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/58">
                <Compass className="size-4 text-[#d8ad76]" />
                Built to feel like a destination first, a guide second
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {homeWorldPillars.map((pillar) => (
                <Card
                  key={pillar.title}
                  className="border border-white/10 bg-white/5 py-0 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                >
                  <CardHeader className="border-b border-white/8 pb-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                      Pillar
                    </p>
                    <CardTitle className="font-heading text-3xl text-white">
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <p className="text-sm leading-7 text-white/64">{pillar.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8">
          <div className={sectionShell}>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                Explore the campaign
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                Every section keeps the fantasy intact
              </h2>
              <p className="mt-3 text-base leading-7 text-white/64">
                These pages still carry the release facts, platform details, and launch support
                players need, but they now enter through the world, the cast, and the journey
                instead of flat utility prompts.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => (
                <Card
                  key={page.slug}
                  className="border border-white/10 bg-white/5 py-0 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                >
                  <CardHeader className="border-b border-white/8 pb-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                      {page.sectionLabel}
                    </p>
                    <CardTitle className="font-heading text-3xl text-white">{page.title}</CardTitle>
                    <CardDescription className="leading-6 text-white/62">
                      {page.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <div className="flex items-center justify-between text-sm text-white/46">
                      <span>Updated {formatDisplayDate(page.updatedAt)}</span>
                      <span>{page.sourceUrls.length} official sources</span>
                    </div>
                    <Link
                      href={`/${page.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#f1c78f]"
                    >
                      Open section
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className={`${sectionShell} grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
            <Card className="border border-white/10 bg-white/5 py-0">
              <CardHeader className="border-b border-white/8 pb-5">
                <div className="flex items-center gap-3 text-[#d8ad76]">
                  <ShieldCheck className="size-5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em]">
                    Availability
                  </p>
                </div>
                <CardTitle className="font-heading text-3xl text-white">
                  What the launch materials confirm
                </CardTitle>
                <CardDescription className="leading-7 text-white/64">
                  When the page needs to get practical, it drops straight into the concrete
                  details: release timing, platform coverage, hardware notes, and support answers
                  that Pearl Abyss already published.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {[
                  "A simultaneous worldwide unlock at March 19, 2026 15:00 PT / 22:00 GMT.",
                  "Platform coverage across PlayStation 5, Xbox Series X|S, Xbox on PC, Steam, Epic, Mac App Store, and GeForce NOW.",
                  "Support guidance covering internet requirements, controllers, languages, editions, and cross-save.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <Link
                    href={siteConfig.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/25"
                  >
                    Official site
                  </Link>
                  <Link
                    href={siteConfig.steamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/25"
                  >
                    Steam page
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickStartLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 transition hover:border-[#ebb375]/28 hover:shadow-[0_18px_60px_rgba(0,0,0,0.26)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-black/18 p-3 text-[#d8ad76]">
                      {item.icon === "MonitorPlay" ? (
                        <MonitorPlay className="size-5" />
                      ) : item.icon === "CircleHelp" ? (
                        <CircleHelp className="size-5" />
                      ) : (
                        <Compass className="size-5" />
                      )}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
                      Launch detail
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-3xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f0c790]">
                    Open section
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className={sectionShell}>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                Official dispatches
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                The notices worth opening
              </h2>
              <p className="mt-3 text-base leading-7 text-white/64">
                The site still keeps a clean source trail. These are the main Pearl Abyss pages
                behind the biggest claims on launch, platforms, and performance.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {sourceHighlights.map((item) => (
                <Card
                  key={item.href}
                  className="border border-white/10 bg-white/5 py-0"
                >
                  <CardHeader className="border-b border-white/8 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
                      {item.date}
                    </p>
                    <CardTitle className="font-heading text-3xl text-white">{item.title}</CardTitle>
                    <CardDescription className="leading-7 text-white/64">
                      {item.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm text-white/42">{getSourceTitle(item.href)}</p>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f0c790]"
                    >
                      Open official notice
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className={sectionShell}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                  Before you ride out
                </p>
                <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                  The practical questions still matter
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/64">
                  Once the world, combat, and launch frame are clear, these are the last checks
                  players usually make before downloading, buying, or choosing a platform.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
                <FaqList items={homeFaq} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
