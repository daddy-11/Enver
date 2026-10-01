import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize2,
} from "lucide-react";
import { SlideView, SLIDE_COUNT } from "./slides";

const PDF_HREF = "/EnverAI-Artificer-Google-Pitch.pdf";

export function DeckApp() {
  const [index, setIndex] = useState(0);
  const [present, setPresent] = useState(false);
  const [scale, setScale] = useState(0.4);

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));
  }, []);

  useEffect(() => {
    const fit = () => {
      const chrome = present ? 0 : 72;
      const w = window.innerWidth - 32;
      const h = window.innerHeight - chrome - 32;
      setScale(Math.min(w / 1920, h / 1080));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [present]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDE_COUNT - 1);
      else if (e.key === "f" || e.key === "F") setPresent((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <div className="flex min-h-dvh flex-col bg-grove text-cream">
      {!present ? (
        <nav className="z-20 flex h-[72px] items-center justify-between border-b border-line px-5">
          <div className="flex items-center gap-3">
            <img
              src="/brand/enver-logo.png"
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <p className="font-sans text-[11px] font-semibold tracking-[0.24em] text-gold">
                ENVER AI TECH
              </p>
              <p className="font-sans text-[11px] text-muted">
                Artificer · Google for Startups
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={PDF_HREF}
              download
              className="inline-flex h-11 items-center gap-2 border border-gold bg-grove-3 px-4 font-sans text-sm text-gold-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <button
              type="button"
              onClick={() => setPresent(true)}
              className="inline-flex h-11 items-center gap-2 border border-line px-4 font-sans text-sm text-cream"
            >
              <Maximize className="h-4 w-4" />
              Present
            </button>
          </div>
        </nav>
      ) : null}

      <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
        <div
          style={{
            width: 1920 * scale,
            height: 1080 * scale,
          }}
        >
          <div
            style={{
              width: 1920,
              height: 1080,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <SlideView index={index} />
          </div>
        </div>
      </div>

      <div
        className={`z-20 flex items-center justify-between px-5 ${present ? "absolute bottom-4 left-0 right-0" : "h-14 border-t border-line"}`}
      >
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-cream disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full ${i === index ? "w-6 bg-gold" : "w-2.5 bg-muted/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {present ? (
            <button
              type="button"
              onClick={() => setPresent(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-cream"
              aria-label="Exit present"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === SLIDE_COUNT - 1}
            className="inline-flex h-11 w-11 items-center justify-center border border-gold bg-gold text-grove disabled:opacity-30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
