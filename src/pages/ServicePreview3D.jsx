// src/pages/ServicePreview3D.jsx
// Isolated preview of the Solar System services hero.
// (Route /service-3d — previously the Three.js UFO scan; now points at ServiceSolar.)
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceUniverse from "@/components/service/ServiceUniverse";
import ServiceSolar from "@/components/service/ServiceSolar";

export default function ServicePreview3D() {
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
          description:
            "Schedule a FREE 30-min strategy call. No pitch deck. No lock-in. Just a real conversation about what’s really going to move the needle for your business.",
          primaryLabel: "Request a Free Strategy Call",
        }}
      />
    </div>
  );
}
