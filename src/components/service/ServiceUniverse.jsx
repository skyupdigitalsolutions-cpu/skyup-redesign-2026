// src/components/service/ServiceUniverse.jsx
//
// SKYUP Services — cosmic backdrop.
// A persistent fixed starfield sits behind the whole service page (parallax on
// scroll, twinkle, reduced-motion aware). The cinematic craft + beam now live in
// ServiceHero (fixed elements that hover over the whole page), so this wrapper is
// purely the dark-space background + a stacking context for the content.
//
// Canvas only — fast, SSR-safe. Brand bg #04050C.

import React, { useEffect, useRef } from "react";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function ServiceUniverse({ children }) {
  const skyRef = useRef(null);

  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = sky.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let VW = 0, VH = 0, stars = [], raf = 0, t0 = performance.now();
    let docH = 0; // cached scrollable height — recomputed on resize, NOT every frame

    const build = () => {
      stars = [];
      const n = Math.round((VW * VH) / 5200);
      for (let i = 0; i < n; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * VW, y: Math.random() * VH, z,
          r: 0.3 + z * 1.4, tw: Math.random() * 6.28,
          ts: 0.4 + Math.random() * 1.4, b: 0.15 + z * 0.75,
        });
      }
    };
    const resize = () => {
      VW = window.innerWidth; VH = window.innerHeight;
      sky.width = VW * DPR; sky.height = VH * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); build();
      docH = document.documentElement.scrollHeight - VH; // refresh cached height here only
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    // ScrollTrigger's pin changes the page height after mount; refresh the cache then.
    const refreshH = () => { docH = document.documentElement.scrollHeight - VH; };
    window.addEventListener("load", refreshH, { passive: true });
    const hTimer = setTimeout(refreshH, 1200);

    if (reduce) {
      ctx.clearRect(0, 0, VW, VH);
      for (const s of stars) {
        ctx.globalAlpha = s.b; ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fillStyle = "#dfe9ff"; ctx.fill();
      }
      ctx.globalAlpha = 1;
      return () => {
        clearTimeout(hTimer);
        window.removeEventListener("resize", resize);
        window.removeEventListener("load", refreshH);
      };
    }

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return; // don't burn frames on an inactive tab
      const time = (performance.now() - t0) / 1000;
      const gP = docH > 0 ? clamp(window.scrollY / docH, 0, 1) : 0;
      const par = gP * 140;
      ctx.clearRect(0, 0, VW, VH);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = 0.6 + 0.4 * Math.sin(time * s.ts + s.tw);
        const y = ((s.y - par * s.z) % VH + VH) % VH;
        ctx.globalAlpha = s.b * tw;
        ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.28);
        ctx.fillStyle = "#dfe9ff"; ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", refreshH);
    };
  }, []);

  return (
    <div className="su">
      <style>{CSS}</style>
      <canvas ref={skyRef} className="su-sky" aria-hidden="true" />
      <div className="su-content">{children}</div>
    </div>
  );
}

const CSS = `
.su{ position:relative; background:#04050C; overflow:clip; }
.su-sky{ position:fixed; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
.su-content{ position:relative; z-index:1; }
`;
