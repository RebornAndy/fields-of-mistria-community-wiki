import { CharacterGrid } from "../../../components/character-grid";
import { WikiShell } from "../../../components/wiki-shell";
import { getCharacters } from "../../../lib/characters";

export default function ChineseCharactersPage() {
  return (
    <WikiShell locale="zh">
      <header className="directory-intro">
        <p className="page-kicker">米斯特里亚的居民</p>
        <h1>角色</h1>
        <p>认识生活在米斯特里亚的居民、访客与非凡存在。</p>
      </header>
      <CharacterGrid locale="zh" characters={getCharacters("zh")} />
    </WikiShell>
  );
}
