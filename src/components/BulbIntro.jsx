import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GOLD = "#F1B24A";
const DARK = "#04050C";   // shared base with ScrollStoryHero — seamless handoff
const BULB = "/images/intro/bulb.webp";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const map = (v, a, b, c, d) => c + (d - c) * clamp((v - a) / (b - a), 0, 1);

/**
 * BulbIntro — scroll-driven opening.
 *   1. Black screen, dim "invisible business" line
 *   2. Scroll → the real Edison bulb lowers in, dark
 *   3. It switches ON → warm light floods (bulb stays lit above, the constant)
 *   4. Gold Cormorant tagline zooms in beneath the bulb, holds, fades out
 *   5. Hands off smoothly into the next section (children)
 *
 * SSR-safe (GSAP in isomorphic effect; DOM nodes are real).
 */
export default function BulbIntro({ children }) {
  const root = useRef(null);
  const stageRef = useRef(null);
  const dimRef = useRef(null);
  const bulbRef = useRef(null);
  const floodRef = useRef(null);
  const tagRef = useRef(null);
  const cueRef = useRef(null);

  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        // No pin runs under reduced-motion, so collapse the 330vh scroll space —
        // otherwise the sticky stage covers every section below it for 330vh.
        if (root.current) root.current.style.height = "100vh";
        if (bulbRef.current) { bulbRef.current.style.opacity = 1; bulbRef.current.style.transform = "translate(-50%, 0)"; bulbRef.current.style.filter = "brightness(1.25)"; }
        if (floodRef.current) floodRef.current.style.opacity = 1;
        if (tagRef.current) { tagRef.current.style.opacity = 1; tagRef.current.style.transform = "translate(-50%, -50%) scale(1)"; }
        if (dimRef.current) dimRef.current.style.opacity = 0;
        if (stageRef.current) stageRef.current.style.opacity = 1;
        if (cueRef.current) cueRef.current.style.opacity = 0;
        return;
      }

      let maxP = 0;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=230%",
        scrub: 1,
        pin: ".bi-stage",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          maxP = Math.max(maxP, self.progress);
          const p = maxP;

          // 1. dim "invisible" line fades out
          if (dimRef.current) {
            dimRef.current.style.opacity = map(p, 0.10, 0.26, 1, 0);
            dimRef.current.style.transform = `translateY(${map(p, 0.10, 0.26, 0, -30)}px)`;
          }

          // 2. bulb lowers in + 3. switches on (then STAYS lit — the constant)
          if (bulbRef.current) {
            bulbRef.current.style.opacity = map(p, 0.16, 0.30, 0, 1);
            bulbRef.current.style.transform = `translate(-50%, ${map(p, 0.20, 0.48, -140, 0)}px)`;
            const bright = p < 0.46 ? 0.26 : map(p, 0.46, 0.56, 0.26, 1.25);
            bulbRef.current.style.filter = `brightness(${bright.toFixed(2)})`;
          }

          // warm flood when it switches on (persists)
          if (floodRef.current) {
            floodRef.current.style.opacity = map(p, 0.46, 0.58, 0, 1);
          }

          // 4. gold Cormorant tagline — zooms in beneath the bulb and HOLDS (final beat)
          if (tagRef.current) {
            const tscale = map(p, 0.54, 0.78, 1.5, 1);
            tagRef.current.style.opacity = map(p, 0.54, 0.74, 0, 1);
            tagRef.current.style.transform = `translate(-50%, -50%) scale(${tscale.toFixed(3)})`;
          }

          if (cueRef.current) cueRef.current.style.opacity = p < 0.08 ? 1 : 0;
        },
      });
      return () => st.kill();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={root} className="relative w-full" style={{ height: "330vh", background: DARK, isolation: "isolate" }}>
        <div ref={stageRef} className="bi-stage sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ background: DARK }}>
          <div className="bi-blackout pointer-events-none absolute inset-0 z-0" style={{ background: DARK }} />
          <div ref={floodRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0, background: `radial-gradient(circle at 50% 28%, ${GOLD}40, transparent 56%)` }} />

          {/* dim invisible-business line */}
          <div ref={dimRef} className="absolute z-[5] px-6 text-center">
            <div className="leading-tight" style={{ color: "rgba(238,236,231,0.6)", fontSize: "clamp(2.1rem,4.6vw,3.8rem)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, letterSpacing: "0.005em", textShadow: "0 1px 30px rgba(0,0,0,0.6)" }}>
              If the world can&apos;t see your business,
              <br />it might as well look like this.
            </div>
            <div className="mt-8 text-sm md:text-base" style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(238,236,231,0.72)" }}>
              <span style={{ color: "#3D6BF0", fontWeight: 600 }}>Scroll</span>{" "}
              <span style={{ color: "#FA9F43", fontWeight: 600 }}>down</span>{" "}
              to see what real visibility looks like&nbsp;↓
            </div>
          </div>

          {/* the real bulb — stays lit above as the constant */}
          <img
            ref={bulbRef}
            src={BULB}
            alt=""
            aria-hidden="true"
            width="400"
            height="600"
            fetchpriority="high"
            className="absolute left-1/2 top-[3vh] z-[8] h-[44vh] w-auto object-contain"
            style={{ opacity: 0, transform: "translate(-50%, -120px)", filter: "brightness(0.26)", willChange: "transform, opacity, filter" }}
          />

          {/* gold Cormorant tagline (earlier beat, in the clear band below the bulb) */}
          <div
            ref={tagRef}
            className="absolute left-1/2 z-[11] px-6 text-center"
            style={{ top: "73%", opacity: 0, transform: "translate(-50%, -50%) scale(1.55)", willChange: "transform, opacity" }}
          >
            <div
              className="mx-auto max-w-[48rem]"
              style={{
                color: GOLD,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.3rem,3vw,2.4rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              We bring your business the visibility it deserves.
            </div>
          </div>

          <div ref={cueRef} className="absolute bottom-8 left-1/2 z-[10] -translate-x-1/2 text-[10px] uppercase tracking-[0.25em]" style={{ color: "#555" }}>
            scroll
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
