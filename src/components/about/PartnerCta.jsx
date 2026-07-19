// src/components/about/PartnerCta.jsx
import React from "react";
import { ArrowRight } from "lucide-react";

export default function PartnerCta() {
  return (
    <section className="bg-blue-50/50 px-6 py-20 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0037CA] px-8 py-14 text-center shadow-2xl shadow-[#0037CA]/30 sm:px-14">
          {/* ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"
          />

          <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
            Partner with Skyup Digital Solutions
          </p>
          <h2 className="relative mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
            Your growth-focused digital marketing partner
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-blue-100">
            Whether you want to increase your visibility online, get qualified
            leads, build a converting website, or use AI to help your business
            grow — we combine strategy, creativity, technology, and performance
            marketing to grow businesses smarter, faster, and more efficiently.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0037CA] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start your growth journey
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="/service"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore our services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}