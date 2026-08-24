import type { Locale } from "./i18n";

export type CharacterCategory =
  | "romanceable"
  | "non-romanceable"
  | "market-vendor"
  | "special";

export type CharacterRecord = {
  slug: string;
  locale: Locale;
  name: string;
  role: string;
  category: CharacterCategory;
  portrait: string;
  birthday: string;
  occupation: string;
  residence: string;
  relationshipStatus: string;
};

const characters: CharacterRecord[] = [
  {
    slug: "adeline",
    locale: "en",
    name: "Adeline",
    role: "Town Reeve",
    category: "romanceable",
    portrait: "/images/characters/adeline.webp",
    birthday: "Winter 18",
    occupation: "Town Reeve",
    residence: "Mistria Manor",
    relationshipStatus: "Romanceable",
  },
  {
    slug: "eiland",
    locale: "en",
    name: "Eiland",
    role: "Museum curator",
    category: "non-romanceable",
    portrait: "/images/characters/eiland.webp",
    birthday: "Spring 15",
    occupation: "Museum curator",
    residence: "Mistria Museum",
    relationshipStatus: "Not romanceable",
  },
  {
    slug: "balor",
    locale: "en",
    name: "Balor",
    role: "Saturday market vendor",
    category: "market-vendor",
    portrait: "/images/characters/balor.webp",
    birthday: "Summer 7",
    occupation: "Merchant",
    residence: "Traveling caravan",
    relationshipStatus: "Not romanceable",
  },
  {
    slug: "caldarus",
    locale: "en",
    name: "Caldarus",
    role: "Guardian dragon",
    category: "special",
    portrait: "/images/characters/caldarus.webp",
    birthday: "Unknown",
    occupation: "Guardian of Mistria",
    residence: "The eastern woods",
    relationshipStatus: "Special character",
  },
  {
    slug: "adeline",
    locale: "zh",
    name: "阿德琳",
    role: "小镇镇长",
    category: "romanceable",
    portrait: "/images/characters/adeline.webp",
    birthday: "冬季 18 日",
    occupation: "小镇镇长",
    residence: "米斯特里亚庄园",
    relationshipStatus: "可恋爱",
  },
  {
    slug: "eiland",
    locale: "zh",
    name: "艾兰德",
    role: "博物馆馆长",
    category: "non-romanceable",
    portrait: "/images/characters/eiland.webp",
    birthday: "春季 15 日",
    occupation: "博物馆馆长",
    residence: "米斯特里亚博物馆",
    relationshipStatus: "不可恋爱",
  },
  {
    slug: "balor",
    locale: "zh",
    name: "巴洛尔",
    role: "周六市场商贩",
    category: "market-vendor",
    portrait: "/images/characters/balor.webp",
    birthday: "夏季 7 日",
    occupation: "商人",
    residence: "旅行商队",
    relationshipStatus: "不可恋爱",
  },
  {
    slug: "caldarus",
    locale: "zh",
    name: "卡尔达鲁斯",
    role: "守护巨龙",
    category: "special",
    portrait: "/images/characters/caldarus.webp",
    birthday: "未知",
    occupation: "米斯特里亚的守护者",
    residence: "东部森林",
    relationshipStatus: "特殊角色",
  },
];

export function getCharacters(locale: Locale): CharacterRecord[] {
  return characters.filter((character) => character.locale === locale);
}

export function getCharacter(
  locale: Locale,
  slug: string,
): CharacterRecord | null {
  return (
    characters.find(
      (character) => character.locale === locale && character.slug === slug,
    ) ?? null
  );
}
