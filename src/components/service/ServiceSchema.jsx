import React from "react";

const SITE = "https://www.skyupdigitalsolutions.com";
const ORG_ID = `${SITE}/#organization`;

/**
 * JSON-LD for a /service/<slug> page — Service + FAQPage + BreadcrumbList.
 * Additive only: renders an invisible <script>, no layout/style impact.
 * All content is read from the service data object (no invented data).
 */
export default function ServiceSchema({ service }) {
  if (!service) return null;

  const url = `${SITE}/service/${service.slug}`;
  const description =
    service.heroSubline || service.tagline || (service.overview && service.overview[0]) || undefined;

  const graph = [
    {
      "@type": "Service",
      "@id": `${url}/#service`,
      name: service.name,
      serviceType: service.name,
      description,
      url,
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "City", name: "Bangalore" },
        { "@type": "Country", name: "India" },
      ],
      ...(service.offerings?.points?.length
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: service.offerings.title || `${service.name} services`,
              itemListElement: service.offerings.points.map((p) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: typeof p === "string" ? p : p.title || p.name,
                },
              })),
            },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/service` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  // FAQPage — only real Q&As from the data.
  if (service.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
