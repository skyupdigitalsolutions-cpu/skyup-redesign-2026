import React from "react";

// Section 02 — Pain Point Block (Empathy)
// Dark cosmic theme: translucent cards on the #04050C background, white titles,
// muted slate body, amber accent icons — matches the rest of the service pages.

/* ── Icons ─────────────────────────────────────────────────────────── */
function EyeOffIcon({ className = "h-6 w-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
function MazeIcon({ className = "h-6 w-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M3 3h18v18H3z" />
      <path d="M7 3v10h6" />
      <path d="M11 7v6h6" />
      <path d="M7 17h4" />
    </svg>
  );
}
function ChartUnclearIcon({ className = "h-6 w-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M7 16l3-3 3 2 4-5" strokeDasharray="3 3" />
      <circle cx="18" cy="6" r="2.5" />
    </svg>
  );
}
function LockIcon({ className = "h-6 w-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const PAINS = [
  {
    icon: EyeOffIcon,
    title: "Not visible on Google",
    body: "If you're not on Google's first page, you're invisible to 90% of searchers. Smart companies invest in SEO to get discovered where their customers are already looking.",
  },
  {
    icon: MazeIcon,
    title: "Content That Goes Nowhere",
    body: "Blogs built without SEO keyword research, a bad structure, or a weak technical SEO foundation.",
  },
  {
    icon: ChartUnclearIcon,
    title: "No Reporting, No Clarity",
    body: "You don’t know what’s working. Old agency reports were extremely difficult. We make each SEO audit report simple, so you always know where you stand for growth.",
  },
  {
    icon: LockIcon,
    title: "Locked Into Contracts",
    body: "Paying month after month with no evidence your SEO services in Bangalore are going the right direction?",
  },
];

export default function PainPoints({
  title = "Your competitors are ranking. You're stuck on page 3",
  subtitle = "You've posted blogs. Maybe hire a freelancer. But traffic stays flat, leads don't come from search, and nobody can explain why. It's frustrating—and it's fixable.",
  pains = PAINS,
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-[30px] font-bold leading-tight tracking-tight text-white sm:text-[40px]"
          >
            {title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#9BA4BD]">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map(({ icon: Icon, title: t, body }) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-shadow hover:shadow-[0_18px_40px_-26px_rgba(250,159,67,0.55)]"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(250,159,67,0.14)", color: "#FA9F43" }}
              >
                <Icon />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-white">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#9BA4BD]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}