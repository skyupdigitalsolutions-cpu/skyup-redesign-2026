import { lazy, Suspense } from "react";
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

// Street3D and ScrollStoryHero both use three.js + @react-three/fiber (883KB chunk).
// Neither is visible until the user scrolls past BulbIntro (330vh) so lazy-loading
// defers parsing that chunk off the critical path entirely — no visual change.
const Street3D = lazy(() => import("@/components/Street3D"));
const ScrollStoryHero = lazy(() => import("@/components/hero/ScrollStoryHero"));

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <Suspense fallback={null}>
        <Street3D />
      </Suspense>
      <WhyChooseUs />
      <Suspense fallback={null}>
        <ScrollStoryHero />
      </Suspense>
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
