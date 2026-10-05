// src/pages/WorksCourtyardPreview.jsx
// Isolated preview of "The Hidden Courtyard" Works concept, on /works-courtyard.
// Live /works stays untouched.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorksCourtyard from "@/components/works/WorksCourtyard";

export default function WorksCourtyardPreview() {
  return (
    <div style={{ background: "#04050C" }}>
      <Header />
      <WorksCourtyard />
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
