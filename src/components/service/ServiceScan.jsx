// src/components/service/ServiceScan.jsx
//
// SKYUP Services — "UFO scans its services" hero (short-beam version).
// The craft hovers at the top with a SHORT, soft amber beam. As you scroll, the
// 10 services rise — one at a time — into the beam's glow as holographic cards
// (icon + name + one-line tagline + Explore), then sink away as the next rises.
//
// Readability by construction: the beam is short & faint, and every card sits on
// its own dark radial scrim — so text never washes out. Scroll-driven via
// rAF + progress (SSR-safe, no ScrollTrigger). Image: /images/skyup-ufo-shortbeam.png
//
// Brand: bg #04050C · amber #FA9F43.

import React, { useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
const smooth = (t) => t * t * (3 - 2 * t);

const ITEMS = SERVICES.slice(0, 10);
const IMG_RATIO = 1561 / 1100; // longer cone-beam (h / w)

export default function ServiceScan() {
  const sectionRef = useRef(null);
  const ufoRef = useRef(null);
  const revealRef = useRef(null);
  const dotsRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ufo = ufoRef.current;
    const reveal = revealRef.current;
    const dots = dotsRef.current;
    const count = countRef.current;
    if (!section || !ufo) return;
    const items = reveal ? Array.from(reveal.querySelectorAll(".ss-card")) : [];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = ITEMS.length;
    const SCAN_START = 0.07;
    const SCAN_END = 0.97;
    const ENTRANCE_MS = 1400;

    const geom = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      // Cap the craft+cone to ~60% of the viewport HEIGHT so the pool (and the
      // card that lands in it) always stay on-screen — even on short laptops.
      const capH = vh * 0.64;
      const base = vw < 768 ? vw * 0.92 : Math.min(560, vw * 0.44);
      const imgW = Math.min(base, capH / IMG_RATIO);
      const imgH = imgW * IMG_RATIO;
      const beamPoolFromTop = 0.88;               // NAME lands in the beam's pool
      const HEADER_CLEAR = 104;                   // keep the craft clear of the fixed header
      const settleTop = Math.max(vh * 0.11, HEADER_CLEAR);
      return { vw, vh, imgW, imgH, settleTop, beamPoolFromTop };
    };

    if (reduce) {
      const g = geom();
      ufo.style.width = g.imgW + "px";
      ufo.style.top = g.settleTop + "px";
      ufo.style.opacity = "1";
      ufo.style.transform = "translateX(-50%)";
      if (reveal) reveal.style.top = (g.settleTop + g.imgH * g.beamPoolFromTop) + "px";
      items.forEach((el, i) => { el.style.opacity = i === 0 ? "1" : "0"; });
      const d = dots?.children?.[0]; if (d) d.classList.add("ss-dot--on");
      if (dots && dots.parentElement) dots.parentElement.style.opacity = "1";
      if (count) count.textContent = "01 / " + String(N).padStart(2, "0");
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    let lastIndex = -1;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const time = (now - t0) / 1000;
      const elapsed = now - t0;
      const g = geom();

      const rect = section.getBoundingClientRect();
      const track = rect.height - g.vh;
      const p = track > 0 ? clamp(-rect.top / track, 0, 1) : 0;

      // entrance on load → idle hover; fade craft out at the very end so it
      // never floats over whatever comes below.
      const ent = clamp(elapsed / ENTRANCE_MS, 0, 1);
      const eased = smooth(ent);
      const settled = ent >= 1;
      const bob = settled ? Math.sin(time * 1.15) * (0.006 * g.vh) : 0;
      const sway = settled ? Math.sin(time * 0.55) * 5 : 0;
      const outro = norm(p, 0.985, 1);           // fade near the very end
      const topPx = lerp(-0.5 * g.vh, g.settleTop, eased) + bob;
      ufo.style.opacity = (eased * (1 - outro)).toFixed(3);
      ufo.style.width = g.imgW + "px";
      ufo.style.top = topPx + "px";
      ufo.style.transform = `translateX(calc(-50% + ${sway.toFixed(1)}px))`;

      // service cards rise into the beam pool, one at a time
      const beamPoolY = topPx + g.imgH * g.beamPoolFromTop;
      if (reveal) reveal.style.top = beamPoolY + "px";

      const scan = norm(p, SCAN_START, SCAN_END) * N;
      const active = clamp(Math.floor(scan), 0, N - 1);
      const within = scan - active;
      const cardOp = Math.min(norm(within, 0, 0.22), 1 - norm(within, 0.78, 1)) * (1 - outro);
      const rise = lerp(30, 0, smooth(norm(within, 0, 0.35)));

      items.forEach((el, i) => {
        if (i === active && p >= SCAN_START && p < 1) {
          el.style.opacity = cardOp.toFixed(3);
          el.style.transform =
            `translate(-50%, calc(-50% + ${rise.toFixed(1)}px)) scale(${lerp(0.94, 1, cardOp).toFixed(3)})`;
        } else {
          el.style.opacity = "0";
        }
      });

      // progress dots + counter
      const uiOp = (norm(p, SCAN_START - 0.02, SCAN_START) * (1 - outro)).toFixed(3);
      if (dots && dots.parentElement) dots.parentElement.style.opacity = uiOp;
      if (dots) dots.style.opacity = uiOp;
      if (count) count.style.opacity = uiOp;
      if (active !== lastIndex) {
        if (dots) [...dots.children].forEach((d, i) => d.classList.toggle("ss-dot--on", i === active));
        if (count) count.textContent =
          String(active + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
        lastIndex = active;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="ss" aria-label="Our services">
      <style>{CSS}</style>

      <img
        ref={ufoRef}
        className="ss-ufo"
        src="/images/skyup-ufo-conebeam.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <div ref={revealRef} className="ss-reveal" aria-hidden="true">
        {ITEMS.map((s) => {
          const Icon = s.Icon;
          return (
            <a className="ss-card" key={s.slug} href={s.href} tabIndex={-1}>
              <span
                className="ss-card-icon"
                style={{ color: s.accent, borderColor: s.accent + "88", background: s.accent + "22" }}
              >
                {Icon ? <Icon size={26} strokeWidth={1.9} /> : null}
              </span>
              <span className="ss-card-name">{s.name}</span>
              <span className="ss-card-cta">Explore Now</span>
            </a>
          );
        })}
      </div>

      <div className="ss-ui">
        <span className="ss-eyebrow">Our Services</span>
        <div ref={dotsRef} className="ss-dots" aria-hidden="true">
          {ITEMS.map((s) => <i key={s.slug} className="ss-dot" />)}
        </div>
        <span ref={countRef} className="ss-count" aria-hidden="true">01 / 10</span>
      </div>

      <ul className="ss-sr">
        {ITEMS.map((s) => <li key={s.slug}><a href={s.href}>{s.name}: {s.tagline}</a></li>)}
      </ul>
    </section>
  );
}

const CSS = `
.ss{ position:relative; height:340vh; --amber:#FA9F43; }

.ss-ufo{
  position:fixed; left:50%; top:-50vh; z-index:35;
  width:min(500px,40vw); height:auto; opacity:0; transform:translateX(-50%);
  pointer-events:none; user-select:none;
  filter:drop-shadow(0 18px 50px rgba(250,159,67,.28));
  will-change:top,transform,opacity;
}
@media (max-width:768px){ .ss-ufo{ width:86vw; } }

/* card layer — top set in JS to sit in the beam glow */
.ss-reveal{ position:fixed; left:0; width:100%; z-index:37; pointer-events:none; }
.ss-card{
  position:absolute; left:50%; top:0; transform:translate(-50%,-50%) scale(.94);
  width:min(340px,82vw); text-align:center; opacity:0; text-decoration:none;
  display:flex; flex-direction:column; align-items:center; gap:.45rem;
  padding:14px 18px; border-radius:26px; pointer-events:auto;
  background:radial-gradient(64% 62% at 50% 44%, rgba(3,7,20,.72), rgba(3,7,20,.32) 56%, rgba(3,7,20,0) 80%);
  will-change:opacity,transform;
}
.ss-card-icon{
  width:52px; height:52px; display:grid; place-items:center; border-radius:18px;
  border:1px solid; backdrop-filter:blur(4px); box-shadow:0 8px 30px rgba(0,0,0,.45);
}
.ss-card-name{ color:#5b8cff; font-weight:700; font-size:clamp(1.4rem,2.6vw,1.9rem); letter-spacing:-.01em; text-shadow:0 2px 22px rgba(0,0,0,.6); }
.ss-card-cta{ margin-top:.7rem; display:inline-block; padding:.7rem 1.6rem; border-radius:999px; background:#5b8cff; color:#fff; font-weight:600; font-size:.95rem; letter-spacing:.01em; box-shadow:0 10px 30px rgba(91,140,255,.4); transition:transform .2s, background .2s; }
.ss-card:hover .ss-card-cta{ transform:translateY(-2px); background:#4a7bf0; }

/* bottom UI: eyebrow + dots + counter */
.ss-ui{
  position:fixed; left:50%; bottom:2.5vh; transform:translateX(-50%); z-index:37;
  display:flex; flex-direction:column; align-items:center; gap:.7rem;
  opacity:0; will-change:opacity;
}
.ss-eyebrow{ color:rgba(255,255,255,.5); font-size:.68rem; font-weight:600; letter-spacing:.32em; text-transform:uppercase; }
.ss-dots{ display:flex; gap:.4rem; opacity:0; transition:opacity .3s; }
.ss-dot{ width:6px; height:6px; border-radius:999px; background:rgba(255,255,255,.2); transition:background .3s, box-shadow .3s, transform .3s; }
.ss-dot--on{ background:var(--amber); box-shadow:0 0 10px var(--amber); transform:scale(1.3); }
.ss-count{ color:rgba(255,255,255,.55); font-size:.72rem; letter-spacing:.18em; opacity:0; transition:opacity .3s; font-variant-numeric:tabular-nums; }

.ss-sr{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }

@media (max-width:768px){ .ss{ height:320vh; } }
@media (prefers-reduced-motion: reduce){ .ss{ height:auto; min-height:100vh; } }
`;
