import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* Cohesive, professional palette — brand cobalt alternating with a refined teal.
   Both are cool, calm, and harmonious (no more clashing cream/orange). */
const COBALT = { bg: "#EDF2FF", accent: "#0037CA" };
const TEAL = { bg: "#E8F6F4", accent: "#0E7C7B" };

const services = [
  {
    title: "SEO Services",
    subtitle: "Rank where your customers are searching.",
    description:
      "SEO delivers highest ROI when done right. Our team handles technical health, keyword strategy & content optimisation, building organic visibility that compounds. Based in Bangalore, we focus on rankings generating revenue—not just traffic.",
    cta: "Grow Organically",
    href: "#seo",
    color: COBALT,
  },
  {
    title: "Performance Marketing",
    subtitle: "Drive measurable growth with every rupee spent.",
    description:
      "We deliver data-driven performance marketing solutions designed to maximise your return on ad spend, accelerate customer acquisition, and generate revenue that scales — with full transparency at every step.",
    cta: "Launch Smarter Campaigns",
    href: "#ppc",
    color: TEAL,
  },
  {
    title: "Social Media Marketing",
    subtitle: "Turn your social presence into a real growth channel.",
    description:
      "Customers are on social media—your brand builds trust or gets ignored. We create bespoke strategies for Instagram, LinkedIn, Facebook, YouTube that build awareness, cultivate engagement, turn followers into repeat paying customers.",
    cta: "Build Your Brand Presence",
    href: "#social",
    color: COBALT,
  },
  {
    title: "Email Marketing",
    subtitle: "Automated emails that drive revenue every day.",
    description:
      "Email marketing offers highest ROI of any channel. We create personalized flows & automated sequences keeping audience engaged, nurturing prospects through buyer journey, bringing customers back repeatedly. Set once. Works nonstop.",
    cta: "Automate Customer Engagement",
    href: "#email",
    color: TEAL,
  },
  {
    title: "AI Automation Services",
    subtitle: "Let intelligent systems handle the repetitive work.",
    description:
      "Imagine your business updating CRM in real time while sending personalized messages. This is AI automation. We use smart workflows saving time, minimizing human error, making sales & marketing process much more efficient.",
    cta: "Automate Your Business",
    href: "#ai",
    color: COBALT,
  },
  {
    title: "Machine Learning Services",
    subtitle: "Smarter marketing decisions, powered by your data.",
    description:
      "Your business creates data daily—most goes unused. Our ML solutions analyse behavior, predict converting leads, optimise campaigns, and surface insights. Intelligence that separates market leaders from followers.",
    cta: "Explore AI Intelligence",
    href: "#ml",
    color: TEAL,
  },
  {
    title: "Web Development",
    subtitle: "Websites built to perform, not just look good.",
    description:
      "Your website is your most important marketing asset. We create fast, mobile-first, SEO-friendly websites that convert, designing the best user experience. Need a new site or rebuild? Our team builds digital foundations marketing can build on.",
    cta: "Build a Better Website",
    href: "#web",
    color: COBALT,
  },
  {
    title: "UI/UX Design",
    subtitle: "Design that guides users toward the action you want.",
    description:
      "Good design isn't looking professional—it's helping users find what they want. Our UI/UX work removes friction, builds trust, increases engagement time. Better experience means better conversions, lower bounces, more happy customers.",
    cta: "Improve User Experience",
    href: "#uiux",
    color: TEAL,
  },
  {
    title: "Graphic Design",
    subtitle: "Visuals that make your brand instantly recognizable.",
    description:
      "In a crowded digital landscape, visual identity is a powerful tool. We develop brand assets, social visuals, and digital creatives that communicate value clearly and stay consistent—helping your business stand out wherever your audience sees you.",
    cta: "Strengthen Your Brand",
    href: "#graphic",
    color: COBALT,
  },
];

// Split the services into rows of `size`
const chunk = (arr, size) =>
  arr.reduce((rows, item, i) => {
    if (i % size === 0) rows.push([]);
    rows[rows.length - 1].push(item);
    return rows;
  }, []);

/* Returns how many cards sit in one row at the current breakpoint:
   1 on mobile, 2 on tablet, 3 on desktop. This drives BOTH the grid
   and the chunk size, so each sticky panel holds exactly one visual row —
   meaning mobile scrolls one card at a time. */
function useColumns() {
  const getCols = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    return w >= 1024 ? 3 : w >= 640 ? 2 : 1;
  };
  const [cols, setCols] = useState(getCols);

  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cols;
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  const { bg, accent } = service.color;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 32px -8px ${accent}33`
          : "0 2px 12px -4px rgba(0,0,0,0.08)",
        transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className="rounded-2xl p-2 flex flex-col gap-4 bg-white cursor-pointer"
    >
      <div
        style={{ backgroundColor: bg }}
        className="p-4 rounded-xl min-h-[230px] flex flex-col"
      >
        <div>
          <h3 className="font-bold text-xl leading-snug" style={{ color: "#1C1C1C" }}>
            {service.title}
          </h3>
          <h4 className="text-sm mt-2 leading-snug text-left font-medium" >
            {service.subtitle}
          </h4>
        </div>
        <p
          className="text-sm leading-normal flex-1 text-left pt-3"
        >
          {service.description}
        </p>
      </div>
      <a
        href={service.href}
        className="flex items-center justify-between text-md font-semibold h-[40px] px-3"
        style={{ color: accent }}
        onClick={(e) => e.stopPropagation()}
      >
        {service.cta}
        <span
          className="inline-grid place-items-center w-8 h-8 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: hovered ? accent : `${accent}18`,
            color: hovered ? "#fff" : accent,
          }}
        >
          <ArrowRight size={20} strokeWidth={2.5} />
        </span>
      </a>
    </div>
  );
}

export default function DigitalGrowth() {
  const cols = useColumns();
  const rows = chunk(services, cols);

  return (
    <section className="bg-blue-50/50 py-16 px-6 lg:px-30">
      {/* Section header */}
      <div className="mb-12 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
          Digital Marketing Services Designed for
          <span className="text-[#0037CA]">&nbsp;Modern Businesses</span>
        </h2>
        <p className="mt-2 px-4 ">
          Whether you need to be found on Google, reach your audience on social
          media, or build systems that bring in leads while you sleep—Skyup
          Digital Solutions offers the full suite of digital marketing services
          to get you there. Here is what we do best.
        </p>
      </div>

      {/* Sticky stacking rows */}
      <div className="relative">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="sticky"
            style={{
              // gentle accumulating offset so cards peek behind one another
              top: `${80 + Math.min(rowIndex, 8) * 16}px`,
              zIndex: rowIndex + 1,
            }}
          >
            <div className="mb-6 rounded-3xl bg-white p-4 sm:p-6 ring-1 ring-black/5">
              <div
                className="grid gap-5"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {row.map((s) => (
                  <ServiceCard key={s.title} service={s} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}