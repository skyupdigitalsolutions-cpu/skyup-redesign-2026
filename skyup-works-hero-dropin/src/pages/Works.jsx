// src/pages/Works.jsx — Works page.
// Composition: Header → WorksHero → WorkFlipCards → ToolsUniverse (AI Stack) → Footer
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import WorksCourtyard from "@/components/works/WorksCourtyard"; // previous "Hidden Courtyard" concept — kept for revert
import WorksHero from "@/components/works/WorksHero";
import WorkFlipCards from "@/components/works/WorkFlipCards";
import ToolsUniverse from "@/components/works/ToolsUniverse";

export default function Work() {
  return (
    <div style={{ background: "#04050C" }}>
      <Header />
      <WorksHero />
      <div id="work">
        <WorkFlipCards />
      </div>
      <ToolsUniverse />
      <Footer
        ctaProps={{
          title: "Ready to Grow Faster?",
          description:
            "Serving companies of every scale across Bangalore. Connect with us to start the conversation.",
          primaryLabel: "Get Started",
          secondaryLabel: "Whatsapp Us",
          secondaryHref: "tel:+918867867775",
        }}
      />
    </div>
  );
}
