import { lazy, Suspense, useEffect, useState } from "react";
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

// Lazy load the heavy three.js components — they are well below the fold
// (330vh of BulbIntro before Street3D, another 330vh+ before ScrollStoryHero).
// Using a simple mounted gate instead of ClientOnly to avoid the load prop mismatch.
const Street3D = lazy(() => import("@/components/Street3D"));
const ScrollStoryHero = lazy(() => import("@/components/hero/ScrollStoryHero"));

// MountedOnly — renders children only after client hydration, preventing SSR mismatch
// for components that use browser APIs (WebGL, IntersectionObserver, etc.)
function MountedOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return fallback;
  return children;
}

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <MountedOnly fallback={<div style={{ height: "100vh" }} />}>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>
          <Street3D />
        </Suspense>
      </MountedOnly>
      <WhyChooseUs />
      <MountedOnly fallback={<div style={{ height: "100vh" }} />}>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>
          <ScrollStoryHero />
        </Suspense>
      </MountedOnly>
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
