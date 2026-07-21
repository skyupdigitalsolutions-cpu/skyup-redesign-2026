import { lazy, Suspense, useState, useEffect } from "react";
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

// Lazy splits three.js + fiber off the initial bundle.
// They only download when the component actually renders on the client.
const Street3D = lazy(() => import("@/components/Street3D"));
const ScrollStoryHero = lazy(() => import("@/components/hero/ScrollStoryHero"));

// Renders children only after client hydration — prevents SSR from
// touching WebGL components (Canvas, three.js) which crash on the server.
function ClientMount({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? children : fallback;
}

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <ClientMount fallback={<div style={{ height: "100vh", background: "#04050C" }} />}>
        <Suspense fallback={<div style={{ height: "100vh", background: "#04050C" }} />}>
          <Street3D />
        </Suspense>
      </ClientMount>
      <WhyChooseUs />
      <ClientMount fallback={<div style={{ height: "100vh", background: "#04050C" }} />}>
        <Suspense fallback={<div style={{ height: "100vh", background: "#04050C" }} />}>
          <ScrollStoryHero />
        </Suspense>
      </ClientMount>
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
