export type Locale = "en" | "zh";

export type UiDictionary = {
  home: string;
  characters: string;
  search: string;
  searchAction: string;
  noResults: string;
  language: string;
};

const dictionaries: Record<Locale, UiDictionary> = {
  en: {
    home: "Home",
    characters: "Characters",
    search: "Search the wiki",
    searchAction: "Search",
    noResults: "No matching page found.",
    language: "Language",
  },
  zh: {
    home: "首页",
    characters: "角色",
    search: "搜索 Wiki",
    searchAction: "搜索",
    noResults: "没有找到匹配页面。",
    language: "语言",
  },
};

const removeLocale = (path: string) =>
  path.replace(/^\/zh(?=\/|$)/, "") || "/";

export function localizePath(path: string, locale: Locale) {
  const base = removeLocale(path);
  return locale === "zh" ? (base === "/" ? "/zh" : `/zh${base}`) : base;
}

export function switchLocalePath(path: string, locale: Locale) {
  return localizePath(path, locale);
}

export function ui(locale: Locale) {
  return dictionaries[locale];
}
