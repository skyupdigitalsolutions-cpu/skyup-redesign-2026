"use client";

import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

const BLUE = "#2E6BFF", ORANGE = "#FF7A1A", ORANGE_L = "#FFB066";

/* Default content — used when the matching prop isn't passed. */
export const DEFAULT_FAQS = [
  { q: "Why is my website getting traffic but not generating leads?", a: "This usually happens when the website lacks conversion-focused design, clear messaging, strong CTAs, or a proper user experience strategy." },
  { q: "How long does SEO take to show results?", a: "SEO performance depends on your industry, competition, and website condition, but most businesses begin seeing measurable improvements within 3 to 6 months." },
  { q: "Why are my Google Ads not generating quality leads?", a: "Poor audience targeting, weak landing pages, incorrect keywords, and unoptimized campaigns often lead to low-quality leads and wasted ad spend." },
  { q: "Why should businesses invest in PPC advertising?", a: "PPC helps businesses generate fast, targeted traffic, quality leads, and measurable ROI through paid ads." },
  { q: "Why is my business not ranking on Google locally?", a: "Your business may lack local SEO optimization, Google Business Profile optimization, location-based content, or consistent online signals." },
  { q: "How can marketing automation save time for my business?", a: "Automation streamlines repetitive tasks like lead follow-ups, email campaigns, CRM updates, and customer communication." },
  { q: "Can AI automation improve customer response time?", a: "Yes. AI-powered systems can automate responses, qualify leads instantly, and improve customer communication efficiency." },
  { q: "What does UI/UX design do for a business website?", a: "UI/UX design improves user experience, increases engagement, and helps convert more visitors into customers." },
  { q: "Do you handle video editing for social media and ads?", a: "Yes. We edit reels, ad creative, motion graphics, and short-form and YouTube content — the editing side, built to match your campaigns." },
  { q: "How do I know if my digital marketing campaigns are actually working?", a: "Tracking metrics like leads, conversions, ROI, traffic quality, and customer acquisition costs helps measure campaign performance effectively." },
];

export default function FaqSection({
  title = "Questions Businesses Often Ask Us",
  faqs = DEFAULT_FAQS,
  visibleCount = 5,
  defaultOpenIndex = 0,
}) {
  const [open, setOpen] = useState(defaultOpenIndex);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, visibleCount);
  const hidden = faqs.length - visibleCount;

  return (
    <section className="relative w-full overflow-hidden px-6 py-20 lg:px-[120px] lg:py-24" style={{ background: "#06070D" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(45% 40% at 20% 0%, ${BLUE}14, transparent 70%), radial-gradient(40% 45% at 95% 100%, ${ORANGE}10, transparent 72%)` }} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-10 lg:flex-row lg:gap-20">
        {/* header */}
        <div className="w-full flex-shrink-0 lg:max-w-md">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em]" style={{ color: ORANGE_L }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}` }} /> FAQ
          </span>
          <h2 className="mt-4 font-bold leading-[1.12] text-white" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.9rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-white/50" style={{ fontFamily: "'Poppins',sans-serif", lineHeight: 1.6 }}>
            Straight answers on SEO, paid ads, automation, and growth. Don&rsquo;t see yours? Just ask.
          </p>
        </div>

        {/* accordion */}
        <div className="w-full space-y-3.5" style={{ fontFamily: "'Poppins',sans-serif" }}>
          {visibleFaqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} onMouseEnter={() => setOpen(i)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                  background: "linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015))",
                  borderColor: isOpen ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.09)",
                  boxShadow: isOpen ? `0 22px 50px -26px ${ORANGE}66` : "none",
                }}>
                <span className="absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-300"
                  style={{ background: `linear-gradient(${ORANGE}, ${BLUE})`, transform: `scaleY(${isOpen ? 1 : 0})` }} />

                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} onFocus={() => setOpen(i)} aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-xl text-sm font-bold transition-all duration-300"
                    style={isOpen ? { background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_L})`, color: "#fff" } : { background: "rgba(46,107,255,.15)", color: "#9DBBFF" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold sm:text-base" style={{ color: isOpen ? ORANGE_L : "#fff" }}>{f.q}</span>
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full transition-all duration-300"
                    style={{ background: isOpen ? ORANGE : "rgba(255,255,255,.08)", color: isOpen ? "#fff" : "rgba(255,255,255,.6)", transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <Plus size={16} strokeWidth={2.4} />
                  </span>
                </button>

                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pl-[68px] pr-6 text-sm leading-relaxed text-white/55 sm:pb-6">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {hidden > 0 && (
            <div className="mt-9 flex justify-center lg:justify-start">
              <button type="button"
                onClick={() => { setShowAll((v) => !v); if (showAll) setOpen((o) => (o >= visibleCount ? 0 : o)); }}
                className="group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold text-white/85 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,.18)" }}>
                {showAll ? "Show less" : `View ${hidden} more questions`}
                <ChevronDown size={17} strokeWidth={2.4} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
