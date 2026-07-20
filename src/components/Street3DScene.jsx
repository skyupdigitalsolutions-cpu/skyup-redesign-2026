import { useRef, useEffect, useLayoutEffect, useMemo, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { COLORS, BASE, SHOPS, CAM_START, CAM_END, ENTRANCE_Z, ENTRANCE_ASPECT } from "./street3d.data";

// This whole module (and its Three.js imports) is lazy-loaded by Street3D.jsx, so Three
// is NOT parsed on initial page load — only when the street section is approached.
// The 3D scene itself is byte-for-byte identical to the original inline version.

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* a single shopfront plane, angled toward the street centre */
function Shopfront({ shop, isMobile }) {
  const tex = useTexture(shop.img);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const W = 12, H = 6.75; // 16:9 panel
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

export default function Street3DScene({ scroll, isMobile, inView, onReady }) {
  return (
    <Canvas
      frameloop={inView ? "always" : "never"}
      camera={{ position: [0, 1.5, CAM_START], fov: isMobile ? 86 : 60, near: 0.1, far: 200 }}
      dpr={[1, 2]}
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
        <SceneReady onReady={onReady} />
      </Suspense>
      <CameraRig scroll={scroll} isMobile={isMobile} />
    </Canvas>
  );
}
