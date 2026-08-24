import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { mdxTestPlugins } from "./build/mdx-vite-plugin";

export default defineConfig({
  plugins: mdxTestPlugins(),
  resolve: {
    alias: {
      "next/navigation": fileURLToPath(
        new URL("./tests/mocks/next-navigation.ts", import.meta.url),
      ),
      "next/headers": fileURLToPath(
        new URL("./tests/mocks/next-headers.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
  },
});
