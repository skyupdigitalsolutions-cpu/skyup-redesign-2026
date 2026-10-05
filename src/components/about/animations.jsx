// src/components/about/animations.jsx
// Dependency-free animation toolkit: scroll reveals, counters, marquees.
import React, { useEffect, useRef, useState } from "react";

/* Global keyframes + motion preferences. Render ONCE (AboutUs does this). */
export function GlobalStyles() {
  return (
    <style>{`
      @keyframes sk-marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes sk-float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(24px, -28px) scale(1.06); }
      }
      @keyframes sk-float-alt {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(-28px, 22px) scale(1.08); }
      }
      @keyframes sk-gradient-pan {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes sk-pulse-ring {
        0%   { transform: scale(1);   opacity: .5; }
        100% { transform: scale(1.9); opacity: 0; }
      }
      .sk-marquee-track { animation: sk-marquee var(--sk-speed, 30s) linear infinite; }
      .sk-marquee:hover .sk-marquee-track { animation-play-state: paused; }
      .sk-float     { animation: sk-float 14s ease-in-out infinite; }
      .sk-float-alt { animation: sk-float-alt 17s ease-in-out infinite; }
      .sk-gradient-text {
        background-image: linear-gradient(90deg, #0037CA, #2F6BFF, #00A3FF, #0037CA);
        background-size: 250% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: sk-gradient-pan 6s ease infinite;
      }
      .sk-grid-bg {
        background-image:
          linear-gradient(to right, rgba(0,55,202,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,55,202,0.06) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%);
      }
      @media (prefers-reduced-motion: reduce) {
        .sk-marquee-track, .sk-float, .sk-float-alt, .sk-gradient-text { animation: none !important; }
        .sk-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      }
    `}</style>
  );
}

/* Scroll-triggered reveal. Wrap anything; fades + slides in once. */
export function Reveal({ children, delay = 0, y = 28, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`sk-reveal ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* Count-up number that starts when it scrolls into view. */
export function Counter({ to, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return setVal(to);
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* Infinite marquee. Content is duplicated for a seamless loop. */
export function Marquee({ children, speed = 30, className = "" }) {
  return (
    <div className={`sk-marquee overflow-hidden ${className}`}>
      <div
        className="sk-marquee-track flex w-max items-center gap-0"
        style={{ "--sk-speed": `${speed}s` }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}