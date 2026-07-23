// src/components/about/AboutUniverse.jsx
//
// SKYUP About — one continuous "Skyup Universe" experience.
// Persistent starfield + blue energy-comet thread the whole page. Sections:
// astronaut hero -> About/Who We Are -> Mission -> Core Values -> How We Work ->
// Meet the Team (auto-rotating 3D CYLINDER coverflow, 9 members) -> Why Choose
// Skyup -> CTA. All copy = real DOM text (SEO). SSR-safe, reduced-motion, Lenis.
// Brand: blue #5b8cff/#9cc0ff + amber #FA9F43. Assets: /images/about/astronaut.webp
// and team photos /images/about/team/1.jpg … 9.jpg (1:1; fallback = glow tile).

import React, { useEffect, useRef } from "react";

// Photos are the real files on disk: public/images/team/<file>.webp
// `file` = exact filename. Order = display order → Roshan is 3rd.
const TEAM = [
  { name: "Bhojraj Rattigerimath",  role: "Social Media Manager", n: 1, file: "bhojraj" },
  { name: "Harish Krishna Moger",   role: "UI/UX Designer",     n: 2, file: "harish" },
  { name: "Roshan Prabhu",   role: "AI/ML Developer",         n: 3, file: "roshan" },   // ← 3rd
  { name: "Lohith Ishwar Moger",   role: "Multimedia Designer",  n: 4, file: "lohith" },
  { name: "Ismail Zabiulla",   role: "Sales Manager",        n: 5, file: "ismail" },
  { name: "Jahnavi AK",  role: "Perfomance Marketer",        n: 6, file: "jahnavi" },
  { name: "Pooja Kadwadi",    role: "Frontend Developer",   n: 7, file: "pooja" },
  { name: "Shashikant",   role: "Full Stack Developer", n: 8, file: "shashi" },
  { name: "Srinivas", role: "Backend Developer",    n: 9, file: "srinivas" },
  { name: "Teja GS",     role: "Tele Sales Executive", n: 10, file: "teja" },
];
const VALUES = [
  { h: "Strategy Before Execution", p: "We understand your business, audience and goals before any activity starts." },
  { h: "Creativity That Solves Problems", p: "Design that communicates clearly, builds trust and improves conversions." },
  { h: "Decisions Backed by Data", p: "SEO, paid campaigns and analytics — every recommendation is measurable." },
  { h: "Long-Term Partnerships", p: "Growth from lasting relationships built on transparency and collaboration." },
];
const STEPS = [
  { h: "Discover", p: "Your business, market and goals." },
  { h: "Strategy", p: "A customised digital growth plan." },
  { h: "Build", p: "Impactful digital experiences." },
  { h: "Optimise", p: "Launch, measure and improve continuously." },
];
const WHY = [
  "Digital marketing strategies built around business goals",
  "SEO and performance marketing focused on measurable growth",
  "Modern websites designed for speed, conversions and UX",
  "AI-powered solutions that improve efficiency and engagement",
  "Transparent communication throughout every project",
  "Continuous optimisation for long-term success",
];

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const smooth = (t) => t * t * (3 - 2 * t);
const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);

export default function AboutUniverse() {
  const rootRef = useRef(null);
  const skyRef = useRef(null);
  const heroRef = useRef(null);
  const fxRef = useRef(null);
  const astroRef = useRef(null);
  const starRef = useRef(null);
  const flareRef = useRef(null);
  const whiteRef = useRef(null);
  const introRef = useRef(null);
  const revealRef = useRef(null);
  // team cylinder
  const sceneRef = useRef(null);
  const cylRef = useRef(null);
  const nmRef = useRef(null);
  const rlRef = useRef(null);
  const infoRef = useRef(null);
  const dotsRef = useRef(null);

  // ---- HERO engine (sky + comet + astronaut) ----
  useEffect(() => {
    const root = rootRef.current, hero = heroRef.current, sky = skyRef.current, fxC = fxRef.current;
    if (!root || !hero || !sky || !fxC) return;

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.3 }
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const astro = astroRef.current, starEl = starRef.current, flare = flareRef.current;
    const white = whiteRef.current, intro = introRef.current, reveal = revealRef.current;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { if (reveal) reveal.style.opacity = "1"; return () => io.disconnect(); }

    const skyx = sky.getContext("2d"), fx = fxC.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let VW = 0, VH = 0, stars = [], particles = [], nodes = [], geo = [];
    const sp = () => ({ x: VW * 0.66, y: VH * 0.46 });
    const build = () => {
      stars = []; const n = Math.round((VW * VH) / 4200);
      for (let i = 0; i < n; i++) { const z = Math.random(); stars.push({ x: Math.random() * VW, y: Math.random() * VH, z, r: 0.3 + z * 1.5, tw: Math.random() * 6.28, ts: 0.5 + Math.random() * 1.5, b: 0.2 + z * 0.8 }); }
      const cx = VW * 0.66, cy = VH * 0.46, R = Math.min(VW, VH) * 0.26;
      const seeds = [[0.66, 0.46], [0.5, 0.34], [0.56, 0.6], [0.74, 0.6], [0.8, 0.4], [0.46, 0.52], [0.62, 0.26]];
      nodes = seeds.map((s) => ({ x: VW * s[0], y: VH * s[1] }));
      geo = []; for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k / 7) * 6.28; geo.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }); }
      particles = []; for (let i = 0; i < 360; i++) { const rad = Math.min(VW, VH) * (0.2 + Math.random() * 0.5); particles.push({ a: Math.random() * 6.28, rad, base: rad, spd: 0.15 + Math.random() * 0.5, size: 0.6 + Math.random() * 1.8 }); }
    };
    const resize = () => {
      VW = window.innerWidth; VH = window.innerHeight;
      [sky, fxC].forEach((c) => { c.width = VW * DPR; c.height = VH * DPR; });
      skyx.setTransform(DPR, 0, 0, DPR, 0, 0); fx.setTransform(DPR, 0, 0, DPR, 0, 0); build();
    };
    // Force the page to the true top on mount so the hero always starts at progress 0.
    // Without this, arriving on /about from a scrolled page (client-side nav doesn't
    // reset scroll) or browser scroll-restoration on refresh leaves window.scrollY
    // large, the hero reads "scrolled to the end", and the .au-white overlay snaps to
    // full white at the top of the page. This is the real cause of the white screen.
    // Disable browser scroll restoration so it never fights our manual reset.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // Reset immediately — catches client-side navigation arriving mid-scroll.
    window.scrollTo(0, 0);
    if (white) white.style.opacity = "0"; // never start white

    let sY = 0, heroTop = 0, heroRange = 1, docH = 1, userScrolled = false;
    const measure = () => { const hr = hero.getBoundingClientRect(); heroTop = hr.top + window.scrollY; heroRange = Math.max(1, hr.height - window.innerHeight); docH = document.documentElement.scrollHeight - window.innerHeight; };
    const readScroll = () => { sY = window.scrollY; };
    const onScroll = () => { sY = window.scrollY; userScrolled = true; };
    const onResize = () => { resize(); measure(); readScroll(); };
    resize(); measure(); readScroll();

    // On hard refresh the browser may restore scroll position AFTER the first
    // useEffect runs. We catch it by scrolling back to 0 in rAF (one paint later)
    // AND on the load event (fully after all async restoration). Both re-measure
    // so heroTop/heroRange are always based on scroll=0.
    const resetToTop = () => {
      window.scrollTo(0, 0);
      if (white) white.style.opacity = "0";
      measure(); readScroll();
    };
    const remeasure = () => { measure(); readScroll(); };
    const rafMeasure = requestAnimationFrame(resetToTop);   // catches late browser restore
    const tMeasure = setTimeout(remeasure, 350);            // catches font/image shifts
    window.addEventListener("load", resetToTop);            // catches very late restoration
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    let raf = 0, t0 = performance.now(), pH = 0, firstFrame = true;
    // Auto-play timeline. The hero no longer requires the user to scroll through the
    // whole sequence: the first small scroll nudge "arms" it, then the astronaut flies
    // in and the content reveals hands-free (like a video) over AUTO_MS. The user then
    // scrolls once more to leave the (short) pinned hero into the rest of the page.
    let armed = false, animStart = 0, armStartP = 0, autoDone = false;
    const AUTO_MS = 2200;
    // Grab the global Lenis instance lazily (it's created by the Layout, whose effect
    // runs after this child's). Driving Lenis directly — instead of raw window.scrollTo —
    // is what stops the "stuck then sudden jump": native scrollTo fights Lenis, and on
    // release Lenis snaps to its own stale target. Here we own Lenis for the sequence.
    const getLenis = () => (typeof window !== "undefined" ? window.__lenis : null);
    const arm = () => {
      if (!armed) {
        armed = true; animStart = performance.now(); armStartP = pH;
        const l = getLenis();
        if (l) l.stop(); // pause Lenis input; we move it explicitly with force:true below
      }
    };
    // Arm the auto-play on the SECOND scroll gesture (not the first). Rapid-fire wheel/
    // scroll events within 350ms are treated as one gesture, so REQUIRED_GESTURES = 2
    // means "the user scrolled twice" in the intuitive sense. After that the astronaut
    // flies in and the content reveals hands-free over AUTO_MS.
    const REQUIRED_GESTURES = 2;
    let gestureCount = 0, lastGestureT = 0, scrollLocked = false;
    const arm2 = arm; // (arm defined above)
    const onGesture = () => {
      if (scrollLocked || autoDone) return; // ignore input while autoplay owns scroll / after it's done
      userScrolled = true;
      const now = performance.now();
      if (now - lastGestureT > 350) {
        gestureCount += 1;
        if (gestureCount >= REQUIRED_GESTURES) {
          // Only auto-play (which pins + scroll-locks the hero) while the user is still
          // near the top of the hero. If they've already scrolled past it, arming would
          // force-scroll the page back UP to the hero — that's the "sudden jump to hero"
          // bug. In that case, just mark the reveal complete and let them keep scrolling.
          const hr = hero.getBoundingClientRect();
          const range = Math.max(1, hr.height - window.innerHeight);
          const sp2 = clamp(-hr.top / range, 0, 1);
          if (sp2 < 0.5) { scrollLocked = true; arm2(); }
          else { autoDone = true; pH = 1; }
        }
      }
      lastGestureT = now;
    };
    // While autoplay runs, block user scroll input so it can't fight the auto-advance
    // (this is what caused the pause/stutter, especially with smooth-scroll libraries).
    const SCROLL_KEYS = [" ", "Spacebar", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"];
    const blockScroll = (e) => { if (scrollLocked) e.preventDefault(); };
    const blockKeys = (e) => { if (scrollLocked && SCROLL_KEYS.includes(e.key)) e.preventDefault(); };
    window.addEventListener("wheel", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys, { passive: false });
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const time = (performance.now() - t0) / 1000;
      // Progress model:
      //  • BEFORE arming — pH follows the hero's scroll position, so the astronaut
      //    visibly moves as the user scrolls (their first couple of scrolls).
      //  • AFTER 2 scroll gestures (armed) — pH auto-completes from wherever it was to 1
      //    over AUTO_MS, and we auto-scroll the window in step so the sticky hero stays
      //    pinned (it never "jumps down" to the next section) and releases cleanly at the end.
      // Use CACHED geometry (measured on mount/resize/load) + the scroll value tracked by
      // the passive scroll listener. Identical math to reading the live rect every frame,
      // but WITHOUT forcing a synchronous layout (getBoundingClientRect) 60×/sec.
      const liveRange = heroRange;
      const scrollP = clamp((sY - heroTop) / liveRange, 0, 1);
      if (armed && !autoDone) {
        const tl = smooth(clamp((performance.now() - animStart) / AUTO_MS, 0, 1));
        pH = armStartP + (1 - armStartP) * tl;
        // Keep the page scrolling in lock-step so the pinned stage stays on screen.
        // Drive Lenis (force:true works even while stopped) so its internal target stays
        // in sync — that's what prevents the snap when we hand scroll back.
        const targetY = heroTop + liveRange * pH;
        const l = getLenis();
        if (l) {
          l.scrollTo(targetY, { immediate: true, force: true });
        } else if (Math.abs(window.scrollY - targetY) > 2) {
          window.scrollTo(0, targetY);
        }
        if (tl >= 1) {
          autoDone = true; scrollLocked = false; pH = 1; // hand scroll back
          const endY = heroTop + liveRange; // final pinned position (pH = 1)
          const l2 = getLenis();
          if (l2) { l2.scrollTo(endY, { immediate: true, force: true }); l2.start(); }
        }
      } else if (autoDone) {
        pH = 1; // hold the final revealed state; user scrolls freely into the content below
      } else {
        // ease toward the scroll-driven target for a smooth, slightly "assisted" feel
        pH += (scrollP - pH) * 0.12;
      }
      const pulse = seg(pH, 0.10, 0.25), conDraw = seg(pH, 0.25, 0.40), morph = smooth(seg(pH, 0.40, 0.55));
      const flow = seg(pH, 0.55, 0.85), zoom = smooth(seg(pH, 0.70, 1.0)), expand = smooth(seg(pH, 0.85, 1.0));
      const star = sp();

      skyx.clearRect(0, 0, VW, VH);
      const gP = docH > 0 ? clamp(sY / docH, 0, 1) : 0, par = gP * 120;
      for (let i = 0; i < stars.length; i++) { const s = stars[i]; const tw = 0.6 + 0.4 * Math.sin(time * s.ts + s.tw); const y = ((s.y - par * s.z) % VH + VH) % VH; skyx.globalAlpha = s.b * tw; skyx.beginPath(); skyx.arc(s.x + Math.sin(time * 0.1 + s.tw), y, s.r, 0, 6.28); skyx.fillStyle = "#dfe9ff"; skyx.fill(); }
      skyx.globalAlpha = 1;
      const cometP = seg(gP, 0.16, 0.98);
      if (cometP > 0 && cometP < 1) {
        const cx = VW * (0.82 - Math.sin(cometP * Math.PI * 2) * 0.12), cy = VH * (0.1 + cometP * 0.8), ang = Math.PI / 2 + Math.cos(cometP * Math.PI * 2) * 0.3, tail = 120;
        const g = skyx.createLinearGradient(cx, cy, cx - Math.cos(ang) * tail, cy - Math.sin(ang) * tail);
        g.addColorStop(0, "rgba(156,192,255,.9)"); g.addColorStop(1, "rgba(91,140,255,0)");
        skyx.strokeStyle = g; skyx.lineWidth = 3; skyx.lineCap = "round";
        skyx.beginPath(); skyx.moveTo(cx, cy); skyx.lineTo(cx - Math.cos(ang) * tail, cy - Math.sin(ang) * tail); skyx.stroke();
        skyx.beginPath(); skyx.arc(cx, cy, 4, 0, 6.28); skyx.fillStyle = "#eaf2ff"; skyx.shadowColor = "#9cc0ff"; skyx.shadowBlur = 22; skyx.fill(); skyx.shadowBlur = 0;
      }

      fx.clearRect(0, 0, VW, VH);
      if (pH < 0.999 && sY < heroTop + heroRange + VH) {
        const baseScale = 1 + pulse * 0.6 + Math.sin(time * 1.6) * 0.06 * pulse, grow = 1 + zoom * 6 + expand * 60;
        if (starEl) { starEl.style.transform = `translate(-50%,-50%) scale(${(baseScale * grow).toFixed(3)})`; starEl.style.opacity = (0.4 + pulse * 0.6).toFixed(2); }
        if (flare) { flare.style.opacity = (pulse * 0.5).toFixed(2); flare.style.transform = `translate(-50%,-50%) rotate(${(time * 4).toFixed(1)}deg) scale(${(1 + pulse).toFixed(2)})`; }
        const travel = smooth(seg(pH, 0.5, 0.92)), fy = Math.sin(time * 0.6) * 10 * (1 - travel * 0.7), fxo = Math.cos(time * 0.4) * 6, breathe = 1 + Math.sin(time * 0.8) * 0.006;
        const ax = 34 + (66 - 34) * travel, ay = 50 + (46 - 50) * travel, recede = (1 - travel * 0.82) * breathe;
        if (astro) { astro.style.left = ax.toFixed(2) + "%"; astro.style.top = ay.toFixed(2) + "%"; astro.style.transform = `translate(-50%,-50%) translate(${fxo.toFixed(1)}px,${fy.toFixed(1)}px) scale(${recede.toFixed(3)})`; astro.style.opacity = ((1 - expand * 0.95) * (1 - travel * 0.15)).toFixed(2); }
        if (conDraw > 0 && expand < 0.98) {
          const pts = nodes.map((nd, idx) => { const gg = geo[idx % geo.length]; return { x: nd.x + (gg.x - nd.x) * morph, y: nd.y + (gg.y - nd.y) * morph }; });
          fx.lineWidth = 1; fx.strokeStyle = `rgba(150,190,255,${0.5 * conDraw * (1 - expand)})`; fx.beginPath();
          const count = Math.floor(pts.length * conDraw + 1);
          for (let j = 0; j < pts.length; j++) { const n2 = pts[(j + 1) % pts.length]; if (j < count) { fx.moveTo(pts[j].x, pts[j].y); fx.lineTo(n2.x, n2.y); } }
          if (morph > 0) for (let j2 = 0; j2 < pts.length; j2++) { fx.moveTo(pts[j2].x, pts[j2].y); fx.lineTo(star.x, star.y); }
          fx.stroke();
          for (let k = 0; k < pts.length; k++) if (k < count) { fx.beginPath(); fx.arc(pts[k].x, pts[k].y, 2, 0, 6.28); fx.fillStyle = `rgba(200,220,255,${0.9 * conDraw * (1 - expand)})`; fx.fill(); }
        }
        if (flow > 0) {
          for (let i3 = 0; i3 < particles.length; i3++) { const pt = particles[i3]; pt.rad -= pt.spd * (0.4 + flow * 2.2) * 2.2; if (pt.rad < 6) pt.rad = pt.base; const a = pt.a + time * 0.05, x3 = star.x + Math.cos(a) * pt.rad, y3 = star.y + Math.sin(a) * pt.rad * 0.78, near = 1 - clamp(pt.rad / pt.base, 0, 1); fx.globalAlpha = flow * (0.25 + near * 0.6) * (1 - expand); fx.beginPath(); fx.arc(x3, y3, pt.size * (0.6 + near * 1.4), 0, 6.28); fx.fillStyle = near > 0.6 ? "#fff" : "#9cc0ff"; fx.fill(); }
          fx.globalAlpha = 1;
        }
        if (white) white.style.opacity = (userScrolled ? expand : 0).toFixed(3);
        if (reveal) { const ab = seg(pH, 0.9, 1.0); reveal.style.opacity = ab.toFixed(3); reveal.style.transform = `translateY(${((1 - ab) * 20).toFixed(1)}px)`; }
        if (intro) intro.style.opacity = (1 - seg(pH, 0.05, 0.16)).toFixed(3);
      } else {
        // Sequence finished OR was skipped/interrupted (fast scroll, nav): force a
        // clean, visible end state so the white flash can never stay stuck over the
        // page. This is the fix for the blank/white screen on interrupt.
        if (white) white.style.opacity = "0";
        if (reveal) { reveal.style.opacity = "1"; reveal.style.transform = "translateY(0)"; }
        if (intro) intro.style.opacity = "0";
        if (astro) astro.style.opacity = "0";
        if (starEl) starEl.style.opacity = "0";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => { const l = getLenis(); if (l) l.start(); io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(rafMeasure); clearTimeout(tMeasure); window.removeEventListener("load", resetToTop); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); window.removeEventListener("wheel", onGesture); window.removeEventListener("touchstart", onGesture); window.removeEventListener("keydown", onGesture); window.removeEventListener("wheel", blockScroll); window.removeEventListener("touchmove", blockScroll); window.removeEventListener("keydown", blockKeys); };
  }, []);

  // ---- TEAM cylinder (auto-rotate, timer-driven, independent of scroll) ----
  useEffect(() => {
    const cyl = cylRef.current, scene = sceneRef.current;
    if (!cyl || !scene) return;
    const cards = [...cyl.querySelectorAll(".au-cycard")];
    const nm = nmRef.current, rl = rlRef.current, info = infoRef.current, dotsWrap = dotsRef.current;
    const N = cards.length;
    const STEP = 40, RADIUS = 430, INTERVAL = 3000;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = 0, timer = null, paused = false, infoT = 0;

    const radius = () => RADIUS * ((cyl.offsetWidth || 300) / 300);
    const render = () => {
      const rad = radius();
      cyl.style.transform = `translateZ(-${rad}px) rotateY(${-active * STEP}deg)`;
      for (let i = 0; i < N; i++) {
        let off = i - active; if (off > N / 2) off -= N; if (off < -N / 2) off += N;
        const abs = Math.abs(off), c = cards[i];
        c.style.transform = `rotateY(${i * STEP}deg) translateZ(${rad}px)`;
        c.style.opacity = abs > 2 ? "0" : off === 0 ? "1" : abs === 1 ? "0.92" : "0.4";
        c.style.zIndex = String(100 - abs);
        c.classList.toggle("is-active", off === 0);
      }
      if (info) { info.classList.remove("show"); clearTimeout(infoT); infoT = setTimeout(() => { if (nm) nm.textContent = TEAM[active].name; if (rl) rl.textContent = TEAM[active].role; info.classList.add("show"); }, 260); }
      if (dotsWrap) { const ds = dotsWrap.children; for (let d = 0; d < ds.length; d++) ds[d].classList.toggle("on", d === active); }
    };
    const pushCam = () => { if (reduce) return; scene.classList.remove("push"); void scene.offsetWidth; scene.classList.add("push"); };
    const next = () => { active = (active + 1) % N; render(); pushCam(); };
    const start = () => { if (reduce || paused || timer) return; timer = setInterval(next, INTERVAL); };
    const stop = () => { clearInterval(timer); timer = null; };

    // dots — clickable navigation. Each dot jumps the cylinder to that member; we also
    // restart the auto-rotate timer so it doesn't immediately advance off the click, and
    // fire the camera push for feedback. Keyboard-accessible too.
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      for (let k = 0; k < N; k++) {
        const s = document.createElement("button");
        s.type = "button";
        s.className = "au-cydot";
        s.setAttribute("aria-label", `Show ${TEAM[k].name}`);
        const goTo = () => { if (active === k) return; active = k; render(); pushCam(); stop(); start(); };
        s.addEventListener("click", goTo);
        dotsWrap.appendChild(s);
      }
    }
    render(); start();
    const onEnter = () => { paused = true; stop(); };
    const onLeave = () => { paused = false; start(); };
    const onVis = () => { if (document.hidden) stop(); else start(); };
    const onResize = () => render();
    cyl.addEventListener("mouseenter", onEnter); cyl.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis); window.addEventListener("resize", onResize, { passive: true });
    return () => { stop(); clearTimeout(infoT); cyl.removeEventListener("mouseenter", onEnter); cyl.removeEventListener("mouseleave", onLeave); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("resize", onResize); if (dotsWrap) dotsWrap.innerHTML = ""; };
  }, []);

  const hideImg = (e) => { e.currentTarget.style.display = "none"; };

  return (
    <div ref={rootRef} className="au">
      <style>{CSS}</style>
      <canvas ref={skyRef} className="au-sky" aria-hidden="true" />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="au-hero">
        <div className="au-stage">
          <img ref={astroRef} className="au-astro" src="/images/about/astronaut.avif" alt="Astronaut exploring the Skyup universe" />
          <div ref={flareRef} className="au-flare" aria-hidden="true" />
          <div ref={starRef} className="au-star" aria-hidden="true" />
          <canvas ref={fxRef} className="au-fx" aria-hidden="true" />
          <div ref={whiteRef} className="au-white" aria-hidden="true" />
          <div ref={introRef} className="au-intro" aria-hidden="true">
            <div className="au-intro-line">Come, let me take you to explore<br /><span className="au-em">the Skyup Universe</span></div>
            <div className="au-intro-cue">Scroll down to explore <span className="au-arrow">↓</span></div>
          </div>
          <div ref={revealRef} className="au-reveal">
            <span className="au-eyebrow">About Skyup Digital Solutions</span>
            <h1 className="au-h1">We help businesses reach their <span className="au-grad">North Star</span>.</h1>
            <p className="au-sub">Strategic digital marketing, creative branding, high-performance websites, SEO, paid advertising and AI-powered solutions — built to deliver measurable growth.</p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="au-content">
        <section className="au-block">
          <div className="au-wrap au-who" data-reveal>
            <div className="au-who-copy">
              <span className="au-kicker">Who we are</span>
              <h2 className="au-h2">A digital marketing agency built for growth</h2>
              <p className="au-p">Skyup Digital Solutions helps startups, SMEs and established businesses build a stronger online presence — combining creativity, technology and data-driven marketing to create digital experiences that look impressive and generate real results.</p>
              <p className="au-p">We work across digital marketing, <a className="au-ilink" href="/service/web-development">web development</a>, <a className="au-ilink" href="/service/seo">SEO</a>, <a className="au-ilink" href="/service/social-media-marketing">social media marketing</a>, <a className="au-ilink" href="/service/graphic-design">branding</a>, <a className="au-ilink" href="/service/performance-marketing">performance marketing</a> and <a className="au-ilink" href="/service/ai-automation">AI-powered automation</a> to keep businesses ahead in a competitive digital world.</p>
            </div>
            <figure className="au-who-photo">
              <div className="au-who-frame">
                <span className="au-who-glow" aria-hidden="true" />
                <img src="/images/about/md.webp" alt="Pooja Srinivas, Managing Director of Skyup Digital Solutions" loading="lazy" />
              </div>
              <figcaption className="au-who-cap">
                <span className="au-who-name">Pooja Srinivas</span>
                <span className="au-who-role">Managing Director, Skyup Digital Solutions</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="au-block au-center-block">
          <div className="au-wrap au-narrow" data-reveal>
            <span className="au-kicker">Our mission</span>
            <h2 className="au-h2 au-mission">Simplify digital growth for every business</h2>
            <p className="au-p au-pc">Every campaign we create, every website we develop and every solution we build has one objective — helping our clients grow with confidence.</p>
          </div>
        </section>

        <section className="au-block">
          <div className="au-wrap" data-reveal>
            <span className="au-kicker">Our core values</span>
            <h2 className="au-h2">What guides every decision</h2>
            <div className="au-values">
              {VALUES.map((v, i) => (
                <div className="au-value" key={v.h} style={{ "--d": `${i * 0.09}s` }}><span className="au-vnode" aria-hidden="true" /><h3 className="au-v-h">{v.h}</h3><p className="au-card-p">{v.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="au-block">
          <div className="au-wrap" data-reveal>
            <span className="au-kicker">How we work</span>
            <h2 className="au-h2">A structured, flexible process</h2>
            <div className="au-path">
              <span className="au-comet" aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div className="au-step" key={s.h} style={{ "--d": `${i * 0.12}s` }}><span className="au-step-dot" aria-hidden="true">{i + 1}</span><h3 className="au-v-h">{s.h}</h3><p className="au-card-p">{s.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TEAM — rotating cylinder ===== */}
        <section className="au-team">
          <div className="au-team-head">
            <span className="au-kicker">Meet the people behind Skyup</span>
            <h2 className="au-h2">Every result starts with a person</h2>
            <p className="au-p au-pc">A passionate team of marketers, designers, developers, strategists and AI specialists solving real business challenges together.</p>
          </div>
          <div ref={sceneRef} className="au-cyscene">
            <div ref={cylRef} className="au-cyl">
              {TEAM.map((m) => (
                <article className="au-cycard" key={m.n}>
                  <div className="au-cyphoto"><img src={`/images/team/${m.file}.webp`} alt={`${m.name} — ${m.role} at Skyup Digital Solutions`} onError={hideImg} /><span className="au-cyph" aria-hidden="true">{m.name[0]}</span></div>
                </article>
              ))}
            </div>
          </div>
          <div ref={infoRef} className="au-cyinfo show"><div ref={nmRef} className="au-cyname">{TEAM[0].name}</div><div ref={rlRef} className="au-cyrole">{TEAM[0].role}</div></div>
          <div ref={dotsRef} className="au-cydots" role="tablist" aria-label="Team members" />
          <p className="au-cyfoot">Different expertise. <span>One shared mission.</span></p>
          {/* SEO: full roster as crawlable text */}
          <ul className="au-sr">{TEAM.map((m) => (<li key={m.n}>{m.name} — {m.role}</li>))}</ul>
        </section>

        <section className="au-block">
          <div className="au-wrap" data-reveal>
            <span className="au-kicker">Why businesses choose Skyup</span>
            <h2 className="au-h2">We focus on outcomes, not assumptions</h2>
            <ul className="au-checklist">{WHY.map((w) => (<li key={w}><span className="au-check" aria-hidden="true">✦</span>{w}</li>))}</ul>
          </div>
        </section>

        <section className="au-block au-cta-sec">
          <div className="au-wrap au-center" data-reveal>
            <span className="au-kicker">Let&rsquo;s build your next growth story</span>
            <h2 className="au-h2 au-cta-h">Digital experiences that inspire trust and deliver results.</h2>
            <a className="au-btn" href="/contact">Start Your Growth Journey →</a>
          </div>
        </section>
      </main>
    </div>
  );
}

const CSS = `
.au{ position:relative; background:#03040a; color:#EAEDF6; font-family:Poppins,system-ui,sans-serif; --blue:#5b8cff; --blue2:#9cc0ff; --amber:#FF8B14; --amber2:#FA9F43; overflow:clip; }
.au-sky{ position:fixed; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
.au-wrap{ max-width:1100px; margin:0 auto; padding:0 28px; }
.au-narrow{ max-width:760px; } .au-center{ text-align:center; display:flex; flex-direction:column; align-items:center; }
.au-center-block{ text-align:center; }
.au-kicker{ font-size:.66rem; letter-spacing:.28em; text-transform:uppercase; color:var(--amber); font-weight:600; }
.au-h2{ font-size:clamp(1.6rem,3vw,2.5rem); font-weight:700; letter-spacing:-.01em; margin:12px 0 0; max-width:22ch; }
.au-center-block .au-h2, .au-center .au-h2{ margin-left:auto; margin-right:auto; }
.au-p{ margin-top:16px; max-width:62ch; color:#aeb8d4; font-size:1.05rem; line-height:1.75; }
.au-ilink{ color:var(--blue2); text-decoration:underline; text-underline-offset:2px; text-decoration-thickness:1px; transition:color .2s ease; }
.au-ilink:hover{ color:var(--amber2); }
.au-pc{ margin-left:auto; margin-right:auto; }
.au-sr{ position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }

/* HERO */
.au-hero{ position:relative; height:260vh; z-index:1; }
.au-stage{ position:sticky; top:0; height:100vh; overflow:hidden; background:#04050C; }
.au-fx{ position:absolute; inset:0; width:100%; height:100%; z-index:4; }
.au-astro{ position:absolute; z-index:3; left:34%; top:50%; height:48vh; transform:translate(-50%,-50%); will-change:transform,opacity; filter:drop-shadow(0 0 18px rgba(90,140,255,.12)); pointer-events:none; user-select:none; }
.au-star{ position:absolute; z-index:2; left:66%; top:46%; width:18px; height:18px; transform:translate(-50%,-50%); border-radius:50%; background:radial-gradient(circle,#fff 0%,#cfe0ff 30%,var(--blue) 60%,rgba(91,140,255,0) 72%); box-shadow:0 0 40px 10px rgba(120,170,255,.7),0 0 120px 40px rgba(70,120,255,.35); will-change:transform,opacity; }
.au-star::before{ content:""; position:absolute; left:50%; top:50%; width:380px; height:380px; transform:translate(-50%,-50%); background:radial-gradient(closest-side,rgba(150,190,255,.35),transparent 70%); border-radius:50%; }
.au-star::after{ content:""; position:absolute; left:50%; top:50%; width:520px; height:2px; transform:translate(-50%,-50%); background:linear-gradient(90deg,transparent,rgba(180,210,255,.55),transparent); box-shadow:0 0 18px rgba(150,190,255,.5); }
.au-flare{ position:absolute; z-index:2; left:66%; top:46%; width:2px; height:520px; transform:translate(-50%,-50%); pointer-events:none; background:linear-gradient(180deg,transparent,rgba(180,210,255,.45),transparent); opacity:0; }
.au-white{ position:absolute; inset:0; z-index:6; background:#04050C; opacity:0; pointer-events:none; }
.au-intro{ position:absolute; inset:0; z-index:5; pointer-events:none; will-change:opacity; }
.au-intro-line{ position:absolute; left:50%; top:12%; transform:translateX(-50%); width:90%; text-align:center; font-size:clamp(1.35rem,3vw,2.4rem); font-weight:600; line-height:1.3; color:#eaf0ff; text-shadow:0 2px 34px rgba(0,0,0,.85); }
.au-em{ background:linear-gradient(100deg,var(--blue2),#fff 50%,var(--blue)); -webkit-background-clip:text; background-clip:text; color:transparent; font-weight:700; }
.au-intro-cue{ position:absolute; left:50%; bottom:11%; transform:translateX(-50%); display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:999px; font-size:.8rem; letter-spacing:.22em; text-transform:uppercase; font-weight:700; color:#04050C; white-space:nowrap; background:linear-gradient(100deg,var(--amber),var(--amber2,#ffc27a)); box-shadow:0 0 0 1px rgba(255,255,255,.25), 0 8px 30px rgba(255,139,20,.5); animation:auCuePulse 1.8s ease-in-out infinite; }
@keyframes auCuePulse{ 0%,100%{ box-shadow:0 0 0 1px rgba(255,255,255,.25), 0 8px 30px rgba(255,139,20,.45); transform:translateX(-50%) translateY(0); } 50%{ box-shadow:0 0 0 1px rgba(255,255,255,.4), 0 12px 42px rgba(255,139,20,.75); transform:translateX(-50%) translateY(-4px); } }
.au-arrow{ display:inline-block; margin-left:6px; animation:auBob 1.6s infinite; }
@keyframes auBob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(5px);} }
.au-reveal{ position:absolute; z-index:7; left:0; right:0; top:50%; transform:translateY(-50%); text-align:center; padding:0 28px; opacity:0; }
.au-eyebrow{ display:inline-block; font-size:.72rem; font-weight:600; letter-spacing:.26em; text-transform:uppercase; color:var(--amber2); }
.au-h1{ font-weight:700; letter-spacing:-.02em; line-height:1.06; margin:14px auto 16px; font-size:clamp(2.2rem,5.5vw,4rem); max-width:18ch; }
.au-grad{ background:linear-gradient(100deg,var(--amber2),#ffd89a 45%,var(--amber)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.au-sub{ max-width:60ch; margin:0 auto; color:#cdd5e8; font-size:clamp(1rem,1.4vw,1.15rem); line-height:1.7; }

/* CONTENT */
.au-content{ position:relative; z-index:2; }
.au-block{ padding:11vh 0; }
[data-reveal]{ opacity:0; transform:translateY(30px); transition:opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1); }
[data-reveal].in{ opacity:1; transform:none; }
.au-values{ margin-top:30px; display:grid; grid-template-columns:repeat(2,1fr); gap:22px; max-width:840px; }

/* ── Who we are — content left, MD photo right ── */
.au-who{ display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(28px,5vw,64px); align-items:stretch; }
.au-who-copy{ min-width:0; align-self:center; }
.au-who-photo{ position:relative; display:flex; flex-direction:column; height:100%; margin:0; border-radius:22px; overflow:hidden;
  border:1px solid rgba(91,140,255,.2); background:#0a1022;
  box-shadow:0 30px 70px -28px rgba(0,0,0,.8), 0 0 60px -30px rgba(91,140,255,.5);
  transform:translateY(18px) scale(.98); opacity:0; transition:opacity 1s ease .15s, transform 1s cubic-bezier(.2,.7,.2,1) .15s; }
[data-reveal].in .au-who-photo{ opacity:1; transform:none; }
.au-who-frame{ position:relative; flex:1 1 0; min-height:0; overflow:hidden; }
.au-who-frame img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 12%; filter:saturate(.96) contrast(.98) brightness(1.03) sepia(.05); }
.au-who-glow{ position:absolute; inset:auto -30% -40% -30%; height:70%; z-index:1; pointer-events:none;
  background:radial-gradient(ellipse 60% 100% at 50% 100%, rgba(91,140,255,.28), transparent 70%); }
.au-who-photo::after{ content:""; position:absolute; inset:0; pointer-events:none; border-radius:22px;
  box-shadow:inset 0 0 60px rgba(4,6,16,.5); }
.au-who-cap{ position:relative; z-index:2; padding:16px 20px 18px; text-align:center;
  border-top:1px solid rgba(91,140,255,.14);
  background:linear-gradient(180deg, rgba(10,16,34,.4), rgba(8,10,20,.7)); }
.au-who-name{ display:block; color:#fff; font-size:1.12rem; font-weight:700; letter-spacing:-.01em; }
.au-who-role{ display:block; margin-top:4px; color:var(--amber2); font-size:.72rem; font-weight:600;
  letter-spacing:.14em; text-transform:uppercase; }

/* ── Core values — constellation cards ── */
.au-value{ position:relative; padding:24px 24px 24px 28px; border-radius:16px;
  background:linear-gradient(180deg,rgba(13,18,34,.55),rgba(8,10,20,.4));
  border:1px solid rgba(91,140,255,.16); overflow:hidden;
  opacity:0; transform:translateY(26px);
  transition:opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1), border-color .4s ease, box-shadow .4s ease;
  transition-delay:var(--d,0s); }
[data-reveal].in .au-value{ opacity:1; transform:none; }
/* rotating conic sheen behind each card */
.au-value::before{ content:""; position:absolute; inset:-1px; border-radius:16px; padding:1px; z-index:0; opacity:0;
  background:conic-gradient(from 0deg, transparent 0deg, rgba(91,140,255,.55) 40deg, transparent 120deg);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  transition:opacity .5s ease; animation:auSpin 6s linear infinite; }
.au-value:hover{ transform:translateY(-6px); border-color:rgba(91,140,255,.4);
  box-shadow:0 24px 50px -24px rgba(0,0,0,.7), 0 0 50px -24px rgba(91,140,255,.6); }
.au-value:hover::before{ opacity:1; }
.au-value > *{ position:relative; z-index:1; }
@keyframes auSpin{ to{ transform:rotate(360deg); } }
/* pulsing node with orbital ripple */
.au-vnode{ position:absolute; left:-5px; top:28px; width:11px; height:11px; border-radius:50%;
  background:var(--blue); box-shadow:0 0 14px var(--blue); z-index:2; }
.au-vnode::after{ content:""; position:absolute; inset:-4px; border-radius:50%; border:1px solid var(--blue);
  opacity:0; animation:auRipple 2.8s ease-out infinite; animation-delay:var(--d,0s); }
@keyframes auRipple{ 0%{ transform:scale(.6); opacity:.9; } 70%{ opacity:0; } 100%{ transform:scale(2.6); opacity:0; } }
.au-v-h{ font-size:1.1rem; font-weight:600; margin:0 0 6px; }
.au-card-p{ margin:0; color:#8a97b8; font-size:.95rem; line-height:1.6; }

/* ── How we work — energy path ── */
.au-path{ margin-top:34px; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; position:relative; }
.au-path::before{ content:""; position:absolute; left:6%; right:6%; top:18px; height:2px; border-radius:2px;
  background:linear-gradient(90deg,var(--amber),var(--blue),var(--amber)); background-size:200% 100%;
  opacity:.45; animation:auFlow 4s linear infinite; }
@keyframes auFlow{ to{ background-position:200% 0; } }
/* comet pulse travelling along the path */
.au-comet{ position:absolute; top:12px; left:6%; width:14px; height:14px; border-radius:50%; z-index:2; opacity:0;
  background:radial-gradient(circle,#fff,var(--amber2) 45%,transparent 70%);
  box-shadow:0 0 16px 4px rgba(250,159,67,.8); }
[data-reveal].in .au-comet{ animation:auComet 3.6s cubic-bezier(.5,0,.5,1) infinite; }
@keyframes auComet{ 0%{ left:6%; opacity:0; } 8%{ opacity:1; } 92%{ opacity:1; } 100%{ left:94%; opacity:0; } }
.au-step{ position:relative; opacity:0; transform:translateY(24px);
  transition:opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); transition-delay:var(--d,0s); }
[data-reveal].in .au-step{ opacity:1; transform:none; }
.au-step-dot{ display:grid; place-items:center; width:38px; height:38px; border-radius:50%; background:#070b16;
  border:1px solid var(--amber); color:var(--amber2); font-weight:700; font-size:.9rem;
  box-shadow:0 0 18px rgba(255,139,20,.4); position:relative; z-index:1; transition:box-shadow .4s ease, transform .4s ease; }
.au-step-dot::after{ content:""; position:absolute; inset:-5px; border-radius:50%; border:1px solid var(--amber2);
  opacity:0; animation:auRipple 3s ease-out infinite; animation-delay:var(--d,0s); }
.au-step:hover .au-step-dot{ transform:scale(1.12); box-shadow:0 0 26px rgba(255,139,20,.7); }
.au-step .au-v-h{ margin-top:14px; }

/* TEAM — rotating cylinder coverflow */
.au-team{ position:relative; z-index:2; padding:11vh 0 9vh; text-align:center; }
.au-team-head{ max-width:760px; margin:0 auto; padding:0 28px; }
.au-team-head .au-h2{ margin-left:auto; margin-right:auto; }
.au-cyscene{ position:relative; margin-top:5vh; height:60vh; min-height:470px; display:flex; align-items:center; justify-content:center; perspective:1100px; perspective-origin:50% 50%; overflow:hidden; }
.au-cyscene.push{ animation:auCyPush 1300ms cubic-bezier(.66,0,.2,1); }
@keyframes auCyPush{ 0%{ transform:scale(1);} 42%{ transform:scale(1.035);} 100%{ transform:scale(1);} }
.au-cyl{ position:relative; width:300px; height:430px; transform-style:preserve-3d; transition:transform 1300ms cubic-bezier(.66,0,.2,1); will-change:transform; }
.au-cycard{ position:absolute; left:0; top:0; width:300px; height:430px; border-radius:20px; overflow:hidden; background:radial-gradient(120% 120% at 50% 30%,#23356a,#0a1022); box-shadow:0 26px 40px -18px rgba(0,0,0,.6); backface-visibility:hidden; transition:opacity .9s ease, box-shadow .9s ease; }
.au-cycard.is-active{ box-shadow:0 34px 60px -22px rgba(0,0,0,.7),0 0 70px -24px rgba(91,140,255,.4); }
.au-cyphoto{ position:relative; width:100%; height:100%; display:grid; place-items:center; }
.au-cyphoto img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 18%; filter:saturate(.9) contrast(.94) brightness(1.06) sepia(.08); }
.au-cycard.is-active .au-cyphoto img{ filter:saturate(.95) contrast(.97) brightness(1.08) sepia(.06); }
.au-cyph{ display:none; }
.au-cyinfo{ height:74px; margin-top:6px; }
.au-cyname{ font-size:1.5rem; font-weight:700; color:#fff; opacity:0; transform:translateY(8px); transition:opacity .7s ease,transform .7s ease; }
.au-cyrole{ font-size:.78rem; letter-spacing:.12em; text-transform:uppercase; color:var(--amber2); font-weight:600; margin-top:6px; opacity:0; transform:translateY(8px); transition:opacity .7s ease .1s,transform .7s ease .1s; }
.au-cyinfo.show .au-cyname, .au-cyinfo.show .au-cyrole{ opacity:1; transform:none; }
.au-cydots{ display:flex; gap:8px; justify-content:center; padding:14px 0 4px; }
.au-cydot{ position:relative; width:7px; height:7px; border:0; padding:0; border-radius:50%; background:rgba(255,255,255,.2); transition:.5s; cursor:pointer; -webkit-appearance:none; appearance:none; }
/* invisible enlarged hit area so the tiny dots are easy to click / tap (~28px) */
.au-cydot::before{ content:""; position:absolute; inset:-11px; border-radius:50%; }
.au-cydot:hover{ background:rgba(255,255,255,.45); }
.au-cydot:focus-visible{ outline:2px solid var(--amber2); outline-offset:3px; }
.au-cydot.on{ background:var(--amber2); box-shadow:0 0 12px var(--amber2); width:22px; border-radius:4px; }
.au-cyfoot{ margin-top:20px; font-size:clamp(1.1rem,2.2vw,1.5rem); font-weight:600; }
.au-cyfoot span{ color:var(--blue2); }

.au-checklist{ margin-top:26px; list-style:none; padding:0; display:grid; grid-template-columns:repeat(2,1fr); gap:14px 28px; max-width:880px; }
.au-checklist li{ display:flex; gap:12px; color:#c4ccdf; font-size:1.02rem; line-height:1.5; }
.au-check{ color:var(--amber); flex:0 0 auto; }
.au-cta-sec{ padding:14vh 0 16vh; }
.au-cta-h{ max-width:20ch; }
.au-btn{ margin-top:24px; display:inline-flex; padding:15px 30px; border-radius:999px; font-weight:600; color:#06070d; text-decoration:none; background:linear-gradient(100deg,var(--amber2),var(--amber)); box-shadow:0 14px 40px -10px rgba(241,178,74,.5); }

@media (max-width:860px){
  .au-values,.au-checklist{ grid-template-columns:1fr; }
  .au-path{ grid-template-columns:1fr 1fr; } .au-path::before{ display:none; }
  .au-comet{ display:none; }
  .au-astro{ height:38vh; }
  .au-who{ grid-template-columns:1fr; }
  .au-who-photo{ order:-1; height:auto; display:block; max-width:420px; margin:0 auto; }
  .au-who-frame{ aspect-ratio:4/5; }
}
@media (max-width:560px){ .au-cyl,.au-cycard{ width:230px; height:330px; } .au-cyscene{ perspective:850px; } }
@media (prefers-reduced-motion: reduce){
  .au-hero{ height:120vh; } .au-stage{ position:static; height:auto; padding:18vh 0; }
  .au-reveal{ position:static; transform:none; opacity:1; } .au-arrow{ animation:none; }
  .au-cyl{ transition:none; } .au-cyscene.push{ animation:none; }
  [data-reveal]{ opacity:1; transform:none; }
  .au-value,.au-step,.au-who-photo{ opacity:1 !important; transform:none !important; }
  .au-value::before,.au-vnode::after,.au-step-dot::after,.au-comet,.au-path::before{ animation:none; }
  .au-comet{ display:none; }
}
`;
