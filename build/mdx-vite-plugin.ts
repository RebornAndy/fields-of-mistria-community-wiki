import mdx from "@mdx-js/rollup";
import matter from "gray-matter";
import type { Plugin } from "vite";
import { compileArticleMdxSource } from "../lib/mdx";

export function mdxPreprocessPlugin(): Plugin {
  return {
    name: "local-mdx-preprocess",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".mdx")) {
        return null;
      }

      const parsed = matter(code);
      const exports = [
        `export const frontmatter = ${JSON.stringify(parsed.data)}`,
        `export const source = ${JSON.stringify(parsed.content)}`,
      ].join("\n");

      return `${exports}\n${compileArticleMdxSource(parsed.content)}`;
    },
  };
}

export function mdxTestPlugins(): Plugin[] {
  return [mdxPreprocessPlugin(), mdx()];
}
