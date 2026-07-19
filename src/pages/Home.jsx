import BulbIntro from "@/components/BulbIntro";
import ScrollStoryHero from "@/components/hero/ScrollStoryHero";
import ValueProposition from "../components/ValueProposition";
import Street3D from "@/components/Street3D";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudies from "@/components/CaseStudies";
import ProcessSection from "@/components/ProcessSection";
import GoogleReviews from "@/components/GoogleReviews";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeSchema from "@/components/home/HomeSchema";

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Header />
      <BulbIntro />
      <Street3D />
      <WhyChooseUs />
      <ScrollStoryHero />
      <CaseStudies />
      <ValueProposition />
      <ProcessSection />
      <GoogleReviews />
      <FaqSection />
      <Footer />
    </>
  );
}
