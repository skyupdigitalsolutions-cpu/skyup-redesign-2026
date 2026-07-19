// src/components/home/HomeSchema.jsx
// Homepage structured data: LocalBusiness (real NAP + geo + hours + social) and
// WebSite. Ported from the live site's local-SEO schema — WITHOUT the unverified
// AggregateRating, which cannot be substantiated (EEAT / Google fake-review risk).
import React from "react";

const SITE = "https://www.skyupdigitalsolutions.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#localbusiness`,
      name: "Skyup Digital Solutions LLP",
      image: `${SITE}/images/skyup-logo.webp`,
      logo: `${SITE}/images/intro/SKYUP_Logo.svg`,
      url: `${SITE}/`,
      email: "contact@skyupdigitalsolutions.com",
      telephone: "+91 8867867775",
      priceRange: "₹₹",
      description:
        "AI-powered digital marketing and web development agency in Bangalore — SEO, performance marketing, social media, web development, UI/UX, branding, video editing, and AI automation.",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "2nd Floor, No 23, 14A, Dasarahalli Main Rd, E Block, Sahakar Nagar, Byatarayanapura",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560092",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0551707,
        longitude: 77.6024609,
      },
      areaServed: { "@type": "City", name: "Bengaluru" },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      sameAs: [
        "https://www.facebook.com/people/SKYUP-Digital-Solutions/61584820941998/",
        "https://www.instagram.com/skyupdigitalsolutions/",
        "https://www.youtube.com/@SKYUPDigitalSolutionsBengaluru",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Skyup Digital Solutions",
      alternateName: "SKYUP Digital",
      url: `${SITE}/`,
      description:
        "Digital marketing and AI automation agency in Bangalore — smart strategies, measurable results, and sustainable growth.",
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#localbusiness` },
    },
  ],
};

export default function HomeSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
