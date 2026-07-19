// src/components/industries/IndustrySchema.jsx
import React from "react";

const SITE = "https://www.skyupdigitalsolutions.com";

export default function IndustrySchema({ industry }) {
  if (!industry) return null;
  const url = `${SITE}/industries/${industry.slug}`;
  const graph = [
    {
      "@type": "Service",
      "@id": `${url}/#service`,
      name: `${industry.name} Digital Marketing`,
      serviceType: `Digital marketing for ${industry.name.toLowerCase()}`,
      url,
      description: industry.metaDescription,
      areaServed: { "@type": "City", name: "Bengaluru" },
      provider: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Skyup Digital Solutions" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE}/industries` },
        { "@type": "ListItem", position: 3, name: industry.name, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: industry.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  const schema = { "@context": "https://schema.org", "@graph": graph };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
