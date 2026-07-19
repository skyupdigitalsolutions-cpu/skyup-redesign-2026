// src/components/service/ServiceSweep.jsx
//
// SKYUP Services — "Searchlight Sweep".
// All services sit in one dim horizontal row. On load a UFO flies in from a
// corner and glides to the far corner; its beam tilts toward each service like
// a searchlight, flaring it bright as it passes. When the craft exits, every
// service settles to fully lit. After the sweep, hovering an item reveals its
// "Explore Now" button.
//
// Auto-plays once (no scroll). rAF-driven, SSR-safe. Mobile => vertical sweep.

import React, { useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const ITEMS = SERVICES.slice(0, 10);

export default function ServiceSweep() {
  const rootRef = useRef(null);
  const ufoRef = useRef(null);
  const beamRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current, ufo = ufoRef.current, beam = beamRef.current, row = rowRef.current;
    if (!root || !ufo || !row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(row.querySelectorAll(".sw-item"));

    if (reduce) {
      items.forEach((el) => (el.style.setProperty("--lit", "1")));
      ufo.style.opacity = "0";
      root.classList.add("sw--done");
      return;
    }

    const DELAY = 500;       // small beat before the sweep
    const SWEEP_MS = 5200;   // corner-to-corner duration
    const t0 = performance.now();
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const p = clamp((now - t0 - DELAY) / SWEEP_MS, 0, 1);   // sweep progress 0..1
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // easeInOutQuad

      const vw = root.clientWidth, vh = root.clientHeight;

      // UFO path: from off-left/upper corner, across, exiting off-right after p=1
      const ufoY = vh * 0.20 + Math.sin(now / 700) * 6;
      let ufoX;
      if (p < 1) ufoX = lerp(-vw * 0.14, vw * 1.14, eased);
      else       ufoX = lerp(vw * 1.14, vw * 1.4, clamp((now - t0 - DELAY - SWEEP_MS) / 900, 0, 1)); // exit further
      const exitFade = p < 1 ? 1 : 1 - clamp((now - t0 - DELAY - SWEEP_MS) / 900, 0, 1);
      ufo.style.transform = `translate(${ufoX - ufo.offsetWidth / 2}px, ${ufoY}px)`;
      ufo.style.opacity = exitFade.toFixed(3);

      // row baseline (where the services sit) and beam geometry
      const rowRect = row.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const rowY = rowRect.top - rootRect.top + rowRect.height / 2;
      const beamTopY = ufoY + ufo.offsetHeight * 0.5;
      const dy = Math.max(60, rowY - beamTopY);

      // find nearest item to aim the searchlight at → tilt
      let target = null, best = 1e9;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left - rootRect.left + r.width / 2;
        const d = Math.abs(cx - ufoX);
        if (d < best) { best = d; target = cx; }
      });
      const tilt = Math.atan2((target ?? ufoX) - ufoX, dy); // radians toward nearest item
      const groundX = ufoX + Math.tan(tilt) * dy;

      if (beam) {
        beam.style.transform = `translate(${ufoX}px, ${beamTopY}px) translateX(-50%) rotate(${tilt}rad)`;
        beam.style.height = dy + 40 + "px";
        beam.style.opacity = exitFade.toFixed(3);
      }

      // flare each item by how close the beam's ground point is to it; after sweep settle to lit
      const spread = vw * 0.10;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left - rootRect.left + r.width / 2;
        const flare = Math.exp(-Math.pow((groundX - cx) / spread, 2));
        const settle = p >= 1 ? clamp((now - t0 - DELAY - SWEEP_MS) / 700, 0, 1) : 0;
        el.style.setProperty("--lit", Math.max(flare, settle).toFixed(3));
      });

      if (p >= 1 && exitFade <= 0.01) {
        items.forEach((el) => el.style.setProperty("--lit", "1"));
        root.classList.add("sw--done");    // enables hover "Explore"
        cancelAnimationFrame(raf);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={rootRef} className="sw" aria-label="Our services">
      <style>{CSS}</style>

      <div className="sw-head">
        <span className="sw-eyebrow">Our Services</span>
        <h2 className="sw-title">Everything we build, under one light</h2>
      </div>

      {/* the flying craft + searchlight beam */}
      <div ref={beamRef} className="sw-beam" aria-hidden="true"><span className="sw-pool" /></div>
      <img ref={ufoRef} className="sw-ufo" src="/images/skyup-ufo-craft.png" alt="" aria-hidden="true" />

      {/* the dim row of services */}
      <div ref={rowRef} className="sw-row">
        {ITEMS.map((s) => {
          const Icon = s.Icon;
          return (
            <a key={s.slug} href={s.href} className="sw-item" style={{ "--accent": s.accent }}>
              <span className="sw-ic">{Icon ? <Icon size={26} strokeWidth={1.8} /> : null}</span>
              <span className="sw-name">{s.name}</span>
              <span className="sw-cta">Explore Now</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

const CSS = `
.sw{ position:relative; height:100vh; min-height:620px; background:#04050C; overflow:hidden; --amber:#FA9F43; --blue:#5b8cff; }

.sw-head{ position:absolute; top:12vh; left:0; right:0; text-align:center; z-index:2; }
.sw-eyebrow{ color:var(--amber); font-size:.72rem; font-weight:700; letter-spacing:.34em; text-transform:uppercase; }
.sw-title{ color:#fff; font-size:clamp(1.5rem,3.4vw,2.6rem); font-weight:700; letter-spacing:-.02em; margin-top:.5rem; }

/* flying craft */
.sw-ufo{ position:absolute; left:0; top:0; width:min(230px,20vw); height:auto; z-index:5; pointer-events:none;
  filter:drop-shadow(0 10px 40px rgba(0,0,0,.6)); will-change:transform; }

/* searchlight beam (tilts): a soft amber cone with a landing pool */
.sw-beam{ position:absolute; left:0; top:0; width:min(320px,26vw); transform-origin:top center; z-index:4; pointer-events:none; will-change:transform;
  background:linear-gradient(to bottom, rgba(255,201,138,.28), rgba(255,201,138,.08) 55%, rgba(255,201,138,0));
  clip-path:polygon(42% 0, 58% 0, 100% 100%, 0 100%); filter:blur(2px); }
.sw-pool{ position:absolute; left:50%; bottom:-14px; transform:translateX(-50%); width:78%; height:40px; border-radius:50%;
  background:radial-gradient(closest-side, rgba(255,220,170,.6), rgba(255,201,138,.12), transparent); filter:blur(3px); }

/* the row */
.sw-row{ position:absolute; left:0; right:0; top:58%; transform:translateY(-50%); z-index:3;
  display:flex; justify-content:center; align-items:flex-start; gap:min(2vw,26px); padding:0 3vw; }
.sw-item{ --lit:0; position:relative; flex:1 1 0; max-width:140px; text-decoration:none; text-align:center;
  display:flex; flex-direction:column; align-items:center; gap:.5rem;
  opacity:calc(0.1 + 0.9 * var(--lit)); transition:opacity .12s linear; }
.sw-ic{ width:58px; height:58px; display:grid; place-items:center; border-radius:16px;
  color:var(--accent); border:1px solid color-mix(in srgb, var(--accent) 50%, transparent);
  background:color-mix(in srgb, var(--accent) 14%, transparent);
  box-shadow:0 0 calc(28px * var(--lit)) color-mix(in srgb, var(--accent) 60%, transparent); }
.sw-name{ color:#fff; font-size:clamp(.72rem,1vw,.9rem); font-weight:600; line-height:1.2;
  text-shadow:0 0 calc(14px * var(--lit)) rgba(255,220,170,.7); }
.sw-cta{ margin-top:.2rem; font-size:.72rem; font-weight:600; color:#fff; background:var(--blue);
  padding:.38rem .8rem; border-radius:999px; opacity:0; transform:translateY(4px); transition:opacity .25s, transform .25s;
  pointer-events:none; box-shadow:0 8px 22px rgba(91,140,255,.4); }
/* Explore appears on hover only AFTER the sweep completes */
.sw--done .sw-item:hover .sw-cta{ opacity:1; transform:translateY(0); pointer-events:auto; }
.sw--done .sw-item:hover .sw-ic{ box-shadow:0 0 30px color-mix(in srgb, var(--accent) 70%, transparent); }

/* ---------- mobile: vertical sweep ---------- */
@media (max-width:760px){
  .sw{ height:auto; min-height:100vh; padding-bottom:8vh; }
  .sw-ufo{ display:none; } .sw-beam{ display:none; }
  .sw-row{ position:relative; top:auto; transform:none; flex-direction:column; align-items:stretch; gap:14px; padding:22vh 8vw 0; }
  .sw-item{ flex-direction:row; max-width:none; gap:14px; align-items:center; opacity:1; text-align:left;
    background:rgba(10,12,22,.55); border:1px solid rgba(250,159,67,.18); border-radius:16px; padding:12px 14px; }
  .sw-cta{ margin-left:auto; opacity:1; transform:none; pointer-events:auto; }
}
`;
