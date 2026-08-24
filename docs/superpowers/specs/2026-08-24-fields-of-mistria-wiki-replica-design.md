# Fields of Mistria Wiki Replica - Design Specification

Date: 2026-08-24

## 1. Objective

Build a deployable Fields of Mistria reference wiki using Next.js, localized MDX content, and a UI layout that closely follows the current Fields of Mistria wiki.gg site. The first release must provide a complete navigation flow across a home page, a character directory, and an Adeline article in English and Simplified Chinese.

The replica is a focused first release, not a full MediaWiki implementation. It reproduces the target site's visual hierarchy and browsing experience while keeping content locally maintained and deployable without dependence on the target wiki at runtime.

## 2. Supported Languages and Routes

English is the default language and uses unprefixed routes:

- `/`
- `/characters`
- `/characters/adeline`

Simplified Chinese uses the `/zh` prefix:

- `/zh`
- `/zh/characters`
- `/zh/characters/adeline`

The language switcher appears at the top right. Switching languages preserves the current page when a translation exists. If a translated article is unavailable, the visitor is sent to the equivalent language's character directory and shown a short fallback notice.

## 3. Visual Direction

The UI must follow the reference wiki rather than introducing a separate product design.

Shared visual structure:

- Pixel-art game background surrounding a centered wiki page shell.
- Compact utility toolbar at the top.
- Game masthead and logo area.
- Horizontal primary navigation and search field.
- Light, readable main content surface with wiki-style borders and spacing.
- Wiki article typography, link treatment, headings, tables, panels, and footer.
- English/Simplified Chinese switcher added to the top-right utility area without changing the surrounding layout.

Desktop preserves the reference site's multi-column proportions. Mobile follows the same visual language while collapsing navigation and stacking the article infobox ahead of the main article where necessary.

## 4. Page Designs

### 4.1 Home Page

The home page is a wiki portal, not a marketing landing page. It contains grouped navigation panels for major knowledge areas such as Characters, World, Items, and Gameplay. The first viewport must immediately communicate that this is the Fields of Mistria knowledge hub and expose the character directory as a primary path.

### 4.2 Character Directory

The character directory follows the reference page's grouped catalog structure. Initial groups include:

- Romanceable Characters
- Non-Romanceable Characters
- Saturday Market Vendors
- Special Characters

Each entry appears as a compact portrait card with a character name and short role label. Adeline is fully linked to the implemented detail page. Other initial cards may be representative directory content but must be visually complete and must not lead to broken routes.

### 4.3 Adeline Article

The Adeline page follows a conventional wiki article structure:

- Breadcrumbs and article title.
- Short introduction.
- Article table of contents.
- Main article sections.
- Character infobox with portrait, birthday, occupation, residence, and relationship status.
- Related navigation for Gifts, Heart Events, Schedule, Relationships, and similar topics.
- Article sections for profile, gifts, schedule, and related information.

The English and Chinese articles use the same layout and metadata schema but separate localized MDX bodies.

## 5. Technical Architecture

Use Next.js with the App Router and TypeScript. Locale-aware routing is centralized so English remains unprefixed while Simplified Chinese is exposed under `/zh`.

The project uses local MDX as the source of article content. Content is organized by locale and type, for example:

- `content/en/characters/adeline.mdx`
- `content/zh/characters/adeline.mdx`

Frontmatter stores structured metadata including:

- Title and summary.
- Slug and locale.
- Character category and sort order.
- Portrait or image path.
- Birthday, occupation, residence, and relationship status.

The MDX body stores localized article prose and section content. A shared content index supplies the character directory, article infobox, related navigation, and static route generation so repeated facts remain consistent.

## 6. Component Boundaries

Shared components have narrow responsibilities:

- `WikiShell`: background, centered page shell, and global structure.
- `UtilityBar`: compact global actions and language switcher placement.
- `WikiHeader`: logo, primary navigation, and search presentation.
- `LanguageSwitcher`: locale route resolution and fallback behavior.
- `PortalSection`: home-page navigation group.
- `CharacterGrid` and `CharacterCard`: categorized character directory.
- `ArticleLayout`: article title, body column, table of contents, and supporting rail.
- `CharacterInfobox`: structured character metadata.
- MDX components: reference-styled headings, tables, notices, image blocks, and related links.

Components read prepared data and do not contain duplicated localized strings or character facts.

## 7. Content and Asset Policy

The first release includes complete, useful sample content in both supported languages. It does not bulk-copy the reference wiki's article text. Copy is concise and locally authored while following the same information architecture.

Visual assets must support the target site's recognizable pixel-art presentation. Existing suitable and legally usable assets are preferred. Images are stored locally so production rendering does not depend on third-party hotlinks. Missing optional images use a fixed-size styled placeholder to prevent layout shifts.

## 8. Navigation and Search

Primary navigation links connect the home page, character directory, and implemented Adeline article. All visible links must either resolve to an implemented page, behave as an intentionally non-linking label, or be clearly marked as planned content; no card or navigation item may lead to an unexplained 404.

The search field reproduces the reference layout in the first release. It provides client-side navigation for known content and a no-results state for unknown queries; it does not require an external search service.

## 9. Error Handling

- Unknown routes render a branded wiki-style 404 page with links back to the home page and character directory.
- Missing locale content triggers the documented locale fallback rather than a blank article.
- Invalid or incomplete frontmatter fails the build with an actionable error.
- Missing optional images render the stable placeholder.
- Search with no matching entry shows an inline empty state without leaving the current site shell.

## 10. Accessibility and Responsive Behavior

- All navigation, language switching, search, and interactive controls are keyboard accessible.
- Interactive controls have visible focus styles and accessible names.
- Images include meaningful alternative text or are marked decorative.
- Heading order reflects the article hierarchy.
- Text and link colors maintain readable contrast over the content surface.
- Desktop, tablet, and mobile layouts retain the target site's hierarchy without horizontal overflow.

## 11. Verification and Acceptance Criteria

The release is accepted when:

1. All six required locale routes build and render successfully.
2. English is the default and the language switcher appears at the top right.
3. Language switching preserves the current page for all three implemented page types.
4. Home, character directory, and Adeline article visibly follow the target wiki's layout and component hierarchy.
5. Adeline content is sourced from localized MDX files.
6. The directory and infobox derive repeated character data from one structured content source.
7. Internal navigation and known-content search do not produce broken links.
8. The site works at desktop and mobile widths without content overflow.
9. Keyboard navigation and focus states are usable.
10. The production build completes successfully and the deployed site loads without runtime errors.

## 12. Explicitly Out of Scope for the First Release

- Full MediaWiki compatibility.
- Wiki editing, accounts, discussion pages, revision history, or community tools.
- Runtime synchronization with wiki.gg.
- More than English and Simplified Chinese.
- A complete mirror of every Fields of Mistria article.
- A custom visual redesign that departs from the reference site's layout.
