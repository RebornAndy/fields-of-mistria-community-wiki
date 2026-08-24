import { PortalSection, type PortalLink } from "./portal-section";
import type { Locale } from "../lib/i18n";

type HomeCopy = {
  eyebrow: string;
  description: string;
  stats: string[];
  sections: { title: string; links: PortalLink[] }[];
  aboutTitle: string;
  about: string[];
  facts: { label: string; value: string }[];
  closingTitle: string;
  closingDescription: string;
  characterAction: string;
  steamAction: string;
};

const officialLinks = {
  website: "https://www.fieldsofmistria.com/",
  steam: "https://store.steampowered.com/app/2142790/Fields_of_Mistria/",
  youtube: "https://www.youtube.com/@fieldsofmistria",
  trailer: "https://www.youtube.com/watch?v=utHOieev6Pk",
  reddit: "https://www.reddit.com/r/FieldsOfMistriaGame/",
  discord: "https://discord.com/invite/unofficial-fom",
  steamCommunity: "https://steamcommunity.com/app/2142790",
} as const;

const copy: Record<Locale, HomeCopy> = {
  en: {
    eyebrow: "Fan-Made Community Guide",
    description:
      "Build your dream farm, restore the town of Mistria, and uncover a world filled with magic, romance, fishing, mining, crafting, and ancient ruins. Find practical guidance for your first season, favorite characters, farm progression, relationships, and the latest updates.",
    stats: [
      "Released Aug 5, 2026",
      "Latest Patch v1.0.4",
      "97% Positive Reviews",
      "39,233 Peak CCU",
    ],
    sections: [
      {
        title: "Characters",
        links: [
          {
            label: "Browse characters",
            href: "/characters",
            description: "Find birthdays, gift preferences, roles, and schedules.",
          },
          { label: "Romanceable characters" },
          { label: "Townsfolk" },
        ],
      },
      {
        title: "Start Here",
        links: [
          {
            label: "Beginner Guide",
            description:
              "Learn the essential controls, stamina management, daily priorities, early quests, tools, storage, and a strong route through your first week.",
          },
          {
            label: "First Farm Setup",
            description:
              "Plan crop fields, profitable seasonal activities, animals, and storage without wasting early resources.",
          },
          {
            label: "Gifts & Relationships",
            href: "/characters",
            description:
              "Check loved gifts, birthdays, schedules, heart events, and romance candidates.",
          },
          {
            label: "Fishing, Mining & Magic",
            description:
              "Track catches, mine progress, valuable materials, spells, and ancient ruins.",
          },
        ],
      },
      {
        title: "Explore Mistria",
        links: [
          { label: "World & Locations" },
          { label: "Farming & Animals" },
          { label: "Fish, Crops & Artifacts" },
          { label: "Quests, Skills & Magic" },
        ],
      },
      {
        title: "Official & Community",
        links: [
          { label: "Official Website", href: officialLinks.website },
          { label: "Play on Steam", href: officialLinks.steam },
          { label: "Official YouTube", href: officialLinks.youtube },
          { label: "Official 1.0 Trailer", href: officialLinks.trailer },
          { label: "Reddit Community", href: officialLinks.reddit },
          {
            label: "Unofficial Discord Community",
            href: officialLinks.discord,
            description:
              "A large player-run community; there is currently no developer-operated official Discord.",
          },
          { label: "Steam Community Hub", href: officialLinks.steamCommunity },
        ],
      },
    ],
    aboutTitle: "What is Fields of Mistria?",
    about: [
      "Fields of Mistria is a nostalgic farming and life-simulation RPG developed by NPC Studio. Players inherit an overgrown farm and help restore the village of Mistria after an earthquake causes strange magic to flow through the land.",
      "Alongside farming and animal care, players can fish, mine, craft, cook, fight monsters, unlock magic, attend festivals, complete town requests, and build relationships with more than 30 villagers. Version 1.0 adds complete town progression, marriage, children, achievements, expanded skill perks, and additional late-game content.",
    ],
    facts: [
      { label: "Developer", value: "NPC Studio" },
      { label: "Platform", value: "Steam — Windows and Linux" },
      { label: "Genre", value: "Farming and Life Sim RPG" },
      { label: "Marriage Candidates", value: "12" },
      { label: "Steam Achievements", value: "69" },
      { label: "Villagers", value: "30+" },
    ],
    closingTitle: "Ready to Explore Mistria?",
    closingDescription:
      "Start with the people of Mistria, learn their favorite gifts, and make every season count.",
    characterAction: "Browse Character Gifts",
    steamAction: "Play on Steam",
  },
  zh: {
    eyebrow: "玩家制作的社区指南",
    description:
      "打造梦想农场、重建米斯特里亚小镇，并探索一个充满魔法、恋爱、钓鱼、采矿、制作与古代遗迹的世界。这里提供首个季节、角色喜好、农场成长、人际关系和最新更新的实用指南。",
    stats: [
      "2026 年 8 月 5 日正式发布",
      "最新版本 v1.0.4",
      "97% 好评",
      "最高同时在线 39,233 人",
    ],
    sections: [
      {
        title: "角色",
        links: [
          {
            label: "浏览角色",
            href: "/zh/characters",
            description: "查询生日、礼物喜好、身份与日程。",
          },
          { label: "可恋爱角色" },
          { label: "小镇居民" },
        ],
      },
      {
        title: "从这里开始",
        links: [
          {
            label: "新手指南",
            description:
              "了解基础操作、体力管理和每日优先事项，以及前期任务、工具、仓储与第一周路线。",
          },
          {
            label: "初期农场规划",
            description: "安排作物区、季节收益活动、动物与仓储，避免浪费前期资源。",
          },
          {
            label: "礼物与关系",
            href: "/zh/characters",
            description: "查询最爱礼物、生日、日程、爱心事件与可恋爱角色。",
          },
          {
            label: "钓鱼、采矿与魔法",
            description: "了解鱼类条件、矿洞进度、珍贵材料、法术与古代遗迹。",
          },
        ],
      },
      {
        title: "探索米斯特里亚",
        links: [
          { label: "世界与地点" },
          { label: "耕种与动物" },
          { label: "鱼类、作物与古物" },
          { label: "任务、技能与魔法" },
        ],
      },
      {
        title: "官方与社区",
        links: [
          { label: "官方网站", href: officialLinks.website },
          { label: "前往 Steam 游玩", href: officialLinks.steam },
          { label: "官方 YouTube", href: officialLinks.youtube },
          { label: "官方 1.0 预告片", href: officialLinks.trailer },
          { label: "Reddit 社区", href: officialLinks.reddit },
          {
            label: "非官方 Discord 社区",
            href: officialLinks.discord,
            description: "这是玩家运营的大型社区；目前没有开发团队运营的官方 Discord。",
          },
          { label: "Steam 社区中心", href: officialLinks.steamCommunity },
        ],
      },
    ],
    aboutTitle: "Fields of Mistria 是什么？",
    about: [
      "Fields of Mistria 是一款由 NPC Studio 开发、带有怀旧风格的农场与生活模拟 RPG。玩家继承一座杂草丛生的农场，并在地震令奇异魔力涌入大地后帮助重建米斯特里亚村庄。",
      "除耕种与照料动物外，玩家还可以钓鱼、采矿、制作、烹饪、战斗、解锁魔法、参加节庆、完成小镇委托，并与 30 多位村民建立关系。1.0 版本加入完整城镇进度、婚姻、子女、成就、扩展技能与更多后期内容。",
    ],
    facts: [
      { label: "开发商", value: "NPC Studio" },
      { label: "平台", value: "Steam — Windows 与 Linux" },
      { label: "类型", value: "农场与生活模拟 RPG" },
      { label: "可结婚角色", value: "12" },
      { label: "Steam 成就", value: "69" },
      { label: "村民", value: "30+" },
    ],
    closingTitle: "准备好探索米斯特里亚了吗？",
    closingDescription: "从认识小镇居民和他们喜爱的礼物开始，让每一个季节都更充实。",
    characterAction: "浏览角色礼物",
    steamAction: "前往 Steam 游玩",
  },
};

export function HomePortal({ locale }: { locale: Locale }) {
  const page = copy[locale];
  const characterPath = locale === "zh" ? "/zh/characters" : "/characters";

  return (
    <>
      <header className="portal-intro home-hero">
        <p className="page-kicker">{page.eyebrow}</p>
        <h1>Fields of Mistria</h1>
        <p>{page.description}</p>
        <ul className="home-stats" aria-label={locale === "zh" ? "游戏数据" : "Game statistics"}>
          {page.stats.map((stat) => <li key={stat}>{stat}</li>)}
        </ul>
      </header>

      <div className="portal-grid">
        {page.sections.map((section) => (
          <PortalSection key={section.title} {...section} />
        ))}
      </div>

      <section className="game-overview">
        <div className="game-overview-copy">
          <h2>{page.aboutTitle}</h2>
          {page.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <dl className="game-facts">
          {page.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="home-closing">
        <h2>{page.closingTitle}</h2>
        <p>{page.closingDescription}</p>
        <div className="home-actions">
          <a href={characterPath}>{page.characterAction}</a>
          <a href={officialLinks.steam}>{page.steamAction}</a>
        </div>
      </section>
    </>
  );
}
