import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "lucide-react";

import { FaqList } from "@/components/faq-list";
import { StructuredData } from "@/components/structured-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDisplayDate, getAllPageSummaries, getPageBySlug } from "@/lib/content";
import { getHeroTheme, getSourceTitle, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await getAllPageSummaries();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: {
      absolute: page.seoTitle,
    },
    description: page.seoDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    keywords: [...siteConfig.defaultKeywords, page.intentKeyword],
    openGraph: {
      type: "article",
      title: page.ogTitle ?? page.seoTitle,
      description: page.ogDescription ?? page.seoDescription,
      url: `${siteConfig.url}/${page.slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: `${page.publishedAt}T00:00:00Z`,
      modifiedTime: `${page.updatedAt}T00:00:00Z`,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle ?? page.seoTitle,
      description: page.ogDescription ?? page.seoDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function KeywordPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const allPages = await getAllPageSummaries();
  const relatedPages = allPages.filter((entry) => entry.slug !== page.slug).slice(0, 3);
  const heroTheme = getHeroTheme(page.heroImage);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${siteConfig.url}/${page.slug}`,
      },
    ],
  };

  const faqSchema = page.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <StructuredData data={faqSchema ? [breadcrumbSchema, faqSchema] : breadcrumbSchema} />
      <main className="overflow-hidden pb-18">
        <section className="relative isolate border-b border-white/10">
          <div className={`absolute inset-0 ${heroTheme.backgroundClass}`} />
          <div className={`absolute inset-0 ${heroTheme.overlayClass}`} />
          <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/58 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
                  {page.sectionLabel}
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-[0.94] text-white sm:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  {page.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Last updated", value: formatDisplayDate(page.updatedAt) },
                    { label: "Official sources", value: `${page.sourceUrls.length} links` },
                    { label: "Section", value: page.sectionLabel },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/42">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border border-white/10 bg-[#101216]/88 py-0 shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
                <CardHeader className="border-b border-white/8 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
                    Official references
                  </p>
                  <CardTitle className="font-heading text-3xl text-white">
                    Open the source trail
                  </CardTitle>
                  <CardDescription className="leading-7 text-white/62">
                    Launch notices, store pages, and official reference material sit behind this
                    section so the practical details stay easy to verify.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  <Link
                    href={siteConfig.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/28"
                  >
                    Official site
                    <ExternalLink className="size-4 text-[#ddb27a]" />
                  </Link>
                  <Link
                    href={siteConfig.steamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/28"
                  >
                    Steam page
                    <ExternalLink className="size-4 text-[#ddb27a]" />
                  </Link>
                  <Link
                    href={siteConfig.launchFaqUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/28"
                  >
                    Launch FAQ
                    <ExternalLink className="size-4 text-[#ddb27a]" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
            <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="space-y-6">{page.content}</div>
            </article>

            <aside className="space-y-4">
              <Card className="border border-white/10 bg-white/5 py-0">
                <CardHeader className="border-b border-white/8 pb-5">
                  <div className="flex items-center gap-3 text-[#ddb27a]">
                    <FileText className="size-5" />
                    <p className="text-xs font-semibold uppercase tracking-[0.28em]">
                      Official sources
                    </p>
                  </div>
                  <CardTitle className="font-heading text-3xl text-white">
                    Source list
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  {page.sourceUrls.map((url) => (
                    <Link
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-3 transition hover:border-[#f0ba82]/25"
                    >
                      <p className="text-sm font-medium text-white">{getSourceTitle(url)}</p>
                      <p className="mt-2 text-xs leading-5 text-white/42">{url}</p>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {page.faq?.length ? (
                <Card className="border border-white/10 bg-white/5 py-0">
                  <CardHeader className="border-b border-white/8 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
                      FAQ
                    </p>
                    <CardTitle className="font-heading text-3xl text-white">
                      Support notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <FaqList items={page.faq} />
                  </CardContent>
                </Card>
              ) : null}

              <Card className="border border-white/10 bg-white/5 py-0">
                <CardHeader className="border-b border-white/8 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
                    Related pages
                  </p>
                  <CardTitle className="font-heading text-3xl text-white">
                    Continue through Pywel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  {relatedPages.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/${entry.slug}`}
                      className="group block rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-3 transition hover:border-[#f0ba82]/25"
                    >
                      <p className="text-sm font-medium text-white">{entry.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{entry.description}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#f0c790]">
                        Open section
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
