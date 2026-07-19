import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

/* Photo-only team carousel.
   Real files on disk: public/images/team/<name>.webp
   Order below = display order → Roshan is 3rd. High-contrast B&W, no text. */
const MEMBERS = [
  { name: "Bhojraj",  photo: "/images/team/bhojraj.webp" },
  { name: "Harish",   photo: "/images/team/harish.webp" },
  { name: "Roshan",   photo: "/images/team/roshan.webp" },   // ← 3rd
  { name: "Lohith",   photo: "/images/team/lohith.webp" },
  { name: "Ismail",   photo: "/images/team/ismail.webp" },
  { name: "Jahnavi",  photo: "/images/team/jahnavi.webp" },
  { name: "Pooja",    photo: "/images/team/pooja.webp" },
  { name: "Shashi",   photo: "/images/team/shashi.webp" },
  { name: "Srinivas", photo: "/images/team/srinivas.webp" },
  { name: "Teja",     photo: "/images/team/teja.webp" },
];

function MemberCard({ photo, active }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] border transition-all duration-500 ${
        active
          ? "border-[#FA9F43]/45 shadow-[0_24px_70px_-18px_rgba(250,159,67,0.4)]"
          : "border-white/10"
      }`}
      style={{ background: "rgba(8,10,22,0.6)", backdropFilter: "blur(10px)" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{
            filter: active
              ? "grayscale(1) contrast(1.5) brightness(1.0)"
              : "grayscale(1) contrast(1.4) brightness(0.9)",
          }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-60"
          }`}
        />
      </div>
    </div>
  );
}

export default function TeamSection() {
  const n = MEMBERS.length;
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const drag = useRef({ down: false, startX: 0, moved: 0 });
  const prevActive = useRef(active);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    prevActive.current = active;
  }, [active]);

  const CARD_W = isMobile ? 240 : 300;
  const ACTIVE_SCALE = 1.15;
  const SIDE_SCALE = 0.9;
  const SPACING = isMobile ? 100 : 300;
  const STAGE_H = isMobile ? 470 : 560;
  const THRESHOLD = 90;

  const wrap = (raw) => {
    let o = raw;
    if (o > n / 2) o -= n;
    else if (o < -n / 2) o += n;
    return o;
  };

  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);

  const onDown = (e) => {
    drag.current = { down: true, startX: e.clientX, moved: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = dx;
    setDragX(dx);
  };
  const onUp = () => {
    if (!drag.current.down) return;
    const dx = drag.current.moved;
    drag.current.down = false;
    setDragX(0);
    if (Math.abs(dx) > THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section className="overflow-hidden px-6 py-12 lg:px-[120px]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our team"
          title="The people behind the growth"
          lead="Marketers, developers, designers, strategists, and growth specialists — working as one team on your brand."
        />

        <div
          className="relative mt- flex touch-pan-y select-none items-center justify-center"
          style={{ height: STAGE_H, perspective: "1600px" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        >
          {MEMBERS.map((m, i) => {
            const offset = wrap(i - active);
            const prevOffset = wrap(i - prevActive.current);
            const wrapped = Math.abs(offset - prevOffset) > 1.5;

            const isActive = offset === 0;
            const dragShift = dragX / (isMobile ? 2 : 1.5);
            const clamp = Math.max(-2, Math.min(2, offset));
            const x = offset * SPACING + dragShift;
            const rotateY = -clamp * 40;
            const z = -Math.abs(offset) * 160;
            const scale = isActive ? ACTIVE_SCALE : SIDE_SCALE;
            const hidden = Math.abs(offset) > 2;

            const animate = !drag.current.down && !wrapped;

            return (
              <div
                key={i}
                onClick={() => !drag.current.moved && setActive(i)}
                className={`absolute left-1/2 top-1/2 ${
                  animate ? "transition-all duration-500 ease-out" : ""
                } ${isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
                style={{
                  width: CARD_W,
                  zIndex: n - Math.abs(offset),
                  opacity: hidden ? 0 : isActive ? 1 : 0.6,
                  pointerEvents: hidden ? "none" : "auto",
                  transform: `translate(-50%, -50%) translateX(${x}px) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale})`,
                }}
              >
                <div className="relative">
                  <MemberCard {...m} active={isActive} />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 -z-10 rounded-[50%] bg-black blur-2xl transition-all duration-500 ease-out"
                    style={{
                      bottom: isActive ? -44 : -30,
                      width: isActive ? "80%" : "62%",
                      height: isActive ? 46 : 30,
                      transform: "translateX(-50%)",
                      opacity: hidden ? 0 : isActive ? 0.5 : 0.28,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous member"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-colors hover:border-[#FA9F43] hover:bg-[#FA9F43] hover:text-[#160c00]"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to member ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[#FA9F43]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next member"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-colors hover:border-[#FA9F43] hover:bg-[#FA9F43] hover:text-[#160c00]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
