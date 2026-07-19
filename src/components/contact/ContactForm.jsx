// src/components/contact/ContactForm.jsx
// Fully-dark, glossy black contact form (monochrome — no colour accents).
// Heading + fields: First Name, Last Name, Company Name, Email, Your Interest
// (dropdown), Phone Number, Message. All required EXCEPT Message. Validated.

import React, { useState } from "react";

const INTERESTS = [
  "SEO",
  "Google / Meta Ads (PPC)",
  "Social Media Marketing",
  "Web Development",
  "AI Automation",
  "CRM / Software",
  "Other",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d][\d\s-]{6,14}$/;

export default function ContactForm() {
  const [f, setF] = useState({ firstName: "", lastName: "", company: "", email: "", interest: "", phone: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); if (err[k]) setErr((s) => ({ ...s, [k]: undefined })); };

  const validate = () => {
    const e = {};
    if (!f.firstName.trim()) e.firstName = "First name is required";
    if (!f.lastName.trim()) e.lastName = "Last name is required";
    if (!f.company.trim()) e.company = "Company name is required";
    if (!f.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email";
    if (!f.interest) e.interest = "Please select a service";
    if (!f.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => { ev.preventDefault(); if (validate()) setSent(true); };

  if (sent) {
    return (
      <div className="vgf-card vgf-done">
        <style>{CSS}</style>
        <div className="vgf-done-in">
          <div className="vgf-done-icon">&#128760;</div>
          <h3>Transmission received</h3>
          <p>Thanks, {f.firstName || "there"} &mdash; we&apos;ll get back to you shortly.</p>
          <button className="vgf-submit" onClick={() => { setSent(false); setF({ firstName: "", lastName: "", company: "", email: "", interest: "", phone: "", message: "" }); }}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="vgf-card" onSubmit={onSubmit} noValidate>
      <style>{CSS}</style>

      <div className="vgf-head">
        <span className="vgf-eyebrow">// get in touch</span>
        <h2>Send us a <span className="vgf-sig">signal</span></h2>
        <p className="vgf-sub">Fill in the details and our team will reach out.</p>
      </div>

      <div className="vgf-grid">
        <div className="vgf-field">
          <label>First Name <span>*</span></label>
          <input className={err.firstName ? "err" : ""} value={f.firstName} onChange={set("firstName")} placeholder="Enter First Name" />
          {err.firstName && <em>{err.firstName}</em>}
        </div>
        <div className="vgf-field">
          <label>Last Name <span>*</span></label>
          <input className={err.lastName ? "err" : ""} value={f.lastName} onChange={set("lastName")} placeholder="Enter Last Name" />
          {err.lastName && <em>{err.lastName}</em>}
        </div>

        <div className="vgf-field">
          <label>Company Name <span>*</span></label>
          <input className={err.company ? "err" : ""} value={f.company} onChange={set("company")} placeholder="Enter Company Name" />
          {err.company && <em>{err.company}</em>}
        </div>
        <div className="vgf-field">
          <label>Email <span>*</span></label>
          <input className={err.email ? "err" : ""} type="email" value={f.email} onChange={set("email")} placeholder="Enter your Email" />
          {err.email && <em>{err.email}</em>}
        </div>

        <div className="vgf-field">
          <label>Your Interest <span>*</span></label>
          <select className={"vgf-select " + (err.interest ? "err" : "") + (f.interest ? "" : " placeholder")} value={f.interest} onChange={set("interest")}>
            <option value="" disabled>Select</option>
            {INTERESTS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {err.interest && <em>{err.interest}</em>}
        </div>
        <div className="vgf-field">
          <label>Phone Number <span>*</span></label>
          <input className={err.phone ? "err" : ""} value={f.phone} onChange={set("phone")} placeholder="Enter your Mobile number" />
          {err.phone && <em>{err.phone}</em>}
        </div>

        <div className="vgf-field vgf-full">
          <label>Message <span className="opt">(optional)</span></label>
          <textarea value={f.message} onChange={set("message")} placeholder="Enter your Message here.." />
        </div>
      </div>

      <div className="vgf-actions">
        <button type="submit" className="vgf-submit">Submit</button>
      </div>
    </form>
  );
}

const CSS = `
.vgf-card{ position:relative; width:min(1080px,94vw); margin:0 auto; padding:clamp(26px,4vw,54px);
  border-radius:28px; overflow:hidden; font-family:'Poppins',system-ui,sans-serif;
  background:linear-gradient(160deg, #17171b 0%, #0b0b0e 46%, #030304 100%);
  box-shadow:0 44px 100px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.05); }
/* glossy sheens (monochrome, no colour) */
.vgf-card::before{ content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none; z-index:1;
  background:linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,0) 24%); }
.vgf-card::after{ content:""; position:absolute; top:-45%; left:-25%; width:75%; height:190%; pointer-events:none; z-index:1;
  background:linear-gradient(105deg, transparent 42%, rgba(255,255,255,.05) 50%, transparent 58%); transform:rotate(9deg); }

.vgf-head{ position:relative; z-index:2; margin-bottom:26px; }
.vgf-eyebrow{ font-family:'Space Mono',ui-monospace,monospace; font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:rgba(255,255,255,.45); }
.vgf-head h2{ margin-top:10px; color:#fff; font-weight:800; letter-spacing:-.01em; line-height:1.1;
  font-size:clamp(1.5rem,3.2vw,2.3rem);
  background:linear-gradient(180deg,#ffffff,#b9b9c2); -webkit-background-clip:text; background-clip:text; }
.vgf-sub{ margin-top:8px; color:rgba(255,255,255,.55); font-size:clamp(14px,1.5vw,16px); }
.vgf-head h2 .vgf-sig{ background:none; -webkit-background-clip:border-box; background-clip:border-box;
  color:#FA9F43; -webkit-text-fill-color:#FA9F43; }

.vgf-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1fr 1fr; gap:22px 40px; }
.vgf-full{ grid-column:1 / -1; }
.vgf-field{ display:flex; flex-direction:column; }
.vgf-field label{ color:#f2f2f5; font-weight:600; font-size:clamp(15px,1.4vw,18px); margin-bottom:10px; }
.vgf-field label span{ color:rgba(255,255,255,.5); }
.vgf-field label .opt{ color:rgba(255,255,255,.4); font-weight:400; font-size:13px; }

/* glossy dark glass inputs */
.vgf-field input, .vgf-field textarea, .vgf-select{
  width:100%; border-radius:12px; padding:15px 18px; font-size:16px; color:#fff; font-family:inherit; outline:none;
  background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.12);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.07), inset 0 -2px 6px rgba(0,0,0,.45);
  transition:border-color .15s, box-shadow .15s, background .15s; }
.vgf-field input::placeholder, .vgf-field textarea::placeholder{ color:rgba(255,255,255,.38); }
.vgf-field textarea{ min-height:150px; resize:vertical; }
.vgf-select{ appearance:none; -webkit-appearance:none; cursor:pointer;
  background-image:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02)),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23bbb' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>");
  background-repeat:no-repeat,no-repeat; background-position:center, right 16px center; }
.vgf-select option{ color:#111; }
.vgf-select.placeholder{ color:rgba(255,255,255,.38); }
.vgf-field input:focus, .vgf-field textarea:focus, .vgf-select:focus{
  border-color:rgba(255,255,255,.45);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.1), 0 0 0 4px rgba(255,255,255,.06); }
.vgf-field input.err, .vgf-field textarea.err, .vgf-select.err{
  border-color:rgba(255,255,255,.7);
  box-shadow:0 0 0 4px rgba(255,255,255,.1); }
.vgf-field em{ color:rgba(255,255,255,.62); font-style:normal; font-size:13px; margin-top:6px; }
.vgf-field em::before{ content:"! "; font-weight:700; }

.vgf-actions{ position:relative; z-index:2; display:flex; justify-content:flex-end; margin-top:28px; }
/* glossy dark button */
.vgf-submit{ color:#fff; font-weight:700; font-size:16px; letter-spacing:.02em; cursor:pointer;
  border:1px solid rgba(255,255,255,.16); border-radius:12px; padding:15px 46px;
  background:linear-gradient(180deg, #2c2c33 0%, #16161a 60%, #0c0c0f 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.14), inset 0 -2px 4px rgba(0,0,0,.4), 0 12px 28px rgba(0,0,0,.55);
  transition:transform .12s, box-shadow .15s, filter .15s; }
.vgf-submit:hover{ filter:brightness(1.25); transform:translateY(-1px); }
.vgf-submit:active{ transform:translateY(0); }

.vgf-done{ text-align:center; }
.vgf-done-in{ position:relative; z-index:2; padding:34px 10px; }
.vgf-done-icon{ font-size:52px; }
.vgf-done h3{ color:#fff; font-size:26px; margin:14px 0 8px; }
.vgf-done p{ color:rgba(255,255,255,.7); margin-bottom:24px; }

@media (max-width:760px){
  .vgf-grid{ grid-template-columns:1fr; gap:18px; }
  .vgf-actions{ justify-content:stretch; }
  .vgf-submit{ width:100%; }
}
`;
