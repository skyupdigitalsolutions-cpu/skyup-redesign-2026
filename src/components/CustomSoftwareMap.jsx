// src/components/CustomSoftwareMap.jsx
// Interactive dotted India map with a pin for every project location.
// Desktop: hover/tap a pin → floating card. Mobile (<640px): the active card
// renders in a panel under the map so it never covers the map.
// SSR/prerender-safe: all D3/topojson work happens in useEffect (client only).
import React, { useEffect, useRef } from "react";

const W = 1000;
const H = 620;
const ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
const MOBILE_BP = 640;

// Mirrors the PROJECTS cards on the landing page. `summary` lines are short
// placeholders — edit them to match what was actually delivered.
// Locations that share a pin (Bengaluru) are paged inside one card.
const LOCATIONS = [
  { label: "Haryana", region: "India", lon: 76.0856, lat: 29.0588, projects: [
    { client: "Natraj Home Furnishing", system: "Field Management System", summary: "Custom system to manage field teams, visits and on-ground operations." },
  ] },
  { label: "Dubai", region: "UAE", lon: 55.2708, lat: 25.2048, offMap: true, projects: [
    { client: "Spotek", system: "CRM + Invoice Software", summary: "Lead management and invoicing combined in one custom platform." },
  ] },
  { label: "Bengaluru", region: "Karnataka", lon: 77.5946, lat: 12.9716, projects: [
    { client: "Sarathi", system: "Finance CRM", summary: "CRM tailored to finance workflows, follow-ups and reporting." },
    { client: "Ashwika Enterprises", system: "AI Voice Agent", summary: "AI voice agent that handles customer calls and enquiries." },
    { client: "Logistics Business", system: "AI Summary Software", summary: "AI software that summarises logistics data and documents." },
  ] },
  { label: "Karnataka", region: "India", lon: 75.7139, lat: 15.3173, projects: [
    { client: "Abhi Cabs", system: "Transport ERP", summary: "ERP for managing transport operations, fleet and bookings." },
  ] },
];

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

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

    (async () => {
      try {
        if (!window.d3) await loadScript("https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js");
        if (!window.topojson) await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js");
      } catch (_) { /* offline: pins-only fallback below */ }
      if (cancelled || !hostRef.current) return;

      const d3 = window.d3;
      let india = null;
      if (d3 && window.topojson) {
        try {
          const topo = await d3.json(ATLAS);
          const countries = window.topojson.feature(topo, topo.objects.countries);
          india = countries.features.find((f) => f.properties && f.properties.name === "India");
        } catch (_) { /* fall through */ }
      }
      if (cancelled) return;

      host.innerHTML = "";
      const isMobile = () => host.clientWidth < MOBILE_BP;

      const wrap = document.createElement("div");
      wrap.style.cssText = "position:relative;width:100%;";
      host.appendChild(wrap);

      // Panel under the map that holds the active card on mobile
      const panel = document.createElement("div");
      panel.style.cssText = "position:relative;width:100%;margin-top:14px;";
      host.appendChild(panel);

      let projection = null;
      if (india && d3) {
        projection = d3.geoMercator().fitExtent([[60, 30], [W - 40, H - 30]], india);
        const path = d3.geoPath(projection);
        const svg = d3.select(wrap).append("svg")
          .attr("viewBox", `0 0 ${W} ${H}`).attr("width", "100%")
          .style("display", "block").style("overflow", "visible");
        const b = path.bounds(india);
        const step = 9, r = 2.05, pts = [];
        for (let y = b[0][1]; y <= b[1][1]; y += step)
          for (let x = b[0][0]; x <= b[1][0]; x += step) {
            const inv = projection.invert([x, y]);
            if (inv && d3.geoContains(india, inv)) pts.push([x, y]);
          }
        svg.append("g").selectAll("circle").data(pts).enter().append("circle")
          .attr("cx", (d) => d[0]).attr("cy", (d) => d[1]).attr("r", r)
          .attr("fill", "#c9c9dd").attr("opacity", 0.85);
      } else {
        wrap.style.aspectRatio = `${W} / ${H}`;
      }

      const layer = document.createElement("div");
      layer.style.cssText = "position:absolute; inset:0;";
      wrap.appendChild(layer);

      const hit = window.matchMedia("(max-width: 991px)").matches ? 40 : 26;
      const groups = LOCATIONS.map((loc, li) => {
        let p = projection ? projection([loc.lon, loc.lat]) : [W * (0.3 + li * 0.15), H * (0.3 + li * 0.12)];
        // Off-map locations (Dubai) sit on the west edge with a label chip
        if (loc.offMap) p = [Math.max(46, Math.min(p[0], 90)), p[1]];
        return { ...loc, x: p[0], y: p[1] };
      });

      const cards = [];
      const glow = ["#F1891A", "#22c3f0", "#ff4fa3", "#7b3ff2"];
      const glow2 = ["#ffd58a", "#7b3ff2", "#F1891A", "#22c3f0"];

      groups.forEach((c, i) => {
        const lx = (c.x / W) * 100, ly = (c.y / H) * 100;
        let ri = 0;
        let hideTimer = null;
        const where = c.offMap ? `${c.label}, ${c.region}` : c.label;

        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Projects in ${where} (${c.projects.length})`);
        dot.style.cssText = `position:absolute; left:${lx}%; top:${ly}%; transform:translate(-50%,-50%); width:${hit}px; height:${hit}px; padding:0; border:none; background:transparent; cursor:pointer; z-index:3; font-family:inherit;`;
        dot.innerHTML =
          `<span style="position:absolute; inset:0; border-radius:9999px; background:rgba(241,137,26,0.22); transform:scale(0.6); transition:transform .22s ease, background .22s ease;"></span>` +
          `<span style="position:absolute; left:50%; top:50%; width:14px; height:14px; margin:-7px 0 0 -7px; border-radius:9999px; background:#F1891A; border:2px solid #fff; box-sizing:border-box; box-shadow:0 2px 8px rgba(241,137,26,0.55); transition:transform .22s ease;"></span>` +
          (c.projects.length > 1 ? `<span style="position:absolute; top:-4px; right:-6px; min-width:17px; height:17px; padding:0 4px; box-sizing:border-box; border-radius:9999px; background:#0037CA; color:#fff; font-size:10px; font-weight:700; line-height:17px; text-align:center; pointer-events:none;">${c.projects.length}</span>` : "") +
          `<span style="position:absolute; left:calc(100% + 2px); top:50%; transform:translateY(-50%); white-space:nowrap; font-size:11.5px; font-weight:600; color:#141420; background:rgba(255,255,255,0.92); border:1px solid #ebebf4; border-radius:9999px; padding:3px 9px; pointer-events:none; box-shadow:0 4px 12px rgba(20,20,32,0.08);">${c.offMap ? "\u2190 " : ""}${where}</span>`;
        const ring = dot.children[0], core = dot.children[1];

        const card = document.createElement("div");
        card.style.cssText = `position:absolute; left:0; top:0; box-sizing:border-box; z-index:4; pointer-events:none; transform:translateY(6px); opacity:0; transition:opacity .2s ease, transform .24s ease; background:#fff; border-radius:20px; padding:22px 22px 24px; overflow:hidden; box-shadow:0 22px 54px rgba(20,20,32,0.16);`;

        const renderCard = () => {
          const pr = c.projects[ri];
          const pager = c.projects.length > 1
            ? `<div style="display:flex; align-items:center; gap:6px; margin-top:2px;">${c.projects.map((_, k) => `<span style="width:${k === ri ? 18 : 6}px; height:6px; border-radius:9999px; background:${k === ri ? "#F1891A" : "#e0e0ec"}; transition:width .2s;"></span>`).join("")}<span style="margin-left:8px; font-size:11px; color:#6b6b8a;">${ri + 1} / ${c.projects.length}</span><button type="button" data-next style="margin-left:auto; font-family:inherit; font-size:12px; font-weight:600; color:#0037CA; background:none; border:none; padding:6px 0; cursor:pointer;">Next \u2192</button></div>`
            : "";
          card.innerHTML =
            `<div style="position:absolute; bottom:-58px; left:-24px; right:-24px; height:170px; filter:blur(40px); opacity:0.7; background:radial-gradient(52% 62% at 60% 80%, ${glow[i % 4]} 0%, transparent 72%), radial-gradient(46% 56% at 24% 92%, ${glow2[i % 4]} 0%, transparent 74%);"></div>` +
            `<div style="position:relative; display:flex; flex-direction:column; gap:14px;">` +
              `<div style="display:flex; align-items:center; gap:8px; white-space:nowrap;"><span style="font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:#F1891A;">${c.label}</span><span style="font-size:11.5px; font-weight:400; color:#6b6b8a;">${c.region}</span></div>` +
              `<div style="display:flex; align-items:center; gap:12px;"><span style="width:42px; height:42px; flex-shrink:0; border-radius:12px; background:#f5f5fa; border:1px solid #ebebf4; color:#0037CA; font-size:13.5px; font-weight:700; display:flex; align-items:center; justify-content:center;">${initials(pr.client)}</span><span style="display:flex; flex-direction:column; gap:2px; min-width:0;"><span style="font-size:16px; font-weight:600; color:#141420; letter-spacing:-0.01em;">${pr.client}</span><span style="font-size:13.5px; font-weight:600; color:#0037CA;">${pr.system}</span></span></div>` +
              `<p style="margin:0; font-size:14px; font-weight:400; color:#3b3b57; line-height:1.6;">${pr.summary}</p>` +
              pager +
            `</div>`;
          const nx = card.querySelector("[data-next]");
          if (nx) nx.addEventListener("click", (e) => { e.stopPropagation(); ri = (ri + 1) % c.projects.length; renderCard(); place(); });
        };

        const place = () => {
          if (isMobile()) {
            if (card.parentNode !== panel) panel.appendChild(card);
            card.style.position = "relative";
            card.style.left = "0"; card.style.top = "0";
            card.style.width = "100%";
            return;
          }
          if (card.parentNode !== layer) layer.insertBefore(card, layer.firstChild);
          card.style.position = "absolute";
          const lw = layer.clientWidth, lh = layer.clientHeight;
          const cw = Math.max(220, Math.min(300, lw - 40));
          card.style.width = cw + "px";
          const px = (lx / 100) * lw, py = (ly / 100) * lh;
          const ch = card.offsetHeight || 200;
          let left = px + 24;
          if (left + cw > lw - 8) left = px - 24 - cw;
          left = Math.max(8, Math.min(left, Math.max(8, lw - cw - 8)));
          let top = py - ch - 16;
          if (top < 8) top = py + 26;
          top = Math.max(8, Math.min(top, Math.max(8, lh - ch - 8)));
          card.style.left = left + "px";
          card.style.top = top + "px";
        };
        const show = () => {
          clearTimeout(hideTimer);
          cards.forEach((o) => { if (o.card !== card) o.hide(); });
          card.style.display = "block";
          place();
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          card.style.pointerEvents = "auto";
          dot.style.zIndex = "5";
          ring.style.transform = "scale(1)";
          ring.style.background = "rgba(241,137,26,0.32)";
          core.style.transform = "scale(1.15)";
          active = card;
        };
        const hide = () => {
          clearTimeout(hideTimer);
          card.style.opacity = "0";
          card.style.transform = "translateY(6px)";
          card.style.pointerEvents = "none";
          if (card.parentNode === panel) card.style.display = "none";
          dot.style.zIndex = "3";
          ring.style.transform = "scale(0.6)";
          ring.style.background = "rgba(241,137,26,0.22)";
          core.style.transform = "scale(1)";
        };
        const scheduleHide = () => {
          if (isMobile()) return; // mobile keeps the last tapped card in the panel
          clearTimeout(hideTimer);
          hideTimer = setTimeout(() => { if (!card.matches(":hover") && !dot.matches(":hover")) hide(); }, 120);
        };
        cards.push({ card, hide, show, place });
        renderCard();
        card.style.display = "none";
        layer.appendChild(card);
        layer.appendChild(dot);

        dot.addEventListener("mouseenter", () => { if (!isMobile()) show(); });
        dot.addEventListener("focus", show);
        dot.addEventListener("click", show);
        dot.addEventListener("mouseleave", scheduleHide);
        card.addEventListener("mouseenter", () => { if (!isMobile()) show(); });
        card.addEventListener("mouseleave", scheduleHide);
        disposers.push(() => clearTimeout(hideTimer));
      });

      let active = null;
      // Open Bengaluru first (most projects), else the first pin
      const first = cards[groups.findIndex((g) => g.label === "Bengaluru")] || cards[0];
      const t = setTimeout(() => first && first.show(), 400);
      disposers.push(() => clearTimeout(t));

      // Re-place the open card on resize (also switches desktop ↔ mobile mode)
      const onResize = () => {
        const open = cards.find((o) => o.card === active && o.card.style.opacity === "1");
        if (open) open.place();
        cards.forEach((o) => { if (o !== open) o.hide(); });
      };
      window.addEventListener("resize", onResize);
      disposers.push(() => window.removeEventListener("resize", onResize));
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(onResize);
        ro.observe(host);
        disposers.push(() => ro.disconnect());
      }

      // Desktop: click outside closes the card
      const onOutside = (e) => {
        if (isMobile() || host.contains(e.target) && e.target !== layer) return;
        cards.forEach((o) => o.hide());
      };
      document.addEventListener("pointerdown", onOutside);
      disposers.push(() => document.removeEventListener("pointerdown", onOutside));
    })();

    return () => {
      cancelled = true;
      disposers.forEach((fn) => fn());
      host.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} style={{ width: "100%", minHeight: 220 }} />;
}
