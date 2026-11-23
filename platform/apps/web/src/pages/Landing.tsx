import { useMemo } from "react";
import { Link } from "react-router-dom";
import { usePersona } from "../components/PersonaContext.js";
import {
  PERSONA_HOME_COPY,
  SHOWCASE_PROFILE,
  SHOWCASE_PROJECTS,
  SHOWCASE_TIMELINE,
} from "../data/showcase.js";
import { ShowcaseProjectCard } from "../components/ShowcaseProjectCard.js";
import {
  DecorDots,
  DecorOutlineCircle,
  DecorSolidCircle,
  DecorSolidSquare,
  DecorStripes,
  DecorTriangle,
  IconArrowRight,
  IconMail,
  MemphisDecor,
  SectionTitle,
} from "../components/MemphisDecor.js";

const NAME_PALETTE = ["text-mem-red", "text-mem-blue", "text-mem-black", "text-mem-purple"];
const HIGHLIGHT_STYLES = [
  { bg: "bg-mem-red", fg: "text-white", rot: "-1.2deg" },
  { bg: "bg-mem-blue", fg: "text-white", rot: "0.8deg" },
  { bg: "bg-mem-yellow", fg: "text-mem-black", rot: "-0.5deg" },
  { bg: "bg-mem-green", fg: "text-mem-black", rot: "1.5deg" },
];

export function Landing() {
  const { persona, setPersona } = usePersona();
  const isDev = persona === "dev";
  const copy = PERSONA_HOME_COPY[persona];

  // 根据当前身份智能排序精选作品（最多展示 4 个）
  const featuredProjects = useMemo(() => {
    const featured = SHOWCASE_PROJECTS.filter((p) => p.featured);
    if (!isDev) return featured;
    return [...featured].sort((a, b) => (a.category === "dev" ? -1 : 1) - (b.category === "dev" ? -1 : 1));
  }, [isDev]);

  return (
    <div>
      {/* ========== 1. Hero 首屏（一人双能 · 双风格即时切换） ========== */}
      {isDev ? (
        <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-[#0B1120] border-b border-slate-800 text-slate-100">
          <div className="absolute inset-0 bg-dev-grid pointer-events-none" />
          <div className="absolute inset-0 dev-glow pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
            {/* 一人双能切换条 */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="font-mono-tech text-xs text-slate-400">一人双能 · 点击切换视角与风格：</span>
              <div className="inline-flex p-1 bg-slate-900 border border-slate-700 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPersona("aigc")}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
                >
                  ✦ AIGC 漫剧制片人
                </button>
                <button
                  type="button"
                  onClick={() => setPersona("dev")}
                  className="px-3.5 py-1.5 text-xs font-mono-tech font-bold bg-sky-500 text-slate-950 rounded cursor-pointer"
                >
                  &lt;/&gt; 全栈开发工程师
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 animate-mem-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-sky-400/40 font-mono-tech text-xs text-sky-300 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {copy.badge}
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-[1.05] mb-5">
                  {copy.headlineTop}
                  <span className="block mt-3 text-3xl sm:text-5xl bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    {copy.headlineAccent}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">{copy.lead}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-sky-500 text-slate-950 font-bold text-base hover:bg-sky-400 transition-colors"
                  >
                    查看正式简历 <IconArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 text-slate-100 border border-slate-700 hover:border-sky-400 font-semibold text-base transition-colors"
                  >
                    浏览全部作品集
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
                  {copy.highlights.map((h) => (
                    <div key={h.label} className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 transition-colors">
                      <p className="font-mono-tech text-xl sm:text-2xl font-bold text-sky-300">{h.value}</p>
                      <p className="mt-1.5 text-xs font-bold text-white">{h.label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧极客终端卡片 */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="rounded-xl bg-slate-950 border border-slate-700/90 shadow-2xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="font-mono-tech text-xs text-slate-400">subming@hangzhou:~/profile</span>
                  </div>
                  <div className="p-5 font-mono-tech text-xs sm:text-sm space-y-3 text-slate-300 leading-relaxed">
                    <p>
                      <span className="text-emerald-400">$</span> cat stack.json
                    </p>
                    <pre className="text-sky-300 overflow-x-auto">{`{
  "frontend": ["React 19", "Next.js 16", "TS"],
  "backend":  ["Node.js", "Hono", "PostgreSQL"],
  "infra":    ["Redis Worker", "Docker", "Nginx"],
  "ai":       ["Seedance", "Multi-Agent", "LLM"],
  "impact":   "30人在线生产 / 成本降低 ~30%"
}`}</pre>
                    <p className="pt-2 border-t border-slate-800 text-slate-400">
                      <span className="text-emerald-400">$</span> status:{" "}
                      <span className="text-emerald-300">Open to Full-Stack / AI App</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-cream border-b-[3px] border-mem-black">
          <div className="absolute inset-0 bg-mem-grid opacity-60 pointer-events-none" />
          <DecorDots className="absolute top-0 right-0 w-[45%] h-[55%] opacity-60" color="mem-purple" size={4} gap={22} />
          <div className="absolute bottom-0 left-0 w-[38%] h-[40%] pointer-events-none opacity-30 overflow-hidden">
            <DecorStripes color="mem-orange" thickness={5} gap={14} angle={-30} className="w-full h-full" />
          </div>

          <DecorSolidSquare className="absolute top-14 left-6 sm:top-20 sm:left-14 w-10 h-10 sm:w-14 sm:h-14 hidden sm:block" color="mem-red" />
          <DecorSolidCircle className="absolute top-36 left-20 sm:top-44 sm:left-36 w-6 h-6 sm:w-8 sm:h-8 hidden sm:block" color="mem-yellow" />
          <DecorOutlineCircle className="absolute top-24 right-14 w-24 h-24 sm:w-32 sm:h-32 hidden md:block" color="mem-black" />
          <DecorTriangle className="absolute bottom-32 right-28 sm:bottom-40 sm:right-44 hidden md:block" color="mem-green" rotate={-18} />
          <DecorSolidCircle className="absolute bottom-16 right-14 w-12 h-12 sm:w-16 sm:h-16 hidden md:block" color="mem-blue" />
          <MemphisDecor className="absolute inset-0 pointer-events-none hidden lg:block" seed={42} density="normal" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
            {/* 一人双能切换条 */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span className="font-display text-xs text-mem-black/75">一人双能 · 点击切换视角与风格：</span>
              <div className="inline-flex p-1 bg-white border-memphis shadow-memphis-sm">
                <button
                  type="button"
                  onClick={() => setPersona("aigc")}
                  className="px-3.5 py-1.5 text-xs font-display bg-mem-red text-white cursor-pointer"
                >
                  ✦ AIGC 漫剧制片人
                </button>
                <button
                  type="button"
                  onClick={() => setPersona("dev")}
                  className="px-3.5 py-1.5 text-xs font-display text-mem-black hover:bg-mem-yellow cursor-pointer transition-colors"
                >
                  &lt;/&gt; 全栈开发工程师
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 animate-mem-in">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-mem-yellow border-memphis shadow-memphis-sm mb-6">
                  <span className="w-2.5 h-2.5 bg-mem-red rounded-full border-memphis animate-pulse" />
                  <span className="font-display tracking-wider text-xs sm:text-sm text-mem-black">{copy.badge}</span>
                </div>

                <h1 className="font-display tracking-tighter leading-[0.98] text-5xl sm:text-7xl lg:text-[5.5rem] text-mem-black mb-6">
                  <span className="block">
                    {copy.headlineTop.split("").map((ch, i) => (
                      <span key={i} className={`inline-block ${NAME_PALETTE[i % NAME_PALETTE.length]}`}>
                        {ch}
                      </span>
                    ))}
                  </span>
                  <span className="block mt-2">
                    <span className="marker-yellow">{copy.headlineAccent}</span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg font-body text-mem-black/85 max-w-2xl mb-9 leading-relaxed">
                  {copy.lead}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-mem-red text-white font-display text-base sm:text-lg border-memphis shadow-memphis hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                  >
                    查看正式简历 <IconArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-mem-blue font-display text-base sm:text-lg border-memphis shadow-memphis hover:bg-mem-yellow hover:text-mem-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                  >
                    浏览全部作品集 ↘
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl">
                  {copy.highlights.map((h, i) => {
                    const st = HIGHLIGHT_STYLES[i % HIGHLIGHT_STYLES.length]!;
                    return (
                      <div
                        key={h.label}
                        className={`p-3 sm:p-4 border-memphis shadow-memphis relative overflow-hidden transition-transform hover:rotate-0 ${st.bg}`}
                        style={{ transform: `rotate(${st.rot})` }}
                      >
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-memphis bg-white/90" />
                        <p className={`font-display text-xl sm:text-2xl ${st.fg}`}>{h.value}</p>
                        <p className={`mt-2 font-display tracking-tight text-xs sm:text-sm ${st.fg}`}>{h.label}</p>
                        <p className={`mt-0.5 font-body text-[11px] opacity-85 leading-tight ${st.fg}`}>{h.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 右侧「漫 / 码」叠加旋转卡片 */}
              <div className="lg:col-span-4 relative h-[420px] hidden lg:block">
                <div
                  className="absolute top-0 right-0 w-[82%] h-[70%] bg-mem-yellow border-memphis-thick shadow-memphis-lg overflow-hidden transition-transform hover:rotate-2"
                  style={{ transform: "rotate(4deg)" }}
                >
                  <div className="w-full h-full bg-polka-red opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-8xl tracking-tighter text-mem-black" style={{ filter: "drop-shadow(4px 4px 0 #FFF)" }}>
                      漫
                    </span>
                  </div>
                  <DecorSolidSquare className="absolute -bottom-3 -left-3 w-14 h-14" color="mem-blue" />
                </div>

                <div
                  className="absolute bottom-0 left-0 w-[65%] h-[55%] bg-mem-green border-memphis-thick shadow-memphis-lg overflow-hidden transition-transform hover:-rotate-3"
                  style={{ transform: "rotate(-6deg)" }}
                >
                  <div className="w-full h-full bg-stripes-orange opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl tracking-tighter text-mem-black" style={{ filter: "drop-shadow(4px 4px 0 #FFF)" }}>
                      码
                    </span>
                  </div>
                  <DecorOutlineCircle className="absolute -top-4 -right-4 w-16 h-16 border-[3px] border-mem-black bg-white" color="mem-black" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== 2. 精选作品（随身份智能排序） ========== */}
      <section
        className={`relative py-16 sm:py-24 overflow-hidden ${
          isDev ? "bg-[#0F172A] border-b border-slate-800" : "bg-cream border-b-[3px] border-mem-black"
        }`}
      >
        {!isDev && <MemphisDecor className="absolute inset-0 pointer-events-none opacity-55" seed={5} density="sparse" />}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            {isDev ? (
              <div>
                <p className="font-mono-tech text-xs text-sky-400 mb-2">// FEATURED_PROJECTS</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">{copy.featuredTitle}</h2>
                <p className="mt-2 text-sm sm:text-base text-slate-400">{copy.featuredSubtitle}</p>
              </div>
            ) : (
              <SectionTitle title={copy.featuredTitle} subtitle={copy.featuredSubtitle} />
            )}

            <Link
              to="/portfolio"
              className={`inline-flex items-center gap-2 w-fit ${
                isDev
                  ? "px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-sm text-sky-300 font-mono-tech transition-colors"
                  : "group"
              }`}
            >
              {isDev ? (
                <>
                  查看全部 {SHOWCASE_PROJECTS.length} 个作品 <IconArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span className="font-display tracking-tight text-mem-black marker-yellow group-hover:marker-pink transition-all">
                    查看全部 {SHOWCASE_PROJECTS.length} 个作品
                  </span>
                  <span className="w-9 h-9 inline-flex items-center justify-center bg-mem-red text-white border-memphis shadow-memphis-sm group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                    <IconArrowRight className="w-4 h-4" />
                  </span>
                </>
              )}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <ShowcaseProjectCard key={project.id} project={project} persona={persona} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. 成长脉络简览（完整履历引导至 /resume） ========== */}
      <section
        className={`relative py-16 sm:py-24 overflow-hidden ${
          isDev ? "bg-[#0B1120] border-b border-slate-800" : "bg-cream-pink border-b-[3px] border-mem-black"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            {isDev ? (
              <div>
                <p className="font-mono-tech text-xs text-emerald-400 mb-2">// CAREER_TIMELINE</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">成长轨迹</h2>
                <p className="mt-2 text-sm text-slate-400">从电商到西藏武警，再到自学全栈与 9 个月两连升</p>
              </div>
            ) : (
              <SectionTitle title="成长轨迹" subtitle="从电商到西藏武警，再到自学全栈与 9 个月两连升" />
            )}

            <Link
              to="/resume"
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm w-fit ${
                isDev
                  ? "rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors"
                  : "bg-mem-yellow text-mem-black font-display border-memphis shadow-memphis-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              }`}
            >
              查看完整履历与资质 <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SHOWCASE_TIMELINE.map((item) => (
              <div
                key={item.period}
                className={`p-5 flex flex-col justify-between ${
                  isDev
                    ? "bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200"
                    : "bg-white border-memphis shadow-memphis text-mem-black"
                }`}
              >
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 text-xs mb-3 ${
                      isDev
                        ? "font-mono-tech rounded bg-slate-800 text-sky-300 border border-slate-700"
                        : "font-display bg-mem-yellow border-memphis"
                    }`}
                  >
                    {item.period}
                  </span>
                  <h3 className={`text-base mb-1 ${isDev ? "font-bold text-white" : "font-display"}`}>{item.title}</h3>
                  <p className={`text-xs mb-2.5 ${isDev ? "text-sky-400 font-mono-tech" : "font-display text-mem-blue"}`}>
                    {item.subtitle}
                  </p>
                  <p className={`text-xs leading-relaxed ${isDev ? "text-slate-400" : "font-body text-mem-black/80"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. 底部 CTA ========== */}
      {isDev ? (
        <section className="py-16 sm:py-20 bg-[#0F172A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 border border-sky-500/40 shadow-2xl">
              <p className="font-mono-tech text-xs text-sky-400 mb-3">$ ready --for=next-challenge</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">{copy.ctaTitle}</h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">{copy.ctaDesc}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors"
                >
                  查看正式简历 <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-600 hover:border-sky-400 font-semibold transition-colors"
                >
                  浏览作品集
                </Link>
                <a
                  href={`mailto:${SHOWCASE_PROFILE.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-950 text-sky-300 border border-slate-700 hover:border-sky-400 font-mono-tech text-sm transition-colors"
                >
                  <IconMail className="w-4 h-4" /> 发邮件联系
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-mem-grid opacity-40" />
          <div
            className="absolute inset-0 -skew-y-2"
            style={{ background: "linear-gradient(100deg, #FF3B30 0%, #FF3B30 55%, #007AFF 55%, #007AFF 100%)" }}
          />
          <DecorSolidSquare className="absolute top-8 left-10 w-12 h-12 hidden sm:block" color="mem-yellow" />
          <DecorOutlineCircle className="absolute bottom-8 right-10 w-20 h-20 hidden sm:block bg-white/30" color="mem-black" />
          <DecorSolidCircle className="absolute top-1/3 right-1/4 w-8 h-8 hidden sm:block" color="mem-green" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="p-8 sm:p-12 bg-cream border-memphis-thick shadow-memphis-lg">
              <h2 className="font-display tracking-tighter text-3xl sm:text-5xl text-mem-black mb-4 leading-tight">
                {copy.ctaTitle}
              </h2>
              <p className="font-body text-base sm:text-lg text-mem-black/75 max-w-2xl mx-auto mb-8">{copy.ctaDesc}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-mem-red text-white font-display text-base border-memphis shadow-memphis hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  查看正式简历 <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-mem-blue font-display text-base border-memphis shadow-memphis hover:bg-mem-yellow hover:text-mem-black hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  浏览作品集
                </Link>
                <a
                  href={`mailto:${SHOWCASE_PROFILE.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-mem-black text-white font-display text-base border-memphis shadow-memphis hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  <IconMail className="w-4 h-4" /> 发邮件联系
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
