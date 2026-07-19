import ContactHero from "@/components/contact/ContactHero";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Old ContactDetails form (with company address / white form) is no longer used.
// ContactHero now plays the UFO scene and then shows the new full-screen form.
export default function Contact() {
  return (
    <div>
      <Header />
      <ContactHero />
      <Footer />
    </div>
  );
}
