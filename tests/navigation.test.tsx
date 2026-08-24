import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WikiShell } from "../components/wiki-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/characters/adeline",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("wiki navigation", () => {
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
});
