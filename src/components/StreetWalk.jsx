import { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const COLORS = { blue: "#0037CA", blueLight: "#3D6BF0", orange: "#FA9F43", bg: "#0A0805" };

const BASE = "/images/street";

const SHOPS = [
  {
    id: "web",
    img: `${BASE}/website.avif`,
    name: "Website Design & Development",
    href: "/service/web-development",
    next: "SEO Studio, just ahead →",
  },
  {
    id: "seo",
    img: `${BASE}/seo.avif`,
    name: "SEO Studio",
    href: "/service/seo",
    next: "PPC Corner, just around the corner →",
  },
  {
    id: "ppc",
    img: `${BASE}/ppc.avif`,
    name: "PPC Corner",
    href: "/service/performance-marketing",
    next: "AI Automation Lab, coming up →",
  },
  {
    id: "ai",
    img: `${BASE}/ai.avif`,
    name: "AI Automation Lab",
    href: "/service/ai-automation",
    next: "Social Media House, last stop →",
  },
  {
    id: "social",
    img: `${BASE}/socialmedia.avif`,
    name: "Social Media House",
    href: "/service/social-media-marketing",
    next: null,
  },
];

const SCENE_VH = 130;

export default function StreetWalk() {
  const root = useRef(null);
  const [active, setActive] = useState(-1);

  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scenes = SHOPS.length + 1;
      const total = scenes * SCENE_VH;

      if (reduce) {
        gsap.set(q(".sw-shop, .sw-entrance"), { opacity: 1 });
        gsap.set(q(".sw-cta, .sw-marker"), { opacity: 1, y: 0 });
        gsap.set(q(".sw-shop-img"), { scale: 1 });
        return;
      }

      gsap.set(q(".sw-shop"), { opacity: 0 });
      gsap.set(q(".sw-shop-img"), { scale: 1.0 });
      gsap.set(q(".sw-cta"), { opacity: 0, y: 18 });
      gsap.set(q(".sw-marker"), { opacity: 0 });
      gsap.set(q(".sw-entrance"), { opacity: 1 });
      gsap.set(q(".sw-entrance-img"), { scale: 1.0 });
      gsap.set(q(".sw-entrance-sign"), { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${total}%`,
          scrub: 1,
          pin: q(".sw-stage")[0],
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress * scenes;
            setActive(Math.min(Math.floor(p) - 1, SHOPS.length - 1));
          },
        },
      });

      const seg = 1 / scenes;

      // ENTRANCE: sign reveals, then a continuous forward push THROUGH the arch
      tl.to(q(".sw-entrance-sign"), { opacity: 1, y: 0, duration: seg * 0.45, ease: "power3.out" }, 0);
      tl.to(q(".sw-entrance-img"), { scale: 1.6, duration: seg, ease: "power2.in" }, 0);
      tl.to(q(".sw-entrance"), { opacity: 0, duration: seg * 0.5, ease: "power2.in" }, seg * 0.6);

      // each shop: APPROACH (push in toward you) → hold → WALK PAST (push past camera)
      SHOPS.forEach((shop, i) => {
        const start = seg * (i + 1);
        const shopEl = q(`#sw-shop-${shop.id}`)[0];
        const imgEl = q(`#sw-shop-${shop.id} .sw-shop-img`)[0];
        const ctaEl = q(`#sw-cta-${shop.id}`)[0];
        const markerEl = q(`#sw-marker-${shop.id}`)[0];

        // approach: starts smaller/further, pushes in to fill — forward dolly
        tl.fromTo(shopEl, { opacity: 0 }, { opacity: 1, duration: seg * 0.35, ease: "power2.out" }, start);
        tl.fromTo(imgEl, { scale: 1.0 }, { scale: 1.12, duration: seg * 0.9, ease: "none" }, start);
        tl.fromTo(ctaEl, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: seg * 0.3, ease: "power3.out" }, start + seg * 0.3);

        if (i < SHOPS.length - 1) {
          // walk past: image keeps pushing in + fades (you move through/past it)
          tl.to(imgEl, { scale: 1.32, duration: seg * 0.55, ease: "power2.in" }, start + seg * 0.55);
          tl.to(shopEl, { opacity: 0, duration: seg * 0.5, ease: "power2.in" }, start + seg * 0.6);
          tl.to(ctaEl, { opacity: 0, y: -12, duration: seg * 0.25, ease: "power2.in" }, start + seg * 0.55);
          if (markerEl) {
            tl.fromTo(markerEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: seg * 0.28, ease: "power2.out" }, start + seg * 0.62);
            tl.to(markerEl, { opacity: 0, y: -14, duration: seg * 0.22, ease: "power2.in" }, start + seg * 0.86);
          }
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="relative w-full"
      style={{ height: `${(SHOPS.length + 1) * SCENE_VH + 100}vh`, background: COLORS.bg }}
      aria-label="Our services — a walk through the digital market"
    >
      <div className="sw-stage sticky top-0 h-screen w-full overflow-hidden">
        {/* ENTRANCE */}
        <div className="sw-entrance absolute inset-0">
          <div className="sw-entrance-img h-full w-full" style={{ willChange: "transform" }}>
            <img src={`${BASE}/entrance.avif`} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,5,12,0.25), rgba(4,5,12,0.55))" }} />
          <div className="sw-entrance-sign absolute left-1/2 top-[20%] -translate-x-1/2 text-center px-6">
            <div className="font-bold tracking-[0.04em] text-white" style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(2rem,5vw,4rem)", textShadow: "0 2px 30px rgba(250,159,67,0.5)" }}>
              DIGITAL MARKET
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>
              Walk in · meet our services ↓
            </div>
          </div>
        </div>

        {/* SHOPS — name is baked into the image's wooden board; we add only the CTA + marker */}
        {SHOPS.map((shop) => (
          <div key={shop.id} id={`sw-shop-${shop.id}`} className="sw-shop absolute inset-0">
            <div className="sw-shop-img h-full w-full" style={{ willChange: "transform" }}>
              <img src={shop.img} alt={shop.name} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,5,12,0.10), rgba(4,5,12,0.45))" }} />

            {/* small CTA plaque — sits low-left, no big card */}
            <div id={`sw-cta-${shop.id}`} className="sw-cta absolute bottom-[20%] left-[8%]">
              <a href={shop.href} className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-transform hover:translate-x-0.5"
                style={{ background: COLORS.blue, boxShadow: `0 8px 26px ${COLORS.blue}66` }}>
                Explore {shop.name.split(" ")[0]} <span>→</span>
              </a>
            </div>

            {shop.next && (
              <div id={`sw-marker-${shop.id}`} className="sw-marker absolute bottom-[10%] left-1/2 -translate-x-1/2">
                <div className="rounded-full px-6 py-2.5 text-sm font-medium" style={{ background: "rgba(10,8,5,0.7)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", backdropFilter: "blur(6px)" }}>
                  {shop.next}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* progress dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SHOPS.map((_, i) => (
            <span key={i} className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: active === i ? 22 : 6, background: active === i ? COLORS.orange : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>

        {active < 0 && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/50">
            Scroll to enter
          </div>
        )}
      </div>

      {/* end of lane */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center" style={{ background: COLORS.bg }}>
        <div className="text-xs uppercase tracking-[0.25em]" style={{ color: COLORS.orange }}>Also in the market</div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {["Graphic Design", "CRM", "Branding"].map((s) => (
            <a key={s} href="/service" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white">
              {s}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
