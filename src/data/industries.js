// src/data/industries.js
// Industry landing pages — genuinely unique content per vertical (not templated),
// targeting "[industry] digital marketing in Bangalore" search intent.
// EEAT: no fabricated stats, clients, or testimonials.
import { Building2, Sofa, HardHat, HeartPulse } from "lucide-react";

export const INDUSTRIES = [
  {
    slug: "real-estate-digital-marketing",
    name: "Real Estate",
    Icon: Building2,
    accent: "#FA9F43",
    metaTitle:
      "Real Estate Digital Marketing Agency in Bangalore | Skyup Digital Solutions",
    metaDescription:
      "Digital marketing for real estate in Bangalore — generate qualified buyer and investor leads for projects, plots, and rentals with targeted ads, SEO, and landing pages.",
    heroEyebrow: "Real estate & property",
    heroHeadline: "Digital marketing for real estate that fills your pipeline with serious buyers",
    heroSub:
      "Property buyers research online long before they visit a site. We help Bangalore developers, brokers, and property consultants get in front of them — and turn clicks into site visits and bookings.",
    intro:
      "Real estate is a high-value, high-consideration purchase. A single qualified lead can be worth lakhs, but most property marketing wastes budget on broad traffic that never converts. Our approach is built around lead quality, not vanity metrics: the right audience, landing pages that pre-qualify, and follow-up that keeps you top of mind through a long buying cycle.",
    painPoints: [
      {
        title: "Leads that never pick up the phone",
        desc: "Cheap, broad campaigns flood you with junk enquiries. We target by location, budget signals, and intent so your sales team talks to people who can actually buy.",
      },
      {
        title: "Long buying cycles that go cold",
        desc: "Property decisions take weeks or months. We set up nurture flows and retargeting so your project stays visible until the buyer is ready.",
      },
      {
        title: "Projects that look invisible online",
        desc: "If your project doesn't show up for 'flats in [area]' or 'plots near [landmark]', you're losing buyers to competitors. We fix local search visibility.",
      },
    ],
    whatWeDo: [
      "Google & Meta lead-generation campaigns targeted by location, budget, and intent",
      "High-converting project landing pages with enquiry and site-visit forms",
      "Local SEO so your projects rank for area-based property searches",
      "WhatsApp and CRM automation to follow up leads instantly and nurture them",
      "Walkthrough, drone, and project video editing for listings and ads",
    ],
    relevantServices: ["performance-marketing", "web-development", "seo", "video-editing"],
    faqs: [
      {
        q: "How do you generate real estate leads in Bangalore?",
        a: "We run targeted Google and Meta campaigns aimed at buyers in specific locations and budget ranges, send them to dedicated project landing pages, and follow up instantly via WhatsApp and CRM automation.",
      },
      {
        q: "Can you help sell a specific project or property?",
        a: "Yes. We build a dedicated campaign and landing page around a single project — with its USPs, pricing guidance, gallery, and enquiry forms — rather than sending traffic to a generic website.",
      },
      {
        q: "Do you work with brokers and individual agents, or only developers?",
        a: "Both. We work with developers, brokerages, and independent property consultants — the strategy scales to your budget and inventory.",
      },
      {
        q: "How quickly can we expect leads?",
        a: "Paid campaigns can start generating enquiries within days of launch. SEO and organic visibility build over a few months. Most clients run both together.",
      },
    ],
    cta: {
      title: "Ready to fill your pipeline with serious property buyers?",
      subtitle: "Get a free real estate marketing consultation and a lead-generation plan built around your projects.",
    },
  },
  {
    slug: "interior-design-digital-marketing",
    name: "Interior Design",
    Icon: Sofa,
    accent: "#5b8cff",
    metaTitle:
      "Interior Design Digital Marketing Agency in Bangalore | Skyup Digital Solutions",
    metaDescription:
      "Digital marketing for interior designers in Bangalore — showcase your portfolio, rank locally, and generate high-value home and office interior leads with ads and SEO.",
    heroEyebrow: "Interior design & décor",
    heroHeadline: "Digital marketing for interior designers that turns your portfolio into enquiries",
    heroSub:
      "Interior design sells on visuals and trust. We put your best work in front of homeowners and businesses actively planning a project in Bangalore — and make it effortless for them to reach you.",
    intro:
      "Your work is your strongest sales tool, but a beautiful portfolio does nothing if no one sees it. Interior design clients search visually and locally — on Instagram, Google, and Pinterest — comparing styles and shortlisting studios. We make sure yours is the studio they find, remember, and contact.",
    painPoints: [
      {
        title: "A stunning portfolio nobody sees",
        desc: "Great projects buried on a slow website or an under-used Instagram won't generate leads. We get your work in front of people actively planning interiors.",
      },
      {
        title: "Price-shoppers instead of real clients",
        desc: "The wrong audience wants the cheapest quote. We target homeowners and businesses whose budget and intent match your positioning.",
      },
      {
        title: "Inconsistent enquiries",
        desc: "Feast-or-famine lead flow makes planning impossible. Consistent campaigns and local SEO create a steady, predictable stream of enquiries.",
      },
    ],
    whatWeDo: [
      "Instagram and Meta campaigns built around your project visuals and reels",
      "Local SEO so you rank for 'interior designers in [area], Bangalore'",
      "Portfolio-first website and landing pages designed to convert browsers into enquiries",
      "Reel and before/after video editing that showcases transformations",
      "Lead capture and WhatsApp follow-up so no enquiry slips through",
    ],
    relevantServices: ["social-media-marketing", "video-editing", "web-development", "seo"],
    faqs: [
      {
        q: "How do you market an interior design studio?",
        a: "We lead with your visuals — Instagram and Meta campaigns built around your project photos and reels, backed by local SEO and a portfolio-first website that turns browsers into enquiries.",
      },
      {
        q: "Which platform works best for interior design leads?",
        a: "Instagram and Meta are usually strongest because the work is visual, supported by Google local search for people actively looking for a designer in their area. Most studios benefit from both.",
      },
      {
        q: "Do you create content from our completed projects?",
        a: "Yes. We edit your project footage and photos into reels, before/after videos, and ad creative — you provide the raw media and we make it perform.",
      },
      {
        q: "Can you help us attract higher-budget clients?",
        a: "Yes. Targeting, messaging, and positioning are tuned to attract clients whose budgets match your work, rather than price-shoppers.",
      },
    ],
    cta: {
      title: "Ready to turn your portfolio into a steady stream of enquiries?",
      subtitle: "Get a free interior design marketing consultation tailored to your studio and style.",
    },
  },
  {
    slug: "construction-digital-marketing",
    name: "Construction",
    Icon: HardHat,
    accent: "#FF8B14",
    metaTitle:
      "Construction Digital Marketing Agency in Bangalore | Skyup Digital Solutions",
    metaDescription:
      "Digital marketing for construction and contracting firms in Bangalore — win project enquiries, build authority, and generate qualified leads with SEO, ads, and a professional web presence.",
    heroEyebrow: "Construction & contracting",
    heroHeadline: "Digital marketing for construction firms that wins bigger project enquiries",
    heroSub:
      "Construction and contracting decisions are built on trust and track record. We help Bangalore builders and contractors present their credibility online and generate enquiries for the projects they want.",
    intro:
      "Whether you build homes, commercial spaces, or take on contracting work, your next client is checking you out online first. A credible web presence, visible project work, and a steady flow of enquiries separate the firms that grow from the ones that rely on word of mouth alone. We build that engine.",
    painPoints: [
      {
        title: "Relying entirely on referrals",
        desc: "Word of mouth is valuable but unpredictable. We add a reliable digital channel so your enquiry flow doesn't depend on luck.",
      },
      {
        title: "A web presence that undersells you",
        desc: "An outdated or missing website makes an established firm look small. We build a credible presence that reflects the quality of your work.",
      },
      {
        title: "Attracting the wrong-size projects",
        desc: "The right marketing brings enquiries that match your capacity and margins — not just the cheapest jobs.",
      },
    ],
    whatWeDo: [
      "A credible, professional website with your project portfolio and capabilities",
      "Local SEO so you rank for construction and contractor searches in your areas",
      "Google and Meta campaigns targeting property owners and businesses planning builds",
      "Project gallery and completed-work showcases that build trust",
      "Lead capture and follow-up automation for enquiry management",
    ],
    relevantServices: ["web-development", "seo", "performance-marketing", "graphic-design"],
    faqs: [
      {
        q: "How does digital marketing work for a construction company?",
        a: "It combines a credible website and project portfolio, local SEO so you're found for construction searches in your area, and targeted ads that reach property owners and businesses planning builds.",
      },
      {
        q: "We get work by referral — why do we need this?",
        a: "Referrals are great but unpredictable. A digital channel gives you a steady, additional source of enquiries so growth doesn't depend on word of mouth alone.",
      },
      {
        q: "Can you showcase our completed projects?",
        a: "Yes. We build project galleries and showcases that demonstrate the scale and quality of your work — one of the strongest trust signals in construction.",
      },
      {
        q: "Do you work with contractors as well as builders?",
        a: "Yes — builders, contractors, and specialist firms. The approach is tailored to the type and size of projects you want to win.",
      },
    ],
    cta: {
      title: "Ready to win bigger, better-fit construction projects?",
      subtitle: "Get a free construction marketing consultation and a plan to grow your project enquiries.",
    },
  },
  {
    slug: "healthcare-digital-marketing",
    name: "Healthcare & Clinics",
    Icon: HeartPulse,
    accent: "#5b8cff",
    metaTitle:
      "Healthcare Digital Marketing Agency in Bangalore | Skyup Digital Solutions",
    metaDescription:
      "Digital marketing for clinics, hospitals, and healthcare practices in Bangalore — attract more patients with local SEO, Google Ads, and a trustworthy online presence.",
    heroEyebrow: "Healthcare & clinics",
    heroHeadline: "Digital marketing for clinics that brings more patients through your doors",
    heroSub:
      "Patients choose healthcare providers they can find and trust. We help Bangalore clinics, hospitals, and practices show up when patients search — and give them the confidence to book.",
    intro:
      "Healthcare marketing carries a duty of care: it has to be accurate, trustworthy, and patient-first. We help you build local visibility and a credible online presence — the two things that decide whether a nearby patient chooses your clinic or a competitor's — without hype or claims you can't stand behind.",
    painPoints: [
      {
        title: "Invisible in local search",
        desc: "If you don't appear when patients search for your specialty nearby, they book elsewhere. We fix local search and Google Business visibility.",
      },
      {
        title: "An online presence that doesn't build trust",
        desc: "Patients judge credibility fast. A clear, professional website and consistent information across the web reassure them before they book.",
      },
      {
        title: "Empty appointment slots",
        desc: "Targeted campaigns and easy online booking help fill your calendar with the right patients for your services.",
      },
    ],
    whatWeDo: [
      "Local SEO and Google Business Profile optimisation so patients find you nearby",
      "A clear, trustworthy, mobile-friendly website with easy appointment booking",
      "Google Ads targeting patients searching for your specialties",
      "Reputation and review management to build patient confidence",
      "Compliant, accurate content — no exaggerated medical claims",
    ],
    relevantServices: ["seo", "web-development", "performance-marketing", "social-media-marketing"],
    faqs: [
      {
        q: "How do you market a clinic or healthcare practice?",
        a: "We focus on local visibility — SEO and Google Business Profile so nearby patients find you — plus a trustworthy website with easy booking, and targeted ads for your specialties.",
      },
      {
        q: "Is healthcare marketing allowed on Google and Meta?",
        a: "Yes, within platform health advertising policies. We keep messaging accurate and compliant, avoiding exaggerated or prohibited medical claims.",
      },
      {
        q: "Can you help improve our online reviews and reputation?",
        a: "Yes. We help set up review generation and reputation management, since patient reviews are one of the biggest factors in choosing a provider.",
      },
      {
        q: "Do you work with individual practitioners and larger hospitals?",
        a: "Both — from single-doctor clinics to multi-specialty practices. The plan scales to your services and catchment area.",
      },
    ],
    cta: {
      title: "Ready to bring more of the right patients to your clinic?",
      subtitle: "Get a free, no-obligation healthcare marketing consultation for your practice.",
    },
  },
];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);

export const INDUSTRY_META = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, { title: i.metaTitle, description: i.metaDescription }])
);
