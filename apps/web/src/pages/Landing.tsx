import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePersona } from "../components/PersonaContext.js";
import { AigcMagazineCover, DevArchitectureBlueprint, DevProductStage } from "../components/HeroShowcases.js";
import { ShowcaseProjectModal } from "../components/ShowcaseProjectCard.js";
import {
  PERSONA_HOME_COPY,
  SHOWCASE_PROFILE,
  SHOWCASE_PROJECTS,
  SHOWCASE_TIMELINE,
  type ShowcaseProject,
} from "../data/showcase.js";
import { IconArrowRight, IconMail } from "../components/Icons.js";

export function Landing() {
  const { persona, setPersona } = usePersona();
  const isDev = persona === "dev";
  const copy = PERSONA_HOME_COPY[persona];
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [avatarErr, setAvatarErr] = useState(false);

  // AIGC 封面换刊大片：2 部高颜值纯剧照大片 + 2 张定制艺术大片组成 4 帧对称目录
  const aigcCoverProjects = useMemo(() => {
    const order = [4, 3];
    return order
      .map((id) => SHOWCASE_PROJECTS.find((p) => p.id === id))
      .filter((p): p is ShowcaseProject => Boolean(p));
  }, []);

  const aigcCustomFrames = useMemo(
    () => [
      {
        key: "editorial-01",
        label: "东方光影",
        subLabel: "EDITORIAL",
        imageUrl: "/cover-aigc-editorial.jpg",
        cornerTag: "01 / COVER STORY · EDITORIAL",
      },
      {
        key: "pipeline-02",
        label: "胶片产线",
        subLabel: "CINEMA REEL",
        imageUrl: "/cover-aigc-pipeline.jpg",
        cornerTag: "02 / PIPELINE · 35MM FILM",
      },
    ],
    []
  );

  // 全栈首屏真机展台：工程类项目
  const devStageProjects = useMemo(
    () => SHOWCASE_PROJECTS.filter((p) => p.category === "dev"),
    []
  );

  // 重点项目区（杂志跨页深度策展）：精选 3 个镇馆大作（全栈模式纯工程 100%）
  const curatedProjects = useMemo(() => {
    const order = isDev ? [7, 10, 8] : [1, 7, 4];
    return order
      .map((id) => SHOWCASE_PROJECTS.find((p) => p.id === id))
      .filter((p): p is ShowcaseProject => Boolean(p));
  }, [isDev]);

  const personaSwitcher = (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`font-mono-tech text-[11px] tracking-widest uppercase ${
          isDev ? "text-zinc-500" : "text-ink-muted"
        }`}
      >
        PERSPECTIVE
      </span>
      <div
        className={`inline-flex p-0.5 border text-xs ${
          isDev ? "border-white/15 bg-black/55" : "border-hairline bg-paper-alt/80"
        }`}
      >
        <button
          type="button"
          onClick={() => setPersona("aigc")}
          className={`px-3 py-1 transition-colors cursor-pointer ${
            !isDev ? "bg-ink text-paper font-medium" : "text-zinc-400 hover:text-white"
          }`}
        >
          AIGC 漫剧制片
        </button>
        <button
          type="button"
          onClick={() => setPersona("dev")}
          className={`px-3 py-1 font-mono-tech transition-colors cursor-pointer ${
            isDev ? "bg-white text-black font-medium" : "text-ink-muted hover:text-ink"
          }`}
        >
          全栈开发工程师
        </button>
      </div>
    </div>
  );

  return (
    <div className={isDev ? "bg-obsidian text-zinc-100" : "bg-paper text-ink"}>
      {/* ========== 1. 双模式强反差首屏 ========== */}
      {!isDev ? (
        /* AIGC 模式：《VOGUE / GQ》大刊封面风 */
        <section className="relative overflow-hidden border-b border-hairline bg-paper-grain">
          <AigcMagazineCover
            coverProjects={aigcCoverProjects}
            customCoverFrames={aigcCustomFrames}
            badge={copy.badge}
            headlineTop={copy.headlineTop}
            headlineAccent={copy.headlineAccent}
            lead={copy.lead}
            personaSwitcher={personaSwitcher}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </section>
      ) : (
        /* 全栈开发模式：深空蓝黑双视图硬核工作台 */
        <section className="relative overflow-hidden border-b border-blue-400/15 bg-obsidian-glow">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-14 sm:pt-8 sm:pb-20 lg:pb-24">
            {/* 极客命令行状态标头（替代重复切换按钮） */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-10 border-b border-blue-400/15 font-mono-tech text-[11px]">
              <span className="text-slate-400">
                <span className="text-electric">~/subming/engineering</span>
                <span className="hidden sm:inline"> · TS / NEXT / NEST / VUE / PG / DOCKER</span>
              </span>
              <span className="inline-flex items-center gap-2 text-electric tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                OPEN_TO_WORK · HANGZHOU
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="md:col-span-5 animate-editorial-in">
                <p className="font-mono-tech text-xs tracking-widest uppercase text-electric mb-4">
                  {copy.badge}
                </p>

                <h1 className="text-[1.75rem] sm:text-4xl md:text-[2.05rem] lg:text-[2.85rem] xl:text-[3.25rem] font-semibold tracking-tight leading-[1.15] text-white mb-6">
                  <span className="block sm:whitespace-nowrap">{copy.headlineTop}</span>
                  <span className="block mt-2 text-[1.4rem] sm:text-2xl md:text-[1.5rem] lg:text-[2rem] font-normal text-slate-300 sm:whitespace-nowrap">
                    {copy.headlineAccent}
                  </span>
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-slate-400 mb-8 max-w-lg">
                  {copy.lead}
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-white text-black transition-opacity hover:opacity-85"
                  >
                    阅读完整简历 <IconArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/portfolio?cat=dev"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm border border-blue-400/30 text-slate-200 hover:border-blue-400 hover:text-white transition-colors"
                  >
                    工程作品集 ↗
                  </Link>
                </div>
              </div>

              <div className="md:col-span-7">
                <DevProductStage
                  projects={devStageProjects}
                  onSelectProject={(project) => setSelectedProject(project)}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== 2. 核心战绩横带 ========== */}
      <section
        className={`border-b ${
          isDev ? "border-white/10 bg-obsidian-card/45" : "border-hairline bg-paper-alt/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x ${
              isDev ? "divide-white/10" : "divide-hairline"
            }`}
          >
            {copy.highlights.map((item, idx) => (
              <div key={item.label} className="py-8 sm:py-9 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                <p
                  className={`font-mono-tech text-[11px] tracking-widest mb-2.5 ${
                    isDev ? "text-electric" : "text-vermilion"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")} / {item.label}
                </p>
                <p
                  className={`text-3xl sm:text-[2.25rem] tracking-tight leading-none mb-2 ${
                    isDev
                      ? "font-mono-tech text-white font-semibold"
                      : "font-editorial text-ink font-semibold"
                  }`}
                >
                  {item.value}
                </p>
                <p className={`text-xs leading-relaxed ${isDev ? "text-zinc-400" : "text-ink-muted"}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. 重点项目区（3 个镇馆大作 · 左右交替杂志跨页深度策展） ========== */}
      <section className={`py-20 sm:py-28 border-b ${isDev ? "border-white/10" : "border-hairline"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
            <div>
              <p
                className={`font-mono-tech text-xs tracking-widest uppercase mb-3 ${
                  isDev ? "text-electric" : "text-vermilion"
                }`}
              >
                CURATED SPREADS · SELECTED WORKS
              </p>
              <h2
                className={`text-3xl sm:text-5xl tracking-tight ${
                  isDev ? "font-semibold text-white" : "font-editorial font-semibold text-ink"
                }`}
              >
                {copy.featuredTitle}
              </h2>
              <p className={`mt-3 text-sm sm:text-base max-w-xl ${isDev ? "text-zinc-400" : "text-ink-muted"}`}>
                {copy.featuredSubtitle}
              </p>
            </div>

            <Link
              to="/portfolio"
              className={`inline-flex items-center gap-2 text-xs font-mono-tech underline underline-offset-4 shrink-0 transition-opacity hover:opacity-70 ${
                isDev ? "text-zinc-200" : "text-ink"
              }`}
            >
              进入完整作品集 ({SHOWCASE_PROJECTS.length}) <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {curatedProjects.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              const isManga = project.category === "manga";
              const isVideo = Boolean(project.videoUrl || project.mediaType === "video");
              const hasExternalLink = project.slug.startsWith("http");

              return (
                <article
                  key={project.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* 满出血大画幅视觉侧 */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div
                      onClick={() => setSelectedProject(project)}
                      className={`group relative aspect-[16/10] overflow-hidden cursor-pointer ${
                        isDev
                          ? "bg-obsidian-card border border-white/10 shadow-device-glow"
                          : "bg-paper-alt shadow-editorial"
                      }`}
                    >
                      {project.mediaUrl ? (
                        <img
                          src={project.mediaUrl}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      ) : project.architecture ? (
                        <DevArchitectureBlueprint project={project} />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-45 group-hover:opacity-75 transition-opacity duration-500" />
                      <span
                        className={`absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono-tech tracking-widest backdrop-blur-md ${
                          isDev
                            ? "bg-black/65 text-zinc-200 border border-white/15"
                            : "bg-paper/90 text-ink"
                        }`}
                      >
                        {isManga ? "AIGC DRAMA" : "ENGINEERING"}
                      </span>
                      <span className="absolute bottom-4 right-4 px-3 py-1.5 text-[11px] font-mono-tech bg-black/60 text-white backdrop-blur-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {isVideo ? "▶ 播放成片" : "放大预览 ↗"}
                      </span>
                    </div>
                  </div>

                  {/* 充裕留白战绩解说侧 */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"} space-y-5`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span
                        className={`font-mono-tech text-5xl sm:text-6xl font-light tracking-tighter leading-none select-none ${
                          isDev ? "text-white/15" : "text-ink/15"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-mono-tech text-xs tracking-wider ${
                          isDev ? "text-electric" : "text-vermilion"
                        }`}
                      >
                        {project.role}
                      </span>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className={`text-2xl sm:text-3xl tracking-tight leading-snug mb-2.5 cursor-pointer hover:opacity-80 transition-opacity ${
                          isDev ? "font-semibold text-white" : "font-editorial font-semibold text-ink"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className={`text-sm sm:text-base leading-relaxed ${isDev ? "text-zinc-400" : "text-ink-muted"}`}>
                        {project.tagline}
                      </p>
                    </div>

                    <div
                      className={`p-4 sm:p-5 border-l-2 space-y-2 text-xs sm:text-sm ${
                        isDev
                          ? "border-electric/80 bg-obsidian-card/70 text-zinc-300"
                          : "border-vermilion bg-paper-alt/65 text-ink"
                      }`}
                    >
                      <p>
                        <span className={`font-mono-tech text-[11px] mr-2 ${isDev ? "text-zinc-500" : "text-ink-muted"}`}>
                          SCALE
                        </span>
                        {project.episodes} · {project.team}
                      </p>
                      <p className="leading-relaxed">
                        <span className={`font-mono-tech text-[11px] mr-2 ${isDev ? "text-zinc-500" : "text-ink-muted"}`}>
                          RESULT
                        </span>
                        {project.result}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 text-[11px] font-mono-tech ${
                            isDev ? "bg-white/5 text-zinc-300" : "bg-paper-alt text-ink-muted"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-1 flex flex-wrap items-center gap-5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className={`text-xs font-mono-tech underline underline-offset-4 cursor-pointer transition-opacity hover:opacity-70 ${
                          isDev ? "text-white" : "text-ink"
                        }`}
                      >
                        {isVideo ? "▶ 播放成片" : "放大查看详情 ↗"}
                      </button>
                      {hasExternalLink && (
                        <a
                          href={project.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-mono-tech underline underline-offset-4 transition-opacity hover:opacity-70 ${
                            isDev ? "text-electric" : "text-vermilion"
                          }`}
                        >
                          原片链接 ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* 跨栏引流至完整作品集 */}
          <div
            className={`mt-16 sm:mt-24 pt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDev ? "border-white/10" : "border-hairline"
            }`}
          >
            <p className={`text-sm ${isDev ? "text-zinc-400" : "text-ink-muted"}`}>
              首页仅精选 3 部代表作深度展开，更多漫剧资产与工程项目已归档至作品集。
            </p>
            <Link
              to="/portfolio"
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-mono-tech border transition-colors shrink-0 ${
                isDev
                  ? "border-white/25 text-white hover:bg-white hover:text-black"
                  : "border-ink text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              进入完整作品集 · 全部 {SHOWCASE_PROJECTS.length} 部作品 <IconArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 4. 杂志「人物专访」风（粘性个人肖像卡 + 大号年份视觉年表） ========== */}
      <section
        className={`py-20 sm:py-28 border-b ${
          isDev ? "border-white/10 bg-obsidian-card/30" : "border-hairline bg-paper-alt/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 左侧 4 列：个人肖像档案卡 */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p
                className={`font-mono-tech text-xs tracking-widest uppercase mb-3 ${
                  isDev ? "text-electric" : "text-vermilion"
                }`}
              >
                PROFILE · INTERVIEW
              </p>
              <h2
                className={`text-3xl sm:text-4xl tracking-tight mb-6 ${
                  isDev ? "font-semibold text-white" : "font-editorial font-semibold text-ink"
                }`}
              >
                关于我与成长脉络
              </h2>

              <div
                className={`p-3 sm:p-4 border mb-6 ${
                  isDev
                    ? "border-white/10 bg-obsidian-card shadow-device-glow"
                    : "border-hairline bg-paper shadow-editorial"
                }`}
              >
                <div className={`aspect-[4/5] overflow-hidden ${isDev ? "bg-black" : "bg-paper-alt"}`}>
                  {!avatarErr ? (
                    <img
                      src={SHOWCASE_PROFILE.avatarUrl}
                      alt={SHOWCASE_PROFILE.name}
                      onError={() => setAvatarErr(true)}
                      className={`w-full h-full object-cover object-top transition-all duration-700 ${
                        isDev
                          ? "grayscale-[55%] contrast-110 hover:grayscale-0"
                          : "sepia-[10%] contrast-[1.03] hover:sepia-0"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-editorial text-5xl opacity-30">
                      {SHOWCASE_PROFILE.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="pt-3 flex items-center justify-between text-[11px] font-mono-tech">
                  <span className={isDev ? "text-zinc-200" : "text-ink"}>{SHOWCASE_PROFILE.name}</span>
                  <span className={isDev ? "text-zinc-500" : "text-ink-muted"}>
                    {SHOWCASE_PROFILE.location} · 1999 / 2026
                  </span>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${isDev ? "text-zinc-300" : "text-ink/85"}`}>
                {SHOWCASE_PROFILE.bioShort}
              </p>

              <Link
                to="/resume"
                className={`inline-flex items-center gap-2 text-xs font-mono-tech underline underline-offset-4 transition-opacity hover:opacity-70 ${
                  isDev ? "text-white" : "text-ink"
                }`}
              >
                阅读完整正式简历与资质 <IconArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 右侧 8 列：大号年份视觉年表 */}
            <div className="lg:col-span-8">
              <div
                className={`border-t divide-y ${
                  isDev ? "border-white/10 divide-white/10" : "border-hairline divide-hairline"
                }`}
              >
                {SHOWCASE_TIMELINE.map((item) => {
                  const startYear = item.period.slice(0, 4);
                  return (
                    <div
                      key={item.period}
                      className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start"
                    >
                      <div className="sm:col-span-4">
                        <span
                          className={`block text-4xl sm:text-5xl font-light tracking-tighter leading-none mb-2 select-none ${
                            isDev
                              ? "font-mono-tech text-white/25"
                              : "font-editorial text-ink/20"
                          }`}
                        >
                          {startYear}
                        </span>
                        <span
                          className={`font-mono-tech text-xs ${
                            isDev ? "text-zinc-400" : "text-ink-muted"
                          }`}
                        >
                          {item.period}
                        </span>
                      </div>

                      <div className="sm:col-span-8 space-y-2.5">
                        <h3
                          className={`text-xl sm:text-2xl ${
                            isDev ? "font-semibold text-white" : "font-editorial font-semibold text-ink"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm ${
                            isDev ? "font-mono-tech text-electric" : "text-vermilion font-medium"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                        <p className={`text-sm leading-relaxed ${isDev ? "text-zinc-400" : "text-ink-muted"}`}>
                          {item.description}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 text-[11px] font-mono-tech ${
                                isDev ? "bg-white/5 text-zinc-400" : "bg-paper-alt text-ink-muted"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. 高反差收尾联系区 ========== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div
            className={`relative overflow-hidden px-6 py-14 sm:px-14 sm:py-20 text-center ${
              isDev
                ? "bg-obsidian-card border border-blue-400/20 shadow-device-glow text-white"
                : "bg-ink text-paper shadow-editorial"
            }`}
          >
            {isDev ? (
              <>
                <img
                  src="/bg-dev-atmosphere.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-55"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B14]/88 via-[#070B14]/55 to-[#070B14]/72"
                  aria-hidden
                />
              </>
            ) : (
              <>
                <img
                  src="/bg-aigc-atmosphere.jpg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-45"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141413]/90 via-[#141413]/58 to-[#141413]/75"
                  aria-hidden
                />
              </>
            )}

            <div className="relative z-10">
              <p
                className={`font-mono-tech text-xs tracking-widest uppercase mb-4 ${
                  isDev ? "text-electric" : "text-vermilion"
                }`}
              >
                GET IN TOUCH
              </p>
              <h2
                className={`text-3xl sm:text-5xl tracking-tight leading-tight max-w-3xl mx-auto mb-5 ${
                  isDev ? "font-semibold text-white" : "font-editorial font-semibold text-paper"
                }`}
              >
                {copy.ctaTitle}
              </h2>
              <p
                className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 ${
                  isDev ? "text-zinc-300" : "text-paper/75"
                }`}
              >
                {copy.ctaDesc}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/resume"
                  className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-85 ${
                    isDev ? "bg-white text-black" : "bg-paper text-ink"
                  }`}
                >
                  查看正式简历 <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm border transition-colors ${
                    isDev
                      ? "border-blue-400/35 text-zinc-100 hover:border-white"
                      : "border-paper/30 text-paper hover:border-paper"
                  }`}
                >
                  浏览作品集
                </Link>
                <a
                  href={`mailto:${SHOWCASE_PROFILE.email}`}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm border transition-colors ${
                    isDev
                      ? "border-blue-400/35 text-zinc-100 hover:border-white"
                      : "border-paper/30 text-paper hover:border-paper"
                  }`}
                >
                  <IconMail className="w-4 h-4" /> {SHOWCASE_PROFILE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ShowcaseProjectModal
          project={selectedProject}
          persona={persona}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
