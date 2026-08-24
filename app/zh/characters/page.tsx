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
        <p>
          浏览影响米斯特里亚生活的全部 34 位居民、访客、动物与非凡存在。
          周六市场商贩的库存可能随市场开放与游戏进度轮换。
        </p>
      </header>
      <CharacterGrid locale="zh" characters={getCharacters("zh")} />
    </WikiShell>
  );
}
