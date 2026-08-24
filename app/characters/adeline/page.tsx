import { ArticleLayout } from "../../../components/article-layout";
import { WikiShell } from "../../../components/wiki-shell";
import { getCharacter } from "../../../lib/characters";
import { loadCharacterArticle } from "../../../lib/content";

export default async function AdelinePage() {
  const article = await loadCharacterArticle("en", "adeline");
  const character = getCharacter("en", "adeline");

  if (!character) {
    throw new Error("Missing character data for en/adeline");
  }

  const content = await ArticleLayout({
    locale: "en",
    article,
    character,
  });

  return <WikiShell locale="en">{content}</WikiShell>;
}
