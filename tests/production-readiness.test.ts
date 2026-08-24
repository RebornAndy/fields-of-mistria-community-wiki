import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { generateMetadata } from "../app/layout";

const projectRoot = process.cwd();

describe("production readiness", () => {
  it("derives absolute social metadata from the incoming request host", async () => {
    const metadata = await generateMetadata();
    const openGraphImages = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : [metadata.openGraph?.images];
    const socialImage = openGraphImages[0];

    expect(metadata.metadataBase?.toString()).toBe(
      "https://wiki.example.test/",
    );
    expect(metadata.openGraph?.title).toBe("Fields of Mistria Wiki");
    expect(
      typeof socialImage === "object" && socialImage && "url" in socialImage
        ? socialImage.url.toString()
        : socialImage?.toString(),
    ).toBe("https://wiki.example.test/og.png");
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("ships only original local visual assets and the generated social card", async () => {
    const assetPaths = [
      "public/images/characters/adeline.webp",
      "public/images/characters/eiland.webp",
      "public/images/characters/balor.webp",
      "public/images/characters/caldarus.webp",
      "public/og.png",
    ];

    for (const assetPath of assetPaths) {
      expect((await stat(join(projectRoot, assetPath))).size).toBeGreaterThan(
        0,
      );
    }

    await expect(
      stat(join(projectRoot, "public/images/wiki-background.webp")),
    ).rejects.toMatchObject({ code: "ENOENT" });

    const socialCard = await readFile(join(projectRoot, "public/og.png"));
    expect(socialCard.subarray(1, 4).toString("ascii")).toBe("PNG");
  });

  it("uses an original code-only backdrop with no external background image", async () => {
    const css = await readFile(join(projectRoot, "app/globals.css"), "utf8");

    expect(css).not.toContain("wiki-background.webp");
    expect(css).not.toMatch(/url\([^)]*wiki-background/i);
    expect(css).toContain("radial-gradient");
    expect(css).toContain("linear-gradient");
  });

  it("scopes pixelated rendering to intentional pixel-art assets", async () => {
    const css = await readFile(join(projectRoot, "app/globals.css"), "utf8");

    expect(css).not.toMatch(/(^|\n)img\s*\{[^}]*image-rendering:\s*pixelated/s);
    expect(css).toMatch(/\.pixel-art\s*\{[^}]*image-rendering:\s*pixelated/s);
  });
});
