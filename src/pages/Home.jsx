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

// Lazy — defers three.js chunk off the initial client bundle parse.
// ClientOnly — keeps these off SSR entirely, no hydration mismatch.
const Street3D = lazy(() => import("@/components/Street3D"));
const ScrollStoryHero = lazy(() => import("@/components/hero/ScrollStoryHero"));

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <ClientOnly fallback={<div style={{ height: "100vh" }} />}>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>
          <Street3D />
        </Suspense>
      </ClientOnly>
      <WhyChooseUs />
      <ClientOnly fallback={<div style={{ height: "100vh" }} />}>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>
          <ScrollStoryHero />
        </Suspense>
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
