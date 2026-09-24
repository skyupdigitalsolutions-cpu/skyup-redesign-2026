// src/components/CustomSoftwareMap.jsx
// Dotted world map with a pin for every project location.
// • Auto-plays: cycles through every project on its own (pin by pin, and through
//   every project on a shared pin). Pauses on hover, tap, when scrolled off-screen
//   or via the Pause button; resumes automatically.
// • "Region" view (Middle East + South Asia, default) and full "World" view.
// • Desktop: card floats next to the active pin. Mobile (<640px): card sits in a
//   panel under the map so it never covers it.
// SSR/prerender-safe: all D3/topojson work happens in useEffect (client only).
import React, { useEffect, useRef } from "react";

const W = 1000;
const H = 620;
const ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
const MOBILE_BP = 640;
const AUTOPLAY_MS = 4500;      // time each project stays open
const RESUME_AFTER_MS = 8000;  // auto-play resumes this long after a tap / "Next"
const DEFAULT_VIEW = "region"; // "region" | "world"
const VIEWS = {
  region: { label: "Region", bbox: [[36, -2], [104, 40]] }, // [west, south], [east, north]
  world: { label: "World" },
};
// Countries whose dots are tinted (where you have clients)
const HIGHLIGHT = ["India", "United Arab Emirates"];

// Mirrors the PROJECTS cards on the landing page. `summary` lines are short
// placeholders — edit them to match what was actually delivered.
// Projects close together are grouped into one pin automatically.
const PROJECTS = [
  { client: "Natraj Home Furnishing", system: "Field Management System", location: "Haryana", region: "India", pin: "Haryana", lon: 76.0856, lat: 29.0588, summary: "Custom system to manage field teams, visits and on-ground operations." },
  { client: "Spotek", system: "CRM + Invoice Software", location: "Dubai", region: "UAE", pin: "Dubai, UAE", lon: 55.2708, lat: 25.2048, summary: "Lead management and invoicing combined in one custom platform." },
  { client: "Sarathi", system: "Finance CRM", location: "Bengaluru", region: "Karnataka", pin: "Bengaluru", lon: 77.5946, lat: 12.9716, summary: "CRM tailored to finance workflows, follow-ups and reporting." },
  { client: "Ashwika Enterprises", system: "AI Voice Agent", location: "Bengaluru", region: "Karnataka", pin: "Bengaluru", lon: 77.5946, lat: 12.9716, summary: "AI voice agent that handles customer calls and enquiries." },
  { client: "Logistics Business", system: "AI Summary Software", location: "Bengaluru", region: "Karnataka", pin: "Bengaluru", lon: 77.5946, lat: 12.9716, summary: "AI software that summarises logistics data and documents." },
  { client: "Abhi Cabs", system: "Transport ERP", location: "Karnataka", region: "India", pin: "Karnataka", lon: 75.7139, lat: 15.3173, summary: "ERP for managing transport operations, fleet and bookings." },
];

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = [...document.scripts].find((s) => s.src === src);
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => { el.dataset.loaded = "1"; resolve(); };
    el.onerror = reject;
    document.head.appendChild(el);
  });
}

export default function CustomSoftwareMap() {
  const hostRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;
    const disposers = [];
    const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); disposers.push(() => el.removeEventListener(ev, fn, opt)); };

    (async () => {
      try {
        if (!window.d3) await loadScript("https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js");
        if (!window.topojson) await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js");
      } catch (_) { /* offline: pins-only fallback below */ }
      if (cancelled || !hostRef.current) return;

      const d3 = window.d3;
      let land = null, highlight = [];
      if (d3 && window.topojson) {
        try {
          const topo = await d3.json(ATLAS);
          land = window.topojson.feature(topo, topo.objects.land);
          highlight = window.topojson.feature(topo, topo.objects.countries).features
            .filter((f) => f.properties && HIGHLIGHT.includes(f.properties.name));
        } catch (_) { /* fall through */ }
      }
      if (cancelled) return;

      host.innerHTML = "";
      const isMobile = () => host.clientWidth < MOBILE_BP;

      // ── State ──
      let view = DEFAULT_VIEW, groups = [], pins = [], layer = null, gi = 0, ri = 0;
      let userPaused = false, hoverPaused = false, tempPaused = false, inView = true;
      let timer = null, resumeTimer = null, barAnim = null;
      const dotCache = {};

      // ── Controls: view toggle + play/pause ──
      const bar = document.createElement("div");
      bar.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap;";
      const seg = document.createElement("div");
      seg.setAttribute("role", "group");
      seg.setAttribute("aria-label", "Map view");
      seg.style.cssText = "display:inline-flex;gap:2px;background:#fff;border:1px solid #ebebf4;border-radius:9999px;padding:4px;box-shadow:0 4px 14px rgba(20,20,32,0.06);";
      const pill = "font-family:inherit;font-size:13px;font-weight:600;border:none;border-radius:9999px;padding:8px 16px;cursor:pointer;transition:background .2s,color .2s;";
      const viewBtns = {};
      Object.entries(VIEWS).forEach(([k, v]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = v.label;
        b.style.cssText = pill;
        on(b, "click", () => { if (view !== k) { view = k; gi = 0; ri = 0; build(); } });
        viewBtns[k] = b;
        seg.appendChild(b);
      });
      const playBtn = document.createElement("button");
      playBtn.type = "button";
      playBtn.style.cssText = pill + "background:#fff;color:#141420;border:1px solid #ebebf4;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(20,20,32,0.06);";
      const renderPlay = () => {
        playBtn.innerHTML = userPaused
          ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="#0037CA"><path d="M7 4v16l13-8z"/></svg>Play tour`
          : `<svg width="12" height="12" viewBox="0 0 24 24" fill="#0037CA"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>Pause tour`;
        playBtn.setAttribute("aria-pressed", userPaused ? "true" : "false");
      };
      on(playBtn, "click", () => { userPaused = !userPaused; tempPaused = false; renderPlay(); schedule(); });
      renderPlay();
      bar.append(seg, playBtn);
      host.appendChild(bar);

      const mapBox = document.createElement("div");
      mapBox.style.cssText = "position:relative;width:100%;";
      host.appendChild(mapBox);
      const panel = document.createElement("div");
      panel.setAttribute("aria-live", "polite");
      panel.style.cssText = "position:relative;width:100%;";
      host.appendChild(panel);

      // ── One shared card, re-rendered for whichever project is active ──
      const card = document.createElement("div");
      card.style.cssText = "position:absolute;left:0;top:0;box-sizing:border-box;z-index:6;background:#fff;border-radius:20px;padding:22px 22px 24px;overflow:hidden;box-shadow:0 22px 54px rgba(20,20,32,0.16);transition:left .45s cubic-bezier(.4,0,.2,1), top .45s cubic-bezier(.4,0,.2,1);";
      on(card, "mouseenter", () => { if (!isMobile()) { hoverPaused = true; schedule(); } });
      on(card, "mouseleave", () => { hoverPaused = false; schedule(); });

      const glow = ["#F1891A", "#22c3f0", "#ff4fa3", "#7b3ff2"];
      const glow2 = ["#ffd58a", "#7b3ff2", "#F1891A", "#22c3f0"];
      const total = PROJECTS.length;

      const renderCard = () => {
        const g = groups[gi], p = g.items[ri];
        const pos = PROJECTS.indexOf(p) + 1;
        const pager = g.items.length > 1
          ? `<div style="display:flex;gap:5px;">${g.items.map((_, k) => `<span style="width:${k === ri ? 16 : 6}px;height:6px;border-radius:9999px;background:${k === ri ? "#F1891A" : "#e0e0ec"};transition:width .2s;"></span>`).join("")}</div>`
          : "";
        card.innerHTML =
          `<div style="position:absolute;bottom:-58px;left:-24px;right:-24px;height:170px;filter:blur(40px);opacity:0.7;background:radial-gradient(52% 62% at 60% 80%, ${glow[gi % 4]} 0%, transparent 72%), radial-gradient(46% 56% at 24% 92%, ${glow2[gi % 4]} 0%, transparent 74%);"></div>` +
          `<div style="position:relative;display:flex;flex-direction:column;gap:14px;">` +
            `<div style="display:flex;align-items:center;gap:8px;white-space:nowrap;"><span style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#F1891A;">${esc(p.location)}</span><span style="font-size:11.5px;color:#6b6b8a;">${esc(p.region)}</span></div>` +
            `<div style="display:flex;align-items:center;gap:12px;"><span style="width:42px;height:42px;flex-shrink:0;border-radius:12px;background:#f5f5fa;border:1px solid #ebebf4;color:#0037CA;font-size:13.5px;font-weight:700;display:flex;align-items:center;justify-content:center;">${initials(p.client)}</span><span style="display:flex;flex-direction:column;gap:2px;min-width:0;"><span style="font-size:16px;font-weight:600;color:#141420;letter-spacing:-0.01em;">${esc(p.client)}</span><span style="font-size:13.5px;font-weight:600;color:#0037CA;">${esc(p.system)}</span></span></div>` +
            `<p style="margin:0;font-size:14px;color:#3b3b57;line-height:1.6;">${esc(p.summary)}</p>` +
            `<div style="display:flex;align-items:center;gap:10px;">${pager}<span style="font-size:11.5px;color:#6b6b8a;">${pos} / ${total}</span><button type="button" data-next style="margin-left:auto;font-family:inherit;font-size:12.5px;font-weight:600;color:#0037CA;background:none;border:none;padding:6px 0;cursor:pointer;">Next \u2192</button></div>` +
          `</div>` +
          `<span data-bar style="position:absolute;left:0;bottom:0;height:3px;width:0;background:linear-gradient(90deg,#F1891A,#ff4fa3);"></span>`;
        card.querySelector("[data-next]").addEventListener("click", (e) => { e.stopPropagation(); advance(); tempPause(); });
      };

      const place = () => {
        if (!layer) return;
        if (isMobile()) {
          if (card.parentNode !== panel) panel.appendChild(card);
          panel.style.marginTop = "14px";
          panel.style.minHeight = "212px";
          card.style.position = "relative";
          card.style.left = "0"; card.style.top = "0";
          card.style.width = "100%";
          return;
        }
        panel.style.marginTop = "0"; panel.style.minHeight = "0";
        if (card.parentNode !== layer) layer.appendChild(card);
        card.style.position = "absolute";
        const g = groups[gi];
        const lw = layer.clientWidth, lh = layer.clientHeight;
        const cw = Math.max(230, Math.min(300, lw - 40));
        card.style.width = cw + "px";
        const px = (g.x / W) * lw, py = (g.y / H) * lh;
        const ch = card.offsetHeight || 210;
        // Keep the card clear of the pin *and* its label
        const pin = pins[gi];
        const half = pin ? pin.hit / 2 : 13, lab = pin ? pin.label.offsetWidth : 0;
        const rightEdge = px + half + (pin && !pin.labelLeft ? lab : 0) + 14;
        const leftEdge = px - half - (pin && pin.labelLeft ? lab : 0) - 14;
        // Try a few positions and keep the one covering the fewest other pins
        const clampX = (x) => Math.max(8, Math.min(x, Math.max(8, lw - cw - 8)));
        const clampY = (y) => Math.max(8, Math.min(y, Math.max(8, lh - ch - 8)));
        const base = layer.getBoundingClientRect();
        const others = pins.filter((_, j) => j !== gi).map((o) => {
          const r = o.el.getBoundingClientRect(), lr = o.label.getBoundingClientRect();
          return { l: Math.min(r.left, lr.left) - base.left, r: Math.max(r.right, lr.right) - base.left, t: Math.min(r.top, lr.top) - base.top, b: Math.max(r.bottom, lr.bottom) - base.top };
        });
        const xs = [rightEdge, leftEdge - cw, px - cw / 2, 8, lw - cw - 8];
        const ys = [py - ch / 2, py - ch - 18, py + 18, 8, lh - ch - 8];
        let best = null;
        xs.forEach((x0, xi) => ys.forEach((y0, yi) => {
          const x = clampX(x0), y = clampY(y0);
          const hitsPin = px + half > x && px - half < x + cw && py + half > y && py - half < y + ch;
          const covered = others.filter((o) => o.r > x && o.l < x + cw && o.b > y && o.t < y + ch).length;
          const score = covered * 10 + (hitsPin ? 50 : 0) + (x !== x0 ? 2 : 0) + (y !== y0 ? 1 : 0) + xi * 0.5 + yi * 0.2;
          if (!best || score < best.score) best = { x, y, score };
        }));
        const left = best.x, top = best.y;
        card.style.left = left + "px";
        card.style.top = top + "px";
      };

      const setPin = (pin, active) => {
        pin.el.style.zIndex = active ? "5" : "3";
        pin.ring.style.transform = active ? "scale(1)" : "scale(0.6)";
        pin.ring.style.background = active ? "rgba(241,137,26,0.32)" : "rgba(241,137,26,0.22)";
        pin.core.style.transform = active ? "scale(1.2)" : "scale(1)";
        pin.label.style.background = active ? "#141420" : "rgba(255,255,255,0.92)";
        pin.label.style.color = active ? "#fff" : "#141420";
        pin.el.setAttribute("aria-current", active ? "true" : "false");
      };

      const show = (k, r) => {
        if (!groups.length) return;
        gi = k; ri = r;
        pins.forEach((pin, j) => setPin(pin, j === k));
        renderCard();
        place();
        if (card.animate) card.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 280, easing: "ease-out" });
      };
      const advance = () => {
        const g = groups[gi];
        if (ri < g.items.length - 1) show(gi, ri + 1);
        else show((gi + 1) % groups.length, 0);
      };

      // ── Auto-play ──
      const running = () => !userPaused && !hoverPaused && !tempPaused && inView && !document.hidden;
      const stopBar = () => { if (barAnim) { barAnim.cancel(); barAnim = null; } };
      const startBar = () => {
        const b = card.querySelector("[data-bar]");
        if (b && b.animate) barAnim = b.animate([{ width: "0%" }, { width: "100%" }], { duration: AUTOPLAY_MS, easing: "linear", fill: "forwards" });
      };
      const schedule = () => {
        clearTimeout(timer);
        stopBar();
        if (!running() || !groups.length) return;
        startBar();
        timer = setTimeout(() => { advance(); schedule(); }, AUTOPLAY_MS);
      };
      const tempPause = () => {
        tempPaused = true;
        schedule();
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { tempPaused = false; schedule(); }, RESUME_AFTER_MS);
      };
      disposers.push(() => { clearTimeout(timer); clearTimeout(resumeTimer); stopBar(); });

      // ── Projection + dotted land ──
      const makeProj = (v) => {
        if (d3) {
          // Fit to inhabited latitudes (no Antarctica) so land fills the frame
          if (v === "world") return d3.geoNaturalEarth1().fitExtent([[8, 8], [W - 8, H - 8]], { type: "MultiPoint", coordinates: [[-180, 0], [180, 0], [0, 80], [0, -56], [-180, 60], [180, 60], [-180, -50], [180, -50]] });
          const [[w, s], [e, n]] = VIEWS.region.bbox;
          return d3.geoMercator().fitExtent([[0, 0], [W, H]], { type: "MultiPoint", coordinates: [[w, s], [e, n]] });
        }
        if (v === "world") return ([lon, lat]) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
        const [[w, s], [e, n]] = VIEWS.region.bbox;
        return ([lon, lat]) => [((lon - w) / (e - w)) * W, ((n - lat) / (n - s)) * H];
      };
      // Rasterise land (and highlighted countries) onto an offscreen canvas once
      // per view, then sample it on a grid — ~100x faster than geoContains per dot.
      // Coarser, bigger dots on small screens so the map stays legible
      const dotStep = (v) => (isMobile() ? (v === "world" ? 13 : 15) : (v === "world" ? 7 : 9));
      const dotsFor = (v, proj) => {
        const key = `${v}-${dotStep(v)}`;
        if (dotCache[key]) return dotCache[key];
        const cv = document.createElement("canvas");
        cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        if (!ctx) return (dotCache[key] = []);
        const path = d3.geoPath(proj, ctx);
        const paint = (geo) => {
          ctx.clearRect(0, 0, W, H);
          ctx.fillStyle = "#000";
          ctx.beginPath(); path(geo); ctx.fill();
          return ctx.getImageData(0, 0, W, H).data;
        };
        const landPx = paint(land);
        const hlPx = highlight.length ? paint({ type: "FeatureCollection", features: highlight }) : null;
        const maxY = v === "world" ? proj([0, -58])[1] : H; // drop Antarctica
        const step = dotStep(v), pts = [];
        for (let y = step / 2; y < Math.min(H, maxY); y += step)
          for (let x = step / 2; x < W; x += step) {
            const i = ((Math.round(y) * W) + Math.round(x)) * 4 + 3;
            if (landPx[i] > 100) pts.push([x, y, !!(hlPx && hlPx[i] > 100)]);
          }
        return (dotCache[key] = pts);
      };

      // ── Build (or rebuild) the map for the current view/size ──
      const build = () => {
        clearTimeout(timer);
        stopBar();
        Object.entries(viewBtns).forEach(([k, b]) => {
          b.style.background = k === view ? "#141420" : "transparent";
          b.style.color = k === view ? "#fff" : "#4a4a66";
          b.setAttribute("aria-pressed", k === view ? "true" : "false");
        });
        if (card.parentNode) card.parentNode.removeChild(card);
        mapBox.innerHTML = "";

        const proj = makeProj(view);
        const wrap = document.createElement("div");
        wrap.style.cssText = "position:relative;width:100%;";
        mapBox.appendChild(wrap);
        if (d3 && land) {
          const svg = d3.select(wrap).append("svg")
            .attr("viewBox", `0 0 ${W} ${H}`).attr("width", "100%")
            .attr("aria-hidden", "true")
            .style("display", "block").style("overflow", "visible");
          const r = dotStep(view) * 0.23;
          svg.append("g").selectAll("circle").data(dotsFor(view, proj)).enter().append("circle")
            .attr("cx", (d) => d[0]).attr("cy", (d) => d[1]).attr("r", r)
            .attr("fill", (d) => (d[2] ? "#a9b8f2" : "#d2d2e2"))
            .attr("opacity", 0.9);
        } else {
          wrap.style.aspectRatio = `${W} / ${H}`;
        }
        layer = document.createElement("div");
        layer.style.cssText = "position:absolute;inset:0;";
        wrap.appendChild(layer);

        // Group projects whose pins would overlap at this size
        const px = mapBox.clientWidth || W;
        const hit = window.matchMedia("(max-width: 991px)").matches ? 38 : 26;
        const gap = hit * (W / px) * 1.15;
        groups = [];
        PROJECTS.forEach((p) => {
          const [x, y] = proj([p.lon, p.lat]);
          const g = groups.find((o) => Math.hypot(o.x - x, o.y - y) < gap);
          if (g) g.items.push(p);
          else groups.push({ x, y, items: [p] });
        });

        pins = groups.map((g, k) => {
          const names = [...new Set(g.items.map((i) => i.pin))];
          const text = names.length > 1 ? `${names[0]} +${names.length - 1}` : names[0];
          const labelLeft = g.x > W - 170 || groups.some((o) => o !== g && o.x > g.x && o.x - g.x < 170 && Math.abs(o.y - g.y) < 30);
          const el = document.createElement("button");
          el.type = "button";
          el.setAttribute("aria-label", `${names.join(", ")}: ${g.items.length} project${g.items.length > 1 ? "s" : ""}`);
          el.style.cssText = `position:absolute;left:${(g.x / W) * 100}%;top:${(g.y / H) * 100}%;transform:translate(-50%,-50%);width:${hit}px;height:${hit}px;padding:0;border:none;background:transparent;cursor:pointer;z-index:3;font-family:inherit;`;
          el.innerHTML =
            `<span style="position:absolute;inset:0;border-radius:9999px;background:rgba(241,137,26,0.22);transform:scale(0.6);transition:transform .25s ease, background .25s ease;"></span>` +
            `<span style="position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:9999px;background:#F1891A;border:2px solid #fff;box-sizing:border-box;box-shadow:0 2px 8px rgba(241,137,26,0.55);transition:transform .25s ease;"></span>` +
            `<span style="position:absolute;${labelLeft ? "right" : "left"}:calc(100% + 2px);top:50%;transform:translateY(-50%);white-space:nowrap;font-size:11.5px;font-weight:600;border:1px solid #ebebf4;border-radius:9999px;padding:3px 9px;pointer-events:none;box-shadow:0 4px 12px rgba(20,20,32,0.08);transition:background .25s,color .25s;">${esc(text)}</span>` +
            (g.items.length > 1 ? `<span style="position:absolute;top:-4px;${labelLeft ? "left" : "right"}:-6px;min-width:17px;height:17px;padding:0 4px;box-sizing:border-box;border-radius:9999px;background:#0037CA;color:#fff;font-size:10px;font-weight:700;line-height:17px;text-align:center;pointer-events:none;">${g.items.length}</span>` : "");
          const pin = { el, ring: el.children[0], core: el.children[1], label: el.children[2], labelLeft, hit };
          el.addEventListener("mouseenter", () => { if (!isMobile() && gi !== k) show(k, 0); });
          el.addEventListener("click", () => { if (gi !== k) show(k, 0); tempPause(); });
          el.addEventListener("focus", () => { if (gi !== k) show(k, 0); tempPause(); });
          layer.appendChild(el);
          return pin;
        });

        gi = Math.min(gi, groups.length - 1);
        ri = Math.min(ri, groups[gi].items.length - 1);
        show(gi, ri);
        schedule();
      };

      // Hovering the map (desktop) pauses the tour
      on(mapBox, "mouseenter", () => { if (!isMobile()) { hoverPaused = true; schedule(); } });
      on(mapBox, "mouseleave", () => { hoverPaused = false; schedule(); });

      // Pause while off-screen or tab hidden
      if (window.IntersectionObserver) {
        const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; schedule(); }, { threshold: 0.25 });
        io.observe(host);
        disposers.push(() => io.disconnect());
      }
      on(document, "visibilitychange", schedule);

      // Rebuild on meaningful width changes (re-groups pins, switches mobile/desktop)
      let lastW = host.clientWidth, rt = null;
      const onResize = () => {
        place();
        clearTimeout(rt);
        rt = setTimeout(() => {
          const w = host.clientWidth;
          if (Math.abs(w - lastW) > 60 || (w < MOBILE_BP) !== (lastW < MOBILE_BP)) { lastW = w; build(); }
        }, 200);
      };
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(onResize);
        ro.observe(host);
        disposers.push(() => ro.disconnect());
      } else on(window, "resize", onResize);
      disposers.push(() => clearTimeout(rt));

      build();
    })();

    return () => {
      cancelled = true;
      disposers.forEach((fn) => fn());
      host.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} style={{ width: "100%", minHeight: 260 }} />;
}
