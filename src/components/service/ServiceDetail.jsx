// src/components/service/ServiceDetail.jsx
// Demo-styled service template. Every /service/<slug> page renders the SAME
// lighter section set as the demo page, but driven by each service's own data
// in @/data/services. Sections render only when their data exists, so a service
// missing (e.g.) a testimonial or socialPlatforms simply skips that block.
//
// Section order (mirrors the demo page):
//   Hero → Pain points → Offerings grid → Process → Why us (+case study)
//   → [Social platforms] → Reviews → FAQ → Related → Footer CTA

import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { SERVICES } from "@/data/services";
import {
  ArrowLeft,
  EyeOff,
  FileX2,
  LineChart,
  Lock,
  Search,
  Target,
  FileText,
  PenTool,
  Link2,
  MapPin,
  ShoppingCart,
  BarChart3,
  Layers,
  Settings,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import DemoHero from "@/components/DemoHero";
import PainPoints from "@/components/demo/PainPoints";
import ServicesGrid from "@/components/demo/ServicesGrid";
import DemoProcess from "@/components/demo/DemoProcess";
import WhyChooseUs from "@/components/demo/WhyChooseUs";
import Testimonial from "@/components/demo/Testimonial";
import RelatedServices from "@/components/demo/RelatedServices";
import ServiceSchema from "@/components/service/ServiceSchema";
import CosmicBg from "@/components/ui/CosmicBg";
import GoogleReviews from "../GoogleReviews";

// Icon pools — data points carry no icons, so we cycle a sensible set by index.
const PAIN_ICONS = [EyeOff, FileX2, LineChart, Lock];
const OFFER_ICONS = [
  Search,
  Target,
  FileText,
  PenTool,
  Link2,
  MapPin,
  ShoppingCart,
  BarChart3,
  Layers,
  Settings,
];

const CONTACT = "/contact";

export default function ServiceDetail() {
  const { routeParams } = usePageContext();
  const slug = routeParams?.slug;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div>
        <Header />
        <section className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-slate-700">Service not found.</p>
          <a
            href="/service"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-[#0037CA] no-underline"
          >
            <ArrowLeft size={16} /> Back to all services
          </a>
        </section>
        <Footer />
      </div>
    );
  }

  const {
    name,
    accent,
    tagline,
    heroHeadline,
    heroSubline,
    painPoints,
    offerings,
    items = [],
    process = [],
    processIntro,
    processTitle,
    whyChooseUs,
    caseStudy,
    socialPlatforms,
    testimonial,
    testimonials,
    faqs = [],
    faqTitle,
    cta,
    related,
  } = service;

  // ── Map service data → demo-component props ───────────────────────────────
  const pains = painPoints?.points?.map((p, i) => ({
    icon: PAIN_ICONS[i % PAIN_ICONS.length],
    title: p.title,
    body: p.desc,
  }));

  const offeringServices =
    offerings?.points?.map((o, i) => ({
      title: o.title,
      body: o.desc,
      href: CONTACT,
      Icon: OFFER_ICONS[i % OFFER_ICONS.length],
    })) ||
    (items.length
      ? items.map((it, i) => ({
          title: it,
          body: "",
          href: CONTACT,
          Icon: OFFER_ICONS[i % OFFER_ICONS.length],
        }))
      : null);

  const steps = process.map((step, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: step.title,
    body: step.desc,
  }));

  const values = whyChooseUs?.points?.map((w) => ({
    title: w.title,
    body: w.desc,
  }));

  // Pass the service's freeform case study straight through — the updated
  // WhyChooseUs handles {industry, problem, whatWeDid, result} natively.
  const caseStudyProp = caseStudy
    ? { ...caseStudy, timeframe: caseStudy.timeframe || "Client result" }
    : null;

  const tItem = testimonial || testimonials?.[0] || null;

  const relatedFromData = (related || [])
    .map((r) => {
      const s = SERVICES.find((x) => x.slug === r.slug);
      return s
        ? { name: s.name, benefit: r.desc || s.tagline, href: s.href }
        : null;
    })
    .filter(Boolean);
  const relatedFallback = SERVICES.filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ name: s.name, benefit: s.tagline, href: s.href }));
  const relatedList = relatedFromData.length
    ? relatedFromData
    : relatedFallback;

  return (
    <div>
      <ServiceSchema service={service} />
      <Header />

      {/* 01 — Hero */}
      <DemoHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/service" },
          { label: name },
        ]}
        title={heroHeadline || name}
        subtitle={heroSubline || tagline}
        primaryCta={{ label: "Request a Free Strategy Call", href: CONTACT }}
        accentColor={accent || "#22D3EE"}
      />

      {/* 02 — Pain points */}
      {pains?.length > 0 && (
        <PainPoints
          title={painPoints.title}
          subtitle={painPoints.intro}
          pains={pains}
        />
      )}

      {/* 03 — Offerings grid */}
      {offeringServices?.length > 0 && (
        <ServicesGrid
          eyebrow="WHAT WE PROVIDE"
          title={offerings?.title || "What's included"}
          subtitle={offerings?.subtitle || ""}
          services={offeringServices}
        />
      )}

      {/* 04 — Process */}
      {steps.length > 0 && (
        <DemoProcess
          subtitle={processTitle || `Our ${name} process — step by step`}
          promo={{
            eyebrow: "HOW WE WORK",
            heading: "A proven, repeatable path to results",
            body:
              processIntro ||
              "A scientific, data-driven process so every client gets consistent, measurable results.",
            cta: { label: "Book a Free Audit", href: CONTACT },
            image: "",
          }}
          steps={steps}
        />
      )}

      {/* 05 — Why choose us (+ optional case study) */}
      {(values?.length > 0 || caseStudyProp) && (
        <WhyChooseUs
          eyebrow="WHY CHOOSE US"
          title={whyChooseUs?.title || "Why choose us"}
          values={values || []}
          caseStudy={caseStudyProp}
        />
      )}

      {/* Social media platforms — only renders when the service defines it */}
      {socialPlatforms?.items?.length > 0 && (
        <section className="pt-12">
          <h2 className="text-[40px] font-bold text-center">
            {socialPlatforms.title || "Platforms We Manage"}
          </h2>
          <div className="mx-auto my-6 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-full bg-blue-100/80 p-4">
            {socialPlatforms.items.map((p) => (
              <div
                key={p.name}
                className="flex gap-2 rounded-full bg-white px-4 py-2"
              >
                {p.icon && (
                  <img src={p.icon} alt={p.name} className="h-6 w-6" />
                )}
                <p className="font-medium">{p.name}</p>
              </div>
            ))}
          </div>
          {socialPlatforms.note && (
            <p className="mx-auto max-w-3xl text-center text-lg">
              {socialPlatforms.note}
            </p>
          )}
        </section>
      )}

      {/* 06 — Reviews (Testimonial available as an alternative) */}
      {/* {tItem && (
        <Testimonial quote={tItem.quote} name={tItem.author} role={tItem.role} company="" />
      )} */}
      <GoogleReviews />

      {/* 07 — FAQ */}
      {faqs.length > 0 && (
        <FaqSection
          faqs={faqs}
          title={faqTitle || `${name} — FAQs`}
          subtitle=""
        />
      )}

      {/* 08 — Related services */}
      <RelatedServices title="Explore related services" services={relatedList} />

      <Footer
        ctaProps={{
          title: cta?.title || "Ready to grow?",
          substitle: "Stop guessing. Start growing with data.",
          description:
            cta?.subtitle ||
            "Schedule a free 30-min strategy call. No pitch deck. No lock-in. Just a real conversation about what will move the needle for your business.",
          primaryLabel: "Request a Free Strategy Call",
        }}
      />
    </div>
  );
}