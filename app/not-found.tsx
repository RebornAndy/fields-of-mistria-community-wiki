import { WikiShell } from "../components/wiki-shell";

export default function NotFound() {
  return (
    <WikiShell locale="en">
      <section className="not-found" aria-labelledby="not-found-title">
        <p className="page-kicker">404</p>
        <h1 id="not-found-title">Page not found / 页面未找到</h1>
        <p>
          This page is not in the wiki yet. Choose a path below to continue
          exploring Mistria.
        </p>
        <nav aria-label="Recovery links">
          {/* Vinext does not expose next/link; keep local recovery anchors. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Home</a>
          <a href="/characters">Characters</a>
        </nav>
      </section>
    </WikiShell>
  );
}
