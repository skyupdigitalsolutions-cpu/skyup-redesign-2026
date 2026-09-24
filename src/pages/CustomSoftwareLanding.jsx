// src/pages/CustomSoftwareLanding.jsx
// Custom Software Development landing page — ported from the standalone design.
// Self-contained: its own header/footer/nav, one-time lead popup, review map,
// process carousel and hover-expand "Why us" cards. No global Header/Footer.
import React, { useState, useEffect, useRef, useCallback } from "react";


// Backend base URL — set VITE_API_BASE_URL in your deployment environment variables.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3500";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d][\d\s-]{6,14}$/;

const IMG = "/images/custom-software";
const svg = (paths, opts = {}) => (
  <svg width={opts.w || 24} height={opts.h || 24} viewBox="0 0 24 24" fill={opts.fill || "none"}
    stroke={opts.stroke || "#141420"} strokeWidth={opts.sw || 1.9} strokeLinecap="round" strokeLinejoin="round"
    style={opts.style}>{paths}</svg>
);

const P = (d, k) => <path key={k} d={d} />;

const ICON = {
  software: [<rect key="a" x="2" y="4" width="20" height="14" rx="2" />, P("M8 21h8", "b"), P("M12 18v3", "c")],
  crm: [P("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "a"), <circle key="b" cx="9" cy="7" r="4" />, P("M22 21v-2a4 4 0 0 0-3-3.87", "c")],
  automation: [P("M12 2v3", "a"), P("m16.95 7.05 2.12-2.12", "b"), P("M19 12h3", "c"), <circle key="d" cx="12" cy="12" r="4" />, P("M2 12h3", "e"), P("m4.93 4.93 2.12 2.12", "f"), P("M12 19v3", "g")],
  web: [<circle key="a" cx="12" cy="12" r="9.5" />, P("M2.5 12h19", "b"), P("M12 2.5a15 15 0 0 1 0 19a15 15 0 0 1 0-19", "c")],
  mobile: [<rect key="a" x="6" y="2" width="12" height="20" rx="2.5" />, P("M11 18.5h2", "b")],
  ai: [P("M12 2v3", "a"), <rect key="b" x="4" y="5" width="16" height="13" rx="4" />, P("M9 11h.01", "c"), P("M15 11h.01", "d"), P("M9.5 14.5h5", "e"), P("M1 11v3", "f"), P("M23 11v3", "g")],
  erp: [<rect key="a" x="3" y="3" width="7" height="7" rx="1.5" />, <rect key="b" x="14" y="3" width="7" height="7" rx="1.5" />, <rect key="c" x="3" y="14" width="7" height="7" rx="1.5" />, <rect key="d" x="14" y="14" width="7" height="7" rx="1.5" />],
  target: [<circle key="a" cx="12" cy="12" r="9" />, <circle key="b" cx="12" cy="12" r="4.5" />, <circle key="c" cx="12" cy="12" r="1" />],
  puzzle: [P("M4 7h3a2 2 0 1 1 4 0h3a2 2 0 0 1 2 2v3a2 2 0 1 1 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z", "a")],
  layers: [P("M12 2 3 7l9 5 9-5-9-5z", "a"), P("m3 12 9 5 9-5", "b"), P("m3 17 9 5 9-5", "c")],
  trend: [P("M3 17l6-6 4 4 8-8", "a"), P("M15 7h6v6", "b")],
  search: [<circle key="a" cx="11" cy="11" r="7" />, P("m20 20-3.5-3.5", "b")],
  map: [P("M4 6h16", "a"), P("M4 12h10", "b"), P("M4 18h7", "c"), <circle key="d" cx="18" cy="14" r="3" />],
  pen: [P("M12 19l7-7-4-4-7 7v4z", "a"), P("M16 5l3 3", "b"), P("M4 21h6", "c")],
  code: [P("m9 8-5 4 5 4", "a"), P("m15 8 5 4-5 4", "b")],
  shield: [P("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z", "a"), P("m9 12 2 2 4-4", "b")],
  rocket: [P("M5 15c-1 2-1 5-1 5s3 0 5-1", "a"), P("M9 15l-3-3a10 10 0 0 1 8-9 10 10 0 0 1 5 5 10 10 0 0 1-9 8l-1-1z", "b"), <circle key="c" cx="14.5" cy="9.5" r="1.5" />],
  support: [P("M4 15v-3a8 8 0 0 1 16 0v3", "a"), <rect key="b" x="2" y="14" width="5" height="7" rx="2" />, <rect key="c" x="17" y="14" width="5" height="7" rx="2" />],
  chart: [P("M3 21h18", "a"), <rect key="b" x="5" y="11" width="3" height="7" rx="1" />, <rect key="c" x="10.5" y="6" width="3" height="12" rx="1" />, <rect key="d" x="16" y="13" width="3" height="5" rx="1" />],
  doc: [P("M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z", "a"), P("M14 2v5h5", "b"), P("m9 14 2 2 4-4", "c")],
  cloud: [P("M7 18a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z", "a")],
  pin: [P("M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z", "a"), <circle key="b" cx="12" cy="9.5" r="2.5" />],
};

const CHECK = svg([<circle key="a" cx="12" cy="12" r="9.5" stroke="#e4eaff" strokeWidth="2" />, P("M8.5 12l2.5 2.5 4.5-5", "b")], { w: 19, h: 19, stroke: "#0037CA", sw: 2.5, style: { flexShrink: 0 } });
const STAR = <svg width="13" height="13" viewBox="0 0 24 24" fill="#F1891A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;

const SERVICE_OPTIONS = ["Custom Software", "CRM Solution", "Business Automation", "Web / Mobile Application", "ERP / Management System", "AI Solution", "Other"];

const CLIENT_LOGOS = [
  { name: "Vidyakunj", src: `${IMG}/logo-vidyakunj.png`, h: 58 },
  { name: "Navanagara House Building Co-operative Society", src: `${IMG}/logo-navanagara.png`, h: 56 },
  { name: "Spotek Group", src: `${IMG}/logo-spotek.png`, h: 44 },
  { name: "Greater Knack", src: `${IMG}/logo-greaterknack.png`, h: 54 },
  { name: "Gruhakalpa", src: `${IMG}/logo-gruhakalpa.png`, h: 60 },
  { name: "Novara Nature Estate", src: `${IMG}/logo-novara.png`, h: 54 },
  { name: "Rathna Bhoomi Developers", src: `${IMG}/logo-rathnabhoomi.png`, h: 40 },
];
const SERVICES = [
  { title: "Custom Business Software", body: "Software designed around your processes, users and operational requirements.", icon: "software" },
  { title: "Custom CRM Solutions", body: "Lead management, customer workflows, follow-ups, reporting and automation.", icon: "crm" },
  { title: "Business Automation", body: "Automate repetitive processes, approvals, notifications and data workflows.", icon: "automation" },
  { title: "Custom Web & Mobile Applications", body: "Business applications built for internal teams, customers and field operations.", icon: "mobile" },
  { title: "ERP & Management Systems", body: "Connected systems for managing operations, finance, inventory, employees and reporting.", icon: "erp" },
];
const PROJECTS = [
  { client: "Natraj Home Furnishing", system: "Field Management System", location: "Haryana" },
  { client: "Spotek", system: "CRM + Invoice Software", location: "Dubai, UAE" },
  { client: "Sarathi", system: "Finance CRM", location: "Bengaluru, Karnataka" },
  { client: "Abhi Cabs", system: "Transport ERP", location: "Karnataka, India" },
  { client: "Ashik Enterprises", system: "AI Voice Agent", location: "Bengaluru, Karnataka" },
  { client: "Logistics Business", system: "AI Summary Software", location: "Bengaluru, Karnataka" },
];
const REASONS = [
  { num: "01.", title: "Business-First", body: "We understand your workflow, challenges and objectives before defining the solution.", icon: "target", art: `${IMG}/why-1-target.png` },
  { num: "02.", title: "Fully Customized", body: "Your software is designed around your processes — not a fixed template.", icon: "puzzle", art: `${IMG}/why-2-cubes.png` },
  { num: "03.", title: "Structured Development", body: "From business analysis and process mapping through development, testing and deployment.", icon: "layers", art: `${IMG}/why-3-layers.png` },
  { num: "04.", title: "Built To Evolve", body: "The solution can grow with your users, workflows, integrations and future requirements.", icon: "trend", art: `${IMG}/why-4-growth.png` },
];
const STEPS = [
  { num: "01", title: "Understand", body: "Business workflows, pain points and requirements.", icon: "search" },
  { num: "02", title: "Plan", body: "Solution architecture, features and development roadmap.", icon: "map" },
  { num: "03", title: "Design", body: "Interfaces and user experience around your team's workflow.", icon: "pen" },
  { num: "04", title: "Develop", body: "Software development, integrations and automation.", icon: "code" },
  { num: "05", title: "Test & Deploy", body: "QA, UAT, deployment and monitoring.", icon: "rocket" },
  { num: "06", title: "Support & Improve", body: "Training, handover and ongoing improvements.", icon: "support" },
];
const CAPABILITIES = [
  { label: "CRM & Workflow Automation", icon: "crm" },
  { label: "AI & Intelligent Automation", icon: "ai" },
  { label: "Business Analytics & Dashboards", icon: "chart" },
  { label: "Document & Approval Automation", icon: "doc" },
  { label: "Cloud & API Integrations", icon: "cloud" },
];
const AUDIENCES = ["Small and medium businesses", "Growing companies", "Enterprises requiring customized systems", "Businesses replacing manual processes with technology"];
const PROBLEMS = [
  { n: "01", t: "Manual processes", b: "Spreadsheets, paperwork and repetitive data entry slowing your team down.", side: "right" },
  { n: "02", t: "Disconnected systems", b: "Different tools holding different pieces of your business information.", side: "right" },
  { n: "03", t: "Unclear workflows", b: "Leads, approvals, follow-ups and operations difficult to track.", side: "left" },
  { n: "04", t: "Software limitations", b: "Existing software forcing your team to change the way they work.", side: "left" },
];

const inputStyle = { fontSize: 14, fontWeight: 400, color: "#141420", padding: "13px 16px", border: "1px solid #e4e4f0", borderRadius: 10, outline: "none", background: "#fff", width: "100%", boxSizing: "border-box", fontFamily: "'Poppins',sans-serif" };
const labelSpan = { fontSize: 12.5, fontWeight: 500, color: "#6b6b8a" };
const field = { display: "flex", flexDirection: "column", gap: 7 };
const errText = { fontSize: 12, fontWeight: 500, color: "#d64545" };

export default function CustomSoftwareLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [procIdx, setProcIdx] = useState(0);
  const [procCols, setProcCols] = useState(3);
  const [whyActive, setWhyActive] = useState(1);
  const [modal, setModal] = useState("idle"); // idle | open | closing | done
  const timers = useRef({});

  // ── Popup lead form ──
  const [popupForm, setPopupForm] = useState({ name: "", phone: "", email: "", service: "Custom Software" });
  const [popupErr, setPopupErr] = useState({});
  const [popupStatus, setPopupStatus] = useState({ submitting: false, error: "", success: false });

  // ── Main contact form ──
  const [leadForm, setLeadForm] = useState({ name: "", company: "", phone: "", email: "", service: "Custom Software", message: "", budget: "2-5 Lakh", timeline: "Immediately" });
  const [leadErr, setLeadErr] = useState({});
  const [leadStatus, setLeadStatus] = useState({ submitting: false, error: "", success: false });

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      const cols = w <= 767 ? 1 : w <= 1199 ? 2 : 3;
      setProcCols(cols);
      setProcIdx((p) => Math.min(p, 6 - cols));
      if (w > 991) setNavOpen(false);
    };
    sync();
    window.addEventListener("resize", sync);
    try {
      if (!localStorage.getItem("skyup-lead-modal-seen")) {
        timers.current.open = setTimeout(() => {
          localStorage.setItem("skyup-lead-modal-seen", "1");
          setModal("open");
        }, 1400);
      }
    } catch (_) { /* storage blocked */ }
    return () => {
      window.removeEventListener("resize", sync);
      clearTimeout(timers.current.open);
      clearTimeout(timers.current.close);
      clearTimeout(timers.current.popupSuccess);
    };
  }, []);

  const closeModal = useCallback(() => {
    setModal("closing");
    timers.current.close = setTimeout(() => setModal("done"), 300);
  }, []);

  // Popup form only collects name/phone/email/service — company, budget and
  // message are required by the backend Contact model, so we fill sensible
  // defaults for those.
  const submitPopup = useCallback(async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!popupForm.name.trim()) e.name = "Name is required";
    if (!popupForm.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_RE.test(popupForm.phone.trim())) e.phone = "Enter a valid phone number";
    if (!popupForm.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(popupForm.email.trim())) e.email = "Enter a valid email";
    setPopupErr(e);
    if (Object.keys(e).length) return;

    const payload = {
      name: popupForm.name.trim(),
      company: "Not specified",
      email: popupForm.email.trim(),
      phone: popupForm.phone.trim(),
      service: popupForm.service,
      budget: "Not specified",
      message: `Requirement submitted via popup — interested in: ${popupForm.service}`,
    };

    setPopupStatus({ submitting: true, error: "", success: false });
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      setPopupStatus({ submitting: false, error: "", success: true });
      timers.current.popupSuccess = setTimeout(closeModal, 1500);
    } catch (err) {
      setPopupStatus({ submitting: false, error: err.message || "Could not submit. Please try again.", success: false });
    }
  }, [popupForm, closeModal]);

  const submitLead = useCallback(async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!leadForm.name.trim()) e.name = "Name is required";
    if (!leadForm.company.trim()) e.company = "Company name is required";
    if (!leadForm.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_RE.test(leadForm.phone.trim())) e.phone = "Enter a valid phone number";
    if (!leadForm.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(leadForm.email.trim())) e.email = "Enter a valid email";
    setLeadErr(e);
    if (Object.keys(e).length) return;

    const payload = {
      name: leadForm.name.trim(),
      company: leadForm.company.trim(),
      email: leadForm.email.trim(),
      phone: leadForm.phone.trim(),
      service: leadForm.service,
      budget: leadForm.budget,
      message: [leadForm.message.trim(), `Expected timeline: ${leadForm.timeline}`].filter(Boolean).join("\n"),
    };

    setLeadStatus({ submitting: true, error: "", success: false });
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      setLeadStatus({ submitting: false, error: "", success: true });
    } catch (err) {
      setLeadStatus({ submitting: false, error: err.message || "Could not submit. Please try again.", success: false });
    }
  }, [leadForm]);

  const maxIdx = Math.max(0, STEPS.length - procCols);
  const pi = Math.max(0, Math.min(procIdx, maxIdx));
  const view = STEPS.slice(pi, pi + procCols);

  return (
    <div style={{ background: "#f5f5fa", overflow: "hidden", fontFamily: "'Poppins',sans-serif" }}>
      <style>{CSS}</style>

      {/* ── Lead popup ── */}
      {(modal === "open" || modal === "closing") && (
        <div data-r="modal" style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(20,20,32,0.5)", backdropFilter: "blur(6px)", opacity: modal === "open" ? 1 : 0, transition: "opacity .28s ease" }}>
          <div style={{ position: "absolute", inset: 0 }} onClick={closeModal} />
          <div style={{ position: "relative", width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto", background: "#fff", borderRadius: 24, padding: 34, boxShadow: "0 40px 90px rgba(20,20,32,0.34)", transform: modal === "open" ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)", transition: "transform .32s cubic-bezier(.4,0,.2,1)" }}>
            <button type="button" onClick={closeModal} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 9999, border: "1px solid #ebebf4", background: "#f5f5fa", color: "#141420", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {svg([P("M6 6l12 12", "a"), P("M18 6L6 18", "b")], { w: 18, h: 18, stroke: "currentColor", sw: 2 })}
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22, paddingRight: 44 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, width: "fit-content", background: "#f5f5fa", borderRadius: 9999, padding: "7px 14px", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Free Consultation</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em", lineHeight: 1.14 }}>Discuss your software requirement</h2>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#6b6b8a", lineHeight: 1.7 }}>Tell us what you're trying to automate, improve or build — we'll understand your requirement and discuss the right solution.</p>
            </div>
            {popupStatus.success ? (
              <div style={{ padding: "30px 4px 8px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 38 }}>✅</div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#141420" }}>Thank you!</h3>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 400, color: "#6b6b8a" }}>We've received your requirement and will reach out shortly.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <label style={field}>
                    <span style={labelSpan}>name*</span>
                    <input type="text" placeholder="full name" style={inputStyle} value={popupForm.name} onChange={(e) => setPopupForm((s) => ({ ...s, name: e.target.value }))} />
                    {popupErr.name && <span style={errText}>{popupErr.name}</span>}
                  </label>
                  <label style={field}>
                    <span style={labelSpan}>phone number*</span>
                    <input type="tel" placeholder="+91 00000 00000" style={inputStyle} value={popupForm.phone} onChange={(e) => setPopupForm((s) => ({ ...s, phone: e.target.value }))} />
                    {popupErr.phone && <span style={errText}>{popupErr.phone}</span>}
                  </label>
                  <label style={field}>
                    <span style={labelSpan}>business email*</span>
                    <input type="email" placeholder="example@email.com" style={inputStyle} value={popupForm.email} onChange={(e) => setPopupForm((s) => ({ ...s, email: e.target.value }))} />
                    {popupErr.email && <span style={errText}>{popupErr.email}</span>}
                  </label>
                  <label style={field}><span style={labelSpan}>what solution are you looking for?</span>
                    <select style={{ ...inputStyle, appearance: "none" }} value={popupForm.service} onChange={(e) => setPopupForm((s) => ({ ...s, service: e.target.value }))}>
                      {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                </div>
                {popupStatus.error && <p style={{ margin: "14px 0 0", fontSize: 13, fontWeight: 500, color: "#d64545", textAlign: "center" }}>{popupStatus.error}</p>}
                <button type="button" onClick={submitPopup} disabled={popupStatus.submitting} style={{ marginTop: 20, width: "100%", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", background: "#0037CA", border: "none", borderRadius: 10, padding: 16, cursor: popupStatus.submitting ? "not-allowed" : "pointer", opacity: popupStatus.submitting ? 0.7 : 1, boxShadow: "0 12px 28px rgba(0,55,202,0.26)" }}>{popupStatus.submitting ? "Submitting…" : "Submit Requirement"}</button>
                <p style={{ margin: "12px 0 0", fontSize: 11.5, fontWeight: 400, color: "#6b6b8a", textAlign: "center" }}>Your details stay confidential. No sales spam.</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section data-r="hero" style={{ position: "relative", padding: "24px 0 96px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 1100, height: 620, filter: "blur(90px)", opacity: 0.92, animation: "skyup-drift 16s ease-in-out infinite", background: "radial-gradient(38% 46% at 22% 34%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(34% 42% at 44% 22%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(40% 48% at 62% 42%, #7b3ff2 0%, rgba(123,63,242,0) 72%), radial-gradient(44% 52% at 40% 62%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(30% 36% at 76% 66%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <header data-r="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 72, position: "relative" }}>
            <img data-r="brand" src={`${IMG}/SKYUP-Logo.svg`} alt="SKYUP Digital Solutions" style={{ height: 38 }} />
            <nav data-r="nav" data-open={navOpen ? "true" : "false"} style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 9999, padding: 6, boxShadow: "0 8px 28px rgba(20,20,32,0.10)" }}>
              {[["Solutions", "#solutions"], ["Why Us", "#why"], ["Process", "#process"], ["Investment", "#investment"]].map(([l, h], i) => (
                <a key={l} href={h} onClick={() => setNavOpen(false)} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", fontWeight: 500, fontSize: 13.5, color: i === 0 ? "#141420" : "#4a4a66", background: i === 0 ? "#fff" : "transparent", padding: "9px 20px", borderRadius: 9999, boxShadow: i === 0 ? "0 2px 6px rgba(20,20,32,0.08)" : "none" }}>{l}</a>
              ))}
            </nav>
            <a data-r="nav-cta" href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 13.5, color: "#fff", background: "#0037CA", borderRadius: 9999, padding: "11px 24px", boxShadow: "0 8px 22px rgba(0,55,202,0.32)" }}>Get In Touch</a>
            <button data-r="burger" type="button" onClick={() => setNavOpen((o) => !o)} aria-label="Menu" aria-expanded={navOpen} style={{ display: "none", width: 48, height: 48, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 9999, background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 24px rgba(20,20,32,0.12)", cursor: "pointer", color: "#141420" }}>
              {svg(navOpen ? [P("M6 6l12 12", "a"), P("M18 6L6 18", "b")] : [P("M4 7h16", "a"), P("M4 12h16", "b"), P("M4 17h16", "c")], { w: 20, h: 20, stroke: "currentColor", sw: 2 })}
            </button>
          </header>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 26, padding: "16px 0 8px" }}>
            <div data-r="trust" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "6px 12px", background: "rgba(255,255,255,0.78)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", color: "#141420", fontWeight: 600, fontSize: 13, padding: "9px 20px", borderRadius: 9999 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>{svg(ICON.pin, { w: 15, h: 15, stroke: "#F1891A", sw: 2.2 })}Bangalore-Based Technology Partner</span>
              <span aria-hidden="true" style={{ width: 1, height: 14, background: "#c9c9dc" }} />
              <span style={{ fontWeight: 500, color: "#4a4a66" }}>Serving Businesses Across India</span>
            </div>
            <h1 style={{ margin: 0, maxWidth: 920, fontSize: "clamp(34px, 7.2vw, 76px)", fontWeight: 700, lineHeight: 1.06, color: "#141420", letterSpacing: "-0.035em", textWrap: "balance" }}>Custom Software Built Around Your Business</h1>
            <p style={{ margin: 0, maxWidth: 700, fontSize: "clamp(15.5px, 1.6vw, 18px)", fontWeight: 500, color: "#3b3b57", lineHeight: 1.62, textWrap: "pretty" }}>We design and develop customized software, CRM, automation and business applications around your workflows — helping you streamline operations, improve visibility and scale.</p>
            <div data-r="hero-cta" style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 15, color: "#fff", background: "#141420", borderRadius: 10, padding: "16px 34px", boxShadow: "0 14px 34px rgba(20,20,32,0.28)" }}>Discuss Your Software Requirement</a>
            </div>
            <div data-r="hero-price" style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center", textAlign: "center", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 9999, padding: "9px 10px 9px 20px", marginTop: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#4a4a66" }}>Projects starting from</span>
              <span style={{ display: "inline-flex", alignItems: "center", fontSize: 14, fontWeight: 700, color: "#fff", background: "#F1891A", borderRadius: 9999, padding: "6px 14px", boxShadow: "0 4px 12px rgba(241,137,26,0.32)" }}>₹2 Lakh</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted-by logos ── */}
      <section data-r="sect" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="logos-card" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #fff", borderRadius: 20, padding: "26px 0", overflow: "hidden", boxShadow: "0 4px 20px rgba(20,20,32,0.05)" }}>
            <div style={{ textAlign: "center", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b6b8a", marginBottom: 20 }}>Trusted by growing businesses across India</div>
            <div style={{ display: "flex", width: "max-content", animation: "skyup-marquee 34s linear infinite" }}>
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 64, padding: "0 26px", flexShrink: 0 }}>
                  <img src={l.src} alt={l.name} loading="lazy" style={{ height: l.h, width: "auto", maxWidth: 190, objectFit: "contain", display: "block", opacity: 0.9 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section data-r="sect" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 56, maxWidth: 620 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid #ebebf4", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>The Problem</span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, lineHeight: 1.12, color: "#141420", letterSpacing: "-0.035em", textWrap: "pretty" }}>Your business has unique challenges. Your software should too.</h2>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "#3b3b57", lineHeight: 1.7 }}>Is your business relying on:</p>
          </div>
          <div data-r="problem-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 48, alignItems: "center" }}>
            <div data-r="prob-col" style={{ display: "flex", flexDirection: "column", gap: 64, alignItems: "flex-end" }}>
              {PROBLEMS.filter((p) => p.side === "right").map((p) => (
                <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right", alignItems: "flex-end" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, flexDirection: "row-reverse" }}>
                    <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#F1891A", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b8a" }}>{p.n}</span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "#141420", lineHeight: 1.34, letterSpacing: "-0.015em", maxWidth: 280 }}>{p.t}</h3>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.7, maxWidth: 280 }}>{p.b}</p>
                </div>
              ))}
            </div>
            <div data-r="orbit" style={{ position: "relative", width: 460, height: 460, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, margin: "0 auto" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 9999, border: "1px solid #d8d8e8" }} />
              <div style={{ position: "absolute", inset: -46, borderRadius: 9999, filter: "blur(60px)", opacity: 0.5, background: "radial-gradient(38% 44% at 28% 30%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(36% 42% at 72% 34%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(40% 46% at 50% 78%, #0037CA 0%, rgba(0,55,202,0) 72%)" }} />
              {[["12.3%", "12.3%", "top", "right"], ["12.3%", "12.3%", "top", "left"], ["12.3%", "12.3%", "bottom", "left"], ["12.3%", "12.3%", "bottom", "right"]].map((d, i) => (
                <div key={i} style={{ position: "absolute", [d[2]]: d[0], [d[3]]: d[1], width: 22, height: 22, borderRadius: 9999, background: "#F1891A", boxShadow: "0 4px 14px rgba(241,137,26,0.5)" }} />
              ))}
              <div data-r="orbit-disc" style={{ position: "relative", boxSizing: "border-box", width: 290, height: 290, borderRadius: 9999, background: "#0037CA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 30, textAlign: "center", boxShadow: "0 24px 60px rgba(0,55,202,0.34)" }}>
                <p data-r="orbit-text" style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#fff", lineHeight: 1.5, letterSpacing: "-0.01em" }}>We build software around your workflow — instead of asking your business to adapt to generic software.</p>
                <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 13.5, color: "#0037CA", background: "#fff", borderRadius: 9999, padding: "11px 22px" }}>Talk To Our Team</a>
              </div>
            </div>
            <div data-r="prob-col" style={{ display: "flex", flexDirection: "column", gap: 64, alignItems: "flex-start" }}>
              {PROBLEMS.filter((p) => p.side === "left").map((p) => (
                <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#F1891A", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b8a" }}>{p.n}</span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: "#141420", lineHeight: 1.34, letterSpacing: "-0.015em", maxWidth: 280 }}>{p.t}</h3>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.7, maxWidth: 280 }}>{p.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <section id="solutions" style={{ position: "relative", padding: "32px 0 104px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", width: 1240, height: 820, filter: "blur(100px)", opacity: 0.62, background: "radial-gradient(32% 34% at 18% 28%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(34% 36% at 50% 20%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(32% 34% at 82% 30%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(38% 38% at 30% 78%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(30% 32% at 74% 80%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 9999, padding: "8px 26px 8px 8px", boxShadow: "0 12px 30px rgba(20,20,32,0.14)" }}>
              <span style={{ width: 44, height: 44, borderRadius: 9999, background: "#141420", display: "flex", alignItems: "center", justifyContent: "center" }}>{svg([P("M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z", "a"), P("M14 2v5h5", "b")], { w: 20, h: 20, stroke: "#fff", sw: 2 })}</span>
              <span style={{ fontSize: "clamp(18px, 2.4vw, 22px)", fontWeight: 600, color: "#141420", letterSpacing: "-0.02em" }}>What We Build</span>
            </div>
          </div>
          {/* 5 cards: flex-wrap so the second row (2 cards) centres instead of leaving a hole */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
            {SERVICES.map((s) => (
              <div key={s.title} className="svc-card" style={{ flex: "1 1 300px", maxWidth: 372, background: "linear-gradient(155deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.34) 100%)", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: 22, padding: "30px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, minHeight: 236, boxSizing: "border-box", boxShadow: "0 18px 44px rgba(20,20,32,0.10), inset 0 1px 0 rgba(255,255,255,0.85)", transition: "0.2s ease" }}>
                <div style={{ width: 58, height: 58, borderRadius: 9999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(20,20,32,0.12)" }}>{svg(ICON[s.icon], { w: 24, h: 24 })}</div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#141420", lineHeight: 1.32, letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "36px auto 0", textAlign: "center", fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.7 }}>
            Need something more specific?{" "}
            <a href="#form" style={{ fontWeight: 600, color: "#0037CA", textDecoration: "underline", textUnderlineOffset: 4 }}>We can design the solution around your requirements.</a>
          </p>
        </div>
      </section>

      {/* ── Real businesses / map ── */}
      <section id="reviews" style={{ position: "relative", padding: "32px 0 84px", overflow: "hidden" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="rev-grid" style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "center", textAlign: "center", gap: 56, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 640 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #ebebf4", borderRadius: 9999, padding: "10px 20px", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(20,20,32,0.07)" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#141420" }}>4.9</span>
                <div style={{ display: "flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((k) => <span key={k}>{STAR}</span>)}</div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#6b6b8a" }}>from business owners</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.035em", lineHeight: 1.1, textWrap: "pretty" }}>Real businesses. Real workflows. Software built around them.</h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.7, maxWidth: 440 }}>From CRM and ERP to field management, automation and AI solutions, we build software around the way businesses actually operate.</p>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 14.5, color: "#fff", background: "#141420", borderRadius: 9999, padding: "14px 28px", marginTop: 4, boxShadow: "0 12px 30px rgba(20,20,32,0.24)" }}>Discuss Your Requirement</a>
            </div>
         
          </div>

          <div data-r="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 48 }}>
            {PROJECTS.map((p) => (
              <div key={p.client} style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 18, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 8px 24px rgba(20,20,32,0.05)" }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#141420", letterSpacing: "-0.01em" }}>{p.client}</h3>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0037CA" }}>{p.system}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 13.5, fontWeight: 500, color: "#6b6b8a" }}>
                  {svg(ICON.pin, { w: 15, h: 15, stroke: "#F1891A", sw: 2.2 })}{p.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section id="why" style={{ position: "relative", padding: "24px 0 104px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1240, height: 760, filter: "blur(100px)", opacity: 0.5, background: "radial-gradient(34% 40% at 16% 30%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(32% 36% at 48% 22%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(32% 36% at 84% 34%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(32% 36% at 70% 82%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(28% 32% at 24% 84%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="why-head" style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 48, alignItems: "end", marginBottom: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Why Us</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "#141420", letterSpacing: "-0.035em", maxWidth: 620, textWrap: "pretty" }}>We understand your business before we build your software</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.72 }}>Every project starts with your workflow, not a template. Hover a card to read how we work.</p>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 14.5, color: "#fff", background: "#141420", borderRadius: 9999, padding: "14px 28px", boxShadow: "0 12px 30px rgba(20,20,32,0.26)" }}>Discuss Your Requirement</a>
            </div>
          </div>
          <div data-r="why-row" style={{ display: "flex", gap: 18, alignItems: "center", minHeight: 520 }}>
            {REASONS.map((r, i) => {
              const on = i === whyActive;
              return (
                <div key={r.title} data-r="why-card" onMouseEnter={() => setWhyActive(i)} onFocus={() => setWhyActive(i)} tabIndex={0}
                  style={{ flex: on ? 2.05 : 1, minHeight: on ? 512 : 400, position: "relative", overflow: "hidden", outline: "none", cursor: "default", borderRadius: 26, padding: 26, display: "flex", flexDirection: "column", background: on ? "#fff" : "linear-gradient(155deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.26) 100%)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: on ? "0 30px 70px rgba(20,20,32,0.18)" : "0 10px 28px rgba(20,20,32,0.07)", transition: "flex .38s cubic-bezier(.4,0,.2,1), min-height .38s cubic-bezier(.4,0,.2,1), box-shadow .38s ease, background .38s ease" }}>
                  <div data-r="why-art" style={{ height: on ? 212 : 0, opacity: on ? 1 : 0, margin: "-8px -8px 0", borderRadius: 20, overflow: "hidden", position: "relative", flexShrink: 0, transition: "height .38s cubic-bezier(.4,0,.2,1), opacity .3s ease" }}>
                    <div style={{ position: "absolute", inset: "-30% -10%", filter: "blur(34px)", opacity: 0.55, background: "radial-gradient(38% 46% at 26% 34%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(36% 44% at 58% 26%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(34% 42% at 82% 44%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(40% 48% at 46% 82%, #0037CA 0%, rgba(0,55,202,0) 72%)" }} />
                    <img src={r.art} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 14, boxSizing: "border-box", filter: "drop-shadow(0 12px 22px rgba(20,20,32,0.12))" }} />
                  </div>
                  <div data-r="why-num" style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em", color: "#c2c2d6", opacity: on ? 0 : 1, height: on ? 0 : 66, overflow: "hidden", transition: "opacity .3s ease, height .38s cubic-bezier(.4,0,.2,1)" }}>{r.num}</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 18px rgba(20,20,32,0.12)" }}>{svg(ICON[r.icon], { w: 20, h: 20 })}</div>
                    <h3 data-r="why-title" style={{ margin: 0, fontSize: on ? 27 : 19, fontWeight: 600, color: "#141420", lineHeight: 1.24, letterSpacing: "-0.02em", transition: "font-size .38s ease" }}>{r.title}</h3>
                    <p data-r="why-body" style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.7, maxHeight: on ? 160 : 0, opacity: on ? 1 : 0, overflow: "hidden", transition: "max-height .38s cubic-bezier(.4,0,.2,1), opacity .3s ease" }}>{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            {[["100%", "Custom-built", "#141420"], ["6", "Stage process", "#0037CA"], ["\u20b92L+", "Project scale", "#F1891A"]].map(([n, l, c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 16, padding: "16px 22px", boxShadow: "0 10px 26px rgba(20,20,32,0.08)" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: c, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#3b3b57" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process carousel ── */}
      <section id="process" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="proc-card" style={{ position: "relative", background: "linear-gradient(135deg,#f2e4e6 0%,#f9c7c8 22%,#efb4d4 44%,#d3c3f2 68%,#c6cff8 100%)", borderRadius: 28, padding: "60px 48px 56px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -140, left: "50%", transform: "translateX(-50%)", width: 1100, height: 760, filter: "blur(80px)", opacity: 0.55, background: "radial-gradient(30% 34% at 18% 24%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(26% 30% at 62% 14%, #ffd9c2 0%, rgba(255,217,194,0) 70%), radial-gradient(30% 34% at 88% 46%, #b9c6ff 0%, rgba(185,198,255,0) 70%), radial-gradient(32% 36% at 34% 88%, #ffc0dd 0%, rgba(255,192,221,0) 72%)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 34%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.22) 100%)" }} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", marginBottom: 44 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 9999, padding: "7px 20px", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#141420" }}>How We Work</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.035em", lineHeight: 1.1 }}>How we build your solution</h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 400, color: "#4a4a66", maxWidth: 540, lineHeight: 1.7 }}>Every stage handled systematically — from the first conversation to long-term support.</p>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {Array.from({ length: maxIdx + 1 }, (_, i) => (
                  <button key={i} type="button" onClick={() => setProcIdx(i)} aria-label={`Show steps ${i + 1} to ${i + procCols}`} style={{ height: 44, padding: "0 3px", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <span style={{ display: "block", width: i === pi ? 30 : 7, height: 7, borderRadius: 9999, background: i === pi ? "#F1891A" : "rgba(20,20,32,0.22)", transition: "width .3s ease, background .3s ease" }} />
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button type="button" onClick={() => setProcIdx((p) => Math.max(0, p - 1))} aria-label="Previous steps" style={{ width: 46, height: 46, borderRadius: 9999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", color: "#141420", opacity: pi === 0 ? 0.35 : 1, transition: "background .2s, opacity .2s" }}>{svg([P("M15 6l-6 6 6 6", "a")], { w: 18, h: 18, stroke: "currentColor", sw: 2 })}</button>
                <button type="button" onClick={() => setProcIdx((p) => Math.min(maxIdx, p + 1))} aria-label="Next steps" style={{ width: 46, height: 46, borderRadius: 9999, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.85)", color: "#141420", opacity: pi === maxIdx ? 0.35 : 1, transition: "background .2s, opacity .2s" }}>{svg([P("M9 6l6 6-6 6", "a")], { w: 18, h: 18, stroke: "currentColor", sw: 2 })}</button>
              </div>
            </div>
            <div data-r="proc-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${procCols},1fr)`, gap: 18 }}>
              {view.map((st) => (
                <div key={st.num} style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.26) 100%)", backdropFilter: "blur(22px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 18px 40px rgba(20,20,32,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 10px 22px rgba(20,20,32,0.14)" }}>{svg(ICON[st.icon], { w: 22, h: 22 })}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0037CA", letterSpacing: "0.12em" }}>{st.num}</div>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#141420", letterSpacing: "-0.015em" }}>{st.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.7 }}>{st.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="cap-card" style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 28, padding: "52px 48px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center", boxShadow: "0 16px 44px rgba(20,20,32,0.07)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#f5f5fa", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>More Than Software Development</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.12, color: "#141420", letterSpacing: "-0.035em", textWrap: "pretty" }}>Built-in capabilities when your business needs them</h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.72 }}>We combine customized development with automation and AI where it creates real business value.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CAPABILITIES.map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 16, background: "#f5f5fa", borderRadius: 16, padding: "14px 18px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 6px 16px rgba(20,20,32,0.10)" }}>{svg(ICON[c.icon], { w: 20, h: 20, stroke: "#0037CA" })}</div>
                  <span style={{ fontSize: 15.5, fontWeight: 600, color: "#141420" }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Location + investment ── */}
      <section id="investment" style={{ padding: "0 0 104px" }}>
        <div data-r="inv-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "0.72fr 1.28fr", gap: 32, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em", lineHeight: 1.12 }}>Looking for a serious software solution?</h2>
            <p style={{ margin: 0, fontSize: 15.5, fontWeight: 400, color: "#5c5c7a", lineHeight: 1.72 }}>Custom software requires understanding your business, designing the right solution and building it around your requirements.</p>
            <div style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 2px 10px rgba(20,20,32,0.04)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: "#f5f5fa", display: "flex", alignItems: "center", justifyContent: "center" }}>{svg(ICON.pin, { w: 20, h: 20, stroke: "#F1891A", sw: 2.1 })}</div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#141420", lineHeight: 1.28, letterSpacing: "-0.02em" }}>Based in Bangalore. Serving businesses across India.</h3>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#6b6b8a", lineHeight: 1.7 }}>SkyUp Digital Solutions works with businesses across India to design and develop customized software solutions. Our Bangalore team is available for discussions and in-person meetings when required.</p>
            </div>
          </div>
          <div data-r="inv-card" style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 18, padding: 34, display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 10px 34px rgba(20,20,32,0.07)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#141420", letterSpacing: "-0.02em" }}>Built For Long-Term Solutions</h3>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#6b6b8a", lineHeight: 1.7, maxWidth: 560 }}>If you're looking for a customized business solution rather than a basic off-the-shelf product, let's discuss your requirements.</p>
            </div>
            <div data-r="aud-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 32px" }}>
              {AUDIENCES.map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 11 }}>{CHECK}<span style={{ fontSize: 14, fontWeight: 500, color: "#3b3b57", lineHeight: 1.5 }}>{a}</span></div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, background: "#f5f5fa", borderRadius: 14, padding: "24px 28px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b8a" }}>Projects typically start from</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em" }}>₹2 Lakh+</span>
                </div>
              </div>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 14.5, color: "#fff", background: "#0037CA", borderRadius: 10, padding: "14px 24px", boxShadow: "0 10px 26px rgba(0,55,202,0.26)" }}>Discuss Your Requirement</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="form" style={{ position: "relative", padding: "0 0 96px", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -160, left: "50%", transform: "translateX(-50%)", width: 1000, height: 520, filter: "blur(100px)", opacity: 0.7, background: "radial-gradient(36% 44% at 26% 40%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(40% 48% at 52% 52%, #7b3ff2 0%, rgba(123,63,242,0) 72%), radial-gradient(36% 44% at 76% 40%, #F1891A 0%, rgba(241,137,26,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, marginBottom: 34 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0037CA" }}>Let's Get In Touch</div>
            <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.6vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em", lineHeight: 1.12, textWrap: "balance" }}>Have a business problem that software can solve?</h2>
            <p style={{ margin: 0, fontSize: 15.5, fontWeight: 400, color: "#5c5c7a", lineHeight: 1.7, maxWidth: 540 }}>Tell us what you're trying to automate, improve or build. We'll understand your requirement and discuss the right solution.</p>
          </div>
          {leadStatus.success ? (
            <div data-r="form-card" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)", border: "1px solid #fff", borderRadius: 22, padding: 48, boxShadow: "0 24px 60px rgba(20,20,32,0.10)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 44 }}>✅</div>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#141420" }}>Thank you{leadForm.name ? `, ${leadForm.name.split(" ")[0]}` : ""}!</h3>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "#6b6b8a", maxWidth: 420 }}>We've received your requirement and our team will get back to you shortly.</p>
              <button type="button" onClick={() => { setLeadStatus({ submitting: false, error: "", success: false }); setLeadForm({ name: "", company: "", phone: "", email: "", service: "Custom Software", message: "", budget: "2-5 Lakh", timeline: "Immediately" }); }} style={{ marginTop: 10, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "#0037CA", background: "#fff", border: "1px solid #ebebf4", borderRadius: 9999, padding: "10px 24px", cursor: "pointer" }}>Submit another requirement</button>
            </div>
          ) : (
            <form data-r="form-card" onSubmit={submitLead} noValidate style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(14px)", border: "1px solid #fff", borderRadius: 22, padding: 34, boxShadow: "0 24px 60px rgba(20,20,32,0.10)" }}>
              <div data-r="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <label style={field}>
                  <span style={labelSpan}>name*</span>
                  <input type="text" placeholder="full name" style={inputStyle} value={leadForm.name} onChange={(e) => setLeadForm((s) => ({ ...s, name: e.target.value }))} />
                  {leadErr.name && <span style={errText}>{leadErr.name}</span>}
                </label>
                <label style={field}>
                  <span style={labelSpan}>company name*</span>
                  <input type="text" placeholder="company" style={inputStyle} value={leadForm.company} onChange={(e) => setLeadForm((s) => ({ ...s, company: e.target.value }))} />
                  {leadErr.company && <span style={errText}>{leadErr.company}</span>}
                </label>
                <label style={field}>
                  <span style={labelSpan}>phone number*</span>
                  <input type="tel" placeholder="+91 00000 00000" style={inputStyle} value={leadForm.phone} onChange={(e) => setLeadForm((s) => ({ ...s, phone: e.target.value }))} />
                  {leadErr.phone && <span style={errText}>{leadErr.phone}</span>}
                </label>
                <label style={field}>
                  <span style={labelSpan}>business email*</span>
                  <input type="email" placeholder="example@email.com" style={inputStyle} value={leadForm.email} onChange={(e) => setLeadForm((s) => ({ ...s, email: e.target.value }))} />
                  {leadErr.email && <span style={errText}>{leadErr.email}</span>}
                </label>
                <label style={{ ...field, gridColumn: "span 2" }}>
                  <span style={labelSpan}>what solution are you looking for?</span>
                  <select style={{ ...inputStyle, appearance: "none" }} value={leadForm.service} onChange={(e) => setLeadForm((s) => ({ ...s, service: e.target.value }))}>
                    {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label style={{ ...field, gridColumn: "span 2" }}>
                  <span style={labelSpan}>what are you trying to automate, improve or build?</span>
                  <textarea rows={4} placeholder="e.g. our sales team tracks leads in Excel and follow-ups get missed" style={{ ...inputStyle, resize: "vertical" }} value={leadForm.message} onChange={(e) => setLeadForm((s) => ({ ...s, message: e.target.value }))} />
                </label>
                <label style={field}>
                  <span style={labelSpan}>estimated investment</span>
                  <select style={{ ...inputStyle, appearance: "none" }} value={leadForm.budget} onChange={(e) => setLeadForm((s) => ({ ...s, budget: e.target.value }))}>
                    <option>2-5 Lakh</option><option>5-10 Lakh</option><option>10-20 Lakh</option><option>20-30 Lakh</option><option>30 Lakh+</option>
                  </select>
                </label>
                <label style={field}>
                  <span style={labelSpan}>expected timeline to start</span>
                  <select style={{ ...inputStyle, appearance: "none" }} value={leadForm.timeline} onChange={(e) => setLeadForm((s) => ({ ...s, timeline: e.target.value }))}>
                    <option>Immediately</option><option>Within 1 – 15 Days</option><option>Within 15 – 30 Days</option>
                  </select>
                </label>
              </div>
              {leadStatus.error && <p style={{ margin: "16px 0 0", fontSize: 13, fontWeight: 500, color: "#d64545", textAlign: "center" }}>{leadStatus.error}</p>}
              <button type="submit" disabled={leadStatus.submitting} style={{ marginTop: 22, width: "100%", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", background: "#0037CA", border: "none", borderRadius: 10, padding: 16, cursor: leadStatus.submitting ? "not-allowed" : "pointer", opacity: leadStatus.submitting ? 0.7 : 1, boxShadow: "0 12px 28px rgba(0,55,202,0.26)" }}>{leadStatus.submitting ? "Submitting…" : "Discuss Your Software Requirement"}</button>
              <p style={{ margin: "12px 0 0", fontSize: 11.5, fontWeight: 400, color: "#6b6b8a", textAlign: "center" }}>Your details stay confidential. No sales spam.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: "0 0 40px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="foot-grid" style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 22, padding: "36px 40px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start", boxShadow: "0 16px 44px rgba(20,20,32,0.08)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
              <img src={`${IMG}/SKYUP-Logo.svg`} alt="SKYUP Digital Solutions" style={{ height: 36, alignSelf: "flex-start" }} />
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#6b6b8a", lineHeight: 1.75 }}>Based in Bangalore. Serving businesses across India. Tell us what you want to automate, improve or build, and we'll help turn it into a reliable software solution.</p>
            </div>
            <div data-r="foot-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20 }}>
              <div data-r="foot-links" style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
                {[["Solutions", "#solutions"], ["Why Us", "#why"], ["Process", "#process"], ["Investment", "#investment"], ["Contact", "#form"]].map(([l, h]) => (
                  <a key={l} href={h} style={{ fontSize: 14, fontWeight: 500, color: "#5c5c7a" }}>{l}</a>
                ))}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 400, color: "#6b6b8a" }}>© 2026 SKYUP Digital Solutions</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.csl-scope, [data-csl] { }
#solutions a:hover, #why a:hover, #process a:hover, #investment a:hover { opacity:.9; }
[data-r="foot-links"] a:hover { color:#0037CA; }
.svc-card:hover { transform:translateY(-6px); box-shadow:0 26px 60px rgba(20,20,32,0.16), inset 0 1px 0 rgba(255,255,255,0.9); }

@media (max-width:1199px) {
  [data-r="wrap"], [data-r="inv-grid"] { padding-left:24px !important; padding-right:24px !important; }
  [data-r="problem-grid"] { gap:28px !important; }
  [data-r="rev-grid"] { gap:36px !important; }
  [data-r="proc-card"] { padding:48px 32px 44px !important; }
  [data-r="cap-card"] { padding:44px 32px !important; gap:36px !important; }
}
@media (max-width:991px) {
  [data-r="nav"], [data-r="nav-cta"] { display:none !important; }
  [data-r="burger"] { display:flex !important; }
  [data-r="nav"][data-open="true"] { display:flex !important; flex-direction:column !important; gap:4px !important; position:absolute !important; top:64px; right:0; left:auto; width:min(280px, calc(100vw - 48px)); border-radius:20px !important; padding:12px !important; z-index:60; }
  [data-r="nav"][data-open="true"] > a { justify-content:flex-start; padding:13px 18px !important; font-size:15px !important; }
  [data-r="header"] { margin-bottom:48px !important; }
  [data-r="problem-grid"] { grid-template-columns:1fr !important; gap:36px !important; }
  [data-r="prob-col"] { align-items:flex-start !important; gap:32px !important; }
  [data-r="prob-col"] > div { text-align:left !important; align-items:flex-start !important; }
  [data-r="prob-col"] > div > div { flex-direction:row !important; }
  [data-r="orbit"] { width:min(420px, 86vw) !important; height:min(420px, 86vw) !important; order:-1; }
  [data-r="orbit-disc"] { width:66% !important; height:66% !important; padding:22px !important; gap:10px !important; }
  [data-r="orbit-text"] { font-size:14px !important; }
  [data-r="rev-grid"], [data-r="why-head"], [data-r="inv-grid"], [data-r="foot-grid"], [data-r="cap-card"] { grid-template-columns:1fr !important; }
  [data-r="map-hold"] { display:none !important; }
  [data-r="proj-grid"] { grid-template-columns:repeat(2, 1fr) !important; }
  [data-r="why-head"] { align-items:start !important; gap:20px !important; margin-bottom:32px !important; }
  [data-r="foot-grid"] { gap:28px !important; }
  [data-r="foot-right"] { align-items:flex-start !important; }
  [data-r="why-row"] { flex-direction:column !important; min-height:0 !important; align-items:stretch !important; }
  [data-r="why-card"] { flex:none !important; min-height:0 !important; }
  [data-r="why-art"] { height:220px !important; opacity:1 !important; }
  [data-r="why-num"] { display:none !important; }
  [data-r="why-title"] { font-size:23px !important; }
  [data-r="why-body"] { max-height:none !important; opacity:1 !important; }
  [data-r="inv-card"], [data-r="form-card"] { padding:26px !important; }
}
@media (max-width:767px) {
  [data-r="wrap"], [data-r="inv-grid"] { padding-left:18px !important; padding-right:18px !important; }
  [data-r="sect"] { padding-bottom:72px !important; }
  [data-r="hero"] { padding-bottom:64px !important; }
  [data-r="trust"] { border-radius:18px !important; flex-direction:column !important; padding:10px 18px !important; }
  [data-r="trust"] > span[aria-hidden] { display:none !important; }
  [data-r="hero-cta"] { flex-direction:column !important; align-items:stretch !important; width:100%; }
  [data-r="hero-cta"] > a { width:100%; padding:17px 20px !important; white-space:normal !important; }
  [data-r="hero-price"] { border-radius:18px !important; padding:12px 18px !important; }
  [data-r="proc-card"] { padding:36px 20px 32px !important; border-radius:22px !important; }
  [data-r="cap-card"] { padding:32px 20px !important; border-radius:22px !important; }
  [data-r="proj-grid"] { grid-template-columns:1fr !important; }
  [data-r="aud-grid"], [data-r="form-grid"] { grid-template-columns:1fr !important; }
  [data-r="form-grid"] > label { grid-column:span 1 !important; }
  [data-r="foot-grid"] { padding:28px 22px !important; }
  [data-r="foot-links"] { gap:4px !important; flex-direction:column !important; }
  [data-r="foot-links"] > a { padding:11px 0 !important; }
 [data-r="map-hold"] { display:none !important; }
}
@media (max-width:479px) {
  [data-r="wrap"], [data-r="inv-grid"] { padding-left:14px !important; padding-right:14px !important; }
  [data-r="brand"] { height:32px !important; }
  [data-r="sect"] { padding-bottom:60px !important; }
  [data-r="why-card"] { padding:20px !important; border-radius:22px !important; }
  [data-r="why-art"] { height:164px !important; }
  [data-r="map-hold"] { min-height:300px !important; }
  [data-r="inv-card"], [data-r="form-card"] { padding:20px !important; }
  [data-r="logos-card"] { border-radius:16px !important; }
  [data-r="orbit-text"] { font-size:12.5px !important; }
}
@keyframes skyup-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
@keyframes skyup-drift { 0%,100% { transform:translate3d(0,0,0) scale(1); } 50% { transform:translate3d(0,-24px,0) scale(1.06); } }
`;