import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryCore from "./components/StoryCore";

/* ── inline config (no external heroConfig file needed) ── */
const COLORS = { blue: "#0037CA", blueLight: "#3D6BF0", orange: "#F25623", bg: "#04050C" };
const CYCLE_WORDS = ["Growth", "Leads", "Revenue", "Results"];
const SCROLL_LENGTH_VH = 300;
const METRICS = [
  { id: "roas",   value: "4.2\u00d7", label: "ROAS",       full: "Return on ad spend",   angle: 305, radius: 50, accent: "blue",   delay: 0.9  },
  { id: "growth", value: "320%", label: "Growth",     full: "Organic, YoY",         angle: 40,  radius: 53, accent: "orange", delay: 1.05 },
  { id: "leads",  value: "147+", label: "Leads",      full: "Qualified, per month", angle: 150, radius: 49, accent: "blue",   delay: 1.2  },
  { id: "ret",    value: "98%",  label: "Retention",  full: "Client retention",     angle: 215, radius: 52, accent: "orange", delay: 1.35 },
];
const RINGS = [
  { size: 56,  dur: 24, dir:  1, tilt: 68, dash: "2 9",  accent: "blue",   opacity: 0.55 },
  { size: 78,  dur: 36, dir: -1, tilt: 72, dash: "1 13", accent: "orange", opacity: 0.40 },
  { size: 100, dur: 50, dir:  1, tilt: 75, dash: "2 17", accent: "blue",   opacity: 0.26 },
];
const SERVICES = [
  { id: "seo", name: "SEO",             desc: "Rank where customers search" },
  { id: "ads", name: "Paid Ads",        desc: "Meta & Google, built for ROAS" },
  { id: "ai",  name: "AI Automation",   desc: "Voice agents, bots, workflows" },
  { id: "web", name: "Web Development", desc: "Fast, converting websites" },
];
const SCENES = {
  zoom:      [0.04, 0.26],
  detach:    [0.26, 0.50],
  collapse:  [0.50, 0.64],
  statement: [0.60, 0.78],
  services:  [0.80, 1.00],
};
function polarToOffset(angleDeg, radiusPct) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: Math.cos(rad) * radiusPct, y: Math.sin(rad) * radiusPct };
}

/**
 * useLayoutEffect warns during SSR; on the server fall back to useEffect.
 * Inlined here so there's no separate hook file to resolve.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ScrollStoryHero — the full 5-scene pinned scroll story.
 *
 *   Scene 1  hero        headline + orbiting metrics (entrance)
 *   Scene 2  zoom        rings accelerate, camera pushes into core, headline recedes
 *   Scene 3  detach      metrics detach → expand into 4 result cards
 *   Scene 4  collapse    cards collapse into core → pulse → "Results don't happen by accident"
 *   Scene 5  services    statement fades, services emerge, stage lifts → hands off
 *
 * One ScrollTrigger pins the stage and scrubs one master timeline across
 * SCROLL_LENGTH_VH. The R3F core is driven by a shared ref the timeline writes.
 *
 * SSR (Vike): GSAP runs in useIsomorphicLayoutEffect (client only); the Canvas
 * is gated behind `mounted`. All copy/metrics/services are real DOM (crawlable).
 */
export default function ScrollStoryHero({ children }) {
  const root = useRef(null);
  const story = useRef({ zoom: 0, spin: 1, intensity: 1, pulseT: -1 });
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [inView, setInView] = useState(false); // render WebGL only while on-screen
  const [word, setWord] = useState(0);

  useEffect(() => {
    setMounted(true);
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))));
    } catch { setWebgl(false); }
  }, []);

  // Render the WebGL core only while the hero is on-screen (pre-activated by a margin
  // so it's ready before it's seen). Off-screen → the render loop stops.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // cycling headline word (client only)
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setWord((p) => (p + 1) % CYCLE_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(q(".sk-hero-copy"), { opacity: 0, y: 26 });
      gsap.set(q(".sk-metric"), { opacity: 0, scale: 0.6, xPercent: -50, yPercent: -50 });
      gsap.set(q(".sk-card"), { opacity: 0, y: 30, scale: 0.96 });
      gsap.set(q(".sk-statement"), { opacity: 0, scale: 0.92 });
      gsap.set(q(".sk-service"), { opacity: 0, y: 30 });

      // intro entrance (once)
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(q(".sk-hero-copy"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
        .to(q(".sk-metric"), { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 }, "-=0.5");

      if (reduce) {
        gsap.set(q(".sk-card, .sk-statement, .sk-service"), { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCROLL_LENGTH_VH}%`,
          scrub: 1,
          pin: q(".sk-stage")[0],
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      const at = ([s, e]) => ({ start: s, dur: e - s });

      // SCENE 2 — zoom + ring acceleration
      {
        const { start, dur } = at(SCENES.zoom);
        tl.to({}, {
          duration: dur,
          onUpdate() {
            const p = this.progress();
            story.current.zoom = p * 0.5;
            story.current.spin = 1 + p * 1.0;
            story.current.intensity = 1 + p * 0.25;
          },
        }, start);
        tl.to(q(".sk-rings"), { scale: 1.05, duration: dur, ease: "power1.in" }, start);
        tl.to(q(".sk-hero-copy"), { opacity: 0, y: -28, duration: dur * 0.6, ease: "power2.in" }, start);
      }

      // SCENE 3 — metrics detach → cards
      {
        const { start, dur } = at(SCENES.detach);
        q(".sk-metric").forEach((el, i) => {
          tl.to(el, {
            x: el.dataset.outx, y: el.dataset.outy, opacity: 0, scale: 0.4,
            duration: dur * 0.4, ease: "power2.in",
          }, start + i * 0.01);
        });
        tl.to(q(".sk-card"), {
          opacity: 1, y: 0, scale: 1, duration: dur * 0.55, stagger: dur * 0.07, ease: "power3.out",
        }, start + dur * 0.35);
        tl.to({}, {
          duration: dur,
          onUpdate() {
            const p = this.progress();
            story.current.zoom = 0.5 - p * 0.22;
            story.current.intensity = 1.25 - p * 0.12;
          },
        }, start);
      }

      // SCENE 4 — collapse → pulse → statement
      {
        const { start, dur } = at(SCENES.collapse);
        tl.to(q(".sk-card"), {
          opacity: 0, scale: 0.3, x: 0, y: 0, duration: dur * 0.7, stagger: dur * 0.05, ease: "power2.in",
        }, start);
        tl.to({}, { duration: 0.01, onComplete: () => (story.current.pulseT = 0) }, start + dur * 0.68);
        tl.to({}, {
          duration: dur,
          onUpdate() {
            const p = this.progress();
            story.current.spin = 3.4 - p * 1.4;
            story.current.intensity = 1.1 + Math.sin(p * Math.PI) * 0.5;
          },
        }, start);
      }
      {
        const { start, dur } = at(SCENES.statement);
        tl.to(q(".sk-statement"), { opacity: 1, scale: 1, duration: dur * 0.5, ease: "power3.out" }, start);
        tl.to(q(".sk-statement"), { opacity: 0, scale: 1.04, duration: dur * 0.4, ease: "power2.in" }, start + dur * 0.6);
      }

      // SCENE 5 — services emerge + hand off
      {
        const { start, dur } = at(SCENES.services);
        tl.to(q(".sk-service"), { opacity: 1, y: 0, duration: dur * 0.5, stagger: dur * 0.1, ease: "power3.out" }, start);
        tl.to({}, {
          duration: dur,
          onUpdate() {
            const p = this.progress();
            story.current.intensity = 1.0 - p * 0.5;
            story.current.spin = 2.0 - p * 1.3;
            story.current.zoom = 0.28 - p * 0.28;
          },
        }, start);
        tl.to(q(".sk-stage-inner"), { y: -40, duration: dur, ease: "power1.inOut" }, start);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={root}
        className="relative w-full"
        style={{ height: `${SCROLL_LENGTH_VH + 100}vh`, background: COLORS.bg }}
      >
        <div className="sk-stage sticky top-0 h-screen w-full overflow-hidden" style={{ background: COLORS.bg }}>
          {/* uniform full-bleed starfield — no glow panel, no bounded star cluster, so there is no visible box */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

          {/* full-screen 3D core — z-0 keeps WebGL strictly behind everything */}
          <div className="absolute inset-0 z-[0]" style={{ isolation: "isolate" }}>
            {mounted && webgl ? (
              <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}>
                <StoryCore story={story} />
              </Canvas>
            ) : (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: "44vh", height: "44vh", background: `radial-gradient(circle, ${COLORS.blueLight}55 0%, ${COLORS.blue}22 45%, transparent 70%)` }} />
            )}
          </div>

          {/* all DOM content — z-10 with isolation forces a new stacking context above the WebGL layer */}
          <div className="sk-stage-inner absolute inset-0 z-[10] flex h-full w-full items-center justify-center" style={{ isolation: "isolate" }}>
            {/* orbit overlay — rings + metric chips sit over the full-screen core */}
            <div className="relative aspect-square w-[min(88vw,640px)]">
              <Rings />
              <Metrics />
            </div>

            {/* Scene 1 — headline */}
            <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center">
              <span className="sk-hero-copy mb-6 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
                style={{ color: COLORS.orange, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
                <span className="h-px w-7" style={{ background: COLORS.orange }} />
                Bengaluru&apos;s AI Growth Agency
              </span>
              <h1 className="sk-hero-copy font-bold leading-[0.96] tracking-[-0.035em] text-white"
                style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(2.8rem,6.5vw,5.4rem)", filter: "drop-shadow(0 3px 22px rgba(0,0,0,0.7))" }}>
                AI-Powered{" "}
                <span style={{ color: COLORS.orange }}>
                  {CYCLE_WORDS[word]}.
                </span>
                <span className="sr-only"> {CYCLE_WORDS.join(", ")}.</span>
              </h1>
              <p className="sk-hero-copy mt-5 text-sm uppercase tracking-[0.18em] text-white/55">
                SEO • Paid Ads • AI Automation • Web Development
              </p>
            </div>

            {/* Scene 3 — result cards */}
            <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-6">
              <div className="grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
                {METRICS.map((m) => {
                  const accent = m.accent === "orange" ? COLORS.orange : COLORS.blueLight;
                  return (
                    <div key={m.id} className="sk-card relative rounded-2xl border p-6"
                      style={{ background: "rgba(8,10,22,0.85)", borderColor: `${accent}33`, boxShadow: `0 20px 60px ${accent}1a`, backdropFilter: "blur(14px)" }}>
                      <span className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r" style={{ background: accent }} />
                      <div className="font-bold leading-none tracking-tight text-white"
                        style={{ fontSize: "2.4rem", fontFamily: "'Geist Variable',sans-serif" }}>{m.value}</div>
                      <div className="mt-3 text-sm font-medium uppercase tracking-[0.1em]" style={{ color: accent }}>{m.label}</div>
                      <div className="mt-1 text-xs text-white/45">{m.full}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scene 4 — statement */}
            <div className="sk-statement pointer-events-none absolute inset-0 z-[4] flex items-center justify-center px-6">
              <h2 className="max-w-4xl text-center font-bold leading-[1.02] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(2.2rem,5.5vw,4.6rem)" }}>
                Results don&apos;t happen
                <br />
                <span style={{ color: COLORS.orange }}>by accident.</span>
              </h2>
            </div>

            {/* Scene 5 — services: centered over the orb */}
            <div className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center px-6" style={{ willChange: "transform" }}>
              <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                {SERVICES.map((s, i) => (
                  <div key={s.id} className="sk-service rounded-2xl p-6 text-center"
                    style={{ background: "linear-gradient(135deg,#0037CA,#1b60f4)", border: "1px solid #3D6BF0", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                    <div className="text-xs font-medium" style={{ color: COLORS.orange }}>0{i + 1}</div>
                    <div className="mt-2 font-bold tracking-tight"
                      style={{ fontSize: "1.25rem", fontFamily: "'Geist Variable',sans-serif", color: "#fff" }}>{s.name}</div>
                    <div className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}
    </>
  );
}

/* ── rings ── */
function Rings() {
  return (
    <div className="sk-rings absolute inset-0 z-[2] flex items-center justify-center" style={{ perspective: "1200px" }} aria-hidden="true">
      <style>{`
        @keyframes sk-spin { to { transform: rotateZ(360deg); } }
        .sk-ring > .sk-spin { width:100%; height:100%; transform-origin:center; }
        .sk-ring svg { transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce){ .sk-spin{ animation:none !important; } }
      `}</style>
      {RINGS.map((ring, i) => {
        const stroke = ring.accent === "orange" ? COLORS.orange : COLORS.blueLight;
        return (
          <div key={i} className="sk-ring absolute"
            style={{ width: `${ring.size}%`, height: `${ring.size}%`, transform: `rotateX(${ring.tilt}deg)`, transformStyle: "preserve-3d", opacity: ring.opacity }}>
            <div className="sk-spin" style={{ animation: `sk-spin ${ring.dur}s linear infinite ${ring.dir < 0 ? "reverse" : ""}` }}>
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                <circle cx="50" cy="50" r="49" fill="none" stroke={stroke} strokeWidth="0.35" strokeDasharray={ring.dash} style={{ opacity: ring.opacity }} />
                <circle cx="50" cy="50" r="49" fill="none" stroke={stroke} strokeWidth="0.12" style={{ opacity: ring.opacity * 0.6 }} />
                <circle cx="50" cy="1" r={ring.accent === "orange" ? 1.4 : 1.1} fill={stroke} style={{ filter: `drop-shadow(0 0 3px ${stroke})` }} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── orbiting metrics (Scene 1) ── */
function Metrics() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {METRICS.map((m) => {
        const { x, y } = polarToOffset(m.angle, m.radius);
        const accent = m.accent === "orange" ? COLORS.orange : COLORS.blueLight;
        // radial outward fling (px) used by the Scene-3 detach
        const rad = (m.angle - 90) * (Math.PI / 180);
        const fx = (Math.cos(rad) * 80).toFixed(1);
        const fy = (Math.sin(rad) * 80).toFixed(1);
        return (
          // wrapper carries the TRUE orbit position (left/top are % of the orbit stage,
          // unlike a % transform which is relative to the chip's own size)
          <div key={m.id} className="absolute" style={{ left: `${50 + x}%`, top: `${50 + y}%` }}>
            <div className="sk-metric" data-outx={fx} data-outy={fy}>
              <div className="rounded-xl border px-3.5 py-2.5 backdrop-blur-md"
                style={{ background: "rgba(8,10,22,0.74)", borderColor: `${accent}40`, boxShadow: `0 8px 32px ${accent}1f`, minWidth: 104 }}>
                <div className="font-bold leading-none tracking-tight text-white" style={{ fontSize: "1.3rem", fontFamily: "'Geist Variable',sans-serif" }}>{m.value}</div>
                <div className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.14em]" style={{ color: accent }}>{m.label}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
