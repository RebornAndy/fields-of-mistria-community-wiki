# Fields of Mistria Community Wiki

A locally authored, bilingual community wiki for *Fields of Mistria*. English
is the default language and Simplified Chinese pages live under `/zh`.

## Routes

The first release contains six complete routes:

- `/` — English portal
- `/characters` — English character directory
- `/characters/adeline` — English Adeline article
- `/zh` — Simplified Chinese portal
- `/zh/characters` — Simplified Chinese character directory
- `/zh/characters/adeline` — Simplified Chinese Adeline article

The language switcher keeps visitors on the equivalent page when a translation
exists. Missing translations fall back to the target language's character
directory with a localized notice.

## Content and project layout

- `app/` contains the six routes, root metadata, and global styles.
- `components/` contains the shared wiki shell, navigation, directory, search,
  fallback notice, and article layouts.
- `content/en/` and `content/zh/` contain local MDX article bodies.
- `lib/` contains locale dictionaries, character data, content loading, and MDX
  heading extraction.
- `public/images/` contains the original local character artwork and attribution
  notes.
- `tests/` contains component, content, accessibility, identity, and rendered
  worker coverage.

## Requirements

- Node.js 22.13.0 or newer
- Windows PowerShell or another command shell

## Windows commands

Use `npm.cmd` in PowerShell so the commands work even when local script
execution policy blocks `npm.ps1`.

```powershell
npm.cmd install
npm.cmd run dev
```

The development server runs until you stop it with `Ctrl+C`. In a second
PowerShell window, run the checks independently:

```powershell
npm.cmd test -- --run
npm.cmd run lint
npm.cmd run build
node --test tests/rendered-html.test.mjs
```

`npm.cmd run test:rendered` is also available when a fresh production build and
the rendered-worker suite should run together.

## Production shape

`npm.cmd run build` creates the vinext/Cloudflare Worker output in `dist/`.
This repository does not require a database for the current read-only wiki and
does not include deployment as part of the local verification workflow.
