import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost/"), {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Fields of Mistria wiki foundation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Fields of Mistria Wiki — Guides, Gifts &amp; Romance<\/title>/i,
  );
  assert.match(html, /href="\/fields-of-mistria-favicon-512\.png"/i);
  assert.match(html, /Fields of Mistria Wiki/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("server-renders the Google Analytics tag on every locale", async () => {
  for (const pathname of ["/", "/zh"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);

    const html = await response.text();
    assert.match(
      html,
      /googletagmanager\.com\/gtag\/js\?id=G-QME6249J8Y/i,
      pathname,
    );
    assert.match(html, /G-QME6249J8Y/, pathname);
  }
});

test("server-renders each route with the correct localized content scope", async () => {
  const routeLanguages = [
    ["/", "en"],
    ["/characters", "en"],
    ["/characters/adeline", "en"],
    ["/zh", "zh-CN"],
    ["/zh/characters", "zh-CN"],
    ["/zh/characters/adeline", "zh-CN"],
  ];

  for (const [pathname, language] of routeLanguages) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);

    const html = await response.text();
    assert.match(
      html,
      new RegExp(`<div[^>]*class="wiki-page"[^>]*lang="${language}"`, "i"),
      pathname,
    );
  }
});

test("serves crawlable sitemap and robots resources", async () => {
  const sitemapResponse = await render("/sitemap.xml", "application/xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /^application\/xml(?:;|$)/i,
  );

  const sitemap = await sitemapResponse.text();
  const locations = Array.from(
    sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
    (match) => match[1],
  );
  assert.deepEqual(locations, [
    "https://mistriaguide.site",
    "https://mistriaguide.site/characters",
    "https://mistriaguide.site/characters/adeline",
    "https://mistriaguide.site/zh",
    "https://mistriaguide.site/zh/characters",
    "https://mistriaguide.site/zh/characters/adeline",
  ]);

  const robotsResponse = await render("/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  assert.match(
    robotsResponse.headers.get("content-type") ?? "",
    /^text\/plain(?:;|$)/i,
  );
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(
    robots,
    /Sitemap:\s*https:\/\/mistriaguide\.site\/sitemap\.xml/i,
  );
});

test("removes the disposable starter preview", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
