import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import CharactersPage from "../app/characters/page";
import AdelinePage from "../app/characters/adeline/page";
import NotFound from "../app/not-found";
import ChineseHomePage from "../app/zh/page";
import ChineseCharactersPage from "../app/zh/characters/page";
import ChineseAdelinePage from "../app/zh/characters/adeline/page";

describe("portal pages", () => {
  it("presents the supplied English game overview and official resources", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Fields of Mistria", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Released Aug 5, 2026")).toBeInTheDocument();
    expect(screen.getByText("Latest Patch v1.0.4")).toBeInTheDocument();
    expect(screen.getByText(/essential controls, stamina management/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What is Fields of Mistria?" }),
    ).toBeInTheDocument();
    const resources = screen.getByRole("region", { name: "Official & Community" });
    expect(within(resources).getByRole("link", { name: "Official Website" })).toHaveAttribute(
      "href",
      "https://www.fieldsofmistria.com/",
    );
    expect(within(resources).getByRole("link", { name: "Play on Steam" })).toHaveAttribute(
      "href",
      "https://store.steampowered.com/app/2142790/Fields_of_Mistria/",
    );
    expect(screen.getByText(/independent fan-made guide website/i)).toBeInTheDocument();
  });

  it("presents a localized Chinese overview and labels the Discord as unofficial", () => {
    render(<ChineseHomePage />);

    expect(
      screen.getByRole("heading", { name: "Fields of Mistria", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("2026 年 8 月 5 日正式发布")).toBeInTheDocument();
    expect(screen.getByText(/基础操作、体力管理和每日优先事项/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fields of Mistria 是什么？" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "非官方 Discord 社区" }),
    ).toHaveAttribute("href", "https://discord.com/invite/unofficial-fom");
    expect(screen.getByText(/并非 NPC Studio 官方网站/)).toBeInTheDocument();
  });

  it("links the home portal to the character directory", () => {
    render(<HomePage />);
    const characterPanel = screen.getByRole("region", {
      name: "Characters",
    });

    expect(
      within(characterPanel).getByRole("link", { name: /Characters/i }),
    ).toHaveAttribute("href", "/characters");
  });

  it("groups Adeline under romanceable characters", async () => {
    render(await CharactersPage());
    expect(
      screen.getByRole("heading", { name: "Romanceable Characters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Adeline/i })).toHaveAttribute(
      "href",
      "/characters/adeline",
    );
  });

  it("uses locale-correct Chinese routes", async () => {
    render(<ChineseHomePage />);
    const characterPanel = screen.getByRole("region", { name: "角色" });
    expect(
      within(characterPanel).getByRole("link", { name: "浏览角色" }),
    ).toHaveAttribute("href", "/zh/characters");

    render(await ChineseCharactersPage());
    expect(screen.getByRole("link", { name: /阿德琳/ })).toHaveAttribute(
      "href",
      "/zh/characters/adeline",
    );
  });

  it("renders planned characters as cards without broken links", async () => {
    render(await CharactersPage());
    const eilandCard = screen.getByRole("article", { name: "Eiland" });

    expect(within(eilandCard).queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders the Adeline infobox and article sections", async () => {
    render(await AdelinePage());
    expect(
      screen.getByRole("heading", { name: "Adeline", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Winter 18")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gifts" })).toBeInTheDocument();
  });

  it("renders the localized Chinese Adeline route", async () => {
    render(await ChineseAdelinePage());
    expect(
      screen.getByRole("heading", { name: "阿德琳", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "礼物" })).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "面包屑" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "相关导航" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "目录" }),
    ).toBeInTheDocument();
  });

  it("shows an English notice after a missing-translation fallback", async () => {
    render(
      await CharactersPage({
        searchParams: Promise.resolve({ translation: "fallback" }),
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "This page is not available in English yet. Showing the character directory instead.",
    );
  });

  it("shows a Chinese notice after a missing-translation fallback", async () => {
    render(
      await ChineseCharactersPage({
        searchParams: Promise.resolve({ translation: "fallback" }),
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "此页面暂未提供简体中文版本，已为你显示角色目录。",
    );
  });

  it("renders branded recovery links for unknown pages", () => {
    render(<NotFound />);
    const recoveryLinks = screen.getByRole("navigation", {
      name: "Recovery links",
    });

    expect(
      within(recoveryLinks).getByRole("link", { name: /Characters/i }),
    ).toHaveAttribute("href", "/characters");
  });
});
