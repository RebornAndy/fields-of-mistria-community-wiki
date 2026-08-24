import type { CharacterCategory, CharacterRecord } from "../lib/characters";
import { type Locale, localizePath } from "../lib/i18n";

const categoryOrder: CharacterCategory[] = [
  "romanceable",
  "non-romanceable",
  "market-vendor",
  "special",
];

const categoryLabels: Record<Locale, Record<CharacterCategory, string>> = {
  en: {
    romanceable: "Romanceable Characters",
    "non-romanceable": "Non-romanceable Residents",
    "market-vendor": "Saturday Market Vendors",
    special: "Special Story Characters",
  },
  zh: {
    romanceable: "可恋爱角色",
    "non-romanceable": "不可恋爱居民与动物",
    "market-vendor": "周六市场商贩",
    special: "特殊剧情角色",
  },
};

const labels = {
  en: {
    location: "Location",
    relationships: "Relationships",
    profile: "Profile",
    romance: "Romance",
    familyTitle: "Family and Relationship Map",
    summaryTitle: "Roster Summary",
    total: "Total directory characters",
  },
  zh: {
    location: "主要地点",
    relationships: "重要关系",
    profile: "性格与特点",
    romance: "恋爱状态",
    familyTitle: "家庭与关系图",
    summaryTitle: "角色数量汇总",
    total: "目录角色总数",
  },
} satisfies Record<Locale, Record<string, string>>;

const familyGroups: Record<Locale, { family: string; members: string; relationship: string }[]> = {
  en: [
    { family: "Mistria’s ruling family", members: "Adeline, Eiland, Elsie", relationship: "Adeline and Eiland are siblings; Elsie is an older relative." },
    { family: "General Store family", members: "Holt, Nora, Celine, Luc, Maple", relationship: "Holt and Nora are the parents; Celine, Luc, and Maple are their children." },
    { family: "Sleeping Dragon Inn family", members: "Hemlock, Josephine, Reina, Dell", relationship: "Hemlock and Josephine are the parents; Reina and Dell are their daughters." },
    { family: "Blacksmith family", members: "March, Olric", relationship: "Brothers; March is the younger brother." },
    { family: "Carpenter group", members: "Landen, Ryis", relationship: "Relatives and woodworking partners." },
    { family: "Sweetwater Farm", members: "Hayden, Henrietta", relationship: "Hayden owns and cares for Henrietta." },
    { family: "Bathhouse group", members: "Juniper, Dozy", relationship: "Juniper is Dozy’s owner and companion." },
    { family: "Ancient story characters", members: "Caldarus, Seridia", relationship: "Both are connected to ancient Mistria, magic, and later story progression." },
  ],
  zh: [
    { family: "米斯特里亚统治家族", members: "阿德琳、艾兰德、艾尔西", relationship: "阿德琳与艾兰德是姐弟；艾尔西是年长亲属。" },
    { family: "杂货店家庭", members: "霍尔特、诺拉、瑟琳、卢克、梅普尔", relationship: "霍尔特与诺拉是父母；瑟琳、卢克和梅普尔是他们的孩子。" },
    { family: "沉睡巨龙旅店家庭", members: "海姆洛克、约瑟芬、蕾娜、戴尔", relationship: "海姆洛克与约瑟芬是父母；蕾娜和戴尔是他们的女儿。" },
    { family: "铁匠家庭", members: "马奇、奥尔里克", relationship: "两人是兄弟；马奇是弟弟。" },
    { family: "木匠组合", members: "兰登、莱斯", relationship: "两人是亲属与木工伙伴。" },
    { family: "甜水农场", members: "海登、亨丽埃塔", relationship: "海登拥有并照料亨丽埃塔。" },
    { family: "浴场组合", members: "朱尼珀、多兹", relationship: "朱尼珀是多兹的主人与伙伴。" },
    { family: "远古剧情角色", members: "卡尔达鲁斯、塞里迪娅", relationship: "两者都与远古米斯特里亚、魔法和后期剧情有关。" },
  ],
};

function CharacterPortrait({ character }: { character: CharacterRecord }) {
  if (!character.portrait) {
    return (
      <span className="character-card-placeholder" aria-hidden="true">
        {character.name.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  return (
    // Native local images keep the placeholder pixel art crisp.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="pixel-art"
      src={character.portrait}
      alt=""
      width="96"
      height="96"
      loading="lazy"
    />
  );
}

function CharacterCard({ character, locale }: { character: CharacterRecord; locale: Locale }) {
  const cardLabels = labels[locale];
  const heading = (
    <div className="character-card-heading">
      <CharacterPortrait character={character} />
      <span className="character-card-copy">
        <strong>{character.name}</strong>
        <span>{character.genderOrType}</span>
        <span>{character.role}</span>
      </span>
    </div>
  );

  return (
    <article className="character-card" aria-label={character.name}>
      {character.slug === "adeline" ? (
        <a
          className="character-card-article-link"
          href={localizePath(`/characters/${character.slug}`, locale)}
          aria-label={character.name}
        >
          {heading}
        </a>
      ) : heading}
      <dl className="character-card-details">
        <div><dt>{cardLabels.location}</dt><dd>{character.residence}</dd></div>
        <div><dt>{cardLabels.relationships}</dt><dd>{character.relationships}</dd></div>
        <div><dt>{cardLabels.profile}</dt><dd>{character.summary}</dd></div>
        <div><dt>{cardLabels.romance}</dt><dd>{character.relationshipStatus}</dd></div>
      </dl>
    </article>
  );
}

export function CharacterGrid({ locale, characters }: { locale: Locale; characters: CharacterRecord[] }) {
  const pageLabels = labels[locale];

  return (
    <div className="character-directory">
      {categoryOrder.map((category) => {
        const groupedCharacters = characters.filter(
          (character) => character.category === category,
        );

        return (
          <section className="character-group" key={category}>
            <h2>
              {categoryLabels[locale][category]}
              <span className="character-group-count" aria-hidden="true">
                {groupedCharacters.length}
              </span>
            </h2>
            <div className="character-grid">
              {groupedCharacters.map((character) => (
                <CharacterCard character={character} locale={locale} key={character.slug} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="relationship-map">
        <h2>{pageLabels.familyTitle}</h2>
        <div className="relationship-table" role="table" aria-label={pageLabels.familyTitle}>
          {familyGroups[locale].map((group) => (
            <div className="relationship-row" role="row" key={group.family}>
              <strong role="cell">{group.family}</strong>
              <span role="cell">{group.members}</span>
              <span role="cell">{group.relationship}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="roster-summary">
        <h2>{pageLabels.summaryTitle}</h2>
        <dl>
          {categoryOrder.map((category) => (
            <div key={category}>
              <dt>{categoryLabels[locale][category]}</dt>
              <dd>{characters.filter((character) => character.category === category).length}</dd>
            </div>
          ))}
          <div className="roster-total">
            <dt>{pageLabels.total}</dt>
            <dd>{characters.length}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
