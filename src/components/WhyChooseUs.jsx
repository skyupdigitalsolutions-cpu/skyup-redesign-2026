import React, { useEffect, useRef, useState } from "react";
import { Compass, Cpu, TrendingUp, Layers, ShieldCheck, Sprout } from "lucide-react";

const BLUE = "#0037CA";
const BLUE_LIGHT = "#3D6BF0";
const ORANGE = "#F25623";
const ORANGE_LIGHT = "#FF8A4C";
const BG = "#07060A";

const steps = [
  { icon: Compass,     title: "Strategy Comes First",        hint: "Research before tactics",      desc: "Before we launch a campaign, we get to know your business, your customers, and your competitors inside out. Our recommendations are based on research and customized to your goals — not pulled from a one-size-fits-all playbook." },
  { icon: Cpu,         title: "AI-Powered, Start to Finish", hint: "Automation that works for you", desc: "We don't use AI as a buzzword but as a practical tool to get better results. Our systems target audiences smarter, automate reporting, and manage leads with AI — so your marketing is more efficient and your results more predictable." },
  { icon: TrendingUp,  title: "Results Over Vanity Metrics", hint: "Outcomes, not impressions",     desc: "Impressions and reach are nice. Better leads and revenue are better. We're built around measurable outcomes — we set real performance targets from the outset and hold ourselves accountable to them." },
  { icon: Layers,      title: "Multi-Channel, One Roof",     hint: "Every channel, one team",       desc: "SEO, paid advertising, social media, AI automation, web development, video editing, and design — all managed by specialists, all under one team. No more juggling multiple agencies or losing work in between." },
  { icon: ShieldCheck, title: "Transparent by Default",      hint: "Open reporting, always",        desc: "You'll know exactly how your campaigns are performing, where your budget is going, and what we're doing about it. Open, honest reporting — no hiding behind jargon." },
  { icon: Sprout,      title: "Built for Long-Term Growth",  hint: "Growth that compounds",         desc: "We don't chase fast wins that disappear. Every strategy we build is designed to compound over time — delivering sustainable growth that serves your business for years, not quarters." },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const lineWrapRef = useRef(null);
  const itemRefs = useRef([]);
  const [fill, setFill] = useState(0);   // 0..1 how far the rocket has travelled
  const [flame, setFlame] = useState(0.3); // 0..1 flame intensity (idle = small but lit)
  const [hotNode, setHotNode] = useState(-1); // node the rocket is currently flaring past
  const [activated, setActivated] = useState(() => new Set()); // nodes the rocket has reached

  // scroll-velocity + proximity targets, eased into `flame` by a rAF loop
  const velRef = useRef(0);     // normalized scroll speed 0..1
  const flareRef = useRef(0);   // proximity-to-node burst 0..1
  const lastY = useRef(0);
  const lastT = useRef(0);
  const targetRef = useRef(0);  // where the rocket WANTS to be (raw scroll), 0..1
  const posRef = useRef(0);     // where the rocket IS (eased), 0..1
  const geomRef = useRef({ wrapH: 1, centers: [] }); // cached node geometry

  // scroll only sets the TARGET + measures speed + caches node positions
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
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  // single rAF loop: glide the rocket toward its target, then derive nodes + flame
  useEffect(() => {
    let raf = 0;
    let running = false;
    const tick = () => {
      // ease the rocket smoothly toward the scroll target
      posRef.current += (targetRef.current - posRef.current) * 0.12;
      const pos = posRef.current;
      setFill(pos);

      // nodes, from the rocket's ACTUAL (eased) position
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

      // flame: idle small, grows with scroll speed / passing a node
      velRef.current *= 0.9;
      const ft = Math.max(0.3, velRef.current, flareRef.current * 0.9);
      setFlame((p) => p + (ft - p) * 0.18);

      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    // Only run the loop while the rocket section is on screen — no point burning
    // 60fps of work (and re-renders) when it's scrolled out of view.
    const el = sectionRef.current;
    if (el && typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? start() : stop()),
        { rootMargin: "200px 0px 200px 0px" },
      );
      io.observe(el);
      return () => { io.disconnect(); stop(); };
    }
    start();
    return () => stop();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-24 md:py-32" style={{ background: BG }}>
      <style>{`
        @keyframes wcuFlame { 0%,100%{transform:translateX(-50%) scaleY(1) scaleX(1);opacity:.85} 35%{transform:translateX(-50%) scaleY(1.28) scaleX(.9);opacity:1} 70%{transform:translateX(-50%) scaleY(.9) scaleX(1.08);opacity:.9} }
        .wcu-flame{animation:wcuFlame .28s ease-in-out infinite}
        .wcu-ember{animation:wcuFlame .19s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){.wcu-flame,.wcu-ember{animation:none}}
      `}</style>
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 50% at 50% 0%, ${ORANGE}10, transparent 70%)` }} />

      {/* heading */}
      <div className="relative z-10 mx-auto mb-20 max-w-3xl px-6 text-center">
        <span className="mb-5 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em]" style={{ color: ORANGE }}>
          <span className="h-px w-7" style={{ background: ORANGE }} /> Why Skyup <span className="h-px w-7" style={{ background: ORANGE }} />
        </span>
        <h2 className="font-bold leading-[1.05] text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.2rem,5vw,3.6rem)", letterSpacing: "-0.02em" }}>
          WHY CHOOSE SKYUP
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/55" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.02rem", lineHeight: 1.6 }}>
          What working with us actually looks like — the principles behind every campaign we run.
        </p>
      </div>

      {/* zig-zag timeline */}
      <div ref={lineWrapRef} className="relative z-10 mx-auto max-w-5xl px-6">
        {/* center line (track) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block" style={{ background: "rgba(255,255,255,0.08)" }} />
        {/* center line (orange fill) */}
        <div className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 md:block" style={{ height: `${fill * 100}%`, background: `linear-gradient(to bottom, ${ORANGE}, ${ORANGE_LIGHT})`, boxShadow: `0 0 16px ${ORANGE}99` }} />
        {/* traveling rocket (custom SVG, nose down, small fire trailing above) */}
        <div className="absolute left-1/2 z-30 hidden -translate-x-1/2 md:block" style={{ top: `${fill * 100}%` }}>
          <div className="relative -translate-y-1/2" style={{ filter: `drop-shadow(0 0 ${6 + flame * 8}px ${ORANGE}cc)` }}>
            {/* small fire trail (above the rocket = behind it while descending), always lit + flickering */}
            <div className="wcu-flame absolute left-1/2 bottom-full -translate-x-1/2" style={{
              width: 5 + flame * 3, height: 12 + flame * 14,
              background: `linear-gradient(to top, #FFE9A8, ${ORANGE_LIGHT}, ${ORANGE}cc, transparent)`,
              borderRadius: "50% 50% 40% 40%", filter: "blur(0.6px)", opacity: 0.7 + flame * 0.3,
              transformOrigin: "bottom center",
            }} />
            {/* tiny inner ember core */}
            <div className="wcu-ember absolute left-1/2 bottom-full -translate-x-1/2" style={{
              width: 3, height: 6 + flame * 6,
              background: "linear-gradient(to top, #fff, #FFE9A8, transparent)",
              borderRadius: "50%", opacity: 0.9, transformOrigin: "bottom center",
            }} />
            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}>
              {/* body */}
              <path d="M11 0C14.5 3 16 8 16 14V20H6V14C6 8 7.5 3 11 0Z" fill="url(#rkbody)"/>
              {/* nose tip */}
              <path d="M11 0C12.7 1.5 13.8 3.4 14.5 5.5H7.5C8.2 3.4 9.3 1.5 11 0Z" fill="#fff" opacity="0.9"/>
              {/* window */}
              <circle cx="11" cy="11" r="2.4" fill="#0A0A12"/>
              <circle cx="11" cy="11" r="2.4" stroke={BLUE_LIGHT} strokeWidth="1.2"/>
              {/* fins */}
              <path d="M6 14L2 20L6 19V14Z" fill={ORANGE}/>
              <path d="M16 14L20 20L16 19V14Z" fill={ORANGE}/>
              {/* base */}
              <rect x="6" y="19" width="10" height="2.5" rx="1" fill={ORANGE_LIGHT}/>
              <defs>
                <linearGradient id="rkbody" x1="6" y1="0" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF"/>
                  <stop offset="0.5" stopColor={ORANGE_LIGHT}/>
                  <stop offset="1" stopColor={ORANGE}/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const left = i % 2 === 0; // even = left, odd = right
            const on = activated.has(i);   // rocket has reached this node
            const hot = hotNode === i;     // rocket is passing it right now
            return (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className="relative md:grid md:grid-cols-2 md:items-center md:gap-0"
              >
                {/* node on the center line — stays dim until the rocket reaches it,
                    flares orange as it passes, then stays blue-lit */}
                <div className="absolute left-1/2 top-8 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full md:block"
                  style={{
                    background: hot ? ORANGE_LIGHT : (on ? BLUE_LIGHT : "#1a1d2e"),
                    border: `2px solid ${hot ? ORANGE : (on ? BLUE_LIGHT : "rgba(255,255,255,0.15)")}`,
                    boxShadow: hot
                      ? `0 0 22px 6px ${ORANGE}, 0 0 9px 2px #FFE08A`
                      : (on ? `0 0 16px 3px ${BLUE}aa` : "none"),
                    transform: `translateX(-50%) scale(${hot ? 1.4 : 1})`,
                    transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                  }} />

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
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${BLUE}22`, border: `1px solid ${BLUE}55` }}>
                        <Icon size={22} style={{ color: ORANGE_LIGHT }} />
                      </span>
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>{s.hint}</span>
                    </div>
                    <h3 className="mb-2 font-bold text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.3rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
                    <p className="text-white/55" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
