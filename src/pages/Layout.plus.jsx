// pages/+Layout.jsx
import "../src/index.css";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ErrorBoundary from "../src/components/ErrorBoundary";

// Set as early as the module loads — before any effect runs — so the browser
// never restores the previous scroll position on a refresh / full load.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// ── Dynamic SEO for slug pages ──────────────────────────────────
// If/when the redesign has these data files, uncomment the imports
// AND the matching blocks inside the effect below.
//
// import { SERVICES, DEFAULT_SERVICE_SLUG } from "../src/data/servicesData";
// import { BLOGS } from "../src/data/blogs";

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const { config, urlPathname } = pageContext;

  // ── Always start at the top on a full page load / refresh ──
  // The browser (and Lenis) can otherwise land the user mid-page. We force the
  // top immediately, on the next frame, after a short delay, and on `load` —
  // covering every timing where a restore could sneak in. Runs once on
  // hydration only, so it never fights vike-react's client-side nav.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const toTop = () => {
      window.scrollTo(0, 0);
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    };
    toTop();
    const raf = requestAnimationFrame(toTop);
    const t = setTimeout(toTop, 80);
    window.addEventListener("load", toTop);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); window.removeEventListener("load", toTop); };
  }, []);

  // ── Smooth scrolling (Lenis) synced with GSAP ScrollTrigger ──
  // Buttery scroll + smooth handoff between the pinned intro / hero sections.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.15,            // higher = smoother / more glide
      smoothWheel: true,
      touchMultiplier: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    window.__lenis = lenis;                  // expose so pages (e.g. About) drive the same instance
    lenis.scrollTo(0, { immediate: true });  // start at the top, not a restored position

    // drive Lenis off GSAP's ticker and let ScrollTrigger read Lenis' scroll
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    let title = config?.title;
    // Use metaDescription for static pages (avoids Vike native duplicate)
    let description = config?.metaDescription;
    let keywords = config?.keywords;

    // ── Service slug pages ────────────────────────────────────
    // const serviceMatch = urlPathname.match(/^\/services\/(.+)$/);
    // if (serviceMatch) {
    //   const slug = serviceMatch[1];
    //   const data = SERVICES[slug] || SERVICES[DEFAULT_SERVICE_SLUG];
    //   title = data?.title;
    //   description = data?.description; // data file still uses .description
    //   keywords = data?.keyword;
    // }

    // ── Blog slug pages ───────────────────────────────────────
    // const blogMatch = urlPathname.match(/^\/blog\/(.+)$/);
    // if (blogMatch) {
    //   const slug = blogMatch[1];
    //   const blog = BLOGS.find((b) => b.slug === slug);
    //   title = blog?.title;
    //   description = blog?.description; // data file still uses .description
    //   keywords = blog?.Keywords;
    // }

    // ── Apply title ───────────────────────────────────────────
    if (title) document.title = title;

    // ── Apply description ─────────────────────────────────────
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description ?? "");

    // ── Apply keywords ────────────────────────────────────────
    let kwTag = document.querySelector('meta[name="keywords"]');
    if (!kwTag) {
      kwTag = document.createElement("meta");
      kwTag.setAttribute("name", "keywords");
      document.head.appendChild(kwTag);
    }
    kwTag.setAttribute("content", keywords ?? "");

    // ── Canonical ─────────────────────────────────────────────
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `https://www.skyupdigitalsolutions.com${urlPathname === "/" ? "" : urlPathname}`
    );
  }, [urlPathname, config]);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}