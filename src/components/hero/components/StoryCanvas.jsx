import { Canvas } from "@react-three/fiber";
import StoryCore from "./StoryCore";

/**
 * StoryCanvas — WebGL boundary for the hero.
 * Kept in its own module so ScrollStoryHero can lazy-load the entire
 * @react-three/fiber + three payload off the initial page parse.
 * frameloop="never" when off-screen so the GPU loop costs nothing.
 */
export default function StoryCanvas({ inView, story }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45, near: 0.1, far: 100 }}
      frameloop={inView ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <StoryCore story={story} />
    </Canvas>
  );
}
