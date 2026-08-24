import { CharacterGrid } from "../../components/character-grid";
import { WikiShell } from "../../components/wiki-shell";
import { TranslationFallbackNotice } from "../../components/translation-fallback-notice";
import { getCharacters } from "../../lib/characters";

type CharactersPageProps = {
  searchParams?: Promise<{ translation?: string | string[] }>;
};

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps = {}) {
  const translation = (await searchParams)?.translation;
  const hasTranslationFallback = translation === "fallback";

  return (
    <WikiShell locale="en">
      {hasTranslationFallback ? (
        <TranslationFallbackNotice locale="en" />
      ) : null}
      <header className="directory-intro">
        <p className="page-kicker">People of Mistria</p>
        <h1>Characters</h1>
        <p>
          Meet the residents, visitors, and extraordinary beings who shape life
          in Mistria.
        </p>
      </header>
      <CharacterGrid locale="en" characters={getCharacters("en")} />
    </WikiShell>
  );
}
