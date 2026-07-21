import { lazy, Suspense } from "react";
import { ClientOnly } from "vike-react/ClientOnly";
import BulbIntro from "@/components/BulbIntro";
import ValueProposition from "../components/ValueProposition";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudies from "@/components/CaseStudies";
import ProcessSection from "@/components/ProcessSection";
import GoogleReviews from "@/components/GoogleReviews";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeSchema from "@/components/home/HomeSchema";

// Lazy — defers three.js chunk off initial parse.
// ClientOnly with load prop — correct API for vike-react@0.6.x.
// load receives a function returning a promise of the default export.
// This keeps WebGL components fully off SSR with zero hydration mismatch.
const loadStreet = () => import("@/components/Street3D").then(m => m.default);
const loadHero = () => import("@/components/hero/ScrollStoryHero").then(m => m.default);

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <ClientOnly
        load={loadStreet}
        fallback={<div style={{ height: "100vh" }} />}
      >
        {(Street3D) => (
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <Street3D />
          </Suspense>
        )}
      </ClientOnly>
      <WhyChooseUs />
      <ClientOnly
        load={loadHero}
        fallback={<div style={{ height: "100vh" }} />}
      >
        {(ScrollStoryHero) => (
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <ScrollStoryHero />
          </Suspense>
        )}
      </ClientOnly>
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
