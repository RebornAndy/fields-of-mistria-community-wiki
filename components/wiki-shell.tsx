import type { ReactNode } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { WikiSearch } from "./wiki-search";
import { type Locale, localizePath, ui } from "../lib/i18n";

export function WikiShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const copy = ui(locale);

  return (
    <div className="wiki-page">
      <header className="wiki-chrome">
        <div className="wiki-utility-bar">
          <span>Fields of Mistria Wiki</span>
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="wiki-masthead">
          <a className="wiki-wordmark" href={localizePath("/", locale)}>
            <span>Fields of</span>
            <strong>Mistria</strong>
            <em>Wiki</em>
          </a>
        </div>
        <div className="wiki-navigation-row">
          <nav aria-label="Primary navigation" className="wiki-primary-nav">
            <a href={localizePath("/", locale)}>{copy.home}</a>
            <a href={localizePath("/characters", locale)}>{copy.characters}</a>
          </nav>
          <WikiSearch locale={locale} />
        </div>
      </header>
      <main className="wiki-content">{children}</main>
      <footer className="wiki-footer">
        <span>Fields of Mistria Wiki</span>
        <span>Community reference</span>
      </footer>
    </div>
  );
}
