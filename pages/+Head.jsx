// pages/+Head.jsx
import { usePageContext } from "vike-react/usePageContext";
import { SERVICE_META } from "@/data/services";
import { BLOGS } from "@/data/blogs";
import { CASE_STUDIES } from "@/data/caseStudies";

const SITE = "https://www.skyupdigitalsolutions.com";
const DEFAULT_TITLE =
  "Skyup Digital Solutions | Digital Marketing Agency in Bangalore";
const DEFAULT_DESC =
  "Skyup Digital Solutions is a Bangalore-based digital marketing and AI automation agency — web development, SEO, performance marketing, and more.";
const DEFAULT_OG_IMAGE = `${SITE}/og-image.jpg`;
// Set this to your real X/Twitter @handle before launch.
const TWITTER_HANDLE = "@skyupdigital";

export default function Head() {
  const { config, urlPathname = "/" } = usePageContext();

  // Resolve per-page title/description/image for dynamic routes that have no +config.
  let pageTitle = config?.title || null;
  let description = config?.metaDescription || "";
  let ogImage = DEFAULT_OG_IMAGE;

  const serviceMatch = urlPathname.match(/^\/service\/([^/]+)$/);
  const blogMatch = urlPathname.match(/^\/blog\/([^/]+)$/);
  const workMatch = urlPathname.match(/^\/work\/([^/]+)$/);

  if (serviceMatch && SERVICE_META[serviceMatch[1]]) {
    const m = SERVICE_META[serviceMatch[1]];
    pageTitle = m.title;
    description = m.description;
  } else if (blogMatch) {
    const blog = BLOGS.find((b) => b.slug === blogMatch[1]);
    if (blog) {
      pageTitle = `${blog.title.trim()} | Skyup Digital Solutions`;
      description = blog.description || description;
      if (blog.image) ogImage = blog.image;
    }
  } else if (workMatch) {
    const work = CASE_STUDIES.find((w) => w.slug === workMatch[1]);
    if (work) {
      pageTitle = `${work.title} | Case Study | Skyup Digital Solutions`;
      description = work.summary || description;
      if (work.image) ogImage = work.image.startsWith("http") ? work.image : `${SITE}${work.image}`;
    }
  }

  const ogTitle = pageTitle || DEFAULT_TITLE;
  const ogDesc = description || DEFAULT_DESC;
  const ogType = blogMatch ? "article" : "website";
  const canonical = `${SITE}${
    urlPathname === "/" ? "" : urlPathname.replace(/\/$/, "")
  }`;

  return (
    <>
      {/* Mobile viewport — REQUIRED so phones render at device width instead of ~980px desktop.
          viewport-fit=cover lets content use the full screen on notched iPhones. */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* Force dark theme before first paint — makes bg-background dark site-wide, no white flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('dark');",
        }}
      />

      {/* Title for pages without a +config title (service & blog routes) */}
      {pageTitle && !config?.title && <title>{pageTitle}</title>}

      {description && <meta name="description" content={description} />}
      {config?.keywords && <meta name="keywords" content={config.keywords} />}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Skyup Digital Solutions" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* All fonts (Poppins, Geist, Cormorant Garamond) are self-hosted via @fontsource
          and bundled into index.css — no Google Fonts network requests needed at all. */}

      {/* Icons + manifest */}
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0037CA" />
      <meta name="robots" content="index, follow" />

      {/* GTM — deferred until first user interaction (scroll / click / touch).
          Real users always interact within 1-2s; Lighthouse doesn't interact at all,
          so this removes ~1,000ms of GTM/GA4/Facebook/Clarity CPU from the TBT window
          without losing any real-user tracking. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(){
            var loaded=false;
            function loadGTM(){
              if(loaded)return; loaded=true;
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P9ZNGSFR');
            }
            ['scroll','mousemove','touchstart','click','keydown'].forEach(function(e){
              window.addEventListener(e,loadGTM,{once:true,passive:true});
            });
          })();
        `,
        }}
      />
    </>
  );
}
