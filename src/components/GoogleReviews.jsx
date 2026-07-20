import React, { useEffect, useRef, useState } from "react";

/**
 * GoogleReviews — U-shaped curved slider of Google reviews on a dark stage,
 * with an animated 4.9★ rating hero (count-up + star fill). Center review sits
 * low & front; the prev/next sit raised on each side, smaller and tilted out.
 * Auto-rotating. Responsive: laptop/desktop & tablet = U fan; mobile = crossfade.
 * Reduced-motion = static + lit. Geometry verified; K*STEP must equal 360.
 */

const GOLD = "#FFC53D", BLUE = "#2E6BFF", ORANGE = "#FF7A1A", ORANGE_L = "#FFB066";

const SUMMARY = { rating: 4.9, count: 92, writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJmzKRD-8XrjsRK6s6rZmQDKQ", allReviewsUrl: "https://share.google/0iNO9uI09kcC5H3XP" };

const REVIEWS = [
  { name: "Pooja M S", initial: "P", color: "#1A73E8", text: "I had a very good experience with SKYUP Digital Solutions LLP. The team is friendly, professional, and easy to work with — they improved my online presence and brought more leads to my business." },
  { name: "Maltesh G", initial: "M", color: "#D93025", text: "Skyup did an excellent job in website design and development for our business. The website is fast, responsive, and SEO-friendly. Highly recommend them." },
  { name: "Pranoy Gowda", initial: "P", color: "#188038", text: "SKYUP delivers effective digital advertising with a strong focus on performance and ROI — targeted campaigns across search and social that drive measurable growth." },
];

function GoogleG({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const N = REVIEWS.length;
const K = 24, STEP = 15; // K * STEP === 360 (seamless ring)

export default function GoogleReviews() {
  const secRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const cfgRef = useRef({ mode: "fan", cardW: 320, SPACING: 320, RISE: 80, TILT: 14, MAXOFF: 1.05, OPFALL: 0.5, SCALEFALL: 0.22, MINSCALE: 0.55 });
  const curRef = useRef(0);
  const targetRef = useRef(0);
  const [scoreText, setScoreText] = useState("0.0");
  const [countText, setCountText] = useState("0");
  const [starW, setStarW] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyCfg = () => {
      const st = stageRef.current; if (!st) return;
      const W = st.clientWidth || window.innerWidth;
      let cfg;
      if (W < 640) cfg = { mode: "fade", cardW: Math.max(260, Math.min(340, W - 40)), SPACING: 0, RISE: 0, TILT: 0, MAXOFF: 1.0, OPFALL: 1.0, SCALEFALL: 0, MINSCALE: 1, stageH: 360 };
      else if (W < 1024) cfg = { mode: "fan", cardW: 270, SPACING: 270, RISE: 62, TILT: 12, MAXOFF: 1.05, OPFALL: 0.5, SCALEFALL: 0.22, MINSCALE: 0.55, stageH: 430 };
      else cfg = { mode: "fan", cardW: 320, SPACING: 320, RISE: 80, TILT: 14, MAXOFF: 1.05, OPFALL: 0.5, SCALEFALL: 0.22, MINSCALE: 0.55, stageH: 470 };
      cfgRef.current = cfg;
      st.style.height = cfg.stageH + "px";
      cardRefs.current.forEach((c) => { if (c) c.style.width = cfg.cardW + "px"; });
    };

    const render = () => {
      const cfg = cfgRef.current, cur = curRef.current;
      for (let i = 0; i < K; i++) {
        const c = cardRefs.current[i]; if (!c) continue;
        let a = (i - cur) * STEP; a = ((a % 360) + 540) % 360 - 180;
        const off = a / STEP, ao = Math.abs(off);
        let x, y, rotZ, sc, op, vis;
        if (cfg.mode === "fade") {
          vis = ao < 1.0; x = 0; y = 0; rotZ = 0; sc = 1; op = vis ? Math.max(0, 1 - ao) : 0;
        } else {
          vis = ao <= cfg.MAXOFF + 0.05; op = vis ? Math.max(0, 1 - ao * cfg.OPFALL) : 0;
          sc = Math.max(cfg.MINSCALE, 1 - ao * cfg.SCALEFALL);
          x = off * cfg.SPACING; y = -(off * off) * cfg.RISE; rotZ = off * cfg.TILT;
        }
        c.style.transform = `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) rotate(${rotZ}deg) scale(${sc})`;
        c.style.opacity = op.toFixed(2);
        c.style.zIndex = String(Math.round(100 - ao * 10));
        c.style.pointerEvents = vis && ao < 0.5 ? "auto" : "none";
      }
      const active = ((Math.round(cur) % N) + N) % N;
      dotRefs.current.forEach((d, i) => d && d.classList.toggle("gr-on", i === active));
    };

    applyCfg(); render();
    window.addEventListener("resize", applyCfg);

    let raf, timer;
    const loop = () => { curRef.current += (targetRef.current - curRef.current) * 0.09; render(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const countUp = () => {
      if (reduce) { setScoreText(SUMMARY.rating.toFixed(1)); setCountText(String(SUMMARY.count)); setStarW((SUMMARY.rating / 5) * 100); return; }
      const DUR = 1100; let s;
      const step = (ts) => {
        if (!s) s = ts;
        const t = Math.min(1, (ts - s) / DUR), e = 1 - Math.pow(1 - t, 3);
        setScoreText((SUMMARY.rating * e).toFixed(1)); setCountText(String(Math.round(SUMMARY.count * e)));
        if (t < 1) requestAnimationFrame(step);
        else { setScoreText(SUMMARY.rating.toFixed(1)); setCountText(String(SUMMARY.count)); }
      };
      requestAnimationFrame(step);
      setStarW((SUMMARY.rating / 5) * 100);
    };

    let begun = false;
    const begin = () => { if (begun) return; begun = true; countUp(); if (!reduce) timer = setInterval(() => { targetRef.current += 1; }, 3200); };
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) begin(); }), { threshold: 0.15 })
      : null;
    if (io && secRef.current) io.observe(secRef.current); else begin();
    const fb = setTimeout(begin, 1600);

    return () => {
      window.removeEventListener("resize", applyCfg);
      cancelAnimationFrame(raf); clearInterval(timer); clearTimeout(fb); if (io) io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={secRef} className="relative w-full overflow-hidden py-20 lg:py-24" style={{ background: "#06070D" }}>
      <style>{`
        .gr-grid{background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:30px 30px;-webkit-mask-image:radial-gradient(120% 80% at 50% 20%,#000 24%,transparent 70%);mask-image:radial-gradient(120% 80% at 50% 20%,#000 24%,transparent 70%)}
        .gr-bloom{background:radial-gradient(40% 32% at 50% 5%,rgba(255,197,61,.10),transparent 70%),radial-gradient(42% 50% at 88% 92%,rgba(46,107,255,.12),transparent 72%)}
        .gr-fill{position:absolute;left:0;top:0;color:${GOLD};overflow:hidden;white-space:nowrap;transition:width 1.1s cubic-bezier(.4,1,.4,1)}
        .gr-card{position:absolute;left:50%;top:52%;width:320px;will-change:transform,opacity;transform-origin:center center;opacity:0}
        .gr-dot{height:7px;width:7px;border-radius:999px;background:rgba(255,255,255,.2);transition:all .4s}
        .gr-dot.gr-on{width:22px;background:${ORANGE}}
      `}</style>

      <div className="gr-grid pointer-events-none absolute inset-0" />
      <div className="gr-bloom pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em]" style={{ color: ORANGE_L }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} /> Loved by clients
        </span>
        <h2 className="mt-4 font-extrabold leading-[1.05] text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,5vw,3.1rem)", letterSpacing: "-0.02em" }}>
          Don&rsquo;t take our word for it
        </h2>

        <div className="mx-auto mt-7 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-[20px] border p-5 sm:gap-8"
          style={{ background: "linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))", borderColor: "rgba(255,255,255,.09)" }}>
          <div className="flex flex-col items-start gap-1.5">
            <div className="font-extrabold leading-none" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "3rem", letterSpacing: "-0.03em", background: `linear-gradient(180deg,#fff,${GOLD})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{scoreText}</div>
            <div className="relative inline-block text-[1.1rem] leading-none">
              <span style={{ color: "rgba(255,255,255,.16)" }}>★★★★★</span>
              <span className="gr-fill" style={{ width: `${starW}%` }}>★★★★★</span>
            </div>
            <div className="text-[0.78rem] text-white/55">Based on <b className="text-white/80">{countText}</b> Google reviews</div>
          </div>
          <div className="hidden h-14 w-px sm:block" style={{ background: "rgba(255,255,255,.09)" }} />
          <div className="flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-2 text-[0.82rem] font-semibold text-white"><GoogleG size={18} /> Google Business</div>
            <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold" style={{ color: "#34A853" }}>✔ Verified reviews</div>
            <div className="flex gap-2">
              <a href={SUMMARY.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="rounded-full px-3.5 py-2 text-[0.76rem] font-semibold text-white" style={{ background: BLUE }}>Write a review</a>
              <a href={SUMMARY.allReviewsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3.5 py-2 text-[0.76rem] font-semibold text-white/85" style={{ borderColor: "rgba(255,255,255,.16)" }}>Read all {SUMMARY.count}</a>
            </div>
          </div>
        </div>

        <div ref={stageRef} className="relative mx-auto mt-4 sm:mt-8" style={{ height: 470, maxWidth: 1160 }}>
          {Array.from({ length: K }).map((_, i) => {
            const r = REVIEWS[i % N];
            return (
              <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="gr-card" aria-hidden={i >= N}>
                <div className="rounded-[20px] border p-5 text-left sm:p-6" style={{ background: "linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02))", borderColor: "rgba(255,255,255,.09)", boxShadow: "0 30px 60px -30px rgba(0,0,0,.9)", fontFamily: "'Poppins',sans-serif" }}>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-base font-bold text-white" style={{ background: r.color, boxShadow: "0 0 0 2px rgba(255,255,255,.12)" }}>{r.initial}</div>
                    <div className="min-w-0">
                      <div className="text-[0.95rem] font-semibold text-white">{r.name}</div>
                      <div className="flex items-center gap-1.5 text-[0.7rem] text-white/45"><GoogleG size={13} /> Google review · 5.0</div>
                    </div>
                    <div className="ml-auto text-[0.9rem] tracking-wide" style={{ color: GOLD }}>★★★★★</div>
                  </div>
                  <div className="mt-3 text-[0.88rem] leading-relaxed text-white/70" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.text}</div>
                  <div className="mt-4 flex items-center gap-1.5 text-[0.66rem] text-white/40"><GoogleG size={12} /> Posted on Google</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {REVIEWS.map((_, i) => <span key={i} ref={(el) => (dotRefs.current[i] = el)} className="gr-dot" />)}
        </div>
      </div>
    </section>
  );
}
