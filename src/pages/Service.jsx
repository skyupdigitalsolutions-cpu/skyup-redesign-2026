import { ClientOnly } from "vike-react/ClientOnly";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IndustriesWeServe from "@/components/service/IndustriesWeServe";
import ResultsAndProcess from "@/components/service/ResultsAndProcess";
import ServiceSolar from "@/components/service/ServiceSolar";
import ServiceUniverse from "@/components/service/ServiceUniverse";
import { SERVICES } from "@/data/services";

const FAQ_questions = [
  {
    q: "What is included in your SEO services?",
    a: "Our SEO services include technical SEO, on-page optimization, keyword research, content strategy, local SEO, link building, and performance tracking to improve rankings and organic traffic.",
  },
  {
    q: "How does social media marketing help my business grow?",
    a: "Social media marketing helps increase brand awareness, audience engagement, customer trust, and lead generation through strategic content, paid campaigns, and community management.",
  },
  {
    q: "Which platforms do you use for performance marketing campaigns?",
    a: "We manage paid advertising campaigns across Google Ads, Meta Ads, LinkedIn, and programmatic advertising platforms.",
  },
  {
    q: "What kind of video editing do you handle?",
    a: "We edit social media reels, marketing and ad-creative videos, motion graphics, YouTube videos, and short-form content — the editing side, built to match your campaigns.",
  },
  {
    q: "How can AI automation improve business operations?",
    a: "AI automation reduces manual work by automating lead management, customer support, reporting, and repetitive business processes.",
  },
  {
    q: "I'm not sure which service I need — how do I choose?",
    a: "Start with your goal. Want more traffic? SEO. Faster leads? Performance marketing. A better website? Web development or UI/UX design. Content and presence? Social media, video editing, or branding. Repetitive work slowing you down? AI automation. Open any service to see how it works, or book a call and we'll point you to the right starting point.",
  },
  {
    q: "What is included in your UI/UX design service?",
    a: "Our UI/UX design services include user research, wireframing, interface design, prototyping, usability testing, and user journey optimization.",
  },
  {
    q: "Do you provide complete branding and graphic design services?",
    a: "Yes. We design logos, brand identities, social media creatives, marketing materials, packaging designs, motion graphics, and ad creatives.",
  },
  {
    q: "Which technologies do you use for web development?",
    a: "We build websites and web applications using React, Next.js, and other modern development technologies focused on speed and scalability.",
  },
  {
    q: "Do you build conversion-focused landing pages?",
    a: "Yes. We create high-converting landing pages optimized for paid ads, lead generation, sales funnels, and better conversion rates.",
  },
];

export default function Service() {
  return (
    <div style={{ background: "#04050C" }}>
      <Header />
      {/* SSR / prerender fallback — visible to crawlers and before JS hydrates.
          Replaced by the full animated ServiceUniverse once JS loads. */}
      <ClientOnly fallback={
        <div style={{ background: "#04050C", color: "#fff", padding: "4rem 1.5rem", fontFamily: "'Poppins',sans-serif" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", color: "#fff" }}>
              Digital Marketing &amp; Web Development Services — Bangalore
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", marginBottom: "3rem", maxWidth: "700px" }}>
              Skyup Digital Solutions offers end-to-end digital marketing and web development services in Bangalore — from SEO and performance marketing to AI automation and custom web development.
            </p>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "1.5rem", color: "#FA9F43" }}>Our Services</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", marginBottom: "3rem" }}>
              {SERVICES.map((s) => (
                <li key={s.slug} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <a href={`/service/${s.slug}/`} style={{ textDecoration: "none" }}>
                    <strong style={{ display: "block", fontSize: "1.1rem", color: "#fff", marginBottom: "0.4rem" }}>{s.name}</strong>
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                      {s.heroSubline || s.tagline || ""}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem", color: "#FA9F43" }}>Frequently Asked Questions</h2>
            <dl style={{ marginBottom: "2rem" }}>
              {FAQ_questions.slice(0, 6).map((faq) => (
                <div key={faq.q} style={{ marginBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "1.25rem" }}>
                  <dt style={{ fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>{faq.q}</dt>
                  <dd style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      }>
        <ServiceUniverse>
          {/* Solar System hero: the sun (Skyup) at center with 8 service-planets in orbit */}
          <ServiceSolar />
          <ResultsAndProcess />
          <IndustriesWeServe />
          <FaqSection
            faqs={FAQ_questions}
            title="Questions Businesses Often Ask Us"
            subtitle=""
          />
        </ServiceUniverse>
      </ClientOnly>
      <Footer
        ctaProps={{
          title: "READY TO GROW?",
          substitle: "Stop guessing. Start growing with data.",
          description:
            "Schedule a FREE 30-min strategy call. No pitch deck. No lock-in. Just a real conversation about what’s really going to move the needle for your business.",
          primaryLabel: "Request a Free Strategy Call",
        }}
      />
    </div>
  );
}
