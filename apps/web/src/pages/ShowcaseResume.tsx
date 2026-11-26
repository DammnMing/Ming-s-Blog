import { useState } from "react";
import { Link } from "react-router-dom";
import { usePersona } from "../components/PersonaContext.js";
import { PersonaSwitcher } from "../components/PersonaSwitcher.js";
import { SHOWCASE_PROFILE, SHOWCASE_RESUMES } from "../data/showcase.js";

export function ShowcaseResume() {
  const { persona } = usePersona();
  const [copied, setCopied] = useState(false);

  const isAigc = persona === "aigc";
  const isDevTheme = persona === "dev";
  const aigc = SHOWCASE_RESUMES.aigc;
  const dev = SHOWCASE_RESUMES.dev;
  const current = isAigc ? aigc : dev;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SHOWCASE_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const sectionTitleCls = `text-base sm:text-lg pb-2 mb-5 border-b flex items-center justify-between ${
    isDevTheme
      ? "border-white/10 text-white font-medium"
      : "border-hairline text-ink font-editorial font-semibold"
  }`;

  return (
    <div className="animate-editorial-in">
      {/* 顶部控制栏（不打印） */}
      <div className="mb-10 no-print">
        <p className={`font-mono-tech text-xs tracking-widest uppercase mb-3 ${isDevTheme ? "text-zinc-500" : "text-vermilion"}`}>
          CURRICULUM VITAE · PRINT READY
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className={`text-3xl sm:text-5xl tracking-tight ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold text-ink"}`}>
              正式个人简历
            </h1>
            <p className={`mt-2 text-sm ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
              支持双岗位独立视角切换；打印或导出 PDF 时自动转为纯白 A4 专业排版。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 岗位切换 */}
            <PersonaSwitcher variant="compact" />

            <button
              type="button"
              onClick={() => void handleCopyEmail()}
              className={`min-h-8 px-4 py-1.5 text-xs font-mono-tech border cursor-pointer transition-colors ${
                isDevTheme
                  ? "border-blue-400/25 text-slate-200 hover:border-blue-400/60 hover:text-white"
                  : "border-hairline text-ink hover:border-ink"
              }`}
            >
              {copied ? "已复制邮箱 ✓" : "复制邮箱"}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className={`min-h-8 px-4 py-1.5 text-xs font-mono-tech cursor-pointer transition-colors ${
                isDevTheme
                  ? "bg-electric text-white hover:bg-blue-400 font-medium"
                  : "bg-ink text-paper hover:opacity-85"
              }`}
            >
              打印 / 导出 A4 PDF
            </button>
          </div>
        </div>
      </div>

      {/* 简历出版物主体（.print-resume-sheet 强制纯白 A4 纸质排版） */}
      <div className="print-area">
        <article
          className={`print-resume-sheet border ${
            isDevTheme
              ? "bg-obsidian-card border-white/15 text-zinc-100"
              : "bg-white border-hairline text-ink"
          }`}
        >
          {/* 头部 */}
          <header className={`p-6 sm:p-10 border-b ${isDevTheme ? "border-white/10" : "border-hairline"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span
                  className={`print-accent-badge inline-block px-2.5 py-1 text-[11px] font-mono-tech tracking-wider mb-3 border ${
                    isDevTheme
                      ? "border-white/15 text-zinc-300 bg-black/40"
                      : "border-hairline text-vermilion bg-paper"
                  }`}
                >
                  {current.label}
                </span>
                <h2 className={`text-3xl sm:text-4xl tracking-tight ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold text-ink"}`}>
                  {SHOWCASE_PROFILE.name}
                </h2>
                <p className={`text-sm sm:text-base mt-1.5 ${isDevTheme ? "text-zinc-300" : "text-ink-muted"}`}>
                  {current.title}
                </p>
                <div className={`flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono-tech mt-4 ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
                  <span>LOC: {SHOWCASE_PROFILE.location}</span>
                  <span>EMAIL: {SHOWCASE_PROFILE.email}</span>
                  <span>GITHUB: {SHOWCASE_PROFILE.github}</span>
                </div>
              </div>

              {SHOWCASE_PROFILE.certPhotoUrl && (
                <img
                  src={SHOWCASE_PROFILE.certPhotoUrl}
                  alt={SHOWCASE_PROFILE.name}
                  className={`w-24 h-28 object-cover border shrink-0 ${
                    isDevTheme ? "border-white/15" : "border-hairline"
                  }`}
                />
              )}
            </div>
          </header>

          <div className="p-6 sm:p-10 space-y-10 resume-view">
            {/* 01 个人定位与量化亮点 */}
            <section className="resume-section">
              <h3 className={sectionTitleCls}>
                <span>01 / 个人定位与实战自述</span>
                <span className="font-mono-tech text-[11px] opacity-50">SUMMARY</span>
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${isDevTheme ? "text-zinc-300" : "text-ink/85"}`}>
                {current.summary}
              </p>
              <div className={`grid grid-cols-2 sm:grid-cols-4 border ${isDevTheme ? "border-white/10 divide-white/10" : "border-hairline divide-hairline"} divide-y sm:divide-y-0 sm:divide-x`}>
                {current.highlights.map((h) => (
                  <div key={h.label} className="p-4">
                    <p className={`text-lg sm:text-xl font-semibold ${isDevTheme ? "font-mono-tech text-white" : "font-editorial text-ink"}`}>
                      {h.value}
                    </p>
                    <p className="text-xs font-medium mt-1">{h.label}</p>
                    <p className={`text-[11px] mt-0.5 ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>{h.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 02 工作经历 */}
            <section className="resume-section">
              <h3 className={sectionTitleCls}>
                <span>02 / 工作经历</span>
                <span className="font-mono-tech text-[11px] opacity-50">EXPERIENCE</span>
              </h3>
              <div className="space-y-5">
                {current.workExperience.map((exp) => (
                  <div key={exp.company} className={`p-5 border ${isDevTheme ? "border-white/10 bg-black/30" : "border-hairline bg-paper/50"}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h4 className={`text-base ${isDevTheme ? "font-semibold text-white" : "font-editorial font-semibold text-ink"}`}>
                        {exp.company}
                      </h4>
                      <span className={`font-mono-tech text-xs ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm mb-3 ${isDevTheme ? "font-mono-tech text-electric" : "text-vermilion"}`}>
                      {exp.role}
                    </p>
                    <ul className={`list-disc pl-5 space-y-1.5 text-sm leading-relaxed ${isDevTheme ? "text-zinc-300" : "text-ink/85"}`}>
                      {exp.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 代表作品 / 核心工程 */}
            {isAigc ? (
              <>
                <section className="resume-section">
                  <div className={sectionTitleCls}>
                    <span>03 / 代表漫剧作品（累计 400+ 集）</span>
                    <Link to="/portfolio?cat=manga" className="no-print font-mono-tech text-xs underline underline-offset-4 text-vermilion">
                      查看作品集封面 ↗
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {aigc.works.map((w) => (
                      <div key={w.name} className="border border-hairline p-4 bg-paper/40">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-editorial font-semibold text-sm text-ink">{w.name}</span>
                          <span className="font-mono-tech text-[11px] text-ink-muted">{w.role}</span>
                        </div>
                        <p className="text-xs text-ink-muted leading-relaxed">{w.result}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="resume-section">
                  <h3 className={sectionTitleCls}>
                    <span>04 / 核心能力矩阵</span>
                    <span className="font-mono-tech text-[11px] opacity-50">CAPABILITIES</span>
                  </h3>
                  <div className="divide-y divide-hairline border-t border-b border-hairline">
                    {aigc.abilities.map((ab) => (
                      <div key={ab.item} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 text-sm">
                        <span className="font-medium text-ink shrink-0 sm:w-32">{ab.item}</span>
                        <span className="text-ink-muted">{ab.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="resume-section">
                  <div className={sectionTitleCls}>
                    <span>03 / 核心工程项目</span>
                    <Link to="/portfolio?cat=dev" className="no-print font-mono-tech text-xs underline underline-offset-4 text-zinc-300 hover:text-white">
                      查看工程作品集 ↗
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {dev.projects.map((proj) => (
                      <div key={proj.name} className="border border-white/10 bg-black/30 p-5">
                        <h4 className="font-semibold text-base text-white">{proj.name}</h4>
                        <p className="font-mono-tech text-xs text-zinc-400 mt-1 mb-3">{proj.role}</p>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-zinc-300 leading-relaxed">
                          {proj.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="resume-section">
                  <h3 className={sectionTitleCls}>
                    <span>04 / 技术栈详情</span>
                    <span className="font-mono-tech text-[11px] opacity-50">TECH STACK</span>
                  </h3>
                  <div className="divide-y divide-white/10 border-t border-b border-white/10">
                    {dev.techStack.map((st) => (
                      <div key={st.cat} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 text-sm">
                        <span className="font-mono-tech text-xs text-zinc-300 shrink-0 sm:w-32">{st.cat}</span>
                        <span className="text-zinc-400">{st.items}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* 05 教育、服役与资质 */}
            <section className="resume-section">
              <h3 className={sectionTitleCls}>
                <span>05 / 教育、西藏服役与转型经历</span>
                <span className="font-mono-tech text-[11px] opacity-50">BACKGROUND</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-5">
                {current.education.map((edu) => (
                  <div
                    key={edu.school}
                    className={`p-4 border ${isDevTheme ? "border-white/10 bg-black/30" : "border-hairline bg-paper/40"}`}
                  >
                    <p className={`font-mono-tech text-[11px] ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>
                      {edu.period}
                    </p>
                    <p className={`text-sm font-medium mt-1.5 ${isDevTheme ? "text-white" : "text-ink"}`}>{edu.school}</p>
                    <p className={`text-xs mt-1 leading-relaxed ${isDevTheme ? "text-zinc-400" : "text-ink-muted"}`}>{edu.desc}</p>
                  </div>
                ))}
              </div>
              <p
                className={`text-xs sm:text-sm px-4 py-3 border ${
                  isDevTheme ? "border-white/10 bg-black/30 text-zinc-300 font-mono-tech" : "border-hairline bg-paper-alt/60 text-ink"
                }`}
              >
                <span className="font-mono-tech text-xs opacity-70 mr-2">CERTIFICATES</span>
                {current.certs}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
