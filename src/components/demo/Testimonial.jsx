import React from "react";

// Section 06 — Testimonial (Social Proof)
// Single testimonial rendered as a large centered pull-quote, not a small card.
// `role` and `company` are joined gracefully — omit either with no stray comma.

const BRAND = "#5b8cff";
const STAR = "#F5A623";

function Star({ className = "h-5 w-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={STAR}
      className={className} aria-hidden="true">
      <path d="M12 2l2.95 6.18 6.8.77-5.04 4.6 1.36 6.7L12 17.77 5.93 20.95l1.36-6.7-5.04-4.6 6.8-.77z" />
    </svg>
  );
}

export default function Testimonial({
  rating = 5,
  quote = "Within five months we went from invisible to ranking on page one for the searches that matter. The reporting is the clearest we've ever had — we finally know exactly what we're paying for.",
  name = "Priya Nair",
  role = "Head of Marketing",
  company = "Brightline Retail",
  initials,
}) {
  const fallbackInitials =
    initials ||
    (name || "")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");

  const subline = [role, company].filter(Boolean).join(", ");

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>

        {/* Pull-quote */}
        <blockquote className="mt-7">
          <p className="text-[24px] font-semibold leading-snug tracking-tight text-white sm:text-[30px]">
            <span style={{ color: BRAND }}>“</span>
            {quote}
            <span style={{ color: BRAND }}>”</span>
          </p>
        </blockquote>

        {/* Attribution */}
        <figcaption className="mt-8 flex items-center justify-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold text-white"
            style={{ background: BRAND }}
          >
            {fallbackInitials}
          </span>
          <div className="text-left">
            <div className="text-[15px] font-bold text-white">{name}</div>
            {subline && <div className="text-[13px] text-[#8A93AC]">{subline}</div>}
          </div>
        </figcaption>
      </div>
    </section>
  );
}