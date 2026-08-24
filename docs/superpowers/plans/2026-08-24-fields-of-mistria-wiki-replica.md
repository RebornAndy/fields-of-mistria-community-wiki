# Fields of Mistria Wiki Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a bilingual Fields of Mistria wiki replica with a home portal, character directory, and localized Adeline MDX article.

**Architecture:** A Next.js App Router site uses unprefixed English routes and `/zh` Simplified Chinese routes. Local MDX files provide article bodies while a typed content registry supplies shared character metadata, directory groupings, search, language switching, and static route generation.

**Tech Stack:** Next.js App Router, TypeScript, React, MDX, gray-matter, Zod, Vitest, Testing Library, CSS Modules/global CSS, Sites hosting.

**Spec:** `docs/superpowers/specs/2026-08-24-fields-of-mistria-wiki-replica-design.md`

## Global Constraints

- English is the default locale and uses `/`, `/characters`, and `/characters/adeline`.
- Simplified Chinese uses `/zh`, `/zh/characters`, and `/zh/characters/adeline`.
- The language switcher is in the top-right utility area and preserves the current page.
- The UI follows the reference wiki.gg layout; do not replace it with a marketing-site design.
- Article prose is locally authored MDX and must not bulk-copy the reference wiki.
- Images are stored locally and must not depend on third-party hotlinks in production.
- All visible links resolve, are intentionally non-interactive, or are clearly marked as planned content.
- Interactive controls must be keyboard accessible and retain visible focus styling.
- The final production build and all six required routes must pass before deployment.

## Planned File Structure

- `app/layout.tsx`: global metadata, fonts, and global stylesheet.
- `app/page.tsx`: English home route.
- `app/characters/page.tsx`: English character directory.
- `app/characters/adeline/page.tsx`: English Adeline article.
- `app/zh/page.tsx`: Chinese home route.
- `app/zh/characters/page.tsx`: Chinese character directory.
- `app/zh/characters/adeline/page.tsx`: Chinese Adeline article.
- `app/not-found.tsx`: branded wiki-style 404.
- `app/globals.css`: reference-derived visual system and responsive behavior.
- `components/wiki-shell.tsx`: shared utility bar, masthead, navigation, content shell, and footer.
- `components/language-switcher.tsx`: current-path locale resolution.
- `components/wiki-search.tsx`: known-content client-side search and empty state.
- `components/portal-section.tsx`: home portal panels.
- `components/character-grid.tsx`: grouped character directory cards.
- `components/article-layout.tsx`: breadcrumbs, article body, table of contents, and infobox rail.
- `components/character-infobox.tsx`: character metadata presentation.
- `lib/i18n.ts`: locale types, route maps, and localized UI strings.
- `lib/content.ts`: validated content registry and MDX loading.
- `lib/characters.ts`: localized character metadata and category order.
- `content/en/characters/adeline.mdx`: English article content.
- `content/zh/characters/adeline.mdx`: Chinese article content.
- `public/images/*`: local background, portraits, logo treatment, and social preview.
- `tests/i18n.test.ts`: language-route behavior.
- `tests/content.test.ts`: metadata and MDX validation.
- `tests/navigation.test.tsx`: search, links, and language switching.
- `tests/pages.test.tsx`: home, directory, article, and 404 rendering.

---

### Task 1: Initialize the Site and Implement Locale Routing

**Files:**
- Create/modify: `package.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `lib/i18n.ts`
- Create: `tests/i18n.test.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `type Locale = "en" | "zh"`
- Produces: `localizePath(path: string, locale: Locale): string`
- Produces: `switchLocalePath(path: string, locale: Locale): string`
- Produces: `ui(locale: Locale): UiDictionary`

- [ ] **Step 1: Initialize the Sites-compatible Next.js project**

Run the Sites initializer exactly once in the workspace root, retain its package manager and `.openai/hosting.json`, and keep the development server alive.

- [ ] **Step 2: Add test and content dependencies**

Run:

```powershell
npm install @mdx-js/mdx @mdx-js/react gray-matter zod
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: `package.json` and the existing lockfile include the new packages without replacing the starter's build scripts.

- [ ] **Step 3: Write failing locale tests**

Create `tests/i18n.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { localizePath, switchLocalePath } from "../lib/i18n";

describe("locale routing", () => {
  it("keeps English routes unprefixed", () => {
    expect(localizePath("/characters/adeline", "en")).toBe("/characters/adeline");
  });

  it("prefixes Chinese routes", () => {
    expect(localizePath("/characters/adeline", "zh")).toBe("/zh/characters/adeline");
  });

  it("switches locale while preserving the page", () => {
    expect(switchLocalePath("/characters/adeline", "zh")).toBe("/zh/characters/adeline");
    expect(switchLocalePath("/zh/characters/adeline", "en")).toBe("/characters/adeline");
  });
});
```

- [ ] **Step 4: Run the tests and verify failure**

Run: `npm test -- --run tests/i18n.test.ts`

Expected: FAIL because `lib/i18n.ts` does not exist.

- [ ] **Step 5: Implement locale types, dictionaries, and route helpers**

Create `lib/i18n.ts` with the exact public API:

```ts
export type Locale = "en" | "zh";

export type UiDictionary = {
  home: string;
  characters: string;
  search: string;
  noResults: string;
  language: string;
};

const dictionaries: Record<Locale, UiDictionary> = {
  en: { home: "Home", characters: "Characters", search: "Search the wiki", noResults: "No matching page found.", language: "Language" },
  zh: { home: "首页", characters: "角色", search: "搜索 Wiki", noResults: "没有找到匹配页面。", language: "语言" },
};

const removeLocale = (path: string) => path.replace(/^\/zh(?=\/|$)/, "") || "/";

export function localizePath(path: string, locale: Locale) {
  const base = removeLocale(path);
  return locale === "zh" ? (base === "/" ? "/zh" : `/zh${base}`) : base;
}

export function switchLocalePath(path: string, locale: Locale) {
  return localizePath(path, locale);
}

export function ui(locale: Locale) {
  return dictionaries[locale];
}
```

- [ ] **Step 6: Run locale tests**

Run: `npm test -- --run tests/i18n.test.ts`

Expected: PASS with three passing tests.

- [ ] **Step 7: Replace starter metadata and skeleton**

Update `app/layout.tsx` with Fields of Mistria site metadata and global stylesheet import. Remove `app/_sites-preview`, its imports, the temporary preview metadata marker, and `react-loading-skeleton` when no longer used.

- [ ] **Step 8: Commit the locale foundation**

```powershell
git add package.json package-lock.json app lib tests vitest.config.ts
git commit -m "feat: initialize bilingual wiki foundation"
```

### Task 2: Build the Validated MDX Content Layer

**Files:**
- Create: `lib/characters.ts`
- Create: `lib/content.ts`
- Create: `content/en/characters/adeline.mdx`
- Create: `content/zh/characters/adeline.mdx`
- Create: `tests/content.test.ts`

**Interfaces:**
- Produces: `type CharacterRecord`
- Produces: `getCharacters(locale: Locale): CharacterRecord[]`
- Produces: `getCharacter(locale: Locale, slug: string): CharacterRecord | null`
- Produces: `loadCharacterArticle(locale: Locale, slug: string): Promise<CharacterArticle>`

- [ ] **Step 1: Write failing content tests**

Create `tests/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getCharacter, getCharacters } from "../lib/characters";
import { loadCharacterArticle } from "../lib/content";

describe("character content", () => {
  it("shares Adeline metadata with the directory", () => {
    const adeline = getCharacter("en", "adeline");
    expect(adeline?.category).toBe("romanceable");
    expect(getCharacters("en")).toContainEqual(adeline);
  });

  it("loads localized MDX frontmatter", async () => {
    const article = await loadCharacterArticle("zh", "adeline");
    expect(article.frontmatter.title).toBe("阿德琳");
    expect(article.source).toContain("## 简介");
  });
});
```

- [ ] **Step 2: Run and verify the content tests fail**

Run: `npm test -- --run tests/content.test.ts`

Expected: FAIL because the character registry and article loader do not exist.

- [ ] **Step 3: Implement the typed registry**

In `lib/characters.ts`, define `CharacterRecord` with `slug`, `locale`, `name`, `role`, `category`, `portrait`, `birthday`, `occupation`, `residence`, and `relationshipStatus`. Add localized records for Adeline and enough representative entries to populate every specified directory group. Export `getCharacters` and `getCharacter` using exact locale and slug matching.

- [ ] **Step 4: Author localized MDX articles**

Both MDX files must include validated frontmatter and equivalent sections for profile, gifts, schedule, and related topics. Use concise original prose, heading IDs that can populate the table of contents, and no copied long-form target-wiki passages.

- [ ] **Step 5: Implement the validated loader**

In `lib/content.ts`, use `gray-matter` and Zod to parse files from `content/<locale>/characters/<slug>.mdx`. Return:

```ts
export type CharacterArticle = {
  frontmatter: {
    title: string;
    summary: string;
    slug: string;
    locale: Locale;
  };
  source: string;
};
```

Throw `Invalid frontmatter for <locale>/<slug>` when schema validation fails.

- [ ] **Step 6: Run content tests**

Run: `npm test -- --run tests/content.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit the content layer**

```powershell
git add lib content tests/content.test.ts
git commit -m "feat: add localized MDX character content"
```

### Task 3: Implement the Shared Wiki Shell, Language Switcher, and Search

**Files:**
- Create: `components/wiki-shell.tsx`
- Create: `components/language-switcher.tsx`
- Create: `components/wiki-search.tsx`
- Create: `tests/navigation.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `Locale`, `ui`, `switchLocalePath`, `getCharacters`
- Produces: `WikiShell({ locale, children })`
- Produces: `LanguageSwitcher({ locale })`
- Produces: `WikiSearch({ locale })`

- [ ] **Step 1: Write failing navigation tests**

Create `tests/navigation.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WikiShell } from "../components/wiki-shell";

vi.mock("next/navigation", () => ({ usePathname: () => "/characters/adeline", useRouter: () => ({ push: vi.fn() }) }));

describe("wiki navigation", () => {
  it("renders the Chinese switch for the current article", () => {
    render(<WikiShell locale="en"><p>Article</p></WikiShell>);
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/characters/adeline");
  });

  it("exposes search with an accessible label", () => {
    render(<WikiShell locale="en"><p>Article</p></WikiShell>);
    expect(screen.getByRole("searchbox", { name: "Search the wiki" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run and verify navigation tests fail**

Run: `npm test -- --run tests/navigation.test.tsx`

Expected: FAIL because `WikiShell` does not exist.

- [ ] **Step 3: Implement the shell and navigation components**

Build the utility toolbar, right-aligned language switcher, masthead, horizontal navigation, search, centered content surface, and footer. `LanguageSwitcher` uses `usePathname()` and `switchLocalePath()`. `WikiSearch` indexes only implemented routes and renders the localized no-results message without navigation for unknown terms.

- [ ] **Step 4: Implement the reference-derived global styling**

Define CSS custom properties for the deep green/navy chrome, parchment content surface, berry accents, pale borders, readable body text, and pixel-art-friendly image rendering. Provide explicit `:focus-visible` styles and breakpoints that collapse navigation without horizontal overflow.

- [ ] **Step 5: Run navigation tests**

Run: `npm test -- --run tests/navigation.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the shared shell**

```powershell
git add components app/globals.css tests/navigation.test.tsx
git commit -m "feat: add wiki shell navigation and search"
```

### Task 4: Implement Home and Character Directory Pages

**Files:**
- Create: `components/portal-section.tsx`
- Create: `components/character-grid.tsx`
- Create: `app/page.tsx`
- Create: `app/zh/page.tsx`
- Create: `app/characters/page.tsx`
- Create: `app/zh/characters/page.tsx`
- Create/modify: `tests/pages.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `WikiShell`, `Locale`, `getCharacters`
- Produces: `PortalSection({ title, links })`
- Produces: `CharacterGrid({ locale, characters })`

- [ ] **Step 1: Write failing page tests**

Add to `tests/pages.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import CharactersPage from "../app/characters/page";

describe("portal pages", () => {
  it("links the home portal to the character directory", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /Characters/i })).toHaveAttribute("href", "/characters");
  });

  it("groups Adeline under romanceable characters", () => {
    render(<CharactersPage />);
    expect(screen.getByRole("heading", { name: "Romanceable Characters" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Adeline/i })).toHaveAttribute("href", "/characters/adeline");
  });
});
```

- [ ] **Step 2: Run and verify page tests fail**

Run: `npm test -- --run tests/pages.test.tsx`

Expected: FAIL because the routes and page components are not implemented.

- [ ] **Step 3: Implement localized portal pages**

Create equivalent English and Chinese portal layouts using localized strings and locale-correct links. Include Characters, World, Items, and Gameplay panels; only implemented routes are clickable.

- [ ] **Step 4: Implement localized directory pages**

Group `getCharacters(locale)` by the fixed reference order and render compact portrait cards. Adeline links to the implemented article. Planned characters render as complete cards without broken anchors.

- [ ] **Step 5: Run page tests**

Run: `npm test -- --run tests/pages.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the portal pages**

```powershell
git add app components tests/pages.test.tsx
git commit -m "feat: add bilingual wiki portal and character directory"
```

### Task 5: Implement the Adeline MDX Article and 404 Experience

**Files:**
- Create: `components/article-layout.tsx`
- Create: `components/character-infobox.tsx`
- Create: `app/characters/adeline/page.tsx`
- Create: `app/zh/characters/adeline/page.tsx`
- Create: `app/not-found.tsx`
- Modify: `tests/pages.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `loadCharacterArticle`, `getCharacter`, `WikiShell`
- Produces: `ArticleLayout({ locale, article, character })`
- Produces: `CharacterInfobox({ character })`

- [ ] **Step 1: Write failing article tests**

Add to `tests/pages.test.tsx`:

```tsx
import AdelinePage from "../app/characters/adeline/page";
import NotFound from "../app/not-found";

it("renders the Adeline infobox and article sections", async () => {
  render(await AdelinePage());
  expect(screen.getByRole("heading", { name: "Adeline", level: 1 })).toBeInTheDocument();
  expect(screen.getByText("Winter 18")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Gifts" })).toBeInTheDocument();
});

it("renders branded recovery links for unknown pages", () => {
  render(<NotFound />);
  expect(screen.getByRole("link", { name: /Characters/i })).toHaveAttribute("href", "/characters");
});
```

- [ ] **Step 2: Run and verify article tests fail**

Run: `npm test -- --run tests/pages.test.tsx`

Expected: FAIL because article and 404 components do not exist.

- [ ] **Step 3: Implement MDX rendering and article layout**

Compile the localized MDX source with the installed MDX runtime and render it inside `ArticleLayout`. Generate the visible table of contents from the known article headings. Place the character infobox in the right rail on desktop and before article content on mobile.

- [ ] **Step 4: Implement the branded 404**

Use the same wiki shell, a localized-neutral not-found heading, and working links to `/` and `/characters`.

- [ ] **Step 5: Run all tests**

Run: `npm test -- --run`

Expected: PASS for locale, content, navigation, and page suites.

- [ ] **Step 6: Commit the article flow**

```powershell
git add app components tests/pages.test.tsx
git commit -m "feat: add localized Adeline article and wiki 404"
```

### Task 6: Add Local Visual Assets, Social Preview, and Production Verification

**Files:**
- Create: `public/images/wiki-background.webp`
- Create: `public/images/characters/*.webp`
- Create: `public/og.png`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `.openai/hosting.json` only when the Sites setup requires metadata changes

**Interfaces:**
- Consumes: completed visual palette and final page copy
- Produces: local production-safe imagery and site-specific Open Graph metadata

- [ ] **Step 1: Acquire and validate local visual assets**

Use purposeful, legally usable Fields of Mistria imagery where available and store optimized files locally. Ensure every used image has a stable intrinsic size and appropriate alternative text. Do not ship hotlinks.

- [ ] **Step 2: Generate exactly one site-specific social preview**

Request one landscape social card that matches the final site palette, title treatment, wiki chrome, and pixel-art motif. Inspect it for incorrect or invented text; retry once only if unusable. Save the accepted image as `public/og.png`.

- [ ] **Step 3: Add request-host-derived Open Graph metadata**

Update `app/layout.tsx` so Open Graph and X metadata use the site title, description, and an absolute `/og.png` URL derived from the incoming request host. Omit the image if no valid social card is available.

- [ ] **Step 4: Run the complete test suite**

Run: `npm test -- --run`

Expected: all suites PASS.

- [ ] **Step 5: Run the production build while development preview remains healthy**

Run: `npm run build`

Expected: exit code 0 and all six required routes compile without runtime or MDX errors.

- [ ] **Step 6: Check required route output**

Verify that the build output or route manifest contains `/`, `/characters`, `/characters/adeline`, `/zh`, `/zh/characters`, and `/zh/characters/adeline`. Confirm no starter preview module or metadata remains.

- [ ] **Step 7: Commit production readiness**

```powershell
git add app public .openai package.json package-lock.json
git commit -m "feat: finalize wiki visuals and production metadata"
```

- [ ] **Step 8: Publish through Sites**

Push the exact committed source state, save a Sites version from that commit, deploy the saved version, inspect deployment status until terminal, and return the production URL as the primary deliverable.

## Plan Self-Review

- Spec coverage: all routes, language behavior, visual shell, MDX content, directory, article, search, 404, accessibility, responsive layout, local imagery, build, and deployment are assigned to tasks.
- Placeholder scan: every implementation step and public interface is concrete.
- Type consistency: `Locale`, `CharacterRecord`, `CharacterArticle`, `getCharacters`, `getCharacter`, `loadCharacterArticle`, `localizePath`, and `switchLocalePath` are introduced before consumption and retain the same names throughout.
