import { usePersona, type Persona } from "./PersonaContext.js";

export interface PersonaSwitcherProps {
  /** bar：首屏刊头控制带；compact：吸顶导航/移动端/简历控制栏 */
  variant?: "bar" | "compact";
  className?: string;
}

const OPTIONS: { id: Persona; barLabel: string; compactLabel: string }[] = [
  { id: "aigc", barLabel: "AIGC 漫剧制片", compactLabel: "漫剧制片" },
  { id: "dev", barLabel: "全栈开发工程师", compactLabel: "全栈开发" },
];

/**
 * 全站唯一的职业视角切换器：
 * - 统一使用相同字族与字重，避免切换时按钮宽度抖动导致鼠标错位
 * - 原生 <button> + aria-pressed 语义，满足最小 32px 点击高度
 */
export function PersonaSwitcher({ variant = "compact", className = "" }: PersonaSwitcherProps) {
  const { persona, setPersona } = usePersona();
  const isDev = persona === "dev";
  const isBar = variant === "bar";

  return (
    <div
      role="group"
      aria-label="切换职业视角"
      className={`inline-flex items-center p-0.5 border text-xs ${
        isDev
          ? "border-blue-400/20 bg-[#0B1326]/85"
          : isBar
            ? "border-hairline bg-paper/75"
            : "border-hairline bg-paper-alt/80"
      } ${className}`}
    >
      {OPTIONS.map((opt) => {
        const active = persona === opt.id;
        const label = isBar ? opt.barLabel : opt.compactLabel;

        let stateCls = "";
        if (isDev) {
          stateCls = active
            ? "border-blue-400/60 bg-blue-500/20 text-white shadow-[0_0_16px_-6px_rgba(59,130,246,0.75)]"
            : "border-transparent text-slate-400 hover:text-white hover:bg-blue-500/10";
        } else if (isBar) {
          stateCls = active
            ? "border-transparent border-b-2 border-b-vermilion bg-paper-alt/75 text-ink"
            : "border-transparent border-b-2 border-b-transparent text-ink-muted hover:text-ink hover:bg-paper-alt/40";
        } else {
          stateCls = active
            ? "border-ink/15 bg-paper text-ink shadow-xs"
            : "border-transparent text-ink-muted hover:text-ink";
        }

        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => setPersona(opt.id)}
            className={`inline-flex items-center justify-center gap-1.5 min-h-8 font-medium whitespace-nowrap border transition-colors cursor-pointer ${
              isBar ? "px-3.5 py-1.5" : "px-3 py-1"
            } ${stateCls}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                active
                  ? isDev
                    ? "bg-electric opacity-100"
                    : "bg-vermilion opacity-100"
                  : "bg-current opacity-25"
              }`}
              aria-hidden
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
