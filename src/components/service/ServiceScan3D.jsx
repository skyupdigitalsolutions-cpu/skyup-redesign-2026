// src/components/service/ServiceScan3D.jsx
//
// SKYUP Services — 3D "UFO scans its services" hero (Three.js).
// A procedural saucer yaw-spins and hovers, casting a 3D amber cone + glowing
// pool. Services rise one at a time as HTML cards that land in the pool.
//
// Drop-in real model: put a file at /models/ufo.glb and it replaces the
// procedural craft automatically (no code change).
//
// Scroll-driven via rAF + section progress (SSR-safe). Brand: bg #04050C.

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SERVICES } from "@/data/services";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
const smooth = (t) => t * t * (3 - 2 * t);

const ITEMS = SERVICES.slice(0, 10);
const AMBER = new THREE.Color("#FA9F43");

export default function ServiceScan3D() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const revealRef = useRef(null);
  const dotsRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = ITEMS.length;
    const SCAN_START = 0.07, SCAN_END = 0.97;
    const items = revealRef.current ? Array.from(revealRef.current.querySelectorAll(".ss-card")) : [];

    // ---------- Three.js scene ----------
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.1, 7.4);
    camera.lookAt(0, 0.1, 0);

    // lights
    scene.add(new THREE.HemisphereLight(0x9cc0ff, 0x0a0d15, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(3, 6, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0x5b8cff, 1.1);
    rim.position.set(-5, 2, -4); scene.add(rim);
    const under = new THREE.PointLight(0xffb060, 6, 8, 2);
    under.position.set(0, 0.2, 0); scene.add(under);

    // ---------- craft: static PNG billboard (the old UFO), no spin ----------
    const craft = new THREE.Group();
    scene.add(craft);
    const tex = new THREE.TextureLoader().load("/images/skyup-ufo-craft.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    const craftAspect = 1511 / 1024;           // w / h of the craft PNG
    const craftW = 3.5, craftH = craftW / craftAspect;
    const billboard = new THREE.Mesh(
      new THREE.PlaneGeometry(craftW, craftH),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
    );
    craft.add(billboard);
    const craftBaseY = 1.32;                    // tuned so underside meets the beam apex
    craft.position.y = craftBaseY;

    // ---------- 3D beam: cone + pool ----------
    const beamTopY = 1.05, beamH = 2.5, poolY = beamTopY - beamH;
    const coneMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color("#ffc98a") }, uFade: { value: 0 } },
      vertexShader: `varying float vH; varying vec3 vN; varying vec3 vV;
        void main(){ vH = uv.y; vec4 mv = modelViewMatrix*vec4(position,1.0);
          vV = normalize(-mv.xyz); vN = normalize(normalMatrix*normal);
          gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `varying float vH; varying vec3 vN; varying vec3 vV; uniform vec3 uColor; uniform float uFade;
        void main(){
          float fres = 1.0 - abs(dot(normalize(vN), normalize(vV)));
          float edge = smoothstep(1.0, 0.25, fres);        // fade the silhouette edges -> soft
          float a = (pow(vH,1.7)*0.16 + 0.025) * edge * uFade; // bright near craft, translucent
          gl_FragColor = vec4(uColor, a);
        }`,
    });
    // ConeGeometry: apex at +y (top, narrow), base radius at -y (bottom, wide)
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.45, beamH, 64, 1, true), coneMat);
    cone.position.y = beamTopY - beamH / 2;
    scene.add(cone);

    const poolMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color("#ffd9a0") }, uFade: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: `varying vec2 vUv; uniform vec3 uColor; uniform float uFade;
        void main(){ float d = length(vUv-0.5)*2.0; float a = pow(1.0-clamp(d,0.0,1.0),2.6); gl_FragColor = vec4(mix(uColor,vec3(1.0,0.97,0.9),1.0-d), a*0.6*uFade); }`,
    });
    const pool = new THREE.Mesh(new THREE.CircleGeometry(1.5, 64), poolMat);
    pool.rotation.x = -Math.PI / 2; pool.position.y = poolY; scene.add(pool);

    // ---------- sizing ----------
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

    // ---------- loop ----------
    let raf = 0; const t0 = performance.now(); let lastIndex = -1;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now(), t = (now - t0) / 1000;

      // craft: fly in from above the screen on load, then settle into a gentle hover
      const ENTRANCE_MS = 1600;
      const e = clamp((now - t0) / ENTRANCE_MS, 0, 1);
      if (!reduce) {
        const eased = 1 - Math.pow(1 - e, 3);        // easeOutCubic
        const flyY = lerp(craftBaseY + 6.5, craftBaseY, eased); // starts high above, drops in
        const bob = e >= 1 ? Math.sin(t * 1.05) * 0.05 : 0;     // hover begins after landing
        craft.position.y = flyY + bob;
      } else {
        craft.position.y = craftBaseY;
      }
      // beam ignites as the craft arrives (last ~40% of the entrance)
      const beamFade = reduce ? 1 : smooth(clamp((e - 0.55) / 0.45, 0, 1));
      coneMat.uniforms.uFade.value = beamFade;
      poolMat.uniforms.uFade.value = beamFade;

      // scroll progress over the section
      const rect = section.getBoundingClientRect();
      const track = rect.height - window.innerHeight;
      const p = track > 0 ? clamp(-rect.top / track, 0, 1) : 0;
      const outro = norm(p, 0.985, 1);

      // fade whole canvas out at the end so it doesn't bleed past the hero
      canvas.style.opacity = (1 - outro).toFixed(3);

      // scan HTML cards into the pool, one at a time
      const scan = norm(p, SCAN_START, SCAN_END) * N;
      const active = clamp(Math.floor(scan), 0, N - 1);
      const within = scan - active;
      const cardOp = Math.min(norm(within, 0, 0.22), 1 - norm(within, 0.78, 1)) * (1 - outro);
      const rise = lerp(30, 0, smooth(norm(within, 0, 0.35)));
      items.forEach((el, i) => {
        if (i === active && p >= SCAN_START && p < 1) {
          el.style.opacity = cardOp.toFixed(3);
          el.style.transform = `translate(-50%, calc(-50% + ${rise.toFixed(1)}px)) scale(${lerp(0.94, 1, cardOp).toFixed(3)})`;
        } else { el.style.opacity = "0"; }
      });

      const uiOp = (norm(p, SCAN_START - 0.02, SCAN_START) * (1 - outro)).toFixed(3);
      const dots = dotsRef.current, count = countRef.current;
      if (dots && dots.parentElement) dots.parentElement.style.opacity = uiOp;
      if (active !== lastIndex) {
        if (dots) [...dots.children].forEach((d, i) => d.classList.toggle("ss-dot--on", i === active));
        if (count) count.textContent = String(active + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
        lastIndex = active;
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); };
  }, []);

  return (
    <section ref={sectionRef} className="s3" aria-label="Our services">
      <style>{CSS}</style>
      <canvas ref={canvasRef} className="s3-canvas" aria-hidden="true" />

      <div ref={revealRef} className="ss-reveal" aria-hidden="true">
        {ITEMS.map((s) => {
          const Icon = s.Icon;
          return (
            <a className="ss-card" key={s.slug} href={s.href} tabIndex={-1}>
              <span className="ss-card-icon" style={{ color: s.accent, borderColor: s.accent + "88", background: s.accent + "22" }}>
                {Icon ? <Icon size={26} strokeWidth={1.9} /> : null}
              </span>
              <span className="ss-card-name">{s.name}</span>
              <span className="ss-card-cta">Explore Now</span>
            </a>
          );
        })}
      </div>

      <div className="ss-ui">
        <span className="ss-eyebrow">Our Services</span>
        <div ref={dotsRef} className="ss-dots" aria-hidden="true">
          {ITEMS.map((s) => <i key={s.slug} className="ss-dot" />)}
        </div>
        <span ref={countRef} className="ss-count" aria-hidden="true">01 / 10</span>
      </div>

      <ul className="ss-sr">
        {ITEMS.map((s) => <li key={s.slug}><a href={s.href}>{s.name}: {s.tagline}</a></li>)}
      </ul>
    </section>
  );
}

const CSS = `
.s3{ position:relative; height:340vh; --amber:#FA9F43; }
.s3-canvas{ position:fixed; inset:0; width:100vw; height:100vh; z-index:35; pointer-events:none; }

.ss-reveal{ position:fixed; left:0; width:100%; top:64vh; z-index:37; pointer-events:none; }
.ss-card{
  position:absolute; left:50%; top:0; transform:translate(-50%,-50%) scale(.94);
  width:min(340px,82vw); text-align:center; opacity:0; text-decoration:none;
  display:flex; flex-direction:column; align-items:center; gap:.45rem;
  padding:14px 18px; border-radius:26px; pointer-events:auto;
  background:radial-gradient(64% 62% at 50% 44%, rgba(3,7,20,.72), rgba(3,7,20,.32) 56%, rgba(3,7,20,0) 80%);
  will-change:opacity,transform;
}
.ss-card-icon{ width:52px; height:52px; display:grid; place-items:center; border-radius:18px; border:1px solid; box-shadow:0 8px 30px rgba(0,0,0,.45); }
.ss-card-name{ color:#5b8cff; font-weight:700; font-size:clamp(1.4rem,2.6vw,1.9rem); letter-spacing:-.01em; text-shadow:0 2px 22px rgba(0,0,0,.6); }
.ss-card-cta{ margin-top:.7rem; display:inline-block; padding:.7rem 1.6rem; border-radius:999px; background:#5b8cff; color:#fff; font-weight:600; font-size:.95rem; box-shadow:0 10px 30px rgba(91,140,255,.4); transition:transform .2s, background .2s; }
.ss-card:hover .ss-card-cta{ transform:translateY(-2px); background:#4a7bf0; }

.ss-ui{ position:fixed; left:50%; bottom:2.5vh; transform:translateX(-50%); z-index:37; display:flex; flex-direction:column; align-items:center; gap:.7rem; opacity:0; will-change:opacity; }
.ss-eyebrow{ color:rgba(255,255,255,.5); font-size:.68rem; font-weight:600; letter-spacing:.32em; text-transform:uppercase; }
.ss-dots{ display:flex; gap:.4rem; }
.ss-dot{ width:6px; height:6px; border-radius:999px; background:rgba(255,255,255,.2); transition:all .3s; }
.ss-dot--on{ background:var(--amber); box-shadow:0 0 10px var(--amber); transform:scale(1.3); }
.ss-count{ color:rgba(255,255,255,.55); font-size:.72rem; letter-spacing:.18em; font-variant-numeric:tabular-nums; }
.ss-sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }

@media (prefers-reduced-motion: reduce){ .s3{ height:auto; min-height:100vh; } }
`;
