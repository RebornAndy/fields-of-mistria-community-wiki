import type { CharacterRecord } from "../lib/characters";

const labels = {
  en: {
    birthday: "Birthday",
    occupation: "Occupation",
    residence: "Residence",
    relationshipStatus: "Relationship status",
  },
  zh: {
    birthday: "生日",
    occupation: "职业",
    residence: "住所",
    relationshipStatus: "恋爱状态",
  },
} as const;

export function CharacterInfobox({
  character,
}: {
  character: CharacterRecord;
}) {
  const copy = labels[character.locale];
  const facts = [
    [copy.birthday, character.birthday],
    [copy.occupation, character.occupation],
    [copy.residence, character.residence],
    [copy.relationshipStatus, character.relationshipStatus],
  ];

  return (
    <section className="character-infobox" aria-labelledby="character-name">
      <h2 id="character-name">{character.name}</h2>
      <div className="character-infobox-portrait">
        {/* Native images preserve the source wiki's pixel-art rendering. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={character.portrait}
          alt={character.name}
          width="280"
          height="280"
        />
      </div>
      <p className="character-infobox-role">{character.role}</p>
      <dl>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
