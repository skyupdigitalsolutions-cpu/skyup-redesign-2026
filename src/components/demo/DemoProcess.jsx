import React from "react";

const TITLE_BLUE = "#1C6FBF"; // section heading
const NAVY = "#1B2A6B"; // big numbers + card bottom accent
const CARD_BLUE = "linear-gradient(150deg, #1E55D6 0%, #1340B0 100%)";

function ArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Requirement gathering",
    body: "We analyze your core strengths and requirements, target audience, customer persona, and business branding and map out the requirements.",
  },
  {
    n: "02",
    title: "Competitor analysis",
    body: "The competitors are listed out and their strategies are scrutinized to understand the keywords they are targeting and the digital marketing practices executed by them.",
  },
  {
    n: "03",
    title: "Planning and executing strategy",
    body: "A blueprint of the digital marketing plan is devised including the SEO, social media marketing, and other important channels. The plans are then curated and executed.",
  },
  {
    n: "04",
    title: "Evaluate results",
    body: "After execution we monitor and get real-time reports on the results of the campaigns and data is collected for future changes and optimizations to execute better campaigns for our clientele.",
  },
];

export default function DemoProcess({
  subtitle = "",
  promo = {
    eyebrow: "HOW WE WORK",
    heading: "Nextwebi your technology partner",
    body: "Team Nextwebi assures you to provide you with the best experience for 360 digital marketing experience to enhance your business process and ensure smooth functioning.",
    cta: { label: "Learn More", href: "#" },
    image: "", // optional background photo URL
  },
  steps = STEPS,
}) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        {/* Heading */}
        <div className="flex justify-center">
          <h2 className="text-center max-w-4xl text-[30px] font-bold leading-tight tracking-tight sm:text-[40px]">
            {subtitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Promo card */}
          <div
            className="relative overflow-hidden rounded-2xl p-8 lg:p-9"
            style={{ background: CARD_BLUE }}
          >
            {promo.image && (
              <img
                src={promo.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
              />
            )}
            <div className="relative flex h-full flex-col">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/80">
                {promo.eyebrow}
              </p>
              <h3 className="mt-4 text-[26px] font-bold leading-snug text-white">
                {promo.heading}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-white/85">
                {promo.body}
              </p>
              {promo.cta && (
                <a
                  href={promo.cta.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold no-underline transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ color: TITLE_BLUE }}
                >
                  {promo.cta.label}
                  <ArrowRight />
                </a>
              )}
            </div>
          </div>
          {/* 2 x 2 step grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex flex-col rounded-sm border border-white/10 bg-white/[0.04] p-7 shadow-[0_10px_30px_-22px_rgba(11,26,59,0.45)]"
                style={{ borderBottom: `4px solid ${NAVY}` }}
              >
                <span
                  className="text-[40px] font-extrabold leading-none"
                  style={{ color: NAVY }}
                >
                  {step.n}
                </span>
                <h3 className="mt-4 text-[20px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#9BA4BD]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
