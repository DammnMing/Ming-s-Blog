import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePersona } from "../components/PersonaContext.js";
import { SHOWCASE_PROJECTS } from "../data/showcase.js";
import { ShowcaseProjectCard } from "../components/ShowcaseProjectCard.js";

type FilterCategory = "all" | "manga" | "dev";

export function ShowcasePortfolio() {
  const { persona } = usePersona();
  const isDevTheme = persona === "dev";
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCat = searchParams.get("cat");
  const filter: FilterCategory = rawCat === "manga" || rawCat === "dev" ? rawCat : "all";

  const setFilter = (cat: FilterCategory) => {
    if (cat === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const counts = useMemo(() => {
    const manga = SHOWCASE_PROJECTS.filter((p) => p.category === "manga").length;
    const dev = SHOWCASE_PROJECTS.filter((p) => p.category === "dev").length;
    return { all: SHOWCASE_PROJECTS.length, manga, dev };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return SHOWCASE_PROJECTS;
    return SHOWCASE_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const tabs: { key: FilterCategory; label: string; count: number }[] = [
    { key: "all", label: "全部作品", count: counts.all },
    { key: "manga", label: "漫剧作品", count: counts.manga },
    { key: "dev", label: "全栈工程", count: counts.dev },
  ];

  return (
    <div className="animate-editorial-in">
      {/* 杂志级页头 */}
      <div className={`pb-10 mb-10 border-b flex flex-col lg:flex-row lg:items-end justify-between gap-6 ${isDevTheme ? "border-white/10" : "border-hairline"}`}>
        <div>
          <p className={`font-mono-tech text-xs tracking-widest uppercase mb-3 ${isDevTheme ? "text-electric" : "text-vermilion"}`}>
            ARCHIVE / SELECTED &amp; FULL WORKS
          </p>
          <h1 className={`text-4xl sm:text-5xl tracking-tight mb-3 ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold text-ink"}`}>
            完整作品集
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
            涵盖一线 AIGC 漫剧交付与独立全栈系统工程。已预留视频流媒体播放器结构，后续接入对象存储与 CDN 加速后即可直接在线播放成片。
          </p>
        </div>

        <div className="flex items-baseline gap-6 shrink-0 font-mono-tech">
          <div>
            <span className={`block text-[10px] tracking-widest ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>TOTAL</span>
            <span className={`text-3xl font-light ${isDevTheme ? "text-white" : "text-ink"}`}>{String(counts.all).padStart(2, "0")}</span>
          </div>
          <div>
            <span className={`block text-[10px] tracking-widest ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>DRAMA</span>
            <span className={`text-3xl font-light ${isDevTheme ? "text-white" : "text-ink"}`}>{String(counts.manga).padStart(2, "0")}</span>
          </div>
          <div>
            <span className={`block text-[10px] tracking-widest ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>SYSTEMS</span>
            <span className={`text-3xl font-light ${isDevTheme ? "text-white" : "text-ink"}`}>{String(counts.dev).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* 极简细线分类切换条 */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
        {tabs.map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-xs sm:text-sm font-mono-tech border transition-colors cursor-pointer ${
                isDevTheme
                  ? active
                    ? "bg-white text-black border-white font-medium"
                    : "bg-transparent text-zinc-400 border-white/15 hover:border-white/40 hover:text-white"
                  : active
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-ink-muted border-hairline hover:border-ink hover:text-ink"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* 画廊网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, idx) => (
          <ShowcaseProjectCard
            key={project.id}
            project={project}
            persona={persona}
            indexLabel={String(idx + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </div>
  );
}
