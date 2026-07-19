import {
  Search,
  Share2,
  Target,
  Mail,
  Bot,
  BrainCircuit,
  PenTool,
  Palette,
  Code2,
  Users,
  Video,
} from "lucide-react";

export const SERVICES = [
  // ─────────────────────────────────────────────────────────── SEO ──
  {
    slug: "seo",
    name: "SEO",
    Icon: Search,
    href: "/service/seo",
    from: "#FEF3C7",
    to: "#FFEDD5",
    accent: "#F59E0B",
    tagline:
      "Higher rankings, real buyers — not just browsers. We build permanent traffic that keeps compounding.",
    items: [
      "Technical SEO — speed, crawlability, schema",
      "On-page — content, meta, internal linking",
      "Content strategy — topic clusters & keyword mapping",
      "Link building — high-DA outreach",
      "Local SEO — Google Business Profile & citations",
      "Reporting — monthly rank tracking & analytics",
    ],
    heroHeadline: "Rank Higher, Get Found, Grow Faster with Expert SEO",
    heroSubline:
      "We build SEO that keeps working while you sleep. As an SEO agency in Bangalore, Skyup focuses on lasting visibility, stronger rankings, and measurable business growth.",
    painPoints: {
      title: "Your competitors are ranking. You're stuck on page 3.",
      intro:
        "You've posted blogs. Maybe hire a freelancer. But traffic stays flat, leads don't come from search, and nobody can explain why. It's frustrating—and it's fixable.",
      points: [
        {
          title: "Not visible on Google",
          desc: "If you're not on Google's first page, you're invisible to 90% of searchers. Smart companies invest in SEO to get discovered where their customers are already looking.",
        },
        {
          title: "Content that goes nowhere",
          desc: "Blogs built without SEO keyword research, a bad structure, or a weak technical SEO foundation.",
        },
        {
          title: "No reporting, no clarity",
          desc: "You don’t know what’s working. Old agency reports were extremely difficult. We make each SEO audit report simple, so you always know where you stand for growth.",
        },
        {
          title: "Locked into contracts",
          desc: "Paying month after month with no evidence your SEO services in Bangalore are going the right direction?",
        },
      ],
    },
    offerings: {
      title: "Visibility That Covers All Corners of Your SEO",
      points: [
        {
          title: "Technical SEO Audit & Fixes",
          desc: "We crawl your site to determine what is causing your website to slow down or even prevent Google from crawling it. Faster load times, a cleaner structure, and improved crawlability with advanced technical SEO improvements and professional SEO audit tools.",
        },
        {
          title: "Keyword Research & Strategy",
          desc: "We find out what your buyers are searching for. The keywords we target with our SEO are keywords with high intent, which means that these keywords will generate the traffic that is relevant, not random.",
        },
        {
          title: "On-Page Optimisation",
          desc: "Whether it's the type of tags or internal links, all the pages are holding the search engines hostage as authoritative. Smart on-page SEO utilizes your existing content and optimises it.",
        },
        {
          title: "Content Strategy & Creation",
          desc: "We craft strategic content that ranks, performs, and converts. Every piece aligns search intent with business goals and proven tactics, creating a cohesive content ecosystem where each asset supports and strengthens the others.",
        },
        {
          title: "Link Building",
          desc: "Outreach and digital PR efforts will result in links pointing to our website, either organically or by us reaching out to other sites to offer our own. Off-Page SEO helps build your website's authority — which will help grow your ranking potential. ",
        },
        {
          title: "Local SEO",
          desc: "We optimize your business for local searches, making it easy for nearby customers to find you on Google Search and Maps. Through local keywords, Google Business Profile, and citations, we drive more calls, leads, and visitors to you.",
        },
        {
          title: "E-Commerce SEO",
          desc: "Simplified product pages, category pages, and site structure for D2C brands. Increased organic product discovery, reduced ad spend, and increased SEO ranking performance.",
        },
        {
          title: "Monthly SEO Reporting",
          desc: "Monthly reporting of dashboards, rankings, traffic, and leads in a non-technical way. Only the numbers that impact your business.",
        },
      ],
    },
    processIntro:
      "Yes, we are an SEO agency in Bangalore and have a scientific approach to SEO and follow data-driven processes so that we can ensure consistent and measurable results to each and every client.",
    process: [
      {
        title: "Website SEO Audit",
        desc: "We analyze your website and its technical condition, on-page parameters, website quality, profile of backlinks, and competitive analysis. It means that you have a goal, and a goal is accompanied by the things that you’re going to do to overcome it. ",
      },
      {
        title: "Keyword Research & Mapping",
        desc: "Our SEO specialists have the capacity and expertise to perform an extensive keyword analysis to find the high-priority, high-intent keyword phrases your audience is searching for. Then we put keywords on the right pages of your website, and we do it strategically.",
      },
      {
        title: "SEO Strategy & Planning",
        desc: "The results of these plus keyword research help us develop a customized SEO strategy, which in the short term will provide us with immediate results but in the long term, better ranking. Your tactics will depend on your objectives, competitors, and industry.",
      },
      {
        title: "On-Page Optimisation",
        desc: "All on-page optimizations performed in the audit, including all optimized content, fixes, optimized navigational links, etc., are performed.",
      },
      {
        title: "Off-Page SEO & Link Building",
        desc: "We use white hat off-page SEO techniques to get good quality backlinks from authoritative and relevant sites, which help enhance search ranking and domain authority.",
      },
      {
        title: "Reporting & Continuous Improvement",
        desc: "Unabridged monthly reports on keywords, visits, leads, and ROI will be provided. SEO marketing is a continuous process — we continuously work on strategies based on the real data.",
      },
    ],
    whyChooseUs: {
      title: "Why brands choose Skyup for SEO",
      points: [
        {
          title: "You always know what you're paying for",
          desc: "There are no optimizations; all deliverables are known in advance.",
        },
        {
          title: "No pressure, no lock-in",
          desc: "Our work is on a monthly basis. If we are not delivering, then you can walk away. We can assure you we don't lock you into a contract.",
        },
        {
          title: "ROI is the only metric we care about",
          desc: "We’re not gamblers. We measure organic traffic, qualified leads, revenue influence, and the tangible benefits of SEO and how they translate to your business.",
        },
        {
          title: "Industry-leading tools, real expertise",
          desc: "We leverage Ahrefs, Semrush, Screaming frog, Google Analytics, and more — but strategy always leads. As Bangalore's results-driven SEO experts, we use the right tools, not the most tools.",
        },
      ],
    },
    // Case study removed pending a real, verifiable client result (EEAT).
    // Do not add invented metrics (traffic, ad spend, backlink counts, etc.).
    caseStudy: null,
    // Testimonial removed pending a real, attributable client quote (EEAT).
    testimonial: null,
    faqTitle: "Honest answers to your questions",
    faqs: [
      {
        q: "Why is SEO important for businesses?",
        a: "SEO marketing helps businesses increase online visibility, attract qualified traffic, and generate long-term organic leads. One of the biggest advantages of SEO is that it continues delivering traffic even after content is published — unlike paid ads that stop the moment your budget runs out.",
      },
      {
        q: "How long does SEO take to show results?",
        a: "Most websites begin seeing early SEO ranking improvements within 6–12 weeks. Competitive industries may take longer, but SEO creates sustainable long-term growth.",
      },
      {
        q: "What are the different types of SEO?",
        a: "The main types are On-Page SEO, Technical SEO, Off-Page SEO, Local SEO, and E-Commerce SEO. Each plays a role in improving search visibility and website performance.",
      },
      {
        q: "What is included in an SEO audit?",
        a: "An SEO audit checks your website's technical health, page structure, keyword optimization, backlinks, speed, mobile performance, and indexing issues. Professional SEO audit tools help identify what's limiting your rankings.",
      },
      {
        q: "What are SEO backlinks?",
        a: "SEO backlinks are links from other websites pointing to yours. High-quality backlinks are a core part of off-page SEO and help improve your website's authority and search engine rankings.",
      },
      {
        q: "What is SEO keyword research?",
        a: "SEO keyword research is the process of finding the exact words and phrases your target audience searches on Google. Proper keyword research underpins both on-page SEO and content strategy to attract relevant traffic.",
      },
      {
        q: "What makes Skyup a trusted SEO company in Bangalore?",
        a: "As a dedicated SEO agency in Bangalore, Skyup focuses on transparent reporting, ROI-driven strategies, technical SEO expertise, and long-term organic growth—without lock-in contracts.",
      },
      {
        q: "What are the benefits of SEO compared to paid ads?",
        a: "Unlike paid ads, SEO continues generating traffic without paying for every click. The benefits of SEO include better brand visibility, consistent leads, improved trust, and lower long-term acquisition costs.",
      },
      {
        q: "What is SEO optimization?",
        a: "SEO optimization is the process of improving website pages, content, and technical performance to help them rank higher in search engines and attract more relevant visitors.",
      },
      {
        q: "Do small businesses need SEO marketing?",
        a: "Absolutely. SEO marketing helps small businesses compete with larger brands by targeting niche keywords, local searches, and high-intent customer queries—making it one of the most cost-effective channels available.",
      },
    ],
    cta: {
      title: "Ready to stop paying for every click?",
      subtitle:
        "No contracts. No jargon. Just a free audit and a plan that makes sense.",
    },
    related: [
      {
        slug: "graphic-design",
        desc: "Great content needs great visuals. Design makes your blogs readable and your brand memorable — and supports your SEO.",
      },
      {
        slug: "web-development",
        desc: "A poorly structured site caps your technical SEO. We fix it at the root.",
      },
      {
        slug: "performance-marketing",
        desc: "Run PPC while SEO gains traction, so you capture leads across the whole funnel.",
      },
    ],
  },

  // ─────────────────────────────────────────── Social Media Marketing ──
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    Icon: Share2,
    href: "/service/social-media-marketing",
    from: "#E0F2FE",
    to: "#F0F9FF",
    accent: "#0EA5E9",
    tagline:
      "Turn followers into fans and fans into buyers. We build communities that actually care about your brand.",
    items: [
      "Social strategy — platform choice & content calendar",
      "Content creation — writing, design & video",
      "Community management — comments, DMs, engagement",
      "Paid social — lead, sales & awareness campaigns",
      "Analytics — reach, engagement & conversion tracking",
    ],
    socialPlatforms: {
      title: "Social Media Platforms We Manage",
      note: "Not all brands need to be on all platforms, so we determine the appropriate mix for your business based on your audience, industry, and goals.",
      items: [
        { name: "Instagram", icon: "/images/instagram.svg" },
        { name: "Facebook", icon: "/images/facebook.svg" },
        { name: "Youtube", icon: "/images/youtube.svg" },
        { name: "Twitter", icon: "/images/Twitter.svg" },
        { name: "Pinterest", icon: "/images/Pinterest.svg" },
      ],
    },
    heroHeadline:
      "Grow Faster with Professional Social Media Marketing Services in Bangalore",
    heroSubline:
      "Drive real business growth with data-driven social media strategies for businesses and brands in Bangalore. At Skyup Digital Solutions we don’t just manage your social media, we make it your most powerful sales and branding channel. ",
    painPoints: {
      title:
        "Your competitors are getting attention. You’re still posting with no leads.",
      intro:
        "You’ve posted reels, creatives, and offers. Maybe even hired a designer. But reach stays low, enquiries don’t come, and nobody knows what content is actually working. It’s frustrating — and it’s fixable.",
      points: [
        {
          title: "Posting but no enquiries",
          desc: "You’re active on social media, but your posts are not turning viewers into calls, WhatsApp messages, or leads. Without the right content strategy, posting becomes activity without business results.",
        },
        {
          title: "Low reach and engagement",
          desc: "Your content is not reaching the right audience, or people are scrolling past without taking action. Strong social media needs hooks, storytelling, consistency, and platform-specific content.",
        },
        {
          title: "Good designs, weak strategy",
          desc: "Attractive posts alone don’t generate customers. Your content needs a clear message, customer pain points, service positioning, trust-building, and a strong call-to-action.",
        },
        {
          title: "No tracking, no clarity",
          desc: "You don’t know which post, reel, campaign, or platform is bringing enquiries. Without proper reporting, you keep posting randomly without knowing what is actually growing your business.",
        },
      ],
    },
    offerings: {
      title: "Our Social Media Marketing Services in Bangalore",
      subtitle:
        "Skyup Digital Solutions, a social media marketing agency in Bangalore offers social media marketing solutions, and is focused on performance, not activity. Every strategy we have is based upon your business goals, your audience's actions and intelligence provided by the platform.",
      points: [
        {
          title: "Social Media Strategy & Content Planning",
          desc: "We develop platform strategies based on research, competitor analysis, and keyword intelligence. This includes your content pillars, posts schedule, brand voice and a monthly content calendar; so that your team never has to panic for ideas.",
        },
        {
          title: "Content Creation — Short-Form Video, Reels & Graphics",
          desc: "We create platform-specific content strategies that are informed by audience research, competitor analysis, and keyword intelligence. This means deciding what your content pillars are, how often you’re going to post, what your brand voice will be, and creating a content calendar on a monthly basis — so your team isn’t left scrambling to come up with ideas.",
        },
        {
          title: "Community Management & Audience Engagement",
          desc: "Attracting followers is just as crucial as cultivating a loyal community. All comments, DMs, mentions and conversations in the community are managed, helping you to be responsive, human and trustworthy at all times.",
        },
        {
          title: "Paid Social Media Advertising",
          desc: "Our paid social team builds and deploys social media ads that meet our client's objectives – whether it's getting them qualified leads, sales, or brand awareness, all of which at an optimal cost per qualified lead (CQL). Continuous monitoring, streamlining and recording of all currencies.",
        },
        {
          title: "Analytics, Reporting & Optimisation",
          desc: "We're not just giving you vanity metrics. Our monthly reports provide you with high-level metrics of reach, engagement rate, lead quality, cost per lead, follower growth and conversion attribution so you can see ROI and know what to do next every month.",
        },
      ],
    },
    processIntro:
      "All Skyup Digital Solutions client engagements have a proven, repeatable process that removes any guesswork and guarantees your social media investment provides compounding returns.",
    processTitle: "How We Work — Our 5-Step Social Media Marketing Process",
    process: [
      {
        title: "Discovery & Social Media Audit",
        desc: "We start with an in-depth review of your current social media footprint – identifying what's successful, what isn't and where your greatest potential is. You are compared with the competition in Bangalore and your industry.",
      },
      {
        title: "Goal Setting & Strategy Development",
        desc: "Based on the audit insight, we set clear KPIs (reach, engagement, lead volume, cost per lead or revenue) and develop a strategy that can be executed over a 90-day period that is aligned to your business goals. You will be shown this strategy for your review prior to creating any content.",
      },
      {
        title: "Content Creation & Calendar Approval",
        desc: "All content is created in an isolated batch session for quality and consistency. Each post is reviewed and approved before it's published, so you always have the final say on what's created, and we take the burden of doing the work.",
      },
      {
        title: "Publishing, Engagement & Community Building",
        desc: "They're published at the optimum time for algorithmic reach, they're actively involved with your audience and they're responding to inbound requests on all channels, meaning your social pages are live business tools.",
      },
      {
        title: "Measure, Report & Optimise",
        desc: "Every month we send you a simple performance report that gives you the main metrics, the insights and our recommended optimisations for the next month. Strategy is always evolving, we tailor it as platform evolves and audience behaviour changes.",
      },
    ],
    whyChooseUs: {
      title:
        "Why Choose Skyup Digital Solutions as Your Social Media Marketing Agency in Bangalore?",
      points: [
        {
          title: "Content That Engages & Converts",
          desc: "Our team produces creative pieces, reels, videos and engaging copy that engage and inspire response.",
        },
        {
          title: " Platform-Specific Expertise",
          desc: "From Facebook and Instagram to LinkedIn and YouTube, we tailor campaigns to each platform for maximum reach and engagement.",
        },
        {
          title: "Performance Tracking & Reporting",
          desc: "All campaigns are data supported. Key metrics monitored, performance analysed and strategies optimised for better results.",
        },
        {
          title: "Lead Generation Focus",
          desc: "We develop social media marketing campaigns that attract the right visitors to your site, capture leads and enhance your conversions for your business.",
        },
      ],
    },
    // Case study & testimonial removed pending real, verifiable SMM results (EEAT).
    caseStudy: null,
    testimonial: null,
    faqTitle: "Frequently asked questions about social media marketing",
    faqs: [
      {
        q: "What is social media marketing?",
        a: "Social media marketing is planning, creating, and managing content and paid campaigns across platforms like Instagram, Facebook, YouTube, and LinkedIn to build audience, engagement, and leads for your business.",
      },
      {
        q: "Which social media platforms should my business be on?",
        a: "It depends on your audience and industry. We recommend a focused mix rather than every platform — for example Instagram and Facebook for D2C and local businesses, LinkedIn for B2B, and YouTube for video.",
      },
      {
        q: "How often should we post on social media?",
        a: "Consistency matters more than volume. We plan a monthly content calendar with a sustainable posting frequency per platform, based on your goals and capacity.",
      },
      {
        q: "Does social media marketing generate leads, not just followers?",
        a: "Yes. With the right content strategy, clear calls-to-action, and tracking, social media can drive enquiries, WhatsApp messages, and qualified leads — not just vanity metrics.",
      },
      {
        q: "What is the difference between organic and paid social media?",
        a: "Organic social builds audience and trust through regular content, while paid social uses ad budget to reach targeted audiences faster. Most brands use both together.",
      },
      {
        q: "Do you create the content, or do we?",
        a: "We handle strategy, content creation (graphics, reels, and copy), scheduling, and community management. You approve the monthly calendar before anything is published.",
      },
      {
        q: "How do you measure social media marketing results?",
        a: "We report on reach, engagement, follower growth, lead volume, and cost per lead each month — the metrics tied to business outcomes, not just likes.",
      },
      {
        q: "How is social media marketing different from performance marketing?",
        a: "Social media marketing builds an engaged audience and brand presence across platforms; performance marketing focuses on paid campaigns optimised purely for measurable conversions. They work best together.",
      },
    ],
    cta: {
      title: "Ready to turn social media into a growth channel?",
      subtitle:
        "Get a free social media audit and a content plan built around your business goals — no lock-in, no vanity metrics, just content that drives enquiries.",
    },
    related: [
      {
        slug: "graphic-design",
        desc: "Scroll-stopping creative is the heart of social. We design the visuals and reels that make your brand stand out.",
      },
      {
        slug: "performance-marketing",
        desc: "Ready to scale beyond organic? We turn your best-performing content into targeted paid social campaigns.",
      },
      {
        slug: "seo",
        desc: "Pair social reach with organic search, so customers find you whether they're scrolling or searching.",
      },
    ],
  },

  // ───────────────────────────────────────────── Performance Marketing ──
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    Icon: Target,
    href: "/service/performance-marketing",
    from: "#DBEAFE",
    to: "#EFF6FF",
    accent: "#0037CA",
    tagline:
      "Every rupee tracked. Google, Meta and LinkedIn ads optimised to drive revenue, not just clicks.",
    items: [
      "Google Ads — Search, Shopping, Display, YouTube",
      "Meta Ads — Facebook & Instagram campaigns",
      "LinkedIn Ads — B2B lead generation",
      "Full attribution — GA4, Pixel & CAPI tracking",
      "Landing pages — built for Quality Score & conversion",
      "Weekly optimisation & transparent reporting",
    ],
    heroHeadline:
      "Performance marketing that turns ad spend into measurable revenue",
    heroSubline:
      "We're built for one goal: making every ad rupee count. Our performance marketing is about action — clicks, leads, conversions, and revenue. Not impressions. Not guesswork. Results.",
    // Stats removed pending real, verifiable figures (EEAT). Do not display client
    // counts, ad spend, ROAS, or CPL numbers until they can be substantiated.
    statsTitle: "Performance at a glance",
    stats: [],
    overview: [
      "Performance marketing is advertising where you only pay for measurable actions — a click, a lead, a sale, or an install — and it's driven by data. Unlike traditional advertising, you don't spend up front and hope; every channel is held accountable to a clear business metric.",
      "As a performance marketing agency in Bangalore, we run paid campaigns on Google Ads, Meta Ads, and LinkedIn Ads — all connected to a single attribution stack, so you always know what's working. The outcome: you stop funding guesswork and start funding growth that compounds month after month.",
    ],
    benefitsTitle: "Why performance marketing beats traditional advertising",
    benefits: [
      {
        title: "Pay only for outcomes",
        desc: "Your budget pays for clicks, leads, and conversions — not just eyeballs. We cut wasted impressions from your media plan.",
      },
      {
        title: "Complete attribution visibility",
        desc: "See exactly which keyword, creative, or audience led to each sale, down to the last touchpoint.",
      },
      {
        title: "Real-time optimisation",
        desc: "Campaigns can be paused, scaled, or redirected within hours — no fixed spends you can't control mid-flight.",
      },
    ],
    offerings: {
      title: "Our performance marketing services — Google, Meta & LinkedIn Ads",
      points: [
        {
          title: "Google Ads — capture demand at the moment of intent",
          desc: "Search, Shopping & Performance Max, Display & remarketing, and YouTube — plus Smart Bidding (Target ROAS/CPA). Every campaign optimised for Quality Score, lower CPC, and conversions, with product-level ROAS tracking for e-commerce.",
        },
        {
          title: "Meta Ads — scale revenue on Facebook & Instagram",
          desc: "Full-funnel TOFU/MOFU/BOFU strategy, lookalike and retargeting audiences, systematic creative testing (8-12 variants per cycle), DPA & catalogue for e-commerce, and server-side Pixel + CAPI for clean post-iOS tracking.",
        },
        {
          title: "LinkedIn Ads — B2B lead generation that fills your pipeline",
          desc: "Account setup and funnel strategy, sponsored content, Lead Gen Forms, Message & Conversation Ads, ABM and job-title targeting, plus retargeting — tuned for consistent, lower CPL.",
        },
      ],
    },
    process: [
      {
        title: "Discovery & Full Account Audit",
        desc: "We review existing Google, Meta, and LinkedIn accounts, your GA4 link, conversion funnel, and past CPL/ROAS — spotting budget leaks, tracking gaps, and quick wins before a rupee is spent.",
      },
      {
        title: "Strategy & Channel Planning",
        desc: "An account-level strategy targeting your CAC, LTV, and funnel stages — with budget split across channels and KPI targets, audience strategy, and creative briefs per channel.",
      },
      {
        title: "Creative, Copy & Landing Page Development",
        desc: "Our team produces ad copy and creative for every channel in parallel, plus dedicated landing pages built for Quality Score and conversion rate.",
      },
      {
        title: "Launch, Track & Optimise in Real Time",
        desc: "Campaigns go live with full Pixel, GA4, and CRM tracking. Bids, audiences, and creatives are adjusted daily, with weekly performance calls — no surprises.",
      },
      {
        title: "Scale Winners, Kill Losers, Report Clearly",
        desc: "We scale winning campaigns to hit ROAS and CPL targets, and report monthly on spend, revenue, ROAS, CPL, and clear next steps per channel.",
      },
    ],
    toolsTitle: "Tools & integrations we use",
    tools: [
      "Google Keyword Planner",
      "Google Ads Editor",
      "GA4 + Google Ads linking",
      "Google Merchant Center",
      "Looker Studio",
      "Google Tag Manager",
      "Meta Ads Manager",
      "Meta Business Suite",
      "Meta Conversions API",
      "LinkedIn Campaign Manager",
      "LinkedIn Insight Tag",
      "Matched Audiences",
    ],
    faqTitle: "Frequently asked questions about performance marketing",
    faqs: [
      {
        q: "What are Google Ads?",
        a: "Paid advertisements that appear on Google Search, YouTube, the Display Network, and partner sites to generate leads, traffic, and sales.",
      },
      {
        q: "How much budget is needed for Google Ads?",
        a: "It depends on your industry, competition, and goals. Most businesses start with a scalable monthly budget based on target CPL or ROI.",
      },
      {
        q: "How long does Google Ads take to show results?",
        a: "Google Ads can start generating traffic within days, while optimised conversion performance usually improves within 30-90 days.",
      },
      {
        q: "What are Meta Ads?",
        a: "Paid campaigns across Facebook and Instagram to increase brand awareness, traffic, leads, and online sales.",
      },
      {
        q: "Are Meta Ads good for lead generation?",
        a: "Yes — they're highly effective using advanced audience targeting, retargeting, and conversion-focused creatives.",
      },
      {
        q: "Which businesses benefit most from Meta Ads?",
        a: "E-commerce, real estate, coaches, local businesses, and D2C brands benefit significantly from Facebook and Instagram advertising.",
      },
      {
        q: "What are LinkedIn Ads used for?",
        a: "Mainly B2B marketing, lead generation, recruitment, brand awareness, and targeting decision-makers.",
      },
      {
        q: "Are LinkedIn Ads better for B2B?",
        a: "Yes — they offer precise targeting by job title, industry, and company size, making them ideal for B2B campaigns.",
      },
      {
        q: "How expensive are LinkedIn Ads vs Google or Meta?",
        a: "LinkedIn usually has a higher CPC, but it often generates higher-quality B2B leads and better decision-maker targeting.",
      },
      {
        q: "What is performance marketing?",
        a: "A digital marketing strategy where campaigns are optimised around measurable results — leads, conversions, sales, and ROI.",
      },
    ],
    cta: {
      title: "Stop wasting ad spend.",
      subtitle:
        "Our free performance marketing audit shows exactly where your spend is being wasted — and a clear, channel-by-channel plan to fix it. No lock-in. No inflated retainers.",
    },
    related: [
      {
        slug: "seo",
        desc: "Run paid while SEO compounds, capturing demand now and lowering acquisition cost over time.",
      },
      {
        slug: "graphic-design",
        desc: "Creative is the biggest lever in paid performance. We produce ad creative built to convert.",
      },
      {
        slug: "web-development",
        desc: "High-converting landing pages turn your clicks into leads instead of bounces.",
      },
    ],
  },

  // ─────────────────────────────────────────────────── AI Automation ──
  {
    slug: "ai-automation",
    name: "AI Automation",
    Icon: Bot,
    href: "/service/ai-automation",
    from: "#EDE9FE",
    to: "#F5F3FF",
    accent: "#7C3AED",
    tagline:
      "Stop doing the same work twice. We automate your marketing, ops and customer workflows using AI.",
    items: [
      "AI chatbots & virtual assistants",
      "Lead generation & CRM automation",
      "WhatsApp & voice AI agents",
      "Document processing automation",
      "Workflow automation across systems",
      "AI customer support & booking automation",
    ],
    heroHeadline:
      "Stop doing it manually. Start scaling with AI automation in Bangalore.",
    heroSubline:
      "We're the trusted AI automation company helping Bangalore businesses automate repetitive tasks, drive growth, and harness the real potential of AI — without the technical mess.",
    painPoints: {
      title: "Is your team stuck doing work AI can handle in seconds?",
      intro:
        "Repetitive tasks cost you days and hours every year — time you could invest in strategy, growth, and customer experience. The good news: much of that work can be automated with AI.",
      points: [
        {
          title: "Manual lead follow-up",
          desc: "Your sales team follows up with every lead by hand instead of using AI workflow automation.",
        },
        {
          title: "Hours lost to marketing busywork",
          desc: "Scheduling, reporting, and posting eat time that's perfectly suited to AI marketing automation.",
        },
        {
          title: "Copy-paste between systems",
          desc: "Your ops team moves data between tools that should talk to each other automatically.",
        },
        {
          title: "No real-time visibility",
          desc: "Reporting is still manual, so you can't see performance as it happens.",
        },
        {
          title: "Can't scale without hiring",
          desc: "You want to grow but can't afford five more people just to handle volume.",
        },
      ],
    },
    offerings: {
      title: "Our AI automation services in Bangalore",
      points: [
        {
          title: "AI Chatbots & Virtual Assistants",
          desc: "Instant, intelligent customer interactions — automate conversations, answer queries, and deliver 24/7 support across channels.",
        },
        {
          title: "Lead Generation & CRM Automation",
          desc: "Capture, qualify, and manage leads automatically while keeping your CRM updated in real time.",
        },
        {
          title: "WhatsApp Business Automation",
          desc: "AI-powered WhatsApp that manages inquiries, books appointments, follows up leads, and responds instantly at scale.",
        },
        {
          title: "Voice AI Agents",
          desc: "Human-first voice agents that answer calls, schedule appointments, and handle support 24/7 while cutting costs.",
        },
        {
          title: "Document Processing Automation",
          desc: "Extract, process, and organise business documents with AI — less manual effort, more accuracy and speed.",
        },
        {
          title: "Workflow Automation",
          desc: "Automate processes across departments and systems to increase efficiency, reduce errors, and enable seamless operations.",
        },
        {
          title: "AI-Powered Customer Support",
          desc: "Faster, more personalised service through AI-driven responses and smart ticket handling.",
        },
        {
          title: "Appointment & Booking Automation",
          desc: "Automated scheduling, reminders, and calendar management — easier for customers, fewer no-shows.",
        },
        {
          title: "Custom AI Automation Solutions",
          desc: "Bespoke automation fitted to your processes and daily routine, designed to scale your business smarter.",
        },
      ],
    },
    process: [
      {
        title: "Free AI Automation Audit",
        desc: "A free strategy session to understand your business, tools, and biggest pain points — followed by a deep dive into your workflows and a customised roadmap within 48 hours.",
      },
      {
        title: "Custom AI Blueprint & Design",
        desc: "Our architects map a bespoke workflow and system design — every touchpoint, integration, and trigger — delivered as a clear, jargon-free blueprint before a line of code is written.",
      },
      {
        title: "Build, Test & Launch",
        desc: "Our specialists build, QA, and deploy your full system, with team training, complete documentation, and 30 days of post-launch monitoring and optimisation.",
      },
    ],
    // Stats removed pending real, verifiable figures (EEAT). Do not display
    // time-saved, pipeline-growth, or QA-reduction numbers until substantiated.
    statsTitle: "Real results from our AI automation",
    stats: [],
    whyChooseUs: {
      title: "Why Bangalore businesses choose Skyup for AI automation",
      points: [
        {
          title: "Local team, real context",
          desc: "A Bangalore-based team with deep understanding of Indian business workflows, tools, and compliance.",
        },
        {
          title: "Glass-box, you own it",
          desc: "Full documentation and no black boxes — you own every automation we build.",
        },
        {
          title: "Live in 48-72 hours",
          desc: "First automation live within days, not six-week agency timelines (for standard workflows).",
        },
        {
          title: "Senior hands, no handoffs",
          desc: "No junior handoffs or offshore surprises — senior expertise from the foundation up.",
        },
        {
          title: "Tied to measurable outcomes",
          desc: "Every automation is built around a clear business metric, so you can measure its impact rather than take it on faith.",
        },
      ],
    },
    // Testimonials removed pending real, attributable client quotes (EEAT).
    testimonials: [],
    faqTitle: "Frequently asked questions about our AI automation services",
    faqs: [
      {
        q: "What are AI automation services?",
        a: "They use AI to handle repetitive business tasks automatically — saving time, reducing errors, and helping you scale without hiring more staff.",
      },
      {
        q: "How does a local AI automation company help?",
        a: "A Bangalore-based company understands your market, tools, and environment, and eliminates manual work across sales, marketing, and ops — with support a call away.",
      },
      {
        q: "What is AI workflow automation?",
        a: "It connects your tools and systems so data moves and tasks trigger automatically — no manual copy-pasting, follow-ups, or reporting.",
      },
      {
        q: "What is AI marketing automation?",
        a: "It runs your email campaigns, lead nurturing, social posting, and reporting on autopilot, delivering personalised communication at scale.",
      },
      {
        q: "Do I need technical knowledge?",
        a: "No. We handle design, build, testing, and training — you get the results without touching code.",
      },
      {
        q: "How long does it take to go live?",
        a: "Most clients are live within 2-4 weeks of their first strategy call, depending on workflow complexity.",
      },
      {
        q: "What is AI in automation testing?",
        a: "It uses machine learning to generate and run software test cases automatically — reducing QA time and catching bugs faster than manual testing alone.",
      },
      {
        q: "Which industries do you serve?",
        a: "All industries — e-commerce, real estate, healthcare, SaaS, professional services, education, and manufacturing.",
      },
      {
        q: "How much do AI automation services cost?",
        a: "It depends on scope and workflows. We offer a free AI audit first, so you know exactly what's needed before any investment.",
      },
      {
        q: "Why choose Skyup for AI automation?",
        a: "A proven, Bangalore-based team with deep expertise in AI automation, delivering measurable results through a transparent, no-obligation process.",
      },
    ],
    cta: {
      title: "Get your free AI automation audit today",
      subtitle:
        "Book a free 30-minute strategy call. No commitment, no jargon — just a clear picture of what AI automation can do for your business.",
    },
    related: [
      {
        slug: "web-development",
        desc: "Connect automations to your website and apps with the right integrations and endpoints.",
      },
      {
        slug: "performance-marketing",
        desc: "Automate lead capture, follow-up, and reporting so every paid campaign runs with less manual work.",
      },
      {
        slug: "social-media-marketing",
        desc: "Automate scheduling, responses, and DMs so your social presence runs consistently at scale.",
      },
    ],
  },

  // ───────────────────────────────────────────────────── UI/UX Design ──
  {
    slug: "ui-ux-design",
    name: "UI / UX Design",
    Icon: PenTool,
    href: "/service/ui-ux-design",
    from: "#CCFBF1",
    to: "#F0FDFA",
    accent: "#0D9488",
    tagline:
      "Good design doesn't just look beautiful — it converts. Interfaces people actually enjoy using.",
    items: [
      "UX research, audits & journey mapping",
      "Information architecture & wireframing",
      "UI design & visual language",
      "Interactive prototyping",
      "Design systems & dashboards",
      "Usability testing & developer handoff",
    ],
    heroHeadline:
      "UI/UX design in Bangalore that enhances experience & drives conversions",
    heroSubline:
      "We're a leading UI/UX design company in Bangalore that turns digital products into seamless, intuitive experiences — higher engagement, lower bounce rates, and stronger conversions.",
    benefitsTitle: "What makes our UI/UX design different",
    benefits: [
      "Research-first methodology — every design decision is backed by user data",
      "End-to-end delivery — from wireframes and prototypes to final handoff",
      "Bangalore-based team with global delivery experience",
    ],
    offerings: {
      title: "Our UI/UX design services",
      points: [
        {
          title: "UX Research & Audit",
          desc: "User interviews, heuristic evaluations, competitor analysis, and usability audits to uncover friction in your current product.",
        },
        {
          title: "User Journey Mapping",
          desc: "We map the complete customer journey to find pain points and create seamless interactions across every touchpoint.",
        },
        {
          title: "Information Architecture",
          desc: "Sitemaps, content structure, and navigation designed so users always find what they're looking for.",
        },
        {
          title: "Wireframing & Low-Fi Prototypes",
          desc: "Structural layouts and user flows validated before visual treatment — we check the logic before the pixels.",
        },
        {
          title: "UI Design & Visual Language",
          desc: "Pixel-perfect, on-brand interface design with full attention to desktop and mobile breakpoints.",
        },
        {
          title: "Interactive Prototyping",
          desc: "Clickable, animated prototypes of the real experience for stakeholder review and user testing.",
        },
        {
          title: "Design Systems",
          desc: "A scalable component library with typography, colour, and spacing tokens for your dev team.",
        },
        {
          title: "Dashboard & Enterprise UI Design",
          desc: "Easy-to-use dashboards, CRM apps, ERP platforms, and business apps that streamline workflows.",
        },
        {
          title: "Mobile App UI/UX Design",
          desc: "User-friendly Android and iOS interfaces focused on usability, engagement, and satisfaction.",
        },
        {
          title: "E-commerce UI/UX Design",
          desc: "Intuitive navigation, product discovery, and streamlined checkout that increase conversions.",
        },
        {
          title: "Responsive Design",
          desc: "Interfaces that deliver a seamless experience across desktop, tablet, and mobile.",
        },
        {
          title: "Interface Redesign",
          desc: "Bring an existing product up to modern standards for usability, experience, and conversion.",
        },
        {
          title: "Usability Testing",
          desc: "Moderated and unmoderated sessions with real users to validate design decisions before development.",
        },
      ],
    },
    whyChooseUs: {
      title: "Why choose us as your UI/UX design company in Bangalore",
      points: [
        {
          title: "Results-focused design",
          desc: "Our success is measured by what happens after launch — engagement, conversion, and retention, tied to your KPIs from the start.",
        },
        {
          title: "End-to-end expertise",
          desc: "Research, IA, visual design, and front-end thinking in one seamless process. No handoff gaps, no silos.",
        },
        {
          title: "Transparency at every step",
          desc: "Live Figma files, weekly syncs, and a dedicated project lead — no black-box agency.",
        },
        {
          title: "Industry-leading tools",
          desc: "Deep experience with Figma, Adobe XD, and Miro for UI and collaborative UX work.",
        },
        {
          title: "Local presence, global experience",
          desc: "A Bangalore UI/UX firm offering local cost-effectiveness with global-quality output.",
        },
      ],
    },
    process: [
      {
        title: "Discovery & Research",
        desc: "Stakeholder interviews, user research, competitor analysis, and a heuristic evaluation — plus personas and current-state journey mapping.",
      },
      {
        title: "UX Strategy & Architecture",
        desc: "Information architecture, user flows, and sitemap — the product structure defined before any visual work.",
      },
      {
        title: "Wireframing",
        desc: "Low-fidelity wireframes of key pages and flows, reviewed with you before visual design.",
      },
      {
        title: "Visual UI Design",
        desc: "High-fidelity, fully branded UI covering all breakpoints, states (hover, error, empty), and interactions.",
      },
      {
        title: "Prototyping & Testing",
        desc: "Interactive Figma prototypes tested with real users via Maze; results inform the final iteration.",
      },
      {
        title: "Handoff & Support",
        desc: "Design tokens, component annotations, and developer specs via Figma Dev Mode — and we stay available during the build.",
      },
    ],
    toolsTitle: "Tools we design with",
    tools: ["Figma", "Adobe XD", "Miro", "Maze"],
    // Testimonials removed pending real, attributable client quotes (EEAT).
    testimonials: [],
    faqTitle: "Frequently asked questions about UI/UX design",
    faqs: [
      {
        q: "What are UI/UX design services in Bangalore?",
        a: "They help businesses create user-friendly, visually appealing websites and apps that improve customer experience and engagement.",
      },
      {
        q: "Why is UI/UX design important for a website?",
        a: "It improves usability, enhances satisfaction, and increases conversions through intuitive navigation and better experiences.",
      },
      {
        q: "How do I choose the best UI/UX company in Bangalore?",
        a: "Look for a strong portfolio, proven experience, client testimonials, and a structured UI/UX design process.",
      },
      {
        q: "What does a UI/UX designer do?",
        a: "Researches user behaviour, creates wireframes, designs interfaces, and optimises digital experiences for web and mobile.",
      },
      {
        q: "What's the difference between UI and UX design?",
        a: "UI focuses on visual elements like colour, type, and layout; UX focuses on user journeys, usability, and overall experience.",
      },
      {
        q: "What's included in UI/UX design services?",
        a: "User research, wireframing, prototyping, UI design, usability testing, and implementation support.",
      },
      {
        q: "What is the UI/UX design process?",
        a: "Research, planning, wireframing, prototyping, visual design, testing, and continuous optimisation.",
      },
      {
        q: "How much do UI/UX services cost in Bangalore?",
        a: "It depends on project complexity, features, design requirements, and timelines.",
      },
      {
        q: "Can you redesign an existing website?",
        a: "Yes — UI/UX web design can improve the usability, performance, and visual appeal of an existing site.",
      },
      {
        q: "Why choose your UI/UX services in Bangalore?",
        a: "We focus on intuitive, conversion-driven digital experiences tailored to your business goals.",
      },
    ],
    cta: {
      title: "Turn more visitors into customers",
      subtitle:
        "We create user experiences that reduce friction, improve engagement, and help your business achieve its goals.",
    },
    related: [
      {
        slug: "web-development",
        desc: "We build the designs we create — pixel-accurate, fast, and conversion-focused.",
      },
      {
        slug: "graphic-design",
        desc: "A cohesive visual identity makes every interface feel on-brand and trustworthy.",
      },
      {
        slug: "seo",
        desc: "Clean structure and fast, usable pages support both UX and search performance.",
      },
    ],
  },

  // ──────────────────────────────────────────────────── Graphic Design ──
  {
    slug: "graphic-design",
    name: "Branding",
    Icon: Palette,
    href: "/service/graphic-design",
    from: "#FCE7F3",
    to: "#FDF2F8",
    accent: "#DB2777",
    tagline:
      "Your brand is the first impression you can't undo. We craft visuals that make people stop scrolling.",
    items: [
      "Logo & brand identity design",
      "Social media creative design",
      "Ad creative — Google, Meta & LinkedIn",
      "Brochures & company profiles",
      "Infographics & pitch decks",
      "Press-ready files & motion assets",
    ],
    heroHeadline:
      "Graphic design in Bangalore that finally looks like your business deserves",
    heroSubline:
      "You've outgrown Canva templates and unreliable freelancers. We produce visual identities and design systems that show where your brand is going — not just where it's been.",
    painPoints: {
      title: "If any of this sounds familiar, you're in the right place",
      intro:
        "Bad design doesn't announce itself — it quietly costs you customers, credibility, and conversions. These are the problems we solve every week.",
      points: [
        {
          title: "Our brand looks different everywhere",
          desc: "No guidelines, no system. Every designer and campaign produces something slightly different, so the brand feels amateur even when the product isn't.",
        },
        {
          title:
            "We briefed three agencies and still don't have a logo we like",
          desc: "Generic concepts and designers who present options instead of recommendations. The problem isn't your brief — it's the process.",
        },
        {
          title: "Our content goes out but nothing stops the scroll",
          desc: "Thumb-stopping design is earned through platform-native thinking, visual hierarchy, and creative built to perform.",
        },
        {
          title: "We got the files but can't use half of them",
          desc: "A folder of unlabelled PSDs and an AI file that won't open isn't a deliverable. Professional design ends with a handover, not a file dump.",
        },
      ],
    },
    whyChooseUs: {
      title:
        "What makes Skyup different from every other graphic design company in Bangalore",
      points: [
        {
          title: "Strategy before software",
          desc: "Every project starts with a discovery session, not a blank artboard — so every design decision has a reason behind it.",
        },
        {
          title: "48-hour turnaround on core deliverables",
          desc: "Most projects move from approved brief to first concept in two business days, without sacrificing quality for speed.",
        },
        {
          title: "You own everything, always",
          desc: "Source files, IP, and usage rights transfer to you completely on final payment. No licensing traps.",
        },
      ],
    },
    offerings: {
      title: "Graphic design services built around what brands actually need",
      points: [
        {
          title: "Logo & Branding Design",
          desc: "Complete visual identities — logo suites, colour palettes, typography, and guidelines — tested across real-world applications from a 16px favicon to a 16-foot hoarding.",
        },
        {
          title: "Social Media Creative Design",
          desc: "Creatives for Instagram, LinkedIn, and Facebook with the right dimensions, hierarchy, and consistency to earn attention and compound over time.",
        },
        {
          title: "Ad Creative Design — Google, Meta & LinkedIn",
          desc: "Format variations for every placement, built around what actually converts — ad creative as a performance lever, not just a visual.",
        },
        {
          title: "Brochure Design",
          desc: "Brochures that communicate clearly and survive the print process without colour shifts — delivered press-ready as standard.",
        },
        {
          title: "Company Profile Design",
          desc: "Profiles structured for scan-reading and built to establish credibility, formatted for both digital and print.",
        },
        {
          title: "Infographic Design",
          desc: "Complex data turned into something people actually finish reading — designed for comprehension first, shareability second.",
        },
        {
          title: "Presentation & Pitch Deck Design",
          desc: "Decks that structure your story visually and make your data land — because investors form a view in the first four slides.",
        },
      ],
    },
    // Case studies removed pending real, verifiable portfolio results (EEAT).
    // Do not add invented metrics (ratings, engagement, CTR, etc.).
    caseStudies: [],
    process: [
      {
        title: "Brief & Discovery",
        desc: "A structured discovery covering positioning, audience, competitive landscape, and what success looks like — surfacing decisions that have been delaying the project for months.",
      },
      {
        title: "Concept & Moodboard",
        desc: "Two or three distinct creative directions as moodboards before any finished artwork — a low-cost decision point, not a blind commitment.",
      },
      {
        title: "Design & Iteration",
        desc: "You get a working file or presentation deck, not just flat images, so you can test the design in context.",
      },
      {
        title: "Review & Revisions",
        desc: "Structured feedback via a single consolidated document — faster turnarounds and fewer iterations. Revision rounds are agreed and capped upfront.",
      },
      {
        title: "Final Delivery",
        desc: "A handover, not a file dump — deliverables packaged by use case, with a document explaining what each file is for.",
      },
    ],
    toolsTitle: "The tools behind the work",
    tools: [
      "Figma",
      "Adobe Illustrator",
      "Photoshop",
      "After Effects",
      "Canva Pro",
    ],
    toolsNote:
      "Tool choice is a craft decision, not a preference. A logo built in Photoshop can't scale to a billboard; a template built outside a shared Figma workspace becomes a maintenance problem. We choose every format for what the output has to do in the real world. Final formats include PNG, SVG, PDF, AI, PSD, and MP4.",
    // Testimonial removed pending a real, attributable client quote (EEAT).
    testimonial: null,
    faqTitle: "Questions clients ask before they brief us",
    faqs: [
      {
        q: "How much do graphic design services cost in Bangalore?",
        a: "Costs vary based on scope, complexity, turnaround, and deliverables. We provide customised quotes based on your needs.",
      },
      {
        q: "Why is graphic design important for growth?",
        a: "It builds credibility, strengthens brand recognition, improves communication, and increases conversions through professional visuals.",
      },
      {
        q: "How do I choose the right design agency?",
        a: "Look for a strong portfolio, relevant experience, clear communication, a structured process, and understanding of your goals.",
      },
      {
        q: "What's the difference between graphic design and branding?",
        a: "Design creates visual assets; branding includes strategy, messaging, positioning, and identity. Design is one part of branding.",
      },
      {
        q: "Can graphic design improve social engagement?",
        a: "Yes — high-quality design makes content more engaging and effective at capturing attention.",
      },
      {
        q: "How long does it take to design a logo?",
        a: "Typically one to three weeks, depending on complexity, feedback, and revisions.",
      },
      {
        q: "Do I need brand guidelines?",
        a: "Yes — they ensure consistency in logos, colours, typography, and visuals across all channels.",
      },
      {
        q: "What files should I receive?",
        a: "Editable source files and formats such as AI, PSD, SVG, PDF, PNG, and JPG for print and digital.",
      },
      {
        q: "What makes a good logo?",
        a: "Simple, memorable, scalable, versatile, and relevant across all platforms and applications.",
      },
      {
        q: "Can graphic design increase conversion rates?",
        a: "Yes — it improves user experience, message clarity, engagement, and overall conversion.",
      },
    ],
    cta: {
      title: "Ready to make your brand impossible to ignore?",
      subtitle: "Let's create designs that drive real business results.",
    },
    related: [
      {
        slug: "ui-ux-design",
        desc: "Brand visuals and product interfaces designed to feel like one cohesive system.",
      },
      {
        slug: "social-media-marketing",
        desc: "Great creative needs a great distribution engine — we run the social side too.",
      },
      {
        slug: "web-development",
        desc: "We turn your identity into a fast, on-brand website that converts.",
      },
    ],
  },

  // ─────────────────────────────────────────────────── Web Development ──
  {
    slug: "web-development",
    name: "Web Development",
    Icon: Code2,
    href: "/service/web-development",
    from: "#CFFAFE",
    to: "#ECFEFF",
    accent: "#0891B2",
    tagline:
      "Fast, conversion-optimized websites that scale with your growth. Built right. Built to last.",
    items: [
      "Custom & corporate websites",
      "E-commerce websites & storefronts",
      "Web apps, ERP & LMS",
      "Admin panels & dashboards",
      "Website redesign & PWAs",
      "CMS, maintenance & support",
    ],
    heroHeadline:
      "Web development in Bangalore that drives real business results",
    heroSubline:
      "A complete solution for web development — custom websites, CMS platforms, and enterprise web apps. Our experienced developers build digital products that perform, scale, and convert.",
    overview: [
      "We blend strategy, design, development, and digital marketing expertise to build websites that look great and perform exceptionally well — SEO-friendly, mobile-responsive, secure, and scalable, customised to your business goals.",
      "Lots of companies treat their website like a digital brochure. We think it should be a powerful marketing and sales vehicle — not just online, but a real part of your business goals.",
    ],
    benefitsTitle: "Why your business needs professional web development",
    benefits: [
      "Generate qualified leads",
      "Improve search engine rankings",
      "Increase customer trust",
      "Enhance user experience",
      "Improve conversion rates",
      "Automate business processes",
      "Support long-term business growth",
    ],
    offerings: {
      title: "Our web development services in Bangalore",
      points: [
        {
          title: "Custom Website Development",
          desc: "Bespoke websites that reflect your goals, audience, and brand — fast, responsive, SEO-friendly, and built to bring in leads and conversions.",
        },
        {
          title: "Corporate Website Development",
          desc: "Credibility-first corporate sites that are easy to use, secure, and scalable, showcasing your services to potential clients.",
        },
        {
          title: "E-Commerce Website Development",
          desc: "Secure, functional storefronts built to convert — payment gateway integration, product management, and a smooth shopping experience.",
        },
        {
          title: "Web Application Development",
          desc: "CRMs, ERPs, customer portals, and dashboards that automate workflows and boost productivity — secure and built to grow with you.",
        },
        {
          title: "ERP Development Solutions",
          desc: "Systems that centralise and automate core operations — HR, inventory, accounting, procurement — with real-time business insights.",
        },
        {
          title: "Learning Management Systems (LMS)",
          desc: "Platforms to deliver, manage, and track online learning — course management, assessments, progress tracking, and certification.",
        },
        {
          title: "Admin Panels & Business Dashboards",
          desc: "Custom panels giving complete control over data, users, and processes, with real-time analytics and reporting.",
        },
        {
          title: "Website Redesign",
          desc: "Transform an outdated site into a modern, high-performing platform — better UX, SEO, loading speed, and conversion.",
        },
        {
          title: "Progressive Web Apps (PWA)",
          desc: "Apps combining the best of web and mobile — fast, offline-capable, with push notifications and a seamless cross-device experience.",
        },
        {
          title: "Website Maintenance & Support",
          desc: "Regular updates, security monitoring, bug fixes, backups, and performance optimisation to keep your site at its best.",
        },
      ],
    },
    whyChooseUs: {
      title: "Why choose us for web development in Bangalore",
      points: [
        {
          title: "Built for business growth",
          desc: "We develop digital assets that support your marketing goals, increase conversions, and generate leads — not just websites.",
        },
        {
          title: "Custom solutions",
          desc: "Solutions matched to your brand, industry, and requirements rather than one-size-fits-all templates.",
        },
        {
          title: "SEO-ready development",
          desc: "SEO-friendly from the start — clean code, well-structured architecture, fast loading, and mobile responsiveness.",
        },
        {
          title: "Mobile-first & responsive",
          desc: "Your site works perfectly on every device, boosting engagement and conversions.",
        },
        {
          title: "Easy content management",
          desc: "CMS development that lets your team update images, pages, blogs, and content without technical expertise.",
        },
        {
          title: "Transparent process & on-time delivery",
          desc: "Clear communication, milestone tracking, and on-time delivery from start to finish.",
        },
        {
          title: "Dedicated support & maintenance",
          desc: "Ongoing support, maintenance, performance monitoring, and updates after launch.",
        },
        {
          title: "Experienced team",
          desc: "Designers, developers, SEO experts, and marketers in one team, blending creativity, technology, and strategy.",
        },
      ],
    },
    process: [
      {
        title: "Discovery & Requirements",
        desc: "A workshop to understand your business, users, and technical needs. Deliverable: a project scope and technology recommendation document.",
      },
      {
        title: "Strategy & Architecture",
        desc: "Sitemap, information architecture, and tech stack defined, with benchmarks for integration, performance, and scalability before coding.",
      },
      {
        title: "UX Design & Prototyping",
        desc: "Figma wireframes refined with your feedback until interactions are intuitive, then high-fidelity visual design aligned to your brand.",
      },
      {
        title: "Development & Integration",
        desc: "Front-end and back-end built in concurrent sprints, with a staging environment from day one for ongoing feedback.",
      },
      {
        title: "QA, Testing & Optimisation",
        desc: "Cross-browser, cross-device, security, accessibility, and performance testing before launch. Bugs fixed, PageSpeed optimised.",
      },
      {
        title: "Launch & Ongoing Support",
        desc: "Safe, controlled deployment with rollback procedures, then uptime, performance, and security monitoring with tiered maintenance retainers.",
      },
    ],
    // Testimonials removed pending real, attributable client quotes (EEAT).
    // Do not add named clients or metrics that cannot be verified.
    testimonials: [],
    faqTitle: "Frequently asked questions about web development in Bangalore",
    faqs: [
      {
        q: "What are web development services?",
        a: "Designing, developing, and maintaining websites to help businesses establish a strong online presence.",
      },
      {
        q: "How much does website development cost in Bangalore?",
        a: "It varies based on features, design complexity, and functionality. Contact us for a customised quote.",
      },
      {
        q: "How long does it take to develop a website?",
        a: "A standard business website typically takes 2-6 weeks, depending on requirements and revisions.",
      },
      {
        q: "Why is web development important?",
        a: "A professionally developed website attracts visitors, generates leads, improves credibility, and supports growth.",
      },
      {
        q: "Do you provide custom web development?",
        a: "Yes — solutions tailored to your business goals, industry, and customer needs.",
      },
      {
        q: "Will my website be mobile-friendly?",
        a: "Absolutely. All our websites are fully responsive and optimised for desktop, tablet, and mobile.",
      },
      {
        q: "Do you offer CMS web development?",
        a: "Yes — we build on CMS platforms like WordPress so you can easily manage and update content.",
      },
      {
        q: "Is SEO included in web development?",
        a: "Yes — we follow SEO best practices, including optimised structure, fast loading, and mobile responsiveness.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes — we modernise existing sites to improve performance, user experience, and conversions.",
      },
      {
        q: "Why choose your web development company in Bangalore?",
        a: "We build SEO-friendly, conversion-focused websites that combine great design, performance, and business strategy.",
      },
    ],
    cta: {
      title: "Ready to build something great?",
      subtitle:
        "Looking for web development services in Bangalore? Get a free consultation and a no-charge estimate based on your business goals.",
    },
    related: [
      {
        slug: "ui-ux-design",
        desc: "We design the experience before we build it — usable, on-brand, and conversion-focused.",
      },
      {
        slug: "seo",
        desc: "A well-structured, fast site is the foundation of strong technical SEO.",
      },
      {
        slug: "ai-automation",
        desc: "Wire your new site into automated lead capture, follow-up, and reporting.",
      },
    ],
  },

  // ──────────────────────────────────────────────────── Video Editing ──
  {
    slug: "video-editing",
    name: "Video Editing",
    Icon: Video,
    href: "/service/video-editing",
    from: "#FAE8FF",
    to: "#FDF4FF",
    accent: "#A21CAF",
    tagline:
      "Send us the footage — we turn it into scroll-stopping video. Reels, YouTube, and ads, edited to perform.",
    items: [
      "Short-form & Reels editing",
      "YouTube video editing",
      "Ad & promo video editing",
      "Corporate & explainer editing",
      "Motion graphics & animation",
      "Subtitles, captions & repurposing",
    ],
    heroHeadline:
      "Video editing services in Bangalore that make your content perform",
    heroSubline:
      "You already have the footage — we make it work. Skyup is a video editing team, not a production house: send us your raw clips and we return polished, platform-ready video for social, YouTube, and ads.",
    painPoints: {
      title: "Great footage, wasted because the edit lets it down",
      intro:
        "Most brands don't have a filming problem — they have an editing bottleneck. Raw clips pile up, editing is slow or inconsistent, and the videos that do go out don't hold attention.",
      points: [
        {
          title: "Footage sitting unused",
          desc: "You film content but it never gets edited and published, so the effort and the moment are both lost.",
        },
        {
          title: "Editing that kills the hook",
          desc: "Slow starts, no captions, and weak pacing lose viewers in the first three seconds — before your message even lands.",
        },
        {
          title: "Inconsistent style across videos",
          desc: "Every video looks like a different brand because there's no consistent template, motion, or caption style.",
        },
        {
          title: "Too slow to keep up with the calendar",
          desc: "Reels and shorts need volume and speed. A slow edit turnaround means you can't post consistently enough to grow.",
        },
      ],
    },
    offerings: {
      title: "Our video editing services in Bangalore",
      points: [
        {
          title: "Short-Form & Reels Editing",
          desc: "Fast-paced edits for Instagram Reels, YouTube Shorts, and TikTok — hooks, captions, sound design, and pacing built to stop the scroll.",
        },
        {
          title: "YouTube Video Editing",
          desc: "Long-form editing with clean cuts, B-roll, graphics, and retention pacing — turning raw recordings into watchable, subscribe-worthy videos.",
        },
        {
          title: "Advertisement & Promo Editing",
          desc: "Editing ad footage into conversion-focused cuts for Google, Meta, and LinkedIn — multiple aspect ratios and hook variants for testing.",
        },
        {
          title: "Corporate & Explainer Editing",
          desc: "Clear, professional edits for company videos, explainers, testimonials, and event recaps — structured so the message lands.",
        },
        {
          title: "Motion Graphics & Animation",
          desc: "Animated titles, lower-thirds, logo stings, and infographic motion that add polish and clarity to any video.",
        },
        {
          title: "Subtitles, Captions & Repurposing",
          desc: "Accurate captions and subtitles, plus repurposing one long video into multiple short clips to get more from every shoot.",
        },
      ],
    },
    process: [
      {
        title: "Brief & Footage Handover",
        desc: "You share your raw footage, brand assets, and goal for the video. We agree on style, length, format, and turnaround before editing starts.",
      },
      {
        title: "First Cut",
        desc: "We assemble the story — structure, pacing, and the hook — and send a first cut for your review, so the direction is right before we polish.",
      },
      {
        title: "Polish & Motion",
        desc: "Colour, captions, motion graphics, sound design, and on-brand styling are added to turn the cut into a finished, platform-ready video.",
      },
      {
        title: "Review & Revisions",
        desc: "You review and we refine. Revision rounds are agreed upfront, so feedback is fast and the final video matches what you pictured.",
      },
      {
        title: "Delivery & Formats",
        desc: "Final video delivered in the aspect ratios and formats each platform needs — plus short cut-downs for repurposing where relevant.",
      },
    ],
    whyChooseUs: {
      title: "Why brands choose Skyup for video editing",
      points: [
        {
          title: "Editing specialists, not a production house",
          desc: "We focus purely on the edit — you keep control of filming, and we make your footage look its best.",
        },
        {
          title: "Built for platform performance",
          desc: "Every edit is shaped for where it will live — hooks, captions, and pacing tuned per platform, not one-size-fits-all.",
        },
        {
          title: "Consistent, on-brand style",
          desc: "Reusable templates for captions, motion, and titles keep every video recognisably yours.",
        },
        {
          title: "Turnaround that fits a content calendar",
          desc: "A workflow designed for volume and speed, so you can post reels and shorts consistently.",
        },
      ],
    },
    faqTitle: "Frequently asked questions about video editing",
    faqs: [
      {
        q: "What video editing services do you offer?",
        a: "We edit short-form and Reels, YouTube videos, ads and promos, corporate and explainer videos, motion graphics, and social media videos — plus captions and repurposing.",
      },
      {
        q: "Do you film or shoot video too?",
        a: "No — Skyup is a video editing team, not a production house. You provide the footage and we turn it into polished, platform-ready video.",
      },
      {
        q: "What footage do I need to provide?",
        a: "Your raw clips, along with any brand assets (logo, fonts, colours) and a note on the goal and platform. We handle the rest of the edit.",
      },
      {
        q: "Can you edit Instagram Reels and YouTube Shorts?",
        a: "Yes. Short-form editing — hooks, captions, sound, and pacing built to hold attention — is one of our core services.",
      },
      {
        q: "Do you add captions and subtitles?",
        a: "Yes. We add accurate captions and subtitles, which improve watch time and make videos accessible when viewed on mute.",
      },
      {
        q: "Can you deliver videos in multiple formats?",
        a: "Yes. We deliver the aspect ratios each platform needs — vertical, square, and widescreen — and can cut one video into several short clips.",
      },
      {
        q: "How fast is your video editing turnaround?",
        a: "It depends on length and complexity. We agree on a turnaround at the brief stage so it fits your content calendar.",
      },
      {
        q: "Do you offer motion graphics and animation?",
        a: "Yes — animated titles, lower-thirds, logo stings, and infographic motion to add polish and clarity to your videos.",
      },
    ],
    cta: {
      title: "Send us your footage — we'll make it perform",
      subtitle:
        "Get a free editing consultation. Share a sample clip and your goal, and we'll show you what we'd do with it.",
    },
    related: [
      {
        slug: "social-media-marketing",
        desc: "Editing is only half the job — we can also plan, post, and grow the channels your videos live on.",
      },
      {
        slug: "performance-marketing",
        desc: "Turn your best edits into paid ad creative built to convert across Google, Meta, and LinkedIn.",
      },
      {
        slug: "graphic-design",
        desc: "Pair your videos with on-brand thumbnails, titles, and creative for a consistent look.",
      },
    ],
  },
];

// ── Per-service SEO metadata (title + description). One entry per live service.
// Consumed by pages/+Head.jsx (SSR) and pages/+Layout.jsx (client navigation).
export const SERVICE_META = {
  "web-development": {
    title: "Web Development Company in Bangalore | Skyup Digital Solutions",
    description:
      "Custom websites, e-commerce, CMS and web apps built in Bangalore — fast, SEO-friendly, mobile-responsive, and conversion-focused. Get a free estimate.",
  },
  seo: {
    title: "SEO Company in Bangalore | Skyup Digital Solutions",
    description:
      "Results-driven SEO in Bangalore — technical SEO, content, and link building that grow organic traffic and qualified leads. No lock-in. Free SEO audit.",
  },
  "performance-marketing": {
    title: "Performance Marketing Agency in Bangalore | Skyup",
    description:
      "Google, Meta and LinkedIn ads managed for measurable ROI — full attribution, weekly optimisation, and a free audit. Performance marketing in Bangalore.",
  },
  "social-media-marketing": {
    title: "Social Media Marketing Agency in Bangalore | Skyup",
    description:
      "Social media marketing in Bangalore — strategy, content, reels, community management, and paid social that turn followers into leads. Free social audit.",
  },
  "ai-automation": {
    title: "AI Automation Company in Bangalore | Skyup Digital Solutions",
    description:
      "AI automation in Bangalore — chatbots, WhatsApp & voice agents, CRM and workflow automation that cut manual work and scale your business. Free AI audit.",
  },
  "ui-ux-design": {
    title: "UI/UX Design Company in Bangalore | Skyup Digital Solutions",
    description:
      "UI/UX design in Bangalore — user research, wireframing, prototyping, and design systems that make products intuitive and boost conversions.",
  },
  "graphic-design": {
    title: "Graphic Design & Branding Company in Bangalore | Skyup",
    description:
      "Graphic design and branding in Bangalore — logo and identity design, social and ad creative, brochures, and pitch decks. You own every source file.",
  },
  "video-editing": {
    title: "Video Editing Services in Bangalore | Skyup Digital Solutions",
    description:
      "Video editing in Bangalore — Reels, YouTube, ads, corporate videos, and motion graphics. Send us your footage and we make it perform. Editing only.",
  },
};
