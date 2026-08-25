import type { ComponentPropsWithoutRef } from "react";

type ScriptProps = ComponentPropsWithoutRef<"script"> & {
  strategy?: string;
};

export default function Script({ strategy, ...props }: ScriptProps) {
  void strategy;
  return <script {...props} />;
}
