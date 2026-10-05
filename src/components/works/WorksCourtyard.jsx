// src/components/works/WorksCourtyard.jsx
//
// SKYUP Works — "The Hidden Courtyard".
// A gate opens on load to reveal a moonlit stone courtyard. A glowing fountain
// sits at the center; 7 pedestals stand around it, each holding a pulsing amber
// orb. Hover (or tap) an orb and it blooms into the project — screenshot + label
// (client, title, top metric) — linking to /work/<slug>.
//
// Desktop: depth-arranged scene with subtle mouse parallax.
// Mobile:  clean vertical stack of the same pedestal cards.
//
// Assets: /images/courtyard/{courtyard-bg,fountain,pedestal,gate}.png
// Data:   @/data/caseStudies (first 7)

import React, { useEffect, useRef, useState } from "react";
import { CASE_STUDIES } from "@/data/caseStudies";

const BASE = "/images/courtyard";
const ITEMS = CASE_STUDIES.slice(0, 7);

// pedestal placements on the courtyard floor (percent of stage), with depth scale.
// order matches ITEMS; back row smaller/higher, front row larger/lower.
const SPOTS = [
  { x: 39, y: 44, s: 0.72, z: 1 }, // back-left
  { x: 61, y: 44, s: 0.72, z: 1 }, // back-right
  { x: 23, y: 56, s: 0.86, z: 2 }, // mid-left
  { x: 77, y: 56, s: 0.86, z: 2 }, // mid-right
  { x: 15, y: 70, s: 1.0,  z: 3 }, // front-left
  { x: 50, y: 72, s: 1.05, z: 3 }, // front-center
  { x: 85, y: 70, s: 1.0,  z: 3 }, // front-right
];

export default function WorksCourtyard() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [open, setOpen] = useState(false);   // gate open
  const [active, setActive] = useState(-1);  // which pedestal is revealed (mobile/tap)

  useEffect(() => {
    // open the gate shortly after mount
    const t = setTimeout(() => setOpen(true), 450);

    // subtle mouse parallax on desktop
    const root = rootRef.current, stage = stageRef.current;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 2;  // -1..1
      ty = (e.clientY / h - 0.5) * 2;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      if (root) root.style.setProperty("--px", cx.toFixed(3));
      if (root) root.style.setProperty("--py", cy.toFixed(3));
    };
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (fine) { window.addEventListener("mousemove", onMove); raf = requestAnimationFrame(loop); }

    return () => { clearTimeout(t); cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <section ref={rootRef} className={"cy" + (open ? " cy--open" : "")}>
      <style>{CSS}</style>

      {/* intro copy */}
      <div className="cy-intro">
        <span className="cy-eyebrow">The Hidden Courtyard</span>
        <h2 className="cy-title">Our finest work, on display</h2>
        <p className="cy-sub">Step past the gate — a private collection of things we’ve built.</p>
      </div>

      {/* the moonlit scene */}
      <div className="cy-scene">
        <div className="cy-bg" />
        <img className="cy-fountain" src={`${BASE}/fountain.png`} alt="" aria-hidden="true" />

        <div ref={stageRef} className="cy-stage">
          {ITEMS.map((s, i) => {
            const spot = SPOTS[i] || SPOTS[SPOTS.length - 1];
            const m = s.metrics && s.metrics[0];
            const isOn = active === i;
            return (
              <a
                key={s.slug}
                href={`/work/${s.slug}`}
                className={"cy-ped depth-" + spot.z + (isOn ? " is-on" : "")}
                style={{ left: spot.x + "%", top: spot.y + "%", "--s": spot.s, "--z": spot.z }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? -1 : a))}
                onClick={(e) => { if (window.matchMedia("(pointer:coarse)").matches && !isOn) { e.preventDefault(); setActive(i); } }}
              >
                <div className="cy-piece">
                  {/* the reveal: project screenshot */}
                  {/* the resting orb */}
                  <div className="cy-orb" aria-hidden="true"><span /></div>
                  {/* the reveal: project screenshot */}
                  <div className="cy-shot">
                    <img src={s.image} alt={s.title} loading="lazy" />
                  </div>
                </div>

                <div className="cy-plinth" />

                <div className="cy-label">
                  <span className="cy-client">{s.client}</span>
                  <span className="cy-name">{s.title}</span>
                  {m ? <span className="cy-metric">{m.value} · {m.label}</span> : <span className="cy-metric cy-metric--view">View project →</span>}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* gate that opens on load */}
      <div className="cy-gate" aria-hidden="true">
        <div className="cy-gate-half l" />
        <div className="cy-gate-half r" />
      </div>
    </section>
  );
}

const CSS = `
.cy{ position:relative; background:#04050C; --amber:#FA9F43; --blue:#5b8cff; overflow:hidden; }

/* intro copy */
.cy-intro{ position:relative; z-index:2; text-align:center; padding:8vh 6vw 1vh; }
.cy-eyebrow{ color:var(--amber); font-size:.72rem; font-weight:700; letter-spacing:.34em; text-transform:uppercase; }
.cy-title{ color:#fff; font-size:clamp(1.9rem,4vw,3rem); font-weight:700; letter-spacing:-.02em; margin:.5rem 0 .4rem; }
.cy-sub{ color:rgba(255,255,255,.6); font-size:clamp(.95rem,1.5vw,1.1rem); max-width:44ch; margin:0 auto; }

/* scene */
.cy-scene{ position:relative; width:100%; height:80vh; min-height:600px; }
.cy-bg{ position:absolute; inset:-4% -4% -4% -4%; background:url("${BASE}/courtyard-bg.png") center 42%/cover no-repeat;
  transform:translate(calc(var(--px,0)*-10px), calc(var(--py,0)*-6px)); }
.cy-bg::after{ content:""; position:absolute; inset:0; background:radial-gradient(60% 60% at 50% 40%, transparent 40%, rgba(4,5,12,.55)); }

.cy-fountain{ position:absolute; left:50%; top:29%; width:min(360px,30vw); transform:translate(-50%,0) translate(calc(var(--px,0)*-16px), calc(var(--py,0)*-8px));
  filter:drop-shadow(0 0 40px rgba(250,159,67,.28)); z-index:1; animation:cy-breathe 5s ease-in-out infinite; }
@keyframes cy-breathe{ 0%,100%{ filter:drop-shadow(0 0 34px rgba(250,159,67,.22)); } 50%{ filter:drop-shadow(0 0 52px rgba(250,159,67,.4)); } }

/* pedestals */
.cy-stage{ position:absolute; inset:0; z-index:2; }
.cy-ped{ position:absolute; transform:translate(-50%,-50%) scale(var(--s,1)); width:190px; text-decoration:none;
  transition:filter .3s, transform .3s; }
.cy-ped.depth-1{ transform:translate(-50%,-50%) scale(var(--s)) translate(calc(var(--px,0)*6px), calc(var(--py,0)*3px)); }
.cy-ped.depth-2{ transform:translate(-50%,-50%) scale(var(--s)) translate(calc(var(--px,0)*12px), calc(var(--py,0)*6px)); }
.cy-ped.depth-3{ transform:translate(-50%,-50%) scale(var(--s)) translate(calc(var(--px,0)*20px), calc(var(--py,0)*10px)); }

.cy-plinth{ width:100%; height:200px; background:url("${BASE}/pedestal.png") center bottom/contain no-repeat; }

/* the piece that sits on top of the plinth */
.cy-piece{ position:absolute; left:50%; bottom:150px; transform:translateX(-50%); width:130px; height:130px; z-index:2; pointer-events:none; }

/* resting orb */
.cy-orb{ position:absolute; left:50%; top:50%; width:70px; height:70px; transform:translate(-50%,-50%);
  border-radius:50%; background:radial-gradient(circle at 38% 34%, #ffe6bf, var(--amber) 42%, rgba(250,159,67,.15) 72%, transparent 78%);
  box-shadow:0 0 34px 6px rgba(250,159,67,.55), inset 0 0 18px rgba(255,220,160,.6);
  animation:cy-pulse 3.2s ease-in-out infinite; transition:opacity .35s, transform .35s; }
.cy-orb span{ position:absolute; inset:-30% ; border-radius:50%; background:radial-gradient(circle, rgba(250,159,67,.35), transparent 62%); }
@keyframes cy-pulse{ 0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:.92; } 50%{ transform:translate(-50%,-50%) scale(1.08); opacity:1; } }

/* revealed screenshot */
.cy-shot{ position:absolute; left:50%; top:50%; transform:translate(-50%,-46%) scale(.6); width:186px; height:120px;
  border-radius:12px; overflow:hidden; opacity:0; transition:opacity .4s, transform .45s cubic-bezier(.2,.7,.2,1);
  border:1px solid rgba(250,159,67,.5); box-shadow:0 18px 50px rgba(0,0,0,.6), 0 0 40px rgba(250,159,67,.35); }
.cy-shot img{ width:100%; height:100%; object-fit:cover; display:block; }

/* label */
.cy-label{ position:absolute; left:50%; bottom:-8px; transform:translateX(-50%); width:210px; text-align:center;
  opacity:0; transition:opacity .35s, transform .35s; pointer-events:none; }
.cy-client{ display:block; color:var(--blue); font-size:.66rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
.cy-name{ display:block; color:#fff; font-size:.9rem; font-weight:600; line-height:1.25; margin:.15rem 0; text-shadow:0 2px 12px rgba(0,0,0,.7); }
.cy-metric{ display:inline-block; color:var(--amber); font-size:.74rem; font-weight:600; }
.cy-metric--view{ color:var(--blue); }

/* hover / active state: orb blooms into the screenshot */
.cy-ped:hover .cy-orb, .cy-ped.is-on .cy-orb{ opacity:0; transform:translate(-50%,-50%) scale(1.4); }
.cy-ped:hover .cy-shot, .cy-ped.is-on .cy-shot{ opacity:1; transform:translate(-50%,-70%) scale(1); }
.cy-ped:hover .cy-label, .cy-ped.is-on .cy-label{ opacity:1; transform:translateX(-50%) translateY(4px); }
.cy-ped:hover{ z-index:20; } .cy-ped.is-on{ z-index:20; }

/* the gate */
.cy-gate{ position:absolute; inset:0; z-index:40; pointer-events:none; perspective:1600px; }
.cy-gate-half{ position:absolute; top:0; width:50%; height:100%; background-image:url("${BASE}/gate.png"); background-size:200% 100%;
  transition:transform 1.5s cubic-bezier(.7,0,.3,1), opacity .6s ease 1.1s; backface-visibility:hidden; }
.cy-gate-half.l{ left:0; background-position:left center; transform-origin:left center; }
.cy-gate-half.r{ right:0; background-position:right center; transform-origin:right center; }
.cy--open .cy-gate-half.l{ transform:rotateY(-115deg); opacity:0; }
.cy--open .cy-gate-half.r{ transform:rotateY(115deg); opacity:0; }
.cy--open .cy-gate{ pointer-events:none; }

/* ---------- mobile: vertical stack ---------- */
@media (max-width:760px){
  .cy-scene{ height:auto; min-height:0; padding-bottom:6vh; }
  .cy-bg{ position:fixed; inset:0; opacity:.5; }
  .cy-fountain{ display:none; }
  .cy-stage{ position:relative; display:flex; flex-direction:column; gap:26px; padding:4vh 6vw; }
  .cy-ped{ position:relative !important; left:auto !important; top:auto !important; transform:none !important; width:100%;
    display:flex; align-items:center; gap:16px; background:rgba(10,12,22,.6); border:1px solid rgba(250,159,67,.2);
    border-radius:18px; padding:14px; }
  .cy-plinth{ display:none; }
  .cy-piece{ position:relative; left:auto; bottom:auto; transform:none; width:96px; height:72px; flex:0 0 auto; }
  .cy-orb{ width:54px; height:54px; }
  .cy-shot{ position:absolute; inset:0; width:100%; height:100%; transform:none; opacity:1; }  /* show screenshot directly on mobile */
  .cy-ped .cy-orb{ opacity:0; }
  .cy-label{ position:relative; left:auto; bottom:auto; transform:none; width:auto; text-align:left; opacity:1; }
  .cy-name{ font-size:1rem; }
}
`;
