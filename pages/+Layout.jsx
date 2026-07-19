// pages/+Layout.jsx
import "../src/index.css";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ErrorBoundary from "../src/components/ErrorBoundary";
import CustomCursor from "../src/components/CustomCursor";
import { SERVICE_META } from "@/data/services";
import { BLOGS } from "@/data/blogs";
import { CASE_STUDIES } from "@/data/caseStudies";
import { INDUSTRY_META } from "@/data/industries";

// ── Dynamic SEO for slug pages ──────────────────────────────────
// If/when the redesign has these data files, uncomment the imports
// AND the matching blocks inside the effect below.
//
// import { SERVICES, DEFAULT_SERVICE_SLUG } from "../src/data/servicesData";
// import { BLOGS } from "../src/data/blogs";

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const { config, urlPathname } = pageContext;
  const lenisRef = useRef(null);

  // ── Smooth scrolling (Lenis) synced with GSAP ScrollTrigger ──
  // Buttery scroll + smooth handoff between the pinned intro / hero sections.
  useEffect(() => {
    // Stop the browser restoring the previous scroll position on reload. Combined with
    // the route-change reset below, this guarantees scroll-driven heroes (e.g. About)
    // always open at frame 0 instead of mid-sequence (the white-flash end state).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.15,            // higher = smoother / more glide
      smoothWheel: true,
      touchMultiplier: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") window.__lenis = lenis; // let scroll-driven heroes (e.g. About) drive Lenis instead of fighting it

    // drive Lenis off GSAP's ticker and let ScrollTrigger read Lenis' scroll
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined" && window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  // ── Start every navigated/loaded page at the very top (Lenis-aware) ──
  // window.scrollTo alone doesn't move Lenis' virtual scroll, so we reset Lenis itself.
  // Reset immediately and again next frame, since the browser can apply its restored
  // scroll position a beat after the first effect runs.
  useEffect(() => {
    const toTop = () => {
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    };
    toTop();
    const id = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(id);
  }, [urlPathname]);

  useEffect(() => {
    let title = config?.title;
    // Use metaDescription for static pages (avoids Vike native duplicate)
    let description = config?.metaDescription;
    let keywords = config?.keywords;

    // ── Service slug pages (/service/<slug>) ──────────────────
    const serviceMatch = urlPathname.match(/^\/service\/([^/]+)$/);
    if (serviceMatch && SERVICE_META[serviceMatch[1]]) {
      const m = SERVICE_META[serviceMatch[1]];
      title = m.title;
      description = m.description;
      keywords = undefined;
    }

    // ── Blog article pages (/blog/<slug>) ─────────────────────
    const blogMatch = urlPathname.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const blog = BLOGS.find((b) => b.slug === blogMatch[1]);
      if (blog) {
        title = `${blog.title.trim()} | Skyup Digital Solutions`;
        description = blog.description || description;
        keywords = blog.Keywords || undefined;
      }
    }

    // ── Work case-study pages (/work/<slug>) ──────────────────
    const workMatch = urlPathname.match(/^\/work\/([^/]+)$/);
    if (workMatch) {
      const work = CASE_STUDIES.find((w) => w.slug === workMatch[1]);
      if (work) {
        title = `${work.title} | Case Study | Skyup Digital Solutions`;
        description = work.summary || description;
        keywords = undefined;
      }
    }

    // ── Industry landing pages (/industries/<slug>) ───────────
    const industryMatch = urlPathname.match(/^\/industries\/([^/]+)$/);
    if (industryMatch && INDUSTRY_META[industryMatch[1]]) {
      const m = INDUSTRY_META[industryMatch[1]];
      title = m.title;
      description = m.description;
      keywords = undefined;
    }

    // ── Apply title ───────────────────────────────────────────
    if (title) document.title = title;

    // ── Apply description (don't blank an SSR-set value) ──────
    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.setAttribute("name", "description");
        document.head.appendChild(descTag);
      }
      descTag.setAttribute("content", description);
    }

    // ── Apply keywords (only when present) ────────────────────
    if (keywords) {
      let kwTag = document.querySelector('meta[name="keywords"]');
      if (!kwTag) {
        kwTag = document.createElement("meta");
        kwTag.setAttribute("name", "keywords");
        document.head.appendChild(kwTag);
      }
      kwTag.setAttribute("content", keywords);
    }

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

  return <ErrorBoundary><CustomCursor />{children}</ErrorBoundary>;
}