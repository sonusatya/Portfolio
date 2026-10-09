import { PROFILE } from "@/lib/content";

/**
 * AI Orb — the animated core visual of the hero.
 *
 * A layered, dependency-free CSS orb: rotating conic rings, an inner glow,
 * and a photo of Sonu at the center. Purely decorative, so it is
 * aria-hidden and fully covered by prefers-reduced-motion in index.css.
 */
export function AIOrb({ size = 260 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outermost soft glow */}
      <div
        className="absolute inset-[-18%] rounded-full blur-3xl opacity-70 animate-aurora"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(28 200 245 / 0.28), transparent 62%), radial-gradient(circle at 30% 70%, rgb(139 92 246 / 0.24), transparent 60%)",
        }}
      />

      {/* Rotating conic ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgb(28 200 245 / 0.55) 60deg, rgb(139 92 246 / 0.5) 150deg, transparent 240deg, transparent 360deg)",
          maskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          WebkitMaskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
        }}
      />

      {/* Counter-rotating dashed ring */}
      <div
        className="absolute inset-[9%] rounded-full animate-spin-slower opacity-60"
        style={{
          border: "1px dashed rgb(28 200 245 / 0.35)",
        }}
      />

      {/* Glass disc */}
      <div
        className="absolute inset-[17%] rounded-full glass"
        style={{ boxShadow: "0 0 60px -12px rgb(28 200 245 / 0.45)" }}
      />

      {/* Orbiting dot */}
      <div className="absolute inset-0 animate-spin-slower">
        <span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300"
          style={{ boxShadow: "0 0 14px 3px rgb(28 200 245 / 0.8)" }}
        />
      </div>

      {/* Portrait at the core */}
      <div className="relative z-10 h-[54%] w-[54%] overflow-hidden rounded-full border border-white/12 bg-surface-2">
        <img
          src={PROFILE.photoUrl}
          alt=""
          loading="eager"
          decoding="async"
          width={size * 0.54}
          height={size * 0.54}
          className="h-full w-full object-cover object-top"
          onError={(e) => {
            // Graceful fallback to initials if the photo is missing
            const el = e.currentTarget;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent) {
              parent.classList.add("grid", "place-items-center");
              parent.innerHTML =
                '<span class="font-display text-2xl text-aurora select-none">SK</span>';
            }
          }}
        />
        {/* Vignette so the photo blends into the orb */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 26px 6px rgb(5 6 11 / 0.7)",
          }}
        />
      </div>
    </div>
  );
}
