import { useId } from "react";

export type PortalLink = {
  label: string;
  href?: string;
  description?: string;
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
              <a aria-label={link.label} href={link.href}>
                <strong>{link.label}</strong>
                {link.description ? <small>{link.description}</small> : null}
              </a>
            ) : (
              <span>
                <strong>{link.label}</strong>
                {link.description ? <small>{link.description}</small> : null}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
