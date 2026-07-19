import React from "react";
import { getAuthor } from "@/data/blogs";

// Site + org constants (keep in sync with AboutSeoSchema).
const SITE = "https://www.skyupdigitalsolutions.com";
const ORG_ID = `${SITE}/#organization`;
const LOGO = `${SITE}/logo.png`;

// "Apr 19, 2026" -> "2026-04-19" (ISO date). Falls back to the raw string.
function toISO(d) {
  if (!d) return undefined;
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().split("T")[0];
}

/**
 * Emits Article JSON-LD (+ BreadcrumbList) for a blog post.
 * Additive only — renders nothing visible. Does not touch layout or content.
 */
export default function BlogArticleSchema({ blog }) {
  if (!blog) return null;

  const url = `${SITE}/blog/${blog.slug}`;
  const author = getAuthor(blog.author);
  const image = blog.heroImage || blog.coverImage || blog.image;
  const published = toISO(blog.date);
  const modified = toISO(blog.updated || blog.date);
  const isTeam = author.name.toLowerCase().includes("team");

  const graph = [
    {
      "@type": "Article",
      "@id": `${url}/#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: (blog.headline || blog.title || "").trim(),
      description: blog.excerpt || blog.description || undefined,
      image: image ? [image] : undefined,
      datePublished: published,
      dateModified: modified,
      inLanguage: "en-IN",
      articleSection: blog.category || undefined,
      author: {
        "@type": isTeam ? "Organization" : "Person",
        name: author.name,
        ...(isTeam ? {} : { jobTitle: author.role, worksFor: { "@id": ORG_ID } }),
        url: `${SITE}${author.url || "/about"}`,
      },
      publisher: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Skyup Digital Solutions",
        logo: { "@type": "ImageObject", url: LOGO },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE}/blogs` },
        { "@type": "ListItem", position: 3, name: (blog.title || "").trim(), item: url },
      ],
    },
  ];

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
