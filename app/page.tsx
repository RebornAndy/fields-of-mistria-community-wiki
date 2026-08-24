import { PortalSection, type PortalLink } from "../components/portal-section";
import { WikiShell } from "../components/wiki-shell";

const portalSections: { title: string; links: PortalLink[] }[] = [
  {
    title: "Characters",
    links: [
      { label: "Browse characters", href: "/characters" },
      { label: "Romanceable characters" },
      { label: "Townsfolk" },
    ],
  },
  {
    title: "World",
    links: [{ label: "Mistria" }, { label: "Locations" }, { label: "The Mines" }],
  },
  {
    title: "Items",
    links: [{ label: "Crops" }, { label: "Fish" }, { label: "Artifacts" }],
  },
  {
    title: "Gameplay",
    links: [{ label: "Farming" }, { label: "Relationships" }, { label: "Quests" }],
  },
];

export default function HomePage() {
  return (
    <WikiShell locale="en">
      <header className="portal-intro">
        <p className="page-kicker">Welcome, adventurer</p>
        <h1>Fields of Mistria Wiki</h1>
        <p>
          A community guide to the people, places, items, and everyday life of
          Mistria.
        </p>
      </header>
      <div className="portal-grid">
        {portalSections.map((section) => (
          <PortalSection key={section.title} {...section} />
        ))}
      </div>
    </WikiShell>
  );
}
