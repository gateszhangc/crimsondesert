import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

function MdxLink({
  href = "",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const linkClassName = cn(
    "font-medium text-[#f0c790] underline decoration-[#f0c790]/40 underline-offset-4 transition hover:text-[#ffd7a6] hover:decoration-[#ffd7a6]",
    className,
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={linkClassName}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 font-heading text-4xl font-semibold tracking-tight text-white first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 font-heading text-2xl font-semibold text-white" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base leading-8 text-white/72" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="space-y-3 pl-5 text-base leading-8 text-white/72 marker:text-[#ddb27a]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="space-y-3 pl-5 text-base leading-8 text-white/72 marker:text-[#ddb27a]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-2" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="rounded-[1.5rem] border border-[#ddb27a]/18 bg-[#ddb27a]/8 px-5 py-4 text-base leading-8 text-[#f7e5cf]"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-white/10 bg-white/8 px-1.5 py-0.5 text-[0.9em] text-[#ffd7a6]"
      {...props}
    />
  ),
  a: MdxLink,
};
