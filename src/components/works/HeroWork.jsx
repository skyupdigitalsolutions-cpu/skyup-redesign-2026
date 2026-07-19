// src/components/service/ServiceHero.jsx
import React from "react";

export default function HeroWork({
  image = "/images/service-hero.jpg",
  eyebrow = "Our Services",
}) {
  return (
    <section className="relative h-[550px] w-full overflow-hidden bg-[#001a63]">
      {/* Background image — opacity controls how faded it is over the brand color */}
      <img
        src={image}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      {/* Optional extra wash for contrast (remove if you want the image brighter) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0037CA]/40" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb950]" />
          {eyebrow}
        </span>

        <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[56px]">
          Real Growth. Real Results.{" "}
          <span className="bg-gradient-to-r from-[#87b6f4] to-[#ffb950] bg-clip-text text-transparent">
            Real Businesses
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
          We help ambitious brands scale faster with data-driven marketing strategies that actually move the needle. Here's proof.
        </p>
      </div>
    </section>
  );
}
