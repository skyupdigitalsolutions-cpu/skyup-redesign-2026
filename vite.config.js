import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    vike(),
    react(),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Three.js + fiber — deferred (only loads when hero/street scroll into view)
          if (id.includes("/three/") || id.includes("@react-three")) return "three";
          // GSAP — used above fold (BulbIntro), keep in its own cached chunk
          if (id.includes("/gsap/") || id.includes("/gsap")) return "gsap";
          // framer-motion — only used inside deferred ScrollStoryHero components,
          // split separately from react-dom so it doesn't inflate the initial bundle
          if (id.includes("framer-motion") || id.includes("/motion/")) return "motion";
          // React core — always needed, isolated so its cache is never busted by app changes
          if (id.includes("/react-dom/") || id.includes("/react/") || id.includes("/scheduler/")) return "react-vendor";
          // Radix UI + shadcn — below-fold UI primitives
          if (id.includes("@radix-ui") || id.includes("radix")) return "radix";
          if (id.includes("/lenis") || id.includes("@studio-freight")) return "lenis";
        },
      },
    },
  },
})
