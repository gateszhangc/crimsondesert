import { promises as fs } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { siteConfig } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageFrontmatter = {
  title: string;
  description: string;
  slug: string;
  updatedAt: string;
  intentKeyword: string;
  heroImage: string;
  sourceUrls: string[];
  faq?: FaqItem[];
};

export type PageEntry = PageFrontmatter & {
  content: ReactElement;
};

const contentDirectory = path.join(process.cwd(), "content/pages");

function assertString(value: unknown, field: string, slugHint: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected "${field}" to be a non-empty string in ${slugHint}.`);
  }

  return value.trim();
}

function assertStringArray(value: unknown, field: string, slugHint: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Expected "${field}" to be a string array in ${slugHint}.`);
  }

  return value;
}

function assertFaqArray(value: unknown, slugHint: string): FaqItem[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Expected "faq" to be an array in ${slugHint}.`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Expected "faq[${index}]" to be an object in ${slugHint}.`);
    }

    return {
      question: assertString((item as Record<string, unknown>).question, `faq[${index}].question`, slugHint),
      answer: assertString((item as Record<string, unknown>).answer, `faq[${index}].answer`, slugHint),
    };
  });
}

function parseFrontmatter(data: Record<string, unknown>, slugHint: string): PageFrontmatter {
  const slug = assertString(data.slug, "slug", slugHint);

  return {
    title: assertString(data.title, "title", slugHint),
    description: assertString(data.description, "description", slugHint),
    slug,
    updatedAt: assertString(data.updatedAt, "updatedAt", slugHint),
    intentKeyword: assertString(data.intentKeyword, "intentKeyword", slugHint),
    heroImage: assertString(data.heroImage, "heroImage", slugHint),
    sourceUrls: assertStringArray(data.sourceUrls, "sourceUrls", slugHint),
    faq: assertFaqArray(data.faq, slugHint),
  };
}

function sortPages<T extends { slug: string }>(pages: T[]) {
  const order = new Map<string, number>(
    siteConfig.pageOrder.map((slug, index) => [slug, index]),
  );

  return [...pages].sort((left, right) => {
    return (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER) - (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER);
  });
}

async function readRawPage(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  return fs.readFile(fullPath, "utf8");
}

export const getAllPageSummaries = cache(async (): Promise<PageFrontmatter[]> => {
  const files = await fs.readdir(contentDirectory);

  const pages = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(contentDirectory, file), "utf8");
        const { data } = matter(raw);
        return parseFrontmatter(data as Record<string, unknown>, file);
      }),
  );

  return sortPages(pages);
});

export const getPageBySlug = cache(async (slug: string): Promise<PageEntry | null> => {
  try {
    const source = await readRawPage(slug);

    const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return {
      ...parseFrontmatter(frontmatter, `${slug}.mdx`),
      content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
});

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
