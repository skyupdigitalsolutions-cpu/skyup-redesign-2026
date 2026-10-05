import React from "react";

const CHECK = "#2F6FE0";
const TITLE_GRADIENT = "linear-gradient(90deg, #0037CA 0%, #3f72ff 80%)";
const DIVIDER_GRADIENT =
  "linear-gradient(180deg, #15275F 0%, #2E7BD0 55%, rgba(46,123,208,0) 100%)";

function Check({ className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={CHECK}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

const PARAGRAPHS = [
  "Nextwebi, a reputable web development company develops websites that are cost-effective, search engine optimized, interactive UI, and conversion-friendly. In today's hyper-competitive environment, standing out and impressing customers is critical for every business to succeed. Make a statement about your brand by utilizing the power of unique design. We help you reinvent and meet your technical goals with our domain knowledge and professional team of developers.",
  "We understand that visual appeal alone is not enough. Our design philosophy is rooted in functionality, clarity, and usability. As a trusted website design and development company, we collaborate closely with our clients to incorporate their vision while enhancing usability and accessibility. From color palettes and typography to iconography and layout, our designs are carefully crafted to create lasting impressions and drive conversions.",
];

const FEATURES = [
  "Agile web development with advanced technologies",
  "Browser compatibility with robust architecture",
  "Can be upgraded at any time with new features",
  "Better ROI adaptation to business process",
  "Robust information architecture and navigation flow",
  "Diverse industry experience and domain expertise",
  "Constant innovation and integrated approach",
  "Customer-centric and agile web development",
];

export default function FeaturesSplit({
  title = "Unique Website Development Service Features",
  paragraphs = PARAGRAPHS,
  features = FEATURES,
}) {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Gradient title */}
        <h2
          className="bg-clip-text text-center text-[30px] font-bold tracking-tight sm:text-[42px]"
   
        >
          {title}
        </h2>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-14">
          {/* Left: paragraphs */}
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div
            className="hidden self-stretch rounded-full 2px lg:block"
            style={{ background: DIVIDER_GRADIENT }}
            aria-hidden="true"
          />

          {/* Right: checklist */}
          <ul className="space-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0">
                  <Check />
                </span>
                <span className="text-[16px] leading-snug text-slate-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}