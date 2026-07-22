// src/pages/About.jsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSeoSchema from "../components/about/AboutSeoSchema";
import AboutUniverse from "../components/about/AboutUniverse";

export default function About() {
  return (
    <div style={{ background: "#03040a" }}>
      <AboutSeoSchema />
      <Header />
      <AboutUniverse />
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
