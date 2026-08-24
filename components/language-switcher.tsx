"use client";

import { usePathname } from "next/navigation";
import { type Locale, switchLocalePath, ui } from "../lib/i18n";

const implementedPages = new Set(["/", "/characters", "/characters/adeline"]);

function pagePathForLocale(pathname: string | null, locale: Locale) {
  const currentPath = pathname ?? "/";
  const unlocalizedPath = currentPath.replace(/^\/zh(?=\/|$)/, "") || "/";
  const hasTranslation = implementedPages.has(unlocalizedPath);
  const destination = hasTranslation ? unlocalizedPath : "/characters";
  const localizedDestination = switchLocalePath(destination, locale);

  return hasTranslation
    ? localizedDestination
    : `${localizedDestination}?translation=fallback`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "zh" : "en";
  const targetLabel = targetLocale === "zh" ? "中文" : "English";

  return (
    <nav aria-label={ui(locale).language} className="language-switcher">
      <a href={pagePathForLocale(pathname, targetLocale)}>{targetLabel}</a>
    </nav>
  );
}
