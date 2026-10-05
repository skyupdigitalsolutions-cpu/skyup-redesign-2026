// src/components/about/ClientsAndTestimonials.jsx
import React from "react";
import { Star } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal, Marquee } from "./animations";

/* Replace with real client logos: { name, src } */
const CLIENTS = [
  { name: "Client One", src: "" },
  { name: "Client Two", src: "" },
  { name: "Client Three", src: "" },
  { name: "Client Four", src: "" },
  { name: "Client Five", src: "" },
  { name: "Client Six", src: "" },
  { name: "Client Seven", src: "" },
  { name: "Client Eight", src: "" },
];

/* Replace with real testimonials */
const TESTIMONIALS = [
  {
    quote:
      "Skyup transformed our online presence. Leads went up and, more importantly, so did revenue.",
    name: "Client Name",
    role: "Founder, Company",
  },
  {
    quote:
      "Transparent reporting and real results. We finally know exactly where our marketing budget goes.",
    name: "Client Name",
    role: "Marketing Head, Company",
  },
  {
    quote:
      "The AI automation they set up saves our team hours every single week.",
    name: "Client Name",
    role: "CEO, Company",
  },
];

export default function ClientsAndTestimonials() {
  return (
    <section className="bg-blue-50/50 px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our clients"
          title="Businesses we've helped grow digitally"
        />

        {/* Infinite logo marquee with edge fade */}
        <Reveal delay={120}>
          <div
            className="relative mt-12"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <Marquee speed={36}>
              {CLIENTS.map((c) => (
                <div
                  key={c.name}
                  className="mx-3 flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 shadow-sm grayscale transition-all duration-300 hover:grayscale-0"
                >
                  {c.src ? (
                    <img src={c.src} alt={c.name} className="max-h-10 w-auto" />
                  ) : (
                    <span className="text-sm font-semibold text-slate-400">
                      {c.name}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </Reveal>

        {/* Testimonials */}
        <div className="mt-24">
          <SectionHeader eyebrow="Testimonials" title="Voices of our clients" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.quote} delay={i * 130}>
                <figure className="group flex h-full flex-col rounded-[1.5rem] border border-slate-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0037CA]/10">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0037CA]/10 text-sm font-bold text-[#0037CA]">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}