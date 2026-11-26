import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { usePersona } from "./PersonaContext.js";
import { PersonaSwitcher } from "./PersonaSwitcher.js";
import { SHOWCASE_PROFILE, SHOWCASE_PROJECTS } from "../data/showcase.js";
import { IconClose, IconGithub, IconMail, IconMenu } from "./Icons.js";

const PORTFOLIO_SUBMENU = [
  { to: "/portfolio", label: "全部作品", count: SHOWCASE_PROJECTS.length },
  {
    to: "/portfolio?cat=manga",
    label: "漫剧作品",
    count: SHOWCASE_PROJECTS.filter((p) => p.category === "manga").length,
  },
  {
    to: "/portfolio?cat=dev",
    label: "全栈工程",
    count: SHOWCASE_PROJECTS.filter((p) => p.category === "dev").length,
  },
];

export function Layout() {
  const { persona } = usePersona();
  const { pathname, search } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioMenuOpen, setPortfolioMenuOpen] = useState(false);
  const [heroBarOffscreen, setHeroBarOffscreen] = useState(false);

  const isHome = pathname === "/";
  const isShowcase = pathname === "/resume" || pathname === "/portfolio";
  const isPublicShowcase = isHome || isShowcase;
  const isDevTheme = isPublicShowcase && persona === "dev";

  // 首页首屏控制带可见时隐藏顶栏切换器，避免同屏出现两套重复切换开关；滑出首屏后再平滑显现
  useEffect(() => {
    if (!isHome) {
      setHeroBarOffscreen(true);
      return;
    }

    const barEl = document.getElementById("hero-persona-bar");
    if (!barEl || typeof IntersectionObserver === "undefined") {
      setHeroBarOffscreen(false);
      return;
    }

    setHeroBarOffscreen(barEl.getBoundingClientRect().bottom <= 64);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setHeroBarOffscreen(!entry.isIntersecting && entry.boundingClientRect.top < 64);
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(barEl);
    return () => observer.disconnect();
  }, [isHome]);

  const showNavSwitcher = !isHome || heroBarOffscreen;

  const linkTextCls = (active: boolean) =>
    isDevTheme
      ? active
        ? "text-white"
        : "text-zinc-400 hover:text-white"
      : active
        ? "text-ink"
        : "text-ink-muted hover:text-ink";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDevTheme ? "bg-obsidian text-zinc-100" : isPublicShowcase ? "bg-paper text-ink" : ""
      }`}
    >
      {/* 极简吸顶导航 */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md no-print transition-colors duration-300 ${
          isDevTheme
            ? "bg-obsidian/90 border-b border-blue-400/15 text-zinc-100"
            : "bg-paper/90 border-b border-hairline text-ink"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl h-16 sm:h-20 items-center justify-between gap-4 px-4 sm:px-8">
          {/* 左侧字标 */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
            <span
              className={`w-2 h-2 rounded-full ${isDevTheme ? "bg-electric" : "bg-vermilion"}`}
              aria-hidden
            />
            <span className={`text-lg sm:text-xl tracking-tight ${isDevTheme ? "font-medium text-white" : "font-editorial font-semibold text-ink"}`}>
              {SHOWCASE_PROFILE.name}
            </span>
            <span className={`font-mono-tech text-xs hidden sm:inline ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>
              / {SHOWCASE_PROFILE.siteName}
            </span>
          </Link>

          {/* 桌面端主导航（含作品集下拉二级菜单） */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm">
            <Link to="/" className={`py-2 transition-colors ${linkTextCls(pathname === "/")}`}>
              首页
            </Link>

            {/* 作品集 + 极简下拉二级菜单 */}
            <div
              className="relative"
              onMouseEnter={() => setPortfolioMenuOpen(true)}
              onMouseLeave={() => setPortfolioMenuOpen(false)}
            >
              <Link
                to="/portfolio"
                className={`inline-flex items-center gap-1.5 py-2 transition-colors ${linkTextCls(pathname.startsWith("/portfolio"))}`}
              >
                作品集
                <span className="text-[10px] opacity-60">▾</span>
              </Link>

              {portfolioMenuOpen && (
                <div className="absolute left-0 top-full pt-1 w-48 z-50">
                  <div
                    className={`py-1.5 border shadow-xl ${
                      isDevTheme
                        ? "bg-obsidian-card border-blue-400/20 text-zinc-200"
                        : "bg-paper border-hairline text-ink"
                    }`}
                  >
                    {PORTFOLIO_SUBMENU.map((sub) => {
                      const subActive = pathname + search === sub.to || (sub.to === "/portfolio" && pathname === "/portfolio" && !search);
                      return (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setPortfolioMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-2 text-xs transition-colors ${
                            isDevTheme
                              ? subActive
                                ? "text-white bg-white/5"
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                              : subActive
                                ? "text-ink bg-paper-alt font-medium"
                                : "text-ink-muted hover:text-ink hover:bg-paper-alt/60"
                          }`}
                        >
                          <span>{sub.label}</span>
                          <span className="font-mono-tech text-[11px] opacity-60">{sub.count}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/resume" className={`py-2 transition-colors ${linkTextCls(pathname.startsWith("/resume"))}`}>
              简历
            </Link>
          </div>

          {/* 桌面端右侧：首页滚动显现的统一切换器 + GitHub */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {showNavSwitcher && (
              <div className="animate-switcher-in">
                <PersonaSwitcher variant="compact" />
              </div>
            )}

            <a
              href={SHOWCASE_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 min-h-8 text-xs font-mono-tech px-3 py-1.5 border transition-colors ${
                isDevTheme
                  ? "border-blue-400/25 text-slate-300 hover:border-blue-400/60 hover:text-white"
                  : "border-hairline text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              <IconGithub className="w-3.5 h-3.5" /> GitHub ↗
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 border cursor-pointer ${
              isDevTheme ? "border-white/15 text-zinc-200" : "border-hairline text-ink"
            }`}
            aria-label="切换导航菜单"
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </nav>

        {/* 移动端折叠菜单（直接展开作品集二级子项） */}
        {mobileOpen && (
          <div
            className={`md:hidden px-4 py-5 space-y-4 border-t ${
              isDevTheme ? "border-white/10 bg-obsidian" : "border-hairline bg-paper"
            }`}
          >
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/" onClick={() => setMobileOpen(false)} className="py-1.5">
                首页
              </Link>
              <div className="pt-1 space-y-1.5">
                <p className={`text-xs font-mono-tech ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>
                  作品集 / PORTFOLIO
                </p>
                <div className="pl-3 flex flex-col space-y-1.5 border-l border-current/20">
                  {PORTFOLIO_SUBMENU.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-1 text-sm opacity-90"
                    >
                      <span>{sub.label}</span>
                      <span className="font-mono-tech text-xs opacity-60">{sub.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/resume" onClick={() => setMobileOpen(false)} className="py-1.5">
                简历
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-current/10">
              <PersonaSwitcher variant="compact" />
              <a
                href={SHOWCASE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 min-h-8 px-3 py-1 text-xs font-mono-tech border ${
                  isDevTheme ? "border-blue-400/25 text-slate-300" : "border-hairline text-ink-muted"
                }`}
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
              ? "flex-1 mx-auto w-full max-w-6xl px-4 sm:px-8 py-12 sm:py-16"
              : "flex-1 mx-auto w-full max-w-5xl px-4 py-8"
        }
      >
        <Outlet />
      </main>

      {/* 极简三列 Footer */}
      <footer
        className={`no-print border-t transition-colors duration-300 ${
          isDevTheme
            ? "bg-obsidian border-white/10 text-zinc-400"
            : "bg-paper-alt/60 border-hairline text-ink-muted"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-12 gap-10">
          <div className="sm:col-span-6 space-y-3">
            <p className={`text-lg ${isDevTheme ? "font-medium text-white" : "font-editorial font-semibold text-ink"}`}>
              {SHOWCASE_PROFILE.name} · {SHOWCASE_PROFILE.siteName}
            </p>
            <p className="text-sm max-w-md leading-relaxed">{SHOWCASE_PROFILE.bioShort}</p>
            <p className="font-mono-tech text-xs opacity-70 pt-2">
              © {new Date().getFullYear()} {SHOWCASE_PROFILE.name} · {SHOWCASE_PROFILE.location}
            </p>
          </div>

          <div className="sm:col-span-3 space-y-2.5 text-sm">
            <p className={`font-mono-tech text-xs uppercase tracking-widest ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>
              Index
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:underline">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:underline">
                  全部作品集
                </Link>
              </li>
              <li>
                <Link to="/portfolio?cat=manga" className="hover:underline">
                  漫剧作品
                </Link>
              </li>
              <li>
                <Link to="/portfolio?cat=dev" className="hover:underline">
                  全栈工程
                </Link>
              </li>
              <li>
                <Link to="/resume" className="hover:underline">
                  正式简历
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-3 space-y-2.5 text-sm">
            <p className={`font-mono-tech text-xs uppercase tracking-widest ${isDevTheme ? "text-zinc-500" : "text-ink-muted"}`}>
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${SHOWCASE_PROFILE.email}`}
                className="inline-flex items-center gap-2 hover:underline w-fit"
              >
                <IconMail className="w-4 h-4" /> {SHOWCASE_PROFILE.email}
              </a>
              <a
                href={SHOWCASE_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline w-fit"
              >
                <IconGithub className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
