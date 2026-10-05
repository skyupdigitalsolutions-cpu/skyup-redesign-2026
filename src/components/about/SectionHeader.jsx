// src/components/about/SectionHeader.jsx
import React from "react";
import { Reveal } from "./animations";

/* Eyebrow pill + display heading + optional lead, with built-in reveal. */
export default function SectionHeader({ eyebrow, title, lead, align = "center" }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} max-w-3xl`}>
      {eyebrow && (
        <Reveal y={16}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0037CA]/15 bg-[#0037CA]/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0037CA]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#0037CA] opacity-60" style={{ animation: "sk-pulse-ring 1.8s ease-out infinite" }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0037CA]" />
            </span>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={90}>
        <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={180}>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-600 sm:text-base">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}