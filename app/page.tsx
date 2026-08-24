import { HomePortal } from "../components/home-portal";
import { WikiShell } from "../components/wiki-shell";

export default function HomePage() {
  return (
    <WikiShell locale="en">
      <HomePortal locale="en" />
    </WikiShell>
  );
}
