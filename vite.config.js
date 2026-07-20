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
    // Group heavy libraries into their own long-lived chunks so they're downloaded
    // and parsed once, then reused from cache across every (prerendered) page and on
    // client-side navigation — instead of being re-bundled into each page's chunk.
    // Purely a chunking change: identical code runs, nothing is added or removed.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/three/") || id.includes("@react-three")) return "three";
          if (id.includes("/gsap/") || id.includes("/gsap")) return "gsap";
          if (id.includes("framer-motion") || id.includes("/motion/")) return "motion";
          if (id.includes("/lenis") || id.includes("@studio-freight")) return "lenis";
        },
      },
    },
  },
})