// src/components/about/MissionVision.jsx
import React from "react";
import { Rocket, Eye } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 lg:px-[120px]">
      <div
        aria-hidden
        className="sk-float-alt pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "#0037CA" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Mission & Vision"
          title="What drives us forward"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Mission — cobalt panel */}
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0037CA] to-[#0050E6] p-8 text-white shadow-2xl shadow-[#0037CA]/30 transition-transform duration-500 hover:-translate-y-1 sm:p-12">
              <div
                aria-hidden
                className="sk-float pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Rocket size={26} />
              </span>
              <p className="relative mt-7 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/90">
                Our mission
              </p>
              <h3 className="relative mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-[1.7rem]">
                Helping businesses grow through intelligent digital innovation
              </h3>
              <p className="relative mt-5 text-[16px] text-justify leading-relaxed text-white/95">
                Our mission is to offer businesses high-performance digital
                marketing services, AI-driven strategies, and conversion-focused
                digital solutions that generate measurable growth, stronger
                customer engagement, and long-term business success. At Skyup
                Digital Solutions, we help brands to scale efficiently in a
                fast-changing digital world through innovation, automation, and
                performance marketing.
              </p>
            </div>
          </Reveal>

          {/* Vision — light panel with gradient border */}
          <Reveal delay={140}>
            <div
              className="group relative h-full rounded-[1.75rem] p-[1.5px] transition-transform duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,55,202,0.35), rgba(0,163,255,0.15), rgba(0,55,202,0.05))",
              }}
            >
              <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-gradient-to-b from-white to-[#F4F7FF] p-8 sm:p-12">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0037CA]/10 text-[#0037CA]">
                  <Eye size={26} />
                </span>
                <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0037CA]">
                  Our vision
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-[1.7rem]">
                  Becoming a leading AI-powered growth agency
                </h3>
                <p className="mt-5 text-[16px] leading-relaxed text-justify text-slate-800">
                  We are on a mission to become the world’s most recognized AI
                  growth agency and the world’s most innovative digital
                  strategies with measurable ROI, scalable marketing systems,
                  and transformative business growth experiences. Our vision is
                  to enable businesses to extract a sustainable competitive
                  advantage through AI, automation, analytics, and intelligent
                  marketing ecosystems.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
