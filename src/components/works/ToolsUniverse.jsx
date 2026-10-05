// src/components/works/ToolsUniverse.jsx
//
// "The Skyup AI Stack" — a central AI-robot core with 4 clusters of in-house AI
// tools wired to it. Cards expand inline on hover (desktop) / tap (mobile) to
// reveal a live micro-demo. Cosmic theme (#04050C / amber / blue). SSR-safe:
// all DOM/window access is inside useEffect. No external CDN; icons are inline SVG.

import React, { useEffect, useRef, useState } from "react";

/* ---------------- data ---------------- */
const CLUSTERS = [
  {
    pos: "tl", label: "Conversation & Voice", color: "var(--amber)", glow: "rgba(250,159,67,.4)",
    tools: [
      { name: "WhatsApp Automation", sub: "Auto-replies & flows", icon: "chat", demo: "chat" },
      { name: "AI Voice Agent", sub: "Answers & qualifies calls", icon: "mic", demo: "wave" },
      { name: "AI Voice Transcription", sub: "Calls → clean text", icon: "wave", demo: "transcribe" },
    ],
  },
  {
    pos: "tr", label: "Reporting & Insights", color: "var(--blue2)", glow: "rgba(91,140,255,.4)",
    tools: [
      { name: "AI Meta Report Summary", sub: "Ad data → plain English", icon: "bars", demo: "bars" },
      { name: "AI Google Ads Report", sub: "Spend, CPL, ROAS", icon: "gauge", demo: "kpis" },
      { name: "AI Bulk Data Summarizer", sub: "Big sheets → the point", icon: "shrink", demo: "rows" },
    ],
  },
  {
    pos: "bl", label: "Data & Documents", color: "var(--blue3)", glow: "rgba(156,192,255,.4)",
    tools: [
      { name: "AI OCR Data Extraction", sub: "Scans → structured fields", icon: "scan", demo: "doc", chips: ["Name ✓", "GST ✓", "Total ✓"] },
      { name: "AI Invoice Tracker", sub: "Reads & reconciles bills", icon: "receipt", demo: "doc", chips: ["Vendor ✓", "Amount ✓", "Paid ✓"] },
      { name: "AI Delivery Tracker", sub: "Live order status", icon: "truck", demo: "route" },
    ],
  },
  {
    pos: "br", label: "Growth & Ops", color: "var(--blue)", glow: "rgba(46,107,255,.45)",
    tools: [
      { name: "AI Lead Management", sub: "Auto-sorted pipeline", icon: "users", demo: "pipe", cols: [["New", 2], ["Warm", 1], ["Won", 1]] },
      { name: "AI Project Tracker", sub: "Status without asking", icon: "kanban", demo: "pipe", cols: [["To do", 2], ["Doing", 1], ["Done", 2]] },
      { name: "AI Campaign Strategy", sub: "Brief → plan", icon: "spark", demo: "nodes" },
      { name: "AI Ad Creatives", sub: "On-brand variants fast", icon: "images", demo: "tiles" },
    ],
  },
];

/* ---------------- inline icons ---------------- */
function Icon({ name }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "chat": return <svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" /></svg>;
    case "mic": return <svg {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4" /></svg>;
    case "wave": return <svg {...p}><path d="M3 12h2l2-6 3 14 3-10 2 4h6" /></svg>;
    case "bars": return <svg {...p}><path d="M3 21h18M7 21V9M12 21V4M17 21v-7" /></svg>;
    case "gauge": return <svg {...p}><path d="M12 14 15 9M4 20a8 8 0 1 1 16 0" /></svg>;
    case "shrink": return <svg {...p}><path d="M4 6h16M6 10h12M9 14h6M11 18h2" /></svg>;
    case "scan": return <svg {...p}><path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M4 12h16" /></svg>;
    case "receipt": return <svg {...p}><path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1V3l-2 1-2-1-2 1-2-1-2 1zM9 8h6M9 12h6" /></svg>;
    case "truck": return <svg {...p}><path d="M2 6h11v9H2zM13 9h4l3 3v3h-7M6.5 18a1.5 1.5 0 1 0 0 .01M17.5 18a1.5 1.5 0 1 0 0 .01" /></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a5.5 5.5 0 0 0-4-5.3" /></svg>;
    case "kanban": return <svg {...p}><path d="M5 4v16M12 4v10M19 4v7" /><path d="M3 4h4M10 4h4M17 4h4" /></svg>;
    case "spark": return <svg {...p}><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" /></svg>;
    case "images": return <svg {...p}><rect x="3" y="3" width="14" height="14" rx="2" /><path d="M7 21h11a2 2 0 0 0 2-2V8M6 13l3-3 4 4" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

/* ---------------- micro-demos ---------------- */
function Demo({ tool }) {
  switch (tool.demo) {
    case "chat":
      return (
        <div className="tu-screen">
          <div className="tu-b in">Hi, is the 2BHK still available?</div>
          <div className="tu-b out">Yes! Want to book a site visit? 🏠</div>
          <div className="tu-b in">Tomorrow 5pm?</div>
          <div className="tu-b out">Booked ✅ Sending location…</div>
        </div>
      );
    case "wave":
      return (
        <div className="tu-screen"><div className="tu-wave">
          {[0, .1, .2, .3, .15, .25, .05, .35, .2, .1, .3, 0].map((d, i) => <span key={i} style={{ animationDelay: d + "s" }} />)}
        </div></div>
      );
    case "transcribe":
      return (
        <div className="tu-screen">
          <div className="tu-wave" style={{ height: 34 }}>
            {[0, .1, .2, .3, .15, .25, .05, .35].map((d, i) => <span key={i} style={{ animationDelay: d + "s" }} />)}
          </div>
          {["92%", "74%", "84%"].map((w, i) => <div key={i} className="tu-tl" style={{ "--w": w }} />)}
        </div>
      );
    case "bars":
      return (
        <div className="tu-screen"><div className="tu-bars">
          {["45%", "70%", "38%", "88%", "60%"].map((h, i) => <span key={i} style={{ "--h": h }} />)}
        </div></div>
      );
    case "kpis":
      return (
        <div className="tu-screen"><div className="tu-kpis">
          {[["3.4", "x", "", "ROAS"], ["212", "", "₹", "Cost / lead"], ["1284", "", "", "Conversions"], ["38", "%", "", "CPL ↓"]].map((k, i) => (
            <div className="tu-kpi" key={i}><div className="tu-v" data-count={k[0]} data-suf={k[1]} data-pre={k[2]}>{k[2]}0{k[1]}</div><div className="tu-l">{k[3]}</div></div>
          ))}
        </div></div>
      );
    case "rows":
      return (
        <div className="tu-screen"><div className="tu-rows">
          {[0, 1, 2, 3, 4, 5].map(i => <span key={i} />)}<span className="tu-sum" />
        </div></div>
      );
    case "doc":
      return (
        <div className="tu-screen"><div className="tu-doc">
          <div className="tu-row" /><div className="tu-row s" /><div className="tu-row" /><div className="tu-row s" />
          <div className="tu-scan" />
          {(tool.chips || []).map((c, i) => <span key={i} className={"tu-chip c" + (i + 1)}>{c}</span>)}
        </div></div>
      );
    case "route":
      return (
        <div className="tu-screen"><div className="tu-route">
          <svg viewBox="0 0 220 60"><path id={"rt-" + tool.name.replace(/\W/g, "")} d="M10,45 C60,10 120,60 210,18" stroke="var(--tc)" strokeWidth="2" fill="none" strokeDasharray="4 5" />
            <circle r="4" fill="#fff"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href={"#rt-" + tool.name.replace(/\W/g, "")} /></animateMotion></circle></svg>
          <div className="tu-prog">Picked → Transit → 2 stops away</div>
        </div></div>
      );
    case "pipe":
      return (
        <div className="tu-screen"><div className="tu-pipe">
          {(tool.cols || []).map(([label, n], ci) => (
            <div className="tu-col" key={ci}><b>{label}</b>{Array.from({ length: n }).map((_, i) => <div className="tu-lead" key={i} />)}</div>
          ))}
        </div></div>
      );
    case "nodes":
      return (
        <div className="tu-screen"><div className="tu-nodes">
          {[["Goal", 8, 44], ["Aud", 80, 12], ["Budget", 80, 74], ["Plan", 160, 44]].map(([t, x, y], i) => (
            <div className="tu-node" key={i} style={{ left: x, top: y }}>{t}</div>
          ))}
        </div></div>
      );
    case "tiles":
      return (
        <div className="tu-screen"><div className="tu-tiles">
          {[0, 1, 2, 3, 4, 5].map(i => <div className="tu-tile" key={i} />)}
        </div></div>
      );
    default: return null;
  }
}

/* ---------------- component ---------------- */
export default function ToolsUniverse() {
  const rootRef = useRef(null);
  const starRef = useRef(null);
  const stageRef = useRef(null);
  const coreRef = useRef(null);
  const [openKey, setOpenKey] = useState(null);

  /* starfield */
  useEffect(() => {
    const c = starRef.current; if (!c) return;
    const x = c.getContext("2d"); let w, h, st = [], raf;
    const rz = () => {
      w = c.width = c.offsetWidth; h = c.height = c.offsetHeight;
      const n = Math.floor((w * h) / 6500);
      st = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + .2, a: Math.random(), s: Math.random() * .02 + .004 }));
    };
    rz(); window.addEventListener("resize", rz);
    const loop = () => {
      x.clearRect(0, 0, w, h);
      for (const s of st) { s.a += s.s; const o = .35 + Math.abs(Math.sin(s.a)) * .6; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fillStyle = "rgba(210,225,255," + o + ")"; x.fill(); }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", rz); };
  }, []);

  /* connector lines */
  const drawLines = () => {
    const stage = stageRef.current, core = coreRef.current, root = rootRef.current;
    if (!stage || !core || !root || window.innerWidth <= 820) return;
    const sb = stage.getBoundingClientRect(), cb = core.getBoundingClientRect();
    const cx = cb.left + cb.width / 2 - sb.left, cy = cb.top + cb.height / 2 - sb.top;
    CLUSTERS.forEach(({ pos, color }) => {
      const cl = root.querySelector('.tu-cluster[data-pos="' + pos + '"]');
      const path = root.querySelector("#tu-p-" + pos);
      if (!cl || !path) return;
      const b = cl.querySelector(".tu-clhead").getBoundingClientRect();
      const tx = b.left + b.width / 2 - sb.left, ty = b.top + b.height / 2 - sb.top;
      const mx = (cx + tx) / 2;
      path.setAttribute("d", `M${cx},${cy} C${mx},${cy} ${mx},${ty} ${tx},${ty}`);
      path.setAttribute("stroke", getComputedStyle(cl).getPropertyValue("--tc").trim() || "#5b8cff");
    });
  };

  /* reveal + lines */
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    let done = false;
    const reveal = () => { if (done) return; done = true; root.classList.add("tu-in"); setTimeout(drawLines, 120); };
    const io = ("IntersectionObserver" in window)
      ? new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { reveal(); io.disconnect(); } }), { threshold: .18 })
      : null;
    if (io) io.observe(stageRef.current || root); else reveal();
    const onResize = () => drawLines();
    window.addEventListener("resize", onResize);
    const t = setTimeout(reveal, 1600); // safety
    return () => { if (io) io.disconnect(); window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  /* KPI counters */
  const animateCounters = (card) => {
    card.querySelectorAll(".tu-kpi .tu-v[data-count]").forEach((el) => {
      const t = parseFloat(el.dataset.count), pre = el.dataset.pre || "", suf = el.dataset.suf || "", dec = t % 1 ? 1 : 0;
      let s = null;
      const step = (ts) => { if (!s) s = ts; const p = Math.min((ts - s) / 900, 1); el.textContent = pre + (t * p).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  };

  const onEnter = (e) => { if (window.innerWidth > 820) { animateCounters(e.currentTarget); [80, 300, 460].forEach(d => setTimeout(drawLines, d)); } };
  const onLeave = () => { if (window.innerWidth > 820) [80, 300, 460].forEach(d => setTimeout(drawLines, d)); };
  const onTap = (key, card) => {
    if (window.innerWidth > 820) return;
    setOpenKey((k) => (k === key ? null : key));
    if (openKey !== key) setTimeout(() => animateCounters(card), 40);
  };

  return (
    <section className="tu" ref={rootRef} aria-label="The Skyup AI Stack">
      <style>{CSS}</style>
      <canvas className="tu-stars" ref={starRef} />
      <div className="tu-wrap">
        <div className="tu-head">
          <div className="tu-eyebrow tu-rev">Built in-house at Skyup</div>
          <h2 className="tu-title tu-rev" data-d="1">The <span className="tu-g">Skyup AI Stack</span></h2>
          <p className="tu-sub tu-rev" data-d="2">The AI systems we've built and run in production — the engines behind the campaigns, reports, and workflows we deliver for clients. Hover any tool to see it work.</p>
          <div className="tu-legend tu-rev" data-d="3">
            {CLUSTERS.map((c) => <span key={c.pos}><i className="tu-dot" style={{ background: c.color }} />{c.label}</span>)}
          </div>
        </div>

        <div className="tu-stage" ref={stageRef}>
          <svg className="tu-lines" aria-hidden="true">
            {CLUSTERS.map((c) => <path key={c.pos} id={"tu-p-" + c.pos} />)}
          </svg>

          <div className="tu-core tu-rev" ref={coreRef}>
            <div className="tu-ring" /><div className="tu-ring r2" />
            <div className="tu-node">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <line x1="32" y1="5" x2="32" y2="14" stroke="var(--amber)" strokeWidth="2" />
                <circle cx="32" cy="4" r="3" fill="var(--amber2)" />
                <rect x="10" y="24" width="4.5" height="11" rx="2.2" fill="var(--blue2)" />
                <rect x="49.5" y="24" width="4.5" height="11" rx="2.2" fill="var(--blue2)" />
                <rect x="14" y="14" width="36" height="31" rx="10" fill="#0b1428" stroke="var(--blue2)" strokeWidth="2" />
                <circle className="tu-eye" cx="25" cy="29" r="3.6" fill="var(--amber2)" />
                <circle className="tu-eye" cx="39" cy="29" r="3.6" fill="var(--amber2)" />
                <rect x="24" y="37" width="16" height="3" rx="1.5" fill="var(--blue3)" opacity=".75" />
                <rect x="20" y="45" width="24" height="8" rx="3" fill="#0b1428" stroke="var(--blue2)" strokeWidth="1.6" />
              </svg>
              <span className="tu-cap">Skyup<b>AI CORE</b></span>
            </div>
          </div>

          {CLUSTERS.map((c, ci) => (
            <div key={c.pos} className="tu-cluster tu-rev" data-pos={c.pos} data-d={ci + 1}
              style={{ "--tc": c.color, "--tglow": c.glow }}>
              <div className="tu-clhead"><i className="tu-cdot" style={{ background: c.color }} /><h3>{c.label}</h3><small>{c.tools.length}</small></div>
              <div className="tu-cards">
                {c.tools.map((t) => {
                  const key = c.pos + "-" + t.name;
                  return (
                    <div key={key} className={"tu-tool" + (openKey === key ? " tu-open" : "")}
                      style={{ "--tc": c.color }}
                      onMouseEnter={onEnter} onMouseLeave={onLeave}
                      onClick={(e) => onTap(key, e.currentTarget)}>
                      <span className="tu-ic"><Icon name={t.icon} /></span>
                      <span className="tu-nm">{t.name}<small>{t.sub}</small></span>
                      <span className="tu-arr">→</span>
                      <div className="tu-demo">
                        <div className="tu-dh"><b>{t.name}</b><i>live</i></div>
                        <Demo tool={t} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- scoped styles ---------------- */
const CSS = `
.tu{position:relative;overflow:hidden;background:#04050C;
  --amber:#FA9F43;--amber2:#ffb950;--blue:#2E6BFF;--blue2:#5b8cff;--blue3:#9cc0ff;--ink:#eaf0ff;--mut:#8b93b0;--line:rgba(255,255,255,.10)}
.tu *{box-sizing:border-box}
.tu-stars{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.tu-wrap{position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:clamp(48px,7vw,110px) clamp(18px,4vw,40px);color:var(--ink);
  font-family:"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.tu-head{text-align:center;margin-bottom:clamp(28px,5vw,64px)}
.tu-eyebrow{font-size:.74rem;letter-spacing:.34em;text-transform:uppercase;color:var(--amber);font-weight:700}
.tu-title{font-size:clamp(1.9rem,4.4vw,3.2rem);line-height:1.05;letter-spacing:-.02em;margin:.7rem 0 0;font-weight:700}
.tu-g{background:linear-gradient(90deg,var(--amber),var(--blue2));-webkit-background-clip:text;background-clip:text;color:transparent}
.tu-sub{color:var(--mut);max-width:60ch;margin:1rem auto 0;font-size:clamp(.98rem,1.4vw,1.12rem);line-height:1.6}
.tu-legend{display:flex;gap:1.1rem;justify-content:center;flex-wrap:wrap;margin-top:1.4rem;font-size:.8rem;color:var(--mut)}
.tu-legend span{display:inline-flex;align-items:center;gap:.45rem}
.tu-dot{width:9px;height:9px;border-radius:50%}

.tu-stage{position:relative;display:grid;gap:clamp(18px,3vw,40px);grid-template-columns:1fr auto 1fr;grid-template-rows:auto auto;align-items:center;justify-items:center}
.tu-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible}
.tu-lines path{fill:none;stroke-width:1.4;opacity:.5;stroke-linecap:round;stroke-dasharray:6 10;animation:tuflow 1.6s linear infinite}
@keyframes tuflow{to{stroke-dashoffset:-32}}

.tu-core{grid-column:2;grid-row:1 / span 2;position:relative;width:clamp(150px,17vw,220px);aspect-ratio:1;display:grid;place-items:center}
.tu-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(155,192,255,.35);animation:tuspin 14s linear infinite}
.tu-ring.r2{inset:-9%;border-color:rgba(250,159,67,.28);animation-duration:22s;animation-direction:reverse}
.tu-ring::before{content:"";position:absolute;top:-4px;left:50%;width:7px;height:7px;border-radius:50%;background:var(--blue3);box-shadow:0 0 10px var(--blue2)}
.tu-node{position:absolute;inset:11%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  background:radial-gradient(circle at 40% 32%,#16264a 0%,#0a1226 46%,#05060f 100%);border:1px solid rgba(155,192,255,.35);
  box-shadow:0 0 55px 6px rgba(250,159,67,.30),0 0 130px 26px rgba(46,107,255,.32),inset 0 0 42px rgba(46,107,255,.20);animation:tubreathe 3.6s ease-in-out infinite}
.tu-node svg{width:46%;height:46%;filter:drop-shadow(0 0 9px rgba(250,159,67,.55));animation:tufloat 4s ease-in-out infinite}
.tu-eye{transform-origin:center;transform-box:fill-box;animation:tublink 3.6s infinite}
.tu-cap{font-size:.58rem;letter-spacing:.24em;text-transform:uppercase;color:var(--amber2);font-weight:700;line-height:1.1;text-align:center}
.tu-cap b{display:block;color:#fff;font-size:.8rem;letter-spacing:.08em}
@keyframes tubreathe{0%,100%{transform:scale(1);filter:brightness(1)}50%{transform:scale(1.055);filter:brightness(1.12)}}
@keyframes tuspin{to{transform:rotate(360deg)}}
@keyframes tublink{0%,92%,100%{transform:scaleY(1)}95%,97%{transform:scaleY(.12)}}
@keyframes tufloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

.tu-cluster{position:relative;width:100%;max-width:340px}
.tu-cluster[data-pos="tl"]{grid-column:1;grid-row:1;justify-self:end}
.tu-cluster[data-pos="tr"]{grid-column:3;grid-row:1;justify-self:start}
.tu-cluster[data-pos="bl"]{grid-column:1;grid-row:2;justify-self:end}
.tu-cluster[data-pos="br"]{grid-column:3;grid-row:2;justify-self:start}
.tu-clhead{display:flex;align-items:center;gap:.6rem;margin-bottom:.7rem}
.tu-cdot{width:10px;height:10px;border-radius:50%}
.tu-clhead h3{font-size:.98rem;margin:0;font-weight:600}
.tu-clhead small{color:var(--mut);font-size:.72rem;margin-left:auto}
.tu-cards{display:flex;flex-direction:column;gap:.55rem}

.tu-tool{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:.7rem;padding:.7rem .8rem;border-radius:12px;cursor:pointer;
  background:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px solid var(--line);
  transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .25s,box-shadow .25s,background .25s}
.tu-tool:hover{transform:translateY(-2px) scale(1.015);border-color:var(--tc,rgba(255,255,255,.3));
  box-shadow:0 14px 40px -18px rgba(0,0,0,.6);background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}
.tu-ic{width:34px;height:34px;border-radius:9px;flex:none;display:grid;place-items:center;background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--tc,#fff)}
.tu-nm{font-size:.86rem;font-weight:500;line-height:1.25}
.tu-nm small{display:block;color:var(--mut);font-weight:400;font-size:.7rem;margin-top:1px}
.tu-arr{margin-left:auto;color:var(--mut);opacity:.6;transition:transform .25s}
.tu-tool:hover .tu-arr{transform:translateX(3px);opacity:1;color:var(--tc,#fff)}

.tu-demo{flex:0 0 100%;max-width:100%;max-height:0;overflow:hidden;opacity:0;margin-top:0;padding:0 12px;border-radius:12px;
  background:linear-gradient(180deg,#0d1122,#070912);border:1px solid transparent;
  transition:max-height .4s cubic-bezier(.2,.7,.2,1),opacity .3s,margin-top .3s,padding .3s,border-color .3s}
.tu-tool:hover .tu-demo{max-height:230px;opacity:1;margin-top:10px;padding:12px;border-color:var(--tc,var(--line))}
.tu-dh{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.tu-dh b{font-size:.72rem}
.tu-dh i{font-style:normal;font-size:.6rem;color:var(--tc);border:1px solid var(--tc);border-radius:20px;padding:2px 7px;opacity:.8}
.tu-screen{height:118px;border-radius:9px;background:#05070f;border:1px solid rgba(255,255,255,.06);overflow:hidden;position:relative;padding:8px}

.tu-b{max-width:80%;padding:5px 8px;border-radius:9px;font-size:.62rem;margin-bottom:5px;opacity:0;transform:translateY(4px);animation:tupop .4s forwards}
.tu-b.in{background:#12203a;border:1px solid #1e3a63}
.tu-b.out{background:var(--amber);color:#231204;margin-left:auto}
.tu-tool:hover .tu-b:nth-child(1){animation-delay:.1s}.tu-tool:hover .tu-b:nth-child(2){animation-delay:.6s}
.tu-tool:hover .tu-b:nth-child(3){animation-delay:1.15s}.tu-tool:hover .tu-b:nth-child(4){animation-delay:1.7s}
@keyframes tupop{to{opacity:1;transform:none}}
.tu-wave{display:flex;align-items:center;gap:3px;height:100%;justify-content:center}
.tu-wave span{width:4px;border-radius:3px;background:linear-gradient(var(--amber2),var(--blue2));animation:tuwv 1s ease-in-out infinite}
@keyframes tuwv{0%,100%{height:12%}50%{height:82%}}
.tu-tl{height:7px;border-radius:4px;background:linear-gradient(90deg,var(--tc),transparent);margin:7px 4px;width:0;animation:tugrow 1s forwards}
.tu-tool:hover .tu-tl:nth-child(2){animation-delay:.3s}.tu-tool:hover .tu-tl:nth-child(3){animation-delay:.7s}.tu-tool:hover .tu-tl:nth-child(4){animation-delay:1.1s}
@keyframes tugrow{to{width:var(--w,90%)}}
.tu-bars{display:flex;align-items:flex-end;gap:7px;height:100%;padding:6px 2px}
.tu-bars span{flex:1;border-radius:4px 4px 0 0;background:linear-gradient(var(--tc),transparent);height:8%;animation:tubar .9s forwards cubic-bezier(.2,.8,.2,1)}
.tu-tool:hover .tu-bars span:nth-child(1){animation-delay:.15s}.tu-tool:hover .tu-bars span:nth-child(2){animation-delay:.3s}
.tu-tool:hover .tu-bars span:nth-child(3){animation-delay:.45s}.tu-tool:hover .tu-bars span:nth-child(4){animation-delay:.6s}.tu-tool:hover .tu-bars span:nth-child(5){animation-delay:.75s}
@keyframes tubar{to{height:var(--h,60%)}}
.tu-kpis{display:grid;grid-template-columns:1fr 1fr;gap:8px;height:100%;align-content:center}
.tu-kpi{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:8px;padding:8px}
.tu-kpi .tu-v{font-size:1rem;font-weight:700;color:var(--tc)}
.tu-kpi .tu-l{font-size:.55rem;color:var(--mut);margin-top:2px}
.tu-doc{height:100%;background:#0b0f1c;border-radius:6px;position:relative;padding:9px}
.tu-doc .tu-row{height:5px;background:rgba(255,255,255,.12);border-radius:3px;margin:6px 0;width:88%}
.tu-doc .tu-row.s{width:55%}
.tu-scan{position:absolute;left:0;right:0;height:16px;top:0;background:linear-gradient(180deg,transparent,rgba(155,192,255,.35),transparent);border-top:1px solid var(--blue3);animation:tuscan 2s ease-in-out infinite}
@keyframes tuscan{0%,100%{top:0}50%{top:calc(100% - 16px)}}
.tu-chip{position:absolute;right:8px;font-size:.52rem;background:var(--tc);color:#04121a;border-radius:6px;padding:2px 6px;opacity:0;animation:tupop .4s forwards}
.tu-tool:hover .tu-chip.c1{top:16px;animation-delay:.7s}.tu-tool:hover .tu-chip.c2{top:44px;animation-delay:1.1s}.tu-tool:hover .tu-chip.c3{top:72px;animation-delay:1.5s}
.tu-route{position:relative;height:100%;display:grid;place-items:center}
.tu-route svg{width:100%}
.tu-prog{font-size:.6rem;color:var(--mut);position:absolute;bottom:4px;left:8px}
.tu-rows span{display:block;height:5px;border-radius:3px;background:rgba(255,255,255,.12);margin:4px 0;animation:tufade 2s infinite}
.tu-rows .tu-sum{height:9px;background:linear-gradient(90deg,var(--tc),transparent);margin-top:9px}
@keyframes tufade{0%,45%{opacity:1}70%,100%{opacity:.25}}
.tu-pipe{display:flex;gap:6px;height:100%}
.tu-col{flex:1;background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:7px;padding:5px}
.tu-col b{font-size:.5rem;color:var(--mut);display:block;margin-bottom:5px;text-transform:uppercase;letter-spacing:.08em}
.tu-lead{height:12px;border-radius:4px;background:var(--tc);opacity:.85;margin-bottom:4px;animation:tuslide .6s both}
.tu-tool:hover .tu-col:nth-child(2) .tu-lead{animation-delay:.5s}.tu-tool:hover .tu-col:nth-child(3) .tu-lead{animation-delay:1s}
@keyframes tuslide{from{opacity:0;transform:translateX(-8px)}to{opacity:.85;transform:none}}
.tu-nodes{position:relative;height:100%}
.tu-node.tu-node{}
.tu-nodes .tu-node{position:absolute;width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid var(--tc);display:grid;place-items:center;font-size:.55rem;color:var(--tc);opacity:0;inset:auto;animation:tupop .5s forwards;box-shadow:none}
.tu-tool:hover .tu-nodes .tu-node:nth-child(1){animation-delay:.2s}.tu-tool:hover .tu-nodes .tu-node:nth-child(2){animation-delay:.5s}
.tu-tool:hover .tu-nodes .tu-node:nth-child(3){animation-delay:.8s}.tu-tool:hover .tu-nodes .tu-node:nth-child(4){animation-delay:1.1s}
.tu-tiles{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;height:100%;padding:4px}
.tu-tile{border-radius:6px;background:linear-gradient(135deg,var(--tc),#0a1024);position:relative;overflow:hidden;animation:tushuf 2.4s infinite}
.tu-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.4) 50%,transparent 70%);transform:translateX(-120%);animation:tushine 1.6s infinite}
.tu-tool:hover .tu-tile:nth-child(2){animation-delay:.3s}.tu-tool:hover .tu-tile:nth-child(3){animation-delay:.6s}
@keyframes tushuf{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes tushine{to{transform:translateX(120%)}}

.tu-rev{opacity:0;transform:translateY(24px)}
.tu.tu-in .tu-rev{opacity:1;transform:none;transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.tu.tu-in .tu-rev[data-d="1"]{transition-delay:.1s}.tu.tu-in .tu-rev[data-d="2"]{transition-delay:.2s}
.tu.tu-in .tu-rev[data-d="3"]{transition-delay:.3s}.tu.tu-in .tu-rev[data-d="4"]{transition-delay:.4s}
.tu-core.tu-rev{transform:scale(.6);opacity:0}
.tu.tu-in .tu-core.tu-rev{transform:scale(1);opacity:1;transition:opacity .9s,transform .9s cubic-bezier(.2,.8,.2,1)}

@media(max-width:820px){
  /* Reflow the desktop constellation into a clean vertical stack.
     The key fix: reset grid-row too, or the desktop corner rules (tl/tr=row1,
     bl/br=row2) leave two clusters sharing one cell and overlapping. */
  .tu-stage{grid-template-columns:1fr !important;grid-template-rows:auto !important;gap:26px}
  .tu-core{grid-column:1 !important;grid-row:auto !important;margin:0 auto 20px !important}
  .tu-cluster{grid-column:1 !important;grid-row:auto !important;justify-self:stretch !important;max-width:520px;width:100%;margin-inline:auto}
  .tu-cluster[data-pos]{grid-column:1 !important;grid-row:auto !important;justify-self:stretch !important}
  .tu-lines{display:none}
  .tu-tool:hover{transform:none}
  .tu-tool:hover .tu-demo{max-height:0;opacity:0;margin-top:0;padding:0 12px;border-color:transparent}
  .tu-tool.tu-open{transform:translateY(-2px);border-color:var(--tc,rgba(255,255,255,.3))}
  .tu-tool.tu-open .tu-demo{max-height:240px;opacity:1;margin-top:10px;padding:12px;border-color:var(--tc,var(--line))}
}
@media(prefers-reduced-motion:reduce){
  .tu *{animation:none !important}
  .tu-rev{opacity:1 !important;transform:none !important}
}
`;
