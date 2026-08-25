import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

const routes = [
  "",
  "/characters",
  "/characters/adeline",
  "/zh",
  "/zh/characters",
  "/zh/characters/adeline",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteOrigin}${route}`,
  }));
}
