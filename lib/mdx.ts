export type ArticleHeading = {
  id: string;
  label: string;
};

const headingPattern = /^##\s+(.+?)\s+\{#([a-z0-9-]+)\}\s*$/gm;

export function extractArticleHeadings(source: string) {
  const headings: ArticleHeading[] = [];

  for (const match of source.matchAll(headingPattern)) {
    headings.push({ id: match[2], label: match[1] });
  }

  return headings;
}

function escapeMdxText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

export function compileArticleMdxSource(source: string) {
  return source.replace(
    headingPattern,
    (_heading, label: string, id: string) =>
      `<h2 id="${id}">${escapeMdxText(label)}</h2>`,
  );
}
