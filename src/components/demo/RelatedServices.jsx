import React from "react";

// Section 09 — Related Services (Cross-sell)
// Lightweight 3-card strip. Visual weight kept low so it doesn't compete with the CTA.

const BRAND = "#5b8cff";
const HEADING_NAVY = "#1B2440";

function ArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const SERVICES = [
  {
    name: "Content & Graphic Design",
    benefit: "On-brand content and visuals that turn rankings into engagement.",
    href: "/service/design",
  },
  {
    name: "Web Development",
    benefit: "Fast, SEO-ready websites built to convert the traffic we send you.",
    href: "/service/web-development",
  },
  {
    name: "Performance Marketing",
    benefit: "Paid campaigns that complement your organic growth for faster wins.",
    href: "/service/performance-marketing",
  },
];

export default function RelatedServices({
  title = "Explore related services",
  services = SERVICES,
}) {
  return (
    <section className="pb-16 pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="text-[20px] font-bold tracking-tight sm:text-[24px]"
          style={{ color: HEADING_NAVY }}
        >
          {title}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {services.map(({ name, benefit, href }) => (
            <a
              key={name}
              href={href}
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 no-underline transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <div>
                <div className="text-[15px] font-bold text-white">{name}</div>
                <p className="mt-1 text-[13px] leading-snug text-[#8A93AC]">{benefit}</p>
              </div>
              <span
                className="shrink-0 transition-transform group-hover:translate-x-1"
                style={{ color: BRAND }}
              >
                <ArrowRight />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}