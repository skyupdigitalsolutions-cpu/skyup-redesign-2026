import React from "react";

// Section 05 — Why Choose Us (Trust Builders)
// Value-prop cards + an optional mini case study.
// The case study panel is flexible:
//   • pass `stats: [{from,to,label} | {value,label}]` for the big-number layout, OR
//   • pass `result: "freeform sentence"` for a highlighted text result, OR
//   • pass `caseStudy={null}` to hide the panel entirely (values span full width).
// `action` and `whatWeDid` are interchangeable. Defaults are unchanged, so the
// standalone demo page keeps rendering exactly as before.

const BRAND = "#5b8cff";
const HEADING_NAVY = "#1B2440";

function Check({ className = "h-5 w-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

const VALUES = [
  {
    title: "You Always Know What You're Paying For",
    body: "There are no vague 'optimizations' — all deliverables are known in advance.",
  },
  {
    title: "No Pressure, No Lock-In",
    body: "Our work is on a monthly basis. If we are not delivering, you can walk away. No contract traps.",
  },
  {
    title: "ROI Is the Only Metric We Care About",
    body: "We measure organic traffic, qualified leads, and revenue impact — the tangible results that matter to your business.",
  },
  {
    title: "Industry-Leading Tools, Real Expertise",
    body: "We use Ahrefs, Screaming Frog, Semrush, Google Analytics, and Search Console — but strategy always comes first.",
  },
];

const DEFAULT_CASE = {
  industry: "B2B SaaS",
  problem: "Stuck on page 3 with almost no organic traffic.",
  action:
    "Technical fixes, a buyer-intent content plan, and authority link building over five months.",
  timeframe: "5-month result",
  stats: [
    { from: "900", to: "11,400", label: "Monthly organic sessions" },
    { value: "12.6x", label: "Organic traffic growth" },
    { value: "Page 1", label: "For 40+ target keywords" },
  ],
};

export default function WhyChooseUs({
  eyebrow = "WHY CHOOSE US",
  title = "Why Brands Choose Skyup",
  values = VALUES,
  caseStudy = DEFAULT_CASE,
}) {
  const hasValues = Array.isArray(values) && values.length > 0;
  const hasCase = !!caseStudy;
  const action = caseStudy?.action ?? caseStudy?.whatWeDid;
  const hasStats = hasCase && Array.isArray(caseStudy.stats) && caseStudy.stats.length > 0;

  // Layout: two columns only when both halves exist.
  const outerCols = hasValues && hasCase ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-1";
  // When values stand alone they get a roomier 4-up grid.
  const valuesCols = hasCase ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND }}>
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-[30px] font-bold leading-tight tracking-tight sm:text-[40px]"
            style={{ color: HEADING_NAVY }}
          >
            {title}
          </h2>
        </div>

        <div className={`mt-12 grid gap-6 ${outerCols}`}>
          {/* Value props */}
          {hasValues && (
            <div className={`grid gap-4 ${valuesCols}`}>
              {values.map(({ title: t, body }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_30px_-24px_rgba(11,26,59,0.45)]"
                >
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "#E6ECFF", color: BRAND }}
                  >
                    <Check />
                  </span>
                  <h3 className="mt-4 text-[16px] font-bold text-white">{t}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#9BA4BD]">{body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mini case study — highest-trust element */}
          {hasCase && (
            <div
              className="relative overflow-hidden rounded-2xl p-8 text-white lg:p-10"
              style={{
                background:
                  "radial-gradient(120% 120% at 85% -10%, #0037CA 0%, #001A66 60%, #021A5E 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                {(caseStudy.industry || caseStudy.timeframe) && (
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wide">
                    {[caseStudy.industry, caseStudy.timeframe].filter(Boolean).join(" · ")}
                  </span>
                )}

                {caseStudy.problem && (
                  <p className="mt-5 text-[15px] leading-relaxed text-white/85">
                    <span className="font-bold text-white">The problem:</span> {caseStudy.problem}
                  </p>
                )}
                {action && (
                  <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                    <span className="font-bold text-white">What we did:</span> {action}
                  </p>
                )}

                {hasStats ? (
                  <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/15 pt-7 sm:grid-cols-3">
                    {caseStudy.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-[26px] font-extrabold leading-none sm:text-[30px]">
                          {s.from ? (
                            <>
                              <span className="text-white/55">{s.from}</span>
                              <span className="px-1 text-white/45">→</span>
                              <span>{s.to}</span>
                            </>
                          ) : (
                            s.value
                          )}
                        </div>
                        <div className="mt-2 text-[12px] font-medium text-white/70">{s.label}</div>
                      </div>
                    ))}
                  </div>
                ) : caseStudy.result ? (
                  <div className="mt-7 border-t border-white/15 pt-6">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-white/55">
                      Result
                    </div>
                    <p className="mt-2 text-[17px] font-bold leading-snug text-white">
                      {caseStudy.result}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}