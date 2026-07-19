// src/components/works/WorkFlipCards.jsx
//
// "Our Work" — premium 3D flip cards. Front: cover + name + category + view cue.
// Back: overview, services, key tech, results, "View case study" button.
// Desktop = flip on hover, Mobile = tap (tap again / outside to return).
// Framer Motion drives scale/glow/flip/stagger; CSS preserve-3d + backface-hidden
// do the 3D. Cards flip silently (no sound). SSR-safe (no window at module scope).

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/data/caseStudies";

const EASE = [0.22, 1, 0.36, 1];
const PICKS = CASE_STUDIES.slice(0, 6);

// on-brand gradient fallbacks (used behind the cover, and shown if the image 404s)
const GRAD = [
  ["#0037CA", "#3D6BF0"], ["#0a5f7a", "#1b8fb0"], ["#b5651d", "#f0a24b"],
  ["#1b3bd6", "#5b8cff"], ["#0e3fae", "#2ea3d1"], ["#8a4a12", "#2E6BFF"],
];

/* flip sound disabled — cards flip silently */
function useSwoosh() {
  return () => {};
}

const backV = { hide: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const itemV = { hide: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } };
const btnV = { hide: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } };

function Card({ study, i, isTouch, open, setOpen, swoosh }) {
  const flipped = open === study.id;
  const [c1, c2] = GRAD[i % GRAD.length];
  const tech = study.stack || study.deliverables || [];
  const metrics = study.metrics || [];

  const bind = isTouch
    ? {
        onClick: () => { const willOpen = !flipped; setOpen(willOpen ? study.id : null); if (willOpen) swoosh(); },
      }
    : {
        onHoverStart: () => { setOpen(study.id); swoosh(); },
        onHoverEnd: () => setOpen(null),
      };

  return (
    <motion.div
      className={"wf-card" + (flipped ? " wf-on" : "")}
      data-card
      animate={{
        scale: flipped ? 1.03 : 1,
        boxShadow: flipped
          ? "0 30px 70px -30px rgba(0,0,0,.85), 0 0 0 1px rgba(155,192,255,.14)"
          : "0 12px 34px -22px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.45, ease: EASE }}
      {...bind}
    >
      <motion.div
        className="wf-flipper"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* FRONT — full poster only (all copy lives on the flip side) */}
        <div className="wf-face wf-front">
          <div className="wf-thumb" style={{ background: "#080a12" }}>
            {study.image && (
              <img
                src={study.image}
                alt={study.client}
                loading="lazy"
                className="wf-img"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
          </div>
          <span className="wf-cat wf-cat-tl">{study.category}</span>
          <a
            href={`/work/${study.slug}`}
            className="wf-seebtn"
            onClick={(e) => e.stopPropagation()}
          >
            Click to see case study <span className="wf-arw">→</span>
          </a>
        </div>

        {/* BACK */}
        <div className="wf-face wf-back">
          <motion.div className="wf-back-inner" variants={backV} initial="hide" animate={flipped ? "show" : "hide"}>
            <motion.div className="wf-bcat" variants={itemV}>{study.category}</motion.div>
            <motion.div className="wf-btitle" variants={itemV}>{study.client}</motion.div>
            <motion.p className="wf-bover" variants={itemV}>{study.summary}</motion.p>

            {study.services?.length > 0 && (
              <motion.div variants={itemV}>
                <div className="wf-label">Services delivered</div>
                <div className="wf-chips">{study.services.map((s) => <span className="wf-chip" key={s}>{s}</span>)}</div>
              </motion.div>
            )}

            {tech.length > 0 && (
              <motion.div variants={itemV}>
                <div className="wf-label">{study.stack ? "Key technologies" : "Key deliverables"}</div>
                <div className="wf-chips">{tech.slice(0, 5).map((s) => <span className="wf-chip" key={s}>{s}</span>)}</div>
              </motion.div>
            )}

            {metrics.length > 0 && (
              <motion.div className="wf-metrics" variants={itemV}>
                {metrics.slice(0, 3).map((m, k) => (
                  <div className="wf-metric" key={k}><div className="wf-v">{m.value}</div><div className="wf-l">{m.label}</div></div>
                ))}
              </motion.div>
            )}

            <motion.a className="wf-cta" href={`/work/${study.slug}`} variants={btnV}>
              View case study <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkFlipCards() {
  const [isTouch, setIsTouch] = useState(false);
  const [open, setOpen] = useState(null);
  const swoosh = useSwoosh();

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches);
  }, []);

  // mobile: tap outside a card returns it
  useEffect(() => {
    if (!isTouch) return;
    const onDoc = (e) => { if (!e.target.closest("[data-card]")) setOpen(null); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [isTouch]);

  return (
    <section className="wf" aria-label="Our work">
      <style>{CSS}</style>
      <div className="wf-wrap">
        <header className="wf-head">
          <span className="wf-eyebrow">Our Work</span>
          <h2 className="wf-h2">Projects, and what they did.</h2>
          <p className="wf-sub">{isTouch ? "Tap a card" : "Hover a card"} to see the brief, what we delivered, and the outcome.</p>
        </header>

        <div className="wf-grid">
          {PICKS.map((study, i) => (
            <Card key={study.id} study={study} i={i} isTouch={isTouch} open={open} setOpen={setOpen} swoosh={swoosh} />
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.wf{position:relative;background:
    radial-gradient(60% 50% at 12% 0%,rgba(46,107,255,.10),transparent 60%),
    radial-gradient(50% 40% at 96% 8%,rgba(250,159,67,.06),transparent 60%),
    #04050C;
  color:#eef2ff;font-family:'Poppins',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
.wf-wrap{max-width:1200px;margin:0 auto;padding:clamp(56px,9vw,120px) clamp(20px,5vw,48px)}
.wf-head{margin-bottom:clamp(38px,6vw,66px);max-width:60ch}
.wf-eyebrow{font-family:ui-monospace,'Space Mono',monospace;font-size:.7rem;letter-spacing:.4em;text-transform:uppercase;color:#FA9F43;font-weight:700}
.wf-h2{font-weight:600;letter-spacing:-.03em;font-size:clamp(1.9rem,4vw,3rem);line-height:1.05;margin:.85rem 0 0}
.wf-sub{color:#8b93b2;margin-top:.9rem;font-size:1.02rem;line-height:1.6}

.wf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.4vw,30px)}
@media(max-width:900px){.wf-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.wf-grid{grid-template-columns:1fr}}

.wf-card{position:relative;border-radius:28px;aspect-ratio:1/1.14;cursor:pointer;transform:translateZ(0);will-change:transform}
.wf-card::before{content:"";position:absolute;inset:0;border-radius:28px;padding:1px;pointer-events:none;z-index:5;opacity:0;
  background:linear-gradient(135deg,#FA9F43,transparent 40%,#5b8cff);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;transition:opacity .45s cubic-bezier(.22,1,.36,1)}
.wf-card.wf-on::before{opacity:.9}
.wf-flipper{position:relative;width:100%;height:100%;will-change:transform}
.wf-face{position:absolute;inset:0;border-radius:28px;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;transform:translateZ(0)}
.wf-back{transform:rotateY(180deg);background:radial-gradient(120% 80% at 100% 0%,rgba(46,107,255,.16),transparent 55%),linear-gradient(160deg,#0c1024,#070a14)}

.wf-thumb{position:absolute;inset:0}
.wf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.wf-front-body{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:22px}
.wf-cat{display:inline-block;font-family:ui-monospace,'Space Mono',monospace;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:#9cc0ff;
  background:rgba(6,9,20,.5);border:1px solid rgba(255,255,255,.10);backdrop-filter:blur(8px);border-radius:20px;padding:5px 11px}
.wf-cat-tl{position:absolute;top:18px;left:18px;z-index:2}
.wf-seebtn{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);z-index:3;
  display:inline-flex;align-items:center;gap:.5rem;
  font-family:ui-monospace,'Space Mono',monospace;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;font-weight:700;
  color:#160c00;text-decoration:none;white-space:nowrap;cursor:pointer;
  background:linear-gradient(180deg,#FCB65E,#FA9F43);
  border:1px solid rgba(250,159,67,.55);border-radius:22px;padding:9px 16px;
  box-shadow:0 12px 28px -12px rgba(250,159,67,.85);backdrop-filter:blur(6px);
  transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,filter .35s}
.wf-seebtn:hover{filter:brightness(1.06)}
.wf-card:hover .wf-seebtn{transform:translateX(-50%) translateY(-2px)}
.wf-seebtn .wf-arw{transition:transform .35s cubic-bezier(.22,1,.36,1)}
.wf-card:hover .wf-seebtn .wf-arw{transform:translateX(3px)}
.wf-pname{font-weight:600;font-size:1.24rem;line-height:1.15;margin-top:12px;letter-spacing:-.01em}
.wf-pclient{color:#9cc0ff;font-size:.82rem;margin-top:3px}
.wf-view{display:inline-flex;align-items:center;gap:.5rem;margin-top:14px;font-family:ui-monospace,'Space Mono',monospace;font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:#8b93b2}
.wf-arw{transition:transform .4s cubic-bezier(.22,1,.36,1)}
.wf-card.wf-on .wf-arw{transform:translateX(4px)}

.wf-back-inner{position:absolute;inset:0;padding:24px 22px;display:flex;flex-direction:column;gap:12px}
.wf-bcat{font-family:ui-monospace,'Space Mono',monospace;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:#ffb950}
.wf-btitle{font-weight:600;font-size:1.1rem;line-height:1.2;letter-spacing:-.01em}
.wf-bover{color:#8b93b2;font-size:.82rem;line-height:1.5}
.wf-label{font-family:ui-monospace,'Space Mono',monospace;font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:#9cc0ff;margin-bottom:6px}
.wf-chips{display:flex;flex-wrap:wrap;gap:6px}
.wf-chip{font-size:.66rem;color:#cdd6f5;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);border-radius:8px;padding:4px 9px}
.wf-metrics{display:flex;gap:14px;margin-top:2px}
.wf-metric .wf-v{font-family:ui-monospace,'Space Mono',monospace;font-weight:700;font-size:1.02rem;color:#fff;line-height:1}
.wf-metric .wf-l{font-size:.56rem;color:#8b93b2;margin-top:4px;line-height:1.2;max-width:12ch}
.wf-cta{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  background:linear-gradient(180deg,#5b8cff,#2E6BFF);color:#fff;font-weight:600;font-size:.82rem;text-decoration:none;
  border-radius:12px;padding:11px 16px;box-shadow:0 10px 26px -10px rgba(46,107,255,.7)}
.wf-cta:hover{filter:brightness(1.08)}

@media(prefers-reduced-motion:reduce){
  .wf-arw{transition:none}
}
`;
