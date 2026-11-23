import type { CSSProperties } from "react";

type MemphisColor =
  | "mem-black"
  | "mem-red"
  | "mem-blue"
  | "mem-green"
  | "mem-orange"
  | "mem-purple"
  | "mem-yellow"
  | "cream";

const HEX_MAP: Record<MemphisColor, string> = {
  "mem-black": "#1A1A1A",
  "mem-red": "#FF3B30",
  "mem-blue": "#007AFF",
  "mem-green": "#34C759",
  "mem-orange": "#FF9500",
  "mem-purple": "#AF52DE",
  "mem-yellow": "#FFD60A",
  cream: "#FFF9E6",
};

const BG_CLASS_MAP: Record<MemphisColor, string> = {
  "mem-red": "bg-mem-red",
  "mem-blue": "bg-mem-blue",
  "mem-green": "bg-mem-green",
  "mem-orange": "bg-mem-orange",
  "mem-purple": "bg-mem-purple",
  "mem-yellow": "bg-mem-yellow",
  "mem-black": "bg-mem-black",
  cream: "bg-cream",
};

function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export function DecorDots({
  className,
  color = "mem-black",
  size = 6,
  gap = 14,
}: {
  className?: string;
  color?: MemphisColor;
  size?: number;
  gap?: number;
}) {
  const c = HEX_MAP[color];
  const pattern = `radial-gradient(circle, ${c} ${size / 2}px, transparent ${size / 2 + 0.5}px) 0 0 / ${gap}px ${gap}px`;
  return <div aria-hidden className={cn("pointer-events-none", className)} style={{ background: pattern }} />;
}

export function DecorStripes({
  className,
  color = "mem-black",
  thickness = 3,
  gap = 10,
  angle = 45,
}: {
  className?: string;
  color?: MemphisColor;
  thickness?: number;
  gap?: number;
  angle?: number;
}) {
  const c = HEX_MAP[color];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(${angle}deg, ${c} 0, ${c} ${thickness}px, transparent ${thickness}px, transparent ${thickness + gap}px)`,
      }}
    />
  );
}

export function DecorSolidCircle({
  className,
  color = "mem-red",
}: {
  className?: string;
  color?: MemphisColor;
}) {
  return <div aria-hidden className={cn("rounded-full border-memphis", BG_CLASS_MAP[color], className)} />;
}

export function DecorOutlineCircle({
  className,
  color = "mem-black",
}: {
  className?: string;
  color?: "mem-black" | "mem-red" | "mem-blue";
}) {
  const map = {
    "mem-black": "border-mem-black",
    "mem-red": "border-mem-red",
    "mem-blue": "border-mem-blue",
  };
  return <div aria-hidden className={cn("rounded-full border-[3px] bg-transparent", map[color], className)} />;
}

export function DecorSolidSquare({
  className,
  color = "mem-blue",
}: {
  className?: string;
  color?: MemphisColor;
}) {
  return <div aria-hidden className={cn("border-memphis", BG_CLASS_MAP[color], className)} />;
}

export function DecorTriangle({
  className,
  color = "mem-green",
  rotate = 0,
}: {
  className?: string;
  color?: MemphisColor;
  rotate?: number;
}) {
  const c = HEX_MAP[color];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{
        width: 0,
        height: 0,
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderBottom: `22px solid ${c}`,
        filter: "drop-shadow(1.5px 1.5px 0 #1A1A1A)",
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

const fmt = (n: number) => Number(n.toFixed(4));

export function MemphisDecor({
  className,
  seed = 1,
  density = "normal",
}: {
  className?: string;
  seed?: number;
  density?: "sparse" | "normal" | "dense";
}) {
  const count = density === "sparse" ? 3 : density === "dense" ? 8 : 5;
  const colors: MemphisColor[] = [
    "mem-red",
    "mem-blue",
    "mem-green",
    "mem-orange",
    "mem-purple",
    "mem-yellow",
  ];

  const items = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => {
      const x = Math.sin(seed * 9999 + i * 37 + n) * 10000;
      return x - Math.floor(x);
    };
    const variant = Math.floor(r(1) * 4);
    const color = colors[Math.floor(r(2) * colors.length)] ?? "mem-red";
    const top = fmt(r(3) * 80 + 5);
    const right = fmt(r(4) * 90 + 2);
    const size = fmt(12 + r(5) * 24);
    const rot = fmt(r(6) * 360);
    const style: CSSProperties = {
      top: `${top}%`,
      right: `${right}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rot}deg)`,
    };

    if (variant === 0) {
      return <div key={i} className={cn("absolute pointer-events-none rounded-full border-memphis", BG_CLASS_MAP[color])} style={style} />;
    }
    if (variant === 1) {
      return <div key={i} className={cn("absolute pointer-events-none border-memphis", BG_CLASS_MAP[color])} style={style} />;
    }
    if (variant === 2) {
      return <div key={i} className="absolute pointer-events-none rounded-full border-[3px] border-mem-black bg-transparent" style={style} />;
    }
    return (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          top: `${top}%`,
          right: `${right}%`,
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: `18px solid ${HEX_MAP[color]}`,
          transform: `rotate(${rot}deg)`,
        }}
      />
    );
  });

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      {items}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  center = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-8", center && "text-center")}>
      <div className={cn("inline-flex items-center gap-2.5", center && "justify-center")}>
        <span className="w-3.5 h-3.5 bg-mem-red border-memphis inline-block rotate-12" />
        <h2 className="font-display text-3xl sm:text-4xl tracking-tighter text-mem-black">{title}</h2>
        <span className="w-3.5 h-3.5 rounded-full bg-mem-blue border-memphis inline-block" />
      </div>
      {subtitle && (
        <p className={cn("mt-2 font-body text-sm sm:text-base text-mem-black/75", center && "mx-auto max-w-2xl")}>
          <span className="marker-yellow">{subtitle}</span>
        </p>
      )}
    </div>
  );
}

/* ================= 轻量内联 SVG 图标（零外部依赖） ================= */

export function IconGithub({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function IconMenu({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
