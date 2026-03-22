import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { navItems, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0f13]/76 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#ddb27a]/25 bg-[#ddb27a]/10 text-sm font-semibold text-[#f3d2a8]">
              CD
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">
                {siteConfig.brandName}
              </span>
              <span className="block truncate text-xs uppercase tracking-[0.24em] text-white/34">
                Independent launch companion
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/62 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={siteConfig.officialSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/24 hover:bg-white/10"
          >
            Open official site
          </Link>
          <Link
            href={siteConfig.steamUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#ddb37a] px-4 py-2.5 text-sm font-semibold text-[#19110f] transition hover:bg-[#edc391]"
          >
            Open Steam page
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
