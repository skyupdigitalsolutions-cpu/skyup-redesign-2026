// src/pages/Works.jsx
import { ClientOnly } from "vike-react/ClientOnly";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorksHero from "@/components/works/WorksHero";
import WorkFlipCards from "@/components/works/WorkFlipCards";
import ToolsUniverse from "@/components/works/ToolsUniverse";

export default function Work() {
  return (
    <div style={{ background: "#04050C" }}>
      <Header />
      <ClientOnly fallback={<div style={{ height: "100vh", background: "#04050C" }} />}>
        <WorksHero />
      </ClientOnly>
      <div id="work">
        <WorkFlipCards />
      </div>
      <ClientOnly fallback={<div style={{ minHeight: "60vh", background: "#04050C" }} />}>
        <ToolsUniverse />
      </ClientOnly>
      <Footer
        ctaProps={{
          title: "Let's build your success story",
          substitle: "Your growth-focused digital marketing partner",
          description:
            "Ready to see results like these? Partner with Skyup Digital Solutions for SEO, paid ads, web development, and AI automation.",
        }}
      />
    </div>
  );
}
