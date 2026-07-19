// src/components/about/AboutSeoSchema.jsx
// JSON-LD structured data for the About page: Organization (with real NAP +
// social profiles), AboutPage, and a breadcrumb trail. Rendered into the
// prerendered HTML so search engines can read it directly.
import React from "react";

const SITE = "https://www.skyupdigitalsolutions.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Skyup Digital Solutions",
      url: SITE,
      logo: `${SITE}/images/intro/SKYUP_Logo.svg`,
      email: "contact@skyupdigitalsolutions.com",
      telephone: "+91 8867867775",
      description:
        "AI-powered digital marketing and web development agency in Bangalore helping businesses grow with SEO, paid ads, automation, and conversion-focused websites.",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "2nd Floor, No 23, 14A, Dasarahalli Main Rd, E Block, Sahakar Nagar, Byatarayanapura",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560092",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61584820941998",
        "https://www.instagram.com/skyupdigitalsolutions",
        "https://www.linkedin.com/company/skyup-digital-solutions",
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE}/about/#webpage`,
      url: `${SITE}/about`,
      name: "About Skyup Digital Solutions",
      about: { "@id": `${SITE}/#organization` },
      description:
        "Learn about Skyup Digital Solutions — a Bangalore-based AI-powered digital marketing and web development agency built for measurable business growth.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
      ],
    },
    // Person entities for the real, publicly-displayed team members. jobTitle mirrors
    // the role shown on the page (schema must match visible content). No bios or
    // credentials are invented — name + title + employer only.
    {
      "@type": "Person",
      name: "Roshan Prabhu",
      jobTitle: "AI Developer",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Bhojraj",
      jobTitle: "Social Media Manager",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Harish",
      jobTitle: "Graphic Designer",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Shashi",
      jobTitle: "Full Stack Developer",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Pooja",
      jobTitle: "Frontend Developer",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Srinivas",
      jobTitle: "Backend Developer",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Jahnavi",
      jobTitle: "PPC Executive",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Manasi",
      jobTitle: "SEO Analyst",
      worksFor: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "Person",
      name: "Ismail",
      jobTitle: "Sales Manager",
      worksFor: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function AboutSeoSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
