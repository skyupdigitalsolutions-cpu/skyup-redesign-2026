// src/components/ui/CosmicBg.jsx
// Lightweight, pure-CSS galaxy backdrop (no WebGL) matching the About-page look:
// deep-space gradient + twinkling stars + brand blue (#5b8cff) and orange (#FF8B14) glows.
// Drop as the first child of a position:relative page; put page content in a z-10 wrapper.
import React from "react";

export default function CosmicBg() {
  return (
    <div aria-hidden="true" className="cosmic-bg">
      <div className="cosmic-stars" />
      <div className="cosmic-stars cosmic-stars--slow" />
      <style>{`
        .cosmic-bg{
          position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden;
          background:
            radial-gradient(1100px 760px at 14% 8%, rgba(91,140,255,.16), transparent 60%),
            radial-gradient(1000px 720px at 88% 92%, rgba(255,139,20,.12), transparent 60%),
            radial-gradient(140% 120% at 50% 0%, #0a1022 0%, #05070f 46%, #03040a 100%);
        }
        .cosmic-stars{
          position:absolute; inset:-50%; background-repeat:repeat;
          background-image:
            radial-gradient(1.6px 1.6px at 20% 30%, #dfe9ff, transparent),
            radial-gradient(1.4px 1.4px at 75% 22%, #cfe0ff, transparent),
            radial-gradient(1.2px 1.2px at 40% 70%, #eaf1ff, transparent),
            radial-gradient(1.5px 1.5px at 62% 52%, #bcd3ff, transparent),
            radial-gradient(1.2px 1.2px at 88% 68%, #dfe9ff, transparent),
            radial-gradient(1.3px 1.3px at 10% 82%, #cfe0ff, transparent);
          background-size:520px 520px;
          animation:cosmicTwinkle 5.5s ease-in-out infinite;
          opacity:.9;
        }
        .cosmic-stars--slow{
          background-size:340px 340px;
          background-position:120px 60px;
          animation-duration:8s; animation-delay:1.2s; opacity:.55;
        }
        @keyframes cosmicTwinkle{
          0%,100%{ opacity:.35; } 50%{ opacity:.9; }
        }
        @media (prefers-reduced-motion: reduce){
          .cosmic-stars{ animation:none; }
        }
      `}</style>
    </div>
  );
}
