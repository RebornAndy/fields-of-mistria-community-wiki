import { CharacterGrid } from "../../../components/character-grid";
import { WikiShell } from "../../../components/wiki-shell";
import { TranslationFallbackNotice } from "../../../components/translation-fallback-notice";
import { getCharacters } from "../../../lib/characters";

type ChineseCharactersPageProps = {
  searchParams?: Promise<{ translation?: string | string[] }>;
};

export default async function ChineseCharactersPage({
  searchParams,
}: ChineseCharactersPageProps = {}) {
  const translation = (await searchParams)?.translation;
  const hasTranslationFallback = translation === "fallback";

  return (
    <WikiShell locale="zh">
      {hasTranslationFallback ? (
        <TranslationFallbackNotice locale="zh" />
      ) : null}
      <header className="directory-intro">
        <p className="page-kicker">米斯特里亚的居民</p>
        <h1>角色</h1>
        <p>认识生活在米斯特里亚的居民、访客与非凡存在。</p>
      </header>
      <CharacterGrid locale="zh" characters={getCharacters("zh")} />
    </WikiShell>
  );
}
