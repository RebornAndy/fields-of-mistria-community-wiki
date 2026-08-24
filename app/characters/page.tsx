import { CharacterGrid } from "../../components/character-grid";
import { WikiShell } from "../../components/wiki-shell";
import { getCharacters } from "../../lib/characters";

export default function CharactersPage() {
  return (
    <WikiShell locale="en">
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
