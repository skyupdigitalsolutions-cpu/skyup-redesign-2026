// src/pages/ThankYou.jsx
// Standalone "Thank You" banner page — shown after a lead form is submitted.
// Self-contained: own styles, on-brand (SkyUp blue #0037CA / amber #FA9F43, Poppins).
//
// Vike routing: drop this as pages/thank-you/+Page.jsx (export default), then send
// users here after submit, e.g.  window.location.assign("/thank-you")  — or link to it.
import React from "react";

const IMG = "/images/custom-software";

export default function ThankYou() {
  return (
    <div style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 5vw, 48px)", boxSizing: "border-box", background: "#f5f5fa", fontFamily: "'Poppins',sans-serif", overflow: "hidden" }}>
      <style>{CSS}</style>

      {/* soft brand glow */}
      <div aria-hidden="true" style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: "min(1100px, 130vw)", height: 560, filter: "blur(90px)", opacity: 0.85, pointerEvents: "none", animation: "ty-drift 16s ease-in-out infinite", background: "radial-gradient(38% 46% at 22% 34%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(34% 42% at 44% 22%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(40% 48% at 62% 42%, #7b3ff2 0%, rgba(123,63,242,0) 72%), radial-gradient(44% 52% at 40% 62%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(30% 36% at 76% 66%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />

      {/* logo */}
      <a href="/" style={{ position: "relative", display: "inline-flex", marginBottom: 28 }}>
        <img src={`${IMG}/SKYUP-Logo.svg`} alt="SKYUP Digital Solutions" style={{ height: 38, display: "block" }} />
      </a>

      {/* banner card */}
      <div className="ty-card" style={{ position: "relative", width: "100%", maxWidth: 600, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(16px)", border: "1px solid #fff", borderRadius: 26, padding: "clamp(28px, 6vw, 52px)", boxSizing: "border-box", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, boxShadow: "0 30px 80px rgba(20,20,32,0.14)" }}>
        {/* animated check */}
        <div style={{ width: 92, height: 92, borderRadius: 9999, background: "linear-gradient(155deg,#1a55e8 0%,#0037CA 60%,#002a9e 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 40px rgba(0,55,202,0.34)" }}>
          <svg width="46" height="46" viewBox="0 0 52 52" fill="none">
            <path className="ty-check" d="M14 27l8 8 16-18" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#f5f5fa", borderRadius: 9999, padding: "7px 16px", whiteSpace: "nowrap" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Request Received</span>
        </div>

        <h1 style={{ margin: 0, fontSize: "clamp(32px, 7vw, 52px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.035em", lineHeight: 1.08 }}>Thank You!</h1>

        <p style={{ margin: 0, maxWidth: 460, fontSize: "clamp(15px, 1.7vw, 17px)", fontWeight: 400, color: "#5c5c7a", lineHeight: 1.72 }}>
          We've received your requirement. Our team will review it and reach out shortly to discuss the right solution for your business.
        </p>

        <div className="ty-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8, width: "100%" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", fontWeight: 600, fontSize: 15, color: "#fff", background: "#0037CA", borderRadius: 10, padding: "14px 26px", boxShadow: "0 12px 28px rgba(0,55,202,0.26)" }}>
            {icon([<path key="a" d="M3 11.5 12 4l9 7.5" />, <path key="b" d="M5 10v10h14V10" />])}Back to Home
          </a>
          <a href="/#reviews" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", fontWeight: 600, fontSize: 15, color: "#141420", background: "#fff", border: "1px solid #ebebf4", borderRadius: 10, padding: "14px 26px", boxShadow: "0 8px 20px rgba(20,20,32,0.06)" }}>
            See Our Work
          </a>
        </div>

        <p style={{ margin: "6px 0 0", fontSize: 12.5, fontWeight: 400, color: "#8686a6" }}>
          Need us sooner? Email <a href="mailto:contact@skyupdigitalsolutions.com" style={{ fontWeight: 600, color: "#0037CA", textDecoration: "underline", textUnderlineOffset: 3 }}>contact@skyupdigitalsolutions.com</a>
        </p>
      </div>

      <div style={{ position: "relative", marginTop: 22, fontSize: 12.5, fontWeight: 400, color: "#8686a6" }}>© 2026 SKYUP Digital Solutions LLP</div>
    </div>
  );
}

function icon(paths) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
  );
}

const CSS = `
.ty-card { animation: ty-up .55s cubic-bezier(.4,0,.2,1) both; }
.ty-check { stroke-dasharray: 60; stroke-dashoffset: 60; animation: ty-draw .5s .35s cubic-bezier(.4,0,.2,1) forwards; }
@keyframes ty-up { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform: none; } }
@keyframes ty-draw { to { stroke-dashoffset: 0; } }
@keyframes ty-drift { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(18px); } }
@media (prefers-reduced-motion: reduce) {
  .ty-card { animation: none; }
  .ty-check { stroke-dashoffset: 0; animation: none; }
  [aria-hidden="true"] { animation: none !important; }
}
@media (max-width: 479px) {
  .ty-actions > a { width: 100%; }
}
`;
