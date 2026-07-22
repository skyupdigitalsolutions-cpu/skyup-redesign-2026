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
      <ClientOnly fallback={<div style={{ height: "100vh", background: "#03040a" }} />}>
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
