import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";

/**
 * CaseStudies (home section) — "Skybot reveal".
 * A hovering robot mascot drops into a dark stage and "shoots" each case-study
 * card into existence with an orange tracer: right -> middle -> left.
 * Real client data still comes from @/data/caseStudies.js (single source of truth).
 * Accessible / SEO-safe: all card text is in the DOM; reduced-motion or no-JS
 * just shows the cards. Brand: blue #2E6BFF gun, orange #FF7A1A bullets.
 */

const ACCENT = "#FA9F43";
const BLUE_L = "#7FB0FF";

const FEATURED_SLUGS = [
  "home-services-google-ads-scale",
  "property-marketplace-rebuild",
  "b2b-sales-crm-implementation",
];

function getFeatured() {
  const bySlug = new Map(CASE_STUDIES.map((s) => [s.slug, s]));
  const picked = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  if (picked.length >= 3) return picked.slice(0, 3);
  const extra = CASE_STUDIES.filter((s) => !picked.includes(s)).slice(0, 3 - picked.length);
  return [...picked, ...extra];
}

const COVER_BG = [
  "linear-gradient(135deg,#10307e,#3360d8)",
  "linear-gradient(135deg,#1a3a8f,#2E6BFF)",
  "linear-gradient(135deg,#23519e,#5b86e6)",
];

export default function CaseStudies() {
  const featured = getFeatured();

  const secRef = useRef(null);
  const stageRef = useRef(null);
  const charRef = useRef(null);
  const aimRef = useRef(null);
  const muzzleRef = useRef(null);
  const pupilRef = useRef(null);
  const fxRef = useRef(null);
  const cardRefs = useRef([]);
  const audioRef = useRef(null);
  const [revealed, setRevealed] = useState([false, false, false]);

  // Prime the audio on the FIRST user interaction anywhere on the page, so the
  // blaster can play the very first time the section is seen (and after refresh).
  // Browsers block sound until a gesture; the user scrolls/clicks long before
  // reaching this section, which unlocks it.
  useEffect(() => {
    const events = ["pointerdown", "touchstart", "touchend", "mousedown", "keydown", "click", "wheel", "scroll"];
    const unlock = () => {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!audioRef.current) audioRef.current = new Ctx();
        if (audioRef.current.state === "suspended") audioRef.current.resume();
        const buf = audioRef.current.createBuffer(1, 1, 22050); // silent buffer (iOS unlock)
        const src = audioRef.current.createBufferSource();
        src.buffer = buf; src.connect(audioRef.current.destination); src.start(0);
      } catch (e) { /* ignore */ }
      // Only stop listening once the context is genuinely running — an early
      // gesture whose resume() didn't take gets another chance on the next one.
      if (audioRef.current && audioRef.current.state === "running") {
        events.forEach((ev) => window.removeEventListener(ev, unlock));
      }
    };
    events.forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, unlock));
  }, []);

  useEffect(() => {
    const reduce = typeof window !== "undefined" &&
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noIO = typeof IntersectionObserver === "undefined";

    if (reduce || noIO) {
      setRevealed([true, true, true]);
      // Reduced-motion: don't animate the robot, but DON'T hide it either — show it
      // resting in its final landed pose so the stage isn't empty.
      if (charRef.current) {
        charRef.current.style.display = "";
        charRef.current.style.transition = "none";
        charRef.current.style.transform = "translateX(-50%) translateY(0) scale(1)";
        charRef.current.style.opacity = "1";
      }
      return;
    }

    let cancelled = false, played = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const AIM = { 2: -30, 1: 0, 0: 30 }; // swing angle per target (right, mid, left)
    let curAim = 0;

    // synthesized blaster "pew" — plays ONLY when the audio context is already
    // unlocked and running. Never create/resume here: scheduling onto a suspended
    // context freezes currentTime at 0, so all three pews would queue and then fire
    // together on the next click (that was the sound landing on the FAQ button).
    // Guarding on state === "running" keeps each pew in real-time sync with its
    // bullet; the global unlock effect resumes the context on the first tap/click.
    const zap = () => {
      try {
        const actx = audioRef.current;
        if (!actx || actx.state !== "running") return;
        const t = actx.currentTime;
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = "square";
        o.frequency.setValueAtTime(1150, t);
        o.frequency.exponentialRampToValueAtTime(180, t + 0.16);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.2, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.connect(g).connect(actx.destination);
        o.start(t); o.stop(t + 0.2);
        const o2 = actx.createOscillator(), g2 = actx.createGain();
        o2.type = "sine";
        o2.frequency.setValueAtTime(220, t);
        o2.frequency.exponentialRampToValueAtTime(60, t + 0.12);
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.12, t + 0.005);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
        o2.connect(g2).connect(actx.destination);
        o2.start(t); o2.stop(t + 0.16);
      } catch (e) { /* audio blocked — ignore */ }
    };

    const pt = (el) => {
      const r = el.getBoundingClientRect();
      const f = fxRef.current.getBoundingClientRect();
      return { x: r.left + r.width / 2 - f.left, y: r.top + r.height / 2 - f.top };
    };
    const setAim = (a) => {
      curAim = a;
      if (aimRef.current) aimRef.current.style.transform = `rotate(${a}deg)`;
      if (pupilRef.current) pupilRef.current.style.transform = `translateX(${-a / 6}px)`;
    };
    const flash = () => {
      if (!muzzleRef.current || !fxRef.current) return;
      const m = pt(muzzleRef.current);
      const e = document.createElement("div");
      e.className = "cs-muzzle cs-mzgo";
      e.style.left = m.x + "px"; e.style.top = m.y + "px";
      fxRef.current.appendChild(e);
      setTimeout(() => e.remove(), 220);
    };
    const recoil = () => {
      if (aimRef.current) aimRef.current.style.transform = `rotate(${curAim - 14}deg)`;
      if (charRef.current) charRef.current.style.marginTop = "-8px";
      setTimeout(() => {
        if (aimRef.current) aimRef.current.style.transform = `rotate(${curAim}deg)`;
        if (charRef.current) charRef.current.style.marginTop = "0px";
      }, 110);
    };
    const fireAt = async (i) => {
      zap(); flash(); recoil();
      const card = cardRefs.current[i];
      if (!card || !muzzleRef.current || !fxRef.current) { setRevealed((p) => p.map((v, k) => (k === i ? true : v))); return; }
      const m = pt(muzzleRef.current), c = pt(card);
      const ang = (Math.atan2(c.y - m.y, c.x - m.x) * 180) / Math.PI;
      const b = document.createElement("div");
      b.className = "cs-bullet";
      b.style.left = m.x + "px"; b.style.top = m.y + "px";
      b.style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;
      fxRef.current.appendChild(b);
      requestAnimationFrame(() => {
        b.style.transition = "transform .24s cubic-bezier(.45,0,.7,1)";
        b.style.transform = `translate(calc(-50% + ${c.x - m.x}px),calc(-50% + ${c.y - m.y}px)) rotate(${ang}deg)`;
      });
      await wait(240);
      b.remove();
      const im = document.createElement("div");
      im.className = "cs-impact cs-impgo";
      im.style.left = c.x + "px"; im.style.top = c.y + "px";
      fxRef.current.appendChild(im);
      setTimeout(() => im.remove(), 540);
      setRevealed((p) => p.map((v, k) => (k === i ? true : v)));
    };

    const play = async () => {
      if (!charRef.current) return;
      // Robot drops in IMMEDIATELY on view, then shoots promptly — the visual never
      // waits on audio. zap() plays the pew if the audio context is already unlocked
      // (a tap on mobile or a click on desktop unlocks it); otherwise the shot is silent
      // but on time. No blocking wait here — that was making the robot shoot late.
      setAim(0);
      charRef.current.classList.add("cs-drop");
      await wait(850); // matches the .85s drop transition
      for (const i of [2, 1, 0]) {
        if (cancelled) return;
        setAim(AIM[i]); await wait(240);
        if (cancelled) return;
        await fireAt(i); await wait(300);
      }
      setAim(8);
      charRef.current.classList.add("cs-idle");
    };

    // Watch the robot STAGE (fixed 230px), not the whole section. The section is
    // taller than a phone viewport, so an observer on it can never reach a high
    // ratio on short screens (iPhones) and the drop-in never fires — that's why the
    // robot showed only on very tall viewports. The stage is short, so a modest
    // threshold triggers reliably everywhere. rootMargin lets it start just before
    // the stage is fully on screen so the drop is visible.
    const target = stageRef.current || secRef.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !played) { played = true; play(); io.disconnect(); }
      }),
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(target);
    return () => { cancelled = true; io.disconnect(); };
  }, []);

  return (
    <section ref={secRef} className="relative w-full overflow-hidden py-24 lg:py-28" style={{ background: "#07060A" }}>
      <style>{`
        .cs-glow{background:radial-gradient(60% 40% at 50% 12%,rgba(46,107,255,.10),transparent 70%),radial-gradient(40% 40% at 50% 96%,rgba(255,122,26,.07),transparent 70%)}
        .cs-stage{position:relative;height:230px;margin-top:.5rem}
        .cs-char{position:absolute;left:50%;top:0;width:200px;height:230px;transform:translateX(-50%) translateY(-300px) scale(.92);opacity:0;will-change:transform,opacity,margin}
        .cs-char.cs-drop{transform:translateX(-50%) translateY(0) scale(1);opacity:1;transition:transform .85s cubic-bezier(.18,.9,.28,1.2),opacity .5s ease}
        .cs-char.cs-idle{animation:csBob 3.2s ease-in-out infinite}
        @keyframes csBob{0%,100%{margin-top:0}50%{margin-top:6px}}
        .cs-aim{transform-box:view-box;transform-origin:110px 150px;transition:transform .36s cubic-bezier(.5,0,.2,1)}
        .cs-pupil{transition:transform .3s ease}
        .cs-thruster{transform-box:fill-box;transform-origin:center;animation:csThr 1.5s ease-in-out infinite}
        @keyframes csThr{0%,100%{opacity:.65;transform:scaleX(1) scaleY(1)}50%{opacity:1;transform:scaleX(1.18) scaleY(.9)}}
        .cs-fx{position:absolute;inset:0;pointer-events:none;z-index:40;overflow:visible}
        .cs-bullet{position:absolute;width:16px;height:6px;border-radius:6px;background:linear-gradient(90deg,transparent,#FFC07A,#FF7A1A);box-shadow:0 0 12px 3px rgba(255,122,26,.9);transform-origin:center;will-change:transform}
        .cs-bullet::after{content:"";position:absolute;right:100%;top:50%;transform:translateY(-50%);width:34px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,122,26,.8));border-radius:2px}
        .cs-muzzle{position:absolute;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle,#fff,#FFC07A 35%,rgba(255,122,26,.5) 60%,transparent 72%);transform:translate(-50%,-50%) scale(0);opacity:0}
        .cs-mzgo{animation:csMz .2s ease-out}
        @keyframes csMz{0%{transform:translate(-50%,-50%) scale(.2);opacity:1}100%{transform:translate(-50%,-50%) scale(1.3);opacity:0}}
        .cs-impact{position:absolute;width:30px;height:30px;border-radius:50%;border:2px solid #FF7A1A;transform:translate(-50%,-50%) scale(.3);opacity:0}
        .cs-impgo{animation:csImp .52s ease-out}
        @keyframes csImp{0%{transform:translate(-50%,-50%) scale(.3);opacity:1}100%{transform:translate(-50%,-50%) scale(2.6);opacity:0}}
        .cs-card{opacity:0;transform:translateY(26px) scale(.92)}
        .cs-card.cs-show{animation:csCardIn .6s cubic-bezier(.2,.9,.3,1.2) forwards}
        @keyframes csCardIn{0%{opacity:0;transform:translateY(26px) scale(.92);box-shadow:0 0 0 1px #FF7A1A,0 0 44px -4px rgba(255,122,26,.7)}60%{opacity:1;box-shadow:0 0 0 1px #FF7A1A,0 0 30px -6px rgba(255,122,26,.5)}100%{opacity:1;transform:none;box-shadow:0 20px 50px -24px rgba(0,55,202,.5)}}
        @media (prefers-reduced-motion: reduce){.cs-card{opacity:1!important;transform:none!important;animation:none!important}.cs-thruster,.cs-char.cs-idle{animation:none}}
      `}</style>

      <div className="cs-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
            <span className="h-px w-7" style={{ background: ACCENT }} /> Real results <span className="h-px w-7" style={{ background: ACCENT }} />
          </span>
          <h2 className="mt-4 font-extrabold leading-[1.06] text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", letterSpacing: "-0.02em" }}>
            Growth we&apos;ve already delivered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55" style={{ fontFamily: "'Poppins',sans-serif", lineHeight: 1.6 }}>
            Real clients, real numbers — what happens when strategy, execution, and AI work as one system.
          </p>
        </div>

        {/* robot stage */}
        <div ref={stageRef} className="cs-stage">
          <svg ref={charRef} className="cs-char" viewBox="0 0 220 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="csBody" x1="110" y1="60" x2="110" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3c5fa6" /><stop offset="1" stopColor="#142a52" />
              </linearGradient>
              <linearGradient id="csBlaster" x1="100" y1="166" x2="120" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7FB0FF" /><stop offset="1" stopColor="#2E6BFF" />
              </linearGradient>
              <radialGradient id="csEye" cx="50%" cy="45%" r="60%">
                <stop stopColor="#dffaff" /><stop offset="0.5" stopColor="#3FE0FF" /><stop offset="1" stopColor="#1f8fff" />
              </radialGradient>
              <radialGradient id="csCore" cx="50%" cy="50%" r="50%">
                <stop stopColor="#fff" /><stop offset="0.4" stopColor="#FFC07A" /><stop offset="1" stopColor="#FF7A1A" />
              </radialGradient>
              <radialGradient id="csThrust" cx="50%" cy="30%" r="70%">
                <stop stopColor="#FFC07A" /><stop offset="0.5" stopColor="rgba(255,122,26,.6)" /><stop offset="1" stopColor="rgba(255,122,26,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="110" cy="242" rx="44" ry="6" fill="#000" opacity="0.4" />
            <g>
              <ellipse className="cs-thruster" cx="110" cy="206" rx="24" ry="13" fill="url(#csThrust)" />
              <rect x="74" y="112" width="72" height="86" rx="30" fill="url(#csBody)" />
              <rect x="74" y="112" width="72" height="86" rx="30" fill="none" stroke="#7FB0FF" strokeWidth="1" opacity="0.3" />
              <circle cx="110" cy="150" r="11" fill="#0a1430" />
              <circle cx="110" cy="150" r="6.5" fill="url(#csCore)" />
              <rect x="100" y="104" width="20" height="14" rx="4" fill="#16264d" />
              <rect x="70" y="84" width="8" height="20" rx="4" fill="#2E6BFF" />
              <rect x="142" y="84" width="8" height="20" rx="4" fill="#2E6BFF" />
              <rect x="76" y="64" width="68" height="54" rx="24" fill="url(#csBody)" />
              <rect x="84" y="80" width="52" height="22" rx="11" fill="#06101f" />
              <rect x="87" y="83" width="46" height="16" rx="8" fill="url(#csEye)" />
              <circle ref={pupilRef} className="cs-pupil" cx="110" cy="91" r="4.5" fill="#ffffff" opacity="0.95" />
              <rect x="108" y="50" width="4" height="16" rx="2" fill="#16264d" />
              <circle cx="110" cy="48" r="5" fill="url(#csCore)" />
              <g ref={aimRef} className="cs-aim">
                <path d="M80 138 Q88 162 102 172" stroke="#24386a" strokeWidth="12" strokeLinecap="round" fill="none" />
                <path d="M140 138 Q132 162 118 172" stroke="#24386a" strokeWidth="12" strokeLinecap="round" fill="none" />
                <circle cx="110" cy="174" r="8" fill="#0e1f44" />
                <rect x="100" y="166" width="20" height="15" rx="4" fill="url(#csBlaster)" />
                <rect x="104" y="179" width="12" height="17" rx="4" fill="url(#csBlaster)" />
                <rect x="106" y="192" width="8" height="8" rx="2" fill="#7FB0FF" />
                <circle ref={muzzleRef} cx="110" cy="200" r="3" fill="#bff4ff" />
              </g>
            </g>
          </svg>
        </div>

        {/* cards */}
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((study, i) => (
            <a
              key={study.slug}
              ref={(el) => (cardRefs.current[i] = el)}
              href={`/work/${study.slug}`}
              className={`cs-card group relative flex flex-col overflow-hidden rounded-2xl ${revealed[i] ? "cs-show" : ""}`}
              style={{ background: "linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015))", border: "1px solid rgba(255,255,255,.09)" }}
            >
              <div className="relative h-36 w-full overflow-hidden" style={{ background: COVER_BG[i % COVER_BG.length] }}>
                {study.image ? (
                  <img src={study.image} alt={study.client} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                ) : null}
                <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">{study.category}</span>
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-neutral-900">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6" style={{ fontFamily: "'Poppins',sans-serif" }}>
                <div className="text-[0.66rem] font-medium uppercase tracking-wider text-white/40">{study.client}</div>
                <h3 className="mt-2 text-lg font-bold leading-snug text-white">{study.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">{study.summary}</p>
                {(study.metrics || []).slice(0, 3).length > 0 && (
                  <div className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                    {(study.metrics || []).slice(0, 3).map((m, j) => (
                      <div key={j}>
                        <div className="text-xl font-extrabold tracking-tight" style={{ color: j === 1 ? ACCENT : BLUE_L }}>{m.value}</div>
                        <div className="mt-0.5 text-[0.66rem] leading-tight text-white/45">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* view all */}
        <div className="mt-12 flex justify-center">
          <a href="/works" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-white/50">
            View all work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* fx overlay (bullets, flashes, impacts) */}
        <div ref={fxRef} className="cs-fx" />
      </div>
    </section>
  );
}
