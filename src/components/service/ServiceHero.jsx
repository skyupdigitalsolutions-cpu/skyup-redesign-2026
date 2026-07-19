// src/components/service/ServiceHero.jsx
//
// SKYUP Services — cinematic "arrival" hero, built around a single craft+beam
// render (public/images/skyup-ufo-beam.png). Because the beam is part of the
// image, it is always perfectly attached to the craft.
//
// FIX (readability): the beam and the text must never share the same space.
//   - Desktop (>=900px): craft+beam anchored to the RIGHT, headline/subtitle
//     pinned in a LEFT column. They're horizontally separated, so the bright
//     beam never crosses the headline or the scanning service card.
//   - Mobile (<900px): craft+beam stays centered, but it now settles BELOW
//     the headline block (measured live, so it adapts to actual text height)
//     instead of sharing the same vertical band.
// The headline's position is fixed by CSS per breakpoint — it no longer
// tracks the craft's vertical position at all, so it can't drift onto the
// beam's axis as the craft bobs/scrolls.
//
// Scroll story (rAF + progress math — SSR-safe, no ScrollTrigger, no white-out):
//   0. On LOAD: the craft flies in from the top and hovers. A mask hides the
//      beam, so only the saucer is visible — the beam does not exist yet.
//   1. On SCROLL: the mask retracts downward, "switching on" the beam.
//   2. Further SCROLL: the 10 services scan into the beam one at a time.
// The craft stays fixed, hovering, for the rest of the page.
//
// Brand: bg #04050C · blue #9cc0ff · amber #FA9F43.

import React, { useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (v, a, b) => clamp((v - a) / (b - a), 0, 1);

const ITEMS = SERVICES.slice(0, 10);
const IMG_RATIO = 1536 / 1024;   // portrait render (h / w)
const DESKTOP_MIN_VW = 900;

export default function ServiceHero() {
  const sectionRef = useRef(null);
  const ufoRef = useRef(null);
  const headRef = useRef(null);
  const revealRef = useRef(null);
  const dotsRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];
  const addItem = (el) => { if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el); };

  useEffect(() => {
    const section = sectionRef.current;
    const ufo = ufoRef.current;
    const head = headRef.current;
    const reveal = revealRef.current;
    const dots = dotsRef.current;
    if (!section || !ufo) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SCAN_START = 0.42;
    const SCAN_END = 0.99;
    const BEAM_START = 0.10;   // mask begins retracting (beam switches on)
    const BEAM_FULL = 0.34;    // beam fully revealed
    const ENTRANCE_MS = 1500;
    const N = ITEMS.length;

    // Craft width/height + a breakpoint flag. The craft itself never needs
    // to know about the headline's layout — they're positioned independently.
    const geom = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const isDesktop = vw >= DESKTOP_MIN_VW;
      const imgW = isDesktop ? Math.min(440, vw * 0.34) : vw * 0.62;
      const imgH = imgW * IMG_RATIO;
      return { vw, vh, imgW, imgH, isDesktop };
    };

    // Where the craft should settle vertically once it's finished flying in.
    //   Desktop: tucked near the top — safe because it's off to the side.
    //   Mobile: measured live from the headline's actual rendered height,
    //   so the craft always settles clear of it, regardless of copy length.
    const settleTopPx = (vh, isDesktop) => {
      if (isDesktop) return vh * 0.04;
      const headH = head ? head.getBoundingClientRect().height : 160;
      return headH + 28;
    };

    if (reduce) {
      const { vw, vh, imgW, imgH, isDesktop } = geom();
      const settlePx = settleTopPx(vh, isDesktop);
      ufo.style.top = settlePx + "px";
      ufo.style.opacity = "1";
      ufo.style.transform = isDesktop ? "translateX(0)" : "translateX(-50%)";
      ufo.style.webkitMaskImage = ufo.style.maskImage = "none";
      if (reveal) reveal.style.top = (settlePx + imgH * 0.56) + "px";
      if (head) head.style.opacity = "1";
      const centerXPx = isDesktop ? vw - vw * 0.06 - imgW / 2 : null;
      itemRefs.current.forEach((el, i) => {
        el.style.left = centerXPx != null ? centerXPx + "px" : "";
        el.style.opacity = i === 0 ? "1" : "0";
      });
      const d = dots?.children?.[0];
      if (d) d.classList.add("sh-dot--on");
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
      const { vw, vh, imgW, imgH, isDesktop } = geom();

      const rect = section.getBoundingClientRect();
      const track = rect.height - vh;
      const p = track > 0 ? clamp(-rect.top / track, 0, 1) : 0;

      // ---- 1. entrance on LOAD (time-based) → then idle hover ----
      const ent = clamp(elapsed / ENTRANCE_MS, 0, 1);
      const eased = ent * ent * (3 - 2 * ent);
      const settled = ent >= 1;

      const startPx = -0.55 * vh;
      const settlePx = settleTopPx(vh, isDesktop);
      const bobPx = settled ? Math.sin(time * 1.2) * 0.007 * vh : 0;
      const sway = settled ? Math.sin(time * 0.6) * 5 : 0;
      const topPx = lerp(startPx, settlePx, eased);
      const imgTopPx = topPx + bobPx;

      ufo.style.opacity = eased.toFixed(3);
      ufo.style.top = imgTopPx + "px";
      ufo.style.transform = isDesktop
        ? `translateX(${sway.toFixed(1)}px)`
        : `translateX(calc(-50% + ${sway.toFixed(1)}px))`;

      // ---- 2. beam reveal via mask: only craft shows until you scroll ----
      const rev = lerp(34, 108, norm(p, BEAM_START, BEAM_FULL) * eased);
      const mask = `linear-gradient(180deg, #000 ${(rev - 4).toFixed(1)}%, transparent ${(rev + 7).toFixed(1)}%)`;
      ufo.style.webkitMaskImage = mask;
      ufo.style.maskImage = mask;

      // ---- 3. headline: fades in on load, recedes as scan begins ----
      // Position is fixed by CSS per breakpoint (left column on desktop,
      // pinned near the top on mobile) — it never tracks the craft, so it
      // can never drift onto the beam's axis. Only opacity + a small lift.
      if (head) {
        const hIn = clamp((elapsed - 500) / 1100, 0, 1);
        const hOut = norm(p, 0.24, 0.36);
        head.style.opacity = (hIn * (1 - hOut)).toFixed(3);
        const liftY = lerp(14, -18, hOut);
        head.style.transform = isDesktop
          ? `translateY(calc(-50% + ${liftY.toFixed(1)}px))`
          : `translateX(-50%) translateY(${liftY.toFixed(1)}px)`;
      }

      // ---- 4. scan services into the beam, one at a time ----
      const beamContentY = imgTopPx + imgH * 0.60;
      if (reveal) reveal.style.top = beamContentY + "px";
      // On desktop the beam sits to the right, so the scanning card must be
      // horizontally re-centered under it instead of the page's center.
      const centerXPx = isDesktop ? vw - vw * 0.06 - imgW / 2 : null;
      const scan = norm(p, SCAN_START, SCAN_END) * N;
      const active = clamp(Math.floor(scan), 0, N - 1);
      const within = scan - active;
      const cardOp = Math.min(norm(within, 0, 0.18), 1 - norm(within, 0.82, 1));
      const cardRise = lerp(22, 0, norm(within, 0, 0.3));

      itemRefs.current.forEach((el, i) => {
        el.style.left = centerXPx != null ? centerXPx + "px" : "";
        if (i === active && p >= SCAN_START) {
          el.style.opacity = cardOp.toFixed(3);
          el.style.transform =
            `translate(-50%, calc(-50% + ${cardRise.toFixed(1)}px)) scale(${lerp(0.96, 1, cardOp).toFixed(3)})`;
        } else {
          el.style.opacity = "0";
        }
      });

      if (dots) {
        const dOp = norm(p, SCAN_START - 0.03, SCAN_START) * (1 - norm(p, 0.965, 1));
        dots.style.opacity = dOp.toFixed(3);
      }
      if (dots && active !== lastIndex) {
        [...dots.children].forEach((d, i) =>
          d.classList.toggle("sh-dot--on", i <= active && p >= SCAN_START)
        );
        lastIndex = active;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} className="sh" aria-label="Our services">
      <style>{CSS}</style>

      {/* Single craft+beam render, fixed so it hovers over the whole page */}
      <img
        ref={ufoRef}
        className="sh-ufo"
        src="/images/skyup-ufo-beam.png"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <div ref={headRef} className="sh-head">
          <span className="sh-eyebrow">
            <span className="sh-eyebrow-dot" />
            Our Services
          </span>
          <h1 className="sh-title">
            Scalable digital services for{" "}
            <span className="sh-title-grad">modern business growth</span>
          </h1>
          <p className="sh-sub">
            Most brands spend on digital but get vanity metrics. SkyUp fixes that
            with clear goals, honest reporting, and execution aligned to revenue.
          </p>
        </div>

        <div ref={revealRef} className="sh-reveal" aria-hidden="true">
          {ITEMS.map((s) => {
            const Icon = s.Icon;
            return (
              <div className="sh-card" key={s.slug} ref={addItem}>
                <span
                  className="sh-card-icon"
                  style={{ color: s.accent, borderColor: s.accent + "88", background: s.accent + "22" }}
                >
                  {Icon ? <Icon size={28} strokeWidth={1.9} /> : null}
                </span>
                <span className="sh-card-name">{s.name}</span>
                <span className="sh-card-tag">{(s.tagline || "").split(/[.—]/)[0].trim()}.</span>
              </div>
            );
          })}
        </div>

        <div ref={dotsRef} className="sh-dots" aria-hidden="true">
          {ITEMS.map((s) => <i key={s.slug} className="sh-dot" />)}
        </div>

      <ul className="sh-sr">
        {ITEMS.map((s) => <li key={s.slug}><a href={s.href}>{s.name}</a></li>)}
      </ul>
    </section>
  );
}

const CSS = `
.sh{ position:relative; height:400vh; --blue:#9cc0ff; --amber:#FA9F43; }

/* Craft + beam (single render), fixed so it hovers over the whole page.
   Mobile: centered, settled low enough (via JS, measured against the
   headline's real height) to clear the text above it.
   Desktop (>=900px): anchored to the RIGHT — this is what keeps the beam
   off the headline's axis entirely. */
.sh-ufo{
  position:fixed; left:50%; top:-55vh; z-index:35;
  width:62vw; height:auto; opacity:0;
  transform:translateX(-50%);
  pointer-events:none; user-select:none;
  filter:drop-shadow(0 20px 60px rgba(60,110,255,.35));
  will-change:top,transform,opacity,mask-image;
}
@media (min-width:900px){
  .sh-ufo{ left:auto; right:6vw; width:min(440px, 34vw); }
}

/* Headline — pinned near the top on mobile (above where the craft settles),
   moved into its own left-hand column on desktop (beside, not under, the
   beam). Its position is fixed by CSS, not by JS, so it can never drift
   onto the beam's axis as the craft bobs or the page scrolls. */
.sh-head{
  position:fixed; top:4vh; left:50%; transform:translateX(-50%);
  width:92vw; text-align:center; opacity:0; z-index:37;
  will-change:opacity,transform;
}
@media (min-width:900px){
  .sh-head{ top:50%; left:6vw; transform:translateY(-50%); width:min(560px, 42vw); text-align:left; }
}
.sh-eyebrow{
  display:inline-flex; align-items:center; gap:.5rem;
  border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.06);
  color:#fff; font-size:.7rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
  padding:.38rem .95rem; border-radius:999px; backdrop-filter:blur(6px);
}
.sh-eyebrow-dot{ width:6px; height:6px; border-radius:999px; background:var(--amber); box-shadow:0 0 10px var(--amber); }
.sh-title{ margin:1rem 0 0; color:#fff; font-weight:800; letter-spacing:-.02em; line-height:1.12; font-size:clamp(1.7rem,4vw,3rem); }
.sh-title-grad{ background:linear-gradient(90deg,var(--blue),var(--amber)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.sh-sub{ margin:.9rem auto 0; max-width:56ch; color:rgba(255,255,255,.72); font-size:clamp(.9rem,1.4vw,1.05rem); line-height:1.6; }
@media (min-width:900px){
  .sh-sub{ margin:.9rem 0 0; }
}

/* Service reveal — container top set in JS to sit inside the beam.
   On desktop each card's left is also set in JS, re-centered under the
   right-anchored beam instead of the page center. */
.sh-reveal{ position:fixed; left:0; width:100%; z-index:37; pointer-events:none; }
.sh-card{
  position:absolute; left:50%; top:0; transform:translate(-50%,-50%) scale(.96);
  width:min(340px,80vw); text-align:center; opacity:0; will-change:opacity,transform,left;
  display:flex; flex-direction:column; align-items:center; gap:.6rem;
  padding:22px 14px; border-radius:24px;
  background:radial-gradient(62% 60% at 50% 46%, rgba(3,7,20,.66), rgba(3,7,20,.28) 55%, rgba(3,7,20,0) 78%);
}
@media (min-width:900px){
  .sh-card{ width:min(300px, 30vw); }
}
.sh-card-icon{
  width:60px; height:60px; display:grid; place-items:center; border-radius:18px;
  border:1px solid; backdrop-filter:blur(4px); box-shadow:0 8px 30px rgba(0,0,0,.4);
}
.sh-card-name{ color:#fff; font-weight:700; font-size:clamp(1.2rem,2.2vw,1.6rem); letter-spacing:-.01em; text-shadow:0 2px 20px rgba(0,0,0,.5); }
.sh-card-tag{ color:rgba(255,255,255,.8); font-size:clamp(.82rem,1.3vw,.95rem); line-height:1.5; max-width:30ch; text-shadow:0 2px 14px rgba(0,0,0,.5); }

.sh-dots{ position:fixed; left:50%; bottom:5vh; transform:translateX(-50%); display:flex; gap:.45rem; z-index:37; }
.sh-dot{ width:7px; height:7px; border-radius:999px; background:rgba(255,255,255,.2); transition:background .3s, box-shadow .3s, transform .3s; }
.sh-dot--on{ background:var(--blue); box-shadow:0 0 10px var(--blue); transform:scale(1.15); }

.sh-sr{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }

@media (max-width:768px){ .sh{ height:360vh; } }
@media (prefers-reduced-motion: reduce){
  .sh{ height:auto; }
  .sh-stage{ position:relative; height:auto; min-height:100vh; }
}
`;
