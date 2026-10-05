// src/components/industries/IndustryDetail.jsx
// Lightweight (no Three.js/GSAP) industry landing page renderer — fast by design.
import { usePageContext } from "vike-react/usePageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getIndustry } from "@/data/industries";
import { SERVICES } from "@/data/services";
import IndustrySchema from "@/components/industries/IndustrySchema";
import CosmicBg from "@/components/ui/CosmicBg";

export default function IndustryDetail() {
  const { routeParams } = usePageContext();
  const industry = getIndustry(routeParams?.slug);

  if (!industry) {
    return (
      <div className="font-poppins bg-[#04050C] text-white min-h-screen">
        <Header />
        <div className="pt-32 pb-24 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Industry not found</h1>
          <a href="/industries" className="text-[#FA9F43] hover:underline">View all industries</a>
        </div>
        <Footer />
      </div>
    );
  }

  const services = industry.relevantServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean);
  const accent = industry.accent || "#FA9F43";

  return (
    <div className="font-poppins text-[#E8ECF8] min-h-screen relative">
      <CosmicBg />
      <div className="relative z-10">
      <IndustrySchema industry={industry} />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: accent }}>
            {industry.heroEyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            {industry.heroHeadline}
          </h1>
          <p className="text-[#B9C0D4] text-lg leading-relaxed max-w-3xl mx-auto">{industry.heroSub}</p>
          <div className="mt-8">
            <a href="/contact" className="inline-block px-7 py-3 rounded-full font-semibold text-[#04050C]" style={{ background: accent }}>
              Get a free consultation
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 pb-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-[#C7CEE0] text-lg leading-relaxed text-center">{industry.intro}</p>
        </div>
      </section>

      {/* Pain points */}
      <section className="px-4 pb-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Challenges we solve for {industry.name.toLowerCase()} businesses
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {industry.painPoints.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-[#9BA4BD] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="px-4 pb-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            How we help {industry.name.toLowerCase()} brands grow
          </h2>
          <ul className="space-y-3">
            {industry.whatWeDo.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#C7CEE0] leading-relaxed">
                <span style={{ color: accent }} className="mt-1">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant services */}
      {services.length > 0 && (
        <section className="px-4 pb-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Services we bring to {industry.name.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <a key={s.slug} href={`/service/${s.slug}`}
                   className="rounded-xl p-5 bg-white/[0.03] border border-white/10 hover:border-white/25 transition-colors">
                  <h3 className="font-semibold text-white mb-1">{s.name}</h3>
                  <p className="text-[#8A93AC] text-sm">{s.tagline || ""}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="px-4 pb-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            {industry.name} marketing — frequently asked questions
          </h2>
          <div className="space-y-4">
            {industry.faqs.map((f, i) => (
              <div key={i} className="rounded-xl p-5 bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-[#9BA4BD] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl text-center rounded-3xl p-10 bg-white/[0.04] border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{industry.cta.title}</h2>
          <p className="text-[#B9C0D4] mb-7">{industry.cta.subtitle}</p>
          <a href="/contact" className="inline-block px-8 py-3 rounded-full font-semibold text-[#04050C]" style={{ background: accent }}>
            Talk to us
          </a>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
