// Case studies data — single source of truth for the Work page.
// Mirrors the shape used by @/data/blogs so the Work list can derive its
// categories and the per-study detail page (CaseStudyDetail) the same way.
//
// Put images in public/images/case-studies/ and reference with a leading slash.
// Any study without an `image` falls back to the gradient cover automatically.
//
// SCHEMA (all optional except id, slug, category, client, title, summary):
//   image, industry, timeline, year, role, services[], stack[], liveUrl,
//   metrics[{value,label,sub?}], overview, challenge, approach[], solution,
//   results[], deliverables[], gallery[{src,alt?,caption?}], testimonial{quote,author,role?}
// The detail template renders a block only when its data is present.

// On-brand gradient covers, rotated per card (fallback when no image).
export const COVERS = [
  "from-[#0037CA] to-[#3D6BF0]",
  "from-[#002896] to-[#1b60f4]",
  "from-[#1b60f4] to-[#87b6f4]",
  "from-[#0037CA] to-[#002896]",
];

export const CASE_STUDIES = [
  // ── PPC — Rathna Bhoomi Developers ────────────────────────────────────
  {
    id: 1,
    slug: "rathna-bhoomi-developers-ppc",
    category: "PPC",
    client: "Rathna Bhoomi Developers",
    title: "Performance-driven PPC for real estate",
    summary:
      "Data-driven, targeted Google Ads campaigns for a real estate developer — structured for intent and tracked to real revenue.",
    image: "/images/case-studies/rathna-bhoomi-ppc.avif",
    industry: "Real Estate",
    role: "Paid media",
    services: ["Google Ads", "Performance Marketing", "Conversion Tracking", "Landing Pages"],
    metrics: [
      { value: "₹20L+", label: "Revenue generated" },
      { value: "Real estate", label: "Sector" },
    ],
    overview:
      "Targeted, data-driven PPC campaigns built to reach high-intent property buyers and turn ad spend into measurable revenue for Rathna Bhoomi Developers.",
    approach: [
      "Structured campaigns around real buyer intent — location and project-specific keywords rather than broad terms.",
      "Tracked conversions through to genuine enquiries so budget followed what actually produced results.",
      "Optimised continuously against revenue, not vanity clicks.",
    ],
    results: [
      "₹20 Lakh+ in revenue generated through performance-driven PPC campaigns.",
      "Ad spend concentrated on the intent that converted into real enquiries.",
    ],
  },

  // ── Web Development — Novara Nature Estate ────────────────────────────
  {
    id: 2,
    slug: "novara-nature-estate",
    category: "Web Development",
    client: "Novara Nature Estate",
    title: "A farmland investment site built to convert",
    summary:
      "A fast, mobile-first website for managed farmland near Bangalore — clear storytelling, strong visuals, and an effortless enquiry path.",
    image: "/images/case-studies/novara-nature-estate.avif",
    industry: "Real Estate",
    role: "Design + build",
    services: ["Web Design", "Web Development", "Local SEO", "Lead Generation"],
    stack: ["React", "Tailwind", "Vite"],
    overview:
      "Novara sells managed farmland — a high-consideration purchase researched over weeks, mostly on mobile. The site had to build trust instantly, present the offering clearly, and make enquiring effortless.",
    approach: [
      "Led with the investment story and credibility signals a cautious buyer looks for first.",
      "Presented the estate through immersive visuals, location context, and clear highlights.",
      "Made contact frictionless on mobile with persistent enquiry and WhatsApp actions.",
    ],
    results: [
      "A premium, mobile-first experience that loads fast even on modest connections.",
      "A clear path from browsing to a real, trackable enquiry.",
    ],
    deliverables: ["Responsive marketing website", "Enquiry & WhatsApp capture", "Image galleries", "Local SEO setup"],
  },

  // ── Web Development — The Vector Graphics ─────────────────────────────
  {
    id: 3,
    slug: "vector-graphics-agency-site",
    category: "Web Development",
    client: "The Vector Graphics",
    title: "A packaging-design agency site that sells",
    summary:
      "A bold marketing website for a packaging-design agency — built to showcase the work and turn visitors into briefs.",
    image: "/images/case-studies/vector-graphics.avif",
    industry: "Design Agency",
    role: "Design + build",
    services: ["Web Design", "Web Development", "Brand Presentation"],
    stack: ["React", "Tailwind", "Vite"],
    overview:
      "A packaging-design agency needed a site that proved its craft on first impression and made it obvious how to start a project.",
    approach: [
      "Put the portfolio front and centre with a confident, high-contrast design language.",
      "Structured services and process so prospects can self-qualify quickly.",
      "Kept clear calls to action that route serious visitors into an enquiry.",
    ],
    results: [
      "A distinctive site that reflects the agency's own design standard.",
      "A clear path from showcase to project enquiry.",
    ],
    deliverables: ["Responsive marketing website", "Portfolio showcase", "Services & process pages", "Enquiry capture"],
  },

  // ── PPC — Vidyakunj ───────────────────────────────────────────────────
  {
    id: 4,
    slug: "vidyakunj-admissions-ppc",
    category: "PPC",
    client: "Vidyakunj",
    title: "PPC that fills admission seats",
    summary:
      "Targeted admission campaigns for a kindergarten — nurturing interest into real enrolments and measurable revenue.",
    image: "/images/case-studies/vidyakunj-ppc.avif",
    industry: "Education",
    role: "Paid media",
    services: ["Google Ads", "Meta Ads", "Performance Marketing", "Lead Generation"],
    metrics: [
      { value: "₹18.6L+", label: "Revenue generated" },
      { value: "Admissions", label: "Campaign goal" },
    ],
    overview:
      "Data-driven admission campaigns designed to reach parents at the right moment and convert interest into enrolments for Vidyakunj.",
    approach: [
      "Targeted parents by intent and locality during the admission window.",
      "Aligned creative and landing pages to a single clear action — enquire / enrol.",
      "Optimised toward genuine admission enquiries, not raw clicks.",
    ],
    results: [
      "₹18.6 Lakh+ in revenue generated through performance-driven admission campaigns.",
      "Stronger engagement and a steady flow of qualified admission enquiries.",
    ],
  },

  // ── CRM — Navanagara House Building Society ───────────────────────────
  {
    id: 5,
    slug: "navanagara-society-dashboard",
    category: "CRM",
    client: "Navanagara House Building Society",
    title: "A management dashboard for a housing society",
    summary:
      "A single dashboard for members, site bookings, receipts, and payments — with invoice statistics and reports the team actually uses.",
    image: "/images/case-studies/navanagara-society.avif",
    industry: "Housing Society",
    role: "Product design + build",
    services: ["Dashboard Design", "Web Development", "Admin Tooling"],
    stack: ["React", "Node.js", "MongoDB"],
    overview:
      "The society was juggling members, site bookings, receipts, and payments across scattered records. We built one dashboard to run it all — clear overviews, invoice statistics, and recent transactions at a glance.",
    approach: [
      "Designed an overview-first dashboard surfacing members, bookings, transactions, and receipts.",
      "Built member, receipt, and payment management with reports and invoice statistics.",
      "Kept the interface simple enough for non-technical admins to run day to day.",
    ],
    results: [
      "Members, bookings, and payments managed in one place instead of scattered records.",
      "Clear invoice statistics and reporting for faster, confident decisions.",
    ],
    deliverables: ["Admin dashboard", "Member management", "Booking & receipts", "Payments & reports", "Invoice statistics"],
  },

  // ── CRM — Skyup CRM ───────────────────────────────────────────────────
  {
    id: 6,
    slug: "skyup-crm",
    category: "CRM",
    client: "Skyup Digital Solutions",
    title: "A CRM that runs the whole agency",
    summary:
      "Lead management, campaign tracking, communications, and attendance — a single CRM built in-house to run agency operations end-to-end.",
    image: "/images/case-studies/skyup-crm.avif",
    industry: "Digital Marketing",
    role: "Product design + build",
    services: ["CRM", "Lead Management", "Campaign Tracking", "Communications"],
    stack: ["React", "Node.js", "MongoDB", "MSG91"],
    overview:
      "Skyup needed one system to run the agency: capturing and moving leads through a pipeline, tracking campaigns across Google and Meta, handling WhatsApp/Email/SMS communications, and even team attendance.",
    approach: [
      "Built a lead pipeline with status tracking, reports, and conversion visibility.",
      "Integrated campaign performance across Google and Meta into one report view.",
      "Unified communications (WhatsApp, Email, SMS) and added attendance management.",
    ],
    results: [
      "A single source of truth for leads, campaigns, communications, and team ops.",
      "Faster follow-up and clearer visibility into what's actually converting.",
    ],
    deliverables: ["Lead management", "Pipeline & reports", "Campaign tracking", "Unified communications", "Attendance management"],
  },
];
