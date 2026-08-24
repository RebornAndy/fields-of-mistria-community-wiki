import { type Locale, ui } from "../lib/i18n";

export function TranslationFallbackNotice({ locale }: { locale: Locale }) {
  return (
    <p className="translation-fallback-notice" role="status">
      {ui(locale).translationFallback}
    </p>
  );
}
