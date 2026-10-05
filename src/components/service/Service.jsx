import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IndustriesWeServe from "@/components/service/IndustriesWeServe";
import ResultsAndProcess from "@/components/service/ResultsAndProcess";
import ServiceSolar from "@/components/service/ServiceSolar";
import ServiceUniverse from "@/components/service/ServiceUniverse";

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
      <ServiceUniverse>
        {/* Highlighted hero band: page H1 + intro. Sits ABOVE the solar system so the
            heading and the orbiting planets never overlap. */}
        <section className="svc-hub-hero">
          <style>{`
            .svc-hub-hero{ position:relative; text-align:center; padding:150px 6vw 40px; }
            .svc-hub-hero::before{ content:""; position:absolute; left:50%; top:40%; transform:translate(-50%,-50%);
              width:min(760px,80vw); height:340px; pointer-events:none; z-index:-1;
              background:radial-gradient(ellipse at center, rgba(250,159,67,.16), rgba(91,140,255,.08) 45%, transparent 70%); }
            .svc-hub-hero .eyebrow{ display:inline-block; color:#FA9F43; font-weight:700; letter-spacing:.32em;
              text-transform:uppercase; font-size:clamp(.72rem,1.3vw,.95rem); }
            .svc-hub-hero h1{ margin:.6rem auto 0; color:#fff; font-weight:800; letter-spacing:-.02em; line-height:1.06;
              font-size:clamp(1.9rem,4.4vw,3.2rem); max-width:18ch; }
            .svc-hub-hero p{ margin:1rem auto 0; max-width:64ch; color:rgba(255,255,255,.66);
              font-size:clamp(.95rem,1.4vw,1.1rem); line-height:1.65; }
            @media (max-width:768px){ .svc-hub-hero{ padding:120px 5vw 24px; } }
          `}</style>
          <span className="eyebrow">Services of Skyup Universe</span>
          <h1>Digital marketing services in Bangalore</h1>
          <p>Skyup offers web development, SEO, social media, performance marketing, AI automation, video editing, UI/UX design, and branding. Choose a service to see how it works.</p>
        </section>
        {/* Solar System: the sun (Skyup) at center with 8 service-planets in orbit */}
        <ServiceSolar />
        <ResultsAndProcess />
        <IndustriesWeServe />
        <FaqSection
          faqs={FAQ_questions}
          title="Questions Businesses Often Ask Us"
          subtitle=""
        />
      </ServiceUniverse>
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
