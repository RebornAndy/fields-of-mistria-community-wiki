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
  footerAbout: string;
  footerDescription: string;
  officialWebsite: string;
  steamCommunity: string;
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
    footerAbout:
      "Fields of Mistria Wiki is an independent fan-made guide website covering farming, fishing, gifts, characters, romance, marriage, mods, and game updates. It is not affiliated with or endorsed by NPC Studio.",
    footerDescription:
      "A magical farming and life-sim RPG with 30+ villagers, 12 marriage candidates, ancient ruins, and 69 Steam achievements.",
    officialWebsite: "Official Website",
    steamCommunity: "Steam Community",
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
    footerAbout:
      "Fields of Mistria Wiki 是独立的玩家制作指南网站，涵盖耕种、钓鱼、礼物、角色、恋爱、婚姻、模组与游戏更新；本站并非 NPC Studio 官方网站，也未获得其背书。",
    footerDescription:
      "一款拥有 30 多位村民、12 位可结婚角色、古代遗迹与 69 项 Steam 成就的魔法农场生活模拟 RPG。",
    officialWebsite: "官方网站",
    steamCommunity: "Steam 社区",
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
