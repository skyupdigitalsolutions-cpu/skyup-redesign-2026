// src/pages/About.jsx
import React, { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSeoSchema from "../components/about/AboutSeoSchema";

// AboutUniverse uses canvas, window, IntersectionObserver, and complex
// animation state that differs between SSR and client — causing hydration
// mismatch and black screen on direct URL refresh.
// Lazy + ClientMount keeps it fully off SSR and loads it only after hydration.
const AboutUniverse = lazy(() => import("../components/about/AboutUniverse"));

function ClientMount({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? children : fallback;
}

export default function About() {
  return (
    <div style={{ background: "#03040a" }}>
      <AboutSeoSchema />
      <Header />
      <ClientMount
        fallback={
          <div style={{
            height: "100vh",
            background: "#03040a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }} />
        }
      >
        <Suspense fallback={
          <div style={{ height: "100vh", background: "#03040a" }} />
        }>
          <AboutUniverse />
        </Suspense>
      </ClientMount>
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
