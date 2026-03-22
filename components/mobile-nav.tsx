"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems, siteConfig } from "@/lib/site";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10 lg:hidden">
        <Menu className="size-5" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-l border-white/10 bg-[#111318]/96 text-white"
      >
        <SheetHeader className="border-b border-white/8 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ddb27a]">
            {siteConfig.brandName}
          </p>
          <SheetTitle className="font-heading text-3xl font-semibold text-white">
            Step into the campaign
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-3 px-4 pb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-3 text-sm font-medium text-white transition hover:border-[#f0ba82]/25"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 space-y-3">
            <Link
              href={siteConfig.officialSiteUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[1.2rem] bg-[#ddb37a] px-4 py-3 text-sm font-semibold text-[#19110f]"
            >
              Open official site
            </Link>
            <Link
              href={siteConfig.steamUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white"
            >
              Open Steam page
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
