import { motion } from "framer-motion";
import { METRICS, COLORS, polarToOffset } from "../heroConfig";

/**
 * FloatingMetrics — four glass metric chips placed on the orbit perimeter.
 * Entrance is staggered (scale + fade); each then floats forever via a
 * Framer Motion keyframe loop. Positions come from polar coords in config.
 */
export default function FloatingMetrics() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      {METRICS.map((m) => {
        const { x, y } = polarToOffset(m.angle, m.radius);
        const accent = m.accent === "orange" ? COLORS.orange : COLORS.blueLight;
        return (
          <motion.div
            key={m.id}
            className="absolute left-1/2 top-1/2"
            style={{ x: `${x}%`, y: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: m.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="-translate-x-1/2 -translate-y-1/2"
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 3 + (m.id.length % 3) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: m.delay,
              }}
            >
              <div
                className="relative rounded-xl border px-3.5 py-2.5 backdrop-blur-md"
                style={{
                  background: "rgba(8,10,22,0.74)",
                  borderColor: `${accent}40`,
                  boxShadow: `0 8px 32px ${accent}1f`,
                  minWidth: 104,
                }}
              >
                <span
                  className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r"
                  style={{ background: accent }}
                />
                <div
                  className="font-bold leading-none tracking-tight text-white"
                  style={{ fontSize: "1.3rem", fontFamily: "'Geist Variable',sans-serif" }}
                >
                  {m.value}
                </div>
                <div
                  className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.14em]"
                  style={{ color: accent }}
                >
                  {m.label}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
