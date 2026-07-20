import { Canvas } from "@react-three/fiber";
import StoryCore from "./StoryCore";

// Lazy-loaded by ScrollStoryHero so @react-three/fiber + StoryCore's Three imports are
// code-split out of the initial page parse. Rendered identically to the original inline
// Canvas; only its LOAD timing changed.
export default function StoryCanvas({ inView, story }) {
  return (
    <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}>
      <StoryCore story={story} />
    </Canvas>
  );
}
