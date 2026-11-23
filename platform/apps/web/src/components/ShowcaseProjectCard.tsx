import { useState } from "react";
import type { Persona } from "./PersonaContext.js";
import type { ShowcaseProject } from "../data/showcase.js";

const COVER_PALETTE = [
  { bg: "bg-mem-yellow", accent: "text-mem-red" },
  { bg: "bg-mem-green", accent: "text-mem-black" },
  { bg: "bg-mem-orange", accent: "text-mem-black" },
  { bg: "bg-mem-purple", accent: "text-white" },
  { bg: "bg-mem-blue", accent: "text-white" },
];

const TAG_COLORS = [
  "bg-mem-yellow text-mem-black",
  "bg-cream-pink text-mem-black",
  "bg-mem-green/30 text-mem-black",
  "bg-mem-blue/15 text-mem-black",
];

function paletteFor(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return COVER_PALETTE[h % COVER_PALETTE.length]!;
}

export function ShowcaseProjectCard({
  project,
  persona = "aigc",
}: {
  project: ShowcaseProject;
  persona?: Persona;
}) {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDevTheme = persona === "dev";
  const isManga = project.category === "manga";
  const isVideo = Boolean(project.videoUrl || project.mediaType === "video");
  const palette = paletteFor(project.slug || project.title);
  const initial = (project.title || "?").trim().charAt(0).toUpperCase();
  const hasExternalLink = project.slug.startsWith("http");

  return (
    <>
      <article
        className={`group flex flex-col overflow-hidden transition-all ${
          isDevTheme
            ? "bg-slate-900/90 border border-slate-700/80 rounded-lg hover:border-sky-400 hover:-translate-y-1 text-slate-100"
            : "bg-white border-memphis shadow-memphis hover:shadow-memphis-sm hover:translate-x-[2px] hover:translate-y-[2px] text-mem-black"
        }`}
      >
        {/* 封面区 */}
        <div
          className={`relative h-52 overflow-hidden cursor-pointer ${
            isDevTheme ? "border-b border-slate-700/80 bg-slate-950" : "border-b-[3px] border-mem-black bg-cream"
          }`}
          onClick={() => setModalOpen(true)}
        >
          {project.mediaUrl && !imgError ? (
            <img
              src={project.mediaUrl}
              alt={project.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full ${palette.bg} flex items-center justify-center relative`}>
              <div className="w-full h-full bg-polka opacity-20 absolute inset-0" />
              <span className={`font-display text-6xl ${palette.accent} relative`}>{initial}</span>
            </div>
          )}

          {/* 左上角标 */}
          <span
            className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-xs ${
              isDevTheme
                ? `font-mono-tech rounded border ${
                    isManga
                      ? "bg-rose-500/90 border-rose-300/40 text-white"
                      : "bg-sky-500/90 border-sky-300/40 text-slate-950 font-bold"
                  }`
                : `font-display border-memphis shadow-memphis-sm ${
                    isManga ? "bg-mem-red text-white" : "bg-mem-blue text-white"
                  }`
            }`}
          >
            {isManga ? "漫剧作品" : "全栈工程"}
          </span>

          {/* 右上角标（视频优先提示，其次精选） */}
          {(isVideo || project.featured) && (
            <span
              className={`absolute top-2.5 right-2.5 px-2.5 py-1 text-xs ${
                isDevTheme
                  ? "font-mono-tech rounded bg-slate-950/90 text-cyan-300 border border-cyan-400/50"
                  : "font-display bg-mem-yellow text-mem-black border-memphis shadow-memphis-sm"
              }`}
            >
              {isVideo ? "▶ 视频作品" : "★ 精选"}
            </span>
          )}
        </div>

        {/* 内容区 */}
        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3
              className={`text-lg tracking-tight leading-snug mb-1.5 ${
                isDevTheme ? "font-bold text-slate-50" : "font-display text-xl text-mem-black"
              }`}
            >
              {project.title}
            </h3>
            <p className={`text-sm mb-3 leading-relaxed ${isDevTheme ? "text-slate-300" : "font-body text-mem-black/75"}`}>
              {project.tagline}
            </p>

            <div
              className={`space-y-1.5 text-xs p-3 ${
                isDevTheme
                  ? "bg-slate-950/80 border border-slate-800 rounded text-slate-300 font-mono-tech"
                  : "bg-cream border-memphis font-body text-mem-black/80"
              }`}
            >
              <p>
                <span className={isDevTheme ? "text-sky-400 font-semibold" : "font-display text-mem-black"}>角色：</span>
                {project.role}
              </p>
              <p>
                <span className={isDevTheme ? "text-sky-400 font-semibold" : "font-display text-mem-black"}>规模：</span>
                {project.episodes} · {project.team}
              </p>
              <p>
                <span className={isDevTheme ? "text-sky-400 font-semibold" : "font-display text-mem-black"}>成果：</span>
                {project.result}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 text-[11px] ${
                    isDevTheme
                      ? "font-mono-tech rounded bg-slate-800 text-cyan-300 border border-slate-700"
                      : `font-display border-memphis ${TAG_COLORS[i % TAG_COLORS.length]}`
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className={`px-2.5 py-1 text-xs cursor-pointer transition-colors ${
                  isDevTheme
                    ? "font-mono-tech rounded bg-sky-500/20 text-sky-300 border border-sky-400/50 hover:bg-sky-500 hover:text-slate-950"
                    : "font-display bg-mem-yellow text-mem-black border-memphis hover:bg-mem-red hover:text-white"
                }`}
              >
                {isVideo ? "▶ 播放" : "详情"}
              </button>
              {hasExternalLink && (
                <a
                  href={project.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-2.5 py-1 text-xs transition-colors ${
                    isDevTheme
                      ? "font-mono-tech rounded bg-slate-800 text-slate-200 border border-slate-600 hover:border-sky-400"
                      : "font-display bg-mem-black text-white border-memphis hover:bg-mem-red"
                  }`}
                >
                  原片 ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* 详情 / 视频预览弹窗（预留 OSS + CDN 视频播放） */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 ${
              isDevTheme
                ? "bg-slate-900 border border-sky-400/60 rounded-xl text-slate-100"
                : "bg-cream border-memphis-thick shadow-memphis-lg text-mem-black"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h4 className={`text-xl sm:text-2xl ${isDevTheme ? "font-bold text-white" : "font-display"}`}>
                  {project.title}
                </h4>
                <p className={`text-sm mt-1 ${isDevTheme ? "text-slate-300" : "text-mem-black/75"}`}>{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className={`px-3 py-1 text-xs cursor-pointer ${
                  isDevTheme
                    ? "rounded bg-slate-800 border border-slate-600 text-slate-200 hover:border-sky-400"
                    : "font-display bg-white border-memphis shadow-memphis-sm"
                }`}
              >
                关闭 ✕
              </button>
            </div>

            <div className={`mb-4 overflow-hidden ${isDevTheme ? "rounded-lg border border-slate-700 bg-black" : "border-memphis bg-white"}`}>
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  poster={project.posterUrl || project.mediaUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[380px] object-contain bg-black"
                />
              ) : (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  className="w-full max-h-[380px] object-contain bg-black/5"
                />
              )}
            </div>

            <div
              className={`p-4 text-sm space-y-2 ${
                isDevTheme
                  ? "bg-slate-950 border border-slate-800 rounded font-mono-tech text-slate-200"
                  : "bg-white border-memphis font-body"
              }`}
            >
              <p>
                <strong>承担角色：</strong>
                {project.role}
              </p>
              <p>
                <strong>项目规模：</strong>
                {project.episodes} · {project.team}
              </p>
              <p>
                <strong>交付成果：</strong>
                {project.result}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 text-xs ${
                      isDevTheme
                        ? "font-mono-tech rounded bg-slate-800 text-cyan-300 border border-slate-700"
                        : "font-display bg-mem-yellow border-memphis"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {hasExternalLink && (
                <a
                  href={project.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 text-xs ${
                    isDevTheme
                      ? "font-mono-tech rounded bg-sky-500 text-slate-950 font-bold"
                      : "font-display bg-mem-red text-white border-memphis shadow-memphis-sm"
                  }`}
                >
                  打开外部原片链接 ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
