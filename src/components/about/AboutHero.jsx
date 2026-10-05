// src/components/about/AboutHero.jsx
import React from "react";
import { Sparkles } from "lucide-react";
import { Reveal } from "./animations";

/* Original layout (distinct from the reference template):
   - brand cobalt gradient + faded background image instead of coral
   - eyebrow pill + highlighter accent under "grow"
   - second section mirrored: image LEFT (on an offset accent card), copy RIGHT
   - capability chips under the copy */

const CHIPS = [
  { label: "SEO", href: "/service/seo" },
  { label: "Web Development", href: "/service/web-development" },
  { label: "AI Automation", href: "/service/ai-automation" },
  { label: "Performance Marketing", href: "/service/performance-marketing" },
  { label: "UI/UX Design", href: "/service/ui-ux-design" },
];

export default function AboutHero() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden pb-24 pt-28 lg:pt-32">
        {/* brand gradient backdrop (sits behind the image) */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#001a63]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0037CA]/40" />
        {/* faded background image, over the gradient */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-50 "
          style={{
            backgroundImage: "url('/images/service-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6  lg:px-[120px]">
          <div className="mx-auto h-[325px] max-w-4xl text-center">
            <Reveal y={16}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0037CA]/15 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0037CA] shadow-sm">
                <Sparkles size={13} />
                About Skyup Digital Solutions
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[56px]">
               We help businesses grow{" "}
                <span className="bg-gradient-to-r from-[#82aee8] to-[#ffb950] bg-clip-text text-transparent">
                  Modern Business Growth
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                We are a web development and digital marketing agency. We
                utilize smart strategy and the right tools with real creativity
                to convert your online presence into actual business results.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ACCELERATING (image LEFT, copy RIGHT) ──────────── */}
      <section className="bg-white px-6 py-20 lg:px-[120px]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* image on an offset accent card */}
          <Reveal>
            <div className="relative ">
              <div
                aria-hidden
                className="absolute -left-4 -top-4 h-full w-full rounded-[1.75rem] bg-gradient-to-br from-[#0037CA] to-[#00A3FF]"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-slate-900/15">
                <img
                  src="/images/aboutus.webp"
                  alt="Skyup Digital Solutions"
                  className="h-[570px] w-[550px]  object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <Reveal delay={150}>
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0037CA]">
                <span className="h-[3px] w-7 rounded-full bg-[#0037CA]" />
                What we do
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl lg:text-[2.1rem]">
                Accelerating business growth through AI-powered digital
                marketing
              </h2>

              <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-slate-700">
                <p>
                  Skyup Digital Solutions helps businesses move faster online —
                  better marketing, smarter automation, and websites built to
                  bring in customers. No fluff, just results that count for your
                  bottom line. We are a digital marketing agency and
                  marketing/website development company. We use creativity,
                  technology and data to create measurable growth systems for
                  ambitious brands.
                </p>
                <p>
                  We collaborate with startups, local businesses, and growing
                  companies that want to be more visible, generate qualified
                  leads, boost conversions, and improve digital success for the
                  long term — built for a future where AI, automation, strategy,
                  and user experience come together for sustainable growth.
                </p>
                <p>
                  Skyup Digital Solutions is designed for the future—where AI,
                  automation, strategic marketing, and user experience come
                  together to make sustainable business growth.
                </p>
              </div>

              {/* capability chips — internal links to service pages */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {CHIPS.map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-[#0037CA]/30 hover:bg-[#0037CA]/5 hover:text-[#0037CA]"
                  >
                    {chip.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
