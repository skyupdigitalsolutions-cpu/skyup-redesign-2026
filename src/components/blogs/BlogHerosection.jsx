// src/components/blogs/BlogHerosection.jsx
//
// DIGITAL GROWTH INSIGHTS — blog hero.
// A lightweight cosmic dark background (starfield + soft brand glow + the odd
// shooting star), in the same spirit as the About page — but built with plain
// CSS only. No WebGL / ogl / canvas, so it does NOT tax the page. Just a hook
// on top. All motion is compositor-only (transform/opacity) and cheap.

import React from "react";

export default function BlogHerosection() {
  return (
    <section className="dgi" aria-label="Digital Growth Insights — the SkyUp blog">
      <style>{CSS}</style>

      {/* cosmic dark background (pure CSS) */}
      <div className="dgi-sky" aria-hidden="true">
        <div className="dgi-stars" />
        <div className="dgi-stars dgi-stars2" />
        <div className="dgi-nebula" />
        <span className="dgi-shoot" />
        <span className="dgi-shoot dgi-shoot2" />
      </div>

      {/* legibility vignette */}
      <div className="dgi-vig" aria-hidden="true" />

      {/* the hook */}
      <div className="dgi-copy">
        <span className="dgi-kicker">Blogs Hub</span>
        <h1 className="dgi-h1">
          Digital Growth <span className="dgi-accent">Insights</span>
        </h1>
        <p className="dgi-sub">
          Clear guidance, practical tips and market updates — with strategies tuned
          for the Bengaluru region.
        </p>
      </div>
    </section>
  );
}

const CSS = `
.dgi{
  position:relative; width:100%; min-height:440px; height:56vh; max-height:620px;
  overflow:hidden; background:#05070f; color:#fff;
  font-family:'Poppins',system-ui,sans-serif;
  --amber:#FA9F43; --blue:#2E6BFF;
  --mono:'Space Mono',ui-monospace,Menlo,monospace;
  isolation:isolate;
}

.dgi-sky{ position:absolute; inset:0; z-index:0; overflow:hidden; }

/* two star layers for depth; the faint one drifts very slowly */
.dgi-stars{
  position:absolute; inset:-10%;
  background:
    radial-gradient(1.4px 1.4px at 12% 22%, rgba(255,255,255,.9), transparent 60%),
    radial-gradient(1.2px 1.2px at 68% 18%, rgba(255,255,255,.8), transparent 60%),
    radial-gradient(1.6px 1.6px at 88% 60%, rgba(255,255,255,.85), transparent 60%),
    radial-gradient(1.2px 1.2px at 32% 70%, rgba(255,255,255,.7), transparent 60%),
    radial-gradient(1.3px 1.3px at 52% 40%, rgba(255,255,255,.8), transparent 60%),
    radial-gradient(1.2px 1.2px at 8% 82%, rgba(255,255,255,.65), transparent 60%),
    radial-gradient(1.4px 1.4px at 78% 86%, rgba(255,255,255,.8), transparent 60%),
    radial-gradient(1.2px 1.2px at 94% 32%, rgba(255,255,255,.7), transparent 60%);
}
.dgi-stars2{
  background:
    radial-gradient(1px 1px at 20% 44%, rgba(255,255,255,.5), transparent 60%),
    radial-gradient(1px 1px at 40% 12%, rgba(255,255,255,.45), transparent 60%),
    radial-gradient(1px 1px at 62% 66%, rgba(255,255,255,.5), transparent 60%),
    radial-gradient(1px 1px at 84% 24%, rgba(255,255,255,.45), transparent 60%),
    radial-gradient(1px 1px at 16% 60%, rgba(255,255,255,.4), transparent 60%),
    radial-gradient(1px 1px at 72% 48%, rgba(255,255,255,.45), transparent 60%),
    radial-gradient(1px 1px at 48% 84%, rgba(255,255,255,.4), transparent 60%);
  opacity:.7; animation:dgi-drift 90s linear infinite;
}
@keyframes dgi-drift{ from{ transform:translate3d(0,0,0) } to{ transform:translate3d(-3%,2%,0) } }

/* soft brand-color glow, slow gentle pulse */
.dgi-nebula{
  position:absolute; inset:0;
  background:
    radial-gradient(680px 460px at 30% 32%, rgba(46,107,255,.16), transparent 68%),
    radial-gradient(620px 420px at 72% 64%, rgba(250,159,67,.12), transparent 70%);
  animation:dgi-pulse 12s ease-in-out infinite alternate;
}
@keyframes dgi-pulse{ 0%{ opacity:.8 } 100%{ opacity:1 } }

/* occasional shooting star */
.dgi-shoot{
  position:absolute; top:14%; left:82%; width:120px; height:1.5px;
  background:linear-gradient(90deg, rgba(255,255,255,.9), transparent);
  border-radius:2px; transform:rotate(38deg); opacity:0;
  filter:drop-shadow(0 0 6px rgba(130,174,232,.8));
  animation:dgi-shoot 9s ease-in infinite;
}
.dgi-shoot2{ top:8%; left:60%; animation-duration:13s; animation-delay:4.5s; }
@keyframes dgi-shoot{
  0%{ opacity:0; transform:translate(0,0) rotate(38deg) }
  6%{ opacity:1 }
  16%{ opacity:0; transform:translate(-260px,205px) rotate(38deg) }
  100%{ opacity:0; transform:translate(-260px,205px) rotate(38deg) }
}

/* legibility vignette */
.dgi-vig{
  position:absolute; inset:0; z-index:1; pointer-events:none;
  background:
    radial-gradient(760px 420px at 50% 52%, rgba(5,7,15,.6) 0%, rgba(5,7,15,.28) 48%, transparent 80%),
    linear-gradient(180deg, rgba(5,7,15,.5), transparent 24%, transparent 72%, rgba(5,7,15,.92));
}

.dgi-copy{
  position:relative; z-index:2; height:100%;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding:0 20px;
}
.dgi-kicker{
  font-family:var(--mono); font-weight:700; font-size:clamp(12px,1.3vw,15px);
  letter-spacing:.34em; text-transform:uppercase; color:var(--amber); margin-bottom:14px;
}
.dgi-h1{
  font-weight:800; line-height:1.02; letter-spacing:-.02em; margin:0;
  font-size:clamp(2.4rem,6.6vw,5rem); text-shadow:0 2px 40px rgba(5,7,15,.9);
}
.dgi-accent{
  background:linear-gradient(90deg,var(--blue),var(--amber));
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.dgi-sub{
  margin:18px auto 0; max-width:56ch;
  font-size:clamp(1rem,1.5vw,1.25rem); line-height:1.55; color:rgba(255,255,255,.82);
  text-shadow:0 2px 22px rgba(5,7,15,.9);
}

@media (max-width:820px){
  .dgi{ height:auto; min-height:0; max-height:none; padding:88px 0; }
}
@media (prefers-reduced-motion:reduce){
  .dgi-stars2,.dgi-nebula,.dgi-shoot{ animation:none; }
  .dgi-shoot{ opacity:0; }
}
`;
