// src/components/about/CoreValues.jsx
import React from "react";
import {
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  Palette,
  ClipboardCheck,
  Handshake,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    text: "We take the principles of honesty, communication, and reporting to explain whether partnerships are working successfully and take them as a core element of how we work. Your investment is ALWAYS followed from point A to point B, with campaign performance always visible to us.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "The world of digital marketing is constantly changing, and so are we. We are a digitally forward agency and are continually leveraging AI, automation, and new technology to generate smarter outcomes.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    text: "All of our work is results-oriented. We want to cover all aspects of online visibility, profits, and sustainable business development from lead generation to conversion rate optimization.",
  },
  {
    icon: Palette,
    title: "Creativity",
    text: "They're a strategy coupled with creative execution that forges a memorable digital experience that gets noticed and drives action.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability",
    text: "We own our work, our play, and the success of our clients. Each strategy is based on analysis, ongoing review, and optimization.",
  },
  {
    icon: Handshake,
    title: "Long-term partnerships",
    text: "There are no shortcuts to making money. We want to grow with you and be a trusted, long-term business partner in helping your businesses grow, grow, and succeed again and again.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-blue-50/50 px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Core values"
          title="The principles behind every project"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 110}>
              <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0037CA]/10">
                {/* gradient top edge appears on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0037CA] to-[#00A3FF] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0037CA]/10 text-[#0037CA] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0037CA] group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-neutral-900">
                  {title}
                </h3>
                <p className="mt-2.5 text-[15px] text-justify leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
