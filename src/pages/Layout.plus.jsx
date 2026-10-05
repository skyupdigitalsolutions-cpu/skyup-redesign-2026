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

// Remember scroll position per path. Brand-new navigations (clicking a link)
// start at the top; browser back/forward restores where the user was.
const __scrollPositions = new Map();
let __navType = "push";
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => { __navType = "pop"; });
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

  // ── Scroll handling on every navigation ──
  // New page (link click) → start at top. Back/forward → restore prior position.
  // Runs on first mount and on every client-side route change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const isPop = __navType === "pop";
    // Prefer the in-memory value; fall back to sessionStorage (survives reloads too).
    let savedY = __scrollPositions.get(urlPathname);
    if (typeof savedY !== "number") {
      const ss = Number(sessionStorage.getItem("scroll:" + urlPathname));
      if (!Number.isNaN(ss)) savedY = ss;
    }

    const targetY = isPop && typeof savedY === "number" ? savedY : 0;
    const apply = () => {
      window.scrollTo(0, targetY);
      if (window.__lenis) window.__lenis.scrollTo(targetY, { immediate: true, force: true });
    };

    try { ScrollTrigger.refresh(); } catch {}
    apply();

    // The heavy home page (pinned bulb + WebGL) keeps changing height for a few
    // hundred ms, and Lenis/Vike can nudge scroll right after mount. So for a short
    // window we RE-ASSERT the target every frame — this beats anything else that
    // touches the scroll position and makes back/forward land reliably.
    const cleanups = [];
    if (isPop && targetY > 0) {
      let start = performance.now();
      let rafId = 0;
      const hold = () => {
        try { ScrollTrigger.refresh(); } catch {}
        apply();
        if (performance.now() - start < 900) rafId = requestAnimationFrame(hold);
      };
      rafId = requestAnimationFrame(hold);
      cleanups.push(() => cancelAnimationFrame(rafId));
    } else {
      const raf = requestAnimationFrame(() => { try { ScrollTrigger.refresh(); } catch {} apply(); });
      const timers = [80, 200, 400].map((ms) => setTimeout(apply, ms));
      cleanups.push(() => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); });
    }
    const onLoad = () => { try { ScrollTrigger.refresh(); } catch {} apply(); };
    window.addEventListener("load", onLoad);
    cleanups.push(() => window.removeEventListener("load", onLoad));

    __navType = "push"; // reset for the next navigation

    return () => cleanups.forEach((fn) => fn());
  }, [urlPathname]);

  // Continuously remember the current page's scroll position (for back/forward).
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const save = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.__lenis ? window.__lenis.scroll : window.scrollY;
        __scrollPositions.set(urlPathname, y);
        try { sessionStorage.setItem("scroll:" + urlPathname, String(Math.round(y))); } catch {}
        ticking = false;
      });
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => { save(); window.removeEventListener("scroll", save); };
  }, [urlPathname]);

  // ── Smooth scrolling (Lenis) synced with GSAP ScrollTrigger ──
  // Buttery scroll + smooth handoff between the pinned intro / hero sections.
  useEffect(() => {
    // Low-end devices choke when Lenis' JS scroll loop runs alongside the WebGL
    // heroes — the OS's native scroll is far smoother there. Detect weak hardware
    // (few cores / little RAM) and skip Lenis entirely, like reduced-motion does.
    const nav = typeof navigator !== "undefined" ? navigator : {};
    const lowEnd =
      (nav.deviceMemory && nav.deviceMemory <= 4) ||
      (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4);
    if (typeof document !== "undefined" && lowEnd) document.documentElement.classList.add("low-perf");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || lowEnd) {
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