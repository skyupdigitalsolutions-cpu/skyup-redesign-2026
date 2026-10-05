// Tells Vike which /service/<slug> pages to generate at build time.
import { SERVICES } from "@/data/services";

export function onBeforePrerenderStart() {
  return SERVICES.map((s) => `/service/${s.slug}`);
}