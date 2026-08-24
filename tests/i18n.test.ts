import { describe, expect, it } from "vitest";
import { localizePath, switchLocalePath } from "../lib/i18n";

describe("locale routing", () => {
  it("keeps English routes unprefixed", () => {
    expect(localizePath("/characters/adeline", "en")).toBe(
      "/characters/adeline",
    );
  });

  it("prefixes Chinese routes", () => {
    expect(localizePath("/characters/adeline", "zh")).toBe(
      "/zh/characters/adeline",
    );
  });

  it("switches locale while preserving the page", () => {
    expect(switchLocalePath("/characters/adeline", "zh")).toBe(
      "/zh/characters/adeline",
    );
    expect(switchLocalePath("/zh/characters/adeline", "en")).toBe(
      "/characters/adeline",
    );
  });
});
