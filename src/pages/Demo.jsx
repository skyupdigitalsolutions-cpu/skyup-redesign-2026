import DemoHero from "@/components/DemoHero";
import PainPoints from "@/components/demo/PainPoints";
import ServicesGrid from "@/components/demo/ServicesGrid";
import DemoProcess from "@/components/demo/DemoProcess";
import WhyChooseUs from "@/components/demo/WhyChooseUs";
import RelatedServices from "@/components/demo/RelatedServices";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GoogleReviews from "@/components/GoogleReviews";

// SEO-specific 6-step process (component map section 04).
// DemoProcess maps `steps` into a 2-col grid, so 6 steps render as 3 rows of 2.
const SEO_STEPS = [
  {
    n: "01",
    title: "Website SEO Audit",
    body: "We analyze your website and its technical condition, on-page parameters, website quality, profile of backlinks, and competitive analysis. It means that you have a goal, and a goal is accompanied by the things that you’re going to do to overcome it. ",
  },
  {
    n: "02",
    title: "Keyword Research & Mapping",
    body: "Our SEO specialists have the capacity and expertise to perform an extensive keyword analysis to find the high-priority, high-intent keyword phrases your audience is searching for. Then we put keywords on the right pages of your website, and we do it strategically.",
  },
  {
    n: "03",
    title: "SEO Strategy & Planning",
    body: "The results of these plus keyword research help us develop a customized SEO strategy, which in the short term will provide us with immediate results but in the long term, better ranking. Your tactics will depend on your objectives, competitors, and industry.",
  },
  {
    n: "04",
    title: "On-Page Optimisation",
    body: "All on-page optimizations performed in the audit, including all optimized content, fixes, optimized navigational links, etc., are performed.",
  },
  {
    n: "05",
    title: "Off-Page SEO & Link Building",
    body: "We use white hat off-page SEO techniques to get good quality backlinks from authoritative and relevant sites, which help enhance search ranking and domain authority.",
  },
  {
    n: "06",
    title: "Reporting & Continuous Improvement",
    body: "Unabridged monthly reports on keywords, visits, leads, and ROI will be provided. SEO marketing is a continuous process — we continuously work on strategies based on the real data.",
  },
];

export default function Demo() {
  const FAQ_questions = [
    {
      q: "Why is SEO important for businesses?",
      a: "SEO marketing helps businesses increase online visibility, attract qualified traffic, and generate long-term organic leads. One of the biggest advantages of SEO is that it continues delivering traffic even after content is published — unlike paid ads that stop the moment your budget runs out.",
    },
    {
      q: "How long does SEO take to show results?",
      a: "Most websites begin seeing early SEO ranking improvements within 6–12 weeks. Competitive industries may take longer, but SEO creates sustainable long-term growth.",
    },
    {
      q: "What are the different types of SEO? ",
      a: "The main types of SEO include: On-Page SEO Technical SEO Off-Page SEO Local SEO E-Commerce SEO Each plays a role in improving search visibility and website performance.",
    },
    {
      q: "What is included in an SEO audit? ",
      a: "An SEO audit checks your website's technical health, page structure, keyword optimization, backlinks, speed, mobile performance, and indexing issues. Professional SEO audit tools help identify what's limiting your rankings.",
    },
    {
      q: "What are SEO backlinks?",
      a: "SEO backlinks are links from other websites pointing to yours. High-quality backlinks are a core part of off-page SEO and help improve your website's authority and search engine rankings.",
    },
    {
      q: "What is SEO keyword research? ",
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
  ];

  return (
    <div>
      <Header />

      {/* 01 — Hero */}
      <DemoHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/service" },
          { label: "SEO Services" },
        ]}
        title="Rank Higher, Get Found, Grow Faster with Expert SEO"
        subtitle="We develop SEO that gets results. It's obviously profitable while you're sleeping! As a trusted SEO firm in Bangalore, however, Skyup's goal is to deliver lasting visibility, enhance the SEO rank, and achieve measurable business development."
        primaryCta={{
          label: "Request a Free Strategy Call",
          href: "/contact",
        }}
        accentColor="#22D3EE"
      />

      {/* 02 — Pain Point Block */}
      <PainPoints />

      {/* 03 — Services Grid */}
      <ServicesGrid />

      {/* 04 — Process Steps (SEO, 6 steps) */}
      <DemoProcess
        title="Our Proven SEO Process — Step by Step"
        promo={{
          eyebrow: "HOW WE WORK",
          heading: "A proven, repeatable path to higher rankings",
          body: "Yes, we are an SEO agency in Bangalore and have a scientific approach to SEO and follow data-driven processes so that we can ensure consistent and measurable results to each and every client.",
          cta: { label: "Book a Free Audit", href: "/contact-us" },
          image: "",
        }}
        steps={SEO_STEPS}
      />

      {/* 05 — Why Choose Us + case study */}
      <WhyChooseUs />

      {/* 06 — Testimonial */}
      <GoogleReviews />

      {/* 07 — FAQ Accordion */}
      <FaqSection faqs={FAQ_questions} />

      {/* 08 — Related Services */}
      <RelatedServices />

      <Footer
        ctaProps={{
          title: "Ready to Stop Paying for Every Click?",

          description:
            "No contracts. No jargon. Just a free audit and a plan that makes sense.",
        }}
      />
    </div>
  );
}
