// src/components/CustomCursor.jsx
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("cursor-on");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;

    // Pre-position at center so rAF loop runs immediately on mount.
    // Cursor becomes visible on first actual mousemove.
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!visible) { visible = true; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      const t = e.target;
      const interactive = t && t.closest && t.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]');
      ring.classList.toggle("is-hover", !!interactive);
      dot.classList.toggle("is-hover", !!interactive);
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => { visible = false; dot.style.opacity = "0"; ring.style.opacity = "0"; };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <style>{CURSOR_CSS}</style>
      <div ref={ringRef} className="sk-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="sk-cursor-dot" aria-hidden="true" />
    </>
  );
}

const CURSOR_CSS = `
@media (pointer: fine) {
  body.cursor-on, body.cursor-on * { cursor: none !important; }
}
.sk-cursor-dot, .sk-cursor-ring {
  position: fixed; top: 0; left: 0; z-index: 999999; pointer-events: none;
  opacity: 0; will-change: transform, opacity;
}
.sk-cursor-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #eaf2ff;
  box-shadow: 0 0 10px 2px rgba(156,192,255,.9), 0 0 22px 6px rgba(91,140,255,.55);
  transition: width .2s ease, height .2s ease, background .2s ease;
}
.sk-cursor-dot.is-hover { width: 11px; height: 11px; background: #fff; }
.sk-cursor-ring {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1.5px solid rgba(156,192,255,.65);
  box-shadow: 0 0 18px rgba(91,140,255,.35), inset 0 0 12px rgba(91,140,255,.15);
  transition: width .25s ease, height .25s ease, border-color .25s ease, background .25s ease;
}
.sk-cursor-ring.is-hover {
  width: 60px; height: 60px;
  border-color: rgba(241,178,74,.8);
  background: radial-gradient(closest-side, rgba(255,139,20,.10), transparent 70%);
  box-shadow: 0 0 26px rgba(255,139,20,.35);
}
.sk-cursor-ring.is-down { width: 28px; height: 28px; }
`;
