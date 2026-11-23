import { useState } from "react";
import { Link } from "react-router-dom";
import { usePersona, type Persona } from "../components/PersonaContext.js";
import { SHOWCASE_PROFILE, SHOWCASE_RESUMES } from "../data/showcase.js";
import {
  DecorOutlineCircle,
  DecorSolidCircle,
  DecorSolidSquare,
  SectionTitle,
} from "../components/MemphisDecor.js";

export function ShowcaseResume() {
  const { persona, setPersona } = usePersona();
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

  const switchRole = (role: Persona) => setPersona(role);

  return (
    <div className="relative">
      <div className="relative mb-6 no-print">
        {!isDevTheme && (
          <>
            <DecorSolidSquare className="hidden sm:block absolute -top-3 -left-2 w-7 h-7 opacity-60" color="mem-orange" />
            <DecorSolidCircle className="hidden sm:block absolute top-8 right-2 w-5 h-5" color="mem-purple" />
            <DecorOutlineCircle className="hidden sm:block absolute -top-4 right-20 w-10 h-10 opacity-60" color="mem-blue" />
          </>
        )}
        {isDevTheme ? (
          <div>
            <p className="font-mono-tech text-xs text-sky-400 mb-2">$ cat ./resume.md --format=print-ready</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">RESUME · 正式个人简历</h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              双岗位独立视角与视觉风格；打印或导出 PDF 时自动切换为纯白 A4 专业排版。
            </p>
          </div>
        ) : (
          <SectionTitle
            title="RESUME · 正式个人简历"
            subtitle="点击下方岗位标签可同步切换视角与整站风格；支持一键复制邮箱与纯白 A4 打印导出。"
          />
        )}
      </div>

      {/* 顶部控制栏（打印时隐藏） */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 no-print">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => switchRole("aigc")}
            className={`px-5 py-2.5 text-sm transition-all cursor-pointer ${
              isAigc
                ? "bg-mem-red text-white font-display border-memphis shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-slate-900 text-slate-300 border border-slate-700 rounded-lg hover:border-rose-400"
            }`}
          >
            ✦ {aigc.label}
          </button>
          <button
            type="button"
            onClick={() => switchRole("dev")}
            className={`px-5 py-2.5 text-sm transition-all cursor-pointer ${
              !isAigc
                ? "bg-sky-500 text-slate-950 font-mono-tech font-bold rounded-lg border border-sky-400"
                : "bg-white text-mem-black font-display border-memphis shadow-memphis-sm hover:bg-cream"
            }`}
          >
            &lt;/&gt; {dev.label}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => void handleCopyEmail()}
            className={`px-4 py-2 text-sm cursor-pointer transition-all ${
              isDevTheme
                ? "font-mono-tech rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:border-sky-400"
                : "bg-white text-mem-black font-display border-memphis shadow-memphis-sm hover:bg-mem-yellow"
            }`}
          >
            {copied ? "已复制邮箱 ✓" : "复制邮箱"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={`px-4 py-2 text-sm cursor-pointer transition-all ${
              isDevTheme
                ? "font-mono-tech rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400"
                : "bg-mem-yellow text-mem-black font-display border-memphis shadow-memphis-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            }`}
          >
            打印 / 导出 A4 PDF
          </button>
        </div>
      </div>

      {/* 简历主体（.print-resume-sheet 保证深色模式打印时强制纯白纸质排版） */}
      <div className="print-area">
        <div
          className={`print-resume-sheet overflow-hidden ${
            isDevTheme
              ? "bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-slate-100"
              : "bg-white border-memphis-thick shadow-memphis-lg text-mem-black"
          }`}
        >
          {/* 简历头部 */}
          <div
            className={`p-6 sm:p-8 ${
              isDevTheme
                ? "bg-slate-950 border-b border-slate-800 text-white"
                : "bg-mem-red border-b-[3px] border-mem-black text-white"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span
                  className={`print-accent-badge inline-block px-2.5 py-0.5 text-xs mb-3 ${
                    isDevTheme
                      ? "font-mono-tech rounded bg-sky-500/20 text-sky-300 border border-sky-400/50"
                      : "font-display bg-mem-yellow text-mem-black border-memphis"
                  }`}
                >
                  {current.label}
                </span>
                <h2 className={`text-3xl sm:text-4xl tracking-tight ${isDevTheme ? "font-bold" : "font-display"}`}>
                  {SHOWCASE_PROFILE.name}
                </h2>
                <p className="text-sm sm:text-base mt-1.5 opacity-95">{current.title}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm mt-3 opacity-90">
                  <span>📍 {SHOWCASE_PROFILE.location}</span>
                  <span>✉ {SHOWCASE_PROFILE.email}</span>
                  <span>💻 {SHOWCASE_PROFILE.github}</span>
                </div>
              </div>

              {SHOWCASE_PROFILE.certPhotoUrl && (
                <img
                  src={SHOWCASE_PROFILE.certPhotoUrl}
                  alt={SHOWCASE_PROFILE.name}
                  className={`w-24 h-28 object-cover shrink-0 ${
                    isDevTheme ? "rounded-lg border border-slate-600 bg-slate-800" : "border-memphis-thick bg-white shadow-memphis-sm"
                  }`}
                />
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8 resume-view">
            {/* 核心摘要 + 量化亮点条 */}
            <section className="resume-section">
              <h3
                className={`text-lg pb-1.5 mb-3 flex items-center gap-2 ${
                  isDevTheme ? "font-bold border-b border-slate-700 text-white" : "font-display border-b-2 border-mem-black"
                }`}
              >
                <span
                  className={`w-3 h-3 inline-block ${
                    isDevTheme ? "rounded-sm bg-sky-400" : "border-memphis bg-mem-red"
                  }`}
                />
                个人定位与实战自述
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDevTheme ? "text-slate-300" : "font-body text-mem-black/85"}`}>
                {current.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {current.highlights.map((h) => (
                  <div
                    key={h.label}
                    className={`p-3 ${
                      isDevTheme
                        ? "bg-slate-950 border border-slate-800 rounded-lg"
                        : "bg-cream border-memphis"
                    }`}
                  >
                    <p className={`text-base sm:text-lg font-bold ${isDevTheme ? "font-mono-tech text-sky-300" : "font-display text-mem-red"}`}>
                      {h.value}
                    </p>
                    <p className={`text-xs mt-1 ${isDevTheme ? "font-semibold text-white" : "font-display text-mem-black"}`}>
                      {h.label}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isDevTheme ? "text-slate-400" : "font-body text-mem-black/70"}`}>
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 工作经历 */}
            <section className="resume-section">
              <h3
                className={`text-lg pb-1.5 mb-4 flex items-center gap-2 ${
                  isDevTheme ? "font-bold border-b border-slate-700 text-white" : "font-display border-b-2 border-mem-black"
                }`}
              >
                <span className={`w-3 h-3 inline-block ${isDevTheme ? "rounded-sm bg-emerald-400" : "border-memphis bg-mem-yellow"}`} />
                工作经历
              </h3>
              <div className="space-y-4">
                {current.workExperience.map((exp) => (
                  <div
                    key={exp.company}
                    className={`p-4 ${
                      isDevTheme ? "bg-slate-950/70 border border-slate-800 rounded-lg" : "bg-cream border-memphis"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h4 className={`text-base ${isDevTheme ? "font-bold text-white" : "font-display text-mem-black"}`}>
                        {exp.company}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 ${
                          isDevTheme
                            ? "font-mono-tech rounded bg-slate-800 text-sky-300 border border-slate-700"
                            : "font-display bg-mem-yellow border-memphis"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p className={`text-sm mb-2.5 ${isDevTheme ? "font-mono-tech text-sky-400" : "font-display text-mem-red"}`}>
                      {exp.role}
                    </p>
                    <ul className={`list-disc pl-5 space-y-1.5 text-sm ${isDevTheme ? "text-slate-300" : "font-body text-mem-black/85"}`}>
                      {exp.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 方向专属区块 */}
            {isAigc ? (
              <>
                <section className="resume-section">
                  <div className="flex items-center justify-between gap-2 pb-1.5 mb-4 border-b-2 border-mem-black">
                    <h3 className="font-display text-lg flex items-center gap-2">
                      <span className="w-3 h-3 border-memphis bg-mem-green inline-block" />
                      代表漫剧作品（累计 400+ 集）
                    </h3>
                    <Link to="/portfolio" className="no-print text-xs font-display text-mem-blue hover:underline">
                      查看作品集封面 ↗
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {aigc.works.map((w) => (
                      <div key={w.name} className="border-memphis p-3.5 bg-cream-pink/60">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-display text-sm text-mem-black">{w.name}</span>
                          <span className="text-[11px] font-display px-2 py-0.5 bg-white border-memphis">{w.role}</span>
                        </div>
                        <p className="text-xs font-body text-mem-black/80">{w.result}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="resume-section">
                  <h3 className="font-display text-lg border-b-2 border-mem-black pb-1.5 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 border-memphis bg-mem-purple inline-block" />
                    核心能力矩阵
                  </h3>
                  <div className="space-y-2.5">
                    {aigc.abilities.map((ab) => (
                      <div key={ab.item} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm font-body border-b border-mem-black/15 pb-2">
                        <span className="font-display text-mem-black shrink-0 sm:w-28">{ab.item}</span>
                        <span className="text-mem-black/80">{ab.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="resume-section">
                  <div className="flex items-center justify-between gap-2 pb-1.5 mb-4 border-b border-slate-700">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block" />
                      核心工程项目
                    </h3>
                    <Link to="/portfolio" className="no-print font-mono-tech text-xs text-sky-400 hover:underline">
                      查看作品集详情 ↗
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {dev.projects.map((proj) => (
                      <div key={proj.name} className="bg-slate-950/70 border border-slate-800 rounded-lg p-4">
                        <h4 className="font-bold text-base text-white">{proj.name}</h4>
                        <p className="font-mono-tech text-xs text-sky-400 mt-0.5 mb-2.5">{proj.role}</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                          {proj.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="resume-section">
                  <h3 className="font-bold text-lg text-white border-b border-slate-700 pb-1.5 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-purple-400 inline-block" />
                    技术栈详情
                  </h3>
                  <div className="space-y-2.5">
                    {dev.techStack.map((st) => (
                      <div key={st.cat} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm border-b border-slate-800 pb-2">
                        <span className="font-mono-tech font-semibold text-sky-300 shrink-0 sm:w-28">{st.cat}</span>
                        <span className="text-slate-300">{st.items}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* 教育、服役与证书 */}
            <section className="resume-section">
              <h3
                className={`text-lg pb-1.5 mb-4 flex items-center gap-2 ${
                  isDevTheme ? "font-bold border-b border-slate-700 text-white" : "font-display border-b-2 border-mem-black"
                }`}
              >
                <span className={`w-3 h-3 inline-block ${isDevTheme ? "rounded-sm bg-amber-400" : "border-memphis bg-mem-orange"}`} />
                教育、西藏服役与转型经历
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {current.education.map((edu) => (
                  <div
                    key={edu.school}
                    className={`p-3 ${
                      isDevTheme ? "bg-slate-950/70 border border-slate-800 rounded-lg" : "bg-white border-memphis"
                    }`}
                  >
                    <p className={`text-xs ${isDevTheme ? "font-mono-tech text-sky-400" : "font-display text-mem-black/60"}`}>
                      {edu.period}
                    </p>
                    <p className={`text-sm mt-1 ${isDevTheme ? "font-bold text-white" : "font-display text-mem-black"}`}>
                      {edu.school}
                    </p>
                    <p className={`text-xs mt-1 ${isDevTheme ? "text-slate-300" : "font-body text-mem-black/80"}`}>
                      {edu.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className={`text-xs sm:text-sm px-3.5 py-2 ${
                  isDevTheme
                    ? "bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono-tech"
                    : "bg-mem-yellow/40 border-memphis font-body"
                }`}
              >
                <span className={isDevTheme ? "text-sky-300 font-bold" : "font-display"}>资格证书：</span>
                {current.certs}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
