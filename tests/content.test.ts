import { describe, expect, it } from "vitest";
import { getCharacter, getCharacters } from "../lib/characters";
import { loadCharacterArticle } from "../lib/content";

describe("character content", () => {
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

  it("loads localized MDX frontmatter", async () => {
    const article = await loadCharacterArticle("zh", "adeline");

    expect(article.frontmatter.title).toBe("阿德琳");
    expect(article.source).toContain("## 简介");
  });
});
