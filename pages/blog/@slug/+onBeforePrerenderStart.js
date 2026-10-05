// Tells Vike which /blog/<slug> pages to generate at build time.
import { BLOGS } from "@/data/blogs";

export function onBeforePrerenderStart() {
  return BLOGS.map((b) => `/blog/${b.slug}`);
}