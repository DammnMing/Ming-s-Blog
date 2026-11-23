import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ShowcaseProject } from "../data/showcase.js";
import { IconArrowRight } from "./MemphisDecor.js";

export interface CustomCoverFrameInput {
  key: string;
  label: string;
  subLabel: string;
  imageUrl: string;
  cornerTag: string;
}

interface CoverFrame {
  key: string;
  label: string;
  subLabel: string;
  imageUrl: string;
  cornerTag: string;
  project?: ShowcaseProject;
}

/**
 * AIGC 漫剧视角首屏核心视觉：《VOGUE / GQ》大刊封面风格
 * - 巨型艺术刊头压顶 + 满出血超大主视觉大片 + 锋利大标题叠压
 * - 支持 customCoverFrames（多张原创艺术大片）与 coverProjects（高颜值国漫剧照）混排
 * - 右下角极简换刊目录，零原生横向滚动条
 */
export function AigcMagazineCover({
  coverProjects,
  customCoverImageUrl,
  customCoverFrames,
  badge,
  headlineTop,
  headlineAccent,
  lead,
  personaSwitcher,
  onSelectProject,
}: {
  coverProjects: ShowcaseProject[];
  customCoverImageUrl?: string;
  customCoverFrames?: CustomCoverFrameInput[];
  badge: string;
  headlineTop: string;
  headlineAccent: string;
  lead: string;
  personaSwitcher: ReactNode;
  onSelectProject: (project: ShowcaseProject) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [failedKeys, setFailedKeys] = useState<Record<string, boolean>>({});

  const frames: CoverFrame[] = useMemo(() => {
    const list: CoverFrame[] = [];
    if (customCoverFrames && customCoverFrames.length > 0) {
      customCoverFrames.forEach((f) => list.push(f));
    } else if (customCoverImageUrl) {
      list.push({
        key: "custom-cover",
        label: "封面大片",
        subLabel: "EDITORIAL",
        imageUrl: customCoverImageUrl,
        cornerTag: "01 / COVER STORY · EDITORIAL",
      });
    }
    coverProjects.forEach((proj) => {
      const idxStr = String(list.length + 1).padStart(2, "0");
      list.push({
        key: `proj-${proj.id}`,
        label: proj.title.replace(/[《》]/g, ""),
        subLabel: proj.episodes,
        imageUrl: proj.mediaUrl,
        cornerTag: `${idxStr} / ${proj.title} · ${proj.episodes}`,
        project: proj,
      });
    });
    return list;
  }, [coverProjects, customCoverFrames, customCoverImageUrl]);

  const activeFrame = frames[activeIdx] ?? frames[0];
  if (!activeFrame) return null;

  const isImgFailed = Boolean(failedKeys[activeFrame.key]);

  return (
    <div className="w-full animate-editorial-in">
      {/* 1. 巨型艺术刊头 (Masthead) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-5 pb-4">
        <div className="flex items-end justify-between gap-4 pb-3">
          <div className="font-editorial font-semibold tracking-[-0.04em] leading-[0.86] text-[clamp(2.75rem,9.2vw,7rem)] text-ink select-none">
            SUBMING
          </div>
          <div className="text-right font-mono-tech text-[10px] sm:text-[11px] tracking-widest uppercase text-ink-muted space-y-1 pb-1 shrink-0">
            <p className="text-vermilion font-medium">VOL. 04 · 2026</p>
            <p className="hidden sm:block">AIGC &amp; ENGINEERING ARCHIVE</p>
          </div>
        </div>

        {/* 1px 炭墨细线夹住的刊头元信息条（唯一身份切换入口） */}
        <div className="border-t border-b border-ink/25 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div>{personaSwitcher}</div>
          <div className="font-mono-tech text-[10px] sm:text-[11px] tracking-widest uppercase text-ink-muted">
            HANGZHOU · 400+ EPISODES · -30% COST
          </div>
        </div>
      </div>

      {/* 2. 满出血超大主视觉封面画框 */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-10 sm:pb-12">
        <div className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] overflow-hidden bg-ink shadow-editorial flex flex-col justify-between p-5 sm:p-8 lg:p-10">
          {activeFrame.imageUrl && !isImgFailed ? (
            <img
              key={activeFrame.key}
              src={activeFrame.imageUrl}
              alt={activeFrame.label}
              onError={() => setFailedKeys((prev) => ({ ...prev, [activeFrame.key]: true }))}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-ink" />
          )}

          {/* 克制暗部护底渐变 */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/32 to-black/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent"
            aria-hidden
          />

          {/* 顶部四角印刷角标 */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/55 backdrop-blur-md text-[11px] font-mono-tech tracking-wider text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
              {activeFrame.cornerTag}
            </span>
            <span className="hidden sm:inline-block font-mono-tech text-[11px] tracking-[0.22em] uppercase text-white/75">
              EDITION 2026 · SELECTED WORKS
            </span>
          </div>

          {/* 底部核心张力区：左下封面大标题 + 右下无滚动条换刊目录 */}
          <div className="relative z-10 mt-16 sm:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-mono-tech text-[11px] sm:text-xs tracking-[0.18em] uppercase text-vermilion bg-paper/95 inline-block px-2.5 py-1 mb-4 font-medium">
                {badge}
              </p>

              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[3.75rem] font-semibold text-paper leading-[1.1] tracking-tight">
                {headlineTop}
                <span className="block mt-1.5 text-paper/95">{headlineAccent}</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base text-paper/85 leading-relaxed">
                {lead}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-paper text-ink transition-opacity hover:opacity-90"
                >
                  阅读完整简历 <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm border border-paper/45 text-paper bg-black/25 backdrop-blur-sm hover:bg-paper hover:text-ink transition-colors"
                >
                  进入作品集 ↗
                </Link>
                {activeFrame.project && (
                  <button
                    type="button"
                    onClick={() => activeFrame.project && onSelectProject(activeFrame.project)}
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono-tech bg-vermilion text-white hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    查看该剧详情 ↗
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-60 shrink-0">
              <p className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
                COVER INDEX · 切换大片
              </p>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
                {frames.map((frame, idx) => {
                  const active = idx === activeIdx;
                  const num = String(idx + 1).padStart(2, "0");
                  return (
                    <button
                      key={frame.key}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`group flex items-center justify-between gap-2 px-3 py-2 text-left border-l-2 backdrop-blur-md transition-all cursor-pointer ${
                        active
                          ? "border-vermilion bg-black/75 text-white"
                          : "border-white/25 bg-black/40 text-white/65 hover:text-white hover:bg-black/60"
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="font-mono-tech text-[10px] text-vermilion mr-1.5">{num}</span>
                        <span className="text-xs font-medium truncate inline-block align-bottom max-w-[115px] md:max-w-[125px]">
                          {frame.label}
                        </span>
                      </div>
                      <span className="hidden md:inline font-mono-tech text-[10px] text-white/50 shrink-0">
                        {frame.subLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 蓝黑硬核分层系统架构拓扑图组件
 * - 用于全栈双视图工作台「架构拓扑」模式、无公开截图的脱敏商业项目跨页/卡片/弹窗
 */
export function DevArchitectureBlueprint({
  project,
  compact = false,
}: {
  project: ShowcaseProject;
  compact?: boolean;
}) {
  const arch = project.architecture;
  const layers = arch?.layers ?? [
    { idx: "01", layer: "CLIENT LAYER", spec: project.tags.slice(0, 2).join(" · "), metric: project.role },
    { idx: "02", layer: "SERVICE LAYER", spec: project.tagline, metric: project.episodes },
    { idx: "03", layer: "DELIVERY", spec: project.team, metric: "PROD READY" },
  ];

  return (
    <div
      className={`w-full h-full bg-[#060B16] bg-obsidian-glow flex flex-col justify-between ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-7"
      }`}
    >
      {/* 顶部系统蓝图标识 */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-blue-400/15 font-mono-tech text-[10px] sm:text-[11px]">
        <span className="text-slate-400 truncate">{arch?.endpoint ?? `system://${project.slug}`}</span>
        <span className="inline-flex items-center gap-1.5 text-electric shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-electric" />
          {arch?.status ?? "ARCHITECTURE"}
        </span>
      </div>

      {/* 分层节点流 */}
      <div className={compact ? "space-y-1.5 my-auto" : "space-y-2 my-auto"}>
        {layers.map((item, i) => (
          <div key={item.idx}>
            <div
              className={`border border-blue-400/20 bg-[#0B1326]/90 hover:border-blue-400/45 transition-colors flex items-center justify-between gap-3 ${
                compact ? "px-3 py-2" : "px-3.5 py-2.5 sm:px-4 sm:py-3"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-[10px] text-electric">{item.idx}</span>
                  <span className="font-mono-tech text-[11px] font-medium tracking-wider text-slate-100 truncate">
                    {item.layer}
                  </span>
                </div>
                <p className={`text-slate-400 truncate ${compact ? "text-[10px] mt-0.5" : "text-[11px] mt-0.5"}`}>
                  {item.spec}
                </p>
              </div>
              <span className="shrink-0 font-mono-tech text-[10px] px-2 py-0.5 border border-blue-400/25 bg-blue-500/10 text-electric">
                {item.metric}
              </span>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center">
                <span className={`w-px bg-blue-400/30 ${compact ? "h-1.5" : "h-2"}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {!compact && (
        <div className="pt-3 mt-3 border-t border-blue-400/15 flex items-center justify-between font-mono-tech text-[10px] text-slate-400">
          <span>BLUEPRINT · {project.role}</span>
          <span className="text-electric">STACK VERIFIED</span>
        </div>
      )}
    </div>
  );
}

/**
 * 全栈开发视角首屏核心视觉：深空午夜蓝黑双视图硬核工作台
 * - 支持 3 大工程系统切换 + [ PREVIEW 实机 ] / [ TOPOLOGY 架构 ] 双视图切换
 * - 独立深空蓝黑信息带与图片分离，彻底避免白底截图压字不清
 */
export function DevProductStage({
  projects,
  onSelectProject,
}: {
  projects: ShowcaseProject[];
  onSelectProject: (project: ShowcaseProject) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"preview" | "topology">("preview");
  const [failedIds, setFailedIds] = useState<Record<number, boolean>>({});

  const current = projects[activeIdx] ?? projects[0];
  if (!current) return null;

  const hasPreviewImage = Boolean(current.mediaUrl && !failedIds[current.id]);
  const effectiveView: "preview" | "topology" = hasPreviewImage ? viewMode : "topology";
  const addressLabel = current.architecture?.endpoint ?? `system://${current.slug}`;

  return (
    <div className="relative select-none">
      {/* 深空电光蓝环境背光 */}
      <div
        className="pointer-events-none absolute -inset-4 bg-gradient-to-tr from-blue-600/16 via-sky-400/8 to-transparent blur-2xl opacity-80"
        aria-hidden
      />

      {/* 真机工作台主体 */}
      <div className="relative bg-obsidian-card border border-blue-400/20 shadow-device-glow overflow-hidden">
        {/* 顶栏：状态圆点 + 端点地址 + 双视图切换 */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-blue-400/15 bg-[#050912]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500/60" />
            </div>
            <span className="font-mono-tech text-[11px] text-slate-400 truncate max-w-[180px] sm:max-w-[260px]">
              {addressLabel}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono-tech text-[10px]">
            {hasPreviewImage && (
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                  effectiveView === "preview"
                    ? "border-blue-400/60 bg-blue-500/20 text-white"
                    : "border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                实机画面
              </button>
            )}
            <button
              type="button"
              onClick={() => setViewMode("topology")}
              className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                effectiveView === "topology"
                  ? "border-blue-400/60 bg-blue-500/20 text-white"
                  : "border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              架构拓扑
            </button>
          </div>
        </div>

        {/* 主视觉区（纯净图片或蓝黑分层拓扑，绝不把标题压在白底图表上） */}
        <div
          onClick={() => onSelectProject(current)}
          className="group relative aspect-[16/10] bg-[#060B16] overflow-hidden cursor-pointer"
        >
          {effectiveView === "preview" && hasPreviewImage ? (
            <>
              <img
                src={current.mediaUrl}
                alt={current.title}
                onError={() => setFailedIds((prev) => ({ ...prev, [current.id]: true }))}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 font-mono-tech text-[10px] bg-[#070B14]/85 backdrop-blur-md border border-blue-400/35 text-slate-100 group-hover:bg-electric group-hover:text-white group-hover:border-electric transition-colors">
                放大预览 ↗
              </span>
            </>
          ) : (
            <DevArchitectureBlueprint project={current} />
          )}
        </div>

        {/* 独立深空蓝黑项目信息带（高对比清晰可读） */}
        <div className="px-5 py-4 border-t border-blue-400/15 bg-[#091020] flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono-tech text-[11px] text-electric mb-0.5 truncate">
              {current.role} · {current.episodes}
            </p>
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
              {current.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{current.tagline}</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectProject(current)}
            className="shrink-0 px-3 py-1.5 font-mono-tech text-[11px] border border-blue-400/30 bg-blue-500/10 text-electric hover:bg-electric hover:text-white transition-colors cursor-pointer"
          >
            详情 ↗
          </button>
        </div>

        {/* 单行紧凑工程指标条 */}
        <div className="grid grid-cols-3 divide-x divide-blue-400/15 border-t border-blue-400/15 bg-[#050912] py-2.5 text-[11px] font-mono-tech">
          <div className="px-3 sm:px-4">
            <span className="block text-[9px] text-slate-500">CONCURRENCY</span>
            <span className="text-slate-100">30+ ONLINE</span>
          </div>
          <div className="px-3 sm:px-4">
            <span className="block text-[9px] text-slate-500">COST DELTA</span>
            <span className="text-electric">-30% PROD</span>
          </div>
          <div className="px-3 sm:px-4 text-right">
            <span className="block text-[9px] text-slate-500">API · QUEUE</span>
            <span className="text-slate-100">30+ · 6W</span>
          </div>
        </div>
      </div>

      {/* 3 大工程系统切换条 */}
      {projects.length > 1 && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {projects.map((proj, idx) => {
            const active = proj.id === current.id;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-2.5 text-left border transition-colors cursor-pointer ${
                  active
                    ? "bg-blue-500/15 border-blue-400/50 text-white"
                    : "bg-[#091020]/70 border-white/10 text-slate-400 hover:text-white hover:border-blue-400/30"
                }`}
              >
                <span className="font-mono-tech text-[10px] text-electric mr-1.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-medium truncate inline-block align-bottom max-w-[150px]">
                  {proj.title.replace(/ & 小程序$/, "")}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
