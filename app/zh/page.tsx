import { HomePortal } from "../../components/home-portal";
import { WikiShell } from "../../components/wiki-shell";

export default function ChineseHomePage() {
  return (
    <WikiShell locale="zh">
      <HomePortal locale="zh" />
    </WikiShell>
  );
}
