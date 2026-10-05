// src/components/works/WorksHero.jsx
// "Orbital Command" — Works page hero.
// Layered parallax: sunrise plate drifts slowly, the station floats + parallaxes
// faster (mouse + scroll), a lightweight canvas starfield twinkles over the dark
// left, and four telemetry metrics ignite one by one. SSR-safe for Vike: every
// browser API is behind useEffect, and the markup renders fine without JS.
//
// Brand palette (matches the rest of the site):
//   deep blue  #0037CA   ·  accents #2E6BFF / #5B8CFF
//   amber      #FFB950 / #FA9F43  ·  hot orange hover #FF8B14
//   base       #04050C
//
// Assets live in /public/images/works/ and are referenced as /images/works/…
import React, { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// ── Telemetry ─────────────────────────────────────────────────────────────
// PLACEHOLDER figures — swap `to`, `prefix`, `suffix`, and `label` for the real
// numbers. Set `dec` for decimals (e.g. ROAS 3.4). Nothing else needs changing.
const METRICS = [
  { to: 120, prefix: "", suffix: "+", dec: 0, label: "Projects delivered" },
  { to: 12, prefix: "₹", suffix: "Cr+", dec: 0, label: "Ad spend managed" },
  { to: 3.4, prefix: "", suffix: "×", dec: 1, label: "Avg. ROAS" },
  { to: 40, prefix: "", suffix: "+", dec: 0, label: "Clients onboard" },
];

export default function WorksHero() {
  const bgRef = useRef(null);
  const stationRef = useRef(null);
  const bloomRef = useRef(null);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const valRefs = useRef([]);
  const metricRefs = useRef([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── count-up telemetry, igniting one by one ──────────────────────────
    const timers = [];
    METRICS.forEach((m, i) => {
      const el = valRefs.current[i];
      const wrap = metricRefs.current[i];
      const setFinal = () => {
        if (el) el.textContent = m.dec ? m.to.toFixed(m.dec) : String(m.to);
      };
      if (reduce) {
        wrap && wrap.classList.add("is-lit");
        setFinal();
        return;
      }
      const t = setTimeout(() => {
        wrap && wrap.classList.add("is-lit");
        const dur = 1100;
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          const v = m.to * e;
          if (el) el.textContent = m.dec ? v.toFixed(m.dec) : String(Math.round(v));
          if (p < 1) requestAnimationFrame(step);
          else setFinal();
        };
        requestAnimationFrame(step);
      }, 1500 + i * 260);
      timers.push(t);
    });

    // ── lightweight canvas starfield (no WebGL) ──────────────────────────
    let raf1 = 0;
    const canvas = canvasRef.current;
    let ctx, stars, W, H, dpr, tick = 0;
    const sizeStars = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = canvas.offsetWidth * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
      const n = Math.round((canvas.offsetWidth * canvas.offsetHeight) / 9000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: (Math.random() * 1.1 + 0.2) * dpr,
        s: (Math.random() * 0.02 + 0.004) * dpr,
        tw: Math.random() * 0.03 + 0.006,
        warm: Math.random() < 0.18,
      }));
    };
    if (canvas && !reduce) {
      ctx = canvas.getContext("2d");
      sizeStars();
      const drawStars = () => {
        tick += 1;
        ctx.clearRect(0, 0, W, H);
        for (const st of stars) {
          const al = 0.25 + Math.abs(Math.sin(tick * st.tw + st.x)) * 0.6;
          st.y += st.s;
          if (st.y > H) st.y = 0;
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r, 0, 7);
          ctx.fillStyle = st.warm
            ? `rgba(255,196,120,${al})`
            : `rgba(190,210,255,${al})`;
          ctx.fill();
        }
        raf1 = requestAnimationFrame(drawStars);
      };
      drawStars();
    }
    const onResize = () => !reduce && sizeStars();
    window.addEventListener("resize", onResize);

    // ── mouse + scroll parallax ──────────────────────────────────────────
    let raf2 = 0;
    let mx = 0, my = 0, tx = 0, ty = 0, sc = 0;
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => { sc = window.scrollY || 0; };
    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("scroll", onScroll, { passive: true });
      const loop = () => {
        tx += (mx - tx) * 0.06;
        ty += (my - ty) * 0.06;
        const s = Math.min(sc, window.innerHeight);
        if (bgRef.current)
          bgRef.current.style.transform = `scale(1.12) translate3d(${tx * -14}px, ${ty * -10 - s * 0.06}px, 0)`;
        if (stationRef.current)
          stationRef.current.style.transform = `translate3d(${tx * 34}px, ${ty * 26 + Math.sin(performance.now() / 2200) * 7 - s * 0.16}px, 0)`;
        if (bloomRef.current)
          bloomRef.current.style.transform = `translate3d(${tx * 22}px, ${ty * 16 - s * 0.12}px, 0)`;
        if (wrapRef.current)
          wrapRef.current.style.transform = `translate3d(${tx * 8}px, ${ty * 6}px, 0)`;
        raf2 = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="works-hero relative w-full overflow-hidden bg-[#04050C] font-sans">
      {/* scoped animation + layer styles */}
      <style>{`
        .works-hero { height: 100svh; min-height: 620px; max-height: 940px; isolation: isolate; }
        .wh-bg { position:absolute; inset:0; background-size:cover; background-position:60% 55%; transform:scale(1.12); will-change:transform; }
        .wh-bg::after { content:""; position:absolute; inset:0;
          background:
            linear-gradient(90deg, rgba(4,5,12,.95) 0%, rgba(4,5,12,.74) 26%, rgba(4,5,12,.16) 52%, rgba(4,5,12,0) 72%),
            linear-gradient(0deg, rgba(4,5,12,.85) 0%, rgba(4,5,12,0) 42%); }
        .wh-stars { position:absolute; inset:0; z-index:1; width:100%; height:100%; opacity:.9; }
        .wh-bloom { position:absolute; z-index:1; right:14%; top:24%; width:34vw; height:34vw;
          background:radial-gradient(closest-side, rgba(255,185,80,.22), rgba(255,140,60,.06) 45%, transparent 70%);
          filter:blur(6px); pointer-events:none; will-change:transform; }
        .wh-station { position:absolute; inset:0; z-index:2; background-repeat:no-repeat;
          background-position:64% 33%; background-size:min(52vw,720px) auto; will-change:transform; }
        .wh-eyebrow { opacity:0; animation:wh-rise .9s .45s forwards; }
        .wh-h1 { opacity:0; filter:blur(12px); animation:wh-focus 1.1s .6s cubic-bezier(.2,.7,.2,1) forwards; }
        .wh-lede { opacity:0; animation:wh-rise 1s .9s forwards; }
        .wh-cta  { opacity:0; animation:wh-rise 1s 1.1s forwards; }
        .wh-metric { opacity:0; transform:translateY(10px); }
        .wh-metric.is-lit { animation:wh-rise .7s forwards; }
        .wh-bar { position:absolute; top:0; left:0; height:2px; width:0;
          background:linear-gradient(90deg,#0037CA,#FFB950); box-shadow:0 0 12px rgba(255,180,90,.6); }
        .wh-metric.is-lit .wh-bar { animation:wh-fill 1s .12s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes wh-rise { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes wh-focus { from{opacity:0;filter:blur(12px);transform:translateY(14px)} to{opacity:1;filter:blur(0);transform:none} }
        @keyframes wh-fill { to{width:100%} }
        @media (max-width:820px){
          .wh-station { background-position:70% 28%; background-size:88vw auto; opacity:.92; }
          .wh-bg { background-position:64% 48%; }
        }
        @media (prefers-reduced-motion:reduce){
          .works-hero *{ animation-duration:.001s!important; animation-delay:0s!important; }
          .wh-h1{ filter:none!important; }
          .wh-bar{ width:100%!important; }
        }
      `}</style>

      {/* layers */}
      <div ref={bgRef} className="wh-bg" style={{ backgroundImage: "url(/images/works/works-hero-bg.webp)" }} />
      <canvas ref={canvasRef} className="wh-stars" />
      <div ref={bloomRef} className="wh-bloom" />
      <div ref={stationRef} className="wh-station" style={{ backgroundImage: "url(/images/works/works-hero-station.webp)" }} />

      {/* content column — headline group centered in the space above, telemetry
          pinned in normal flow at the bottom so the two can never overlap */}
      <div ref={wrapRef} className="relative z-[5] mx-auto flex h-full max-w-[1240px] flex-col px-6 pb-9 pt-28 sm:px-10 sm:pb-11 lg:px-[52px] lg:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <span className="wh-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#9CC0FF] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFB950]" />
            Skyup · Selected Work
          </span>

          <h1 className="wh-h1 mt-4 max-w-[15ch] text-4xl font-bold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[72px]">
            We run{" "}
            <span className="bg-gradient-to-r from-[#0037CA] via-[#2E6BFF] to-[#FFB950] bg-clip-text text-transparent">
              mission control
            </span>{" "}
            for growth.
          </h1>

          <p className="wh-lede mt-6 max-w-[46ch] text-base leading-relaxed text-neutral-300 sm:text-lg">
            SEO, performance marketing, and AI automation for brands ready to break
            atmosphere — engineered, measured, and launched from Bengaluru.
          </p>

          <div className="wh-cta mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#0037CA] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              View the missions
              <ArrowRight size={17} strokeWidth={2.4} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-[#FF8B14]"
            >
              <span className="inline-grid h-5 w-5 place-items-center rounded-full border border-white/30 transition-transform duration-200 group-hover:rotate-45">
                <ArrowUpRight size={12} strokeWidth={2.4} />
              </span>
              Book a launch call
            </a>
          </div>
        </div>

        {/* telemetry — sits below the content, above the fold's bottom edge */}
        <div className="mt-10 grid shrink-0 grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              ref={(el) => (metricRefs.current[i] = el)}
              className="wh-metric relative pt-4"
            >
              <span className="wh-bar" />
              <div className="flex items-baseline gap-[.1em] text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
                {m.prefix && (
                  <span className="mr-[.04em] text-[.5em] font-bold text-[#9CC0FF]">{m.prefix}</span>
                )}
                <span ref={(el) => (valRefs.current[i] = el)}>0</span>
                <span className="text-[.42em] font-bold text-[#FFB950]">{m.suffix}</span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
