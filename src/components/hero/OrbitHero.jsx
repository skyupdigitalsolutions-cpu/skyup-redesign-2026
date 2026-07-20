import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import EnergyCore from "./components/EnergyCore";
import OrbitRings from "./components/OrbitRings";
import FloatingMetrics from "./components/FloatingMetrics";
import HeroContent from "./components/HeroContent";
import { COLORS } from "./heroConfig";

/**
 * OrbitHero — premium split-layout hero.
 *   Left  : bold "AI-Powered ____" headline + CTAs (always server-rendered, SEO)
 *   Right : R3F energy core + orbit rings + floating metrics
 *
 * Folder layout this matches:
 *   src/components/hero/
 *   ├─ OrbitHero.jsx        (this file)
 *   ├─ heroConfig.js        (sibling → "./heroConfig")
 *   └─ components/
 *      ├─ EnergyCore.jsx    (→ "./components/EnergyCore")
 *      ├─ OrbitRings.jsx
 *      ├─ FloatingMetrics.jsx
 *      └─ HeroContent.jsx
 *
 * SSR (Vike): the R3F <Canvas> touches the DOM/WebGL, so it must not run on
 * the server. We gate ONLY the canvas behind a mounted flag and show a static
 * gradient fallback during SSR + first paint. All copy and the rings/metrics
 * (CSS + Framer Motion) render server-side, so the hero looks complete and is
 * fully crawlable even before the canvas hydrates.
 */
export default function OrbitHero() {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden"
      style={{ background: COLORS.bg, minHeight: "100vh" }}
      aria-label="AI-powered growth — Skyup"
    >
      {/* backdrop glow + dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 72% 50%, ${COLORS.blue}26 0%, transparent 62%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(ellipse 90% 80% at 60% 50%, black, transparent)",
        }}
      />

      {/* layout */}
      <div className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center gap-8 px-6 py-28 lg:flex-row lg:gap-4 lg:px-[80px] lg:py-0">
        {/* left: copy */}
        <div className="flex w-full items-center lg:w-[46%] lg:pt-0">
          <HeroContent />
        </div>

        {/* right: orbit engine */}
        <div className="relative flex w-full items-center justify-center lg:w-[54%]">
          <div className="relative aspect-square w-[min(86vw,560px)] lg:w-[min(46vw,640px)]">
            {/* R3F canvas — client only */}
            <div className="absolute inset-0 z-[1]">
              {mounted ? (
                <Canvas
                  frameloop={inView ? "always" : "never"}
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  dpr={[1, 2]}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  style={{ background: "transparent" }}
                >
                  <EnergyCore />
                </Canvas>
              ) : (
                // SSR / pre-hydration fallback: a soft core glow so there's no empty hole
                <div
                  className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${COLORS.blueLight}55 0%, ${COLORS.blue}22 45%, transparent 70%)`,
                  }}
                />
              )}
            </div>

            <OrbitRings />
            <FloatingMetrics />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">Scroll</span>
        <span
          className="h-9 w-px"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.orange}, transparent)`,
            animation: "sk-cue 1.6s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes sk-cue{0%,100%{transform:scaleY(1);opacity:.35}50%{transform:scaleY(1.25);opacity:1}}`}</style>
      </div>
    </section>
  );
}
