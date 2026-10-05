// src/components/service/ResultsAndProcess.jsx
import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, Workflow } from "lucide-react";

/* ─────────────────────────────  STATS  ───────────────────────────── */

const STATS = [
  { value: 80, suffix: "+", label: "Served clients throughout India" },
  {
    value: 4.2,
    decimals: 1,
    suffix: "x",
    label: "Average ROAS for paid campaigns",
  },
  { value: 3, suffix: "x", label: "Average growth of organic traffic" },
  { value: 60, suffix: "%", label: "Time saved with Ops AI automation" },
  { value: 98, suffix: "%", label: "Client retention ratio" },
];

function useCountUp(target, decimals, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const dur = 1400;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return decimals ? n.toFixed(decimals) : Math.round(n);
}

function Stat({ value, decimals, suffix, label, run }) {
  const display = useCountUp(value, decimals, run);
  return (
    <div className="px-4 text-center lg:px-6">
      <div className="text-white text-4xl font-extrabold tracking-tight sm:text-5xl">
        {display}
        {suffix}
      </div>
      <p className="mx-auto mt-3 max-w-[14rem] text-sm font-medium leading-relaxed text-slate-400">
        {label}
      </p>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-6 py-16 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9cc0ff] backdrop-blur">
            <TrendingUp size={13} />
            Results that speak
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]">
            Numbers we're{" "}
            <span className="bg-gradient-to-r from-[#5b8cff] to-[#FA9F43] bg-clip-text text-transparent">
              proud to share
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Across 80+ clients in Bangalore and beyond — these are averages, not
            cherry-picked wins.
          </p>
        </div>

        {/* soft single panel, numbers split by thin dividers */}
        <div
          ref={ref}
          className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-12"
        >
          <div className="grid gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-white/10">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} run={run} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────  PROCESS  ────────────────────────────
   Rocket-driven vertical timeline (same concept as the home "Why Choose
   Skyup" section): the rocket descends the center line as you scroll, its
   flame flaring as it passes each step. Steps stay dim until reached, flare
   orange as the rocket passes, then settle blue-lit. Palette matched to the
   service page (blue + orange). Background stays transparent so the
   ServiceUniverse starfield shows through. */

const BLUE = "#0037CA";
const BLUE_LIGHT = "#5b8cff";
const ORANGE = "#FA9F43";
const ORANGE_LIGHT = "#FFB950";

const STEPS = [
  {
    n: "01",
    title: "Discovery call",
    desc: "We understand your goals, the gaps that exist, and what success looks like.",
  },
  {
    n: "02",
    title: "Audit & strategy",
    desc: "We audit your current setup and create a targeted, ROI-first plan.",
  },
  {
    n: "03",
    title: "Execution sprint",
    desc: "Your team ships fast. No committees. No bottlenecks.",
  },
  {
    n: "04",
    title: "Reporting & review",
    desc: "Weekly calls and live dashboards. Know the numbers, always.",
  },
  {
    n: "05",
    title: "Scale & optimise",
    desc: "Double down on what works. Cut what won't. Every month.",
  },
];

function ProcessSection() {
  const lineWrapRef = useRef(null);
  const itemRefs = useRef([]);
  const [fill, setFill] = useState(0);        // 0..1 how far the rocket has travelled
  const [flame, setFlame] = useState(0.3);    // 0..1 flame intensity (idle = small but lit)
  const [hotNode, setHotNode] = useState(-1); // node the rocket is flaring past
  const [activated, setActivated] = useState(() => new Set()); // nodes reached

  const velRef = useRef(0);
  const flareRef = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const targetRef = useRef(0);
  const posRef = useRef(0);
  const geomRef = useRef({ wrapH: 1, centers: [] });

  // scroll → set target position + measure speed + cache node geometry
  useEffect(() => {
    const measure = () => {
      const el = lineWrapRef.current;
      if (!el) return;
      geomRef.current = {
        wrapH: el.offsetHeight,
        centers: itemRefs.current.map((it) => (it ? it.offsetTop + 40 : 0)),
      };
    };
    const onScroll = () => {
      const el = lineWrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      targetRef.current = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / r.height));

      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastT.current;
      if (dt > 0 && lastT.current) {
        const v = Math.abs(y - lastY.current) / dt;
        velRef.current = Math.max(velRef.current, Math.min(1, v / 2.2));
      }
      lastY.current = y;
      lastT.current = now;
    };
    measure();
    onScroll();
    const onResize = () => { measure(); onScroll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // single rAF loop: glide rocket toward target, then derive nodes + flame
  useEffect(() => {
    let raf;
    const tick = () => {
      posRef.current += (targetRef.current - posRef.current) * 0.12;
      const pos = posRef.current;
      setFill(pos);

      const { wrapH, centers } = geomRef.current;
      const rocketPx = pos * wrapH;
      let minD = Infinity, near = -1;
      const reached = [];
      centers.forEach((c, i) => {
        const d = Math.abs(c - rocketPx);
        if (d < minD) { minD = d; near = i; }
        if (rocketPx >= c - 6) reached.push(i);
      });
      const THRESH = 56;
      const isHot = minD < THRESH;
      flareRef.current = isHot ? 1 - minD / THRESH : 0;
      setHotNode(isHot ? near : -1);
      setActivated((prev) => {
        if (prev.size === reached.length && reached.every((i) => prev.has(i))) return prev;
        return new Set(reached);
      });

      velRef.current *= 0.9;
      const ft = Math.max(0.3, velRef.current, flareRef.current * 0.9);
      setFlame((p) => p + (ft - p) * 0.18);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative px-6 py-16 lg:px-[120px]">
      <style>{`
        @keyframes rapFlame { 0%,100%{transform:translateX(-50%) scaleY(1) scaleX(1);opacity:.85} 35%{transform:translateX(-50%) scaleY(1.28) scaleX(.9);opacity:1} 70%{transform:translateX(-50%) scaleY(.9) scaleX(1.08);opacity:.9} }
        .rap-flame{animation:rapFlame .28s ease-in-out infinite}
        .rap-ember{animation:rapFlame .19s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){.rap-flame,.rap-ember{animation:none}}
      `}</style>

      {/* subtle warm glow at the top (transparent — universe still shows) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{ background: `radial-gradient(50% 60% at 50% 0%, ${ORANGE}10, transparent 70%)` }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl">
        {/* heading — unchanged */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9cc0ff] backdrop-blur">
            <Workflow size={13} />
            How we work
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]">
            Our 5-step{" "}
            <span className="bg-gradient-to-r from-[#5b8cff] to-[#FA9F43] bg-clip-text text-transparent">
              engagement process
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            No surprises. No guesswork. You know exactly what's happening and
            why at every stage.
          </p>
        </div>

        {/* rocket timeline */}
        <div ref={lineWrapRef} className="relative z-10 mx-auto mt-16 max-w-5xl">
          {/* center line (track) */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          {/* center line (orange fill) */}
          <div
            className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 md:block"
            style={{
              height: `${fill * 100}%`,
              background: `linear-gradient(to bottom, ${ORANGE}, ${ORANGE_LIGHT})`,
              boxShadow: `0 0 16px ${ORANGE}99`,
            }}
          />

          {/* traveling rocket (nose down, flame trailing above) */}
          <div
            className="absolute left-1/2 z-30 hidden -translate-x-1/2 md:block"
            style={{ top: `${fill * 100}%` }}
          >
            <div className="relative -translate-y-1/2" style={{ filter: `drop-shadow(0 0 ${6 + flame * 8}px ${ORANGE}cc)` }}>
              <div className="rap-flame absolute left-1/2 bottom-full -translate-x-1/2" style={{
                width: 5 + flame * 3, height: 12 + flame * 14,
                background: `linear-gradient(to top, #FFE9A8, ${ORANGE_LIGHT}, ${ORANGE}cc, transparent)`,
                borderRadius: "50% 50% 40% 40%", filter: "blur(0.6px)", opacity: 0.7 + flame * 0.3,
                transformOrigin: "bottom center",
              }} />
              <div className="rap-ember absolute left-1/2 bottom-full -translate-x-1/2" style={{
                width: 3, height: 6 + flame * 6,
                background: "linear-gradient(to top, #fff, #FFE9A8, transparent)",
                borderRadius: "50%", opacity: 0.9, transformOrigin: "bottom center",
              }} />
              <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
                <path d="M11 0C14.5 3 16 8 16 14V20H6V14C6 8 7.5 3 11 0Z" fill="url(#rapBody)"/>
                <path d="M11 0C12.7 1.5 13.8 3.4 14.5 5.5H7.5C8.2 3.4 9.3 1.5 11 0Z" fill="#fff" opacity="0.9"/>
                <circle cx="11" cy="11" r="2.4" fill="#0A0A12"/>
                <circle cx="11" cy="11" r="2.4" stroke={BLUE_LIGHT} strokeWidth="1.2"/>
                <path d="M6 14L2 20L6 19V14Z" fill={ORANGE}/>
                <path d="M16 14L20 20L16 19V14Z" fill={ORANGE}/>
                <rect x="6" y="19" width="10" height="2.5" rx="1" fill={ORANGE_LIGHT}/>
                <defs>
                  <linearGradient id="rapBody" x1="6" y1="0" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF"/>
                    <stop offset="0.5" stopColor={ORANGE_LIGHT}/>
                    <stop offset="1" stopColor={ORANGE}/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-2">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;         // even = left, odd = right
              const on = activated.has(i);       // rocket has reached this node
              const hot = hotNode === i;         // rocket is passing right now
              return (
                <div
                  key={s.n}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className="relative md:grid md:grid-cols-2 md:items-center md:gap-0"
                >
                  {/* node on the center line */}
                  <div
                    className="absolute left-1/2 top-8 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full md:block"
                    style={{
                      background: hot ? ORANGE_LIGHT : (on ? BLUE_LIGHT : "#1a1d2e"),
                      border: `2px solid ${hot ? ORANGE : (on ? BLUE_LIGHT : "rgba(255,255,255,0.15)")}`,
                      boxShadow: hot
                        ? `0 0 22px 6px ${ORANGE}, 0 0 9px 2px #FFE08A`
                        : (on ? `0 0 16px 3px ${BLUE}aa` : "none"),
                      transform: `translateX(-50%) scale(${hot ? 1.4 : 1})`,
                      transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                    }}
                  />

                  {/* card — placed left or right */}
                  <div className={left ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"}>
                    <div
                      className="group rounded-2xl p-6 transition-all duration-700"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                        border: "1px solid rgba(255,255,255,0.08)",
                        opacity: on ? 1 : 0,
                        transform: on ? "translateY(0)" : "translateY(28px)",
                        boxShadow: on ? `0 20px 50px -20px ${ORANGE}30` : "none",
                      }}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ background: `${BLUE}22`, border: `1px solid ${BLUE}55` }}
                        >
                          <span className="bg-gradient-to-r from-[#5b8cff] to-[#FA9F43] bg-clip-text text-lg font-extrabold text-transparent">
                            {s.n}
                          </span>
                        </span>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>
                          Step {s.n}
                        </span>
                      </div>
                      <h3 className="mb-2 font-bold text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.3rem", letterSpacing: "-0.01em" }}>
                        {s.title}
                      </h3>
                      <p className="text-white/55" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

export default function ResultsAndProcess() {
  return (
    <>
      <StatsSection />
      <ProcessSection />
    </>
  );
}
