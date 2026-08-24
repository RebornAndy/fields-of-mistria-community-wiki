import type {
  CharacterCategory,
  CharacterRecord,
} from "../lib/characters";
import { type Locale, localizePath } from "../lib/i18n";

const categoryOrder: CharacterCategory[] = [
  "romanceable",
  "non-romanceable",
  "market-vendor",
  "special",
];

const categoryLabels: Record<
  Locale,
  Record<CharacterCategory, string>
> = {
  en: {
    romanceable: "Romanceable Characters",
    "non-romanceable": "Non-romanceable Characters",
    "market-vendor": "Saturday Market Vendors",
    special: "Special Characters",
  },
  zh: {
    romanceable: "可恋爱角色",
    "non-romanceable": "不可恋爱角色",
    "market-vendor": "周六市场商贩",
    special: "特殊角色",
  },
};

function CharacterCard({
  character,
  locale,
}: {
  character: CharacterRecord;
  locale: Locale;
}) {
  const portrait = (
    <>
      {/* Native local images keep the placeholder pixel art crisp. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="pixel-art"
        src={character.portrait}
        alt=""
        width="96"
        height="96"
        loading="lazy"
      />
      <span className="character-card-copy">
        <strong>{character.name}</strong>
        <span>{character.role}</span>
      </span>
    </>
  );

  return (
    <article className="character-card" aria-label={character.name}>
      {character.slug === "adeline" ? (
        <a href={localizePath(`/characters/${character.slug}`, locale)}>
          {portrait}
        </a>
      ) : (
        <div className="character-card-planned">{portrait}</div>
      )}
    </article>
  );
}

export function CharacterGrid({
  locale,
  characters,
}: {
  locale: Locale;
  characters: CharacterRecord[];
}) {
  return (
    <div className="character-directory">
      {categoryOrder.map((category) => {
        const groupedCharacters = characters.filter(
          (character) => character.category === category,
        );

        return (
          <section className="character-group" key={category}>
            <h2>{categoryLabels[locale][category]}</h2>
            <div className="character-grid">
              {groupedCharacters.map((character) => (
                <CharacterCard
                  character={character}
                  locale={locale}
                  key={character.slug}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
