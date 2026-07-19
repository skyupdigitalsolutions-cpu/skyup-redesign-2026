// src/components/service/ServiceWorlds.jsx
//
// SKYUP Services — "the UFO visits worlds" scroll story (PROTOTYPE: first 3 services).
// Inspired by the planet-scroll reference: each service is a world that rises from
// the bottom, lit by the hovering craft. Big serif name, tagline, neighbour worlds
// named left/right, an Explore button. Scroll advances to the next world.
//
// Scroll-driven via rAF + progress (SSR-safe; no ScrollTrigger). Planet art lives at
// /images/worlds/planet-{slug}.png — placeholder art now, swap in AI renders later.
//
// Brand: bg #04050C. Serif display face: Fraunces (loaded via CSS).

import React, { useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
const smooth = (t) => t * t * (3 - 2 * t);

// PROTOTYPE: first 3 worlds. (Full build → SERVICES.slice(0, 10).)
const ITEMS = SERVICES.slice(0, 3);

export default function ServiceWorlds() {
  const sectionRef = useRef(null);
  const ufoRef = useRef(null);
  const planetRefs = useRef([]);
  const blockRefs = useRef([]);
  planetRefs.current = [];
  blockRefs.current = [];
  const addPlanet = (el) => { if (el && !planetRefs.current.includes(el)) planetRefs.current.push(el); };
  const addBlock = (el) => { if (el && !blockRefs.current.includes(el)) blockRefs.current.push(el); };

  useEffect(() => {
    const section = sectionRef.current;
    const ufo = ufoRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = ITEMS.length;

    if (reduce) {
      planetRefs.current.forEach((el, i) => {
        el.style.opacity = i === 0 ? "1" : "0";
        el.style.transform = "translate(-50%, -18%) scale(1)";
      });
      blockRefs.current.forEach((el, i) => { el.style.opacity = i === 0 ? "1" : "0"; });
      if (ufo) { ufo.style.opacity = "1"; ufo.style.top = "4vh"; }
      return;
    }

    let raf = 0;
    const t0 = performance.now();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const time = (performance.now() - t0) / 1000;
      const elapsed = performance.now() - t0;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const track = rect.height - vh;
      const p = track > 0 ? clamp(-rect.top / track, 0, 1) : 0;

      // craft: fades in on load, hovers
      const ent = clamp(elapsed / 1300, 0, 1);
      const eased = smooth(ent);
      const bob = ent >= 1 ? Math.sin(time * 1.1) * 0.8 : 0;
      const sway = ent >= 1 ? Math.sin(time * 0.5) * 6 : 0;
      if (ufo) {
        ufo.style.opacity = eased.toFixed(3);
        ufo.style.top = (lerp(-30, 4, eased) + bob) + "vh";
        ufo.style.transform = `translateX(calc(-50% + ${sway.toFixed(1)}px))`;
      }

      // world float: which world & local progress
      const wf = p * N;
      const base = clamp(Math.floor(wf), 0, N - 1);
      const local = clamp(wf - base, 0, 1);
      const trans = smooth(norm(local, 0.72, 1.0));  // 0 = resting, 1 = handed off to next

      // planets: active rests at bottom (top-arc visible); exits up while next rises in
      planetRefs.current.forEach((el, i) => {
        let y, op, sc;
        if (i === base) { y = lerp(112, 46, trans); op = 1 - trans; sc = lerp(1, 0.9, trans); }
        else if (i === base + 1) { y = lerp(176, 112, trans); op = trans; sc = lerp(0.9, 1, trans); }
        else { op = 0; y = 200; sc = 0.9; }
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate(-50%, -50%) translateY(${y.toFixed(1)}vh) scale(${sc.toFixed(3)})`;
      });

      // text blocks (each holds its own centre copy + L/R neighbours)
      blockRefs.current.forEach((el, i) => {
        let op = 0, ty = 0;
        if (i === base) { op = 1 - smooth(norm(local, 0.66, 0.95)); ty = lerp(0, -26, trans); }
        else if (i === base + 1) { op = smooth(norm(local, 0.72, 0.98)); ty = lerp(30, 0, trans); }
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translateY(${ty.toFixed(1)}px)`;
      });
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="sw" aria-label="Our services">
      <style>{CSS}</style>

      {/* Fixed craft, hovering over the worlds */}
      <img ref={ufoRef} className="sw-ufo" src="/images/skyup-ufo.png" alt="" aria-hidden="true" draggable="false" />

      {/* Sticky stage */}
      <div className="sw-stage">
        {/* Planet layer */}
        <div className="sw-planets" aria-hidden="true">
          {ITEMS.map((s) => (
            <img
              key={s.slug}
              ref={addPlanet}
              className="sw-planet"
              src={`/images/worlds/planet-${s.slug}.png`}
              alt=""
              draggable="false"
              style={{ filter: `drop-shadow(0 0 90px ${s.accent}55)` }}
            />
          ))}
        </div>

        {/* Text layer: one block per world */}
        {ITEMS.map((s, i) => {
          const prev = ITEMS[i - 1];
          const next = ITEMS[i + 1];
          const num = String(i + 1).padStart(2, "0");
          return (
            <div key={s.slug} ref={addBlock} className="sw-block" aria-hidden="true">
              {prev && <span className="sw-neighbor sw-neighbor--l">{prev.name}</span>}
              {next && <span className="sw-neighbor sw-neighbor--r">{next.name}</span>}
              <div className="sw-center">
                <span className="sw-eyebrow">Service {num}</span>
                <h2 className="sw-name" style={{ ["--acc"]: s.accent }}>{s.name}</h2>
                <p className="sw-tag">{s.tagline}</p>
                <a className="sw-btn" href={s.href} style={{ ["--acc"]: s.accent }} tabIndex={-1}>
                  Explore <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          );
        })}

        <span className="sw-cue" aria-hidden="true">Scroll to travel</span>
      </div>

      {/* SEO / a11y */}
      <ul className="sw-sr">
        {ITEMS.map((s) => <li key={s.slug}><a href={s.href}>{s.name}: {s.tagline}</a></li>)}
      </ul>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');

.sw{ position:relative; height:390vh; --ink:#04050C; }

.sw-ufo{
  position:fixed; left:50%; top:-30vh; z-index:40;
  width:min(230px, 34vw); height:auto; opacity:0; transform:translateX(-50%);
  pointer-events:none; user-select:none;
  filter:drop-shadow(0 16px 44px rgba(60,110,255,.4));
}

.sw-stage{ position:sticky; top:0; height:100vh; overflow:hidden; }

.sw-planets{ position:absolute; inset:0; z-index:10; pointer-events:none; }
.sw-planet{
  position:absolute; left:50%; top:0; width:min(720px, 92vw); height:auto;
  opacity:0; will-change:transform,opacity;
}

.sw-block{ position:absolute; inset:0; z-index:20; opacity:0; will-change:opacity,transform; }
.sw-center{
  position:absolute; left:50%; top:34vh; transform:translateX(-50%);
  width:min(760px,90vw); text-align:center;
}
.sw-eyebrow{
  display:inline-block; color:rgba(255,255,255,.55); font-size:.74rem; font-weight:600;
  letter-spacing:.34em; text-transform:uppercase; margin-bottom:1rem;
}
.sw-name{
  font-family:'Fraunces', Georgia, serif; font-weight:600; color:#fff;
  font-size:clamp(3rem, 9vw, 7rem); line-height:.98; letter-spacing:-.01em; margin:0;
  text-shadow:0 0 60px color-mix(in srgb, var(--acc) 45%, transparent);
}
.sw-tag{ margin:1.3rem auto 0; max-width:52ch; color:rgba(255,255,255,.78); font-size:clamp(.95rem,1.5vw,1.15rem); line-height:1.6; }
.sw-btn{
  display:inline-flex; align-items:center; gap:.5rem; margin-top:2rem;
  padding:.8rem 1.7rem; border-radius:999px; font-weight:600; font-size:.95rem;
  color:#04050C; background:#fff; text-decoration:none;
  box-shadow:0 0 0 1px color-mix(in srgb, var(--acc) 60%, transparent), 0 10px 40px color-mix(in srgb, var(--acc) 35%, transparent);
  transition:transform .2s;
}
.sw-btn:hover{ transform:translateY(-2px); }

.sw-neighbor{
  position:absolute; top:50%; transform:translateY(-50%);
  font-family:'Fraunces', Georgia, serif; font-size:clamp(.9rem,1.4vw,1.15rem);
  letter-spacing:.06em; color:rgba(255,255,255,.32); white-space:nowrap; max-width:16vw; overflow:hidden; text-overflow:ellipsis;
}
.sw-neighbor--l{ left:3.5vw; }
.sw-neighbor--r{ right:3.5vw; }

.sw-cue{ position:absolute; left:50%; bottom:4vh; transform:translateX(-50%); z-index:25;
  font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.4);
  animation:swPulse 2.4s ease-in-out infinite; }
@keyframes swPulse{ 0%,100%{opacity:.35} 50%{opacity:.8} }

.sw-sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }

@media (max-width:768px){
  .sw-planet{ width:118vw; }
  .sw-neighbor{ display:none; }
  .sw-center{ top:28vh; }
}
@media (prefers-reduced-motion: reduce){
  .sw{ height:auto; }
  .sw-stage{ position:relative; height:auto; min-height:100vh; }
}
`;
