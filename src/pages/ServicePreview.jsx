// src/pages/ServicePreview.jsx — scratchpad preview (route: /service-preview)
// Currently showing the "Solar System" services concept.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceUniverse from "@/components/service/ServiceUniverse";
import ServiceSolar from "@/components/service/ServiceSolar";

export default function ServicePreview() {
  return (
    <div style={{ background: "#04050C" }}>
      <Header />
      <ServiceUniverse>
        <ServiceSolar />
      </ServiceUniverse>
      <Footer
        ctaProps={{
          title: "READY TO GROW?",
          substitle: "Stop guessing. Start growing with data.",
          description: "Schedule a FREE 30-min strategy call. No pitch deck. No lock-in.",
          primaryLabel: "Request a Free Strategy Call",
        }}
      />
    </div>
  );
}
