// pages/+onBeforeRoute.js
import { redirect } from "vike/abort";

// Permanent (301) redirects for services removed in the final architecture.
// crm & email-marketing → Works; machine-learning → AI Automation; video-production → Video Editing.
const REMOVED_SERVICE_REDIRECTS = {
  "/service/crm": "/works",
  "/service/email-marketing": "/works",
  "/service/machine-learning": "/service/ai-automation",
  "/service/video-production": "/service/video-editing",
};

export function onBeforeRoute(pageContext) {
  const { urlPathname } = pageContext;

  // 301 away from removed service routes (check before trailing-slash logic).
  const target = REMOVED_SERVICE_REDIRECTS[urlPathname.replace(/\/$/, "") || "/"];
  if (target) {
    throw redirect(target, 301);
  }

  // Normalise trailing slashes.
  if (urlPathname !== "/" && urlPathname.endsWith("/")) {
    throw redirect(urlPathname.slice(0, -1));
  }
}
