import BlogList from "@/components/blogs/BlogList";
import BlogHerosection from "@/components/blogs/BlogHerosection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Blogs() {
  return (
    <div>
      <Header />
      <BlogHerosection />
      <BlogList />
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