import { afterEach, describe, expect, it, vi } from "vitest";
import { rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { getCharacter, getCharacters } from "../lib/characters";
import { loadCharacterArticle } from "../lib/content";

describe("character content", () => {
  const temporarySlugs = [
    "content-test-incomplete",
    "content-test-malformed",
    "content-test-mismatched",
  ];
  const charactersDirectory = path.join(
    process.cwd(),
    "content",
    "en",
    "characters",
  );

  afterEach(async () => {
    await Promise.all(
      temporarySlugs.map((slug) =>
        rm(path.join(charactersDirectory, `${slug}.mdx`), { force: true }),
      ),
    );
  });

  it("shares Adeline metadata with the directory", () => {
    const adeline = getCharacter("en", "adeline");

    expect(adeline?.category).toBe("romanceable");
    expect(getCharacters("en")).toContainEqual(adeline);
  });

  it("includes a representative character in every directory group", () => {
    const categories = new Set(
      getCharacters("en").map((character) => character.category),
    );

    expect(categories).toEqual(
      new Set(["romanceable", "non-romanceable", "market-vendor", "special"]),
    );
  });

  it("includes a representative Chinese character in every directory group", () => {
    const categories = new Set(
      getCharacters("zh").map((character) => character.category),
    );

    expect(categories).toEqual(
      new Set(["romanceable", "non-romanceable", "market-vendor", "special"]),
    );
  });

  it("returns null for an exact locale or slug mismatch", () => {
    expect(getCharacter("en", "阿德琳")).toBeNull();
    expect(getCharacter("zh", "Adeline")).toBeNull();
  });

  it("loads localized MDX frontmatter", async () => {
    const article = await loadCharacterArticle("zh", "adeline");

    expect(article.frontmatter.title).toBe("阿德琳");
    expect(article.source).toContain("## 简介");
  });

  it("loads bundled Adeline content outside the repository cwd", async () => {
    const cwd = vi.spyOn(process, "cwd").mockReturnValue("Z:\\runtime-bundle");

    try {
      const article = await loadCharacterArticle("en", "adeline");

      expect(article.frontmatter.title).toBe("Adeline");
      expect(article.source).toContain("## Gifts");
    } finally {
      cwd.mockRestore();
    }
  });

  it("rejects a traversal slug before reading outside its locale directory", async () => {
    await expect(
      loadCharacterArticle("en", "../../zh/characters/adeline"),
    ).rejects.toThrow("Invalid frontmatter for en/../../zh/characters/adeline");
  });

  it("maps incomplete frontmatter to the actionable validation error", async () => {
    const slug = "content-test-incomplete";
    await writeFile(
      path.join(charactersDirectory, `${slug}.mdx`),
      "---\ntitle: Incomplete\n---\n",
    );

    await expect(loadCharacterArticle("en", slug)).rejects.toThrow(
      `Invalid frontmatter for en/${slug}`,
    );
  });

  it("maps malformed frontmatter to the actionable validation error", async () => {
    const slug = "content-test-malformed";
    await writeFile(
      path.join(charactersDirectory, `${slug}.mdx`),
      "---\ntitle: [unterminated\n---\n",
    );

    await expect(loadCharacterArticle("en", slug)).rejects.toThrow(
      `Invalid frontmatter for en/${slug}`,
    );
  });

  it("rejects frontmatter that does not match the requested locale and slug", async () => {
    const slug = "content-test-mismatched";
    await writeFile(
      path.join(charactersDirectory, `${slug}.mdx`),
      [
        "---",
        "title: Mismatched",
        "summary: This article has the wrong identity.",
        "slug: adeline",
        "locale: zh",
        "---",
      ].join("\n"),
    );

    await expect(loadCharacterArticle("en", slug)).rejects.toThrow(
      `Invalid frontmatter for en/${slug}`,
    );
  });
});
