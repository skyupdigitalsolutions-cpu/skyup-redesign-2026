import React, { useEffect, useRef, useState } from "react";
import { Check, BarChart2, Cpu, Layout, Eye } from "lucide-react";

const BG = "#07060A";
const ORANGE = "#F25623";
const ORANGE_LIGHT = "#FF8A4C";
const BLUE = "#0037CA";
const BLUE_LIGHT = "#3D6BF0";

/* keyword-tight outcome chips (titles only — SEO keywords, no filler) */
const outcomes = [
  "Stronger search rankings",
  "Qualified leads, not noise",
  "Higher conversion rates",
  "Better ad ROI",
  "Faster customer acquisition",
  "Sustainable, compounding growth",
];

/* four pillars — one tight line each */
const pillars = [
  {
    icon: <BarChart2 size={20} strokeWidth={1.9} />,
    title: "Results-driven marketing",
    desc: "Every campaign tied to a real outcome — leads, cost per acquisition, and revenue, tracked and reported honestly.",
  },
  {
    icon: <Cpu size={20} strokeWidth={1.9} />,
    title: "AI-powered execution",
    desc: "Automated lead follow-up and predictive audience targeting that run 24/7 and get smarter over time.",
  },
  {
    icon: <Layout size={20} strokeWidth={1.9} />,
    title: "Conversion-focused builds",
    desc: "Websites, landing pages, and funnels engineered to turn traffic into paying customers.",
  },
  {
    icon: <Eye size={20} strokeWidth={1.9} />,
    title: "Transparent reporting",
    desc: "Clear updates and open access to your campaign data. No smoke, no mirrors — just honest answers.",
  },
];

/* reveal-on-scroll hook */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  // Inline opacity:0 beats CSS "@media reduce { opacity:1 !important }", so under
  // reduced-motion we must start visible in JS rather than rely on the stylesheet.
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [inView, setInView] = useState(prefersReduced);
  useEffect(() => {
    if (prefersReduced) return; // already fully revealed
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    // Safety net: if the observer never fires (odd layouts / occlusion), reveal anyway.
    const t = setTimeout(() => { setInView(true); obs.disconnect(); }, 1200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, [threshold, prefersReduced]);
  return [ref, inView];
}

const rise = (inView, i = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : "translateY(24px)",
  transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${i * 0.07}s, transform .7s cubic-bezier(.22,1,.36,1) ${i * 0.07}s`,
});

export default function ValueProposition() {
  const [introRef, introIn] = useInView(0.25);
  const [chipsRef, chipsIn] = useInView(0.2);
  const [pillarsRef, pillarsIn] = useInView(0.15);

  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-32" style={{ background: BG }}>
      <style>{`
        @media (prefers-reduced-motion: reduce){.vp * {transition:none!important;opacity:1!important;transform:none!important}}
        .vp-card{transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, border-color .4s ease;}
        .vp-card:hover{transform:translateY(-5px); border-color:rgba(255,255,255,0.18); box-shadow:0 28px 60px -26px rgba(242,86,35,0.45);}
      `}</style>

      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(55% 40% at 18% 8%, ${BLUE}1f, transparent 70%), radial-gradient(50% 45% at 88% 78%, ${ORANGE}18, transparent 72%)` }} />

      <div className="vp relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        {/* ── INTRO ── */}
        <div ref={introRef} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ ...rise(introIn, 0), color: ORANGE }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} />
            Why Skyup
          </span>

          <h2 className="mt-6 font-bold leading-[1.08] text-white" style={{ ...rise(introIn, 1), fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.1rem,5vw,3.4rem)", letterSpacing: "-0.02em" }}>
            Helping brands turn digital marketing into{" "}
            <span style={{ color: ORANGE_LIGHT }}>consistent revenue</span>
          </h2>

          <p className="mt-6 max-w-2xl text-white/55" style={{ ...rise(introIn, 2), fontFamily: "'Poppins',sans-serif", fontSize: "1.05rem", lineHeight: 1.65 }}>
            A full-service digital marketing agency blending creative, AI automation, and conversion-focused
            strategy — engineered to spend smarter and grow what lasts.
          </p>
        </div>

        {/* ── OUTCOME CHIPS ── */}
        <div ref={chipsRef} className="mt-10 flex flex-wrap gap-3">
          {outcomes.map((o, i) => (
            <span
              key={o}
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-white/85"
              style={{
                ...rise(chipsIn, i),
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: BLUE, boxShadow: `0 0 12px ${BLUE}88` }}>
                <Check size={12} strokeWidth={3.2} color="#fff" />
              </span>
              {o}
            </span>
          ))}
        </div>

        {/* ── PILLARS ── */}
        <div ref={pillarsRef} className="mt-24">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ ...rise(pillarsIn, 0), color: BLUE_LIGHT }}>
            How we deliver
          </p>
          <h3 className="mt-2 font-bold text-white" style={{ ...rise(pillarsIn, 1), fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.7rem,3.4vw,2.5rem)", letterSpacing: "-0.015em" }}>
            Four pillars behind every campaign
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.title} style={rise(pillarsIn, i + 2)}>
                <div
                  className="vp-card group relative h-full overflow-hidden rounded-3xl p-7"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                {/* faint index for rhythm */}
                <span className="pointer-events-none absolute right-5 top-3 select-none text-7xl font-bold leading-none" style={{ color: "#fff", opacity: 0.04, fontFamily: "'Poppins',sans-serif" }}>
                  0{i + 1}
                </span>
                {/* top accent grows on hover */}
                <span className="absolute left-0 top-0 h-[2px] w-0 rounded-r-full transition-all duration-500 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})` }} />

                <div className="mb-4 flex items-center gap-3.5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105" style={{ background: `${BLUE}26`, border: `1px solid ${BLUE}55`, color: ORANGE_LIGHT }}>
                    {p.icon}
                  </span>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.01em" }}>
                    {p.title}
                  </h4>
                </div>

                <p className="text-white/55" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
