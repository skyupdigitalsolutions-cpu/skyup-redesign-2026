import React from "react";

// Section 03 — Services Grid (What We Offer)
// 4×2 grid of 8 service cards: icon, H3, 2-line description, learn-more link.

const BRAND = "#5b8cff";
const HEADING_NAVY = "#1B2440";

function ArrowRight({ className = "h-4 w-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* Compact line icons keyed to each service */
const I = (paths) => function Icon({ className = "h-6 w-6" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">{paths}</svg>
  );
};

const SERVICES = [
  {
    title: "Technical SEO Audit & Fixes",
    body: "We crawl your site to determine what is causing your website to slow down or even prevent Google from crawling it. Faster load times, a cleaner structure, and improved crawlability with advanced technical SEO improvements and professional SEO audit tools. ",
    href: "#",
    Icon: I(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /><path d="M8 11h6M11 8v6" /></>),
  },
  {
    title: "Keyword Research & Strategy",
    body: "We find out what your buyers are searching for. The keywords we target with our SEO are keywords with high intent, which means that these keywords will generate the traffic that is relevant, not random. ",
    href: "#",
    Icon: I(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
  },
  {
    title: "On-Page Optimisation",
    body: "Whether it's the type of tags or internal links, all the pages are holding the search engines hostage as authoritative. Smart on-page SEO utilizes your existing content and optimises it. ",
    href: "#",
    Icon: I(<><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" /></>),
  },
  {
    title: "Content Strategy & Creation",
    body: "We develop content with a good strategy, which is rated and performs well, so as to facilitate the conversion. For each piece, the intent of the search, business goal, and tactics tested that are effective are the elements that tie this piece into other pieces. The intent of the search, the business goal, and the business tactics tested that are effective are elements that tie each piece to the other pieces.",
    href: "#",
    Icon: I(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>),
  },
  {
    title: "Link Building",
    body: "Outreach and digital PR efforts will result in links pointing to our website, either organically or by us reaching out to other sites to offer our own. Off-Page SEO helps build your website's authority — which will help grow your ranking potential.",
    href: "#",
    Icon: I(<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" /></>),
  },
  {
    title: "Local SEO",
    body: "Optimises your business for local searches and helps local customers easily find you in Google Search & Google Maps. Whether you're leveraging local keywords through Google Business Profile, citations, or location SEO, we ensure that your local business is seen more and more and that more calls, leads, and visitors are coming to your local business.",
    href: "#",
    Icon: I(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>),
  },
  {
    title: "E-Commerce SEO",
    body: "Simplified product pages, category pages, and site structure for D2C brands. Increased organic product discovery, reduced ad spend, and increased SEO ranking performance.",
    href: "#",
    Icon: I(<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></>),
  },
  {
    title: "Monthly Reporting",
    body: "Monthly reporting of dashboards, rankings, traffic, and leads in a non-technical way. Only the numbers that impact your business.",
    href: "#",
    Icon: I(<><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 4-6" /></>),
  },
];

export default function ServicesGrid({
  eyebrow = "WHAT WE PROVIDE",
  title = "Visibility That Covers All Corners of Your SEO",
  subtitle="",
  services = SERVICES,
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: BRAND }}
          >
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-[30px] font-bold leading-tight tracking-tight sm:text-[40px]"
            style={{ color: HEADING_NAVY }}
          >
            {title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#9BA4BD]">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title: t, body, href, Icon }) => (
            <a
              key={t}
              href={href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 no-underline shadow-[0_10px_30px_-24px_rgba(11,26,59,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_22px_46px_-26px_rgba(0,55,202,0.45)]"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                style={{ background: "#E6ECFF", color: BRAND }}
              >
                <Icon />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-white">{t}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#9BA4BD]">{body}</p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold transition-transform group-hover:gap-2.5"
                style={{ color: BRAND }}
              >
                Learn more <ArrowRight />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}