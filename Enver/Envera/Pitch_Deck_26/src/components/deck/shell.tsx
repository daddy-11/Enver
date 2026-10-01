import type { ReactNode } from "react";

export function SlideShell({
  kicker,
  children,
  footerLeft = "Enver AI Tech  ·  Confidential",
  index,
  total,
}: {
  kicker?: string;
  children: ReactNode;
  footerLeft?: string;
  index: number;
  total: number;
}) {
  return (
    <div className="slide-stage">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,76,0.08),transparent_42%),radial-gradient(ellipse_at_bottom_left,rgba(47,107,82,0.18),transparent_46%)]" />
      <header className="absolute top-10 left-14 right-14 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/brand/enver-logo.png"
            alt="Enver AI Tech"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40"
          />
          <div className="leading-none">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] text-gold">
              ENVER AI TECH
            </p>
            <p className="mt-1 font-sans text-[10px] tracking-[0.18em] text-muted">
              ARTIFICER MVP
            </p>
          </div>
        </div>
        {kicker ? <p className="slide-kicker">{kicker}</p> : null}
      </header>
      <div className="absolute inset-0 z-10 px-14 pt-28 pb-20">{children}</div>
      <footer className="absolute bottom-10 left-14 right-14 z-10 flex items-center justify-between text-[11px] tracking-[0.16em] text-muted uppercase">
        <span>{footerLeft}</span>
        <span className="text-gold-2">
          {String(index + 1).padStart(2, "0")}  /  {String(total).padStart(2, "0")}
        </span>
      </footer>
    </div>
  );
}

export function GoldCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-line bg-grove-2/70 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
