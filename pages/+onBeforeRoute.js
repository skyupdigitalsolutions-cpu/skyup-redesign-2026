// pages/+onBeforeRoute.js
import { redirect } from "vike/abort";

// Permanent (301) redirects for services removed in the final architecture.
const REMOVED_SERVICE_REDIRECTS = {
  "/service/crm": "/works",
  "/service/email-marketing": "/works",
  "/service/machine-learning": "/service/ai-automation",
  "/service/video-production": "/service/video-editing",
};

export function onBeforeRoute(pageContext) {
  const { urlPathname } = pageContext;

  // 301 away from removed service routes.
  // Strip trailing slash only for the lookup key so /service/crm/ also matches.
  const target = REMOVED_SERVICE_REDIRECTS[urlPathname.replace(/\/$/, "") || "/"];
  if (target) {
    throw redirect(target, 301);
  }

  // NOTE: Do NOT strip trailing slashes here.
  // Cloudflare Pages / Netlify both serve directory-index files with a trailing slash
  // and issue a 308 redirect from /about → /about/. If we redirect /about/ → /about
  // here, we create an infinite redirect loop: Vike removes slash → host adds it back.
  // trailingSlash: true in +config.js handles canonical URL generation instead.
}
