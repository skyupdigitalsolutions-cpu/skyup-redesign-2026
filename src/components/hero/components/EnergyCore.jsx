import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../heroConfig";

/**
 * EnergyCore — the R3F scene contents (goes inside a <Canvas>).
 * The "AI growth engine": a pulsing shader core, a bright nucleus, an
 * additive fresnel glow shell, and an orange particle field that breathes.
 *
 * Idiomatic R3F: declarative meshes + a single useFrame for animation.
 * No window/document, no manual rAF — useFrame only runs client-side once
 * the Canvas mounts, so it's SSR-safe by construction.
 */
export default function EnergyCore() {
  const coreRef = useRef();
  const nucleusRef = useRef();
  const particlesRef = useRef();

  const blue = useMemo(() => new THREE.Color(COLORS.blue), []);
  const blueLight = useMemo(() => new THREE.Color(COLORS.blueLight), []);
  const orange = useMemo(() => new THREE.Color(COLORS.orange), []);

  // core shader (animated hot-spot + fresnel rim)
  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBlue: { value: blue },
      uBlueLight: { value: blueLight },
    }),
    [blue, blueLight]
  );

  const glowUniforms = useMemo(() => ({ uBlue: { value: blue } }), [blue]);

  // particle field
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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    coreUniforms.uTime.value = t;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.18;
      coreRef.current.rotation.x = t * 0.08;
    }
    if (nucleusRef.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.06;
      nucleusRef.current.scale.setScalar(s);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
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
  });

  return (
    <group>
      {/* core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 6]} />
        <shaderMaterial
          transparent
          uniforms={coreUniforms}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vView;
            uniform float uTime;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              vec3 p = position;
              p += normal * sin(uTime*1.5 + position.y*2.0) * 0.025;
              vec4 mv = modelViewMatrix * vec4(p,1.0);
              vView = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }`}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vView;
            uniform float uTime; uniform vec3 uBlue; uniform vec3 uBlueLight;
            void main(){
              float fres = pow(1.0 - max(dot(vNormal,vView),0.0), 2.5);
              float core = 0.5 + 0.5*sin(uTime*2.0);
              vec3 col = mix(uBlue, uBlueLight, fres + core*0.4);
              gl_FragColor = vec4(col, 0.35 + fres*0.65);
            }`}
        />
      </mesh>

      {/* nucleus */}
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color={blueLight} transparent opacity={0.9} />
      </mesh>

      {/* glow shell */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
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
              vec4 mv = modelViewMatrix * vec4(position,1.0);
              vView = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv;
            }`}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vView; uniform vec3 uBlue;
            void main(){
              float i = pow(1.0 - abs(dot(vNormal,vView)), 3.0);
              gl_FragColor = vec4(uBlue, i * 0.55);
            }`}
        />
      </mesh>

      {/* orange particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={orange}
          size={0.045}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
