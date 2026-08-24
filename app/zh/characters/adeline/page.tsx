import { ArticleLayout } from "../../../../components/article-layout";
import { WikiShell } from "../../../../components/wiki-shell";
import { getCharacter } from "../../../../lib/characters";
import { loadCharacterArticle } from "../../../../lib/content";

export default async function ChineseAdelinePage() {
  const article = await loadCharacterArticle("zh", "adeline");
  const character = getCharacter("zh", "adeline");

  if (!character) {
    throw new Error("Missing character data for zh/adeline");
  }

  const content = await ArticleLayout({
    locale: "zh",
    article,
    character,
  });

  return <WikiShell locale="zh">{content}</WikiShell>;
}
