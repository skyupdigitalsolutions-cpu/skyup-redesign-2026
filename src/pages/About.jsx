// src/pages/About.jsx
import { ClientOnly } from "vike-react/ClientOnly";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSeoSchema from "../components/about/AboutSeoSchema";
import AboutUniverse from "../components/about/AboutUniverse";

// AboutUniverse uses canvas + IntersectionObserver + complex animation state.
// ClientOnly keeps it off SSR (like Home does with Street3D/ScrollStoryHero),
// preventing the hydration hang on direct URL refresh.
export default function About() {
  return (
    <div style={{ background: "#03040a" }}>
      <AboutSeoSchema />
      <Header />
      {/* SSR / prerender fallback — visible to crawlers and users before JS hydrates.
          Replaced by the full animated AboutUniverse once JS loads.
          Uses inline styles only; no Tailwind class dependencies. */}
      <ClientOnly fallback={
        <div style={{ background: "#03040a", color: "#fff", padding: "4rem 1.5rem", fontFamily: "'Poppins',sans-serif" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", color: "#fff" }}>
              About Skyup Digital Solutions
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", maxWidth: "700px" }}>
              Skyup Digital Solutions is a Bangalore-based, AI-powered digital marketing and web development agency. We help businesses grow with measurable strategies across SEO, performance marketing, social media, web development, and AI automation.
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem", color: "#FA9F43" }}>What We Believe</h2>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "2.5rem" }}>
              {[
                { h: "Strategy Before Execution", p: "We understand your business, audience and goals before any activity starts." },
                { h: "Creativity That Solves Problems", p: "Design that communicates clearly, builds trust and improves conversions." },
                { h: "Decisions Backed by Data", p: "SEO, paid campaigns and analytics — every recommendation is measurable." },
                { h: "Long-Term Partnerships", p: "Growth from lasting relationships built on transparency and collaboration." },
              ].map((v) => (
                <li key={v.h} style={{ marginBottom: "1rem" }}>
                  <strong style={{ color: "#fff" }}>{v.h}</strong>
                  <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "0.5rem" }}>{v.p}</span>
                </li>
              ))}
            </ul>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem", color: "#FA9F43" }}>How We Work</h2>
            <ol style={{ paddingLeft: "1.25rem", marginBottom: "2.5rem", color: "rgba(255,255,255,0.7)" }}>
              {[
                { h: "Discover", p: "Your business, market and goals." },
                { h: "Strategy", p: "A customised digital growth plan." },
                { h: "Build", p: "Impactful digital experiences." },
                { h: "Optimise", p: "Launch, measure and improve continuously." },
              ].map((s) => (
                <li key={s.h} style={{ marginBottom: "0.75rem" }}>
                  <strong style={{ color: "#fff" }}>{s.h}</strong> — {s.p}
                </li>
              ))}
            </ol>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem", color: "#FA9F43" }}>Our Team</h2>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {[
                { name: "Bhojraj Rattigerimath", role: "Social Media Manager" },
                { name: "Harish Krishna Moger", role: "UI/UX Designer" },
                { name: "Lohith Ishwar Moger", role: "Multimedia Designer" },
                { name: "Ismail Zabiulla", role: "Sales Manager" },
                { name: "Jahnavi AK", role: "Performance Marketer" },
                { name: "Pooja Kadwadi", role: "Frontend Developer" },
                { name: "Shashikant S Bilgundi", role: "Full Stack Developer" },
                { name: "Srinivas Sutar", role: "Backend Developer" },
                { name: "Teja GS", role: "Tele Sales Executive" },
              ].map((m) => (
                <li key={m.name} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "0.75rem 1rem", minWidth: "200px" }}>
                  <strong style={{ display: "block", color: "#fff", fontSize: "0.95rem" }}>{m.name}</strong>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }>
        <AboutUniverse />
      </ClientOnly>
      <Footer
        ctaProps={{
          title: "Partner With Skyup Digital Solutions",
          substitle: "Your growth-focused digital marketing partner",
          description:
            "An AI-powered digital marketing and web development agency in Bangalore — SEO, paid ads, social, and conversion-focused websites that turn visibility into measurable growth.",
        }}
      />
    </div>
  );
}
