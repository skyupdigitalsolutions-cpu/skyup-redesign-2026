// src/components/service/ServiceSolar.jsx
//
// SKYUP Services — "Solar System".
// A glowing sun (Skyup) sits at the center; 8 service-planets orbit it on two
// tilted elliptical rings, scaling with depth (front larger/in-front, back
// smaller/behind the sun). Hover a planet: it pauses, brightens, and shows the
// service name + "Explore Now". Click → /service/<slug>.
//
// rAF-driven, SSR-safe. Mobile => static tidy grid of the planets.

import React, { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMG = "/images/solar";

// Slug -> planet art (files live at /images/solar/<art>.webp).
// NOTE: the performance art file is spelled "perfomance" to match public/images/solar.
const PLANET = {
  "seo": "seo",
  "social-media-marketing": "social",
  "performance-marketing": "perfomance",
  "ai-automation": "ai",
  "video-editing": "video",   // Video Editing (locked architecture)
  "ui-ux-design": "uiux",
  "graphic-design": "graphic",
  "web-development": "web",
};

// Fallback name/link for any orbit slug not (yet) present in @/data/services.
// >>> If your real Video service uses a different slug / name / link, edit this line. <<<
const FALLBACK = {
  "video-editing": { name: "Video Editing", href: "/service/video-editing" },
};

// The 8 services in orbit (email-marketing + crm excluded; machine-learning -> video).
// Order follows PLANET; name/href come from SERVICES, falling back to FALLBACK so Video
// renders correctly even before it's added to services.js.
const bySlug = Object.fromEntries((SERVICES || []).map((s) => [s.slug, s]));
const ORBIT = Object.keys(PLANET).map((slug) => {
  const s = bySlug[slug] || FALLBACK[slug] || {};
  return { slug, name: s.name || slug, href: s.href || `/service/${slug}`, art: PLANET[slug] };
});

// two rings: inner 3, outer 5
// 4 orbit rings, 2 service-planets on each (placed on opposite sides), inner -> outer.
// All rings share ONE speed & direction, so the whole system turns as a rigid
// pattern and two planets can never drift into each other. 2 planets per ring
// (opposite sides); bases spaced 0 / 90 / 45 / 135 keep all 8 far apart.
const SPD = 0.045;
const RINGS = [
  { rx: 0.185, ry: 0.135, count: 2, speed: SPD, dir: 1, base: 0 },
  { rx: 0.275, ry: 0.178, count: 2, speed: SPD, dir: 1, base: Math.PI / 2 },
  { rx: 0.365, ry: 0.221, count: 2, speed: SPD, dir: 1, base: Math.PI / 4 },
  { rx: 0.455, ry: 0.264, count: 2, speed: SPD, dir: 1, base: (3 * Math.PI) / 4 },
];

export default function ServiceSolar() {
  const rootRef = useRef(null);
  const systemRef = useRef(null); // solar-system group (scales/fades in on scroll)
  const flashRef = useRef(null);  // full-screen light flash for the reveal
  const [paused, setPaused] = useState(-1);
  const pausedRef = useRef(-1);
  // Launch Gateway hero refs
  const heroRef     = useRef(null);
  const textRef     = useRef(null);
  const orbRef      = useRef(null);
  const orbGlowRef  = useRef(null);
  const ringsRef    = useRef(null);
  const glowBlueRef = useRef(null);
  const horizonRef  = useRef(null);   // orange horizon line
  const curveRef    = useRef(null);   // big blue cosmic-horizon arc
  const starsFarRef = useRef(null);
  const starsNearRef = useRef(null);
  const particlesRef = useRef(null);
  const heroBdRef = useRef(null); // the real solar backdrop, revealed as the hero dissolves
  const capRefs     = useRef([]);
  capRefs.current = [];
  const addCap = (el) => { if (el && !capRefs.current.includes(el)) capRefs.current.push(el); };

  /* ── Pinned, scrubbed 4-state hero journey (CSS + GSAP, no WebGL) ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const clampN = (n, a, b) => Math.max(a, Math.min(b, n));
    const lerpN  = (a, b, t) => a + (b - a) * t;
    const normN  = (v, a, b) => clampN((v - a) / (b - a), 0, 1);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Apply a full state for a given progress p (0..1). Used by both the
    // scroll driver and the reduced-motion static composition.
    const render = (p) => {
      const isMobile = window.innerWidth < 768;
      const orbMax   = isMobile ? 1.9 : 2.4;

      const stFar   = normN(p, 0.00, 0.55);
      const stNear  = normN(p, 0.40, 1.00);
      const glow    = normN(p, 0.20, 0.92);
      const orangeU = normN(p, 0.45, 0.72);
      const orangeD = normN(p, 0.86, 1.00);
      const curve   = normN(p, 0.62, 1.00);
      const orbGrow = normN(p, 0.18, 1.00);
      const rings   = normN(p, 0.20, 0.50);
      const parts   = normN(p, 0.22, 0.72);
      const tLift   = normN(p, 0.12, 0.62);
      const tFade   = normN(p, 0.28, 0.48);

      const set = (ref, fn) => { if (ref.current) fn(ref.current.style); };

      // In the final stretch the real solar backdrop fades IN while every CSS mockup
      // layer fades OUT — so the hero visually becomes the solar system (no seam).
      const bdIn   = normN(p, 0.55, 1.00);
      const fadeUp = 1 - normN(p, 0.62, 1.00); // 1 -> 0 across the end
      set(heroBdRef, s => { s.opacity = bdIn.toFixed(3); });

      set(starsFarRef,  s => { s.opacity = (lerpN(0.16, 0.60, stFar) * fadeUp).toFixed(3); });
      set(starsNearRef, s => { s.opacity = (lerpN(0.00, 0.85, stNear) * fadeUp).toFixed(3); });
      set(glowBlueRef,  s => {
        s.opacity = (lerpN(0.22, 1, glow) * fadeUp).toFixed(3);
        s.transform = `translateX(-50%) scaleX(${lerpN(0.8,1.35,glow).toFixed(3)}) scaleY(${lerpN(0.7,1.6,glow).toFixed(3)})`;
      });
      set(horizonRef, s => { s.opacity = (lerpN(0,0.8,orangeU) * (1 - 0.45*orangeD) * fadeUp).toFixed(3); });
      set(curveRef, s => {
        s.opacity = (curve * fadeUp).toFixed(3);
        s.transform = `translateX(-50%) scaleX(${lerpN(0.55,1,curve).toFixed(3)}) scaleY(${lerpN(0.35,1,curve).toFixed(3)})`;
      });
      set(orbRef,     s => { s.transform = `scale(${lerpN(1, orbMax, orbGrow).toFixed(3)})`; s.opacity = fadeUp.toFixed(3); });
      set(orbGlowRef, s => {
        s.opacity = (lerpN(0.35,1,orbGrow) * fadeUp).toFixed(3);
        s.transform = `translate(-50%,-50%) scale(${lerpN(1,2.8,orbGrow).toFixed(3)})`;
      });
      set(ringsRef,     s => { s.opacity = (rings * fadeUp).toFixed(3); });
      set(particlesRef, s => { s.opacity = (parts * fadeUp).toFixed(3); });
      set(textRef, s => {
        s.transform = `translateY(${lerpN(0,-46,tLift).toFixed(1)}px)`;
        s.opacity = (1 - tFade).toFixed(3);
      });
      // captions cross-fade across the 3 bands
      const capOp = [
        normN(p,0.30,0.40) * (1 - normN(p,0.56,0.64)),
        normN(p,0.60,0.68) * (1 - normN(p,0.82,0.88)),
        normN(p,0.84,0.90) * (1 - normN(p,0.985,1.00)),
      ];
      capRefs.current.forEach((el, i) => { if (el) el.style.opacity = (capOp[i] || 0).toFixed(3); });
    };

    if (reduce) {
      render(0.5); // a complete, cinematic static composition
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let st;
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: isMobile ? "+=140%" : "+=200%",
        scrub: 1,
        pin: hero,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });
      render(0);
    }, hero);

    return () => { ctx.revert(); if (st) st.kill(); };
  }, []);

  /* ── Premium reveal: the instant the solar section reaches the top it PINS (so there's
     no blank scroll), then the whole system automatically grows + fades into its final
     form with a light flash. The animation is time-based (not tied to scroll amount),
     so it plays smoothly on its own — no "scroll-by-scroll" feel. ── */
  useEffect(() => {
    const root = rootRef.current;
    const sys = systemRef.current;
    const flash = flashRef.current;
    if (!root || !sys) return;

    const bd = root.querySelector(".ss3-backdrop");
    if (bd) bd.style.transform = "none";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { sys.style.opacity = "1"; sys.style.transform = "none"; return; }

    // start hidden + small; the timeline brings it to full
    sys.style.opacity = "0";
    sys.style.transform = "scale(0.7)";

    gsap.registerPlugin(ScrollTrigger);
    let st, played = false;
    const play = () => {
      if (played) return;
      played = true;
      if (flash) { flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go"); }
      gsap.fromTo(
        sys,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" }
      );
    };

    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=60%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: play,
        onEnterBack: () => { sys.style.opacity = "1"; sys.style.transform = "none"; },
      });
    }, root);

    return () => { ctx.revert(); if (st) st.kill(); };
  }, []);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // assign each service to a ring + slot
  const layout = [];
  let idx = 0;
  RINGS.forEach((ring, ri) => {
    for (let k = 0; k < ring.count && idx < ORBIT.length; k++, idx++) {
      layout.push({ svc: ORBIT[idx], ring: ri, angle0: ring.base + (k / ring.count) * Math.PI * 2 });
    }
  });

  const planetRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Vertical radius as a fraction of the height-constrained max (inner -> outer).
    const RYF = [0.55, 0.70, 0.85, 1.0];
    const ringsWrap = root.querySelector(".ss3-rings");
    const ringEls = ringsWrap ? Array.from(ringsWrap.children) : [];
    const sunEl = root.querySelector(".ss3-sun");
    const glowEl = root.querySelector(".ss3-sun-glow");

    let dims = null; // { cx, cy, Rp, rx[], ry[] } — null on mobile (grid takes over)

    // Fit the whole system to the viewport: orbits scale to available HEIGHT so the
    // top/bottom planets never clip under the fixed header or below the fold; width
    // stays wide for the elliptical look; the sun is tied to the inner orbit so a
    // planet can never sit on top of it. Recomputed on mount + resize only.
    const measure = () => {
      const w = root.clientWidth, h = root.clientHeight;
      if (w < 761) {
        // MOBILE: single-ring orbit — sun centred, all 8 planets on one circle so
        // nothing collides on a narrow screen. Same solar-system concept as desktop,
        // adapted to portrait.
        const cx = w / 2, cy = h * 0.52;
        const Rp = Math.max(22, Math.min(32, 0.078 * w)); // small planet radius
        const R = Math.max(96, Math.min(w * 0.36, h * 0.5 - Rp - 74)); // single-ring radius
        dims = { mobile: true, cx, cy, Rp, R };
        const Rs = Math.max(32, Math.min(72, R - Rp - 16)); // sun inside the ring
        if (sunEl) { sunEl.style.width = 2 * Rs + "px"; sunEl.style.top = cy + "px"; }
        if (glowEl) { const g = Rs * 3.4; glowEl.style.width = g + "px"; glowEl.style.height = g + "px"; glowEl.style.top = cy + "px"; }
        planetRefs.current.forEach((el) => { if (el) el.style.width = 2 * Rp + "px"; });
        return;
      }
      const cx = w / 2;
      const Rp = Math.max(40, Math.min(66, 0.034 * w)); // planet radius
      const HEADER = 96, LABEL = 54;
      const cy = h * 0.5 + 14; // bias down so the top orbit clears the fixed header
      const maxRy = Math.max(140, Math.min(cy - HEADER - Rp - 8, (h - cy) - Rp - LABEL - 8, 360));
      const rx = RINGS.map((r) => r.rx * w);
      const ry = RYF.map((f) => f * maxRy);
      dims = { cx, cy, Rp, rx, ry };

      if (ringsWrap) ringsWrap.style.top = cy + "px";
      ringEls.forEach((el, i) => {
        if (ry[i] == null) return;
        el.style.width = 2 * rx[i] + "px";
        el.style.height = 2 * ry[i] + "px";
      });
      const Rs = Math.max(40, Math.min(120, ry[0] - Rp - 14)); // sun fully inside inner orbit
      if (sunEl) { sunEl.style.width = 2 * Rs + "px"; sunEl.style.top = cy + "px"; }
      if (glowEl) { const g = Rs * 3.6; glowEl.style.width = g + "px"; glowEl.style.height = g + "px"; glowEl.style.top = cy + "px"; }
      planetRefs.current.forEach((el) => { if (el) el.style.width = 2 * Rp + "px"; });
    };
    measure();
    window.addEventListener("resize", measure);

    let raf = 0, last = performance.now(), running = false;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!dims) return; // mobile — nothing to animate
      const now = performance.now();
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.1) dt = 0.1; // clamp lurch after tab-switch / frame stalls
      const anyHeld = pausedRef.current >= 0;

      layout.forEach((L, i) => {
        const el = planetRefs.current[i];
        if (!el) return;
        const ring = RINGS[L.ring];
        const held = pausedRef.current === i;

        if (el._phase == null) el._phase = 0;
        if (!anyHeld && !reduce) el._phase += dt * ring.speed * ring.dir * Math.PI;

        let x, y, depth;
        if (dims.mobile) {
          // one circle, 8 planets evenly spaced, rotating together
          const ang = i * (Math.PI * 2 / layout.length) + el._phase;
          x = dims.cx + Math.cos(ang) * dims.R;
          y = dims.cy + Math.sin(ang) * dims.R;
          depth = Math.sin(ang);
        } else {
          const ang = L.angle0 + el._phase;
          x = dims.cx + Math.cos(ang) * dims.rx[L.ring];
          y = dims.cy + Math.sin(ang) * dims.ry[L.ring];
          depth = Math.sin(ang); // +1 front (bottom), -1 back (top)
        }
        const scale = held ? 1.12 : 1;
        // Planets ALWAYS sit above the sun so none can hide behind it; orbits are
        // sized to clear the sun, so this never looks wrong. Depth only tints brightness.
        const zi = held ? 60 : 26 + Math.round((depth + 1) * 8);
        const dim = 0.82 + 0.18 * (depth + 1) / 2;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
        el.style.zIndex = zi;
        el.style.filter = `brightness(${held ? 1.15 : dim.toFixed(2)})`;
      });
    };
    // Only run the orbit while the solar section is on screen — no point animating
    // 8 planets every frame while the user is down in the Growth Playbook or FAQ.
    const start = () => { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => (e.isIntersecting ? start() : stop()),
        { rootMargin: "200px 0px 200px 0px" },
      );
      io.observe(root);
    } else {
      start();
    }
    return () => { stop(); if (io) io.disconnect(); window.removeEventListener("resize", measure); };
  }, []); // eslint-disable-line

  return (
    <div className="ss3-wrap">
      <style>{CSS}</style>

      {/* ── LAUNCH GATEWAY HERO — pinned 4-state cinematic journey ──────────
           Layers back→front: dark base · star fields · blue atmospheric glow ·
           orange horizon line · blue cosmic-horizon arc · gateway orb · text.
           All CSS + GSAP (no WebGL/Three.js). Blends into the Solar System
           below with no visible boundary.
      ─────────────────────────────────────────────────────────────────── */}
      <section className="sg-hero" aria-label="Services gateway" ref={heroRef}>

        {/* the real solar backdrop — fades in as the CSS hero dissolves, so the hero
            opens straight into the solar system with no seam */}
        <div className="sg-backdrop" aria-hidden="true" ref={heroBdRef} />

        {/* star fields */}
        <div className="sg-stars sg-stars-far"  aria-hidden="true" ref={starsFarRef} />
        <div className="sg-stars sg-stars-near" aria-hidden="true" ref={starsNearRef} />

        {/* blue atmospheric glow rising from below */}
        <div className="sg-glow-blue" aria-hidden="true" ref={glowBlueRef} />
        {/* warm orange horizon accent */}
        <div className="sg-horizon-orange" aria-hidden="true" ref={horizonRef} />
        {/* large blue cosmic-horizon arc (expands late) */}
        <div className="sg-curve" aria-hidden="true" ref={curveRef} />

        {/* sparse floating particles */}
        <div className="sg-particles" aria-hidden="true" ref={particlesRef}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="sg-particle" style={{
              left:  `${(i * 61) % 100}%`,
              top:   `${45 + ((i * 37) % 50)}%`,
              animationDelay: `${(i % 8) * 0.4}s`,
              transform: `scale(${0.6 + (i % 4) * 0.2})`,
            }} />
          ))}
        </div>

        {/* text */}
        <div className="sg-text" ref={textRef}>
          <span className="sg-eyebrow">
            <span className="sg-eyebrow-bar" />
            Enter the Skyup Universe
            <span className="sg-eyebrow-bar" />
          </span>
          <h1 className="sg-h1">Digital marketing services in Bangalore</h1>
          <p className="sg-sub">
            Skyup offers web development, SEO, social media, performance marketing,
            AI automation, video editing, UI/UX design, and branding.
            Choose a service to see how it works.
          </p>
        </div>

        {/* gateway orb */}
        <div className="sg-orb-positioner" aria-hidden="true">
          <div className="sg-orb-glow" ref={orbGlowRef} />
          <div className="sg-orb-inner" ref={orbRef}>
            <svg className="sg-rings" viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ref={ringsRef}>
              <ellipse cx="130" cy="55" rx="122" ry="34" fill="none" stroke="rgba(61,107,240,0.55)" strokeWidth="0.7" />
              <ellipse cx="130" cy="55" rx="92"  ry="25" fill="none" stroke="rgba(155,192,255,0.40)" strokeWidth="0.5" strokeDasharray="3 7" />
              <ellipse cx="130" cy="55" rx="60"  ry="16" fill="none" stroke="rgba(250,159,67,0.28)" strokeWidth="0.5" />
            </svg>
            <div className="sg-orb-core" />
          </div>
        </div>

        {/* scroll cue + state captions */}
        <div className="sg-cue" aria-hidden="true">
          <span className="sg-chev">⌄</span>
        </div>
        <div className="sg-captions" aria-hidden="true">
          <span className="sg-cap" ref={addCap}>Every <span className="hl-b">service</span> is a <span className="hl-o">world</span> of its own.</span>
          <span className="sg-cap" ref={addCap}>Ten <span className="hl-o">specialists</span>. One <span className="hl-b">orbit</span> of growth.</span>
          <span className="sg-cap" ref={addCap}>Pick a <span className="hl-o">planet</span> &mdash; let&rsquo;s <span className="hl-b">begin</span>.</span>
        </div>
      </section>

      <section ref={rootRef} className="ss3" aria-label="Our services">

        {/* premium cosmic backdrop (drop-in image; falls back to solid dark until present) */}
        <div className="ss3-backdrop" aria-hidden="true" />

        {/* click hint — tells users the planets are interactive (works on desktop + mobile) */}
        <div className="ss3-hint">
          <span className="ss3-hint-ping" aria-hidden="true" />
          <span>Tap any <span className="ss3-hl-o">planet</span> to explore that <span className="ss3-hl-b">service</span></span>
        </div>

        {/* solar-system group — scales + fades into place on scroll (the "arrival") */}
        <div className="ss3-system" ref={systemRef}>

        {/* orbit rings (visual guides) */}
        <div className="ss3-rings" aria-hidden="true">
        <span className="ss3-ring r1" /><span className="ss3-ring r2" /><span className="ss3-ring r3" /><span className="ss3-ring r4" />
      </div>

      {/* the sun */}
      <img className="ss3-sun" src="/images/skyup-icon.svg" alt="Skyup" />
      <div className="ss3-sun-glow" aria-hidden="true" />

      {/* orbiting planets */}
      {layout.map((L, i) => {
        const s = L.svc;
        return (
          <a
            key={s.slug}
            href={s.href}
            className="ss3-planet"
            ref={(el) => (planetRefs.current[i] = el)}
            onMouseEnter={() => setPaused(i)}
            onMouseLeave={() => setPaused((p) => (p === i ? -1 : p))}
          >
            <img src={`${IMG}/${s.art}.webp`} alt={s.name} />
            <span className="ss3-label">
              <span className="ss3-name">{s.name}</span>
              <span className="ss3-cta">Explore Now</span>
            </span>
          </a>
        );
      })}
        </div>{/* /.ss3-system */}

      {/* mobile fallback list */}
      <ul className="ss3-mobile">
        {ORBIT.map((s) => (
          <li key={s.slug}><a href={s.href}><img src={`${IMG}/${s.art}.webp`} alt="" /><span>{s.name}</span><em>Explore Now</em></a></li>
        ))}
      </ul>

      {/* full-screen light flash for the reveal */}
      <div className="ss3-flash" ref={flashRef} aria-hidden="true" />
      </section>
    </div>
  );
}

const CSS = `
/* ── LAUNCH GATEWAY HERO ─────────────────────────────────────────────── */
.sg-hero{
  position:relative; height:100vh; overflow:hidden;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  background:#04050C; --sg-blue:#0037CA; --sg-blue-l:#3D6BF0; --sg-amber:#FA9F43;
}

/* Star fields — tiny CSS dots, density read as opacity by JS.
   Two layered radial-gradient tiles (far = many small, near = fewer bright). */
.sg-stars{ position:absolute; inset:0; pointer-events:none; z-index:0; will-change:opacity; }
.sg-stars-far{
  background-image:
    radial-gradient(1px 1px at 12% 18%, rgba(223,233,255,.9), transparent 60%),
    radial-gradient(1px 1px at 32% 42%, rgba(223,233,255,.7), transparent 60%),
    radial-gradient(1px 1px at 58% 12%, rgba(223,233,255,.8), transparent 60%),
    radial-gradient(1px 1px at 74% 34%, rgba(223,233,255,.7), transparent 60%),
    radial-gradient(1px 1px at 88% 22%, rgba(223,233,255,.9), transparent 60%),
    radial-gradient(1px 1px at 22% 66%, rgba(223,233,255,.6), transparent 60%),
    radial-gradient(1px 1px at 46% 78%, rgba(223,233,255,.7), transparent 60%),
    radial-gradient(1px 1px at 66% 62%, rgba(223,233,255,.6), transparent 60%),
    radial-gradient(1px 1px at 92% 72%, rgba(223,233,255,.7), transparent 60%),
    radial-gradient(1px 1px at 8% 88%, rgba(223,233,255,.6), transparent 60%);
  opacity:.16;
}
.sg-stars-near{
  background-image:
    radial-gradient(1.6px 1.6px at 18% 30%, #cfe0ff, transparent 55%),
    radial-gradient(1.6px 1.6px at 42% 20%, #cfe0ff, transparent 55%),
    radial-gradient(1.6px 1.6px at 70% 26%, #cfe0ff, transparent 55%),
    radial-gradient(1.6px 1.6px at 84% 48%, #cfe0ff, transparent 55%),
    radial-gradient(1.6px 1.6px at 30% 56%, #cfe0ff, transparent 55%),
    radial-gradient(1.6px 1.6px at 60% 70%, #cfe0ff, transparent 55%);
  opacity:0;
}

/* Blue atmospheric glow rising from bottom-center */
.sg-glow-blue{
  position:absolute; left:50%; bottom:-6%; transform:translateX(-50%);
  width:130%; height:70%; z-index:0; pointer-events:none; opacity:.22;
  transform-origin:bottom center; will-change:opacity,transform;
  background:radial-gradient(ellipse 60% 100% at 50% 100%,
    rgba(46,107,255,.42) 0%, rgba(61,107,240,.20) 34%, rgba(0,55,202,.08) 55%, transparent 72%);
}

/* Warm orange horizon accent — thin bright band low on screen */
.sg-horizon-orange{
  position:absolute; left:0; right:0; bottom:22%; height:2px; z-index:0; opacity:0;
  pointer-events:none; will-change:opacity;
  background:linear-gradient(90deg, transparent, rgba(250,159,67,.85) 35%, rgba(255,190,110,.95) 50%, rgba(250,159,67,.85) 65%, transparent);
  box-shadow:0 0 40px 10px rgba(250,159,67,.35), 0 8px 60px 18px rgba(250,159,67,.20);
}

/* Big blue cosmic-horizon arc (the "planet edge" glow from ref image 4) */
.sg-curve{
  position:absolute; left:50%; bottom:-40%; transform:translateX(-50%);
  width:170%; height:90%; z-index:0; opacity:0; pointer-events:none;
  transform-origin:bottom center; will-change:opacity,transform;
  border-radius:50% 50% 0 0;
  box-shadow:
    inset 0 8px 40px 4px rgba(61,107,240,.55),
    inset 0 2px 14px 1px rgba(180,210,255,.65),
    0 -6px 60px 6px rgba(46,107,255,.30);
  background:radial-gradient(ellipse 100% 60% at 50% 0%, rgba(46,107,255,.16), transparent 60%);
}

/* Sparse particles */
.sg-particles{ position:absolute; inset:0; z-index:1; pointer-events:none; opacity:0; will-change:opacity; }
.sg-particle{
  position:absolute; width:3px; height:3px; border-radius:50%;
  background:rgba(155,192,255,.9); box-shadow:0 0 6px 1px rgba(61,107,240,.7);
  animation:sg-float 6s ease-in-out infinite;
}
@keyframes sg-float{
  0%,100%{ transform:translateY(0); opacity:.35; }
  50%{ transform:translateY(-18px); opacity:1; }
}

/* Text */
.sg-text{
  position:relative; z-index:3; text-align:center;
  max-width:min(760px,90vw); padding:0 1.5rem; will-change:opacity,transform;
}
.sg-eyebrow{
  display:inline-flex; align-items:center; gap:.75rem;
  color:var(--sg-amber); font-weight:700; letter-spacing:.26em;
  text-transform:uppercase; font-size:clamp(.68rem,1.2vw,.85rem); margin-bottom:1.3rem;
}
.sg-eyebrow-bar{ flex:none; width:28px; height:1px; background:var(--sg-amber); opacity:.65; display:inline-block; }
.sg-h1{
  margin:0 0 1.2rem; color:#fff; font-weight:800; letter-spacing:-.028em;
  line-height:1.07; font-size:clamp(2rem,5.5vw,4rem);
}
.sg-sub{
  margin:0 auto; max-width:60ch; color:rgba(255,255,255,.66);
  font-size:clamp(.9rem,1.4vw,1.08rem); line-height:1.68;
}

/* Gateway orb */
.sg-orb-positioner{
  position:absolute; bottom:15%; left:50%; transform:translateX(-50%);
  z-index:2; pointer-events:none;
}
.sg-orb-glow{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) scale(1);
  width:200px; height:200px; border-radius:50%; opacity:.35; will-change:opacity,transform;
  background:radial-gradient(circle, rgba(61,107,240,.5) 0%, rgba(46,107,255,.22) 35%, transparent 68%);
}
.sg-orb-inner{
  position:relative; display:flex; align-items:center; justify-content:center;
  width:28px; height:28px; transform-origin:center center; will-change:transform;
}
.sg-rings{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:220px; height:94px; opacity:0; will-change:opacity;
  animation:sg-ring-rotate 22s linear infinite;
}
@keyframes sg-ring-rotate{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
.sg-orb-core{
  position:relative; z-index:1; width:22px; height:22px; border-radius:50%;
  background:radial-gradient(circle, #fff 0%, rgba(200,222,255,.96) 30%, rgba(61,107,240,.8) 65%, transparent 100%);
  box-shadow:0 0 6px 3px rgba(155,192,255,.9), 0 0 18px 7px rgba(61,107,240,.65), 0 0 44px 16px rgba(46,107,255,.32);
  animation:sg-orb-pulse 2.8s ease-in-out infinite;
}
@keyframes sg-orb-pulse{
  0%,100%{ box-shadow:0 0 6px 3px rgba(155,192,255,.9), 0 0 18px 7px rgba(61,107,240,.65), 0 0 44px 16px rgba(46,107,255,.32); }
  50%{ box-shadow:0 0 8px 4px rgba(210,232,255,1), 0 0 24px 9px rgba(61,107,240,.85), 0 0 60px 22px rgba(46,107,255,.44); }
}

/* Scroll cue + captions */
.sg-cue{ position:absolute; bottom:8%; left:50%; transform:translateX(-50%); z-index:3; }
.sg-chev{
  display:grid; place-items:center; width:38px; height:38px; border-radius:50%;
  border:1px solid rgba(155,192,255,.4); color:rgba(200,222,255,.85);
  font-size:1.1rem; line-height:1; animation:sg-bounce 1.9s ease-in-out infinite;
}
@keyframes sg-bounce{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(5px); } }
.sg-captions{ position:absolute; top:50%; left:0; right:0; text-align:center; z-index:3; pointer-events:none; }
.sg-cap{
  position:absolute; left:50%; top:0; transform:translate(-50%,-50%); width:min(92%,940px); opacity:0;
  color:#eaf1ff; font-size:clamp(1.5rem,3.8vw,2.9rem); font-weight:700; line-height:1.2;
  letter-spacing:-0.01em; text-shadow:0 2px 40px rgba(2,6,20,.92), 0 0 16px rgba(0,0,0,.6); will-change:opacity;
}
.sg-cap .hl-o{ color:#FA9F43; }
.sg-cap .hl-b{ color:#7FB0FF; }

/* Hero dissolves into the real solar backdrop (revealed via JS on scroll) — no black seam */
.sg-hero::after{ content:""; position:absolute; inset:0; background:none; pointer-events:none; }
.sg-backdrop{
  position:absolute; inset:0; z-index:0; opacity:0; pointer-events:none;
  background-image:
    linear-gradient(to bottom,
      rgba(4,5,12,.82) 0%,
      rgba(4,5,12,.45) 16%,
      rgba(4,5,12,.10) 34%,
      rgba(4,5,12,.10) 62%,
      rgba(4,5,12,.72) 100%),
    url("/images/solar/backdrop.webp");
  background-size: cover, cover;
  background-position: center top, center bottom;
  background-repeat: no-repeat, no-repeat;
}

/* Reduced motion — a complete static composition (no animation, no pin) */
@media (prefers-reduced-motion:reduce){
  .sg-hero{ height:100vh; }
  .sg-orb-core, .sg-rings, .sg-chev, .sg-particle{ animation:none; }
}

/* Mobile */
@media (max-width:768px){
  .sg-hero{ height:100svh; }
  .sg-h1{ font-size:clamp(1.75rem,7vw,2.8rem); }
  .sg-rings{ width:170px; height:72px; }
  .sg-particle:nth-child(n+9){ display:none; } /* fewer particles */
}
/* ── END LAUNCH GATEWAY ─────────────────────────────────────────────── */

.ss3-wrap{ position:relative; background:#04050C; }
.ss3{ position:relative; height:100vh; min-height:640px; background:#04050C; overflow:hidden; --amber:#FA9F43; --blue:#5b8cff; }
.ss3-hint{ position:absolute; top:6%; left:50%; transform:translateX(-50%); z-index:6;
  display:inline-flex; align-items:center; gap:.6rem; white-space:nowrap;
  padding:9px 18px; border-radius:999px; font-size:clamp(.72rem,1.4vw,.9rem); font-weight:500; color:#dfe8ff;
  background:rgba(8,12,26,.62); border:1px solid rgba(91,140,255,.28); backdrop-filter:blur(10px);
  box-shadow:0 10px 34px -14px rgba(0,0,0,.7), 0 0 34px -18px rgba(91,140,255,.6);
  animation:ss3HintFloat 3.4s ease-in-out infinite; }
.ss3-hl-o{ color:#FA9F43; font-weight:700; }
.ss3-hl-b{ color:#7FB0FF; font-weight:700; }
.ss3-hint-ping{ position:relative; width:9px; height:9px; border-radius:50%; background:#FA9F43; flex:none; box-shadow:0 0 10px #FA9F43; }
.ss3-hint-ping::after{ content:""; position:absolute; inset:-4px; border-radius:50%; border:1px solid #FA9F43; opacity:0; animation:ss3Ping 2s ease-out infinite; }
@keyframes ss3Ping{ 0%{ transform:scale(.6); opacity:.9; } 70%{ opacity:0; } 100%{ transform:scale(2.4); opacity:0; } }
@keyframes ss3HintFloat{ 0%,100%{ transform:translateX(-50%) translateY(0); } 50%{ transform:translateX(-50%) translateY(-6px); } }
@media (prefers-reduced-motion:reduce){ .ss3-hint{ animation:none; } .ss3-hint-ping::after{ animation:none; } }
.ss3-system{ position:absolute; inset:0; z-index:2; transform-origin:50% 50%; will-change:transform,opacity; }
.ss3-flash{
  position:fixed; inset:0; z-index:9998; opacity:0; pointer-events:none;
  background: radial-gradient(circle at 50% 55%, rgba(255,255,255,.95), rgba(200,220,255,.65) 42%, rgba(140,175,255,0) 72%);
}
.ss3-flash.go{ animation: ss3-flash-kf 1s cubic-bezier(.22,.61,.36,1) forwards; }
@keyframes ss3-flash-kf{ 0%{ opacity:0; } 14%{ opacity:.9; } 100%{ opacity:0; } }
/* Premium cosmic backdrop image sits BEHIND rings/sun/planets/head (z-index:0).
   The gradient scrim darkens the top (so the heading stays readable) and the
   bottom edge (so it blends seamlessly into the next dark section). Until the
   image exists at the path below, only the #04050C fallback shows — no broken
   image icon. Provide a text-free, planet-free render (see notes). */
.ss3-backdrop{
  position:absolute; inset:0; z-index:0; pointer-events:none; transform-origin:50% 50%; will-change:transform;
  background-image:
    linear-gradient(to bottom,
      rgba(4,5,12,.82) 0%,
      rgba(4,5,12,.45) 16%,
      rgba(4,5,12,.10) 34%,
      rgba(4,5,12,.10) 62%,
      rgba(4,5,12,.72) 100%),
    url("/images/solar/backdrop.webp");
  background-size: cover, cover;
  background-position: center top, center bottom;
  background-repeat: no-repeat, no-repeat;
}
.ss3-head{ position:absolute; top:9vh; left:0; right:0; text-align:center; z-index:2; }
.ss3-eyebrow{ color:var(--amber); font-size:clamp(.9rem,1.6vw,1.15rem); font-weight:700; letter-spacing:.34em; text-transform:uppercase; }
.ss3-title{ color:#fff; font-size:clamp(1.6rem,3.4vw,2.6rem); font-weight:700; letter-spacing:-.02em; margin-top:.5rem; }

/* orbit ring guides (tilted ellipses) */
.ss3-rings{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:1; pointer-events:none; }
.ss3-ring{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); border:1px solid rgba(150,190,255,.32); border-radius:50%; box-shadow:0 0 10px rgba(4,8,20,.5); }
.ss3-ring.r1{ width:37vw; height:27vw; }
.ss3-ring.r2{ width:55vw; height:36vw; }
.ss3-ring.r3{ width:73vw; height:44vw; }
.ss3-ring.r4{ width:91vw; height:53vw; }

/* sun */
.ss3-sun{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:min(190px,15vw); height:auto; z-index:20;
  object-fit:contain; filter:drop-shadow(0 0 16px rgba(120,160,255,.45));
  animation:ss3-logo-pulse 4.5s ease-in-out infinite; }
.ss3-sun-glow{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:min(360px,30vw); height:min(360px,30vw);
  border-radius:50%; background:radial-gradient(circle, rgba(180,205,255,.28), rgba(120,150,255,.08) 45%, transparent 66%); z-index:15;
  animation:ss3-breathe 5s ease-in-out infinite; }
@keyframes ss3-spin{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
@keyframes ss3-breathe{ 0%,100%{ opacity:.8; } 50%{ opacity:1; } }
@keyframes ss3-logo-pulse{ 0%,100%{ transform:translate(-50%,-50%) scale(1); } 50%{ transform:translate(-50%,-50%) scale(1.05); } }

/* planets */
.ss3-planet{ position:absolute; left:0; top:0; width:min(112px,10vw); text-decoration:none; will-change:transform; cursor:pointer; }
.ss3-planet img{ width:100%; height:auto; display:block; filter:drop-shadow(0 6px 24px rgba(0,0,0,.5)); transition:filter .3s; }
.ss3-label{ position:absolute; left:50%; top:90%; transform:translateX(-50%); text-align:center; white-space:nowrap;
  pointer-events:none; }
.ss3-name{ display:block; color:#fff; font-size:.82rem; font-weight:600; letter-spacing:.01em;
  text-shadow:0 2px 12px rgba(0,0,0,.95), 0 0 6px rgba(0,0,0,.85); }
.ss3-cta{ display:inline-block; margin-top:.4rem; font-size:.72rem; font-weight:600; color:#fff; background:var(--blue);
  padding:.34rem .8rem; border-radius:999px; box-shadow:0 8px 22px rgba(91,140,255,.4);
  opacity:0; transform:translateY(-4px); transition:opacity .25s, transform .25s; pointer-events:none; }
.ss3-planet:hover .ss3-cta{ opacity:1; transform:translateY(0); pointer-events:auto; }

.ss3-mobile{ display:none; }

/* ---------- mobile: single-ring solar system (same concept as desktop) ---------- */
@media (max-width:760px){
  .ss3{ height:100vh; min-height:600px; }
  .ss3-rings,.ss3-mobile{ display:none; }         /* guide lines + old grid off; planets orbit the sun */
  .ss3-planet .ss3-name{ font-size:.72rem; }
  .ss3-planet .ss3-label{ white-space:normal; width:86px; }
}
`;
