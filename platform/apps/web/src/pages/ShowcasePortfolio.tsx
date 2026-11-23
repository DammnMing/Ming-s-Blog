import { useMemo, useState } from "react";
import { usePersona } from "../components/PersonaContext.js";
import { SHOWCASE_PROJECTS } from "../data/showcase.js";
import { ShowcaseProjectCard } from "../components/ShowcaseProjectCard.js";
import {
  DecorOutlineCircle,
  DecorSolidCircle,
  DecorSolidSquare,
  SectionTitle,
} from "../components/MemphisDecor.js";

type FilterCategory = "all" | "manga" | "dev";

export function ShowcasePortfolio() {
  const { persona } = usePersona();
  const isDevTheme = persona === "dev";
  const [filter, setFilter] = useState<FilterCategory>("all");

  const counts = useMemo(() => {
    const manga = SHOWCASE_PROJECTS.filter((p) => p.category === "manga").length;
    const dev = SHOWCASE_PROJECTS.filter((p) => p.category === "dev").length;
    return { all: SHOWCASE_PROJECTS.length, manga, dev };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return SHOWCASE_PROJECTS;
    return SHOWCASE_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const tabs: { key: FilterCategory; label: string; aigcActive: string; devActive: string }[] = [
    { key: "all", label: `全部 (${counts.all})`, aigcActive: "bg-mem-black text-white", devActive: "bg-sky-500 text-slate-950 font-bold" },
    { key: "manga", label: `漫剧作品 (${counts.manga})`, aigcActive: "bg-mem-red text-white", devActive: "bg-rose-500 text-white font-bold" },
    { key: "dev", label: `全栈工程 (${counts.dev})`, aigcActive: "bg-mem-blue text-white", devActive: "bg-cyan-400 text-slate-950 font-bold" },
  ];

  return (
    <div className="relative">
      {!isDevTheme && (
        <>
          <DecorSolidSquare className="hidden sm:block absolute -top-2 -left-2 w-7 h-7 opacity-70" color="mem-yellow" />
          <DecorSolidCircle className="hidden sm:block absolute top-6 right-4 w-5 h-5" color="mem-red" />
          <DecorOutlineCircle className="hidden sm:block absolute -top-4 right-20 w-10 h-10 opacity-60" color="mem-blue" />
        </>
      )}

      {isDevTheme ? (
        <div className="mb-8">
          <p className="font-mono-tech text-xs text-sky-400 mb-2">$ ls -la ./portfolio</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">PORTFOLIO · 作品集</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            AIGC 漫剧制片交付与全栈工程项目全览 · 已预留视频播放器结构，后续接入 OSS + CDN 即可在线播放成片
          </p>
        </div>
      ) : (
        <SectionTitle
          title="PORTFOLIO · 作品集"
          subtitle="AIGC 漫剧制片交付与全栈工程项目全览 · 已预留视频播放结构，后续接入 OSS + CDN 即可在线看成片"
        />
      )}

      {/* 分类筛选 */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {tabs.map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-sm transition-all cursor-pointer ${
                isDevTheme
                  ? `font-mono-tech rounded-lg border ${
                      active ? `${tab.devActive} border-transparent` : "bg-slate-900 text-slate-300 border-slate-700 hover:border-sky-400"
                    }`
                  : `font-display border-memphis ${
                      active ? `${tab.aigcActive} shadow-none translate-x-[2px] translate-y-[2px]` : "bg-white text-mem-black shadow-memphis-sm hover:bg-mem-yellow"
                    }`
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 作品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ShowcaseProjectCard key={project.id} project={project} persona={persona} />
        ))}
      </div>
    </div>
  );
}
