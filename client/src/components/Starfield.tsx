import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  drift: number;
}

/**
 * Lightweight, dependency-free animated starfield.
 *
 * A single <canvas> fills the viewport behind all content and renders a
 * slow-drifting field of faint stars with occasional twinkle. Purely
 * decorative (aria-hidden), respects prefers-reduced-motion by rendering a
 * single static frame, and pauses when the tab is hidden to save battery.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Typed non-null handles — closures below reference these, and TS keeps
    // the narrowing because they are const bindings that are never reassigned.
    const cv: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    const seed = () => {
      const count = Math.min(160, Math.floor((width * height) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
        drift: (Math.random() - 0.5) * 0.06,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      cv.width = Math.floor(width * DPR);
      cv.height = Math.floor(height * DPR);
      cv.style.width = width + "px";
      cv.style.height = height + "px";
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      c.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = reduceMotion
          ? 1
          : 0.6 + 0.4 * Math.sin((t / 1000) * s.speed + s.phase);
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(180, 210, 255, ${s.baseAlpha * twinkle})`;
        c.fill();
      }
    };

    const tick = (t: number) => {
      if (!running) return;
      draw(t);
      if (!reduceMotion) {
        for (const s of stars) {
          s.y += s.drift;
          if (s.y > height + 2) s.y = -2;
          else if (s.y < -2) s.y = height + 2;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 opacity-70"
    />
  );
}
