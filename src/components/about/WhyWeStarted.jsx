// src/components/about/WhyWeStarted.jsx
import React from "react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

export default function WhyWeStarted() {
  return (
    <section className="bg-white px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Story copy */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Why we started"
              title="Building a Smarter, More Transparent Marketing Experience"
            />
            <Reveal delay={120}>
              <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>
                  Skyup Digital Solutions was born with a simple mission—to
                  solve the ever-growing problem of ineffective digital
                  marketing.
                </p>
                <p>
                  A lot of companies were spending big dollars in marketing
                  without knowing what was really driving results. Poor
                  communication, cookie-cutter strategies, ineffective ad spend,
                  and websites that did not convert visitors to customers.
                </p>
                <p className="text-base font-semibold text-neutral-900">
                  We saw an opportunity to do things differently.
                </p>
                <p>
                  Rather than providing disjointed marketing services, we
                  created a growth-focused marketing and web development company
                  that brings together strategy, AI-driven insights, performance
                  marketing, automation, and contemporary web experiences — all
                  in one place.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Dark cinematic quote panel */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0A1033] p-8 shadow-2xl shadow-[#0A1033]/30 sm:p-12">
              <div
                aria-hidden
                className="sk-float pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #0037CA, transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="sk-float-alt pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #00A3FF, transparent 70%)",
                }}
              />

              <span className="relative block text-7xl font-bold leading-none text-[#00A3FF]/30">
                "
              </span>
              <p className="relative mt-2 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                We never set out to just run ads or build websites. We set out
                to help businesses grow with{" "}
                <span className="sk-gradient-text">
                  clarity, confidence, and measurable strategy.
                </span>
              </p>
              <p className="relative mt-7 text-[15px] leading-relaxed text-slate-300">
                Today, Skyup Digital Solutions guides companies through their
                digital transformation with smarter marketing, better
                technology, and performance-driven execution.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
