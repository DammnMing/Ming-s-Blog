import { useEffect, useState } from "react";
import type { Persona } from "./PersonaContext.js";
import type { ShowcaseProject } from "../data/showcase.js";
import { DevArchitectureBlueprint } from "./HeroShowcases.js";

/**
 * 可复用作品详情 / 视频播放弹窗（支持 ESC 关闭，预留 OSS + CDN 视频播放）
 */
export function ShowcaseProjectModal({
  project,
  persona = "aigc",
  onClose,
}: {
  project: ShowcaseProject;
  persona?: Persona;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isDevTheme = persona === "dev";
  const isManga = project.category === "manga";
  const hasExternalLink = project.slug.startsWith("http");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/82 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-9 border transition-all ${
          isDevTheme
            ? "bg-obsidian border-white/15 text-zinc-100 shadow-device-glow"
            : "bg-paper border-hairline text-ink shadow-editorial"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p
              className={`font-mono-tech text-xs tracking-wider uppercase mb-2 ${
                isDevTheme ? "text-electric" : "text-vermilion"
              }`}
            >
              {isManga ? "AIGC DRAMA" : "ENGINEERING"} · {project.role}
            </p>
            <h4 className={`text-2xl sm:text-3xl tracking-tight ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold"}`}>
              {project.title}
            </h4>
            <p className={`text-sm sm:text-base mt-1.5 ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
              {project.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`px-3.5 py-1.5 text-xs font-mono-tech border cursor-pointer shrink-0 transition-colors ${
              isDevTheme
                ? "border-white/15 text-zinc-300 hover:border-white/50 hover:text-white"
                : "border-hairline text-ink hover:border-ink"
            }`}
          >
            ESC / 关闭
          </button>
        </div>

        <div
          className={`mb-6 overflow-hidden ${
            isDevTheme ? "bg-black border border-white/10" : "bg-paper-alt border border-hairline"
          }`}
        >
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.posterUrl || project.mediaUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[460px] object-contain bg-black"
            />
          ) : project.mediaUrl && !imgError ? (
            <img
              src={project.mediaUrl}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full max-h-[460px] object-contain"
            />
          ) : project.architecture ? (
            <DevArchitectureBlueprint project={project} />
          ) : (
            <div className="h-64 flex items-center justify-center font-editorial text-4xl opacity-30">
              {(project.title || "?").trim().charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div
          className={`p-5 border text-sm space-y-2.5 ${
            isDevTheme
              ? "border-white/10 bg-obsidian-card text-zinc-300"
              : "border-hairline bg-paper-alt/65 text-ink"
          }`}
        >
          <p>
            <span className="font-mono-tech text-xs opacity-55 mr-2.5">ROLE</span>
            {project.role}
          </p>
          <p>
            <span className="font-mono-tech text-xs opacity-55 mr-2.5">SCALE</span>
            {project.episodes} · {project.team}
          </p>
          <p className="leading-relaxed">
            <span className="font-mono-tech text-xs opacity-55 mr-2.5">RESULT</span>
            {project.result}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-mono-tech border ${
                  isDevTheme
                    ? "border-white/10 text-zinc-400 bg-black/30"
                    : "border-hairline text-ink-muted bg-paper-alt/50"
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
              className={`px-4 py-2 text-xs font-mono-tech transition-opacity hover:opacity-85 ${
                isDevTheme ? "bg-white text-black font-medium" : "bg-ink text-paper"
              }`}
            >
              打开原片链接 ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ShowcaseProjectCard({
  project,
  persona = "aigc",
  indexLabel,
  featuredLarge = false,
}: {
  project: ShowcaseProject;
  persona?: Persona;
  indexLabel?: string;
  featuredLarge?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDevTheme = persona === "dev";
  const isManga = project.category === "manga";
  const isVideo = Boolean(project.videoUrl || project.mediaType === "video");
  const initial = (project.title || "?").trim().charAt(0).toUpperCase();
  const hasExternalLink = project.slug.startsWith("http");

  const cardBase = isDevTheme
    ? "bg-obsidian-card/85 border-t border-white/15 hover:bg-obsidian-card hover:shadow-device-glow text-zinc-100"
    : "bg-paper-alt/45 hover:bg-paper hover:shadow-editorial text-ink";

  const mediaBox = (
    <div
      className={`relative overflow-hidden cursor-pointer ${
        featuredLarge ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[16/10]"
      } ${isDevTheme ? "bg-black/70" : "bg-paper-alt"}`}
      onClick={() => setModalOpen(true)}
    >
      {project.mediaUrl && !imgError ? (
        <img
          src={project.mediaUrl}
          alt={project.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
      ) : project.architecture ? (
        <DevArchitectureBlueprint project={project} compact />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className={`text-5xl font-editorial opacity-30 ${isDevTheme ? "text-zinc-400" : "text-ink"}`}>
            {initial}
          </span>
        </div>
      )}

      {/* 底部柔和暗角渐变与悬停提示 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

      {/* 左上极简角标 */}
      <span
        className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono-tech tracking-widest backdrop-blur-md ${
          isDevTheme
            ? "bg-black/65 text-zinc-200 border border-white/15"
            : "bg-paper/90 text-ink"
        }`}
      >
        {isManga ? "AIGC DRAMA" : "ENGINEERING"}
      </span>

      {isVideo && (
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono-tech tracking-wider backdrop-blur-md ${
            isDevTheme
              ? "bg-blue-500/20 text-electric border border-blue-400/40"
              : "bg-vermilion text-white"
          }`}
        >
          ▶ VIDEO
        </span>
      )}

      {/* 底部隐约浮现的查看详情提示 */}
      <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] font-mono-tech text-white/85 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span>{project.episodes}</span>
        <span>{isVideo ? "▶ 播放成片" : "放大预览 ↗"}</span>
      </div>
    </div>
  );

  const infoBox = (
    <div className={`flex flex-col justify-between gap-5 ${featuredLarge ? "p-6 sm:p-10" : "p-6 sm:p-7"}`}>
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          {indexLabel && (
            <span className={`font-mono-tech text-xs tracking-widest ${isDevTheme ? "text-electric" : "text-vermilion"}`}>
              {indexLabel}
            </span>
          )}
          <span className={`font-mono-tech text-[11px] ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
            {project.role}
          </span>
        </div>

        <h3
          className={`tracking-tight leading-snug mb-2 cursor-pointer ${
            featuredLarge ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          } ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold text-ink"}`}
          onClick={() => setModalOpen(true)}
        >
          {project.title}
        </h3>

        <p className={`text-sm leading-relaxed mb-4 ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
          {project.tagline}
        </p>

        <div
          className={`pt-3 border-t space-y-1.5 text-xs ${
            isDevTheme ? "border-white/10 text-zinc-300" : "border-hairline/80 text-ink/85"
          }`}
        >
          <p>
            <span className={`font-mono-tech mr-2 ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>SCALE</span>
            {project.episodes} · {project.team}
          </p>
          <p className="leading-relaxed line-clamp-2">
            <span className={`font-mono-tech mr-2 ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>RESULT</span>
            {project.result}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, featuredLarge ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[11px] font-mono-tech ${
                isDevTheme ? "bg-white/5 text-zinc-400" : "bg-paper-alt text-ink-muted"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={`text-xs font-mono-tech underline underline-offset-4 cursor-pointer transition-opacity hover:opacity-70 ${
              isDevTheme ? "text-white" : "text-ink"
            }`}
          >
            {isVideo ? "▶ 播放" : "查看详情 ↗"}
          </button>
          {hasExternalLink && (
            <a
              href={project.slug}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-mono-tech underline underline-offset-4 transition-opacity hover:opacity-70 ${
                isDevTheme ? "text-electric" : "text-vermilion"
              }`}
            >
              原片 ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {featuredLarge ? (
        <article className={`group grid grid-cols-1 lg:grid-cols-12 overflow-hidden transition-all duration-500 ${cardBase}`}>
          <div className="lg:col-span-7">{mediaBox}</div>
          <div className="lg:col-span-5 flex flex-col justify-center">{infoBox}</div>
        </article>
      ) : (
        <article className={`group flex flex-col overflow-hidden transition-all duration-500 ${cardBase}`}>
          <div>{mediaBox}</div>
          <div className="flex-1 flex flex-col">{infoBox}</div>
        </article>
      )}

      {modalOpen && (
        <ShowcaseProjectModal project={project} persona={persona} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
