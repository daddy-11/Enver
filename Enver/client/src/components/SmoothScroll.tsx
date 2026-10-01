import { useEffect } from "react";
import { useLocation } from "wouter";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Universal Route Scroll-To-Top Restoration
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    } else {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 120);
    }
  }, [location]);

  return <>{children}</>;
}
