import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WikiShell } from "../components/wiki-shell";

const navigation = vi.hoisted(() => ({
  pathname: "/characters/adeline",
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: navigation.push }),
}));

describe("wiki navigation", () => {
  beforeEach(() => {
    navigation.pathname = "/characters/adeline";
    navigation.push.mockReset();
  });

  it("keeps the current article when switching to Chinese", () => {
    render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute(
      "href",
      "/zh/characters/adeline",
    );
  });

  it("keeps the current article when switching from Chinese to English", () => {
    navigation.pathname = "/zh/characters/adeline";

    render(
      <WikiShell locale="zh">
        <p>Article</p>
      </WikiShell>,
    );

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/characters/adeline",
    );
  });

  it("exposes search with an accessible label", () => {
    render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    expect(
      screen.getByRole("searchbox", { name: "Search the wiki" }),
    ).toBeInTheDocument();
  });

  it("localizes the Chinese search submit action", () => {
    render(
      <WikiShell locale="zh">
        <p>Article</p>
      </WikiShell>,
    );

    expect(
      screen.getByRole("button", { name: "\u641c\u7d22" }),
    ).toBeInTheDocument();
  });

  it("shows an inline no-results state for an unknown search", () => {
    render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "not-a-wiki-page" },
    });
    fireEvent.submit(screen.getByRole("searchbox").closest("form")!);

    expect(screen.getByText("No matching page found.")).toBeInTheDocument();
  });

  it("navigates to the localized known article after submitting a search", () => {
    render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    const searchbox = screen.getByRole("searchbox", {
      name: "Search the wiki",
    });
    fireEvent.change(searchbox, { target: { value: "Adeline" } });
    fireEvent.submit(searchbox.closest("form")!);

    expect(navigation.push).toHaveBeenCalledWith("/characters/adeline");
  });
});
