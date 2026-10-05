import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { CASE_STUDIES } from "@/data/caseStudies";
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

/* ── theme tokens (dark cosmic — matches the rest of the site) ─────────── */
const BG = "#04050C";
const BLUE_L = "#7FB0FF"; // readable brand blue on dark

/* ── small building blocks ──────────────────────────────────────────── */

// A titled content section. Renders nothing if it has no children.
function Section({ title, children }) {
  if (children == null || (Array.isArray(children) && children.length === 0))
    return null;
  return (
    <section className="space-y-3">
      <h2 className="text-[20px] sm:text-[24px] font-bold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

// Prose that accepts a string OR an array of strings (-> paragraphs).
function Prose({ value }) {
  if (!value) return null;
  const paras = Array.isArray(value) ? value : [value];
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          className="text-[14px] sm:text-[15px] leading-relaxed text-slate-300"
        >
          {p}
        </p>
      ))}
    </>
  );
}

// Pill / chip used for services, stack and deliverables.
function Chip({ children, solid = false }) {
  return (
    <span
      className={
        solid
          ? "inline-flex rounded-full bg-[#0037CA] px-3 py-1 text-[12px] font-semibold text-white"
          : "inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[12px] font-semibold text-[#7FB0FF]"
      }
    >
      {children}
    </span>
  );
}

// One labelled row in the sidebar meta card.
function MetaRow({ label, children }) {
  if (!children) return null;
  return (
    <div className="border-t border-white/10 py-3 first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8095C8]">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] text-slate-200">{children}</dd>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */

export default function CaseStudyDetail() {
  const { routeParams } = usePageContext();
  const slug = routeParams?.slug;
  const study = CASE_STUDIES.find((c) => c.slug === slug);

  if (!study) {
    return (
      <section className="w-full font-['Poppins']" style={{ background: BG }}>
        <Header />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 pt-28 pb-16 sm:pt-32">
          <p className="text-slate-300">Case study not found.</p>
          <a
            href="/works"
            className="mt-3 inline-flex items-center gap-2 text-[#7FB0FF] font-semibold no-underline"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to all work
          </a>
        </div>
        <Footer />
      </section>
    );
  }

  const {
    category,
    client,
    title,
    summary,
    image,
    industry,
    timeline,
    year,
    role,
    services = [],
    stack = [],
    liveUrl,
    metrics = [],
    overview,
    challenge,
    approach,
    solution,
    results,
    deliverables = [],
    gallery = [],
    testimonial,
  } = study;

  const approachIsList = Array.isArray(approach);
  const resultsIsList = Array.isArray(results);
  const hasMeta =
    client || industry || timeline || year || role || services.length || stack.length || liveUrl;

  return (
    <section className="w-full font-['Poppins']" style={{ background: BG }}>
      <Header />

      {/* pt-28/32 clears the fixed header so the Back link no longer overlaps the logo */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-28 pb-10 sm:pt-32 sm:pb-16">
        {/* Back link */}
        <a
          href="/works"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] font-semibold text-[#9cc0ff] no-underline transition hover:bg-white/10"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to Work
        </a>

        {/* Header block */}
        <div className="mt-4">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-[#7FB0FF]">
            {(category || "").trim()}
          </span>
        </div>

        <h1 className="mt-3 max-w-3xl text-[24px] sm:text-[32px] lg:text-[40px] font-bold leading-tight text-white">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-3 text-[12px] text-slate-400">
          <span className="font-semibold text-[#9cc0ff]">{client}</span>
          {year ? (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{year}</span>
            </>
          ) : null}
        </div>

        {summary ? (
          <p className="mt-4 max-w-3xl text-[15px] sm:text-[17px] leading-relaxed text-slate-300">
            {summary}
          </p>
        ) : null}

        {/* Hero: image on the left, metric cards stacked on the right */}
        <div
          className={
            metrics.length > 0
              ? "mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-5"
              : "mt-6 flex justify-center"
          }
        >
          {/* image (left) */}
          <div className={metrics.length > 0 ? "flex justify-center lg:col-span-3" : "flex justify-center"}>
            {image ? (
              <img
                src={image}
                alt={title}
                className="max-h-[520px] w-auto max-w-full rounded-2xl border border-white/10 bg-[#080a12] object-contain"
              />
            ) : (
              <div className="h-[220px] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0037CA] to-[#3D6BF0] sm:h-[420px]" />
            )}
          </div>

          {/* metric cards (right) */}
          {metrics.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-2">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm shadow-[0_10px_30px_-22px_rgba(46,107,255,0.6)]"
                >
                  <div className="text-[26px] font-extrabold leading-none text-[#7FB0FF] sm:text-[30px]">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[13px] font-medium text-slate-200">
                    {m.label}
                  </div>
                  {m.sub ? (
                    <div className="mt-1 text-[12px] text-slate-400">{m.sub}</div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body + sidebar */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          {/* Main content */}
          <div className="flex-1 space-y-10">
            <Section title="Overview">
              <Prose value={overview} />
            </Section>

            <Section title="The challenge">
              <Prose value={challenge} />
            </Section>

            {approach ? (
              <Section title="Our approach">
                {approachIsList ? (
                  <ol className="space-y-4">
                    {approach.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#0037CA] text-[13px] font-bold text-white">
                          {i + 1}
                        </span>
                        <p className="pt-1 text-[14px] sm:text-[15px] leading-relaxed text-slate-300">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <Prose value={approach} />
                )}
              </Section>
            ) : null}

            <Section title="The solution">
              <Prose value={solution} />
            </Section>

            {deliverables.length > 0 && (
              <Section title="What we delivered">
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((d, i) => (
                    <Chip key={i}>{d}</Chip>
                  ))}
                </div>
              </Section>
            )}

            {gallery.length > 0 && (
              <Section title="A closer look">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gallery.map((g, i) => (
                    <figure
                      key={i}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                    >
                      <img
                        src={g.src}
                        alt={g.alt || g.caption || `${title} — ${i + 1}`}
                        loading="lazy"
                        className="h-auto w-full object-cover"
                      />
                      {g.caption ? (
                        <figcaption className="px-4 py-3 text-[12px] text-slate-400">
                          {g.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </Section>
            )}

            {results ? (
              <Section title="The results">
                {resultsIsList ? (
                  <ul className="space-y-3">
                    {results.map((r, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#7FB0FF]/15 text-[#7FB0FF]">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-300">
                          {r}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Prose value={results} />
                )}
              </Section>
            ) : null}

            {testimonial?.quote ? (
              <figure className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <blockquote className="border-l-4 border-[#7FB0FF] pl-4 text-[16px] italic leading-relaxed text-slate-200">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-3 pl-4 text-[13px] text-slate-400">
                  <span className="font-semibold text-white">
                    {testimonial.author}
                  </span>
                  {testimonial.role ? `, ${testimonial.role}` : ""}
                </figcaption>
              </figure>
            ) : null}
          </div>

          {/* Sidebar: project facts */}
          {/* {hasMeta && (
            <aside className="lg:w-[300px] lg:flex-none">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-[14px] font-bold tracking-wide text-white">
                    PROJECT DETAILS
                  </div>
                  <dl className="mt-3">
                    <MetaRow label="Client">{client}</MetaRow>
                    <MetaRow label="Industry">{industry}</MetaRow>
                    <MetaRow label="Role">{role}</MetaRow>
                    <MetaRow label="Timeline">{timeline}</MetaRow>
                    <MetaRow label="Year">{year}</MetaRow>
                    {services.length > 0 && (
                      <MetaRow label="Services">
                        <div className="mt-1 flex flex-wrap gap-2">
                          {services.map((s, i) => (
                            <Chip key={i}>{s}</Chip>
                          ))}
                        </div>
                      </MetaRow>
                    )}
                    {stack.length > 0 && (
                      <MetaRow label="Tools & stack">
                        <div className="mt-1 flex flex-wrap gap-2">
                          {stack.map((s, i) => (
                            <Chip key={i}>{s}</Chip>
                          ))}
                        </div>
                      </MetaRow>
                    )}
                  </dl>

                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0037CA] px-4 py-2.5 text-[14px] font-semibold text-white no-underline transition hover:opacity-95"
                    >
                      Visit project
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </aside>
          )} */}
        </div>
      </div>

      <Footer />
    </section>
  );
}
