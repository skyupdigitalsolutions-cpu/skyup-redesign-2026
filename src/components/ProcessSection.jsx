import React, { useEffect, useRef, useState } from "react";
import { Search, Map, Rocket, Gauge, TrendingUp } from "lucide-react";

/**
 * ProcessSection — "Automation Pipeline".
 * Five steps sit as stations on a glowing horizontal pipeline. As you scroll
 * through the section, an energy packet travels left -> right, igniting each
 * node and "levelling up" from cool blue to hot orange — the Skyup story:
 * a business built up stage by stage into compounding growth.
 * Scroll-scrubbed (no pin). Reduced-motion lights everything; mobile stacks.
 */

const BLUE = "#2E6BFF", BLUE_L = "#6FA0FF", ORANGE = "#FF7A1A", ORANGE_L = "#FFB066";

const STEPS = [
  { n: "01", tag: "Audit", icon: Search, title: "Discovery & Research", desc: "We audit your current marketing and study your audience and competitors to find where the real growth is." },
  { n: "02", tag: "Roadmap", icon: Map, title: "Strategic Planning", desc: "A custom growth roadmap across SEO, paid ads, automation, and content — matched to your goals and budget." },
  { n: "03", tag: "Launch", icon: Rocket, title: "Implementation", desc: "Our specialists launch campaigns, build the assets, and deploy your automation — fast, with clear communication." },
  { n: "04", tag: "Optimise", icon: Gauge, title: "Optimisation", desc: "We track performance, analyse the data, and lift targeting and conversion rates — cutting whatever doesn’t work." },
  { n: "05", tag: "Scale", icon: TrendingUp, title: "Scaling", desc: "We double down on the best-performing channels so growth compounds instead of plateauing." },
];

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const lerpColor = (a, b, t, alpha) => {
  const A = hex(a), B = hex(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return alpha == null ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
};

const N = STEPS.length;
const stationX = (i) => 10 + (80 * i) / (N - 1); // % along the rail

export default function ProcessSection() {
  const secRef = useRef(null);
  const packetRef = useRef(null);
  const nodeRefs = useRef([]);
  const targetRef = useRef(0); // scroll progress 0..1
  const posRef = useRef(0);    // eased packet progress 0..1
  const [lit, setLit] = useState(() => new Set());

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLit(new Set(STEPS.map((_, i) => i)));
      if (packetRef.current) packetRef.current.style.display = "none";
      nodeRefs.current.forEach((n) => n && n.classList.add("ps-on"));
      return;
    }

    const onScroll = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      targetRef.current = Math.max(0, Math.min(1, (vh * 0.62 - r.top) / (r.height * 0.72)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let raf;
    const tick = () => {
      posRef.current += (targetRef.current - posRef.current) * 0.1;
      const pos = posRef.current;
      const x = 6 + pos * 88; // packet left %
      const warm = pos;

      const pk = packetRef.current;
      if (pk) {
        pk.style.left = x + "%";
        const core = lerpColor(BLUE, ORANGE, warm);
        const halo = lerpColor(BLUE_L, ORANGE_L, warm);
        const size = 14 + warm * 16;
        pk.style.width = size + "px";
        pk.style.height = size + "px";
        pk.style.background = `radial-gradient(circle,#fff,${halo} 45%,${core} 78%)`;
        pk.style.boxShadow = `0 0 ${16 + warm * 22}px ${5 + warm * 5}px ${lerpColor(BLUE, ORANGE, warm, 0.8)}`;
      }

      let changed = false;
      const next = new Set(lit);
      for (let i = 0; i < N; i++) {
        if (x >= stationX(i) - 1 && !next.has(i)) { next.add(i); changed = true; }
      }
      if (changed) setLit(next);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={secRef} className="relative w-full overflow-hidden py-24 lg:py-28" style={{ background: "#06070D" }}>
      <style>{`
        .ps-grid{background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:30px 30px;-webkit-mask-image:radial-gradient(120% 90% at 50% 40%,#000 35%,transparent 78%);mask-image:radial-gradient(120% 90% at 50% 40%,#000 35%,transparent 78%)}
        .ps-bloom{background:radial-gradient(38% 50% at 12% 18%,rgba(46,107,255,.16),transparent 70%),radial-gradient(42% 55% at 90% 88%,rgba(255,122,26,.13),transparent 72%)}
        .ps-rail{position:absolute;left:0;right:0;top:50%;height:4px;border-radius:4px;transform:translateY(-50%);overflow:hidden;background:rgba(255,255,255,.07)}
        .ps-flow{position:absolute;inset:0;width:200%;background:linear-gradient(90deg,transparent,${BLUE} 18%,#8aa6ff 30%,${ORANGE} 70%,${ORANGE_L} 82%,transparent);opacity:.7;animation:psFlow 5s linear infinite}
        @keyframes psFlow{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        .ps-railglow{position:absolute;left:0;right:0;top:50%;height:14px;transform:translateY(-50%);filter:blur(9px);background:linear-gradient(90deg,rgba(46,107,255,0),rgba(46,107,255,.5),rgba(255,122,26,.5),rgba(255,122,26,0));opacity:.5}
        .ps-packet{position:absolute;top:50%;left:6%;width:16px;height:16px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,#fff,${BLUE_L} 45%,${BLUE} 75%);box-shadow:0 0 18px 5px rgba(46,107,255,.7);z-index:6}
        .ps-packet::after{content:"";position:absolute;right:60%;top:50%;transform:translateY(-50%);width:70px;height:3px;border-radius:3px;background:linear-gradient(90deg,transparent,rgba(120,150,255,.55));filter:blur(1px)}
        .ps-station{position:absolute;top:50%;width:212px;transform:translateX(-50%)}
        .ps-node{position:absolute;left:50%;top:0;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%);z-index:5;transition:transform .35s ease,box-shadow .35s ease}
        .ps-node.ps-on{transform:translate(-50%,-50%) scale(1.28);box-shadow:0 0 18px 5px var(--nc)}
        .ps-conn{position:absolute;left:50%;width:1px;background:linear-gradient(rgba(255,255,255,.18),transparent);transform:translateX(-50%)}
        .ps-card{position:absolute;left:50%;width:212px;transform:translateX(-50%);border-radius:18px;padding:1.3rem 1.3rem 1.4rem;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(10px);box-shadow:0 24px 50px -30px rgba(0,0,0,.8);transition:transform .4s cubic-bezier(.2,.9,.3,1.2),border-color .4s;opacity:0}
        .ps-card.ps-show{opacity:1;animation:psIn .55s cubic-bezier(.2,.9,.3,1.2) both}
        @keyframes psIn{0%{opacity:0;transform:translateX(-50%) translateY(14px) scale(.96)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
        .ps-card:hover{transform:translateX(-50%) translateY(-6px);border-color:rgba(255,255,255,.2)}
        .ps-up .ps-card{bottom:38px}.ps-up .ps-conn{bottom:0;height:30px}
        .ps-down .ps-card{top:38px}.ps-down .ps-conn{top:0;height:30px}
        .ps-num{position:absolute;right:14px;top:6px;font-family:'Poppins',sans-serif;font-weight:800;font-size:3.1rem;line-height:1;color:#fff;opacity:.05;letter-spacing:-.04em}
        @media(max-width:860px){
          .ps-stage{height:auto!important;display:flex;flex-direction:column;gap:1.1rem}
          .ps-rail,.ps-railglow,.ps-packet{display:none}
          /* !important is required: each station carries an inline left:X% (its position
             along the desktop rail). Without !important the inline value wins and the
             cards stay offset/clipped instead of stacking centered. */
          .ps-station{position:relative!important;top:auto!important;left:auto!important;right:auto!important;width:100%!important;transform:none!important;margin:0 auto}
          .ps-card{position:relative!important;left:auto!important;top:auto!important;width:100%!important;max-width:440px;transform:none!important;opacity:1!important;animation:none!important;margin:0 auto}
          .ps-up .ps-card,.ps-down .ps-card{bottom:auto!important;top:auto!important}
          .ps-conn,.ps-node{display:none}
        }
      `}</style>

      <div className="ps-grid pointer-events-none absolute inset-0" />
      <div className="ps-bloom pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.34em]" style={{ color: ORANGE_L }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} /> How we work
        </span>
        <h2 className="mt-4 font-extrabold leading-[1.04] text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.1rem,5vw,3.4rem)", letterSpacing: "-0.02em" }}>
          One process.{" "}
          <span style={{ background: `linear-gradient(90deg,${BLUE_L},${ORANGE_L})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            Five moves to compounding growth.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/55" style={{ fontFamily: "'Poppins',sans-serif", lineHeight: 1.6, fontSize: "1.04rem" }}>
          A clear, repeatable system. Every engagement starts with understanding your business — so the strategy actually fits.
        </p>

        <div className="ps-stage relative mt-32 lg:mt-40" style={{ height: 520 }}>
          <div className="ps-railglow" />
          <div className="ps-rail"><div className="ps-flow" /></div>
          <div ref={packetRef} className="ps-packet" />

          {STEPS.map((s, i) => {
            const up = i % 2 === 0;
            const t = i / (N - 1);
            const col = lerpColor(BLUE, ORANGE, t);
            const colL = lerpColor(BLUE_L, ORANGE_L, t);
            const Icon = s.icon;
            const shown = lit.has(i);
            return (
              <div key={s.n} className={`ps-station ${up ? "ps-up" : "ps-down"}`} style={{ left: `${stationX(i)}%`, fontFamily: "'Poppins',sans-serif" }}>
                <div
                  ref={(el) => (nodeRefs.current[i] = el)}
                  className={`ps-node ${shown ? "ps-on" : ""}`}
                  style={{ background: col, border: `2px solid ${colL}`, "--nc": lerpColor(BLUE, ORANGE, t, 0.55) }}
                />
                <div className="ps-conn" />
                <div className={`ps-card ${shown ? "ps-show" : ""}`}>
                  <div className="ps-num">{s.n}</div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: `${col}22`, border: `1px solid ${col}55`, color: colL }}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ background: `${col}1f`, color: colL, border: `1px solid ${col}44` }}>
                    {s.tag}
                  </span>
                  <h3 className="mt-3 text-[1.05rem] font-bold leading-snug text-white" style={{ letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-white/55">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
