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
    <div className="wiki-page" lang={locale === "zh" ? "zh-CN" : "en"}>
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
          <nav aria-label={copy.primaryNavigation} className="wiki-primary-nav">
            <a href={localizePath("/", locale)}>{copy.home}</a>
            <a href={localizePath("/characters", locale)}>{copy.characters}</a>
          </nav>
          <WikiSearch locale={locale} />
        </div>
      </header>
      <main className="wiki-content">{children}</main>
      <footer className="wiki-footer">
        <div className="wiki-footer-about">
          <strong>Fields of Mistria Wiki</strong>
          <p>{copy.footerAbout}</p>
          <p>{copy.footerDescription}</p>
        </div>
        <nav aria-label={copy.communityReference} className="wiki-footer-links">
          <strong>{copy.communityReference}</strong>
          <a href="https://www.fieldsofmistria.com/">{copy.officialWebsite}</a>
          <a href="https://store.steampowered.com/app/2142790/Fields_of_Mistria/">Steam</a>
          <a href="https://www.youtube.com/@fieldsofmistria">YouTube</a>
          <a href="https://steamcommunity.com/app/2142790">{copy.steamCommunity}</a>
        </nav>
      </footer>
    </div>
  );
}
