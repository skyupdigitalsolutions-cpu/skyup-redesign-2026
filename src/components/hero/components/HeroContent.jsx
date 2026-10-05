import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS, CYCLE_WORDS } from "../heroConfig";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * HeroContent — left column. Bold "AI-Powered ____" headline where the last
 * word cycles (Growth → Leads → Revenue → Results), subhead, and CTAs.
 *
 * SEO note: the headline's static parts and the full word list are rendered
 * as real text. The visible cycling word is swapped client-side only; a
 * visually-hidden line carries all words so crawlers see the complete phrase.
 */
export default function HeroContent() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % CYCLE_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative z-[5] max-w-xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.span
        variants={item}
        className="mb-6 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
        style={{ color: COLORS.orange }}
      >
        <span className="h-px w-7" style={{ background: COLORS.orange }} />
        Bengaluru&apos;s AI Growth Agency
      </motion.span>

      <motion.h1
        variants={item}
        className="font-bold leading-[0.96] tracking-[-0.035em] text-white"
        style={{ fontFamily: "'Geist Variable',sans-serif", fontSize: "clamp(2.8rem,6vw,5.2rem)" }}
      >
        AI-Powered
        <br />
        <span className="relative inline-block align-top">
          {/* visible cycling word */}
          <AnimatePresence mode="wait">
            <motion.span
              key={CYCLE_WORDS[i]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{
                background: `linear-gradient(110deg,#fff 0%,${COLORS.blueLight} 55%,${COLORS.orange} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {CYCLE_WORDS[i]}.
            </motion.span>
          </AnimatePresence>
        </span>
        {/* crawlable full phrase */}
        <span className="sr-only"> {CYCLE_WORDS.join(", ")}.</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-6 max-w-md text-base leading-relaxed text-white/60"
      >
        SEO, paid media, AI automation, and web development — engineered as one
        system to compound your growth, month over month.
      </motion.p>

      <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3.5">
        <a
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          style={{ background: COLORS.blue, boxShadow: `0 10px 30px ${COLORS.blue}55` }}
        >
          Start Your Project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="/works"
          className="inline-flex items-center rounded-lg border border-white/12 px-7 py-3.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          See Our Work
        </a>
      </motion.div>
    </motion.div>
  );
}
