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

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const { config, urlPathname } = pageContext;
  const lenisRef = useRef(null);

  // ── Smooth scrolling (Lenis) synced with GSAP ScrollTrigger ──
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") window.__lenis = lenis;

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

  // ── Force every page to top on navigation AND refresh ──
  // Critical: after scrolling to 0 we MUST call ScrollTrigger.refresh()
  // so pinned sections recalculate their start/end positions against the
  // new page's DOM. Without this, animations from the previous page's
  // measurements bleed into the new page — causing broken animations,
  // wrong pin positions, and elements stuck in mid-animation state.
  useEffect(() => {
    let cancelled = false;
    let userScrolled = false;

    const onUserScroll = () => { userScrolled = true; };
    window.addEventListener("wheel", onUserScroll, { once: true, passive: true });
    window.addEventListener("touchstart", onUserScroll, { once: true, passive: true });

    const reset = () => {
      if (cancelled || userScrolled) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    const refreshTriggers = () => {
      if (cancelled) return;
      try { ScrollTrigger.refresh(); } catch {}
    };

    // Step 1: scroll to top immediately
    reset();

    // Step 2: scroll to top next frame (catches browser late restoration)
    const id1 = requestAnimationFrame(() => {
      reset();
      // Step 3: refresh ScrollTrigger AFTER scroll reset so it remeasures
      // the new page's DOM with scroll=0 as the baseline
      requestAnimationFrame(refreshTriggers);
    });

    // Step 4: belt-and-suspenders resets for slow mobile browsers
    const id3 = setTimeout(() => { reset(); refreshTriggers(); }, 150);
    const id4 = setTimeout(() => { reset(); refreshTriggers(); }, 400);

    return () => {
      cancelled = true;
      cancelAnimationFrame(id1);
      clearTimeout(id3);
      clearTimeout(id4);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
    };
  }, [urlPathname]);

  // ── Dynamic SEO ──
  useEffect(() => {
    let title = config?.title;
    let description = config?.metaDescription;
    let keywords = config?.keywords;

    const serviceMatch = urlPathname.match(/^\/service\/([^/]+)$/);
    if (serviceMatch && SERVICE_META[serviceMatch[1]]) {
      const m = SERVICE_META[serviceMatch[1]];
      title = m.title; description = m.description; keywords = undefined;
    }

    const blogMatch = urlPathname.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const blog = BLOGS.find((b) => b.slug === blogMatch[1]);
      if (blog) {
        title = `${blog.title.trim()} | Skyup Digital Solutions`;
        description = blog.description || description;
        keywords = blog.Keywords || undefined;
      }
    }

    const workMatch = urlPathname.match(/^\/work\/([^/]+)$/);
    if (workMatch) {
      const work = CASE_STUDIES.find((w) => w.slug === workMatch[1]);
      if (work) {
        title = `${work.title} | Case Study | Skyup Digital Solutions`;
        description = work.summary || description;
        keywords = undefined;
      }
    }

    const industryMatch = urlPathname.match(/^\/industries\/([^/]+)$/);
    if (industryMatch && INDUSTRY_META[industryMatch[1]]) {
      const m = INDUSTRY_META[industryMatch[1]];
      title = m.title; description = m.description; keywords = undefined;
    }

    if (title) document.title = title;

    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) { descTag = document.createElement("meta"); descTag.setAttribute("name", "description"); document.head.appendChild(descTag); }
      descTag.setAttribute("content", description);
    }

    if (keywords) {
      let kwTag = document.querySelector('meta[name="keywords"]');
      if (!kwTag) { kwTag = document.createElement("meta"); kwTag.setAttribute("name", "keywords"); document.head.appendChild(kwTag); }
      kwTag.setAttribute("content", keywords);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://www.skyupdigitalsolutions.com${urlPathname === "/" ? "" : urlPathname}`);
  }, [urlPathname, config]);

  return <ErrorBoundary><CustomCursor />{children}</ErrorBoundary>;
}
