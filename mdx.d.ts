declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: unknown;
  export const source: string;
  const MdxContent: ComponentType;
  export default MdxContent;
}
