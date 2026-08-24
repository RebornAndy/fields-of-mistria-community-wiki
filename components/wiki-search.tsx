"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCharacters } from "../lib/characters";
import { type Locale, localizePath, ui } from "../lib/i18n";

type SearchEntry = {
  href: string;
  keywords: string[];
};

function getSearchEntries(locale: Locale): SearchEntry[] {
  const adeline = getCharacters(locale).find(
    (character) => character.slug === "adeline",
  );

  return [
    {
      href: localizePath("/", locale),
      keywords: [ui(locale).home, "fields of mistria", "wiki"],
    },
    {
      href: localizePath("/characters", locale),
      keywords: [ui(locale).characters, "character directory"],
    },
    ...(adeline
      ? [
          {
            href: localizePath("/characters/adeline", locale),
            keywords: [adeline.name, adeline.slug, adeline.role],
          },
        ]
      : []),
  ];
}

export function WikiSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hasNoResults, setHasNoResults] = useState(false);
  const entries = useMemo(() => getSearchEntries(locale), [locale]);
  const copy = ui(locale);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
      setHasNoResults(false);
      return;
    }

    const matchingEntry = entries.find((entry) =>
      entry.keywords.some((keyword) =>
        keyword.toLocaleLowerCase().includes(normalizedQuery),
      ),
    );

    if (!matchingEntry) {
      setHasNoResults(true);
      return;
    }

    setHasNoResults(false);
    router.push(matchingEntry.href);
  }

  return (
    <form className="wiki-search" onSubmit={search} role="search">
      <label className="sr-only" htmlFor={`wiki-search-${locale}`}>
        {copy.search}
      </label>
      <input
        aria-label={copy.search}
        id={`wiki-search-${locale}`}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.search}
        type="search"
        value={query}
      />
      <button type="submit">Search</button>
      {hasNoResults ? (
        <p aria-live="polite" className="search-empty-state">
          {copy.noResults}
        </p>
      ) : null}
    </form>
  );
}
