export type Locale = "en" | "zh";

export type UiDictionary = {
  home: string;
  characters: string;
  search: string;
  searchAction: string;
  noResults: string;
  language: string;
  primaryNavigation: string;
  searchLandmark: string;
  communityReference: string;
  breadcrumb: string;
  contents: string;
  relatedNavigation: string;
  translationFallback: string;
};

const dictionaries: Record<Locale, UiDictionary> = {
  en: {
    home: "Home",
    characters: "Characters",
    search: "Search the wiki",
    searchAction: "Search",
    noResults: "No matching page found.",
    language: "Language",
    primaryNavigation: "Primary navigation",
    searchLandmark: "Search",
    communityReference: "Community reference",
    breadcrumb: "Breadcrumb",
    contents: "Contents",
    relatedNavigation: "Related navigation",
    translationFallback:
      "This page is not available in English yet. Showing the character directory instead.",
  },
  zh: {
    home: "首页",
    characters: "角色",
    search: "搜索 Wiki",
    searchAction: "搜索",
    noResults: "没有找到匹配页面。",
    language: "语言",
    primaryNavigation: "主导航",
    searchLandmark: "搜索",
    communityReference: "社区参考资料",
    breadcrumb: "面包屑",
    contents: "目录",
    relatedNavigation: "相关导航",
    translationFallback: "此页面暂未提供简体中文版本，已为你显示角色目录。",
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
