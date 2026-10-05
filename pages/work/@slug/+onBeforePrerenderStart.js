// Tells Vike which /work/<slug> pages to generate at build time.
import { CASE_STUDIES } from "@/data/caseStudies";

export function onBeforePrerenderStart() {
  return CASE_STUDIES.map((c) => `/work/${c.slug}`);
}