import type { ComponentType } from "react";
import EnglishAdelineContent from "../content/en/characters/adeline.mdx";
import ChineseAdelineContent from "../content/zh/characters/adeline.mdx";
import type { CharacterRecord } from "../lib/characters";
import type { CharacterArticle } from "../lib/content";
import { type Locale, localizePath } from "../lib/i18n";
import { extractArticleHeadings } from "../lib/mdx";
import { CharacterInfobox } from "./character-infobox";

const articleCopy = {
  en: {
    home: "Home",
    characters: "Characters",
    contents: "Contents",
    relatedNavigation: "Related navigation",
    gifts: "Gifts",
    heartEvents: "Heart Events",
    schedule: "Schedule",
    relationships: "Relationships",
    allCharacters: "All characters",
    planned: "Planned",
  },
  zh: {
    home: "首页",
    characters: "角色",
    contents: "目录",
    relatedNavigation: "相关导航",
    gifts: "礼物",
    heartEvents: "好感事件",
    schedule: "日程",
    relationships: "人际关系",
    allCharacters: "全部角色",
    planned: "计划中",
  },
} as const;

const articleComponents: Record<
  Locale,
  Record<string, ComponentType>
> = {
  en: { adeline: EnglishAdelineContent },
  zh: { adeline: ChineseAdelineContent },
};

function RelatedNavigation({ locale }: { locale: Locale }) {
  const copy = articleCopy[locale];

  return (
    <nav className="article-related" aria-label={copy.relatedNavigation}>
      <h2>{copy.relatedNavigation}</h2>
      <ul>
        <li className="article-related-planned">
          <a href="#gifts">{copy.gifts}</a>
        </li>
        <li className="article-related-planned">
          <span>{copy.heartEvents}</span>
          <small>{copy.planned}</small>
        </li>
        <li>
          <a href="#schedule">{copy.schedule}</a>
        </li>
        <li>
          <span>{copy.relationships}</span>
          <small>{copy.planned}</small>
        </li>
        <li>
          <a href={localizePath("/characters", locale)}>
            {copy.allCharacters}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export async function ArticleLayout({
  locale,
  article,
  character,
}: {
  locale: Locale;
  article: CharacterArticle;
  character: CharacterRecord;
}) {
  const copy = articleCopy[locale];
  const headings = extractArticleHeadings(article.source);
  const MdxContent = articleComponents[locale][article.frontmatter.slug];

  if (!MdxContent) {
    throw new Error(
      `Missing compiled MDX component for ${locale}/${article.frontmatter.slug}`,
    );
  }

  return (
    <article className="character-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <a href={localizePath("/", locale)}>{copy.home}</a>
          </li>
          <li>
            <a href={localizePath("/characters", locale)}>
              {copy.characters}
            </a>
          </li>
          <li aria-current="page">{article.frontmatter.title}</li>
        </ol>
      </nav>

      <header className="article-header">
        <p className="page-kicker">{character.role}</p>
        <h1>{article.frontmatter.title}</h1>
        <p>{article.frontmatter.summary}</p>
      </header>

      <div className="article-grid">
        <aside className="article-rail">
          <CharacterInfobox character={character} />
          <RelatedNavigation locale={locale} />
        </aside>

        <div className="article-main">
          <nav className="article-toc" aria-label={copy.contents}>
            <h2>{copy.contents}</h2>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="article-body">
            <MdxContent />
          </div>
        </div>
      </div>
    </article>
  );
}
