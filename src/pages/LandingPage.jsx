import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Building2,
  TrendingUp,
  Layers,
  Megaphone,
  Search,
  Share2,
  MessageCircle,
  LayoutTemplate,
  RefreshCw,
  Database,
  BarChart3,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// NOTE: Facebook, Instagram, Linkedin and Youtube were removed from
// lucide-react in the 1.x line (trademark reasons). They are loaded as
// SVG images via `iconSrc` in FOOTER_SOCIAL below instead of as icons.

/* ══════════════════════════════════════════
   BACKEND CONFIG
   Replace API_BASE with your deployed Vercel URL.
   The lead form POSTs to `${API_BASE}/add-contact`.
══════════════════════════════════════════ */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://skyup-backend-3k9s.onrender.com"; // ← prod URL (no trailing slash)

/* ══════════════════════════════════════════
   GLOBAL STYLES
   NOTE: The Poppins @import was removed from here.
   Load Poppins in your +Head.jsx instead with:
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  footer a { color: #E6E5E5; }
  footer a:hover { color: #ffffff; }

  html { scroll-behavior: smooth; }
  body { color: #E6E9F5; }
  a { text-decoration: none; }
  .font-poppins { color: #E6E9F5; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-fiu  { animation: fadeInUp 0.6s ease both; }
  .delay-1 { animation-delay: 0.08s; }
  .delay-2 { animation-delay: 0.18s; }
  .delay-3 { animation-delay: 0.28s; }
  .delay-4 { animation-delay: 0.38s; }

  .faq-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.35s ease; opacity: 0; }
  .faq-body.open { max-height: 400px; opacity: 1; }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu-enter { animation: slideDown 0.2s ease both; }

  @keyframes headerIn {
    from { opacity: 0; transform: translateY(-40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .header-animate { animation: headerIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

  .gradient-text {
    background: linear-gradient(90deg, #0037CA, #1F6BFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .animated-gradient-text {
    background: linear-gradient(-45deg, #0037CA, #1F6BFF, #3B82F6, #0037CA);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientMove 5s ease-in-out infinite;
  }
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .service-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,55,202,0.15); }
  .service-card:hover .service-icon { background: #0037CA !important; color: white !important; }

  .why-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
  .why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,55,202,0.10); }
  .why-card:hover .why-icon { background: #0037CA !important; color: white !important; }

  .stat-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,55,202,0.12); }

  .faq-item { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .faq-item.open { border-color: #0037CA !important; box-shadow: 0 4px 16px rgba(0,55,202,0.08); }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #0037CA;
    box-shadow: 0 0 0 3px rgba(0,55,202,0.12);
  }

  /* Sections are visible by default (no-JS / SSR safety net) */
  .reveal { opacity: 1; transform: none; }

  /* Animation only kicks in once JS marks the page ready */
  .js-ready .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .js-ready .reveal.visible { opacity: 1; transform: translateY(0); }

  .btn-primary { position: relative; overflow: hidden; transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,55,202,0.30); }
  .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.12);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .btn-primary:hover::after { transform: scaleX(1); }

  .gold-rule { display: inline-block; height: 3px; width: 36px; border-radius: 2px; background: #C8973A; }

  .process-line::before {
    content: '';
    position: absolute;
    top: 26px; left: 52px; right: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(0,55,202,0.15), rgba(200,151,58,0.50), rgba(0,55,202,0.15));
  }

  .step-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px; height: 52px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0037CA 0%, #1F6BFF 100%);
    color: white;
    font-size: 16px;
    font-weight: 800;
    box-shadow: 0 6px 20px rgba(0,55,202,0.35);
    letter-spacing: -0.02em;
  }

  .hero-img-wrap { position: relative; }
  .hero-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(0,55,202,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .float-badge { animation: floatBadge 3s ease-in-out infinite; }

  /* ── Hero auto-animations (no scroll triggers) ── */
  @keyframes chipPulse {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  .chip {
    display: inline-flex; align-items: center;
    padding: 6px 13px; border-radius: 999px;
    font-size: 12.5px; font-weight: 600;
    border: 1px solid #D8DCF0; background: #ffffff; color: #5B5F73;
    transition: color 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  }
  .chip.active {
    color: #ffffff;
    background: linear-gradient(135deg, #0037CA 0%, #1F6BFF 100%);
    border-color: transparent;
    box-shadow: 0 6px 18px rgba(0,55,202,0.25);
    animation: chipPulse 1.6s ease-in-out;
  }

  @keyframes pulseDot {
    0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
    70%  { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
  }
  .pulse-dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: #22C55E; flex-shrink: 0;
    animation: pulseDot 1.8s ease-out infinite;
  }
  .enquiry-line { transition: opacity 0.26s ease, transform 0.26s ease; }
  .enquiry-line.out { opacity: 0; transform: translateY(6px); }
  .enquiry-line.in  { opacity: 1; transform: translateY(0); }

  /* ── Lead Command Center ── */
  .engine-card {
    position: relative;
    border-radius: 24px;
    background:
      radial-gradient(120% 80% at 0% 0%, rgba(46,107,255,0.12), transparent 55%),
      linear-gradient(160deg,#0c1024,#070a14);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 30px 80px -30px rgba(0,0,0,0.85);
    overflow: hidden;
  }
  .engine-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 26px 26px;
  }
  .engine-topline {
    height: 4px;
    background: linear-gradient(90deg, #0037CA, #1F6BFF, #FA9F43);
  }

  /* pipeline */
  .pipe { position: relative; }
  .pipe-track {
    position: absolute; top: 26px; left: 10%; right: 10%; height: 2px;
    background: linear-gradient(90deg, rgba(0,55,202,0.18), rgba(250,159,67,0.55), rgba(0,55,202,0.18));
    z-index: 0;
  }
  .flow-dot {
    position: absolute; top: 26px;
    width: 9px; height: 9px; border-radius: 50%;
    background: #5b8cff;
    box-shadow: 0 0 0 4px rgba(91,140,255,0.16);
    transform: translate(-50%, -50%);
    z-index: 1;
    animation: flowDot 7s linear infinite;
  }
  @keyframes flowDot {
    0%   { left: 10%; opacity: 0; }
    6%   { opacity: 1; }
    94%  { opacity: 1; }
    100% { left: 90%; opacity: 0; }
  }
  .pipe-node { position: relative; z-index: 2; }
  .pipe-icon {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.05); color: #9cc0ff;
    border: 1px solid rgba(255,255,255,0.12);
    animation: nodeGlow 7s ease-in-out infinite;
  }
  @keyframes nodeGlow {
    0%, 14%, 100% { box-shadow: 0 4px 12px rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.12); }
    6% { box-shadow: 0 0 0 5px rgba(46,107,255,0.18), 0 10px 24px rgba(46,107,255,0.35); border-color: #2E6BFF; }
  }

  /* sparkline */
  .spark-path { stroke-dasharray: 420; stroke-dashoffset: 420; animation: sparkDraw 2.2s ease-out 0.3s forwards; }
  @keyframes sparkDraw { to { stroke-dashoffset: 0; } }
  .spark-area { opacity: 0; animation: sparkFade 1.4s ease-out 1.1s forwards; }
  @keyframes sparkFade { to { opacity: 1; } }

  /* lead feed cards */
  @keyframes leadIn {
    from { opacity: 0; transform: translateY(-14px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .lead-enter { animation: leadIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .animated-gradient-text, .float-badge, .chip.active, .pulse-dot,
    .pipe-icon { animation: none !important; }
    .flow-dot { display: none !important; }
    .spark-path { stroke-dashoffset: 0; animation: none !important; }
    .spark-area { opacity: 1; animation: none !important; }
    .lead-enter { animation: none !important; }
    .enquiry-line { transition: none !important; }
  }

  /* ── Dark theme (redesign look) ── */
  body { background: #04050C; }
  ::placeholder { color: #6E7699; opacity: 1; }
  .surface {
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .glass-header {
    background: rgba(6,8,14,0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 10px 30px -18px rgba(0,0,0,0.85);
  }
  .glass-pill {
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* client logo marquee */
  .marquee {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  }
  .marquee-track { display: flex; width: max-content; animation: marqueeMove 34s linear infinite; }
  .marquee:hover .marquee-track { animation-play-state: paused; }
  @keyframes marqueeMove { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .logo-chip {
    flex: 0 0 auto; height: 82px; width: 188px; margin: 0 11px;
    display: flex; align-items: center; justify-content: center;
    background: #ffffff; border-radius: 16px; padding: 14px 22px;
    box-shadow: 0 8px 24px -14px rgba(0,0,0,0.75);
  }
  .logo-chip img { max-height: 52px; max-width: 100%; object-fit: contain; }
  @media (max-width: 640px) {
    .logo-chip { height: 66px; width: 150px; margin: 0 8px; }
    .logo-chip img { max-height: 40px; }
  }

  /* works flip cards (CSS-only flip — no external deps) */
  .wfc { position: relative; border-radius: 24px; aspect-ratio: 1 / 1.12; perspective: 1400px; }
  .wfc-inner {
    position: relative; width: 100%; height: 100%;
    transition: transform 0.75s cubic-bezier(0.22,1,0.36,1);
    transform-style: preserve-3d;
  }
  .wfc:hover .wfc-inner, .wfc.flipped .wfc-inner { transform: rotateY(180deg); }
  .wfc-face {
    position: absolute; inset: 0; border-radius: 24px; overflow: hidden;
    -webkit-backface-visibility: hidden; backface-visibility: hidden;
  }
  .wfc-thumb { position: absolute; inset: 0; }
  .wfc-thumb::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 34%, rgba(4,5,12,0.4) 60%, rgba(4,5,12,0.94) 100%);
  }
  .wfc-front-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px; z-index: 2; color: #eef2ff; }
  .wfc-cat {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #9cc0ff;
    background: rgba(6,9,20,0.5); border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(8px); border-radius: 20px; padding: 5px 11px;
  }
  .wfc-title { font-weight: 600; font-size: 1.2rem; line-height: 1.15; letter-spacing: -0.01em; }
  .wfc-client { color: #9cc0ff; font-size: 0.82rem; margin-top: 3px; }
  .wfc-hint {
    display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 14px;
    font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #c7d0ee;
  }
  .wfc-back {
    transform: rotateY(180deg);
    background: radial-gradient(120% 80% at 100% 0%, rgba(46,107,255,0.16), transparent 55%), linear-gradient(160deg,#0c1024,#070a14);
    border: 1px solid rgba(255,255,255,0.07);
  }
  .wfc-back-inner { position: absolute; inset: 0; padding: 22px; display: flex; flex-direction: column; gap: 11px; color: #eef2ff; }
  .wfc-bcat { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: #ffb950; }
  .wfc-bclient { font-weight: 600; font-size: 1.05rem; letter-spacing: -0.01em; }
  .wfc-summary { color: #9aa3c2; font-size: 0.8rem; line-height: 1.5; }
  .wfc-label { font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase; color: #9cc0ff; margin-bottom: 6px; }
  .wfc-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .wfc-chip { font-size: 0.66rem; color: #cdd6f5; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); border-radius: 8px; padding: 4px 9px; }
  .wfc-metrics { display: flex; gap: 16px; margin-top: auto; }
  .wfc-mv { font-weight: 700; font-size: 1.05rem; color: #fff; line-height: 1; }
  .wfc-ml { font-size: 0.56rem; color: #9aa3c2; margin-top: 4px; max-width: 13ch; line-height: 1.2; }
  .wfc-glow {
    position: absolute; inset: 0; border-radius: 24px; padding: 1px; pointer-events: none; z-index: 5; opacity: 0;
    background: linear-gradient(135deg,#FA9F43,transparent 40%,#5b8cff);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    transition: opacity 0.45s ease;
  }
  .wfc:hover .wfc-glow, .wfc.flipped .wfc-glow { opacity: 0.9; }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none !important; }
    .wfc-inner { transition: none !important; }
  }

  /* ══ Cinematic intro overlay ══ */
  .intro {
    position: fixed; inset: 0; z-index: 100000; overflow: hidden;
    background: #04050C; display: grid; place-items: center;
    animation: introIn 0.7s ease both, introAutoHide 0.5s linear 6.8s forwards;
  }
  .intro.leaving { animation: introOut 0.8s cubic-bezier(0.4,0,0.2,1) forwards; pointer-events: none; }
  @keyframes introIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes introOut { to { opacity: 0; transform: scale(1.05); filter: blur(8px); visibility: hidden; } }
  @keyframes introAutoHide { to { opacity: 0; visibility: hidden; pointer-events: none; } }

  .intro-glow { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
  .intro-glow.a { width: 540px; height: 540px; top: -12%; left: -8%; opacity: 0.55;
    background: radial-gradient(circle, rgba(46,107,255,0.55), transparent 70%); animation: gFloatA 13s ease-in-out infinite; }
  .intro-glow.b { width: 480px; height: 480px; bottom: -14%; right: -8%; opacity: 0.5;
    background: radial-gradient(circle, rgba(250,159,67,0.45), transparent 70%); animation: gFloatB 16s ease-in-out infinite; }
  @keyframes gFloatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(46px,34px); } }
  @keyframes gFloatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-42px,-30px); } }
  .intro-vignette { position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(120% 120% at 50% 45%, transparent 52%, rgba(0,0,0,0.72)); }

  .intro-skip {
    position: absolute; top: 22px; right: 24px; z-index: 3;
    font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; letter-spacing: 0.06em;
    color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 8px 16px; cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .intro-skip:hover { color: #fff; background: rgba(255,255,255,0.12); }

  .intro-stage {
    position: relative; width: min(560px, 86vw); height: 320px;
    display: grid; place-items: center; font-family: 'Poppins', sans-serif; text-align: center;
  }
  .intro-scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; will-change: transform, opacity, filter;
    animation: sceneEnter 0.75s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes sceneEnter {
    0% { opacity: 0; transform: translateY(14px) scale(0.97); filter: blur(9px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }

  .intro-caption { font-size: clamp(15px, 2.4vw, 19px); font-weight: 500; color: #c7d0ee; letter-spacing: 0.01em; }
  .intro-ads { display: flex; gap: 14px; }
  .ad-lockup { background: #ffffff; border-radius: 20px; padding: 26px 34px;
    box-shadow: 0 24px 60px -20px rgba(46,107,255,0.55), 0 0 0 1px rgba(255,255,255,0.08); }
  .ad-lockup img { height: clamp(48px, 8vw, 68px); width: auto; display: block; }
  .ad-lockup-fallback { color: #0b1020; font-weight: 700; font-size: clamp(16px, 3vw, 20px); }
  .click-ripple { position: absolute; bottom: 84px; width: 14px; height: 14px; border-radius: 50%; background: #FFB950;
    box-shadow: 0 0 0 0 rgba(255,185,80,0.5); animation: clickPulse 1.2s ease-out 0.9s both; }
  @keyframes clickPulse {
    0% { transform: scale(0.4); opacity: 0; }
    30% { opacity: 1; }
    100% { transform: scale(1); box-shadow: 0 0 0 34px rgba(255,185,80,0); opacity: 0; }
  }

  .lead-stack { display: flex; flex-direction: column; gap: 10px; width: min(340px, 80vw); }
  .lead-card { display: flex; align-items: center; gap: 10px; padding: 13px 16px; border-radius: 12px;
    font-size: 14px; font-weight: 600; color: #eef2ff; text-align: left;
    background: linear-gradient(160deg, rgba(46,107,255,0.16), rgba(255,255,255,0.04));
    border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 14px 34px -18px rgba(0,0,0,0.8);
    opacity: 0; }
  .lead-card::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 10px rgba(34,197,94,0.9); flex-shrink: 0; }
  .lead-card.l1 { animation: cardFly 0.55s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
  .lead-card.l2 { animation: cardFly 0.55s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
  .lead-card.l3 { animation: cardFly 0.55s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
  @keyframes cardFly { 0% { opacity: 0; transform: translateX(26px) scale(0.96); filter: blur(4px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }

  .win-check { width: 112px; height: 112px; border-radius: 50%; display: grid; place-items: center; color: #d6ffe4;
    background: radial-gradient(circle, rgba(34,197,94,0.28), transparent 72%);
    box-shadow: 0 0 0 1px rgba(34,197,94,0.35), 0 0 70px rgba(34,197,94,0.45);
    animation: winPulse 2.4s ease-in-out 0.3s infinite; }
  @keyframes winPulse {
    0%,100% { box-shadow: 0 0 0 1px rgba(34,197,94,0.35), 0 0 70px rgba(34,197,94,0.4); }
    50% { box-shadow: 0 0 0 1px rgba(34,197,94,0.5), 0 0 92px rgba(34,197,94,0.62); }
  }

  .intro-logo { font-size: clamp(30px, 6vw, 44px); font-weight: 800; letter-spacing: -0.02em; margin-top: 4px;
    background: linear-gradient(100deg,#5b8cff,#2E6BFF 45%,#FA9F43); -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; position: relative; }

  .intro-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.06); }
  .intro-progress span { display: block; height: 100%; width: 0;
    background: linear-gradient(90deg,#2E6BFF,#FA9F43); animation: introProg 6s linear forwards; }
  @keyframes introProg { to { width: 100%; } }

  @media (max-width: 768px) {
    .process-line::before { display: none; }
  }
`;

/* ══════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════ */
const C = {
  brand: "#2E6BFF",        // accent blue (visible on dark)
  brandHover: "#5b8cff",
  brandDark: "#EEF2FF",    // was dark heading text -> now light text on dark
  brandMid: "#9cc0ff",
  navy: "#EEF2FF",
  cream: "#04050C",        // page / section background (deep navy-black)
  creamBorder: "rgba(255,255,255,0.10)",
  gold: "#FFB950",
  muted: "#8b93b2",
  subtle: "#6E7699",
  orange: "#FA9F43",
};

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const NAV_LINKS = [
  { to: "#home", label: "Home" },
  { to: "#about", label: "About Us" },
  { to: "#services", label: "Services" },
  { to: "#process", label: "Process" },
  { to: "#testimonials", label: "Testimonials" },
  { to: "#faq", label: "FAQ" },
];

const SOCIAL_LINKS_NAV = [
  {
    iconSrc: "/images/facebook.svg",
    href: "https://www.facebook.com/profile.php?id=61584820941998",
    label: "Facebook",
  },
  {
    iconSrc: "/images/instagram.svg",
    href: "https://www.instagram.com/skyupdigitalsolutions/",
    label: "Instagram",
  },
  {
    iconSrc: "/images/Linkedin.svg",
    href: "https://www.linkedin.com/company/110886969",
    label: "LinkedIn",
  },
  {
    iconSrc: "/images/youtube.svg",
    href: "https://www.youtube.com/@SKYUPDigitalSolutionsBengaluru",
    label: "YouTube",
  },
];

const CHECKLIST = [
  "Real Estate Social Media & Digital Marketing",
  "Google Ads, Meta Ads & Performance Marketing",
  "Creative Design, Video Editing & Website Development",
  "Lead Management, Follow-Up Automation & CRM Solutions",
];

const BUDGET_OPTIONS = [
  "Under ₹50,000 / month",
  "₹50,000 – ₹1,00,000 / month",
  "₹1,00,000 – ₹3,00,000 / month",
  "₹3,00,000+ / month",
];

const STATS = []; // removed fabricated stats — add genuine, verifiable results (Google Ads policy) // eslint-disable-line no-unused-vars -- kept for reference; hero now uses COMMAND_METRICS

/* ── Hero "Lead Command Center" data ──
   Illustrative UI — deliberately generic (no real names / no live counters)
   so it stays clearly a demo and within Google Ads misrepresentation policy. */
const PIPELINE_STAGES = [
  { Icon: Megaphone, label: "Google Ads" },
  { Icon: LayoutTemplate, label: "Landing Page" },
  { Icon: CheckCircle2, label: "Qualified" },
  { Icon: Database, label: "CRM" },
  { Icon: TrendingUp, label: "Sales" },
];

const COMMAND_METRICS = [
  { value: "1,000 +", label: "Property enquiries" },
  { value: "5X", label: "Avg ROAS" },
  { value: "30 +", label: "Projects scaled" },
];

const LEAD_FEED = [
  { type: "3 BHK apartment", area: "Whitefield", status: "Qualified" },
  { type: "Villa", area: "Sarjapur Road", status: "Site visit booked" },
  { type: "Plot", area: "Devanahalli", status: "New enquiry" },
  { type: "2 BHK", area: "Electronic City", status: "Qualified" },
  { type: "Commercial space", area: "Hebbal", status: "Contacted" },
  { type: "Farmland", area: "Kanakapura", status: "New enquiry" },
];

// Client logos for the scrolling marquee.
// Drop the image files into public/images/clients/ in the live project.
const CLIENTS = [
  { name: "Rathna Bhoomi Developers", logo: "/images/clients/rathna-bhoomi.jpg" },
  { name: "Garuda Holiday", logo: "/images/clients/garuda-holiday.jpg" },
  { name: "Gruhakalpa", logo: "/images/clients/gruhakalpa.jpg" },
  { name: "GK Hill View", logo: "/images/clients/gk-hill-view.jpg" },
  { name: "NS Brothers SLV", logo: "/images/clients/ns-brothers-slv.jpg" },
  { name: "Northern Lights", logo: "/images/clients/northern-lights.jpg" },
  { name: "The Vector Graphics", logo: "/images/clients/vector-graphics.jpg" },
  { name: "Varnam", logo: "/images/clients/varnam.jpg" },
];

// On-brand gradient covers for the work cards (no image dependency).
const WORK_GRADS = [
  ["#0037CA", "#3D6BF0"],
  ["#0a5f7a", "#1b8fb0"],
  ["#b5651d", "#f0a24b"],
  ["#1b3bd6", "#5b8cff"],
  ["#0e3fae", "#2ea3d1"],
  ["#8a4a12", "#2E6BFF"],
];

// "Our Work" flip cards — front = cover + name; back = brief, delivery, result.
// Non-clickable (landing page has no case-study routes). Edit numbers freely.
const WORKS = [
  {
    client: "Rathna Bhoomi Developers",
    category: "Google Ads",
    title: "Google Ads that fill the site-visit calendar",
    summary:
      "Rebuilt account structure and honest conversion tracking turned wasted spend into a steady stream of booked site visits.",
    services: ["Google Ads", "Landing Pages", "Conversion Tracking", "Call Tracking"],
    metrics: [
      { v: "3.1x", l: "Return on ad spend" },
      { v: "-46%", l: "Cost per lead" },
      { v: "+82%", l: "Booked site visits" },
    ],
  },
  {
    client: "GK Hill View",
    category: "Real Estate",
    title: "A plotted-development launch with a full pipeline",
    summary:
      "Meta + Google campaigns feeding a conversion landing page brought a flood of qualified plot enquiries at launch.",
    services: ["Meta Ads", "Google Ads", "Landing Page", "Lead Forms"],
    metrics: [
      { v: "1,200+", l: "Launch enquiries" },
      { v: "5x", l: "Return on ad spend" },
    ],
  },
  {
    client: "Gruhakalpa",
    category: "WhatsApp Automation",
    title: "Instant WhatsApp follow-up on every lead",
    summary:
      "An automated WhatsApp flow answered and qualified buyers within seconds, so the team spoke only to serious ones.",
    services: ["WhatsApp Business API", "MSG91", "CRM Integration", "Chatbot"],
    metrics: [
      { v: "<2 min", l: "First response" },
      { v: "+38%", l: "Qualified rate" },
    ],
  },
  {
    client: "NS Brothers SLV",
    category: "Web & SEO",
    title: "A fast project microsite that ranks locally",
    summary:
      "A performance-first microsite plus local SEO lifted organic visibility and enquiry conversions.",
    services: ["Web Development", "SEO", "Performance", "Analytics"],
    metrics: [
      { v: "1.6s", l: "Largest paint" },
      { v: "+64%", l: "Organic traffic" },
    ],
  },
  {
    client: "Garuda Holiday",
    category: "Performance Marketing",
    title: "Full-funnel lead gen that scales profitably",
    summary:
      "Google + Meta campaigns with strong creative delivered a steady pipeline at a lower cost per lead.",
    services: ["Google Ads", "Meta Ads", "Creative", "Tracking"],
    metrics: [
      { v: "-39%", l: "Cost per lead" },
      { v: "2.4x", l: "Lead volume" },
    ],
  },
  {
    client: "The Vector Graphics",
    category: "Branding & Creative",
    title: "An ad-creative system that lifts every campaign",
    summary:
      "A cohesive creative system for ads and landing pages raised click-through and made testing faster.",
    services: ["Creative Direction", "Ad Creative", "Design System", "Ad Ops"],
    metrics: [
      { v: "+2.1x", l: "Ad click-through" },
      { v: "30+", l: "Assets shipped" },
    ],
  },
];

const WHY_US = [
  {
    Icon: Building2,
    title: "Built for Real Estate Projects",
    desc: "Marketing strategies created specifically for real estate projects — not generic templates.",
  },
  {
    Icon: Megaphone,
    title: "One Team, All Channels",
    desc: "Google Ads, Meta Ads and digital marketing handled together under one team.",
  },
  {
    Icon: Search,
    title: "Location-Based Targeting",
    desc: "Campaigns planned around your project location and target buyers.",
  },
  {
    Icon: BarChart3,
    title: "Transparent Reporting",
    desc: "Clear, transparent lead and performance reporting.",
  },
  {
    Icon: Database,
    title: "CRM Lead Tracking",
    desc: "Better lead tracking and follow-up through CRM.",
  },
  {
    Icon: RefreshCw,
    title: "Continuous Optimisation",
    desc: "Ongoing campaign optimisation to improve lead quality.",
  },
];

const SERVICES = [
  {
    Icon: Megaphone,
    title: "Performance Marketing",
    desc: "Generate property enquiries through targeted Google Ads and Meta Ads campaigns planned around your project location, pricing and buyer profile.",
  },
  {
    Icon: Share2,
    title: "Social Media Management",
    desc: "Build trust and keep your projects visible with professional posts, reels, project updates and promotional content.",
  },
  {
    Icon: Layers,
    title: "Graphic Design & Video Editing",
    desc: "Promote your properties with attractive ad creatives, brochures, social media designs, reels and property videos.",
  },
  {
    Icon: LayoutTemplate,
    title: "Website & Landing Page Design",
    desc: "Convert visitors into enquiries with mobile-friendly websites and landing pages integrated with forms, calls and WhatsApp.",
  },
  {
    Icon: Database,
    title: "CRM & Lead Management",
    desc: "Capture, assign and track every enquiry with follow-up reminders, lead status updates and sales-team visibility.",
  },
];

const PROCESS = [
  {
    title: "Understand Your Project",
    desc: "We study your property type, location, price range, target buyers and competition.",
  },
  {
    title: "Create the Marketing Plan",
    desc: "We select the right advertising platforms, audiences, messages and creatives.",
  },
  {
    title: "Launch and Track Campaigns",
    desc: "We run campaigns and track calls, form enquiries, WhatsApp leads and campaign performance.",
  },
  {
    title: "Improve Lead Quality",
    desc: "We review search terms, audiences, locations and sales feedback to reduce irrelevant leads.",
  },
];

const TESTIMONIALS = []; // removed fabricated testimonials — add real, attributable quotes

const FAQS = [
  {
    q: "How can digital marketing help my real estate business?",
    a: "Digital marketing helps you reach potential buyers actively looking for properties, generate qualified enquiries, increase site visits, and improve project visibility through targeted online campaigns.",
  },
  {
    q: "Which marketing channels work best for real estate lead generation?",
    a: "Google Ads and Meta Ads are among the most effective channels for generating property enquiries. Combined with landing pages, WhatsApp marketing, and remarketing campaigns, they help attract and convert potential buyers.",
  },
  {
    q: "Do you work with builders, developers, and real estate consultants?",
    a: "Yes. We work with builders, developers, property consultants, plotted development projects, apartment projects, villa projects, and other real estate businesses looking to increase lead generation and sales opportunities.",
  },
  {
    q: "How long does it take to start generating leads?",
    a: "Campaign performance depends on factors such as project location, competition, budget, and market demand. In many cases, qualified enquiries can start coming in within the first few weeks of campaign launch.",
  },
  {
    q: "Can you manage both Google Ads and Meta Ads?",
    a: "Yes. We provide end-to-end campaign management across Google Ads, Facebook, and Instagram to help maximise reach, improve lead quality, and increase conversion opportunities.",
  },
  {
    q: "How do you track lead quality and campaign performance?",
    a: "We implement conversion tracking, lead tracking, and performance reporting to help you understand where your enquiries are coming from and how your campaigns are performing.",
  },
  {
    q: "Do I need a landing page for my real estate project?",
    a: "A dedicated landing page is highly recommended because it focuses on lead generation, improves conversion rates, and helps capture more qualified enquiries compared to sending traffic to a general website.",
  },
  {
    q: "How do I get started?",
    a: "Simply book a free consultation with our team. We will review your project, understand your goals, and recommend a customised digital marketing strategy for your business.",
  },
];

const FOOTER_SERVICES = [
  { label: "Social Media Marketing", to: "#services" },
  { label: "SEO", to: "#services" },
  { label: "Google Ads", to: "#services" },
  { label: "Email Marketing", to: "#services" },
  { label: "Branding", to: "#services" },
  { label: "Web Development", to: "#services" },
  { label: "UI UX Design", to: "#services" },
  { label: "Graphic Design", to: "#services" },
  { label: "AI Automation", to: "#services" },
];

const FOOTER_LINKS = [
  { label: "About Us", to: "#about" },
  { label: "Services", to: "#services" },
  { label: "Process", to: "#process" },
  { label: "Testimonials", to: "#testimonials" },
  { label: "FAQ", to: "#faq" },
  { label: "Contact", to: "#contact" },
  {
    label: "Blogs",
    to: "https://www.skyupdigitalsolutions.com/blogs-difference-between-digital-marketing-and-traditional-marketing",
    external: true,
  },
  {
    label: "Careers",
    to: "https://www.skyupdigitalsolutions.com/careers-digital-marketing-job",
    external: true,
  },
  {
    label: "Privacy Policy",
    to: "https://www.skyupdigitalsolutions.com/privacypolicy",
    external: true,
  },
  {
    label: "Terms & Conditions",
    to: "https://www.skyupdigitalsolutions.com/termscondition",
    external: true,
  },
];

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");

    const els = document.querySelectorAll(".reveal");

    // Fallback: if IntersectionObserver isn't available, just show everything
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -50px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.to.replace("#", ""));
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);
  return activeSection;
}

function scrollToSection(e, href, closeMobile) {
  e.preventDefault();
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
  if (closeMobile) closeMobile();
}

/* ══════════════════════════════════════════
   GOOGLE "G" LOGO
══════════════════════════════════════════ */
function GoogleG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════
   SHARED: SectionHeading
══════════════════════════════════════════ */
function SectionHeading({ eyebrow, title, description, center, light }) {
  return (
    <div
      className={`reveal ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    >
      <div
        className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}
      >
        <span className="gold-rule" />
        <span
          style={{
            color: light ? "rgba(255,255,255,0.75)" : C.brand,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        {center && <span className="gold-rule" />}
      </div>

      <h2
        style={{
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 700,
          lineHeight: 1.18,
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            lineHeight: 1.8,
            color: light ? "rgba(255,255,255,0.72)" : C.muted,
            maxWidth: "620px",
          }}
          className={center ? "mx-auto" : ""}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   HEADER
══════════════════════════════════════════ */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();
  const isActive = (to) => activeSection === to.replace("#", "");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="header-animate glass-header sticky top-0 left-0 w-full h-20 font-poppins z-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-3">
            <a href="/" className="flex items-center gap-2 !no-underline">
              <img
                src="/images/logo_skyup.svg"
                alt="SKYUP Logo"
                className="h-10 w-auto sm:h-12 md:h-10 lg:h-12"
                width={192}
                height={55}
                fetchPriority="high"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>
            <nav className="hidden md:flex flex-1 justify-center">
              <div className="glass-pill inline-flex items-center rounded-full px-3 py-2 lg:px-4 gap-1 lg:gap-2">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.to}
                    onClick={(e) => scrollToSection(e, l.to)}
                    className="inline-flex items-center justify-center px-3 py-2 lg:px-4 rounded-full font-semibold whitespace-nowrap text-sm transition-all duration-200"
                    style={
                      isActive(l.to)
                        ? {
                            color: "#fff",
                            background:
                              "linear-gradient(135deg,#3D6BF0,#0037CA)",
                            boxShadow: "0 6px 16px -4px rgba(0,55,202,0.6)",
                          }
                        : { color: "rgba(255,255,255,0.72)" }
                    }
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-3">
                {SOCIAL_LINKS_NAV.map(({ iconSrc, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"  
                  >
                    <img src={iconSrc} alt={label} width={35} height={35} />
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="hidden md:inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{
                  background: "linear-gradient(135deg,#FA9F43,#F1891A)",
                  boxShadow: "0 6px 16px -4px rgba(250,159,67,0.55)",
                }}
              >
                Contact Us
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex md:hidden items-center justify-center p-2 rounded-full text-white"
                style={{ background: C.brand }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {mobileOpen && (
        <div
          className="mobile-menu-enter md:hidden fixed left-0 right-0 top-20 z-[9999] shadow-lg"
          style={{ background: C.cream }}
        >
          <nav className="flex flex-col px-4 pb-4 pt-3 space-y-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={(e) =>
                  scrollToSection(e, l.to, () => setMobileOpen(false))
                }
                className="w-full text-left text-sm font-medium px-3 py-2 rounded-md block"
                style={
                  isActive(l.to)
                    ? { background: "rgba(255,255,255,0.08)", color: "#fff" }
                    : { color: "rgba(255,255,255,0.75)" }
                }
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              {SOCIAL_LINKS_NAV.map(({ iconSrc, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                  style={{
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                  }}
                >
                  <img src={iconSrc} alt={label} width={20} height={20} />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) =>
                scrollToSection(e, "#contact", () => setMobileOpen(false))
              }
              className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: C.brand }}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   HERO AUTO-ANIMATION HELPERS
   All animations run on load / on a timer — no scroll triggers.
══════════════════════════════════════════ */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Splits a stat string like "1,000 +" or "< 7 Days" into a numeric target
// plus the surrounding text so only the number counts up.
function parseStatValue(value) {
  const m = value.match(/[\d,]+/);
  if (!m) return { prefix: value, target: null, suffix: "" };
  const numStr = m[0];
  return {
    prefix: value.slice(0, m.index),
    target: parseInt(numStr.replace(/,/g, ""), 10),
    suffix: value.slice(m.index + numStr.length),
  };
}

function CountUpStat({ value, style }) {
  const { prefix, target, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(
    target === null ? value : `${prefix}0${suffix}`,
  );
  useEffect(() => {
    if (target === null || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    let raf;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(target * eased);
      setDisplay(`${prefix}${cur.toLocaleString("en-IN")}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div style={style}>{display}</div>;
}

function leadStatusColor(status) {
  return status === "Qualified" || status === "Site visit booked"
    ? { bg: "#E7F6EC", fg: "#1B7F3B" }
    : { bg: "#FFF2E1", fg: "#B26A16" };
}

/* The hero "engine" visual: an auto-running lead pipeline + a sample CRM feed.
   All motion is on load / on a timer — no scroll triggers. */
function LeadCommandCenter() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);
  const n = LEAD_FEED.length;
  const visible = [0, 1, 2].map((k) => LEAD_FEED[(tick + k) % n]);

  return (
    <div className="engine-card">
      <div className="engine-topline" />
      <div className="engine-grid" style={{ padding: "20px 20px 22px" }}>
        {/* header */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "18px" }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: C.brandDark,
                letterSpacing: "-0.01em",
              }}
            >
              Your lead-generation engine
            </div>
            <div style={{ fontSize: "11px", color: C.subtle, marginTop: "2px" }}>
              From ad click to booked site visit
            </div>
          </div>
          <span
            className="flex items-center gap-1.5"
            style={{
              fontSize: "10.5px",
              fontWeight: 600,
              color: "#1B7F3B",
              background: "#E7F6EC",
              padding: "4px 10px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="pulse-dot"
              style={{ width: "7px", height: "7px" }}
              aria-hidden="true"
            />
            Sample activity
          </span>
        </div>

        {/* pipeline */}
        <div className="pipe" style={{ marginBottom: "22px" }}>
          <div className="pipe-track" />
          <div className="flow-dot" style={{ animationDelay: "0s" }} />
          <div className="flow-dot" style={{ animationDelay: "1.75s" }} />
          <div className="flow-dot" style={{ animationDelay: "3.5s" }} />
          <div className="flow-dot" style={{ animationDelay: "5.25s" }} />
          <div className="flex justify-between">
            {PIPELINE_STAGES.map(({ Icon, label }, i) => (
              <div
                key={label}
                className="pipe-node flex flex-col items-center"
                style={{ width: "20%" }}
              >
                <div
                  className="pipe-icon"
                  style={{ animationDelay: `${0.7 + i * 1.4}s` }}
                >
                  <Icon size={22} />
                </div>
                <span
                  style={{
                    marginTop: "8px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    color: C.muted,
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-3 gap-2" style={{ marginBottom: "16px" }}>
          {COMMAND_METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${C.creamBorder}`,
                borderRadius: "14px",
                padding: "12px 8px",
                textAlign: "center",
              }}
            >
              <CountUpStat
                value={m.value}
                style={{
                  fontSize: "19px",
                  fontWeight: 800,
                  color: C.brand,
                  letterSpacing: "-0.02em",
                }}
              />
              <div
                style={{
                  marginTop: "3px",
                  fontSize: "9.5px",
                  fontWeight: 600,
                  color: C.subtle,
                  lineHeight: 1.3,
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* sparkline */}
        <svg
          viewBox="0 0 320 44"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "38px", marginBottom: "16px", display: "block" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="skyupSparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0037CA" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0037CA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="spark-area"
            d="M0,38 L0,30 L46,26 L92,28 L137,18 L183,20 L229,10 L274,12 L320,4 L320,44 L0,44 Z"
            fill="url(#skyupSparkFill)"
          />
          <path
            className="spark-path"
            d="M0,30 L46,26 L92,28 L137,18 L183,20 L229,10 L274,12 L320,4"
            fill="none"
            stroke="#0037CA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* lead feed */}
        <div
          style={{
            fontSize: "10.5px",
            fontWeight: 600,
            color: C.subtle,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Incoming enquiries
        </div>
        <div className="flex flex-col gap-2">
          {visible.map((lead, k) => {
            const c = leadStatusColor(lead.status);
            return (
              <div
                key={k === 0 ? `lead-${tick}` : `lead-slot-${k}`}
                className={k === 0 ? "lead-enter" : ""}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${C.creamBorder}`,
                  borderRadius: "12px",
                  padding: "10px 12px",
                  opacity: k === 2 ? 0.55 : 1,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: C.brandDark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lead.type}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: C.muted,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lead.area}
                  </div>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: c.fg,
                    background: c.bg,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lead.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CLIENT LOGO MARQUEE — auto-scrolling, pauses on hover
══════════════════════════════════════════ */
function ClientMarquee() {
  return (
    <section
      className="font-poppins"
      style={{
        background: "#04050C",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ padding: "46px 0 50px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.orange,
            marginBottom: "28px",
          }}
        >
          Trusted by growing brands
        </p>
        <div className="marquee">
          <div className="marquee-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div className="logo-chip" key={`${c.name}-${i}`}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   OUR WORK — 3D flip cards (hover on desktop, tap on mobile)
   Non-clickable: no case-study links (landing page).
══════════════════════════════════════════ */
function WorkCard({ work, i }) {
  const [flipped, setFlipped] = useState(false);
  const [g1, g2] = WORK_GRADS[i % WORK_GRADS.length];
  return (
    <div
      className={`wfc${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
    >
      <span className="wfc-glow" aria-hidden="true" />
      <div className="wfc-inner">
        {/* FRONT */}
        <div className="wfc-face wfc-front">
          <div
            className="wfc-thumb"
            style={{ background: `linear-gradient(150deg, ${g1}, ${g2})` }}
          />
          <span className="wfc-cat">{work.category}</span>
          <div className="wfc-front-body">
            <div className="wfc-title">{work.title}</div>
            <div className="wfc-client">{work.client}</div>
            <span className="wfc-hint">Hover / tap to see the work</span>
          </div>
        </div>
        {/* BACK */}
        <div className="wfc-face wfc-back">
          <div className="wfc-back-inner">
            <div className="wfc-bcat">{work.category}</div>
            <div className="wfc-bclient">{work.client}</div>
            <p className="wfc-summary">{work.summary}</p>
            <div>
              <div className="wfc-label">What we delivered</div>
              <div className="wfc-chips">
                {work.services.map((s) => (
                  <span className="wfc-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="wfc-metrics">
              {work.metrics.map((m, k) => (
                <div key={k}>
                  <div className="wfc-mv">{m.v}</div>
                  <div className="wfc-ml">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorksFlip() {
  return (
    <section id="works" className="font-poppins" style={{ background: "#04050C" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div style={{ maxWidth: "60ch", marginBottom: "clamp(32px,5vw,54px)" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.orange,
            }}
          >
            Our Work
          </span>
          <h2
            style={{
              marginTop: "12px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              fontSize: "clamp(1.9rem,4vw,3rem)",
              lineHeight: 1.05,
              color: "#EEF2FF",
            }}
          >
            Real projects, real outcomes.
          </h2>
          <p
            style={{
              marginTop: "14px",
              color: C.muted,
              fontSize: "1.02rem",
              lineHeight: 1.6,
            }}
          >
            Hover a card on desktop, or tap on mobile, to see the brief, what we
            delivered, and the result.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(18px,2.4vw,28px)" }}
        >
          {WORKS.map((w, i) => (
            <WorkCard key={w.client} work={w} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Ad-platforms lockup for the intro: shows the combined Google Ads + Meta
   logo on a light card (the logos' dark text needs a light background).
   Falls back to text if the image file is missing. */
function AdLockup() {
  const [ok, setOk] = useState(true);
  return (
    <div className="ad-lockup">
      {ok ? (
        <img
          src="/images/ads/ad-platforms.webp"
          alt="Google Ads and Meta"
          onError={() => setOk(false)}
        />
      ) : (
        <span className="ad-lockup-fallback">Google Ads&nbsp;&nbsp;·&nbsp;&nbsp;Meta</span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CINEMATIC INTRO — plays once per session on load, then reveals the site.
   Skippable, respects reduced-motion, locks scroll while playing.
══════════════════════════════════════════ */
function CinematicIntro() {
  const [visible, setVisible] = useState(false); // client-only: no SSR flash
  const [leaving, setLeaving] = useState(false);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    let force = false;
    try {
      force = new URLSearchParams(window.location.search).get("intro") === "1";
    } catch {}
    let seen = false;
    try {
      seen = sessionStorage.getItem("skyup_intro_seen") === "1";
    } catch {}
    // Do NOT gate on prefers-reduced-motion (this project's test env has it on, which
    // made the intro abort after one paint = "stalls on the ads"). Skip only if already
    // seen this session, unless ?intro=1 forces it.
    if (!force && seen) return; // visible stays false -> nothing renders, no flash

    setVisible(true);
    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setScene(1), 2000),
      setTimeout(() => setScene(2), 4000),
      setTimeout(() => setLeaving(true), 6000),
      setTimeout(() => setVisible(false), 6800),
      // mark seen only near the end so an interrupted play never locks it out
      setTimeout(() => { if (!force) { try { sessionStorage.setItem("skyup_intro_seen", "1"); } catch {} } }, 5800),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  const skip = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 420);
  };

  if (!visible) return null;

  return (
    <div
      className={`intro${leaving ? " leaving" : ""}`}
      onClick={skip}
      role="presentation"
    >
      <div className="intro-glow a" aria-hidden="true" />
      <div className="intro-glow b" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />
      <button
        type="button"
        className="intro-skip"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
      >
        Skip ›
      </button>

      <div className="intro-stage">
        <div className="intro-scene" key={scene}>
          {scene === 0 && (
            <>
              <div className="intro-caption">You run the ads…</div>
              <div className="intro-ads">
                <AdLockup />
              </div>
              <span className="click-ripple" aria-hidden="true" />
            </>
          )}
          {scene === 1 && (
            <>
              <div className="intro-caption">
                …we turn clicks into qualified buyers…
              </div>
              <div className="lead-stack">
                <div className="lead-card l1">New enquiry · Whitefield</div>
                <div className="lead-card l2">Site visit booked · Sarjapur</div>
                <div className="lead-card l3">Qualified lead · Devanahalli</div>
              </div>
            </>
          )}
          {scene === 2 && (
            <>
              <div className="intro-caption">
                …so you close more property deals.
              </div>
              <div className="win-check">
                <CheckCircle2 size={60} strokeWidth={1.6} />
              </div>
              <div className="intro-logo">SKYUP</div>
            </>
          )}
        </div>
      </div>

      <div className="intro-progress">
        <span />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO — lead form wired to backend POST /add-contact
══════════════════════════════════════════ */
function Hero() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    location: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Meta CRM lead tracking (GTM path) ────────────────────────────────────
// Pushes the lead into the GTM dataLayer only. The actual HTTP call to the
// CRM's /website-webhook endpoint is made by the GTM Custom HTML tag that
// fires on the `crm_lead` event — same tag used by the contact form.
//
// The webhook controller reads EXACTLY: webhook_secret, name, mobile, email, message
// so these dataLayer keys map 1:1 into that tag. `lead_*` are canonical;
// `form_*` are kept for backward compatibility with any existing tags.
const pushCrmLead = (values) => {
  if (typeof window === "undefined") return;

  // Hero form has no single "message" field, so fold company/location/budget
  // into one enriched message string (same approach as the contact form).
  const enrichedMessage = [
    values.company && `Company: ${values.company}`,
    values.location && `Project Location: ${values.location}`,
    values.budget && `Budget: ${values.budget}`,
  ]
    .filter(Boolean)
    .join(" | ") || "Homepage consultation request";

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "crm_lead",

    // ── canonical keys → map these into the GTM webhook tag ──
    lead_name: values.name,
    lead_mobile: values.phone,
    lead_email: values.email,
    lead_message: enrichedMessage,
    lead_source: "Skyup_homepage_hero",

    // ── legacy keys (kept for backward compatibility) ──
    form_name: values.name,
    form_mobile: values.phone,
    form_email: values.email,
    form_message: enrichedMessage,
    form_source: "Skyup_homepage_hero",
  });
};
  
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // Fire CRM tracking FIRST, independent of the backend call — this is what
  // triggers the GTM CRM webhook tag and should never be blocked by an
  // unrelated /api/contacts failure.
  pushCrmLead(form);

  const payload = {
    name: form.name,
    company: form.company || "Not specified",
    email: form.email || "not-provided@skyupdigitalsolutions.com",
    phone: form.phone.replace(/\D/g, ""),
    service: "Real Estate Digital Marketing",
    budget: form.budget || "Not specified",
    message:
      [form.location && `Project Location: ${form.location}`]
        .filter(Boolean)
        .join("\n") || "Homepage consultation request",
  };

  try {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Request failed (${res.status})`);
    }
    setSubmitted(true);
  } catch (err) {
    setError(
      err.message === "Failed to fetch"
        ? "Couldn't reach the server. Please check your connection and try again."
        : err.message,
    );
  } finally {
    setLoading(false);
  }
};

  const inputStyle = {
    width: "100%",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.12)",
    padding: "11px 16px",
    fontSize: "14px",
    background: "rgba(255,255,255,0.04)",
    color: "#EEF2FF",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <section id="home" className="font-poppins" style={{ background: C.cream }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          {/* ── LEFT ── */}
          <div className="animate-fiu">
            <div
              className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                color: C.brand,
                fontSize: "12px",
                fontWeight: 600,
                border: `1px solid ${C.creamBorder}`,
              }}
            >
              <MapPin size={13} />
              Real Estate Digital Marketing Services in Bangalore
            </div>

            <h1
              className="mt-5 font-['inter']"
              style={{
                fontSize: "clamp(36px, 5vw, 50px)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Digital Marketing &amp;{" "}
              <span className="animated-gradient-text">Lead Generation</span>
              <br />
              for Real Estate Businesses
            </h1>

            <p
              className="mt-5"
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: C.muted,
                maxWidth: "500px",
              }}
            >
              We help builders, developers, plotted-development companies and
              property consultants generate buyer enquiries through Google Ads,
              Meta Ads, conversion-focused landing pages and CRM-based lead
              tracking.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${C.brand} 0%, #1F6BFF 100%)`,
                  fontSize: "14px",
                }}
              >
                Get Free Real Estate Lead Audit
              </a>
              <a
                href="tel:+918867867775"
                className="glass-pill inline-flex items-center justify-center gap-2 font-semibold rounded-full px-7 py-3.5"
                style={{ fontSize: "14px", color: "#EEF2FF" }}
              >
                Call Marketing Expert
                <ArrowRight size={15} />
              </a>
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{ fontSize: "12.5px", fontWeight: 600, color: C.muted }}
            >
              {CHECKLIST.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: C.brand }}
                  />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <LeadCommandCenter />
            </div>

            <div
              className="mt-5 flex items-center gap-2"
              style={{ fontSize: "12.5px", color: C.subtle }}
            >
              <ShieldCheck
                size={14}
                className="flex-shrink-0"
                style={{ color: C.gold }}
              />
              Trusted by real estate businesses looking to scale their lead
              generation
            </div>
          </div>

          {/* ── RIGHT — Lead Form ── */}
          <div id="consultation" className="animate-fiu delay-2 scroll-mt-24">
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 0%, rgba(46,107,255,0.12), transparent 55%), linear-gradient(160deg,#0c1024,#070a14)",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  height: "4px",
                  background: `linear-gradient(90deg, ${C.brand}, #1F6BFF, ${C.gold})`,
                }}
              />

              <div className="p-7 sm:p-9">
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Request a Free Consultation
                </h2>
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    color: C.muted,
                    lineHeight: 1.6,
                  }}
                >
                  Get a custom growth plan for your project — we respond within
                  24 hours.
                </p>

                {submitted ? (
                  <div
                    className="mt-8 flex flex-col items-center rounded-2xl px-4 py-12 text-center"
                    style={{ background: C.cream }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 64,
                        height: 64,
                        background: `${C.brand}18`,
                      }}
                    >
                      <CheckCircle2 size={32} style={{ color: C.brand }} />
                    </div>
                    <h3
                      style={{
                        marginTop: "16px",
                        fontSize: "20px",
                        fontWeight: 700,
                      }}
                    >
                      Thanks, {form.name || "there"}!
                    </h3>
                    <p
                      style={{
                        marginTop: "8px",
                        fontSize: "14px",
                        color: C.muted,
                        lineHeight: 1.7,
                      }}
                    >
                      We've received your details. Our team will reach out
                      shortly with your free growth plan.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}
                    style={{
                      marginTop: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    {[
                      {
                        id: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Your full name",
                        required: true,
                      },
                      {
                        id: "phone",
                        label: "Phone Number",
                        type: "tel",
                        placeholder: "+91 00000 00000",
                        required: true,
                      },
                      {
                        id: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "you@example.com",
                        required: false,
                      },
                      {
                        id: "company",
                        label: "Company / Builder",
                        type: "text",
                        placeholder: "Your company name",
                        required: false,
                      },
                      {
                        id: "location",
                        label: "Project Location",
                        type: "text",
                        placeholder: "e.g., Whitefield, Bangalore",
                        required: false,
                      },
                    ].map(({ id, label, type, placeholder, required }) => (
                      <div key={id}>
                        <label
                          htmlFor={id}
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {label}
                          {required && (
                            <span style={{ color: C.brand }}> *</span>
                          )}
                        </label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          required={required}
                          value={form[id]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          style={inputStyle}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="budget"
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          color: C.navy,
                          letterSpacing: "0.01em",
                        }}
                      >
                        Monthly Marketing Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        style={inputStyle}
                      >
                        <option value="">Select your budget (optional)</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#C0392B",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn-primary"
                      style={{
                        width: "100%",
                        borderRadius: "999px",
                        padding: "14px 24px",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "white",
                        background: `linear-gradient(135deg, ${C.brand} 0%, #1F6BFF 100%)`,
                        border: "none",
                        cursor: "pointer",
                        marginTop: "4px",
                        fontFamily: "Poppins, sans-serif",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {loading ? "Sending..." : "Get My Free Growth Plan →"}
                    </button>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: C.subtle,
                      }}
                    >
                      🔒 Your information is never shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
const SCAN_CSS = `
  .scan-wrap { position: relative; margin-top: 48px; overflow: hidden; padding: 10px 0; }
  .scan-beam {
    position: absolute; top: 6px; bottom: 6px; width: 2px; left: -4%;
    background: linear-gradient(180deg, transparent, #4C86FF 25%, #2E6BFF 75%, transparent);
    box-shadow: 0 0 26px 7px rgba(76,134,255,0.55);
    animation: scanSweep 4.6s ease-in-out infinite; z-index: 4; pointer-events: none;
  }
  @keyframes scanSweep { 0%{left:-4%;opacity:0} 8%{opacity:1} 90%{opacity:1} 100%{left:104%;opacity:0} }
  .scan-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; z-index: 1; }
  @media (max-width: 900px){ .scan-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
  @media (max-width: 560px){ .scan-grid { grid-template-columns: 1fr; } }
  .scan-card {
    position: relative; border-radius: 16px; padding: 24px 22px;
    background: linear-gradient(158deg, #FBA94E 0%, #F2801E 100%);
    border: 1px solid rgba(255,255,255,0.20);
    opacity: 0; transform: translateY(24px) scale(0.97);
    transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
    box-shadow: 0 18px 42px -24px rgba(0,0,0,0.75);
  }
  .scan-card.on { opacity: 1; transform: translateY(0) scale(1); }
  .scan-card.on:hover { box-shadow: 0 0 0 2px rgba(76,134,255,0.7), 0 22px 48px -22px rgba(0,0,0,0.8); }
  .scan-pin {
    width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.20); color: #ffffff; margin-bottom: 16px;
  }
  .scan-title { font-size: 16px; font-weight: 700; line-height: 1.3; color: #ffffff; margin: 0; text-shadow: 0 1px 2px rgba(120,55,0,0.35); }
  .scan-desc { margin: 10px 0 0; font-size: 14px; line-height: 1.7; color: #ffffff; text-shadow: 0 1px 2px rgba(120,55,0,0.28); }
`;

function WhyScan() {
  const [revealed, setRevealed] = useState(null); // null = show all (SSR / no-JS fallback)
  const wrapRef = useRef(null);

  useEffect(() => {
    setRevealed(0); // hide (client); section is below the fold so no visible flash
    const el = wrapRef.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      let i = 0;
      const tick = () => {
        setRevealed(i + 1);
        i += 1;
        if (i < WHY_US.length) setTimeout(tick, 820);
      };
      setTimeout(tick, 300);
    };
    if (typeof IntersectionObserver === "undefined") { run(); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (i) => revealed === null || i < revealed;

  return (
    <div ref={wrapRef} className="scan-wrap">
      <style dangerouslySetInnerHTML={{ __html: SCAN_CSS }} />
      <div className="scan-beam" aria-hidden="true" />
      <div className="scan-grid">
        {WHY_US.map(({ Icon: Ic, title, desc }, i) => (
          <div key={title} className={`scan-card${show(i) ? " on" : ""}`}>
            <div className="scan-pin"><Ic size={22} /></div>
            <h3 className="scan-title">{title}</h3>
            <p className="scan-desc">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="font-poppins" style={{ background: C.cream }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Real Estate Businesses Choose SkyUp"
          description="Everything we do is built around real estate lead generation — planned around your project, your location, and your buyers."
        />

        <WhyScan />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
const ROUTE_CSS = `
  .route-wrap { position: relative; margin-top: 44px; }
  .route-track { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; transform: translateX(-50%); background: rgba(76,134,255,0.18); z-index: 0; }
  .route-fill { position: absolute; left: 50%; top: 0; width: 2px; height: 0; transform: translateX(-50%); background: linear-gradient(180deg,#4C86FF,#2E6BFF); box-shadow: 0 0 16px 3px rgba(76,134,255,0.5); transition: height .12s linear; z-index: 1; }
  .route-pin { position: absolute; left: 50%; top: 0; transform: translate(-50%,-50%); color: #4C86FF; z-index: 3; transition: top .12s linear; }
  .route-rows { position: relative; display: flex; flex-direction: column; gap: 26px; z-index: 2; }
  .route-row { display: grid; grid-template-columns: 1fr 56px 1fr; align-items: center; }
  .route-node { grid-column: 2; justify-self: center; width: 16px; height: 16px; border-radius: 50%; background: #0a1020; border: 2px solid rgba(76,134,255,0.4); transition: all .4s ease; }
  .route-node.on { background: #4C86FF; border-color: #4C86FF; box-shadow: 0 0 0 5px rgba(76,134,255,0.18); }
  .route-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; padding: 20px 22px; opacity: 0; transform: translateY(16px); transition: opacity .55s ease, transform .55s ease, border-color .4s ease, box-shadow .4s ease; }
  .route-card.on { opacity: 1; transform: translateY(0); }
  .route-card.on.active { border-color: rgba(250,159,67,0.55); box-shadow: 0 0 0 1px rgba(250,159,67,0.35), 0 18px 40px -22px rgba(0,0,0,0.7); }
  .route-row.left .route-card { grid-column: 1; }
  .route-row.right .route-card { grid-column: 3; }
  .route-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(250,159,67,0.16); color: #FA9F43; margin-bottom: 14px; }
  .route-title { font-size: 16px; font-weight: 700; color: #ffffff; margin: 0; line-height: 1.3; }
  .route-desc { margin: 8px 0 0; font-size: 14px; line-height: 1.7; color: #c7d0ee; }
  @media (max-width: 760px) {
    .route-track, .route-fill, .route-pin { left: 22px; }
    .route-row { grid-template-columns: 44px 1fr; gap: 0; }
    .route-node { grid-column: 1; }
    .route-row.left .route-card, .route-row.right .route-card { grid-column: 2; }
  }
`;

function ServicesRoute() {
  const [revealed, setRevealed] = useState(null);
  const wrapRef = useRef(null), fillRef = useRef(null), pinRef = useRef(null), nodeRefs = useRef([]);

  const maxRef = useRef(0);

  useEffect(() => {
    setRevealed(0); // scroll-driven; section is below the fold so nothing shows until reached
    let raf = 0;

    const update = () => {
      raf = 0;
      const wrap = wrapRef.current, fill = fillRef.current, pin = pinRef.current;
      if (!wrap || !fill || !pin) return;
      const nodes = nodeRefs.current.filter(Boolean);
      if (!nodes.length) return;

      const firstY = nodes[0].offsetTop + nodes[0].offsetHeight / 2;
      const lastY = nodes[nodes.length - 1].offsetTop + nodes[nodes.length - 1].offsetHeight / 2;

      // Scroll progress: 0 when the section's top sits ~62% down the viewport,
      // 1 after it has scrolled up by roughly its own height.
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let prog = (vh * 0.62 - rect.top) / (rect.height || 1);
      prog = Math.max(0, Math.min(1, prog));

      // Pin travels only as far as the scroll says — the card reveals when it arrives.
      const pinY = firstY + prog * (lastY - firstY);
      pin.style.top = pinY + "px";
      fill.style.height = pinY + "px";

      let count = 0;
      for (let i = 0; i < nodes.length; i++) {
        const cy = nodes[i].offsetTop + nodes[i].offsetHeight / 2;
        if (pinY >= cy - 4) count = i + 1;
      }
      if (count > maxRef.current) { maxRef.current = count; setRevealed(count); }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update(); // set initial state for current scroll position
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const show = (i) => revealed == null || i < revealed;
  const active = (i) => revealed != null && i === revealed - 1;

  return (
    <div ref={wrapRef} className="route-wrap">
      <style dangerouslySetInnerHTML={{ __html: ROUTE_CSS }} />
      <div className="route-track" aria-hidden="true" />
      <div ref={fillRef} className="route-fill" aria-hidden="true" />
      <div ref={pinRef} className="route-pin" aria-hidden="true"><MapPin size={24} /></div>
      <div className="route-rows">
        {SERVICES.map(({ Icon: Ic, title, desc }, i) => (
          <div key={title} className={`route-row ${i % 2 === 0 ? "left" : "right"}`}>
            <div
              className={`route-card${show(i) ? " on" : ""}${active(i) ? " active" : ""}`}
            >
              <div className="route-icon"><Ic size={22} /></div>
              <h3 className="route-title">{title}</h3>
              <p className="route-desc">{desc}</p>
            </div>
            <div
              className={`route-node${show(i) ? " on" : ""}`}
              ref={(el) => (nodeRefs.current[i] = el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section
      id="services"
      className="font-poppins"
      style={{ background: C.cream }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Our Real Estate Marketing Services"
          title="Services Designed to Generate More Qualified Property Leads"
          description="A focused set of services built around one goal: turning ad spend into qualified enquiries, site visits, and sales opportunities for your project."
        />

        <ServicesRoute />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROCESS
══════════════════════════════════════════ */
const PROC_CSS = `
  .pt-wrap { position: relative; margin-top: 56px; }
  .pt-track { position: absolute; top: 26px; left: 0; right: 0; height: 2px; background: rgba(76,134,255,0.16); z-index: 0; }
  .pt-fill { position: absolute; top: 26px; left: 0; height: 2px; width: 0; background: linear-gradient(90deg,#4C86FF,#2E6BFF); box-shadow: 0 0 14px 2px rgba(76,134,255,0.5); transition: width 1.5s cubic-bezier(.22,1,.36,1); z-index: 1; }
  .pt-fill.grow { width: 100%; }
  .pt-pulse { position: absolute; top: 23px; left: 0; width: 8px; height: 8px; border-radius: 50%; background: #FA9F43; box-shadow: 0 0 12px 3px rgba(250,159,67,0.75); opacity: 0; z-index: 2; }
  .pt-wrap.done .pt-pulse { animation: ptPulse 3.4s ease-in-out 0.5s infinite; }
  @keyframes ptPulse { 0%{left:0;opacity:0} 6%{opacity:1} 94%{opacity:1} 100%{left:calc(100% - 8px);opacity:0} }
  .pt-grid { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; z-index: 2; }
  .pt-step { position: relative; text-align: left; opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
  .pt-step.on { opacity: 1; transform: translateY(0); }
  .pt-node { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #ffffff; font-size: 16px; background: #0e1424; border: 2px solid rgba(76,134,255,0.35); transition: all .45s ease; }
  .pt-step.on .pt-node { background: linear-gradient(150deg,#4C86FF,#2E6BFF); border-color: #4C86FF; box-shadow: 0 0 0 6px rgba(76,134,255,0.14), 0 8px 22px -6px rgba(46,107,255,0.85); }
  .pt-title { margin: 16px 0 0; font-size: 15px; font-weight: 700; color: #ffffff; line-height: 1.4; }
  .pt-desc { margin: 8px 0 0; font-size: 13px; line-height: 1.75; color: #9BA4BD; }
  @media (max-width: 820px) {
    .pt-track { top: 0; bottom: 0; left: 25px; right: auto; width: 2px; height: auto; }
    .pt-fill { top: 0; left: 25px; width: 2px; height: 0; transition: height 1.5s cubic-bezier(.22,1,.36,1); }
    .pt-fill.grow { height: 100%; width: 2px; }
    .pt-pulse { display: none; }
    .pt-grid { grid-template-columns: 1fr; gap: 26px; }
    .pt-step { display: grid; grid-template-columns: 52px 1fr; column-gap: 16px; align-items: start; }
    .pt-node { grid-row: 1; }
    .pt-title { grid-column: 2; margin-top: 12px; }
    .pt-desc { grid-column: 2; }
  }
`;

function ProcessTimeline() {
  const [revealed, setRevealed] = useState(null); // null = show all (SSR / no-JS fallback)
  const [lineOn, setLineOn] = useState(false);
  const [done, setDone] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    setRevealed(0);
    const el = wrapRef.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => setLineOn(true)); // draw the connector line
      let i = 0;
      const tick = () => {
        setRevealed(i + 1);
        i += 1;
        if (i < PROCESS.length) setTimeout(tick, 340);
        else setTimeout(() => setDone(true), 700); // then start the ambient pulse
      };
      setTimeout(tick, 250);
    };
    if (typeof IntersectionObserver === "undefined") { run(); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (i) => revealed == null || i < revealed;

  return (
    <div ref={wrapRef} className={`pt-wrap${done ? " done" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: PROC_CSS }} />
      <div className="pt-track" aria-hidden="true" />
      <div className={`pt-fill${lineOn ? " grow" : ""}`} aria-hidden="true" />
      <div className="pt-pulse" aria-hidden="true" />
      <div className="pt-grid">
        {PROCESS.map((step, i) => (
          <div key={step.title} className={`pt-step${show(i) ? " on" : ""}`}>
            <div className="pt-node">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="pt-title">{step.title}</h3>
            <p className="pt-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Process() {
  return (
    <section id="process" className="font-poppins" style={{ background: C.cream }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Our Process"
          title="How We Help You Generate Better Leads"
          description="A clear four-step workflow that takes your project from audience research to a steady stream of tracked, follow-up-ready enquiries."
        />

        <ProcessTimeline />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS — styled as Google reviews
══════════════════════════════════════════ */
function Testimonials() {
  const AVATAR_COLORS = ["#1A73E8", "#EA4335", "#34A853", "#F9AB00"];
  const GOLD = "#FBBC04";

  return (
    <section
      id="testimonials"
      className="font-poppins"
      style={{ background: C.cream }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16">
        {/* heading */}
        <div className="text-center reveal mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="gold-rule" />
            <span
              style={{
                color: C.brand,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Testimonial
            </span>
            <span className="gold-rule" />
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.16,
              letterSpacing: "-0.025em",
            }}
          >
            What our clients say
          </h2>
        </div>

        {/* review cards */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="reveal surface flex flex-col rounded-2xl lg:mt-4 p-6"
              style={{
                border: `1px solid ${C.creamBorder}`,
                boxShadow: "0 2px 16px rgba(0,55,202,0.05)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* header row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full text-white"
                    style={{
                      width: 44,
                      height: 44,
                      fontSize: "16px",
                      fontWeight: 700,
                      background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#EEF2FF",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: C.subtle,
                        marginTop: "2px",
                      }}
                    >
                      {t.time}
                    </div>
                  </div>
                </div>
                <GoogleG size={20} />
              </div>

              {/* stars */}
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill={GOLD} stroke="none" />
                ))}
              </div>

              {/* review text */}
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#3c4043",
                }}
              >
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <section id="faq" className="font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:w-[450px] lg:flex-shrink-0 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="gold-rule" />
              <span
                style={{
                  color: C.brand,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Common Questions
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.2vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.18,
              }}
            >
              Frequently Asked
              <br />
              Questions
            </h2>
            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: 1.75,
                color: C.muted,
              }}
            >
              Can't find the answer you're looking for? Reach out to our team
              directly.
            </p>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="btn-primary inline-flex items-center justify-center rounded-full font-semibold text-white"
              style={{
                marginTop: "24px",
                padding: "13px 28px",
                background: `linear-gradient(135deg, ${C.brand} 0%, #1F6BFF 100%)`,
                fontSize: "14px",
              }}
            >
              Contact Support
            </a>
          </div>

          <div className="flex-1 min-w-0">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {visibleFaqs.map((f, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={f.q}
                    className={`faq-item surface overflow-hidden rounded-2xl ${isOpen ? "open" : ""}`}
                    style={{
                      border: `1.5px solid ${isOpen ? C.brand : C.creamBorder}`,
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-5 text-left"
                      style={{ padding: "20px 24px" }}
                      aria-expanded={isOpen}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          lineHeight: 1.45,
                        }}
                      >
                        {f.q}
                      </span>
                      <span
                        style={{
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: isOpen ? C.brand : "rgba(255,255,255,0.06)",
                          color: isOpen ? "#fff" : "#EEF2FF",
                          fontSize: "20px",
                          fontWeight: 300,
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition:
                            "transform 0.22s ease, background 0.2s, color 0.2s",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div className={`faq-body ${isOpen ? "open" : ""}`}>
                      <p
                        style={{
                          padding: "0 24px 20px",
                          fontSize: "14px",
                          lineHeight: 1.8,
                          color: C.muted,
                        }}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {FAQS.length > 5 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowAll((v) => !v);
                    if (showAll) setOpenIndex(null);
                  }}
                  className="glass-pill inline-flex items-center gap-2 rounded-full font-semibold"
                  style={{
                    color: C.brand,
                    padding: "12px 28px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {showAll ? (
                    <>
                      Show Less{" "}
                      <ChevronDown
                        size={16}
                        style={{ transform: "rotate(180deg)" }}
                      />
                    </>
                  ) : (
                    <>
                      View More ({FAQS.length - 5} more){" "}
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT / CTA
══════════════════════════════════════════ */
function Contact() {
  return (
    <section
      id="contact"
      className="font-poppins flex text-center"
      style={{
        background:
          "radial-gradient(60% 50% at 12% 0%, rgba(46,107,255,0.14), transparent 60%), radial-gradient(50% 45% at 92% 10%, rgba(250,159,67,0.10), transparent 60%), #04050C",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-12">
        <div className="reveal text-center ">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="gold-rule" />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Get Started Today
            </span>
            <span className="gold-rule" />
          </div>

          <h2
            className="max-w-5xl "
            style={{
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.14,
              letterSpacing: "-0.015em",
            }}
          >
            Ready to Grow Your Real Estate Business?
          </h2>

          <p
            style={{
              margin: "20px auto 0",
              maxWidth: "540px",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            Book a free strategy session with our real estate marketing
            specialists and get a customised growth plan for your project.
          </p>

          <div className="my-3 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#consultation"
              onClick={(e) => scrollToSection(e, "#consultation")}
              className="btn-primary inline-flex items-center text-white justify-center rounded-full font-semibold"
              style={{
                background: "linear-gradient(135deg,#3D6BF0,#0037CA)",
                boxShadow: "0 10px 26px -10px rgba(46,107,255,0.7)",
                padding: "16px 36px",
                fontSize: "15px",
              }}
            >
              Book Free Strategy Session
            </a>
            <a
              href="tel:+918867867775"
              className="inline-flex items-center gap-2 rounded-full font-semibold text-white"
              style={{
                border: "1.5px solid rgba(255,255,255,0.30)",
                padding: "16px 32px",
                fontSize: "15px",
                background: "rgba(255,255,255,0.04)",
                transition: "background 0.2s",
              }}
            >
              <Phone size={16} />
              +91 88678 67775
            </a>
          </div>

          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
            style={{ fontSize: "13px" }}
          >
            {[
              "No commitment required",
              "Response within 24 hours",
              "100% confidential",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: C.gold }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function FooterLogo() {
  return (
    <a href="/" className="flex items-center gap-2 !no-underline">
      <img
        src="/images/skyup_logo.webp"
        alt="SkyUp Digital Solutions"
        className="w-[170px] h-auto"
      />
    </a>
  );
}

const FOOTER_SOCIAL = [
  {
    iconSrc: "/images/facebook.svg",
    href: "https://www.facebook.com/profile.php?id=61584820941998",
    label: "Facebook",
  },
  {
    iconSrc: "/images/instagram.svg",
    href: "https://www.instagram.com/skyupdigitalsolutions/",
    label: "Instagram",
  },
  {
    iconSrc: "/images/Linkedin.svg",
    href: "https://www.linkedin.com/company/110886969/admin/",
    label: "LinkedIn",
  },
  {
    iconSrc: "/images/youtube.svg",
    href: "https://www.youtube.com/@SKYUPDigitalSolutionsBengaluru",
    label: "YouTube",
  },
];

function FooterSocial({ gap = "gap-4" }) {
  return (
    <div className={`flex items-center ${gap}`}>
      {FOOTER_SOCIAL.map(({ Icon: Ic, iconSrc, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {Ic ? (
            <Ic
              size={20}
              className="text-white/70 hover:text-white transition-colors"
            />
          ) : (
            <img
              src={iconSrc}
              alt={label}
              width={20}
              height={20}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          )}
        </a>
      ))}
    </div>
  );
}

function FooterLink({ item, className }) {
  if (item.external) {
    return (
      <a
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
      </a>
    );
  }
  return (
    <a
      href={item.to}
      onClick={(e) => scrollToSection(e, item.to)}
      className={className}
    >
      {item.label}
    </a>
  );
}

function Footer() {
  return (
    <footer
      className="w-full text-white font-poppins"
      style={{
        backgroundImage: "linear-gradient(to bottom, #001753, #0037CA)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-8">
        {/* MOBILE */}
        <div className="sm:hidden">
          <a href="#home" onClick={(e) => scrollToSection(e, "#home")}>
            <FooterLogo />
          </a>
          <p className="mt-4 text-white/80 leading-relaxed max-w-sm text-sm">
            <strong className="text-white text-base">
              SkyUp Digital Solutions LLP
            </strong>{" "}
            empowers brands with result-oriented digital marketing, creative
            branding, and smart automation turning visibility into real business
            growth.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold">Services</h3>
              <ul className="mt-3 space-y-2 list-none p-0 m-0">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.to}
                      onClick={(e) => scrollToSection(e, item.to)}
                      className="text-sm text-white/75 hover:text-white block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Quick Links</h3>
              <ul className="mt-3 space-y-2 list-none p-0 m-0">
                {FOOTER_LINKS.map((item) => (
                  <li key={item.label}>
                    <FooterLink
                      item={item}
                      className="text-sm text-white/75 hover:text-white block"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-base font-semibold">Contact Us</h3>
            <div className="mt-3 space-y-1.5 text-sm text-white/80">
              <a
                href="https://maps.app.goo.gl/CHpqMiPC1mgjMbYo8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 block"
              >
                Sahakar Nagar, Byatarayanapura, Bengaluru, Karnataka
              </a>
              <div>
                Email:{" "}
                <a
                  href="mailto:contact@skyupdigitalsolutions.com"
                  className="text-white/80"
                >
                  contact@skyupdigitalsolutions.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a href="tel:+918867867775" className="text-white/80">
                  +91 8867867775
                </a>
              </div>
            </div>
            <FooterSocial gap="gap-5 mt-4" />
          </div>
          <div className="mt-8 border-t border-white/20 pt-4 text-xs text-white/60">
            © 2025 Sky Up Digital Solutions LLP. All Rights Reserved.
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr_1.1fr] gap-y-10 gap-x-14">
          <div>
            <a href="#home" onClick={(e) => scrollToSection(e, "#home")}>
              <FooterLogo />
            </a>
            <p className="mt-4 text-white/75 leading-relaxed max-w-xs text-sm">
              <strong className="text-white">
                SKYUP Digital Solutions LLP
              </strong>{" "}
              empowers brands with result-oriented digital marketing, creative
              branding, and smart automation turning visibility into real
              business growth.
            </p>
          </div>
          <div className="pt-1">
            <h3 className="text-base font-semibold">Services</h3>
            <ul className="mt-4 space-y-2 list-none p-0 m-0">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.to}
                    onClick={(e) => scrollToSection(e, item.to)}
                    className="text-sm text-white/75 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-1">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 list-none p-0 m-0">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <FooterLink
                    item={item}
                    className="text-sm text-white/75 hover:text-white"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-1">
            <h3 className="text-base font-semibold">Contact Us</h3>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <a
                href="https://maps.app.goo.gl/CHpqMiPC1mgjMbYo8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 block"
              >
                Sahakar Nagar, Byatarayanapura, Bengaluru, Karnataka
              </a>
              <div>
                Email:{" "}
                <a
                  href="mailto:contact@skyupdigitalsolutions.com"
                  className="text-white/80"
                >
                  contact@skyupdigitalsolutions.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a href="tel:+918867867775" className="text-white/80">
                  +91 8867867775
                </a>
              </div>
            </div>
            <FooterSocial gap="gap-4 mt-4" />
          </div>
        </div>

        <div className="hidden sm:block mt-8 border-t border-white/20" />
        <div className="hidden sm:block mt-2 py-3 text-center text-xs text-white/60">
          © 2025 SKYUP Digital Solutions LLP. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════ */
const RG_CSS = `
  .rg-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 56rem; margin: 40px auto 0; }
  @media (max-width: 900px) { .rg-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .rg-grid { grid-template-columns: 1fr; } }
  .rg-card { position: relative; border-radius: 16px; padding: 18px 18px 20px; background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.09); opacity: 0; transform: translateY(18px); transition: opacity .55s ease, transform .55s ease, border-color .4s ease, box-shadow .4s ease; overflow: hidden; }
  .rg-card.on { opacity: 1; transform: translateY(0); }
  .rg-card.on:hover { border-color: rgba(76,134,255,0.4); box-shadow: 0 0 0 1px rgba(76,134,255,0.25), 0 16px 36px -20px rgba(0,0,0,0.7); }
  .rg-head { display: flex; align-items: center; gap: 10px; }
  .rg-badge { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(250,159,67,0.15); color: #FA9F43; flex-shrink: 0; }
  .rg-label { font-size: 14px; font-weight: 600; color: #EEF2FF; line-height: 1.3; }
  .rg-bar { margin-top: 14px; height: 6px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
  .rg-fill { height: 100%; width: 0; border-radius: 99px; background: linear-gradient(90deg,#4C86FF,#FA9F43); box-shadow: 0 0 10px 1px rgba(76,134,255,0.35); transition: width 1.1s cubic-bezier(.22,1,.36,1); }
`;

function ResultsGrid({ items }) {
  const [revealed, setRevealed] = useState(null); // null = show all (SSR / no-JS fallback)
  const wrapRef = useRef(null);
  const widths = [88, 82, 92, 78, 90, 84, 94];

  useEffect(() => {
    setRevealed(0);
    const el = wrapRef.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      let i = 0;
      const tick = () => {
        setRevealed(i + 1);
        i += 1;
        if (i < items.length) setTimeout(tick, 180);
      };
      setTimeout(tick, 200);
    };
    if (typeof IntersectionObserver === "undefined") { run(); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (i) => revealed == null || i < revealed;

  return (
    <div ref={wrapRef} className="rg-grid">
      <style dangerouslySetInnerHTML={{ __html: RG_CSS }} />
      {items.map((t, i) => (
        <div key={t} className={`rg-card${show(i) ? " on" : ""}`}>
          <div className="rg-head">
            <span className="rg-badge"><TrendingUp size={18} /></span>
            <span className="rg-label">{t}</span>
          </div>
          <div className="rg-bar">
            <div className="rg-fill" style={{ width: show(i) ? widths[i % widths.length] + "%" : "0%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const PIN_CSS = `
  .pd-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 56rem; margin: 16px 0 0; }
  @media (max-width: 900px) { .pd-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .pd-grid { grid-template-columns: 1fr; } }
  .pd-item { position: relative; display: flex; align-items: center; gap: 12px; border-radius: 14px; padding: 13px 15px; background: rgba(46,107,255,0.06); border: 1px solid rgba(76,134,255,0.18); opacity: 0; transform: translateY(-26px); }
  .pd-item.on { animation: pdDrop .6s cubic-bezier(.34,1.56,.64,1) forwards; }
  @keyframes pdDrop { 0%{opacity:0;transform:translateY(-26px)} 60%{opacity:1;transform:translateY(4px)} 100%{opacity:1;transform:translateY(0)} }
  .pd-pin { position: relative; color: #4C86FF; flex-shrink: 0; display: flex; }
  .pd-item.on .pd-pin::after { content: ""; position: absolute; left: 50%; top: 60%; width: 8px; height: 8px; border-radius: 50%; transform: translate(-50%,-50%); border: 2px solid rgba(250,159,67,0.7); animation: pdRipple .7s ease-out .25s 1; }
  @keyframes pdRipple { 0%{width:6px;height:6px;opacity:.9} 100%{width:34px;height:34px;opacity:0} }
  .pd-label { color: #EEF2FF; font-size: 14px; }

  .cl-list { position: relative; max-width: 48rem; margin: 40px auto 0; display: flex; flex-direction: column; gap: 12px; }
  .cl-item { display: flex; align-items: flex-start; gap: 14px; border-radius: 14px; padding: 15px 17px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid rgba(250,159,67,0.75); opacity: 0; transition: opacity .5s ease, transform .5s ease, border-color .4s ease, background .4s ease; }
  .cl-item.left { transform: translateX(-28px); }
  .cl-item.right { transform: translateX(28px); }
  .cl-item.on { opacity: 1; transform: translateX(0); }
  .cl-item.on:hover { background: rgba(250,159,67,0.06); }
  .cl-alert { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #FA9F43; background: rgba(250,159,67,0.14); border: 1px solid rgba(250,159,67,0.4); }
  .cl-item.on .cl-alert { animation: clPulse 2s ease-in-out infinite; }
  @keyframes clPulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(250,159,67,0.45); } 50%{ box-shadow: 0 0 0 6px rgba(250,159,67,0); } }
  .cl-text { color: #c7d0ee; font-size: 14px; line-height: 1.6; }
`;

function useCascade(count, step, delay) {
  const [revealed, setRevealed] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    setRevealed(0);
    const el = ref.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      let i = 0;
      const tick = () => { setRevealed(i + 1); i += 1; if (i < count) setTimeout(tick, step); };
      setTimeout(tick, delay);
    };
    if (typeof IntersectionObserver === "undefined") { run(); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, (i) => revealed == null || i < revealed];
}

function PinDropGrid({ items }) {
  const [ref, show] = useCascade(items.length, 140, 200);
  return (
    <div ref={ref} className="pd-grid">
      <style dangerouslySetInnerHTML={{ __html: PIN_CSS }} />
      {items.map((t, i) => (
        <div key={t} className={`pd-item${show(i) ? " on" : ""}`}>
          <span className="pd-pin"><MapPin size={16} /></span>
          <span className="pd-label">{t}</span>
        </div>
      ))}
    </div>
  );
}

function ChallengeList({ items }) {
  const [ref, show] = useCascade(items.length, 170, 200);
  return (
    <div ref={ref} className="cl-list">
      {items.map((t, i) => (
        <div key={t} className={`cl-item ${i % 2 === 0 ? "left" : "right"}${show(i) ? " on" : ""}`}>
          <span className="cl-alert">!</span>
          <span className="cl-text">{t}</span>
        </div>
      ))}
    </div>
  );
}

function DocSections() {
  const improvements = [
    "Qualified property enquiries", "Site-visit opportunities", "Cost per lead",
    "Lead response time", "Follow-up efficiency", "Campaign visibility", "Sales opportunities",
  ];
  const planning = [
    "Project location", "Property category", "Pricing and offers", "Buyer profile",
    "Local competition", "Connectivity and nearby developments", "Marketing budget",
  ];
  const struggles = [
    "Ads generate leads, but lead quality is poor",
    "Marketing budget is spent without clear results",
    "Projects do not get enough online visibility",
    "Leads are missed because of delayed follow-ups",
    "Sales teams cannot track every enquiry properly",
  ];
  return (
    <>
      {/* We Focus on Business Results */}
      <section className="font-poppins" style={{ background: C.cream }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Business Results"
            title="We Focus on Business Results, Not Just Clicks"
            description="Our campaigns are designed to improve:"
            center
          />
          <ResultsGrid items={improvements} />
          <p className="reveal mx-auto mt-8 max-w-2xl text-center" style={{ color: C.muted, fontSize: "15px" }}>
            Every lead can be tracked from the advertisement to the sales follow-up.
          </p>
        </div>
      </section>

      {/* Built for Bangalore Real Estate */}
      <section className="font-poppins" style={{ background: C.cream }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Local Expertise"
            title="Digital Marketing Built for Bangalore Real Estate"
            description="Real estate marketing is different for every project. A plotted development near Nelamangala requires a different strategy from an apartment project in Whitefield or a villa project near Devanahalli."
          />
          <p className="reveal mt-8" style={{ color: "#EEF2FF", fontWeight: 600 }}>We plan campaigns based on:</p>
          <PinDropGrid items={planning} />
        </div>
      </section>

      {/* Are You Struggling */}
      <section className="font-poppins" style={{ background: C.cream }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Common Challenges"
            title="Are You Struggling to Generate Quality Property Enquiries?"
            description="Many real estate businesses face the same challenges:"
            center
          />
          <ChallengeList items={struggles} />
          <p className="reveal mx-auto mt-8 max-w-2xl text-center" style={{ color: "#EEF2FF", fontSize: "16px", fontWeight: 500 }}>
            We help you build a complete marketing system — from attracting buyers to tracking every lead.
          </p>
          <div className="reveal mt-8 text-center">
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}
              className="btn-primary inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${C.brand} 0%, #1F6BFF 100%)`, fontSize: "15px" }}>
              Get Your Free Real Estate Marketing Plan
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function LandingPage() {
  useReveal();

  return (
    <div className="font-poppins">
      {/* Global CSS injected once at the root, treated as opaque so it never
          causes a hydration mismatch. */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <CinematicIntro />
      <Header />
      <main>
        <Hero />
        <ClientMarquee />
        <WorksFlip />
        <About />
        <Services />
        <Process />
        <DocSections />
        <Contact />
      </main>
      <div style={{ background: C.cream, borderTop: `1px solid ${C.creamBorder}` }}>
        <p className="mx-auto max-w-4xl px-4 py-6 text-center" style={{ color: C.subtle, fontSize: "12px", lineHeight: 1.7 }}>
          Campaign results may vary depending on project location, pricing, competition,
          advertising budget, market demand and sales follow-up.
        </p>
      </div>
      <Footer />
    </div>
  );
}
