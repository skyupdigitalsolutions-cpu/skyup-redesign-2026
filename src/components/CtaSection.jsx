import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * CtaSection — reusable call-to-action banner.
 *
 * All content is prop-driven; defaults below match the demo copy, so
 * <CtaSection /> renders the SkyUp version out of the box. Override any prop
 * to reuse it elsewhere:
 *
 *   <CtaSection
 *     eyebrow="Free audit"
 *     title="Ready to rank higher on Google?"
 *     description="..."
 *     primaryLabel="Get my free audit"
 *     primaryHref="/audit"
 *     secondaryLabel="See our work"      // optional 2nd button
 *     secondaryHref="/work"
 *   />
 *
 * `title` and `description` accept strings or JSX, so you can highlight words:
 *   title={<>Turn your presence into a <span className="text-[#FFB37B]">revenue engine</span>.</>}
 */
export default function CtaSection({
  title = "Turn your digital presence into a real revenue engine.",
  substitle = "",
  description = "Most companies know they need to level up their digital marketing — they just need a team they can trust to get results. At SkyUp Digital Solutions, we combine strategy, technology, automation, and communication to grow your business.",
  primaryLabel = "Let's build your growth plan",
  primaryHref = "/contact",
  secondaryLabel = null,
  secondaryHref = "",
  className = "",
}) {
  return (
    <section className={`bg-white px-6 lg:px-[120px]  ${className}`}>
      <div
        className="relative shadow-lg isolate mx-auto max-w-7xl overflow-hidden rounded-[28px] px-7 py-12 text-center sm:px-12 lg:px-16 "
        style={{
          background:
            "linear-gradient(180deg, #0037CA 0%, #1e44c8 42%, #0037CA 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1.4px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(120% 120% at 50% 50%, transparent 35%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 50%, transparent 35%, black 100%)",
          }}
        />

        {/* content */}
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-wide text-white sm:text-4xl lg:text-[2.87rem]">
            {title}
          </h2>
          <h3 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[1.5rem]">
            {substitle}
          </h3>
          {description && (
            <p className="mx-auto mt-5 max-w-4xl text-base  leading-relaxed text-white/75 sm:text-[17px]">
              {description}
            </p>
          )}

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={primaryHref}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0037CA] shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f7ff]"
            >
              {primaryLabel}
              <ArrowRight
                size={17}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            {secondaryLabel && (
              <a
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:text-black"
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
