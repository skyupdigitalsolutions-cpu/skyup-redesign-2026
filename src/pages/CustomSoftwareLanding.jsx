// src/pages/CustomSoftwareLanding.jsx
// Custom Software Development landing page — ported from the standalone design.
// Self-contained: its own header/footer/nav, scroll-triggered lead popup, review map,
// process marquee and hover-expand "Why us" cards. No global Header/Footer.
//
// Section order:
//   1. Hero  (+ trust logos strip)
//   2. Real Businesses / world map      (#reviews)
//   3. What We Build                    (#solutions)
//   4. How We Work — process marquee    (#process)
//   5. Why Us                           (#why)
//   6. The Problem                      (#problem)
//   7. Our Tech Stack                   (#capabilities)
//   8. CTA / Investment                 (#investment)
//   9. Contact form                     (#form)
import React, { useState, useEffect, useRef, useCallback } from "react";
import CustomSoftwareMap from "../components/CustomSoftwareMap";


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
  { title: "AI-Powered Solutions", body: "AI voice agents, intelligent workflows and AI integrations for business processes.", icon: "ai" },
];
const REASONS = [
  { num: "01.", title: "Business-First", body: "We understand your workflow, challenges and objectives before defining the solution.", icon: "target", art: `${IMG}/why-1-target.png` },
  { num: "02.", title: "Fully Customized", body: "Your software is designed around your processes—not a fixed template.", icon: "puzzle", art: `${IMG}/why-2-cubes.png` },
  { num: "03.", title: "Real Business Experience", body: "Experience across CRM, ERP, finance, field operations, transport, AI and automation.", icon: "layers", art: `${IMG}/why-3-layers.png` },
  { num: "04.", title: "Built To Evolve", body: "Solutions designed to support future users, workflows and integrations.", icon: "trend", art: `${IMG}/why-4-growth.png` },
];
const STEPS = [
  { num: "01", title: "Requirement Analysis", body: "Understand your business, workflows, users and requirements.", icon: "search" },
  { num: "02", title: "Architecture & Design", body: "Define the solution architecture, database, integrations and user experience.", icon: "pen" },
  { num: "03", title: "Development", body: "Build the solution iteratively with regular progress reviews and feedback.", icon: "code" },
  { num: "04", title: "Testing & UAT", body: "Validate functionality, integrations and user workflows before deployment.", icon: "shield" },
  { num: "05", title: "Deployment", body: "Deploy the solution and support your team during rollout.", icon: "rocket" },
  { num: "06", title: "Support & Improvements", body: "Training, handover, maintenance and future enhancements.", icon: "support" },
];
const PROCESS_PRACTICES = ["Agile Development", "Iterative Delivery", "Regular Feedback", "Continuous Testing"];
const CAPABILITIES = [
  { label: "Web & Backend", items: ["React.js", "Next.js", "Node.js", "Python", "Java"], icon: "code" },
  { label: "Mobile", items: ["Flutter", "React Native", "Android", "iOS"], icon: "mobile" },
  { label: "Cloud & Infrastructure", items: ["AWS", "Azure", "Google Cloud", "Docker"], icon: "cloud" },
  { label: "AI & ML", items: ["Generative AI", "NLP", "Computer Vision", "Analytics"], icon: "ai" },
];
const AUDIENCES = ["Small and medium businesses", "Growing companies", "Enterprises requiring customized systems", "Businesses replacing manual processes with technology"];
const PROBLEMS = [
  { n: "01", t: "Complex Workflows", b: "Specific roles, approvals, reports, automations and processes that standard software may not support.", icon: "automation", pos: "tl", area: "p1" },
  { n: "02", t: "Disconnected Systems", b: "Business information spread across different tools, teams and processes.", icon: "erp", pos: "tr", area: "p2" },
  { n: "03", t: "Growing Complexity", b: "More users, data, branches, integrations and operational requirements.", icon: "trend", pos: "b", area: "p3" },
];

const inputStyle = { fontSize: 14, fontWeight: 400, color: "#141420", padding: "13px 16px", border: "1px solid #e4e4f0", borderRadius: 10, outline: "none", background: "#fff", width: "100%", boxSizing: "border-box", fontFamily: "'Poppins',sans-serif" };
const labelSpan = { fontSize: 12.5, fontWeight: 500, color: "#6b6b8a" };
const field = { display: "flex", flexDirection: "column", gap: 7 };
const errText = { fontSize: 12, fontWeight: 500, color: "#d64545" };

const procCardStyle = { background: "linear-gradient(155deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.26) 100%)", backdropFilter: "blur(22px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: 22, padding: 28, display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box", minHeight: 236, boxShadow: "0 18px 40px rgba(20,20,32,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" };

export default function CustomSoftwareLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [whyActive, setWhyActive] = useState(1);
  const [modal, setModal] = useState("idle"); // idle | open | closing | done
  const timers = useRef({});
  const mapRef = useRef(null);
  const shownRef = useRef(false);
  const servicesRef = useRef(null);
  const [svcArmed, setSvcArmed] = useState(false);
  const [svcIn, setSvcIn] = useState(false);

  // ── Popup lead form ──
  const [popupForm, setPopupForm] = useState({ name: "", company: "", phone: "", email: "", service: "Custom Software", message: "", budget: "2-5 Lakh", timeline: "Immediately" });
  const [popupErr, setPopupErr] = useState({});
  const [popupStatus, setPopupStatus] = useState({ submitting: false, error: "", success: false });

  // ── Main contact form ──
  const [leadForm, setLeadForm] = useState({ name: "", company: "", phone: "", email: "", service: "Custom Software", message: "", budget: "2-5 Lakh", timeline: "Immediately" });
  const [leadErr, setLeadErr] = useState({});
  const [leadStatus, setLeadStatus] = useState({ submitting: false, error: "", success: false });

  // Close the mobile nav on desktop resize; open the lead popup the first time
  // the world map scrolls into view. Uses an IntersectionObserver with a scroll
  // fallback, gated once per browser session (sessionStorage).
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 991) setNavOpen(false); };
    window.addEventListener("resize", onResize);

    let dismissed = false;
    try { dismissed = sessionStorage.getItem("skyup-lead-popup-v2") === "done"; } catch (_) { /* storage blocked */ }

    let observer;
    const cleanupTriggers = () => {
      window.removeEventListener("scroll", onScroll);
      if (observer) { observer.disconnect(); observer = null; }
    };

    const openOnce = () => {
      if (shownRef.current || dismissed) return;
      shownRef.current = true;
      try { sessionStorage.setItem("skyup-lead-popup-v2", "done"); } catch (_) { /* ignore */ }
      setModal("open");
      cleanupTriggers();
    };

    function onScroll() {
      const el = mapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9) openOnce();
    }

    if (!dismissed) {
      if (typeof IntersectionObserver !== "undefined" && mapRef.current) {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) openOnce();
        }, { threshold: 0 });
        observer.observe(mapRef.current);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // in case the map is already in view on load
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cleanupTriggers();
      clearTimeout(timers.current.close);
      clearTimeout(timers.current.popupSuccess);
    };
  }, []);

  const closeModal = useCallback(() => {
    setModal("closing");
    timers.current.close = setTimeout(() => setModal("done"), 300);
  }, []);

  // Staggered reveal for the "What We Build" cards when scrolled into view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !servicesRef.current) return;
    setSvcArmed(true);
    const ob = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSvcIn(true); ob.disconnect(); }
    }, { threshold: 0.15 });
    ob.observe(servicesRef.current);
    return () => ob.disconnect();
  }, []);

  // Popup collects the same fields as the main contact form.
  const submitPopup = useCallback(async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!popupForm.name.trim()) e.name = "Name is required";
    if (!popupForm.company.trim()) e.company = "Company name is required";
    if (!popupForm.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_RE.test(popupForm.phone.trim())) e.phone = "Enter a valid phone number";
    if (!popupForm.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(popupForm.email.trim())) e.email = "Enter a valid email";
    setPopupErr(e);
    if (Object.keys(e).length) return;

    const payload = {
      name: popupForm.name.trim(),
      company: popupForm.company.trim(),
      email: popupForm.email.trim(),
      phone: popupForm.phone.trim(),
      service: popupForm.service,
      budget: popupForm.budget,
      message: [popupForm.message.trim(), `Expected timeline: ${popupForm.timeline}`].filter(Boolean).join("\n"),
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

  return (
    <div style={{ background: "#f5f5fa", overflow: "hidden", fontFamily: "'Poppins',sans-serif" }}>
      <style>{CSS}</style>

      {/* ── Lead popup (opens on world-map scroll) ── */}
      {(modal === "open" || modal === "closing") && (
        <div data-r="modal" style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(20,20,32,0.5)", backdropFilter: "blur(6px)", opacity: modal === "open" ? 1 : 0, transition: "opacity .28s ease" }}>
          <div style={{ position: "absolute", inset: 0 }} onClick={closeModal} />
          <div data-r="modal-card" style={{ position: "relative", width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto", background: "#fff", borderRadius: 24, padding: 34, boxShadow: "0 40px 90px rgba(20,20,32,0.34)", transform: modal === "open" ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)", transition: "transform .32s cubic-bezier(.4,0,.2,1)" }}>
            <button type="button" onClick={closeModal} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 9999, border: "1px solid #ebebf4", background: "#f5f5fa", color: "#141420", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {svg([P("M6 6l12 12", "a"), P("M18 6L6 18", "b")], { w: 18, h: 18, stroke: "currentColor", sw: 2 })}
            </button>
            <div data-r="modal-head" style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22, paddingRight: 44 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, width: "fit-content", background: "#f5f5fa", borderRadius: 9999, padding: "7px 14px", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Free Consultation</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em", lineHeight: 1.14 }}>Discuss your software requirement</h2>
              <p data-r="modal-sub" style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#6b6b8a", lineHeight: 1.7 }}>Tell us what you're trying to automate, improve or build — we'll understand your requirement and discuss the right solution.</p>
            </div>
            {popupStatus.success ? (
              <div style={{ padding: "30px 4px 8px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 38 }}>✅</div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#141420" }}>Thank you!</h3>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 400, color: "#6b6b8a" }}>We've received your requirement and will reach out shortly.</p>
              </div>
            ) : (
              <>
                <div data-r="modal-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <label style={field}>
                    <span style={labelSpan}>name*</span>
                    <input type="text" placeholder="full name" style={inputStyle} value={popupForm.name} onChange={(e) => setPopupForm((s) => ({ ...s, name: e.target.value }))} />
                    {popupErr.name && <span style={errText}>{popupErr.name}</span>}
                  </label>
                  <label style={field}>
                    <span style={labelSpan}>company name*</span>
                    <input type="text" placeholder="company" style={inputStyle} value={popupForm.company} onChange={(e) => setPopupForm((s) => ({ ...s, company: e.target.value }))} />
                    {popupErr.company && <span style={errText}>{popupErr.company}</span>}
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
                  <label style={{ ...field, gridColumn: "span 2" }}><span style={labelSpan}>what solution are you looking for?</span>
                    <select style={{ ...inputStyle, appearance: "none" }} value={popupForm.service} onChange={(e) => setPopupForm((s) => ({ ...s, service: e.target.value }))}>
                      {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label style={{ ...field, gridColumn: "span 2" }}>
                    <span style={labelSpan}>what are you trying to automate, improve or build?</span>
                    <textarea rows={3} placeholder="e.g. our sales team tracks leads in Excel and follow-ups get missed" style={{ ...inputStyle, resize: "vertical" }} value={popupForm.message} onChange={(e) => setPopupForm((s) => ({ ...s, message: e.target.value }))} />
                  </label>
                  <label style={field}>
                    <span style={labelSpan}>estimated investment</span>
                    <select style={{ ...inputStyle, appearance: "none" }} value={popupForm.budget} onChange={(e) => setPopupForm((s) => ({ ...s, budget: e.target.value }))}>
                      <option>2-5 Lakh</option><option>5-10 Lakh</option><option>10-20 Lakh</option><option>20-30 Lakh</option><option>30 Lakh+</option>
                    </select>
                  </label>
                  <label style={field}>
                    <span style={labelSpan}>expected timeline to start</span>
                    <select style={{ ...inputStyle, appearance: "none" }} value={popupForm.timeline} onChange={(e) => setPopupForm((s) => ({ ...s, timeline: e.target.value }))}>
                      <option>Immediately</option><option>Within 1 – 15 Days</option><option>Within 15 – 30 Days</option>
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
      <section id="top" data-r="hero" style={{ position: "relative", padding: "24px 0 96px", overflow: "hidden" }}>
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
              <span style={{ fontSize: 14, fontWeight: 500, color: "#4a4a66" }}>Projects Starting From</span>
              <span style={{ display: "inline-flex", alignItems: "center", fontSize: 14, fontWeight: 700, color: "#fff", background: "#F1891A", borderRadius: 9999, padding: "6px 14px", boxShadow: "0 4px 12px rgba(241,137,26,0.32)" }}>₹2 Lakh+</span>
            </div>
            <div data-r="hero-rating" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #ebebf4", borderRadius: 9999, padding: "10px 20px", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(20,20,32,0.07)", marginTop: -8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#141420" }}>4.9</span>
              <div style={{ display: "flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((k) => <span key={k}>{STAR}</span>)}</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#6b6b8a" }}>from business owners</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted-by logos (trust strip) ── */}
      <section data-r="sect" style={{ padding: "0 0 96px" }}>
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

      {/* ══ 2. Real Businesses / world map ══ */}
      <section id="reviews" style={{ position: "relative", padding: "8px 0 84px", overflow: "hidden" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="rev-grid" style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "center", textAlign: "center", gap: 56, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 1000 }}>
              <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.035em", lineHeight: 1.1, textWrap: "balance" }}>
                <span data-r="rev-line">Real Businesses. Real Workflows.</span>{" "}
                <span data-r="rev-line">Software Built Around Them.</span>
              </h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.7, maxWidth: 760, textWrap: "balance" }}>From CRM and ERP to field management, automation and AI solutions, we build software around the way businesses actually operate.</p>
            </div>
          </div>

          {/* A glimpse of our work — above the map */}
          <div data-r="glimpse-wrap" style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <div className="glimpse-chip" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 9999, padding: "10px 20px", boxShadow: "0 8px 24px rgba(20,20,32,0.07)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "#141420" }}>
                {svg([<circle key="a" cx="12" cy="12" r="9.5" />, P("M8.5 12l2.5 2.5 4.5-5", "b")], { w: 15, h: 15, stroke: "#0037CA", sw: 2.4 })}A glimpse of our work
              </span>
              <span className="glimpse-div" aria-hidden="true" style={{ width: 1, height: 14, background: "#c9c9dc" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#4a4a66" }}>and many more delivered across India</span>
            </div>
          </div>

          {/* Interactive India map */}
          <div data-r="map-hold" style={{ position: "relative", maxWidth: 860, margin: "28px auto 0" }}>
            <CustomSoftwareMap />
          </div>

          {/* Supporting note */}
          <p data-r="more-note" style={{ margin: "28px auto 0", maxWidth: 620, textAlign: "center", fontSize: 14.5, fontWeight: 500, color: "#5c5c7a", lineHeight: 1.7 }}>
            These are just a few examples. We've built custom software, CRMs, ERPs and automation for many more businesses.{" "}
            <a href="#form" style={{ fontWeight: 600, color: "#0037CA", textDecoration: "underline", textUnderlineOffset: 4, whiteSpace: "nowrap" }}>Let's build yours →</a>
          </p>
        </div>
      </section>

      {/* ══ 3. What We Build ══ */}
      <section id="solutions" style={{ position: "relative", padding: "32px 0 104px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)", width: 1240, height: 820, filter: "blur(100px)", opacity: 0.62, background: "radial-gradient(32% 34% at 18% 28%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(34% 36% at 50% 20%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(32% 34% at 82% 30%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(38% 38% at 30% 78%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(30% 32% at 74% 80%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 9999, padding: "8px 26px 8px 8px", boxShadow: "0 12px 30px rgba(20,20,32,0.14)" }}>
              <span style={{ width: 44, height: 44, borderRadius: 9999, background: "#141420", display: "flex", alignItems: "center", justifyContent: "center" }}>{svg([P("M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z", "a"), P("M14 2v5h5", "b")], { w: 20, h: 20, stroke: "#fff", sw: 2 })}</span>
              <span style={{ fontSize: "clamp(18px, 2.4vw, 22px)", fontWeight: 600, color: "#141420", letterSpacing: "-0.02em" }}>What We Build</span>
            </div>
          </div>
          {/* 6 cards: flex-wrap gives 3 + 3 on desktop, 2 + 2 + 2 on tablet, stacked on mobile */}
          <div ref={servicesRef} data-r="svc-grid" className={`svc-grid${svcArmed ? " svc-reveal" : ""}${svcIn ? " in" : ""}`} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
            {SERVICES.map((s) => (
              <div key={s.title} className="svc-card" style={{ flex: "1 1 300px", maxWidth: 372, background: "linear-gradient(155deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.34) 100%)", backdropFilter: "blur(24px) saturate(150%)", border: "1px solid rgba(255,255,255,0.75)", borderRadius: 22, padding: "30px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, minHeight: 236, boxSizing: "border-box", boxShadow: "0 18px 44px rgba(20,20,32,0.10), inset 0 1px 0 rgba(255,255,255,0.85)" }}>
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

          {/* popup trigger — fires once section 3 (What We Build) has been scrolled through */}
          <div ref={mapRef} aria-hidden="true" style={{ height: 1 }} />
        </div>
      </section>

      {/* ══ 4. How We Work — process marquee ══ */}
      <section id="process" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="proc-card" style={{ position: "relative", background: "linear-gradient(135deg,#f2e4e6 0%,#f9c7c8 22%,#efb4d4 44%,#d3c3f2 68%,#c6cff8 100%)", borderRadius: 28, padding: "56px 0 52px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -140, left: "50%", transform: "translateX(-50%)", width: 1100, height: 760, filter: "blur(80px)", opacity: 0.55, background: "radial-gradient(30% 34% at 18% 24%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(26% 30% at 62% 14%, #ffd9c2 0%, rgba(255,217,194,0) 70%), radial-gradient(30% 34% at 88% 46%, #b9c6ff 0%, rgba(185,198,255,0) 70%), radial-gradient(32% 36% at 34% 88%, #ffc0dd 0%, rgba(255,192,221,0) 72%)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 34%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.22) 100%)" }} />
            <div data-r="proc-head" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 9999, padding: "7px 20px", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#141420" }}>How We Work</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.035em", lineHeight: 1.1 }}>Our Software Development Process</h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 400, color: "#4a4a66", maxWidth: 560, lineHeight: 1.7 }}>A structured SDLC with Agile development practices, from requirement analysis through deployment and ongoing support.</p>
            </div>

            {/* auto-scrolling marquee of the 6 process steps (pauses on hover) */}
            <div data-r="proc-marquee">
              <div className="proc-track">
                {[...STEPS, ...STEPS].map((st, i) => (
                  <div className="proc-step" key={i} aria-hidden={i >= STEPS.length ? "true" : undefined}>
                    <div className="proc-step-card" style={procCardStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 10px 22px rgba(20,20,32,0.14)" }}>{svg(ICON[st.icon], { w: 22, h: 22 })}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0037CA", letterSpacing: "0.12em" }}>{st.num}</div>
                      </div>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#141420", letterSpacing: "-0.015em" }}>{st.title}</h3>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#3b3b57", lineHeight: 1.7 }}>{st.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-r="proc-practices" style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 36, padding: "0 24px" }}>
              {PROCESS_PRACTICES.map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "#141420", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.85)", borderRadius: 9999, padding: "9px 18px", whiteSpace: "nowrap" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 9999, background: "#0037CA", display: "inline-block" }} />{p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. Why Us ══ */}
      <section id="why" style={{ position: "relative", padding: "24px 0 104px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1240, height: 760, filter: "blur(100px)", opacity: 0.5, background: "radial-gradient(34% 40% at 16% 30%, #0037CA 0%, rgba(0,55,202,0) 72%), radial-gradient(32% 36% at 48% 22%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(32% 36% at 84% 34%, #ff4fa3 0%, rgba(255,79,163,0) 70%), radial-gradient(32% 36% at 70% 82%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(28% 32% at 24% 84%, #22c3f0 0%, rgba(34,195,240,0) 70%)" }} />
        <div data-r="wrap" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="why-head" style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 48, alignItems: "end", marginBottom: 48 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Why Us</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 700, lineHeight: 1.1, color: "#141420", letterSpacing: "-0.035em", maxWidth: 620, textWrap: "pretty" }}>We Understand Your Business Before We Build Your Software</h2>
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
          <div data-r="why-stats" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            {[["100%", "Custom-built", "#141420"], ["6", "Stage process", "#0037CA"], ["\u20b92L+", "Project scale", "#F1891A"]].map(([n, l, c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 16, padding: "16px 22px", boxShadow: "0 10px 26px rgba(20,20,32,0.08)" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: c, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#3b3b57" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. The Problem ══ */}
      <section id="problem" data-r="sect" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="prob-head" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, margin: "0 auto 64px", maxWidth: 900 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid #ebebf4", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>The Problem</span>
            </div>
            <h2 data-r="prob-title" style={{ margin: 0, fontSize: "clamp(29px, 4.4vw, 46px)", fontWeight: 700, lineHeight: 1.14, color: "#141420", letterSpacing: "-0.035em", textWrap: "balance" }}>
              When Your Business Outgrows <span style={{ whiteSpace: "nowrap" }}>Off-the-Shelf</span> Software
            </h2>
            <p style={{ margin: 0, maxWidth: 620, fontSize: 16, fontWeight: 500, color: "#3b3b57", lineHeight: 1.7, textWrap: "pretty" }}>Standard software works well when your processes are standard. But growing businesses often need more flexibility.</p>
          </div>

          {/* Desktop: 01 top-left, 02 top-right, 03 below — each tied to an orbit dot.
              Mobile: orbit on top, three stacked cards. */}
          <div data-r="prob-stage" style={{ display: "grid", gridTemplateColumns: "1fr 440px 1fr", gridTemplateAreas: '"p1 orbit p2" "p3 p3 p3"', columnGap: 40, alignItems: "start" }}>
            <div data-r="orbit" style={{ gridArea: "orbit", position: "relative", width: 440, height: 440, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 9999, border: "1px solid #d8d8e8" }} />
              <div style={{ position: "absolute", inset: -46, borderRadius: 9999, filter: "blur(60px)", opacity: 0.5, background: "radial-gradient(38% 44% at 28% 30%, #7b3ff2 0%, rgba(123,63,242,0) 70%), radial-gradient(36% 42% at 72% 34%, #F1891A 0%, rgba(241,137,26,0) 70%), radial-gradient(40% 46% at 50% 78%, #0037CA 0%, rgba(0,55,202,0) 72%)" }} />
              {[{ top: "12.3%", left: "12.3%", n: "01" }, { top: "12.3%", right: "12.3%", n: "02" }, { bottom: 0, left: "50%", n: "03" }].map((d) => (
                <div key={d.n} data-r="orbit-dot" style={{ position: "absolute", top: d.top, left: d.left, right: d.right, bottom: d.bottom, transform: `translate(${d.right ? "50%" : "-50%"}, ${d.bottom === 0 ? "50%" : "-50%"})`, width: 30, height: 30, borderRadius: 9999, background: "#F1891A", color: "#fff", fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px rgba(241,137,26,0.16), 0 6px 16px rgba(241,137,26,0.45)", zIndex: 2 }}>{d.n}</div>
              ))}
              <div data-r="orbit-disc" style={{ position: "relative", boxSizing: "border-box", width: 280, height: 280, borderRadius: 9999, background: "radial-gradient(120% 120% at 30% 20%, #1a55e8 0%, #0037CA 55%, #002a9e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, textAlign: "center", boxShadow: "0 24px 60px rgba(0,55,202,0.34)" }}>
                <p data-r="orbit-text" style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "#fff", lineHeight: 1.5, letterSpacing: "-0.01em" }}>When your business processes are unique, your software should be designed around them.</p>
                <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 13.5, color: "#0037CA", background: "#fff", borderRadius: 9999, padding: "11px 22px", boxShadow: "0 8px 20px rgba(0,0,0,0.14)" }}>Talk To Our Team</a>
              </div>
            </div>

            {PROBLEMS.map((p) => (
              <div key={p.n} data-r={`prob-${p.pos}`} style={{ gridArea: p.area, position: "relative", justifySelf: p.pos === "tl" ? "end" : p.pos === "tr" ? "start" : "center", width: "100%", maxWidth: 330, marginTop: p.pos === "b" ? 44 : 0 }}>
                {/* dashed connector to the matching orbit dot (desktop only) */}
                <span data-r="prob-link" aria-hidden="true" style={p.pos === "b"
                  ? { position: "absolute", top: -44, left: "50%", height: 44, borderLeft: "1.5px dashed #c9c9dc" }
                  : { position: "absolute", top: 54, [p.pos === "tl" ? "right" : "left"]: -94, width: 94, borderTop: "1.5px dashed #c9c9dc" }} />
                <div className="prob-card" data-r="prob-card" style={{ position: "relative", display: "flex", gap: 16, alignItems: "flex-start", background: "linear-gradient(155deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.66) 100%)", backdropFilter: "blur(18px)", border: "1px solid #fff", borderRadius: 20, padding: "22px 22px 24px", boxShadow: "0 16px 40px rgba(20,20,32,0.08)", transition: "transform .25s ease, box-shadow .25s ease" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, background: "#fff4e8", display: "flex", alignItems: "center", justifyContent: "center" }}>{svg(ICON[p.icon], { w: 22, h: 22, stroke: "#F1891A", sw: 2 })}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", color: "#F1891A" }}>{p.n}</span>
                    <h3 style={{ margin: 0, fontSize: 18.5, fontWeight: 600, color: "#141420", lineHeight: 1.3, letterSpacing: "-0.015em" }}>{p.t}</h3>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#4a4a66", lineHeight: 1.65 }}>{p.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. Our Tech Stack ══ */}
      <section id="capabilities" style={{ padding: "0 0 104px" }}>
        <div data-r="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div data-r="cap-card" style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 28, padding: "52px 48px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center", boxShadow: "0 16px 44px rgba(20,20,32,0.07)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#f5f5fa", borderRadius: 9999, padding: "7px 16px", width: "fit-content", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F1891A", display: "inline-block" }} />
                <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#141420" }}>Our Tech Stack</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.12, color: "#141420", letterSpacing: "-0.035em", textWrap: "pretty" }}>Technology &amp; Capabilities</h2>
              <p style={{ margin: 0, fontSize: 15.5, fontWeight: 500, color: "#3b3b57", lineHeight: 1.72 }}>We select technologies based on your requirements, scalability, integrations and long-term goals.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CAPABILITIES.map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 16, background: "#f5f5fa", borderRadius: 16, padding: "14px 18px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 6px 16px rgba(20,20,32,0.10)" }}>{svg(ICON[c.icon], { w: 20, h: 20, stroke: "#0037CA" })}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    <span style={{ fontSize: 15.5, fontWeight: 600, color: "#141420" }}>{c.label}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 400, color: "#5c5c7a", lineHeight: 1.55 }}>{c.items.join(" • ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. CTA / Investment ══ */}
      <section id="investment" style={{ padding: "0 0 104px" }}>
        <div data-r="inv-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 32, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em", lineHeight: 1.12 }}>Custom Software. Scoped Around Your Requirements.</h2>
            <p style={{ margin: 0, fontSize: 15.5, fontWeight: 400, color: "#5c5c7a", lineHeight: 1.72 }}>Every project is different. Investment depends on the workflows, features, users, integrations and overall complexity involved.</p>
          </div>
          <div data-r="inv-card" style={{ background: "#fff", border: "1px solid #ebebf4", borderRadius: 18, padding: 34, display: "flex", flexDirection: "column", gap: 22, boxShadow: "0 10px 34px rgba(20,20,32,0.07)" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 400, color: "#5c5c7a", lineHeight: 1.72 }}>If you're looking for a customized business solution rather than a basic off-the-shelf product, let's discuss your requirements.</p>
            <div data-r="inv-price" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, background: "#f5f5fa", borderRadius: 14, padding: "24px 28px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b8a" }}>Projects Starting From</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 700, color: "#141420", letterSpacing: "-0.03em" }}>₹2 Lakh+</span>
                </div>
              </div>
              <a href="#form" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontWeight: 600, fontSize: 14.5, color: "#fff", background: "#0037CA", borderRadius: 10, padding: "14px 24px", boxShadow: "0 10px 26px rgba(0,55,202,0.26)" }}>Discuss Your Requirement</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. Contact form ══ */}
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
          <div data-r="foot-grid" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#181a2b 0%,#101120 60%,#0c0d18 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 26, padding: "48px 48px 32px", display: "grid", gridTemplateColumns: "1.5fr 1fr 1.3fr", gap: 48, alignItems: "start", boxShadow: "0 24px 60px rgba(20,20,32,0.30)" }}>
            {/* soft brand glow */}
            <div aria-hidden="true" style={{ position: "absolute", top: -120, left: -60, width: 520, height: 320, filter: "blur(90px)", opacity: 0.4, pointerEvents: "none", background: "radial-gradient(40% 50% at 30% 40%, #0037CA 0%, rgba(0,55,202,0) 70%), radial-gradient(40% 50% at 70% 60%, #FA9F43 0%, rgba(250,159,67,0) 72%)" }} />

            {/* Brand + socials */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
              <a href="#top" className="foot-logo" style={{ alignSelf: "flex-start", display: "inline-flex", background: "#fff", borderRadius: 12, padding: "10px 14px", boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}>
                <img src={`${IMG}/SKYUP-Logo.svg`} alt="SKYUP Digital Solutions" style={{ height: 32, display: "block" }} />
              </a>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#a6a6c2", lineHeight: 1.75 }}>Based in Bangalore. Serving businesses across India. Tell us what you want to automate, improve or build, and we'll help turn it into a reliable software solution.</p>
              {/* NOTE: replace LinkedIn / Instagram hrefs with your real profile URLs */}
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/skyup-digital-solutions", icon: [P("M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z", "a"), <rect key="b" x="2" y="9" width="4" height="12" />, <circle key="c" cx="4" cy="4" r="2" />] },
                  { label: "Instagram", href: "https://www.instagram.com/skyupdigitalsolutions", icon: [<rect key="a" x="2" y="2" width="20" height="20" rx="5" />, <circle key="b" cx="12" cy="12" r="4" />, P("M17.5 6.5h.01", "c")] },
                  { label: "Email", href: "mailto:contact@skyupdigitalsolutions.com", icon: [<rect key="a" x="2" y="4" width="20" height="16" rx="2" />, P("m22 6-10 7L2 6", "b")] },
                ].map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={s.label} title={s.label} className="foot-soc" style={{ width: 44, height: 44, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    {svg(s.icon, { w: 19, h: 19, stroke: "currentColor", sw: 1.9 })}
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6f92" }}>Explore</div>
              <div data-r="foot-links" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["What We Build", "#solutions"], ["How We Work", "#process"], ["Why Us", "#why"], ["Tech Stack", "#capabilities"], ["Investment", "#investment"], ["Contact", "#form"]].map(([l, h]) => (
                  <a key={l} href={h} className="foot-a" style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content", fontSize: 14, fontWeight: 500, color: "#a6a6c2" }}>
                    <span style={{ color: "#FA9F43" }}>{svg([P("M9 6l6 6-6 6", "a")], { w: 13, h: 13, stroke: "currentColor", sw: 2.4 })}</span>{l}
                  </a>
                ))}
              </div>
            </div>

            {/* Get in touch */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6f92" }}>Get In Touch</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "contact@skyupdigitalsolutions.com", href: "mailto:contact@skyupdigitalsolutions.com", icon: [<rect key="a" x="2" y="4" width="20" height="16" rx="2" />, P("m22 6-10 7L2 6", "b")] },
                  { label: "skyupdigitalsolutions.com", href: "https://skyupdigitalsolutions.com", icon: ICON.web },
                  { label: "Bangalore, India", href: "https://maps.google.com/?q=Bengaluru,Karnataka,India", icon: ICON.pin },
                ].map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="foot-chip" style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "#d4d4e6", fontSize: 13.5, fontWeight: 500 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(250,159,67,0.14)", color: "#FA9F43" }}>{svg(c.icon, { w: 16, h: 16, stroke: "currentColor", sw: 1.9 })}</span>
                    <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{c.label}</span>
                  </a>
                ))}
              </div>
              <a href="#form" className="foot-cta" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 2, fontWeight: 600, fontSize: 14.5, color: "#141420", background: "#FA9F43", borderRadius: 10, padding: "13px 22px", boxShadow: "0 12px 26px rgba(250,159,67,0.30)" }}>
                Start Your Project{svg([P("M5 12h14", "a"), P("m13 6 6 6-6 6", "b")], { w: 17, h: 17, stroke: "currentColor", sw: 2.2 })}
              </a>
            </div>

            {/* Bottom bar */}
            <div data-r="foot-bottom" style={{ position: "relative", gridColumn: "1 / -1", marginTop: 12, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12.5, fontWeight: 400, color: "#8686a6" }}>© 2026 SKYUP Digital Solutions LLP · All rights reserved</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 500, color: "#8686a6" }}>{svg(ICON.pin, { w: 13, h: 13, stroke: "#FA9F43", sw: 2.2 })}Designed &amp; built in Bangalore</span>
                <a href="#top" className="foot-top" aria-label="Back to top" title="Back to top" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "#d4d4e6", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9999, padding: "8px 14px" }}>
                  Back to top{svg([P("M12 19V5", "a"), P("m5 12 7-7 7 7", "b")], { w: 15, h: 15, stroke: "currentColor", sw: 2.2 })}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
#solutions a:hover, #why a:hover, #process a:hover, #investment a:hover { opacity:.9; }
.foot-logo { transition:transform .2s ease; }
.foot-logo:hover { transform:translateY(-2px); }
.foot-a { transition:color .18s ease, transform .18s ease; }
.foot-a:hover { color:#fff !important; transform:translateX(3px); }
.foot-chip { transition:background .2s ease, border-color .2s ease, transform .2s ease; }
.foot-chip:hover { background:rgba(255,255,255,0.09) !important; border-color:rgba(250,159,67,0.55) !important; color:#fff !important; transform:translateY(-2px); }
.foot-soc { transition:background .2s ease, border-color .2s ease, color .2s ease, transform .2s ease; }
.foot-soc:hover { background:#FA9F43 !important; border-color:#FA9F43 !important; color:#141420 !important; transform:translateY(-3px); }
.foot-cta { transition:transform .2s ease, box-shadow .2s ease, background .2s ease; }
.foot-cta:hover { transform:translateY(-2px); background:#ffb15f !important; box-shadow:0 16px 34px rgba(250,159,67,0.42) !important; }
.foot-top { transition:background .2s ease, transform .2s ease; }
.foot-top:hover { background:rgba(255,255,255,0.14) !important; transform:translateY(-2px); }
[data-r="rev-line"] { display:block; white-space:nowrap; }
.prob-card:hover { transform:translateY(-4px); box-shadow:0 24px 52px rgba(20,20,32,0.13) !important; }
.svc-card { transition: transform .25s ease, box-shadow .25s ease, opacity .5s ease; }
.svc-card:hover { transform:translateY(-6px); box-shadow:0 26px 60px rgba(20,20,32,0.16), inset 0 1px 0 rgba(255,255,255,0.9); }
/* staggered reveal for What We Build */
.svc-reveal .svc-card { opacity:0; transform:translateY(20px); transition: opacity .55s ease, transform .55s cubic-bezier(.4,0,.2,1); }
.svc-reveal.in .svc-card { opacity:1; transform:translateY(0); }
.svc-reveal.in .svc-card:nth-child(1){transition-delay:.05s}
.svc-reveal.in .svc-card:nth-child(2){transition-delay:.13s}
.svc-reveal.in .svc-card:nth-child(3){transition-delay:.21s}
.svc-reveal.in .svc-card:nth-child(4){transition-delay:.29s}
.svc-reveal.in .svc-card:nth-child(5){transition-delay:.37s}
.svc-reveal.in .svc-card:nth-child(6){transition-delay:.45s}
@media (prefers-reduced-motion: reduce) { .svc-reveal .svc-card { opacity:1 !important; transform:none !important; transition:none !important; } }

/* How-we-work marquee */
[data-r="proc-marquee"] { position:relative; overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.proc-track { display:flex; width:max-content; animation:skyup-marquee 46s linear infinite; }
/* pause on hover only for mouse devices (so touch doesn't stick); pause while pressing on touch */
@media (hover: hover) { [data-r="proc-marquee"]:hover .proc-track { animation-play-state:paused; } }
[data-r="proc-marquee"]:active .proc-track { animation-play-state:paused; }
.proc-step { padding:0 9px; flex-shrink:0; box-sizing:border-box; }
.proc-step-card { width:330px; }
@media (prefers-reduced-motion: reduce) { .proc-track { animation:none; } }

@media (max-width:1199px) {
  [data-r="wrap"], [data-r="inv-grid"] { padding-left:24px !important; padding-right:24px !important; }
  [data-r="prob-stage"] { grid-template-columns:1fr 380px 1fr !important; column-gap:28px !important; }
  [data-r="orbit"] { width:380px !important; height:380px !important; }
  [data-r="orbit-disc"] { width:250px !important; height:250px !important; padding:26px !important; }
  [data-r="orbit-text"] { font-size:14.5px !important; }
  [data-r="prob-tl"] [data-r="prob-link"], [data-r="prob-tr"] [data-r="prob-link"] { width:75px !important; top:47px !important; }
  [data-r="prob-tl"] [data-r="prob-link"] { right:-75px !important; }
  [data-r="prob-tr"] [data-r="prob-link"] { left:-75px !important; }
  [data-r="rev-grid"] { gap:36px !important; }
  [data-r="cap-card"] { padding:44px 32px !important; gap:36px !important; }
}
@media (max-width:991px) {
  [data-r="nav"], [data-r="nav-cta"] { display:none !important; }
  [data-r="burger"] { display:flex !important; }
  [data-r="nav"][data-open="true"] { display:flex !important; flex-direction:column !important; gap:4px !important; position:absolute !important; top:64px; right:0; left:auto; width:min(280px, calc(100vw - 48px)); border-radius:20px !important; padding:12px !important; z-index:60; }
  [data-r="nav"][data-open="true"] > a { justify-content:flex-start; padding:13px 18px !important; font-size:15px !important; }
  [data-r="header"] { margin-bottom:48px !important; }
  [data-r="rev-line"] { display:inline; white-space:normal; }
  [data-r="prob-head"] { margin-bottom:40px !important; }
  [data-r="prob-stage"] { grid-template-columns:1fr !important; grid-template-areas:"orbit" "p1" "p2" "p3" !important; row-gap:14px !important; max-width:560px; margin:0 auto; }
  [data-r="orbit"] { width:min(380px, 84vw) !important; height:min(380px, 84vw) !important; margin-bottom:34px !important; }
  [data-r="orbit-disc"] { width:66% !important; height:66% !important; padding:22px !important; gap:12px !important; }
  [data-r="orbit-text"] { font-size:14px !important; }
  [data-r="prob-tl"], [data-r="prob-tr"], [data-r="prob-b"] { justify-self:stretch !important; max-width:none !important; margin-top:0 !important; }
  [data-r="prob-link"] { display:none !important; }
  [data-r="rev-grid"], [data-r="why-head"], [data-r="inv-grid"], [data-r="foot-grid"], [data-r="cap-card"] { grid-template-columns:1fr !important; }
  [data-r="why-head"] { align-items:start !important; gap:20px !important; margin-bottom:32px !important; }
  [data-r="foot-grid"] { gap:28px !important; }
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
  [data-r="sect"] { padding-bottom:60px !important; }
  [data-r="hero"] { padding-bottom:56px !important; }
  #reviews, #solutions, #why, #process, #capabilities, #investment { padding-bottom:64px !important; }
  #solutions { padding-top:16px !important; }
  #reviews [data-r="map-hold"] { margin-top:32px !important; }
  [data-r="trust"] { border-radius:18px !important; flex-direction:column !important; padding:10px 18px !important; }
  [data-r="trust"] > span[aria-hidden] { display:none !important; }
  [data-r="hero-cta"] { flex-direction:column !important; align-items:stretch !important; width:100%; }
  [data-r="hero-cta"] > a { width:100%; padding:17px 20px !important; white-space:normal !important; }
  [data-r="hero-price"] { border-radius:18px !important; padding:12px 18px !important; }
  [data-r="proc-card"] { padding-top:36px !important; padding-bottom:32px !important; border-radius:22px !important; }
  [data-r="proc-head"] { margin-bottom:28px !important; padding:0 18px !important; }
  [data-r="proc-practices"] { padding:0 18px !important; display:grid !important; grid-template-columns:1fr 1fr !important; gap:10px !important; }
  [data-r="proc-practices"] > span { font-size:12.5px !important; padding:8px 12px !important; width:100% !important; box-sizing:border-box !important; justify-content:center !important; }
  .proc-step-card { width:264px !important; padding:24px !important; min-height:212px !important; }
  [data-r="cap-card"] { padding:32px 20px !important; border-radius:22px !important; }
  [data-r="aud-grid"], [data-r="form-grid"] { grid-template-columns:1fr !important; }
  [data-r="form-grid"] > label { grid-column:span 1 !important; }
  [data-r="foot-grid"] { padding:32px 22px 24px !important; gap:32px !important; }
  [data-r="foot-links"] > a { padding:2px 0 !important; }
  [data-r="foot-bottom"] { flex-direction:column !important; align-items:flex-start !important; gap:16px !important; }
  [data-r="foot-bottom"] > div:last-child { flex-wrap:wrap !important; }
  .glimpse-chip { flex-direction:column !important; gap:4px !important; border-radius:18px !important; padding:12px 18px !important; }
  .glimpse-chip .glimpse-div { display:none !important; }
  [data-r="why-stats"] { display:grid !important; grid-template-columns:repeat(3,1fr) !important; gap:10px !important; }
  [data-r="why-stats"] > div { padding:14px 10px !important; }
  [data-r="why-stats"] > div > div:first-child { font-size:22px !important; }
  [data-r="why-stats"] > div > div:last-child { font-size:12px !important; line-height:1.3 !important; }
  [data-r="modal"] { padding:14px !important; }
  [data-r="modal-card"] { padding:22px 20px !important; border-radius:20px !important; max-height:94vh !important; }
  [data-r="modal-head"] { margin-bottom:16px !important; }
  [data-r="modal-fields"] { gap:10px !important; }
  [data-r="modal-card"] input, [data-r="modal-card"] select, [data-r="modal-card"] textarea { padding:11px 14px !important; }
}
@media (max-width:479px) {
  [data-r="wrap"], [data-r="inv-grid"] { padding-left:14px !important; padding-right:14px !important; }
  [data-r="brand"] { height:32px !important; }
  [data-r="sect"] { padding-bottom:56px !important; }
  #reviews, #solutions, #why, #process, #capabilities, #investment { padding-bottom:56px !important; }
  .proc-step { padding:0 7px !important; }
  .proc-step-card { width:236px !important; padding:20px !important; min-height:196px !important; }
  [data-r="why-card"] { padding:20px !important; border-radius:22px !important; }
  [data-r="why-art"] { height:164px !important; }
  [data-r="inv-card"], [data-r="form-card"] { padding:20px !important; }
  [data-r="logos-card"] { border-radius:16px !important; }
  [data-r="orbit-text"] { font-size:12.5px !important; }
  [data-r="orbit-dot"] { width:26px !important; height:26px !important; font-size:9.5px !important; }
  [data-r="prob-card"] { padding:18px 18px 20px !important; gap:14px !important; border-radius:18px !important; }
  [data-r="prob-card"] h3 { font-size:17px !important; }
  [data-r="prob-card"] p { font-size:13.5px !important; }
}
@keyframes skyup-marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
`;
