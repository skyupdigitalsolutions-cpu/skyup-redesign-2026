// src/components/service/IndustriesWeServe.jsx
//
// INDUSTRIES WE SERVE — interactive two-panel selector (left list of
// industries, right "growth playbook" for the selected one: which SkyUp
// tools apply + what we automate). Content is mapped to our digital-marketing
// + AI-automation services. Palette matched to the service page (blue+orange);
// background stays transparent so the ServiceUniverse starfield shows through.

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Building2, HeartPulse, ShoppingBag, GraduationCap, Store, Rocket,
  Scale, Sofa, ArrowRight, CheckCircle2, Sparkles, X,
} from "lucide-react";
// Import only the icons we use — a namespace import bundles the whole ~26 MB
// simple-icons library because it can't be tree-shaken. Named imports below
// tree-shake to just these logos. Brands not shipped by simple-icons (Ahrefs,
// LinkedIn, Canva, OpenAI) are omitted and fall back to a monogram, as before.
import {
  siSemrush,
  siGoogleanalytics,
  siGoogleads,
  siMeta,
  siWhatsapp,
  siMailchimp,
  siShopify,
  siInstagram,
} from "simple-icons";

/** slug -> icon object, for the icons that exist in simple-icons. */
const ICONS = {
  semrush: siSemrush,
  googleanalytics: siGoogleanalytics,
  googleads: siGoogleads,
  meta: siMeta,
  whatsapp: siWhatsapp,
  mailchimp: siMailchimp,
  shopify: siShopify,
  instagram: siInstagram,
};

const BLUE = "#0037CA";
const BLUE_LIGHT = "#5b8cff";
const ORANGE = "#FA9F43";
const ORANGE_LIGHT = "#FFB950";

/* tool label -> simple-icons slug (mirrors OurToolkit's system) */
const SLUGS = {
  SEMrush: "semrush",
  Ahrefs: "ahrefs",
  GA4: "googleanalytics",
  "Google Ads": "googleads",
  "Meta Ads Manager": "meta",
  "Meta Business Suite": "meta",
  "LinkedIn Ads": "linkedin",
  WhatsApp: "whatsapp",
  Mailchimp: "mailchimp",
  Canva: "canva",
  OpenAI: "openai",
  Shopify: "shopify",
  Instagram: "instagram",
};

function iconFor(name) {
  const slug = SLUGS[name];
  if (!slug) return null;
  return ICONS[slug] || null;
}
function monogram(name) {
  const w = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);
  return (w.length === 1 ? w[0].slice(0, 2) : w[0][0] + w[1][0]).toUpperCase();
}

/* ── industry playbooks ─────────────────────────────────────────────── */
const INDUSTRIES = [
  {
    key: "real-estate",
    name: "Real Estate",
    icon: Building2,
    tags: ["Meta Ads", "SEO", "WhatsApp AI"],
    headline: "Fill your pipeline with buyers ready to visit",
    tools: [
      { name: "Meta Ads Manager", role: "Local buyer lead-gen" },
      { name: "WhatsApp", role: "Instant AI lead follow-up" },
      { name: "SEMrush", role: "Locality SEO & rankings" },
    ],
    autopilot: [
      "New enquiries get an instant WhatsApp reply with qualifying questions, 24/7",
      "Site-visit bookings pushed straight to your sales team",
      "Locality landing pages that rank for '2BHK in <area>' searches",
      "Weekly report on cost-per-lead and best-performing listings",
    ],
  },
  {
    key: "healthcare",
    name: "Healthcare & Clinics",
    icon: HeartPulse,
    tags: ["Local SEO", "Google Ads", "Reminders AI"],
    headline: "Turn local searches into booked appointments",
    tools: [
      { name: "Google Ads", role: "Appointment campaigns" },
      { name: "GA4", role: "Track booking conversions" },
      { name: "WhatsApp", role: "Reminders & re-booking" },
    ],
    autopilot: [
      "Missed-call and enquiry auto-replies that book slots on WhatsApp",
      "Appointment reminders and follow-ups sent automatically to cut no-shows",
      "Google Business profile tuned so you show up in 'near me' searches",
      "New-review requests triggered after each visit",
    ],
  },
  {
    key: "ecommerce",
    name: "E-commerce & D2C",
    icon: ShoppingBag,
    tags: ["Performance", "Retention", "Feed SEO"],
    headline: "Lower CAC and higher repeat rate — on autopilot",
    tools: [
      { name: "Meta Ads Manager", role: "ROAS-focused campaigns" },
      { name: "Shopify", role: "Store & catalog" },
      { name: "Mailchimp", role: "Retention flows" },
    ],
    autopilot: [
      "Abandoned-cart and win-back flows across email + WhatsApp",
      "Product feed and catalog kept optimised for Shopping ads",
      "Daily ROAS dashboard with budget shifted to winning creatives",
      "AI-generated product copy and ad variations at scale",
    ],
  },
  {
    key: "education",
    name: "Education & EdTech",
    icon: GraduationCap,
    tags: ["Lead-gen", "SEO", "Nurture AI"],
    headline: "More qualified admissions, less manual chasing",
    tools: [
      { name: "Meta Ads Manager", role: "Admission lead-gen" },
      { name: "Google Ads", role: "Course search intent" },
      { name: "WhatsApp", role: "Counsellor auto-replies" },
    ],
    autopilot: [
      "Enquiry forms trigger instant WhatsApp + email nurture sequences",
      "AI qualifies leads and routes hot ones to counsellors",
      "Course pages built to rank for 'best <course> in Bangalore'",
      "Reminders for incomplete or dropped-off applications",
    ],
  },
  {
    key: "local",
    name: "Local Businesses",
    icon: Store,
    tags: ["Local SEO", "Social", "Reviews AI"],
    headline: "Own your neighbourhood's 'near me' searches",
    tools: [
      { name: "Canva", role: "On-brand social content" },
      { name: "Meta Business Suite", role: "Scheduling & DMs" },
      { name: "WhatsApp", role: "Bookings & offers" },
    ],
    autopilot: [
      "Google Business profile and local pages tuned for 'near me' results",
      "Auto-replies to DMs and WhatsApp with menus, offers and bookings",
      "Review requests and reputation monitoring on autopilot",
      "Weekly social content calendar planned and scheduled",
    ],
  },
  {
    key: "startups",
    name: "Startups & SaaS",
    icon: Rocket,
    tags: ["SEO", "Content AI", "Analytics"],
    headline: "A demand engine that compounds every month",
    tools: [
      { name: "SEMrush", role: "Keyword & content strategy" },
      { name: "GA4", role: "Funnel & activation" },
      { name: "OpenAI", role: "Content & ops automation" },
    ],
    autopilot: [
      "SEO content clusters planned, drafted and tracked to rankings",
      "Product analytics wired to real activation and retention metrics",
      "Lead scoring and CRM sync so sales only touches warm leads",
      "LinkedIn founder-voice posting and warm outbound",
    ],
  },
  {
    key: "professional",
    name: "Professional Services",
    icon: Scale,
    tags: ["SEO", "LinkedIn", "Intake AI"],
    headline: "Look credible, get found, never miss an enquiry",
    tools: [
      { name: "SEMrush", role: "Authority SEO" },
      { name: "LinkedIn Ads", role: "Targeted outreach" },
      { name: "WhatsApp", role: "Client intake auto-replies" },
    ],
    autopilot: [
      "New-client intake answered instantly and booked to your calendar",
      "Authority content and service pages that rank for your practice areas",
      "Prospect research pulled before every intro call",
      "Monthly reporting your partners can read in one glance",
    ],
  },
  {
    key: "interiors",
    name: "Interior Design & Home",
    icon: Sofa,
    tags: ["Meta Ads", "WhatsApp AI", "Portfolio SEO"],
    headline: "Turn scrollers into consultation bookings",
    tools: [
      { name: "Meta Ads Manager", role: "Portfolio lead-gen" },
      { name: "Instagram", role: "Portfolio growth" },
      { name: "WhatsApp", role: "Instant enquiry replies" },
    ],
    autopilot: [
      "Meta and Instagram campaigns that drive consultation enquiries",
      "Enquiries auto-answered on WhatsApp with portfolio and pricing brackets",
      "Project-type landing pages that rank locally",
      "Follow-up nudges so no lead goes cold",
    ],
  },
];

function ToolLogo({ name }) {
  const icon = iconFor(name);
  return (
    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-white/20">
      {icon ? (
        <svg role="img" aria-label={name} viewBox="0 0 24 24" width="19" height="19" fill={`#${icon.hex}`}>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="text-[11px] font-bold leading-none" style={{ color: BLUE }}>{monogram(name)}</span>
      )}
    </span>
  );
}

function PlaybookInner({ ind }) {
  return (
    <>
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: BLUE_LIGHT }}>
        {ind.name} — Growth playbook
      </span>
      <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl" style={{ fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.01em" }}>
        {ind.headline}
      </h3>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* tools we use */}
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Tools we use
          </p>
          <div className="flex flex-col gap-3">
            {ind.tools.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ToolLogo name={t.name} />
                <span className="min-w-0">
                  <span className="block truncate font-bold text-white text-[15px]">{t.name}</span>
                  <span className="block truncate text-[12.5px] text-slate-400">{t.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* what we automate / deliver */}
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            What runs on autopilot
          </p>
          <ul className="flex flex-col gap-3.5">
            {ind.autopilot.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CheckCircle2 size={18} strokeWidth={2.2} className="mt-0.5 flex-shrink-0" style={{ color: BLUE_LIGHT }} />
                <span className="text-[14px] leading-snug text-slate-200">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-9 flex flex-wrap gap-3">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#04050C] transition-transform hover:-translate-y-0.5"
          style={{ background: `linear-gradient(90deg, ${ORANGE_LIGHT}, ${ORANGE})`, boxShadow: `0 12px 30px -10px ${ORANGE}88` }}
        >
          Build this for my {ind.name.split(" ")[0].toLowerCase()}
          <ArrowRight size={16} strokeWidth={2.4} />
        </a>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Talk to us
        </a>
      </div>
    </>
  );
}

export default function IndustriesWeServe() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false); // mobile: playbook modal
  const ind = INDUSTRIES[active];

  // Freeze the page in place while the modal is open, then restore the exact scroll
  // position on close. (overflow:hidden alone doesn't hold on mobile — touch still
  // scrolls the body behind the modal and the page ends up scrolled when you close it.)
  useEffect(() => {
    if (!open) return;
    // Safety net: never lock scroll on desktop.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
    ) {
      setOpen(false);
      return;
    }

    // Push a history entry so the mobile back button closes the modal
    // instead of navigating away from the page.
    history.pushState({ industryModal: true }, "");

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    // Back button on mobile fires popstate — close the modal instead of leaving the page.
    const onPop = (e) => { setOpen(false); };

    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      // If the modal was closed by X button or backdrop (not back button),
      // pop the history entry we pushed so the browser history stays clean.
      if (history.state?.industryModal) history.back();
    };
  }, [open]);

  return (
    <section className="px-6 py-16 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur"
            style={{ color: BLUE_LIGHT }}
          >
            <Sparkles size={13} />
            Industries we serve
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px]">
            Growth playbooks for{" "}
            <span className="bg-gradient-to-r from-[#5b8cff] to-[#FA9F43] bg-clip-text text-transparent">
              every industry
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Pick your industry to see the exact digital-marketing and AI-automation
            stack we'd run for you.
          </p>
        </div>

        {/* two-panel selector */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          {/* LEFT — industry list */}
          <div className="flex flex-col gap-3">
            {INDUSTRIES.map((it, i) => {
              const Icon = it.icon;
              const on = i === active;
              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    // The playbook modal is mobile-only (lg:hidden) and it freezes
                    // body scroll while open. On desktop the playbook already shows
                    // inline on the right, so only open the modal below the lg
                    // breakpoint — otherwise desktop clicks lock scrolling with no
                    // visible modal to close.
                    if (
                      typeof window !== "undefined" &&
                      window.matchMedia("(max-width: 1023px)").matches
                    ) {
                      setOpen(true);
                    }
                  }}
                  aria-pressed={on}
                  className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-200"
                  style={{
                    background: on ? "rgba(250,159,67,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${on ? "rgba(250,159,67,0.55)" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: on ? `0 0 26px -6px ${ORANGE}66` : "none",
                  }}
                >
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: on ? `${ORANGE}1F` : `${BLUE}22`,
                      color: on ? ORANGE : BLUE_LIGHT,
                      border: `1px solid ${on ? `${ORANGE}55` : `${BLUE}55`}`,
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-white" style={{ fontFamily: "'Poppins',sans-serif" }}>
                      {it.name}
                    </span>
                    <span className="mt-0.5 flex flex-wrap gap-x-3 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: on ? ORANGE_LIGHT : "rgba(255,255,255,0.4)" }}>
                      {it.tags.map((t) => <span key={t}>{t}</span>)}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: on ? ORANGE : "rgba(255,255,255,0.35)" }}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT — playbook (inline on desktop only) */}
          <div
            className="hidden lg:block relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <PlaybookInner ind={ind} />
          </div>
        </div>

        {/* MOBILE — playbook opens as a dismissable modal */}
        {open && typeof document !== "undefined" && createPortal(
          <div className="lg:hidden fixed inset-0 z-[999] flex items-end justify-center sm:items-center">
            <div
              className="absolute inset-0"
              style={{ background: "rgba(2,3,10,0.72)", backdropFilter: "blur(2px)" }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              className="relative w-full max-w-lg max-h-[88vh] rounded-t-3xl sm:rounded-3xl p-6 pb-10 sm:p-8"
              style={{
                background: "linear-gradient(180deg, #0c1020, #05070f)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 -20px 60px -20px rgba(0,0,0,0.8)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch", // momentum scroll on iOS
                overscrollBehavior: "contain",    // keep the scroll gesture inside the modal
                touchAction: "pan-y",             // allow vertical touch scroll on the panel
              }}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <X size={18} strokeWidth={2.4} />
              </button>
              <PlaybookInner ind={ind} />
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
