import { useId } from "react";

export type PortalLink = {
  label: string;
  href?: string;
};

export function PortalSection({
  title,
  links,
}: {
  title: string;
  links: PortalLink[];
}) {
  const headingId = useId();

  return (
    <section className="portal-section" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <ul className="portal-links">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <a href={link.href}>{link.label}</a>
            ) : (
              <span>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
