// src/components/contact/ContactHero.jsx
// UFO "space call" scene that hands off to a full-screen contact form.
// Plays once on view: UFO flies in -> hovers -> tractor beam -> alien floats
// down (waving) -> lands -> hoarding pops "Fill the contact form" -> alien
// points at it -> the whole scene clears and ContactForm takes over full screen.
// Assets: public/images/ufo.webp, alien-wave.webp, alien-point.webp.

import React, { useEffect, useRef } from "react";
import ContactForm from "@/components/contact/ContactForm";

const UFO = "/images/ufo.webp";
const WAVE = "/images/alien-wave.webp";
const POINT = "/images/alien-point.webp";

export default function ContactHero() {
  const rootRef = useRef(null);
  const skyRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current, sky = skyRef.current;
    if (!root || !sky) return;
    const ctx = sky.getContext("2d");
    let VW = 0, VH = 0, stars = [], dpr = Math.min(2, window.devicePixelRatio || 1);
    const sizeSky = () => {
      VW = sky.clientWidth; VH = sky.clientHeight;
      sky.width = Math.round(VW * dpr); sky.height = Math.round(VH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((VW * VH) / 5200); stars = [];
      for (let i = 0; i < n; i++) { const z = Math.random(); stars.push({ x: Math.random() * VW, y: Math.random() * VH, z, r: 0.3 + z * 1.4, tw: Math.random() * 6.28, ts: 0.4 + Math.random() * 1.4, b: 0.2 + z * 0.8 }); }
    };
    sizeSky(); window.addEventListener("resize", sizeSky);

    let raf = 0, running = false;
    const draw = (t) => {
      ctx.clearRect(0, 0, VW, VH);
      for (const s of stars) { const tw = 0.6 + 0.4 * Math.sin(t * 0.001 * s.ts + s.tw); const y = ((s.y - t * 0.004 * s.z) % VH + VH) % VH; ctx.globalAlpha = s.b * tw; ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.28); ctx.fillStyle = "#dfe9ff"; ctx.fill(); }
      ctx.globalAlpha = 1; if (running) raf = requestAnimationFrame(draw);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { root.classList.add("revealed"); draw(0); return () => window.removeEventListener("resize", sizeSky); }

    let played = false; let revealTimer = 0;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        if (!running) { running = true; raf = requestAnimationFrame(draw); }
        if (!played) { played = true; setTimeout(() => root.classList.add("play"), 60); revealTimer = setTimeout(() => root.classList.add("revealed"), 2400); }
      } else if (running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.25 });
    io.observe(root);
    return () => { running = false; cancelAnimationFrame(raf); clearTimeout(revealTimer); io.disconnect(); window.removeEventListener("resize", sizeSky); };
  }, []);

  return (
    <section ref={rootRef} className="chero" aria-label="Contact SkyUp">
      <style>{CSS}</style>

      <div className="scene" aria-hidden="true">
        <canvas ref={skyRef} className="sky" />
        <div className="beam" />
        <div className="ufo"><img src={UFO} alt="" /><span className="under" /></div>
        <div className="alien"><img className="wave" src={WAVE} alt="" /><img className="point" src={POINT} alt="" /></div>
        <div className="sign"><div className="panel">📡 Fill the contact form <b>&darr;</b><span className="stick" /></div></div>
      </div>

      <div className="formwrap">
        <ContactForm />
      </div>
    </section>
  );
}

const CSS = `
.chero{ position:relative; min-height:100vh; background:#04050C; font-family:'Poppins',system-ui,sans-serif; }

.scene{ position:absolute; top:0; left:0; right:0; height:100vh; z-index:2; overflow:hidden; pointer-events:none;
  transition:opacity .5s ease; }
.revealed .scene{ opacity:0; }
.sky{ position:absolute; inset:0; width:100%; height:100%; display:block; }

.ufo{ position:absolute; left:50%; top:15%; width:min(48vh,54vw); transform:translate(-50%,-50%); z-index:5; opacity:0; }
.ufo img{ width:100%; display:block; filter:drop-shadow(0 20px 40px rgba(0,0,0,.5)); }
.ufo .under{ position:absolute; left:50%; bottom:6%; width:60%; height:30px; transform:translateX(-50%);
  background:radial-gradient(ellipse,rgba(150,200,255,.8),transparent 70%); filter:blur(6px); }
.play .ufo{ animation:ufo-in .7s cubic-bezier(.2,.7,.3,1) 0s both, ufo-bob 4s ease-in-out .8s infinite; }
.play .ufo .under{ animation:pulse 2s ease-in-out .8s infinite; }
@keyframes ufo-in{ 0%{ opacity:0; transform:translate(58vw,-60vh) scale(.6) rotate(-8deg);} 20%{opacity:1;} 100%{ opacity:1; transform:translate(-50%,-50%) scale(1) rotate(0);} }
@keyframes ufo-bob{ 0%,100%{ margin-top:0;} 50%{ margin-top:-16px;} }
@keyframes pulse{ 0%,100%{opacity:.5;} 50%{opacity:1;} }

.beam{ position:absolute; left:50%; top:22%; width:min(40vh,46vw); height:56vh; transform:translateX(-50%) scaleY(0);
  transform-origin:top center; z-index:3; opacity:0; clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);
  background:linear-gradient(180deg,rgba(150,200,255,.55),rgba(120,180,255,.12) 60%,transparent); filter:blur(2px); }
.play .beam{ animation:beam-open .5s ease .9s forwards, beam-close .5s ease 2.6s forwards; }
@keyframes beam-open{ to{ opacity:.9; transform:translateX(-50%) scaleY(1);} }
@keyframes beam-close{ to{ opacity:0; transform:translateX(-50%) scaleY(0);} }

.alien{ position:absolute; left:50%; top:20%; width:min(22vh,26vw); transform:translate(-50%,-50%) scale(.5); opacity:0; z-index:6; }
.alien img{ position:absolute; inset:0; width:100%; filter:drop-shadow(0 14px 24px rgba(0,0,0,.5)); }
.alien .point{ opacity:0; }
.play .alien{ animation:alien-drop .9s cubic-bezier(.3,.7,.3,1.1) 1.1s forwards, alien-bob 3.5s ease-in-out 2.1s infinite; }
.play .alien .wave{ animation:swap-out 0s linear 2s forwards; }
.play .alien .point{ animation:swap-in .4s ease 2s forwards; }
@keyframes alien-drop{ 0%{ opacity:0; transform:translate(-50%,-50%) scale(.5);} 25%{opacity:1;} 100%{ opacity:1; transform:translate(-50%,42vh) scale(1);} }
@keyframes alien-bob{ 0%,100%{ margin-top:0;} 50%{ margin-top:-8px;} }
@keyframes swap-out{ to{ opacity:0;} } @keyframes swap-in{ to{ opacity:1;} }

.sign{ position:absolute; left:calc(50% + min(15vh,18vw)); top:58%; transform:translateY(-50%) scale(.4); opacity:0; z-index:7; }
.play .sign{ animation:sign-pop .5s cubic-bezier(.2,1.4,.4,1) 1.9s forwards; }
.sign .panel{ position:relative; padding:16px 22px; border-radius:14px;
  background:linear-gradient(180deg,rgba(20,30,60,.85),rgba(10,16,36,.85));
  border:1px solid rgba(130,170,255,.6); box-shadow:0 0 30px rgba(90,140,255,.4), inset 0 0 20px rgba(90,140,255,.15);
  font-family:'Space Mono',ui-monospace,monospace; color:#eaf1ff; font-size:clamp(13px,1.6vw,17px); white-space:nowrap; }
.sign .panel b{ color:#ffb950; }
.sign .stick{ position:absolute; left:24px; bottom:-26px; width:3px; height:26px; background:linear-gradient(180deg,rgba(130,170,255,.8),transparent); }
@keyframes sign-pop{ to{ opacity:1; transform:translateY(-50%) scale(1);} }

/* full-screen form takeover */
.formwrap{ position:relative; z-index:1; min-height:100vh; display:flex; align-items:center; justify-content:center;
  padding:80px 20px; opacity:0; transform:translateY(30px) scale(.98); pointer-events:none;
  transition:opacity 1s ease, transform 1s cubic-bezier(.22,.61,.36,1); }
.revealed .formwrap{ opacity:1; transform:none; pointer-events:auto; }

/* Mobile: keep the "Fill the contact form" sign on-screen (was offset right + nowrap → clipped) */
@media (max-width:760px){
  .sign{ left:50% !important; transform:translate(-50%,-50%) scale(.5); }
  .play .sign{ animation:sign-pop-m .5s cubic-bezier(.2,1.4,.4,1) 1.9s forwards; }
  .sign .panel{ white-space:normal; text-align:center; font-size:12px; padding:10px 14px; max-width:76vw; }
  .sign .stick{ left:50%; transform:translateX(-50%); }
}
@keyframes sign-pop-m{ to{ opacity:1; transform:translate(-50%,-50%) scale(1); } }

@media (prefers-reduced-motion:reduce){
  .scene{ display:none; }
  .formwrap{ opacity:1; transform:none; pointer-events:auto; }
}
`;
