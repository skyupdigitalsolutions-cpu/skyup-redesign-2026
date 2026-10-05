// Case studies data — single source of truth for the Work page.
// Put images in public/images/case-studies/ and reference with a leading slash.
// Any study without an `image` falls back to the gradient cover automatically.

export const COVERS = [
  "from-[#0037CA] to-[#3D6BF0]",
  "from-[#002896] to-[#1b60f4]",
  "from-[#1b60f4] to-[#87b6f4]",
  "from-[#0037CA] to-[#002896]",

  // ── Web Development — The Vector Graphics ─────────────────────────────
  {
    id: 7,
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

  // ── Web Development — Novara Nature Estate ────────────────────────────
  {
    id: 8,
    slug: "novara-nature-estate-2",
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
      "Novara sells managed farmland — a high-consideration purchase researched over weeks, mostly on mobile.",
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
];

export const CASE_STUDIES = [

  // ── Software Development — Abhicabs ───────────────────────────────────
  {
    id: 1,
    slug: "abhicabs-transport-erp",
    category: "Software Development",
    client: "Abhicabs",
    title: "Transport ERP that centralises fleet operations",
    summary:
      "A custom Transport ERP built to unify fleet management, dispatch, driver records, billing and customer operations — all in one platform.",
    image: "/images/case-studies/abhicabs-transport-erp.avif",
    industry: "Transport & Logistics",
    role: "Product design + build",
    services: ["Custom ERP", "Transport Management", "Fleet Operations", "Billing System", "Driver Management"],
    stack: ["React", "Node.js", "MongoDB"],
    overview:
      "Abhicabs was managing fleet bookings, dispatch, driver records, vehicle tracking, routes, billing and customer data across disconnected systems. We built a unified Transport ERP aligned to their exact workflow.",
    approach: [
      "Mapped Abhicabs existing transport workflow end-to-end before designing a single feature.",
      "Built booking, dispatch and fleet management into one operational hub with real-time visibility.",
      "Integrated billing and customer management to eliminate manual reconciliation.",
    ],
    results: [
      "Centralised transport operations replacing multiple disconnected tools.",
      "Faster dispatch and improved driver and vehicle tracking in one platform.",
      "Streamlined billing and customer management reducing manual work.",
    ],
    deliverables: ["Booking & dispatch", "Fleet management", "Driver records", "Vehicle tracking", "Billing system", "Customer management"],
  },

  // ── Software Development — Spotek ─────────────────────────────────────
  {
    id: 2,
    slug: "spotek-crm-invoice",
    category: "Software Development",
    client: "Spotek",
    title: "CRM and invoicing unified in one system",
    summary:
      "A combined CRM and Invoice Software connecting customer management, sales workflows and billing — with WhatsApp automation for follow-ups and communication.",
    image: "/images/case-studies/spotek-crm-invoice.avif",
    industry: "Business Software",
    role: "Product design + build",
    services: ["Custom CRM", "Invoice Software", "WhatsApp Automation", "Sales Workflow"],
    stack: ["React", "Node.js", "MongoDB", "MSG91"],
    overview:
      "Spotek was handling sales, customer management and billing separately — making it difficult to track leads, customers, invoices and payments. Manual follow-ups and fragmented communication reduced team efficiency.",
    approach: [
      "Unified customer management, sales workflows and billing into a single connected system.",
      "Built invoice tracking and payment visibility alongside the CRM pipeline.",
      "Added WhatsApp automation for follow-ups, reminders, updates and customer notifications.",
    ],
    results: [
      "Sales, customer management and billing connected in one platform.",
      "Automated WhatsApp follow-ups reducing manual communication load.",
      "Improved lead and payment tracking with full pipeline visibility.",
    ],
    deliverables: ["CRM pipeline", "Invoice management", "Payment tracking", "WhatsApp automation", "Customer communication"],
  },

  // ── CRM — Navanagara House Building Society ───────────────────────────
  {
    id: 3,
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
    id: 4,
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

  // ── PPC — Rathna Bhoomi Developers ────────────────────────────────────
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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

  // ── Web Development — Novara Nature Estate ────────────────────────────
  {
    id: 8,
    slug: "novara-nature-estate-2",
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
      "Novara sells managed farmland — a high-consideration purchase researched over weeks, mostly on mobile.",
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
];
