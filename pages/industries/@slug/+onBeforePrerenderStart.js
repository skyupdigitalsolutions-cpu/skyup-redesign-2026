import { INDUSTRIES } from "@/data/industries";
export function onBeforePrerenderStart() {
  return INDUSTRIES.map((i) => `/industries/${i.slug}`);
}
