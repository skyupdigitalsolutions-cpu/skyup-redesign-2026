// src/components/CustomSoftwareMap.jsx
// Interactive dotted India map with hoverable client-review pins.
// SSR/prerender-safe: all D3/topojson work happens in useEffect (client only).
// D3 + topojson are loaded from CDN on demand and cached on window.
import React, { useEffect, useRef } from "react";

const W = 1000;
const H = 620;
const ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

// 10 cities across India. Bengaluru carries 3 reviews (paged inside its card).
const CITIES = [
  { city: "Mumbai", state: "Maharashtra", lon: 72.8777, lat: 19.076, reviews: [
    { initials: "RM", name: "Rahul Mehta", role: "Director, Manufacturing", quote: "Our order and inventory tracking used to run on spreadsheets. The custom system now handles it end to end." },
  ] },
  { city: "Pune", state: "Maharashtra", lon: 73.8567, lat: 18.5204, reviews: [
    { initials: "VD", name: "Vikram Deshpande", role: "COO, Auto Components", quote: "Approvals that took days now clear in hours. The automation paid for itself in a quarter." },
  ] },
  { city: "New Delhi", state: "Delhi NCR", lon: 77.209, lat: 28.6139, reviews: [
    { initials: "AN", name: "Anita Nair", role: "Head of Sales, B2B Services", quote: "The CRM was built around our follow-up process instead of forcing us into someone else\u2019s." },
  ] },
  { city: "Jaipur", state: "Rajasthan", lon: 75.7873, lat: 26.9124, reviews: [
    { initials: "PS", name: "Pooja Sharma", role: "Founder, Retail Chain", quote: "One dashboard for every store. We finally see stock and sales in real time." },
  ] },
  { city: "Ahmedabad", state: "Gujarat", lon: 72.5714, lat: 23.0225, reviews: [
    { initials: "HP", name: "Harsh Patel", role: "MD, Textiles", quote: "They understood our production floor before writing code. The software actually fits how we work." },
  ] },
  { city: "Kolkata", state: "West Bengal", lon: 88.3639, lat: 22.5726, reviews: [
    { initials: "SB", name: "Sourav Banerjee", role: "Director, Logistics", quote: "Live shipment tracking cut our customer-support calls by half." },
  ] },
  { city: "Hyderabad", state: "Telangana", lon: 78.4867, lat: 17.385, reviews: [
    { initials: "KR", name: "Kavya Reddy", role: "VP Ops, Healthcare", quote: "Patient scheduling and billing in one system \u2014 no more double entry." },
  ] },
  { city: "Bengaluru", state: "Karnataka", lon: 77.5946, lat: 12.9716, reviews: [
    { initials: "SK", name: "Sandeep Kulkarni", role: "Founder, Logistics", quote: "They understood how our operations actually work before writing any code \u2014 that made it usable." },
    { initials: "MG", name: "Meera Gowda", role: "CEO, EdTech", quote: "From idea to launch in ten weeks. The team felt like our own engineering department." },
    { initials: "AV", name: "Arjun Verma", role: "Head of Product, SaaS", quote: "Scalable from day one \u2014 we tripled users without touching the architecture." },
  ] },
  { city: "Chennai", state: "Tamil Nadu", lon: 80.2707, lat: 13.0827, reviews: [
    { initials: "LS", name: "Lakshmi Subramanian", role: "Director, Exports", quote: "Custom reporting gave us numbers our old tools never could." },
  ] },
  { city: "Kochi", state: "Kerala", lon: 76.2673, lat: 9.9312, reviews: [
    { initials: "TJ", name: "Thomas Joseph", role: "Owner, Hospitality", quote: "Bookings, staff and inventory in one place. Simple enough that everyone actually uses it." },
  ] },
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some((s) => s.src === src)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
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

    (async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js");
      } catch (_) { /* offline: dots-only fallback below */ }
      if (cancelled || !hostRef.current) return;

      const d3 = window.d3;
      host.innerHTML = "";

      let india = null;
      if (d3 && window.topojson) {
        try {
          const topo = await d3.json(ATLAS);
          const countries = window.topojson.feature(topo, topo.objects.countries);
          india = countries.features.find((f) => f.properties && f.properties.name === "India");
        } catch (_) { /* fall through */ }
      }
      if (cancelled) return;

      const wrap = document.createElement("div");
      wrap.style.cssText = "position:relative;width:100%;";
      host.appendChild(wrap);

      let projection = null;
      if (india && d3) {
        projection = d3.geoMercator().fitExtent([[40, 30], [W - 40, H - 30]], india);
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
        wrap.style.minHeight = "420px";
      }

      const layer = document.createElement("div");
      layer.style.cssText = "position:absolute; inset:0;";
      wrap.appendChild(layer);

      // Cluster pins that would visually overlap (pixel-space, responsive).
      const hit = window.matchMedia("(max-width: 991px)").matches ? 44 : 24;
      const layerPx = wrap.clientWidth || W;
      const MIN_GAP = Math.max(30, hit * (W / layerPx) * 1.1);
      const groups = [];
      CITIES.forEach((city, ci) => {
        const p = projection ? projection([city.lon, city.lat]) : [W * (0.2 + ci * 0.07), H * (0.25 + ci * 0.06)];
        const near = groups.find((g) => Math.hypot(g.x - p[0], g.y - p[1]) < MIN_GAP);
        const entries = city.reviews.map((rv) => ({ ...rv, city: city.city, state: city.state }));
        if (near) { near.reviews.push(...entries); near.cities.push(city.city); }
        else groups.push({ x: p[0], y: p[1], cities: [city.city], reviews: entries });
      });

      const cards = [];
      const glow = ["#F1891A", "#22c3f0", "#ff4fa3"];
      const glow2 = ["#ffd58a", "#7b3ff2", "#F1891A"];

      groups.forEach((c, i) => {
        const lx = (c.x / W) * 100, ly = (c.y / H) * 100;
        let ri = 0;

        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Reviews from ${c.cities.join(" and ")} (${c.reviews.length})`);
        dot.style.cssText = `position:absolute; left:${lx}%; top:${ly}%; transform:translate(-50%,-50%); width:${hit}px; height:${hit}px; padding:0; border:none; background:transparent; cursor:pointer; z-index:3;`;
        dot.innerHTML = `<span style="position:absolute; inset:0; border-radius:9999px; background:rgba(241,137,26,0.22); transform:scale(0.55); transition:transform .22s ease, background .22s ease;"></span><span style="position:absolute; left:50%; top:50%; width:13px; height:13px; margin:-6.5px 0 0 -6.5px; border-radius:9999px; background:#F1891A; box-shadow:0 2px 8px rgba(241,137,26,0.55); transition:transform .22s ease;"></span>`;

        const card = document.createElement("div");
        const cardW = Math.max(210, Math.min(290, (wrap.clientWidth || 320) - 40));
        card.style.cssText = `position:absolute; left:0; top:0; width:${cardW}px; box-sizing:border-box; z-index:4; pointer-events:none; transform:translateY(6px); opacity:0; transition:opacity .2s ease, transform .24s ease; background:#fff; border-radius:20px; padding:22px 22px 26px; overflow:hidden; box-shadow:0 22px 54px rgba(20,20,32,0.16);`;

        const renderCard = () => {
          const rv = c.reviews[ri];
          const pager = c.reviews.length > 1
            ? `<div style="display:flex; align-items:center; gap:6px; margin-top:4px;">${c.reviews.map((_, k) => `<span style="width:${k === ri ? 18 : 6}px; height:6px; border-radius:9999px; background:${k === ri ? "#F1891A" : "#e0e0ec"}; transition:width .2s;"></span>`).join("")}<span style="margin-left:auto; font-size:11px; font-weight:600; color:#0037CA; cursor:pointer;" data-next>Next \u2192</span></div>`
            : "";
          card.innerHTML = `<div style="position:absolute; bottom:-58px; left:-24px; right:-24px; height:190px; filter:blur(40px); opacity:0.8; background:radial-gradient(52% 62% at 60% 80%, ${glow[i % 3]} 0%, transparent 72%), radial-gradient(46% 56% at 24% 92%, ${glow2[i % 3]} 0%, transparent 74%);"></div><div style="position:relative; display:flex; flex-direction:column; gap:16px;"><div style="display:flex; align-items:center; gap:8px; white-space:nowrap;"><span style="font-size:11px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:#F1891A;">${rv.city}</span><span style="font-size:11.5px; font-weight:400; color:#6b6b8a;">${rv.state}</span></div><p style="margin:0; font-size:16px; font-weight:400; color:#141420; line-height:1.5; letter-spacing:-0.01em;">\u201C${rv.quote}\u201D</p><div style="display:flex; align-items:center; gap:11px;"><span style="width:38px; height:38px; border-radius:9999px; background:#f5f5fa; border:1px solid #ebebf4; color:#0037CA; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center;">${rv.initials}</span><span style="display:flex; flex-direction:column;"><span style="font-size:14px; font-weight:500; color:#141420;">${rv.name}</span><span style="font-size:12px; font-weight:400; color:#6b6b8a;">${rv.role}</span></span></div>${pager}</div>`;
          const nx = card.querySelector("[data-next]");
          if (nx) nx.addEventListener("click", (e) => { e.stopPropagation(); ri = (ri + 1) % c.reviews.length; renderCard(); });
        };
        renderCard();

        const place = () => {
          const lw = layer.clientWidth, lh = layer.clientHeight;
          const px = (lx / 100) * lw, py = (ly / 100) * lh;
          const cw = card.offsetWidth || cardW, ch = card.offsetHeight || 200;
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
          cards.forEach((o) => o.hide());
          place();
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          dot.style.zIndex = "5";
          dot.firstElementChild.style.transform = "scale(1)";
          dot.firstElementChild.style.background = "rgba(241,137,26,0.3)";
          dot.lastElementChild.style.transform = "scale(1.15)";
        };
        const hide = () => {
          card.style.opacity = "0";
          card.style.transform = "translateY(6px)";
          dot.style.zIndex = "3";
          dot.firstElementChild.style.transform = "scale(0.55)";
          dot.firstElementChild.style.background = "rgba(241,137,26,0.22)";
          dot.lastElementChild.style.transform = "scale(1)";
        };
        cards.push({ hide });

        dot.addEventListener("mouseenter", show);
        dot.addEventListener("focus", show);
        dot.addEventListener("click", show);
        dot.addEventListener("mouseleave", () => setTimeout(() => { if (!card.matches(":hover")) hide(); }, 90));
        card.style.pointerEvents = "auto";
        card.addEventListener("mouseenter", show);

        layer.appendChild(card);
        layer.appendChild(dot);
        window.addEventListener("resize", () => { if (card.style.opacity === "1") place(); });
        if (window.ResizeObserver) new ResizeObserver(() => { if (card.style.opacity === "1") place(); }).observe(layer);
        if (i === 0) setTimeout(show, 400);
      });
    })();

    return () => { cancelled = true; };
  }, []);

  return <div ref={hostRef} style={{ width: "100%" }} />;
}
