import { useRef, useState, useEffect, useLayoutEffect, useMemo, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const COLORS = { blue: "#0037CA", blueLight: "#3D6BF0", orange: "#FA9F43", bg: "#0A0805" };
const BASE = "/images/street";

/* Shops placed down the street. side: which wall. z: distance into the lane (more negative = further). */
const SHOPS = [
  { id: "web",    img: `${BASE}/website.avif`,     name: "Website Design & Development", short: "Website", href: "/service/web-development",        side: "right", z: -14,  next: "SEO Studio, just ahead →" },
  { id: "seo",    img: `${BASE}/seo.avif`,         name: "SEO Studio",                   short: "SEO",     href: "/service/seo",                    side: "left",  z: -26,  next: "PPC Corner, just around the corner →" },
  { id: "ppc",    img: `${BASE}/ppc.avif`,         name: "PPC Corner",                   short: "PPC",     href: "/service/performance-marketing",  side: "right", z: -38,  next: "AI Automation Lab, coming up →" },
  { id: "ai",     img: `${BASE}/ai.avif`,          name: "AI Automation Lab",            short: "AI",      href: "/service/ai-automation",          side: "left",  z: -50,  next: "Social Media House, last stop →" },
  { id: "social", img: `${BASE}/socialmedia.avif`, name: "Social Media House",           short: "Social",  href: "/service/social-media-marketing", side: "right", z: -62,  next: null },
];

const CAM_START = 12;    // camera z at entrance (further back = full entrance in frame)
const CAM_END = -68;     // camera z at end of lane
const SCROLL_VH = 260;   // total scroll length for the walk (was 700 — far too long)
const ENTRANCE_Z = 2;    // z position of the entrance image
const ENTRANCE_ASPECT = 1672 / 941; // native aspect of entrance.avif

/* a single shopfront plane, angled toward the street centre */
function Shopfront({ shop, isMobile }) {
  const tex = useTexture(shop.img);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const W = 12, H = 6.75; // 16:9 panel
  // Portrait phones have a narrow horizontal view, so the desktop x=6.8 storefronts
  // fall outside the frame. Pull them nearer the path and scale down a touch so each
  // store is visible as you walk past. (MOBILE_OFFSET / MOBILE_SCALE = easy to tune.)
  const MOBILE_OFFSET = 4.6, MOBILE_SCALE = 0.82;
  const offset = isMobile ? MOBILE_OFFSET : 6.8;
  const x = shop.side === "right" ? offset : -offset;
  const rotY = shop.side === "right" ? -Math.PI / 6 : Math.PI / 6;

  return (
    <group position={[x, 1.5, shop.z]} rotation={[0, rotY, 0]} scale={isMobile ? MOBILE_SCALE : 1}>
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* soft warm glow strip under the shop */}
      <mesh position={[0, -H / 2 - 0.1, 0.01]}>
        <planeGeometry args={[W, 0.5]} />
        <meshBasicMaterial color={COLORS.orange} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* the entrance backdrop you push through — sized to show the FULL image, framed
   to the viewport at the opening position (contain fit, recalculated on resize) */
function Entrance() {
  const tex = useTexture(`${BASE}/entrance.avif`);
  useMemo(() => { tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; }, [tex]);
  const ref = useRef();
  const matRef = useRef();
  const { camera, size } = useThree();

  useIso(() => {
    if (!ref.current) return;
    const d = CAM_START - ENTRANCE_Z;                 // distance at the opening frame
    const vFov = (camera.fov * Math.PI) / 180;
    const visH = 2 * Math.tan(vFov / 2) * d;          // visible height at that distance
    const visW = visH * (size.width / size.height);   // visible width for this viewport
    // contain: fit the whole image inside the frame (no cropping)
    let h = visH, w = h * ENTRANCE_ASPECT;
    if (w > visW) { w = visW; h = w / ENTRANCE_ASPECT; }
    ref.current.scale.set(w, h, 1);
    ref.current.position.set(0, camera.position.y, ENTRANCE_Z);
  }, [size.width, size.height]);

  // fade the gate out as we approach it, so we walk THROUGH it into the street
  // (instead of zooming into the flat photo)
  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = THREE.MathUtils.clamp((camera.position.z - (ENTRANCE_Z + 0.5)) / 4, 0, 1);
  });

  return (
    <mesh ref={ref} position={[0, 1.5, ENTRANCE_Z]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={matRef} map={tex} toneMapped={false} transparent depthWrite={false} />
    </mesh>
  );
}

/* a round, soft glowing bulb sprite (built on the client only) */
function useBulbTexture() {
  return useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,242,214,1)");
    g.addColorStop(0.25, "rgba(255,194,122,0.95)");
    g.addColorStop(0.6, "rgba(250,150,70,0.35)");
    g.addColorStop(1, "rgba(250,150,70,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/* overhead festoon string-lights running the whole length of the lane.
   These stream past overhead as you move forward — the main "walking" cue. */
function StringLights() {
  const tex = useBulbTexture();
  const geo = useMemo(() => {
    const pos = [];
    const ROWS = 24, Z0 = 1, Z1 = -66, SPAN = 7, TOP = 6.2, DROOP = 1.7, PER_ROW = 16;
    for (let r = 0; r < ROWS; r++) {
      const z = Z0 + (Z1 - Z0) * (r / (ROWS - 1));
      for (let i = 0; i < PER_ROW; i++) {
        const t = i / (PER_ROW - 1);
        const x = -SPAN + 2 * SPAN * t;
        const k = x / SPAN;                      // -1..1
        const y = TOP - DROOP * (1 - k * k);     // catenary sag, lowest at centre
        pos.push(x, y, z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial map={tex} color="#FFC98A" size={0.5} sizeAttenuation transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* scattered warm shop/window lights along both walls — side parallax while walking */
function StreetAmbience() {
  const tex = useBulbTexture();
  const geo = useMemo(() => {
    const pos = [];
    const N = 70, Z0 = 0, Z1 = -66;
    for (let i = 0; i < N; i++) {
      const z = Z0 + (Z1 - Z0) * (i / (N - 1)) + (Math.random() - 0.5) * 1.6;
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (6 + Math.random() * 2.6);
      const y = -0.6 + Math.random() * 3.4;
      pos.push(x, y, z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial map={tex} color="#FFB066" size={0.9} sizeAttenuation transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* dark reflective-ish floor + fog for depth */
function Environment() {
  return (
    <>
      <fog attach="fog" args={[COLORS.bg, 14, 64]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -30]}>
        <planeGeometry args={[48, 150]} />
        <meshBasicMaterial color="#0E0A06" />
      </mesh>
      {/* glowing centre light trail down the path — the perspective line you walk along */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, -30]}>
        <planeGeometry args={[3.2, 150]} />
        <meshBasicMaterial color={COLORS.orange} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

/* Mounts only after every suspending texture inside <Suspense> has resolved,
   so it's a reliable "the 3D scene is actually drawable now" signal. */
function SceneReady({ onReady }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

/* camera rig driven by a shared scroll ref */
function CameraRig({ scroll, isMobile }) {
  const { camera } = useThree();
  // Wider field of view on mobile so the street (and its side storefronts) fits the
  // narrow portrait frame instead of only showing the center path.
  useEffect(() => {
    camera.fov = isMobile ? 86 : 60;
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);
  useFrame(() => {
    const p = scroll.current; // 0..1
    const targetZ = CAM_START + (CAM_END - CAM_START) * p;
    camera.position.z += (targetZ - camera.position.z) * 0.1;
    camera.position.y = 1.5;
    camera.position.x = Math.sin(p * Math.PI * 2) * 0.3; // gentle sway
    camera.lookAt(0, 1.5, camera.position.z - 10);
  });
  return null;
}

export default function Street3D() {
  const root = useRef(null);
  const stageRef = useRef(null);
  const scroll = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(-1);
  const [atEnd, setAtEnd] = useState(false);
  const [inView, setInView] = useState(false); // render the WebGL scene only while on-screen
  const activeRef = useRef(-1);   // last value pushed to React state (avoids per-frame re-render)
  const atEndRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);       // true once textures have resolved + drawn
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => setMounted(true), []);

  // Diagnostic safety net: if the scene never becomes ready, surface it instead of
  // showing a silent black canvas.
  useEffect(() => {
    if (!mounted || ready) return;
    const t = setTimeout(() => setLoadFailed(true), 6000);
    return () => clearTimeout(t);
  }, [mounted, ready]);


  // Track portrait / narrow viewports so the 3D market adapts (see Shopfront + CameraRig).
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820 || window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => { window.removeEventListener("resize", check); window.removeEventListener("orientationchange", check); };
  }, []);

  // Scroll-driven walk: scrub the camera down the market as you scroll (normal both directions).
  // Render the scene only while the section is on-screen (with a generous margin so
  // it's fully drawn before the user sees it). Off-screen → stop the render loop.
  useEffect(() => {
    const el = stageRef.current || root.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${SCROLL_VH}%`,
        scrub: 1,
        pin: ".s3d-stage",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scroll.current = self.progress;
          const camZ = CAM_START + (CAM_END - CAM_START) * self.progress;
          const last = SHOPS[SHOPS.length - 1];
          let nextAtEnd = false, nextActive = -1;
          if (self.progress > 0.9 || camZ < last.z - 1.5) {
            // Past the final shop → show the closing panel instead of blank black.
            nextAtEnd = true; nextActive = -1;
          } else if (camZ > 2) {
            // Not walked in yet → keep the "scroll to walk in" hint.
            nextActive = -1;
          } else {
            // Bias shop positions toward the camera so each name appears BEFORE you reach
            // the shop, while still matching the shop you're facing.
            const BIAS = 6;
            let idx = 0, best = 1e9;
            SHOPS.forEach((s, i) => { const d = Math.abs(camZ - (s.z + BIAS)); if (d < best) { best = d; idx = i; } });
            nextActive = idx;
          }
          // Only touch React state when a value actually changes — this keeps the scroll
          // loop from re-rendering the component (and the WebGL tree) on every frame.
          if (nextAtEnd !== atEndRef.current) { atEndRef.current = nextAtEnd; setAtEnd(nextAtEnd); }
          if (nextActive !== activeRef.current) { activeRef.current = nextActive; setActive(nextActive); }
        },
      });
      return () => st.kill();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="relative w-full"
      style={{ background: COLORS.bg }}
      aria-label="Our services — walk through the Skyup digital market"
    >
      <div ref={stageRef} className="s3d-stage h-screen w-full overflow-hidden" style={{ background: COLORS.bg }}>
        {mounted && (
          <Canvas
            frameloop={inView ? "always" : "never"}
            camera={{ position: [0, 1.5, CAM_START], fov: isMobile ? 86 : 60, near: 0.1, far: 200 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <color attach="background" args={[COLORS.bg]} />
            <Environment />
            <Suspense fallback={null}>
              <Entrance />
              <StringLights />
              <StreetAmbience />
              {SHOPS.map((s) => <Shopfront key={s.id} shop={s} isMobile={isMobile} />)}
              <SceneReady onReady={() => setReady(true)} />
            </Suspense>
            <CameraRig scroll={scroll} isMobile={isMobile} />
          </Canvas>
        )}

        {/* Loading / failure overlay — replaces the old silent black canvas.
            Shows only while the 3D scene isn't drawable yet. */}
        {mounted && !ready && (
          <div className="pointer-events-none absolute inset-0 z-[6] flex flex-col items-center justify-center gap-3">
            {!loadFailed ? (
              <>
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
                <div className="text-xs uppercase tracking-[0.25em] text-white/45">Loading the street…</div>
              </>
            ) : (
              <div className="max-w-sm px-6 text-center text-sm text-white/60">
                The 3D street didn't finish loading. Open DevTools → Console/Network
                to see if <span className="text-white/80">/images/street/*.avif</span> loaded.
              </div>
            )}
          </div>
        )}

        {/* HTML overlay: CTA + path marker for the active shop */}
        {SHOPS.map((shop, i) => (
          <div
            key={shop.id}
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 text-center" style={{ pointerEvents: active === i ? "auto" : "none" }}>
              <div className="mb-3 font-bold text-white" style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(1.4rem,2.6vw,2.2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}>
                {shop.name}
              </div>
              <a href={shop.href} className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-transform hover:translate-x-0.5"
                style={{ background: COLORS.blue, boxShadow: `0 10px 30px ${COLORS.blue}66` }}>
                Explore {shop.short} <span>→</span>
              </a>
              {shop.next && (
                <div className="mt-5 text-sm text-white/60">{shop.next}</div>
              )}
            </div>
          </div>
        ))}

        {/* closing panel — fills the end of the lane so it never finishes on blank black */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700" style={{ opacity: atEnd ? 1 : 0 }}>
          <div className="px-6 text-center" style={{ pointerEvents: atEnd ? "auto" : "none" }}>
            <div className="text-xs uppercase tracking-[0.3em]" style={{ color: COLORS.orange }}>End of the street</div>
            <div className="mx-auto mt-4 max-w-2xl font-bold text-white" style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.8rem)", lineHeight: 1.2, textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}>
              Every corner of your growth, under one roof.
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="/service" className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-transform hover:translate-x-0.5" style={{ background: COLORS.blue, boxShadow: `0 10px 30px ${COLORS.blue}66` }}>Explore all services <span>→</span></a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-white/50">Let's talk</a>
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SHOPS.map((_, i) => {
            const on = active === i || (atEnd && i === SHOPS.length - 1);
            return (
              <span key={i} className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: on ? 22 : 6, background: on ? COLORS.orange : "rgba(255,255,255,0.3)" }} />
            );
          })}
        </div>

        {active < 0 && !atEnd && (
          <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/50">
            Scroll to walk in
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
