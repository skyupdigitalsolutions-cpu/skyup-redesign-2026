import React from "react";

const BRAND = "#0037CA";

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex items-center gap-2 text-white/55">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <li>
                {isLast || !item.href ? (
                  <span aria-current="page" className="font-semibold text-white">
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className="no-underline hover:text-white">
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && <li aria-hidden="true">/</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

function StatCard({ value, label, sub }) {
  return (
    <div className="rounded-2xl bg-white p-5 text-center shadow-[0_18px_40px_-22px_rgba(11,26,59,0.45)] sm:p-6">
      <div
        className="text-[28px] font-extrabold leading-none sm:text-[34px]"
        style={{ color: BRAND }}
      >
        {value}
      </div>
      <div className="mt-2 text-[12.5px] font-semibold text-[#9BA4BD]">{label}</div>
      {sub && <div className="mt-1 text-[11px] text-slate-400">{sub}</div>}
    </div>
  );
}

export default function DemoHero({
  breadcrumb = [],
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  accentColor = "#6366f1",
  stats = [],
}) {
  return (
    <>
      {/* ── Hero — brand-blue, accent only as a small badge ─────────────── */}
      <section className="relative overflow-hidden">
        {/* Background radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 80% -10%, #0037CA 0%, #001A66 55%, #021A5E 100%)",
          }}
        />

        {/* Subtle dot grid for texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />

        {/* Faint accent glow (per-service hue) */}
        {/* <div
          className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: accentColor }}
          aria-hidden="true"
        /> */}

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:pt-16 lg:px-8 lg:pb-28">
          <Breadcrumb items={breadcrumb} />

          {/* H1 */}
          <h1 className="mt-5 max-w-5xl text-[34px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[44px] lg:text-[54px]">
            {title}
          </h1>

          {/* Sub-headline */}
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-white/80 sm:text-[18px]">
            {subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-[#0037CA] no-underline shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {primaryCta.label}
                <ArrowRightIcon />
              </a>
            )}

            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white no-underline ring-1 ring-white/25 transition-colors hover:bg-white/10"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Stat ribbon — overlaps hero bottom edge ─────────────────────── */}
      {stats.length > 0 && (
        <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      )}

      {/* spacer so the page doesn't cut off */}
      <div className="h-20" />
    </>
  );
}