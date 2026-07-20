// Shared constants for the Street3D walk-through. Imported by BOTH the parent
// (overlays + scroll logic) and the code-split WebGL scene, so there's a single
// source of truth (no drift between the 3D meshes and the HTML overlays).

export const COLORS = { blue: "#0037CA", blueLight: "#3D6BF0", orange: "#FA9F43", bg: "#0A0805" };
export const BASE = "/images/street";

/* Shops placed down the street. side: which wall. z: distance into the lane (more negative = further). */
export const SHOPS = [
  { id: "web",    img: `${BASE}/website.avif`,     name: "Website Design & Development", short: "Website", href: "/service/web-development",        side: "right", z: -14,  next: "SEO Studio, just ahead →" },
  { id: "seo",    img: `${BASE}/seo.avif`,         name: "SEO Studio",                   short: "SEO",     href: "/service/seo",                    side: "left",  z: -26,  next: "PPC Corner, just around the corner →" },
  { id: "ppc",    img: `${BASE}/ppc.avif`,         name: "PPC Corner",                   short: "PPC",     href: "/service/performance-marketing",  side: "right", z: -38,  next: "AI Automation Lab, coming up →" },
  { id: "ai",     img: `${BASE}/ai.avif`,          name: "AI Automation Lab",            short: "AI",      href: "/service/ai-automation",          side: "left",  z: -50,  next: "Social Media House, last stop →" },
  { id: "social", img: `${BASE}/socialmedia.avif`, name: "Social Media House",           short: "Social",  href: "/service/social-media-marketing", side: "right", z: -62,  next: null },
];

export const CAM_START = 12;    // camera z at entrance (further back = full entrance in frame)
export const CAM_END = -68;     // camera z at end of lane
export const SCROLL_VH = 260;   // total scroll length for the walk
export const ENTRANCE_Z = 2;    // z position of the entrance image
export const ENTRANCE_ASPECT = 1672 / 941; // native aspect of entrance.avif
