import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  frontmatter as englishAdelineFrontmatter,
  source as englishAdelineSource,
} from "../content/en/characters/adeline.mdx";
import {
  frontmatter as chineseAdelineFrontmatter,
  source as chineseAdelineSource,
} from "../content/zh/characters/adeline.mdx";
import type { Locale } from "./i18n";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  slug: z.string().min(1),
  locale: z.enum(["en", "zh"]),
});

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type BundledArticle = {
  frontmatter: unknown;
  source: string;
};

const bundledArticles: Record<Locale, Record<string, BundledArticle>> = {
  en: {
    adeline: {
      frontmatter: englishAdelineFrontmatter,
      source: englishAdelineSource,
    },
  },
  zh: {
    adeline: {
      frontmatter: chineseAdelineFrontmatter,
      source: chineseAdelineSource,
    },
  },
};

function invalidFrontmatterError(locale: string, slug: string) {
  return new Error(`Invalid frontmatter for ${locale}/${slug}`);
}

export type CharacterArticle = {
  frontmatter: {
    title: string;
    summary: string;
    slug: string;
    locale: Locale;
  };
  source: string;
};

export async function loadCharacterArticle(
  locale: Locale,
  slug: string,
): Promise<CharacterArticle> {
  if ((locale !== "en" && locale !== "zh") || !slugPattern.test(slug)) {
    throw invalidFrontmatterError(locale, slug);
  }

  const charactersDirectory = path.resolve(
    process.cwd(),
    "content",
    locale,
    "characters",
  );
  const articlePath = path.resolve(charactersDirectory, `${slug}.mdx`);
  const relativePath = path.relative(charactersDirectory, articlePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw invalidFrontmatterError(locale, slug);
  }

  const bundledArticle = bundledArticles[locale][slug];
  let data: unknown;
  let source: string;

  if (bundledArticle) {
    data = bundledArticle.frontmatter;
    source = bundledArticle.source;
  } else {
    let parsed: ReturnType<typeof matter>;

    try {
      parsed = matter(await readFile(articlePath, "utf8"));
    } catch {
      throw invalidFrontmatterError(locale, slug);
    }

    data = parsed.data;
    source = parsed.content;
  }

  const result = frontmatterSchema.safeParse(data);

  if (
    !result.success ||
    result.data.locale !== locale ||
    result.data.slug !== slug
  ) {
    throw invalidFrontmatterError(locale, slug);
  }

  return { frontmatter: result.data, source };
}
