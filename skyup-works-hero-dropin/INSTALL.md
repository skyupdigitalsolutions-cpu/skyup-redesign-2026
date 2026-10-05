# Skyup — Works "Orbital Command" hero · drop-in

Unzip at your project **root** (`skyupredesign-main/`). Files land in the right
folders automatically. No new npm packages — R3F, three, gsap, framer-motion and
lenis are already in your `package.json`.

## Files in this bundle

NEW — assets (→ referenced as `/images/works/…`)
  public/images/works/works-hero-station.png   (transparent station, clean cutout)
  public/images/works/works-hero-station.webp  (smaller, optional — swap the .png ref if you prefer)
  public/images/works/works-hero-bg.jpg         (sunrise plate)
  public/images/works/works-hero-bg.webp        (smaller, optional)

NEW — component
  src/components/works/WorksHero.jsx

EDITED — page (adds the import + mounts <WorksHero/> above the flip cards, wraps
         the flip cards in <div id="work"> so the hero's "View the missions" CTA
         scrolls to them)
  src/pages/Works.jsx

UNCHANGED
  pages/works/+Page.jsx        already renders src/pages/Works — nothing to touch
  src/components/works/HeroWork.jsx   not imported anywhere; left as-is for revert

## If you'd rather edit Works.jsx by hand (instead of overwriting)

1. Add the import near the other works imports:
     import WorksHero from "@/components/works/WorksHero";
2. Mount it as the first child after <Header/>:
     <Header />
     <WorksHero />
     <div id="work"><WorkFlipCards /></div>
     <ToolsUniverse />
     ...

## To swap the placeholder numbers

Open `WorksHero.jsx`, edit the `METRICS` array at the top:
  { to, prefix, suffix, dec, label }
e.g. real ROAS 3.4 → { to: 3.4, dec: 1, suffix: "×", label: "Avg. ROAS" }

## Notes
- Uses `.png` for the station by default (crispest). To use the lighter `.webp`,
  change the one `works-hero-station.png` reference in WorksHero.jsx.
- SSR-safe for Vike: all browser APIs are inside useEffect; markup renders on the
  server and animations start after hydration. Reduced-motion is respected.
- Colors match the site: deep blue #0037CA, accents #2E6BFF/#5B8CFF/#9CC0FF,
  amber #FFB950/#FA9F43, hot-orange hover #FF8B14, base #04050C.
