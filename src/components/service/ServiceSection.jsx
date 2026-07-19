// src/components/service/ServiceSection.jsx
import React, { useState } from "react";
import {
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";

const PER_PAGE = 6;

function ServiceCard({ name, tagline, Icon, items, from, to, accent, href }) {
  const tile = { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` };
  return (
    <a
      href={href}
      className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/40"
    >
      {/* accent bar that wipes in on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accent }}
      />
      {/* soft corner glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: accent }}
      />

      {/* light tile, accent-colored icon */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
        style={{ ...tile, color: accent }}
      >
        <Icon size={26} strokeWidth={2.2} />
      </div>

      <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{tagline}</p>

      <div className="mb-4 mt-5 flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          What's included
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <ul className="space-y-2.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-2.5 text-sm text-slate-300"
          >
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accent}1A`, color: accent }}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>

      {/* view more — pinned to the bottom of every card */}
      <div
        className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold"
        style={{ color: accent }}
      >
        View more
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </a>
  );
}

export default function ServiceSection() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(SERVICES.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = SERVICES.slice(start, start + PER_PAGE);

  const go = (dir) =>
    setPage((p) => Math.min(pageCount - 1, Math.max(0, p + dir)));

  return (
    <section id="services" className="px-6 py-16 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9cc0ff] backdrop-blur">
            <Sparkles size={13} />
            Our Services
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[44px] lg:px-[150px]">
            Everything your brand needs to{" "}
            <span className="bg-gradient-to-r from-[#5b8cff] to-[#FA9F43] bg-clip-text text-transparent">
              grow online
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Each service is run by a dedicated specialist, measured against real
            outcomes, and reported transparently every fortnight — from organic
            search to AI automation.
          </p>
        </div>

        {/* cards */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <ServiceCard key={s.slug} {...s} />
          ))}
        </div>

        {/* pagination */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            disabled={page === 0}
            aria-label="Previous services"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 backdrop-blur transition-colors hover:border-[#5b8cff] hover:bg-[#5b8cff] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/[0.04] disabled:hover:text-white/80"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 bg-[#5b8cff]"
                    : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            disabled={page === pageCount - 1}
            aria-label="Next services"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 backdrop-blur transition-colors hover:border-[#5b8cff] hover:bg-[#5b8cff] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/[0.04] disabled:hover:text-white/80"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}