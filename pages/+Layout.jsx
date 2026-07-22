// pages/+Layout.jsx
import "../src/index.css";
import { usePageContext } from "vike-react/usePageContext";
import { useEffect, useRef } from "react";
import ErrorBoundary from "../src/components/ErrorBoundary";
import CustomCursor from "../src/components/CustomCursor";
import { SERVICE_META } from "@/data/services";
import { BLOGS } from "@/data/blogs";
import { CASE_STUDIES } from "@/data/caseStudies";
import { INDUSTRY_META } from "@/data/industries";

// GSAP and Lenis are NOT imported at module level.
// They used to be static imports which put them in the entry-client-routing
// chunk — meaning every page had to download + parse GSAP before rendering.
// Now they are dynamic imports inside useEffect so they load asynchronously
// after the page has already painted, fixing the 25-second black screen on
// direct URL refresh across all pages.

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const { config, urlPathname } = pageContext;
  const lenisRef = useRef(null);
  const gsapRef = useRef(null);
  const STRef = useRef(null);

  // ── Init Lenis + GSAP ScrollTrigger dynamically after first paint ──
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapMod, STMod, LenisMod]) => {
      if (cancelled) return;

      const gsap = gsapMod.default;
      const { ScrollTrigger } = STMod;
      const Lenis = LenisMod.default;

      gsapRef.current = gsap;
      STRef.current = ScrollTrigger;

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
    });

    return () => {
      cancelled = true;
      const lenis = lenisRef.current;
      const gsap = gsapRef.current;
      if (lenis && gsap) {
        // get ticker remove fn safely
        import("gsap").then(m => {
          m.default.ticker.remove((time) => lenis?.raf(time * 1000));
        });
        lenis.destroy();
      }
      lenisRef.current = null;
      gsapRef.current = null;
      STRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  // ── Scroll to top + refresh ScrollTrigger on every page change ──
  useEffect(() => {
    let cancelled = false;
    let userScrolled = false;

    const onUserScroll = () => { userScrolled = true; };
    window.addEventListener("wheel", onUserScroll, { once: true, passive: true });
    window.addEventListener("touchstart", onUserScroll, { once: true, passive: true });

    const scrollToTop = () => {
      if (cancelled || userScrolled) return;
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    };

    const refreshST = () => {
      if (cancelled) return;
      try { STRef.current?.refresh(true); } catch (_) {}
    };

    scrollToTop();
    const raf1 = requestAnimationFrame(() => { scrollToTop(); requestAnimationFrame(refreshST); });
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

  // ── Dynamic SEO meta ──
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
      if (blog) { title = `${blog.title.trim()} | Skyup Digital Solutions`; description = blog.description || description; keywords = blog.Keywords || undefined; }
    }
    const workMatch = urlPathname.match(/^\/work\/([^/]+)$/);
    if (workMatch) {
      const work = CASE_STUDIES.find((w) => w.slug === workMatch[1]);
      if (work) { title = `${work.title} | Case Study | Skyup Digital Solutions`; description = work.summary || description; keywords = undefined; }
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
