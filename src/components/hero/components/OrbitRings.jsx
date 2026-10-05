import { motion } from "framer-motion";
import { RINGS, COLORS } from "../heroConfig";

/**
 * OrbitRings — three concentric rings on tilted 3D planes.
 * Rotation is pure CSS keyframes (SSR-safe, GPU-cheap). Entrance scale/fade
 * is Framer Motion. A glowing tracer dot rides each ring.
 */
export default function OrbitRings() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sk-orbit-spin { to { transform: rotateZ(360deg); } }
        .sk-orbit-ring > .sk-orbit-spin { width:100%; height:100%; transform-origin:center; }
        .sk-orbit-ring svg { transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .sk-orbit-spin { animation: none !important; }
        }
      `}</style>

      {RINGS.map((ring, i) => {
        const stroke = ring.accent === "orange" ? COLORS.orange : COLORS.blueLight;
        return (
          <motion.div
            key={i}
            className="sk-orbit-ring absolute"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: ring.opacity, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              transform: `rotateX(${ring.tilt}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="sk-orbit-spin"
              style={{
                animation: `sk-orbit-spin ${ring.dur}s linear infinite ${
                  ring.dir < 0 ? "reverse" : ""
                }`,
              }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                <circle
                  cx="50" cy="50" r="49" fill="none" stroke={stroke}
                  strokeWidth="0.35" strokeDasharray={ring.dash}
                  style={{ opacity: ring.opacity }}
                />
                <circle
                  cx="50" cy="50" r="49" fill="none" stroke={stroke}
                  strokeWidth="0.12" style={{ opacity: ring.opacity * 0.6 }}
                />
                <circle
                  cx="50" cy="1" r={ring.accent === "orange" ? 1.4 : 1.1}
                  fill={stroke}
                  style={{ filter: `drop-shadow(0 0 3px ${stroke})` }}
                />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
