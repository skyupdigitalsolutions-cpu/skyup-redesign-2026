import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
const COLORS = { blue: "#0037CA", blueLight: "#3D6BF0", orange: "#F25623", orangeLight: "#FF8A4C", bg: "#04050C" };

/**
 * StoryCore — R3F scene contents (inside <Canvas>).
 * Reads a shared mutable ref (`story`) that the GSAP scroll timeline writes to:
 *   story.current.zoom      0..~0.6  → camera push toward core
 *   story.current.spin      1..~3.5  → core + particle spin multiplier
 *   story.current.intensity 0..~1.6  → glow / nucleus brightness
 *   story.current.pulseT    set to 0 → fires a one-shot energy pulse
 *
 * useFrame lerps toward those targets so scroll feels smooth, not stepped.
 * R3F-idiomatic, no manual rAF, SSR-safe (Canvas mounts client-side only).
 */
export default function StoryCore({ story }) {
  const { camera } = useThree();
  const coreRef = useRef();
  const nucleusRef = useRef();
  const glowRef = useRef();
  const pulseRef = useRef();
  const particlesRef = useRef();

  const blue = useMemo(() => new THREE.Color(COLORS.blue), []);
  const blueLight = useMemo(() => new THREE.Color(COLORS.blueLight), []);
  const orange = useMemo(() => new THREE.Color(COLORS.orange), []);
  const orangeLight = useMemo(() => new THREE.Color(COLORS.orangeLight), []);

  const coreUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uIntensity: { value: 1 }, uBlue: { value: orange }, uBlueLight: { value: orangeLight } }),
    [orange, orangeLight]
  );
  const glowUniforms = useMemo(
    () => ({ uBlue: { value: orange }, uIntensity: { value: 1 } }),
    [orange]
  );

  const { positions, speeds, radii, count } = useMemo(() => {
    const count = 460;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.3 + Math.random() * 1.9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      positions[i * 3 + 2] = r * Math.cos(ph);
      speeds[i] = 0.15 + Math.random() * 0.45;
      radii[i] = r;
    }
    return { positions, speeds, radii, count };
  }, []);

  const pulseElapsed = useRef(-1);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const s = story?.current || { zoom: 0, spin: 1, intensity: 1, pulseT: -1 };

    // camera zoom (lerped) — base pulled back for the full-screen canvas so the orb
    // keeps its size and even the closest zoom stays clear of the screen edges
    const targetZ = 6.5 - 3.4 * (s.zoom || 0);
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    coreUniforms.uTime.value = t;
    coreUniforms.uIntensity.value = s.intensity ?? 1;
    glowUniforms.uIntensity.value = s.intensity ?? 1;

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.10 * (s.spin ?? 1);
      coreRef.current.rotation.x = t * 0.05 * (s.spin ?? 1);
    }
    if (nucleusRef.current) {
      nucleusRef.current.scale.setScalar((s.intensity ?? 1) * (1 + Math.sin(t * 2.2) * 0.06));
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03 * (s.spin ?? 1);
      const arr = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const breathe = 1 + Math.sin(t * speeds[i] + i) * 0.06;
        const base = radii[i] * breathe;
        const len = Math.hypot(arr[idx], arr[idx + 1], arr[idx + 2]) || 1;
        arr[idx] = (arr[idx] / len) * base;
        arr[idx + 1] = (arr[idx + 1] / len) * base;
        arr[idx + 2] = (arr[idx + 2] / len) * base;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // one-shot pulse (GSAP sets story.current.pulseT = 0 to trigger)
    if (s.pulseT === 0 && pulseElapsed.current < 0) pulseElapsed.current = 0;
    if (pulseElapsed.current >= 0 && pulseRef.current) {
      pulseElapsed.current += delta;
      const p = Math.min(pulseElapsed.current / 1.1, 1);
      pulseRef.current.scale.setScalar(1 + p * 2.4);
      pulseRef.current.material.opacity = (1 - p) * 0.8;
      if (p >= 1) {
        pulseElapsed.current = -1;
        if (story) story.current.pulseT = -1;
      }
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 6]} />
        <shaderMaterial
          transparent
          uniforms={coreUniforms}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vView; uniform float uTime;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              vec3 p = position; p += normal * sin(uTime*1.5 + position.y*2.0) * 0.025;
              vec4 mv = modelViewMatrix * vec4(p,1.0); vView = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }`}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vView;
            uniform float uTime; uniform float uIntensity; uniform vec3 uBlue; uniform vec3 uBlueLight;
            void main(){
              float fres = pow(1.0 - max(dot(vNormal,vView),0.0), 2.5);
              float core = 0.5 + 0.5*sin(uTime*2.0);
              vec3 col = mix(uBlue, uBlueLight, fres + core*0.4);
              gl_FragColor = vec4(col * uIntensity, (0.35 + fres*0.65) * uIntensity);
            }`}
        />
      </mesh>

      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color={orangeLight} transparent opacity={0.9} />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.72, 48, 48]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          uniforms={glowUniforms}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vView;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              vec4 mv = modelViewMatrix * vec4(position,1.0); vView = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }`}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vView; uniform vec3 uBlue; uniform float uIntensity;
            void main(){
              float i = pow(1.0 - abs(dot(vNormal,vView)), 2.0);
              gl_FragColor = vec4(uBlue, i * 0.42 * uIntensity);
            }`}
        />
      </mesh>

      {/* pulse ring (Scene 4) */}
      <mesh ref={pulseRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.0, 1.06, 64]} />
        <meshBasicMaterial color={orange} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={orange} size={0.045} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}
