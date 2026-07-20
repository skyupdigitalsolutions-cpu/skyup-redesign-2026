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

// Street3D and ScrollStoryHero use three.js + @react-three/fiber (883KB chunk).
// ClientOnly keeps them out of SSR entirely (no hydration mismatch) and defers
// their JS until the client is interactive — same visual result, no React #419 error.
const Street3D = () => import("@/components/Street3D").then((m) => ({ default: m.default }));
const ScrollStoryHero = () => import("@/components/hero/ScrollStoryHero").then((m) => ({ default: m.default }));

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <ClientOnly load={Street3D} fallback={<div style={{ height: "100vh" }} />} />
      <WhyChooseUs />
      <ClientOnly load={ScrollStoryHero} fallback={<div style={{ height: "100vh" }} />} />
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
