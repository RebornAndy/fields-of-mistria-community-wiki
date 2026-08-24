import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { generateMetadata } from "../app/layout";
import { requestHeaders } from "./mocks/next-headers";

const projectRoot = process.cwd();

function channelToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hexColor: string) {
  const channels = hexColor
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => channelToLinear(Number.parseInt(channel, 16)));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first: string, second: string) {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function cssColor(css: string, variable: string) {
  const match = css.match(new RegExp(`${variable}:\\s*(#[0-9a-f]{6})`, "i"));
  if (!match) throw new Error(`Missing CSS variable ${variable}`);
  return match[1];
}

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
    expect(metadata.openGraph?.title).toBe(
      "Fields of Mistria Wiki — Guides, Gifts & Romance",
    );
    expect(metadata.keywords).toContain("Fields of Mistria");
    expect(
      typeof socialImage === "object" && socialImage && "url" in socialImage
        ? socialImage.url.toString()
        : socialImage?.toString(),
    ).toBe("https://wiki.example.test/og.png");
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("ignores an untrusted forwarded host when building social metadata", async () => {
    requestHeaders.set("x-forwarded-host", "attacker.example");

    try {
      const metadata = await generateMetadata();
      const openGraphImages = Array.isArray(metadata.openGraph?.images)
        ? metadata.openGraph.images
        : [metadata.openGraph?.images];
      const socialImage = openGraphImages[0];

      expect(metadata.metadataBase?.toString()).toBe(
        "https://wiki.example.test/",
      );
      expect(
        typeof socialImage === "object" && socialImage && "url" in socialImage
          ? socialImage.url.toString()
          : socialImage?.toString(),
      ).toBe("https://wiki.example.test/og.png");
      expect(metadata.twitter?.images?.[0].toString()).toBe(
        "https://wiki.example.test/og.png",
      );
    } finally {
      requestHeaders.delete("x-forwarded-host");
    }
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

  it("uses a dual focus ring with at least 3:1 contrast on light and dark surfaces", async () => {
    const css = await readFile(join(projectRoot, "app/globals.css"), "utf8");
    const focusRule = css.match(/:focus-visible\s*\{([^}]*)\}/s)?.[1] ?? "";
    const darkRing = cssColor(css, "--wiki-night");
    const lightRing = cssColor(css, "--wiki-paper");

    expect(focusRule).toMatch(/outline:\s*3px solid var\(--wiki-night\)/);
    expect(focusRule).toMatch(/box-shadow:\s*0 0 0 6px var\(--wiki-paper\)/);
    expect(
      contrast(darkRing, cssColor(css, "--wiki-paper")),
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrast(darkRing, cssColor(css, "--wiki-parchment")),
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrast(lightRing, cssColor(css, "--wiki-night")),
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrast(lightRing, cssColor(css, "--wiki-evergreen")),
    ).toBeGreaterThanOrEqual(3);
  });

  it("ships a starter-free Fields of Mistria project identity", async () => {
    const packageJson = JSON.parse(
      await readFile(join(projectRoot, "package.json"), "utf8"),
    ) as { name: string };
    const readme = await readFile(join(projectRoot, "README.md"), "utf8");
    const favicon = await readFile(
      join(projectRoot, "public/fields-of-mistria-favicon-512.png"),
    );

    expect(packageJson.name).toBe("fields-of-mistria-community-wiki");
    expect(readme).not.toMatch(/vinext-starter|clean full-stack starter/i);
    for (const route of [
      "`/`",
      "`/characters`",
      "`/characters/adeline`",
      "`/zh`",
      "`/zh/characters`",
      "`/zh/characters/adeline`",
    ]) {
      expect(readme).toContain(route);
    }
    expect(favicon.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(favicon.byteLength).toBeGreaterThan(100_000);

    for (const starterAsset of ["file.svg", "globe.svg", "window.svg"]) {
      await expect(
        access(join(projectRoot, "public", starterAsset)),
      ).rejects.toMatchObject({ code: "ENOENT" });
    }
  });
});
