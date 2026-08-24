import { PortalSection, type PortalLink } from "../../components/portal-section";
import { WikiShell } from "../../components/wiki-shell";

const portalSections: { title: string; links: PortalLink[] }[] = [
  {
    title: "角色",
    links: [
      { label: "浏览角色", href: "/zh/characters" },
      { label: "可恋爱角色" },
      { label: "小镇居民" },
    ],
  },
  {
    title: "世界",
    links: [{ label: "米斯特里亚" }, { label: "地点" }, { label: "矿洞" }],
  },
  {
    title: "物品",
    links: [{ label: "作物" }, { label: "鱼类" }, { label: "古物" }],
  },
  {
    title: "玩法",
    links: [{ label: "耕种" }, { label: "人际关系" }, { label: "任务" }],
  },
];

export default function ChineseHomePage() {
  return (
    <WikiShell locale="zh">
      <header className="portal-intro">
        <p className="page-kicker">欢迎来到米斯特里亚</p>
        <h1>Fields of Mistria Wiki</h1>
        <p>一份由社区维护的米斯特里亚角色、地点、物品与生活指南。</p>
      </header>
      <div className="portal-grid">
        {portalSections.map((section) => (
          <PortalSection key={section.title} {...section} />
        ))}
      </div>
    </WikiShell>
  );
}
