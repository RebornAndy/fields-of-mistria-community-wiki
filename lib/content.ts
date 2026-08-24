import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "./i18n";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  slug: z.string().min(1),
  locale: z.enum(["en", "zh"]),
});

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
  const articlePath = path.join(
    process.cwd(),
    "content",
    locale,
    "characters",
    `${slug}.mdx`,
  );
  const file = await readFile(articlePath, "utf8");
  const parsed = matter(file);
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(`Invalid frontmatter for ${locale}/${slug}`);
  }

  return { frontmatter: result.data, source: parsed.content };
}
