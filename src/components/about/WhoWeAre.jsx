// src/components/about/WhoWeAre.jsx
import React from "react";
import { Users, Target, Layers, LineChart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

export default function WhoWeAre() {
  return (
    <section className="bg-blue-50/50 px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Who we are"
          title="A friendly team with big ambitions for your brand"
        />

        {/* Bento grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Large card — spans 2 cols */}
          <Reveal className="lg:col-span-2">
            <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#0037CA]/10 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0037CA] opacity-[0.05] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.1]"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0037CA]/10 text-[#0037CA]">
                <Users size={22} />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                An AI-powered growth agency with a performance-centric mindset
              </h3>
              <p className="mt-4 text-[15px] text-justify leading-relaxed text-slate-600">
                Skyup Digital Solutions is an AI-powered growth agency with a
                performance-centric mindset dedicated to assisting companies in
                transforming their digital marketing approach for growth. We are
                a group of marketers, developers, designers, strategists, and
                growth specialists dedicated to providing high-quality digital
                marketing services with measurable business results.
              </p>
            </div>
          </Reveal>

          {/* Tall accent card */}
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-[#0037CA] p-8 text-white shadow-xl shadow-[#0037CA]/25 sm:p-10">
              <div
                aria-hidden
                className="sk-float pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Layers size={22} />
              </span>
              <h3 className="mt-6 text-xl font-bold leading-snug">
                More than ads or websites
              </h3>
              <p className="mt-4 text-[15px] text-justify leading-relaxed text-blue-100">
                At a modern digital marketing agency, we know that businesses
                today need more than just advertisements or websites. They want
                systems that scale, smart marketing, data-driven decisions, and
                digital experiences that convert visitors to customers.
              </p>
            </div>
          </Reveal>

          {/* Bottom row */}
          <Reveal delay={80}>
            <div className="group h-full rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0037CA]/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0037CA]/10 text-[#0037CA] transition-colors duration-300 group-hover:bg-[#0037CA] group-hover:text-white">
                <Target size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-neutral-900">
                The way we build growth
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-justify text-slate-600">
                Over the years we have worked with businesses across many
                industries to help improve visibility, generate leads, increase
                conversions, and strengthen their digital presence.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-2">
            <div className="group h-full rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0037CA]/10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0037CA]/10 text-[#0037CA] transition-colors duration-300 group-hover:bg-[#0037CA] group-hover:text-white">
                <LineChart size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-neutral-900">
                The Way We Build Growth 
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-justify text-slate-600">
                Here at Skyup Digital Solutions, we know that growth happens
                when creativity meets strategy and technology meets execution;
                all campaigns, websites, automation workflows, and marketing
                strategies are built for one reason: to drive real business
                impact. We don’t believe in one-size-fits-all marketing
                solutions. We love building growth systems that are data-driven,
                research-informed, customer behavior-based, and
                performance-driven.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
