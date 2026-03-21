import Link from "next/link";

import { formatDisplayDate } from "@/lib/content";
import { getSourceTitle, navItems, siteConfig, sourceHighlights } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,0.9fr)] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
            {siteConfig.domain}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-white">
            Independent, not official.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">
            This site is an independent guide built around the Crimson Desert keyword cluster. It
            is not affiliated with Pearl Abyss. Game facts, launch details, and product references
            are attributed to official Pearl Abyss notices and the official Crimson Desert site.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
            Pages
          </p>
          <div className="mt-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-white/64 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
            Official links
          </p>
          <div className="mt-4 space-y-3">
            {sourceHighlights.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block text-sm leading-6 text-white/64 transition hover:text-white"
              >
                {getSourceTitle(item.href)}
              </Link>
            ))}
            <Link
              href={siteConfig.officialSiteUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-sm leading-6 text-white/64 transition hover:text-white"
            >
              Official Crimson Desert site
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Updated {formatDisplayDate(siteConfig.updatedAt)}.</p>
          <p>Launch facts reflect official sources available as of {formatDisplayDate(siteConfig.updatedAt)}.</p>
        </div>
      </div>
    </footer>
  );
}
