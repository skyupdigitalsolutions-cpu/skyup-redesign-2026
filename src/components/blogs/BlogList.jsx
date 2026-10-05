import React, { useMemo, useRef, useState } from "react";
import { BLOGS } from "@/data/blogs";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

// The data uses a few different field names across entries, so pick the
// best available value for each card defensively.
const cover = (b) => b.coverImage || b.heroImage || b.image || "";
const cardTitle = (b) => (b.title || b.headline || "Untitled").trim();
const cardCategory = (b) => (b.category || "Blog").trim();

const ALL = "All";
const PAGE_SIZE = 6; // cards per page

// Alternating themes — the exact orange + blue shades used elsewhere on the site.
const THEMES = ["orange", "blue"];

// Build the list of page buttons to show. Shows every page up to 7; beyond
// that it windows around the current page with "…" gaps.
function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) range.push("…");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("…");
  range.push(total);
  return range;
}

export default function BlogList() {
  const blogs = Array.isArray(BLOGS) ? BLOGS : [];
  const topRef = useRef(null);

  const categories = useMemo(() => {
    const seen = new Set();
    blogs.forEach((b) => seen.add(cardCategory(b)));
    return [ALL, ...seen];
  }, [blogs]);

  const [active, setActive] = useState(ALL);
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () =>
      active === ALL ? blogs : blogs.filter((b) => cardCategory(b) === active),
    [blogs, active],
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const pageItems = getPageItems(safePage, totalPages);

  const selectCategory = (cat) => {
    setActive(cat);
    setPage(1);
  };

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [failed, setFailed] = useState(() => new Set());
  const markFailed = (key) =>
    setFailed((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });

  return (
    <section ref={topRef} className="w-full scroll-mt-24 bg-[#04050C] font-['Poppins']">
      <style>{CSS}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px]">
          <ol className="flex items-center gap-2 text-white/50">
            <li>
              <a href="/" className="no-underline transition hover:text-[#FA9F43]">
                Home
              </a>
            </li>
            <li aria-hidden="true" className="text-white/25">/</li>
            <li aria-current="page" className="font-semibold text-[#FA9F43]">
              Blogs
            </li>
          </ol>
        </nav>

        {/* Filter bar */}
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-3 rounded-[32px] border border-white/10 bg-white/5 py-2 px-3">
            {categories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCategory(cat)}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full cursor-pointer px-4 py-2 text-[13px] font-semibold transition",
                    isActive
                      ? "bg-[#FA9F43] text-[#04050C] "
                      : "bg-white/5 text-white/80  hover:text-[#FA9F43] hover:bg-white/10",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="text-white/60">No blogs in this category yet.</p>
        ) : (
          <>
            {/* Stacked full-width cards, one per row, alternating orange / blue */}
            <div className="flex flex-col gap-7">
              {paged.map((blog, idx) => {
                const key = blog.id ?? blog.slug;
                const src = cover(blog);
                const showImg = src && !failed.has(key);
                // Global index keeps the orange/blue rhythm stable across pages.
                const globalIdx = (safePage - 1) * PAGE_SIZE + idx;
                const theme = THEMES[globalIdx % 2];

                return (
                  <a
                    key={key}
                    href={`/blog/${blog.slug}`}
                    className={`bcard bcard-${theme} group`}
                  >
                    <div className="bcard-grid">
                      {/* Text */}
                      <div className="bcard-text">
                        <div className="bcard-meta">
                          <span className="bcard-pill">{cardCategory(blog)}</span>
                          {blog.date ? <span className="bcard-date">{blog.date}</span> : null}
                        </div>

                        <h3 className="bcard-title">{cardTitle(blog)}</h3>

                        {blog.description ? (
                          <p className="bcard-desc">{blog.description.trim()}</p>
                        ) : null}

                        <span className="bcard-cta">
                          Read article
                          <ArrowRightIcon className="bcard-arrow" />
                        </span>
                      </div>

                      {/* Image */}
                      <div className="bcard-media">
                        {showImg ? (
                          <img
                            src={src}
                            alt={blog.imageAlt || cardTitle(blog)}
                            loading="lazy"
                            onError={() => markFailed(key)}
                            className="bcard-img"
                          />
                        ) : (
                          <div className="bcard-fallback">SkyUp Digital</div>
                        )}
                        <span className="bcard-fade" aria-hidden="true" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-12 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="rounded-full bg-white/5 px-3.5 py-2 text-[13px] font-semibold text-[#FA9F43] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>

                {pageItems.map((it, idx) =>
                  it === "…" ? (
                    <span key={`gap-${idx}`} className="select-none px-1 text-white/40">
                      …
                    </span>
                  ) : (
                    <button
                      key={it}
                      type="button"
                      onClick={() => goToPage(it)}
                      aria-current={it === safePage ? "page" : undefined}
                      className={[
                        "min-w-[40px] rounded-full px-3.5 py-2 text-[13px] font-semibold transition cursor-pointer",
                        it === safePage
                          ? "bg-[#FA9F43] text-[#04050C]"
                          : "bg-white/5 text-[#FA9F43] hover:bg-white/10",
                      ].join(" ")}
                    >
                      {it}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="rounded-full bg-white/5 px-3.5 py-2 text-[13px] font-semibold text-[#FA9F43] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}

const CSS = `
.bcard{
  --orange:#FA9F43; --blue:#2E6BFF;
  display:block; position:relative; overflow:hidden; text-decoration:none;
  border-radius:26px; background:#050609; border:1px solid transparent;
  transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.bcard-orange{ border-color:rgba(250,159,67,.5);
  box-shadow:0 0 0 1px rgba(250,159,67,.12), 0 18px 50px rgba(250,159,67,.10); }
.bcard-blue{ border-color:rgba(46,107,255,.55);
  box-shadow:0 0 0 1px rgba(46,107,255,.16), 0 18px 50px rgba(46,107,255,.12); }
.bcard-orange:hover{ transform:translateY(-4px);
  box-shadow:0 0 0 1px rgba(250,159,67,.35), 0 26px 70px rgba(250,159,67,.20); }
.bcard-blue:hover{ transform:translateY(-4px);
  box-shadow:0 0 0 1px rgba(46,107,255,.4), 0 26px 70px rgba(46,107,255,.24); }

.bcard-grid{ display:grid; grid-template-columns:1fr; }
@media (min-width:900px){ .bcard-grid{ grid-template-columns:1.08fr .92fr; } }

.bcard-text{ padding:30px clamp(22px,3.4vw,52px); display:flex; flex-direction:column; justify-content:center; }
.bcard-meta{ display:flex; align-items:center; gap:16px; margin-bottom:18px; flex-wrap:wrap; }
.bcard-pill{
  display:inline-flex; align-items:center; font-family:'Space Mono',ui-monospace,monospace;
  font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  padding:6px 14px; border-radius:999px; border:1px solid; 
}
.bcard-date{ font-size:13px; color:rgba(255,255,255,.5); }
.bcard-title{
  margin:0; font-weight:800; line-height:1.12; letter-spacing:-.01em;
  font-size:clamp(1.15rem,2.1vw,1.75rem); text-transform:uppercase;
  display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;
}
.bcard-desc{
  margin:16px 0 0; font-size:15px; line-height:1.6; color:rgba(255,255,255,.68); max-width:52ch;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.bcard-cta{
  margin-top:26px; align-self:flex-start; display:inline-flex; align-items:center; gap:10px;
  font-family:'Space Mono',ui-monospace,monospace; font-size:12px; font-weight:700;
  letter-spacing:.16em; text-transform:uppercase; padding:11px 22px;
  border-radius:999px; border:1px solid;
}
.bcard-arrow{ width:16px; height:16px; transition:transform .3s ease; }
.group:hover .bcard-arrow{ transform:translateX(4px); }

/* theme colors applied to inner bits */
.bcard-orange .bcard-pill{ color:var(--orange); border-color:rgba(250,159,67,.5); background:rgba(250,159,67,.12); }
.bcard-blue .bcard-pill{ color:var(--blue); border-color:rgba(46,107,255,.5); background:rgba(46,107,255,.14); }
.bcard-orange .bcard-title{ color:var(--orange); }
.bcard-blue .bcard-title{ color:var(--blue); }
.bcard-orange .bcard-cta{ color:var(--orange); border-color:rgba(250,159,67,.5); }
.bcard-blue .bcard-cta{ color:var(--blue); border-color:rgba(46,107,255,.5); }
.bcard-orange .bcard-cta:hover{ background:rgba(250,159,67,.12); }
.bcard-blue .bcard-cta:hover{ background:rgba(46,107,255,.14); }

.bcard-media{ position:relative; min-height:220px; overflow:hidden; }
@media (min-width:900px){ .bcard-media{ min-height:100%; } }
.bcard-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  transition:transform .5s ease; }
.group:hover .bcard-img{ transform:scale(1.04); }
.bcard-fallback{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(135deg,#0B0E1A,#12162A); color:#FA9F43; font-weight:700; letter-spacing:.04em; }
/* fade the card's black into the image edge, like the reference */
.bcard-fade{ position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(90deg,#050609 0%, rgba(5,6,9,.35) 22%, transparent 52%); }
@media (max-width:899px){
  .bcard-fade{ background:linear-gradient(0deg,#050609 0%, rgba(5,6,9,.2) 40%, transparent 70%); }
}
`;
