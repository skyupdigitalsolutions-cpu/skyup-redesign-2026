// src/components/about/AboutFaq.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./animations";

const FAQS = [
  {
    q: "What is Skyup Digital Solutions?",
    a: "Skyup Digital Solutions is a modern AI-powered digital marketing agency and marketing and web development company that helps businesses improve online visibility, generate qualified leads, increase conversions, and achieve long-term business growth through strategic digital marketing services.",
  },
  {
    q: "What services does Skyup Digital Solutions offer?",
    a: "Skyup Digital Solutions offers complete digital marketing services including SEO services, Google Ads management, PPC advertising, social media marketing, web development, UI/UX design, graphic design, email marketing, AI-powered automation, machine learning solutions, branding, and conversion-focused growth strategies.",
  },
  {
    q: "Why should I choose Skyup Digital Solutions as my digital marketing agency?",
    a: "Skyup Digital Solutions combines data-driven marketing, AI-powered automation, creative strategy, and performance-focused execution to help businesses achieve measurable growth. Unlike traditional agencies, we focus on transparency, ROI, lead quality, and long-term digital success.",
  },
  {
    q: "How does an AI-powered growth agency help businesses grow?",
    a: "An AI-powered growth agency uses automation, analytics, customer behavior insights, and intelligent optimization strategies to improve marketing performance, audience targeting, lead generation, and business scalability while reducing wasted marketing spend.",
  },
  {
    q: "Do you provide SEO services for businesses?",
    a: "Yes. Our SEO services help businesses improve search engine rankings, organic traffic, local visibility, website authority, and lead generation through technical SEO, keyword optimization, content strategy, and performance tracking.",
  },
  {
    q: "Do you provide Google Ads and PPC advertising services?",
    a: "Yes. We create and manage Google Ads and PPC advertising campaigns designed to generate high-quality leads, increase website traffic, improve conversions, and maximize advertising ROI through strategic audience targeting and campaign optimization.",
  },
  {
    q: "Do you offer social media marketing services?",
    a: "Yes. Our social media marketing services help businesses build brand awareness, improve engagement, reach targeted audiences, and generate leads across platforms like Facebook, Instagram, LinkedIn, and other social channels.",
  },
  {
    q: "Do you provide website design and web development services?",
    a: "Yes. As a marketing and web development company, we design and develop responsive, SEO-friendly, fast-loading, and conversion-focused websites tailored to business goals and customer experience.",
  },
  {
    q: "Do you provide AI automation and machine learning solutions?",
    a: "Yes. We provide AI-powered automation and machine learning solutions that help businesses streamline marketing workflows, automate lead nurturing, improve customer communication, optimize campaign performance, and increase operational efficiency.",
  },
  {
    q: "How can I get started with Skyup Digital Solutions?",
    a: "You can get started by contacting Skyup Digital Solutions through our website inquiry form or consultation channels to discuss your business goals, digital marketing requirements, and growth opportunities with our team.",
  },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        open
          ? "border-[#0037CA]/25 bg-gradient-to-b from-[#F4F7FF] to-white shadow-lg shadow-[#0037CA]/[0.07]"
          : "border-slate-100 bg-white hover:border-[#0037CA]/20 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
      >
        <span className="text-[15px] font-semibold text-neutral-900 sm:text-base">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open
              ? "rotate-45 bg-[#0037CA] text-white shadow-lg shadow-[#0037CA]/30"
              : "bg-[#0037CA]/10 text-[#0037CA]"
          }`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600 sm:px-7">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-6 py-24 lg:px-[120px]">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-12 space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 5) * 60}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}