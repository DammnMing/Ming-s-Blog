import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { usePersona } from "./PersonaContext.js";
import { SHOWCASE_PROFILE } from "../data/showcase.js";
import {
  DecorDots,
  DecorOutlineCircle,
  DecorSolidCircle,
  DecorSolidSquare,
  DecorTriangle,
  IconClose,
  IconGithub,
  IconMail,
  IconMenu,
} from "./MemphisDecor.js";

const NAV_LINKS = [
  { to: "/", label: "首页", dotClass: "bg-mem-red" },
  { to: "/resume", label: "简历", dotClass: "bg-mem-blue" },
  { to: "/portfolio", label: "作品集", dotClass: "bg-mem-green" },
];

export function Layout() {
  const { persona, setPersona } = usePersona();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isShowcase = pathname === "/resume" || pathname === "/portfolio";
  const isPublicShowcase = isHome || isShowcase;
  const isDevTheme = isPublicShowcase && persona === "dev";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isDevTheme ? "bg-[#0B1120] text-slate-100" : isPublicShowcase ? "bg-cream text-mem-black" : ""
      }`}
    >
      {/* 顶部导航栏：收敛二三期入口，突出「一人双能」双风格切换 */}
      <header
        className={`sticky top-0 z-50 no-print transition-colors ${
          isDevTheme
            ? "bg-slate-950/90 backdrop-blur border-b border-slate-800 text-slate-100"
            : "bg-cream border-b-[3px] border-mem-black text-mem-black"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl h-20 items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
            {isDevTheme ? (
              <span className="w-8 h-8 rounded bg-sky-500/20 border border-sky-400/60 flex items-center justify-center font-mono-tech text-xs text-sky-300 font-bold">
                &lt;/&gt;
              </span>
            ) : (
              <span className="relative flex items-center gap-1">
                <DecorSolidSquare className="w-6 h-6" color="mem-red" />
                <DecorSolidCircle className="w-4 h-4 -ml-2 mt-4" color="mem-yellow" />
                <DecorOutlineCircle className="w-7 h-7 -ml-1 -mb-2" color="mem-black" />
              </span>
            )}
            <span className={`text-xl sm:text-2xl tracking-tighter ${isDevTheme ? "font-bold text-white" : "font-display text-mem-black"}`}>
              {SHOWCASE_PROFILE.name}
              <span className={`ml-1.5 ${isDevTheme ? "font-mono-tech text-sky-400 text-base sm:text-lg" : "marker-yellow"}`}>
                {SHOWCASE_PROFILE.siteName}
              </span>
            </span>
          </Link>

          {/* 桌面端主导航 */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const active = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
              return (
                <Link key={link.to} to={link.to} className="relative px-4 py-2 group">
                  <span
                    className={`relative z-10 text-base transition-colors ${
                      isDevTheme
                        ? `font-medium ${active ? "text-sky-300" : "text-slate-300 group-hover:text-white"}`
                        : `font-display tracking-tight ${active ? "text-mem-black" : "text-mem-black/80 group-hover:text-mem-black"}`
                    }`}
                  >
                    {link.label}
                  </span>
                  {isDevTheme ? (
                    <span
                      className={`absolute left-4 right-4 bottom-1 h-0.5 bg-sky-400 transition-opacity ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  ) : (
                    <span
                      className={`absolute left-3 right-3 bottom-1 h-2 -z-0 transition-opacity ${link.dotClass} ${
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 桌面端右侧：「一人双能」切换胶囊 + GitHub */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className={`inline-flex p-1 ${
                isDevTheme
                  ? "bg-slate-900 border border-slate-700 rounded-lg"
                  : "bg-white border-memphis shadow-memphis-sm"
              }`}
              role="group"
              aria-label="切换身份视角"
            >
              <button
                type="button"
                onClick={() => setPersona("aigc")}
                className={`px-3 py-1.5 text-xs transition-all cursor-pointer ${
                  persona === "aigc"
                    ? "bg-mem-red text-white font-display"
                    : isDevTheme
                      ? "text-slate-300 hover:text-white rounded"
                      : "text-mem-black/75 hover:text-mem-black font-display"
                }`}
              >
                ✦ 漫剧制片
              </button>
              <button
                type="button"
                onClick={() => setPersona("dev")}
                className={`px-3 py-1.5 text-xs transition-all cursor-pointer ${
                  persona === "dev"
                    ? isDevTheme
                      ? "bg-sky-500 text-slate-950 font-mono-tech font-bold rounded"
                      : "bg-mem-blue text-white font-display"
                    : isDevTheme
                      ? "text-slate-300 hover:text-white rounded font-mono-tech"
                      : "text-mem-black/75 hover:text-mem-black font-display"
                }`}
              >
                &lt;/&gt; 全栈开发
              </button>
            </div>

            <a
              href={SHOWCASE_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm transition-all ${
                isDevTheme
                  ? "bg-slate-900 text-slate-100 border border-slate-700 rounded-lg hover:border-sky-400 font-mono-tech"
                  : "bg-mem-black text-white font-display tracking-tight border-memphis shadow-memphis-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              <IconGithub className="w-4 h-4" /> GitHub
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2 cursor-pointer ${
              isDevTheme
                ? "bg-slate-900 border border-slate-700 rounded text-slate-100"
                : "bg-white border-memphis shadow-memphis-sm"
            }`}
            aria-label="切换导航菜单"
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </nav>

        {/* 移动端折叠菜单 */}
        {mobileOpen && (
          <div
            className={`lg:hidden px-4 py-4 space-y-3 ${
              isDevTheme ? "border-t border-slate-800 bg-slate-950" : "border-t-2 border-mem-black bg-cream"
            }`}
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm ${
                    isDevTheme
                      ? "bg-slate-900 border border-slate-700 rounded text-slate-100"
                      : "bg-white border-memphis font-display"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPersona("aigc")}
                className={`px-3 py-1.5 text-xs border cursor-pointer ${
                  persona === "aigc" ? "bg-mem-red text-white border-mem-black font-display" : "bg-white text-mem-black border-mem-black"
                }`}
              >
                ✦ 漫剧制片
              </button>
              <button
                type="button"
                onClick={() => setPersona("dev")}
                className={`px-3 py-1.5 text-xs border cursor-pointer ${
                  persona === "dev" ? "bg-sky-500 text-slate-950 border-sky-400 font-bold" : "bg-slate-900 text-slate-200 border-slate-700"
                }`}
              >
                &lt;/&gt; 全栈开发
              </button>
              <a
                href={SHOWCASE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-mem-black text-white text-xs border border-slate-700"
              >
                <IconGithub className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 主体 */}
      <main
        className={
          isHome
            ? "flex-1"
            : isShowcase
              ? "flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14"
              : "flex-1 mx-auto w-full max-w-5xl px-4 py-8"
        }
      >
        <Outlet />
      </main>

      {/* Footer：随身份风格切换 */}
      {isDevTheme ? (
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="sm:col-span-2">
              <p className="font-mono-tech text-sm text-sky-400 mb-2">$ cat ./about.txt</p>
              <p className="text-xl font-bold text-white mb-2">
                {SHOWCASE_PROFILE.name} · {SHOWCASE_PROFILE.siteName}
              </p>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed mb-4">{SHOWCASE_PROFILE.bioShort}</p>
              <p className="font-mono-tech text-xs text-slate-500">
                © {new Date().getFullYear()} {SHOWCASE_PROFILE.name} · Full-Stack &amp; AIGC Producer
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-mono-tech text-sm text-cyan-300">联系我</p>
              <a
                href={`mailto:${SHOWCASE_PROFILE.email}`}
                className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-sky-400 text-sm text-slate-200 w-fit transition-colors"
              >
                <IconMail className="w-4 h-4 text-sky-400" /> {SHOWCASE_PROFILE.email}
              </a>
              <a
                href={SHOWCASE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-sky-400 text-sm text-slate-200 w-fit transition-colors"
              >
                <IconGithub className="w-4 h-4 text-sky-400" /> GitHub
              </a>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="relative bg-cream-pink border-t-[3px] border-mem-black overflow-hidden no-print">
          <DecorDots className="absolute top-4 left-6 w-24 h-16 opacity-40" color="mem-blue" size={3} gap={12} />
          <DecorSolidCircle className="absolute bottom-5 right-12 w-8 h-8" color="mem-red" />
          <DecorTriangle className="absolute top-8 right-40 hidden sm:block" color="mem-green" rotate={12} />
          <DecorSolidSquare className="absolute bottom-14 left-40 w-5 h-5 hidden sm:block" color="mem-yellow" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <DecorSolidSquare className="w-5 h-5" color="mem-red" />
                <p className="font-display text-2xl tracking-tighter text-mem-black">
                  {SHOWCASE_PROFILE.name} · {SHOWCASE_PROFILE.siteName}
                </p>
              </div>
              <p className="font-body text-sm text-mem-black/75 max-w-md leading-relaxed mb-5">
                {SHOWCASE_PROFILE.bioShort}
              </p>
              <p className="font-body text-xs text-mem-black/60">
                © {new Date().getFullYear()} {SHOWCASE_PROFILE.name} · {SHOWCASE_PROFILE.titles.join(" / ")}
                <span className="ml-2 marker-yellow">Made with Memphis</span>
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-display text-lg tracking-tighter text-mem-black flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-mem-blue border-memphis" />
                联系我
              </p>
              <a
                href={`mailto:${SHOWCASE_PROFILE.email}`}
                className="flex items-center gap-2 px-3 py-2.5 bg-white border-memphis shadow-memphis-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-mem-yellow transition-all font-body text-sm w-fit"
              >
                <IconMail className="w-4 h-4 shrink-0 text-mem-red" /> {SHOWCASE_PROFILE.email}
              </a>
              <a
                href={SHOWCASE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 bg-mem-black text-white border-memphis shadow-memphis-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-body text-sm w-fit"
              >
                <IconGithub className="w-4 h-4 shrink-0" /> GitHub
              </a>
            </div>
          </div>

          {/* 底部六色彩虹条 */}
          <div className="flex h-3">
            <div className="flex-1 bg-mem-red" />
            <div className="flex-1 bg-mem-orange" />
            <div className="flex-1 bg-mem-yellow" />
            <div className="flex-1 bg-mem-green" />
            <div className="flex-1 bg-mem-blue" />
            <div className="flex-1 bg-mem-purple" />
          </div>
        </footer>
      )}
    </div>
  );
}
