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

  // ── Lenis smooth scroll + GSAP ScrollTrigger — runs once on mount ──
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
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  // ── On every page change: scroll to top + refresh ScrollTrigger ──
  // This runs on both hard refresh AND client-side navigation.
  //
  // WHY ScrollTrigger.refresh() is critical:
  // When Lenis scrolls to 0, the visual position resets but ScrollTrigger
  // still holds measurements from the previous page's DOM (pin positions,
  // trigger offsets, scroll percentages). Without refresh(), every
  // animation on the new page fires at wrong scroll positions — elements
  // appear stuck, animations don't play, pins are in wrong places.
  //
  // WHY multiple timeouts:
  // Hard refresh: browser restores scroll position AFTER useEffect runs,
  // sometimes up to 500ms later on slow mobile. We keep resetting to 0
  // until the user intentionally scrolls.
  useEffect(() => {
    let cancelled = false;
    let userScrolled = false;

    const onUserScroll = () => { userScrolled = true; };
    window.addEventListener("wheel", onUserScroll, { once: true, passive: true });
    window.addEventListener("touchstart", onUserScroll, { once: true, passive: true });

    const scrollToTop = () => {
      if (cancelled || userScrolled) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    const refreshST = () => {
      if (cancelled) return;
      try { ScrollTrigger.refresh(true); } catch (_) {}
    };

    // Immediate reset
    scrollToTop();

    // rAF 1: reset again (catches one-frame-late browser restoration)
    const raf1 = requestAnimationFrame(() => {
      scrollToTop();
      // Refresh ScrollTrigger AFTER scroll is at 0 so it measures correctly
      requestAnimationFrame(refreshST);
    });

    // Belt-and-suspenders for slow mobile browsers
    const t1 = setTimeout(() => { scrollToTop(); refreshST(); }, 150);
    const t2 = setTimeout(() => { scrollToTop(); refreshST(); }, 500);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
    };
  }, [urlPathname]);

  // ── Dynamic SEO meta per page ──
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
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "description"); document.head.appendChild(tag); }
      tag.setAttribute("content", description);
    }

    if (keywords) {
      let tag = document.querySelector('meta[name="keywords"]');
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "keywords"); document.head.appendChild(tag); }
      tag.setAttribute("content", keywords);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://www.skyupdigitalsolutions.com${urlPathname === "/" ? "" : urlPathname}`);
  }, [urlPathname, config]);

  return <ErrorBoundary><CustomCursor />{children}</ErrorBoundary>;
}
