import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import CharactersPage from "../app/characters/page";
import ChineseHomePage from "../app/zh/page";
import ChineseCharactersPage from "../app/zh/characters/page";

describe("portal pages", () => {
  it("links the home portal to the character directory", () => {
    render(<HomePage />);
    const characterPanel = screen.getByRole("region", {
      name: "Characters",
    });

    expect(
      within(characterPanel).getByRole("link", { name: /Characters/i }),
    ).toHaveAttribute("href", "/characters");
  });

  it("groups Adeline under romanceable characters", () => {
    render(<CharactersPage />);
    expect(
      screen.getByRole("heading", { name: "Romanceable Characters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Adeline/i })).toHaveAttribute(
      "href",
      "/characters/adeline",
    );
  });

  it("uses locale-correct Chinese routes", () => {
    render(<ChineseHomePage />);
    const characterPanel = screen.getByRole("region", { name: "角色" });
    expect(
      within(characterPanel).getByRole("link", { name: "浏览角色" }),
    ).toHaveAttribute("href", "/zh/characters");

    render(<ChineseCharactersPage />);
    expect(screen.getByRole("link", { name: /阿德琳/ })).toHaveAttribute(
      "href",
      "/zh/characters/adeline",
    );
  });

  it("renders planned characters as cards without broken links", () => {
    render(<CharactersPage />);
    const eilandCard = screen.getByRole("article", { name: "Eiland" });

    expect(within(eilandCard).queryByRole("link")).not.toBeInTheDocument();
  });
});
