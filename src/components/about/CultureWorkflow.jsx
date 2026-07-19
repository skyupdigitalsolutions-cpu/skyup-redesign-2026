// src/components/about/CultureWorkflow.jsx
import React from "react";
import { Users2, Sparkles, Zap, HeartHandshake } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

const PILLARS = [
  {
    icon: Users2,
    title: "Collaborative environment",
    text: "We collaborate closely across strategy, design, development, and marketing, ensuring seamless implementation and uniform high quality.",
  },
  {
    icon: Sparkles,
    title: "Innovation-driven culture",
    text: "We are an AI marketing company that is constantly seeking out the latest AI technologies, automation solutions, and emerging AI marketing strategies to ride the wave of digital marketing.",
  },
  {
    icon: Zap,
    title: "Agile execution process",
    text: "A fast-moving workflow that is adaptive, helping us to test, optimize, and improve campaigns in order to get the highest possible proportions.",
  },
  {
    icon: HeartHandshake,
    title: "Client-first mindset",
    text: "All decisions are made based on client objectives, business growth goals, and long-term success. All decisions are made on client objectives, business growth goals, and long-term success outcomes.",
  },
];

export default function CultureWorkflow() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 lg:px-[120px]">
      <div
        aria-hidden
        className="sk-float pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "#0037CA" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Sticky intro column */}
          <div className="lg:sticky lg:top-28 lg:col-span-2">
            <SectionHeader
              align="left"
              eyebrow="Culture & workflow"
              title="Built Around Innovation, Speed & Collaboration"
              lead="Skyup Digital Solutions has a culture that embraces innovation, teamwork, continuous learning, and performance excellence. We believe the best way is to execute ' fast and furious ', ' strategic experimentation ', and ' always improving. '"
            />
          </div>

          {/* Pillars list */}
          <div className="space-y-5 lg:col-span-3">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group flex gap-6 rounded-[1.5rem] border border-slate-100 p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0037CA]/15 hover:shadow-xl hover:shadow-[#0037CA]/10 sm:p-8">
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0037CA]/10 p-3.5 text-[#0037CA] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0037CA] group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <span>
                    <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {text}
                    </p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}