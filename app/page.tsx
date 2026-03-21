import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp, Compass, MonitorPlay, ShieldCheck } from "lucide-react";

import { FaqList } from "@/components/faq-list";
import { StructuredData } from "@/components/structured-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPageSummaries, formatDisplayDate } from "@/lib/content";
import { getSourceTitle, homeFaq, keyFacts, quickStartLinks, siteConfig, sourceHighlights } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.homeTitle,
  description: siteConfig.homeDescription,
};

const sectionShell = "mx-auto w-full max-w-6xl px-6 lg:px-8";

export default async function HomePage() {
  const pages = await getAllPageSummaries();

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
                    Independent guide
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/72">
                    Live now on March 19, 2026 release
                  </span>
                </div>

                <p className="text-sm uppercase tracking-[0.32em] text-white/45">
                  Source-backed keyword hub for Crimson Desert
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
                  Crimson Desert
                  <span className="block text-[#d9a86b]">Launch facts, platform details, and guide pages</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  This site is built to answer the exact searches people make around{" "}
                  <span className="text-white">Crimson Desert release date</span>, gameplay,
                  characters, supported platforms, and system requirements using official Pearl
                  Abyss sources instead of recycled rumor content.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={siteConfig.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#ddb37a] px-5 py-3 text-sm font-semibold text-[#19110f] transition hover:bg-[#edc391]"
                  >
                    Official site
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={siteConfig.steamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/10"
                  >
                    Steam page
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href={siteConfig.launchFaqUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-white/74 transition hover:text-white"
                  >
                    Launch FAQ
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
                    Verified timeline
                  </p>
                  <div className="mt-5 space-y-4">
                    {[
                      {
                        date: "Sep 24, 2025",
                        title: "Release date revealed",
                        detail: "Pearl Abyss confirmed March 19, 2026 during PlayStation State of Play.",
                      },
                      {
                        date: "Jan 22, 2026",
                        title: "Gone gold",
                        detail: "The official site and Pearl Abyss newsroom both announced the milestone.",
                      },
                      {
                        date: "Mar 12, 2026",
                        title: "Launch FAQ published",
                        detail: "Launch timing, platforms, supported languages, and internet requirements were clarified.",
                      },
                    ].map((event) => (
                      <div
                        key={event.title}
                        className="rounded-[1.5rem] border border-white/8 bg-black/18 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                          {event.date}
                        </p>
                        <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                          {event.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-white/66">{event.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {quickStartLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group rounded-[1.4rem] border border-white/8 bg-white/4 p-4 transition hover:border-[#f0ba82]/25 hover:bg-white/8"
                      >
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#f0c790]">
                          Open page
                          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
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
                  Intent coverage
                </p>
                <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                  The keyword cluster, page by page
                </h2>
                <p className="mt-3 text-base leading-7 text-white/64">
                  Each page targets a specific Crimson Desert search intent and links back into the
                  rest of the cluster for internal SEO depth.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/58">
                <Compass className="size-4 text-[#d8ad76]" />
                Static Next.js pages with MDX-backed content
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => (
                <Card
                  key={page.slug}
                  className="border border-white/10 bg-white/5 py-0 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                >
                  <CardHeader className="border-b border-white/8 pb-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#d8ad76]">
                      {page.intentKeyword}
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
                      Read the page
                      <ArrowRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8">
          <div className={`${sectionShell} grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
            <Card className="border border-white/10 bg-white/5 py-0">
              <CardHeader className="border-b border-white/8 pb-5">
                <div className="flex items-center gap-3 text-[#d8ad76]">
                  <ShieldCheck className="size-5" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em]">
                    What stays factual here
                  </p>
                </div>
                <CardTitle className="font-heading text-3xl text-white">
                  No rumor recycling
                </CardTitle>
                <CardDescription className="leading-7 text-white/64">
                  This site only leans on official notices, feature overviews, and Pearl Abyss press
                  releases. If something is not confirmed, it is marked as not officially confirmed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {[
                  "Release and launch timing",
                  "Platform and storefront availability",
                  "System requirements and performance notes",
                  "Cast, gameplay, and world details from official feature videos",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/8 bg-black/18 px-4 py-3 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
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
                      Internal page
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-3xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f0c790]">
                    Explore
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
                Official watchlist
              </p>
              <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                The notices worth linking to
              </h2>
              <p className="mt-3 text-base leading-7 text-white/64">
                These are the source pages that currently anchor the strongest Crimson Desert
                searches.
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
                      Open official source
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
                  FAQ preview
                </p>
                <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
                  Questions official sources already answered
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/64">
                  These answers are based on Pearl Abyss launch notices and are the best candidate
                  snippets for FAQ-style search intent.
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
