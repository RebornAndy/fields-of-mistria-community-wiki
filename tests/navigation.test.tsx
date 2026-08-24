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

  it("marks each localized wiki content scope with its document language", () => {
    const { rerender } = render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    expect(screen.getByText("Article").closest(".wiki-page")).toHaveAttribute(
      "lang",
      "en",
    );

    rerender(
      <WikiShell locale="zh">
        <p>文章</p>
      </WikiShell>,
    );

    expect(screen.getByText("文章").closest(".wiki-page")).toHaveAttribute(
      "lang",
      "zh-CN",
    );
  });

  it("marks an unavailable translation when falling back to its directory", () => {
    navigation.pathname = "/locations/mistria";

    const { rerender } = render(
      <WikiShell locale="en">
        <p>Article</p>
      </WikiShell>,
    );

    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute(
      "href",
      "/zh/characters?translation=fallback",
    );

    navigation.pathname = "/zh/locations/mistria";
    rerender(
      <WikiShell locale="zh">
        <p>文章</p>
      </WikiShell>,
    );

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/characters?translation=fallback",
    );
  });

  it("localizes Chinese shell landmark labels and footer copy", () => {
    render(
      <WikiShell locale="zh">
        <p>文章</p>
      </WikiShell>,
    );

    expect(
      screen.getByRole("navigation", { name: "主导航" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("search")).toHaveAttribute("aria-label", "搜索");
    expect(screen.getByText("社区参考资料")).toBeInTheDocument();
    expect(screen.queryByText("Community reference")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "官方网站" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Steam 社区" })).toBeInTheDocument();
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
