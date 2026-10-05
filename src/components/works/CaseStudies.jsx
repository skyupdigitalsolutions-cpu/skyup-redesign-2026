import { useMemo, useState } from "react";
import { CASE_STUDIES, COVERS } from "@/data/caseStudies";

const ALL = "All";

const ArrowIcon = (p) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    {...p}
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CaseStudies() {
  const studies = Array.isArray(CASE_STUDIES) ? CASE_STUDIES : [];
  const [active, setActive] = useState(ALL);

  // Category for a study, trimmed defensively (handles stray spaces).
  const catOf = (c) => (c.category || "").trim();

  // Unique category list derived from the data. Insertion order follows the
  // order studies appear in @/data/caseStudies, with "All" pinned first.
  const categories = useMemo(() => {
    const seen = new Set();
    studies.forEach((c) => {
      const cat = catOf(c);
      if (cat) seen.add(cat);
    });
    return [ALL, ...seen];
  }, [studies]);

  const filtered =
    active === ALL ? studies : studies.filter((c) => catOf(c) === active);

  return (
    <section className=" px-5 pb-4 font-['Poppins'] sm:px-8 lg:pb-12">
      {/* filter bar — capsule */}
      {categories.length > 1 && (
        <div className="mx-auto mt-10 max-w-7xl">
          <div className="flex flex-wrap  gap-3 rounded-[32px] border border-[#E0E4F5] bg-[#EEF0FB] p2 sm:p-2">
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0037CA]/40 ${
                    isActive
                      ? "bg-[#0037CA] text-white "
                      : "bg-white text-[#1B2545]  hover:text-[#0037CA]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* card grid */}
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <a
            key={c.id ?? c.slug}
            href={`/work/${c.slug}`}
            aria-label={`Read case study: ${c.title}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E2EAFE] bg-white no-underline shadow-[0_10px_30px_-18px_rgba(0,55,202,0.35)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0037CA]/20 hover:shadow-[0_30px_60px_-24px_rgba(0,55,202,0.5)] hover:ring-[#0037CA]/15"
          >
            {/* cover */}
            <div className="relative h-44 overflow-hidden">
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${COVERS[i % COVERS.length]}`}
                />
              )}

              {/* subtle darken so the chip/index stay readable on busy photos */}
              <div className="absolute inset-0 bg-black/15" />

              {/* soft radial highlight */}
              <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />

              {/* big watermark index */}
              <span className="pointer-events-none absolute -bottom-5 right-3 select-none text-[110px] font-extrabold leading-none text-white/10">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* category chip */}
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                {/* {c.category} */}
              </span>

              {/* bottom fade for depth */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
            </div>

            {/* body */}
            <div className="flex flex-1 flex-col p-6">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8095C8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0037CA]" />
                {c.client}
              </p>
              <h3 className="mt-2 text-[20px] font-semibold leading-snug text-[#071B4D] transition-colors group-hover:text-[#0037CA]">
                {c.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-[#3D5499]">
                {c.summary}
              </p>

              {/* CTA anchored to the bottom (visual only — the whole card is the link) */}
              <div className="mt-auto ">
                <span className="mt-5 inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#0037CA]">
                  Read case study
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF3FF] transition-all group-hover:bg-[#0037CA] group-hover:text-white">
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* empty state (in case a future category has no studies) */}
      {filtered.length === 0 && (
        <p className="mx-auto mt-10 max-w-md text-center text-[#3D5499]">
          No case studies in this category yet — check back soon.
        </p>
      )}
    </section>
  );
}