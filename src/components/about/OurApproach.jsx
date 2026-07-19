// src/components/about/OurApproach.jsx
import React from "react";
import { Search, BarChart3, Cpu, Filter } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

const STEPS = [
  {
    icon: Search,
    title: "Research-first strategy",
    text: "All winning campaigns begin with thorough research. Before developing any strategy, we will first study your market, customer behavior, your competition, the journey that your customers are going through, and your business objectives. This enables us to plan dedicated campaigns that are relevant to what the real business goals are.",
  },
  {
    icon: BarChart3,
    title: "Data-driven decisions",
    text: "We’re a results-oriented digital marketing firm. That means we use analytics, insight into user behavior, conversion tracking, and performance metrics to guide all of our marketing strategies. Campaign performance is always monitored for growth areas and ROAS improvements.",
  },
  {
    icon: Cpu,
    title: "AI-assisted optimization",
    text: "We leverage AI and automation tools and systems to improve efficiency, targeting, personalization, campaign optimization and lead nurturing It allows companies to scale faster but still be able to run efficiently and accurately in marketing.",
  },
  {
    icon: Filter,
    title: "Full-funnel growth",
    text: "Our approach covers the entire customer journey: from awareness to lead to conversion, retention, and loyalty. We have a 360-degree approach to growth. Businesses can shoot and get to the right audience, convert visitors, and get them for future business.",
  },
];

/* per-card styling that alternates like the reference: brand → light → dark → light */
const STYLES = [
  {
    card: "bg-[#0037CA] text-white",
    title: "text-white",
    body: "text-blue-100/90",
    useNumber: true,
  },
  {
    card: "bg-indigo-50",
    title: "text-neutral-900",
    body: "text-slate-600",
    iconWrap: "bg-[#0037CA]/10 text-[#0037CA]",
  },
  {
    card: "bg-slate-900 text-white",
    title: "text-white",
    body: "text-slate-300",
    iconWrap: "bg-white/10 text-white",
  },
  {
    card: "bg-indigo-50",
    title: "text-neutral-900",
    body: "text-slate-600",
    iconWrap: "bg-amber-200/70 text-amber-600",
  },
];

export default function OurApproach() {
  return (
    <section className="bg-blue-50/50 px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our approach"
          title="How we turn strategy into growth"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => {
            const s = STYLES[i];
            return (
              <Reveal key={title} delay={i * 120}>
                <article
                  className={`flex h-full flex-col rounded-3xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${s.card}`}
                >
                  {/* top: big serif number on the feature card, icon tile on the rest */}
                  {s.useNumber ? (
                    <span className="font-serif text-6xl font-bold leading-none tracking-tight">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconWrap}`}
                    >
                      <Icon size={22} />
                    </span>
                  )}

                  <h3
                    className={`mt-6 font-serif text-2xl font-bold tracking-tight ${s.title}`}
                  >
                    {title}
                  </h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${s.body}`}>
                    {text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}