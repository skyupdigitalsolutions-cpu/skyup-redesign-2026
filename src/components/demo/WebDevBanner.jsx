import React from "react";

const BANNER_BG =
  "linear-gradient(120deg, #173A8F 0%, #1E63B8 55%, #2A93D8 100%)";
const RED = "#E8312A";
const Blue = "#0037CA";
const PURPLE = "#5B53E0";
const PURPLE_DARK = "#4F47CF";

/* ── Laptop dashboard mockup ───────────────────────────────────────── */
function LaptopMockup() {
  const dot = (c) => (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ background: c }}
    />
  );

  const miniCard = (color) => (
    <div className="flex items-center gap-1.5 rounded bg-white px-1.5 py-1 shadow-sm">
      {dot(color)}
      <div className="space-y-[3px]">
        <div className="h-1 w-8 rounded bg-slate-300" />
        <div className="h-1 w-5 rounded bg-slate-200" />
      </div>
    </div>
  );

  const listRow = () => (
    <div className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-full bg-slate-300" />
      <div className="flex-1 space-y-[3px]">
        <div className="h-1 w-10 rounded bg-slate-300" />
        <div className="h-1 w-7 rounded bg-slate-200" />
      </div>
      <div className="h-1 w-3 rounded bg-slate-200" />
    </div>
  );

  const bars = [40, 64, 30, 80, 22, 70, 34, 58];

  return (
    <div className="w-full max-w-[460px]">
      {/* Screen */}
      <div className="overflow-hidden rounded-t-xl border-[6px] border-slate-200 bg-white shadow-2xl">
        <div className="flex h-[230px] text-[6px]">
          {/* Sidebar */}
          <div
            className="flex w-[58px] flex-col items-center gap-3 py-3 text-white"
            style={{ background: PURPLE }}
          >
            <span className="text-[7px] font-bold tracking-wide">COMPANY</span>
            <div className="flex flex-col items-center gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <span className="h-3.5 w-3.5 rounded-full bg-white/70" />
              </span>
              <span className="text-[5px] font-semibold">John Doe</span>
              <span className="text-[4px] text-white/70">Manager</span>
            </div>
            <div className="mt-1 w-full space-y-1.5 px-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded ${i === 0 ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 bg-slate-50">
            {/* Top bar */}
            <div
              className="flex items-center justify-end gap-2 px-2 py-1.5 text-[5px] text-white"
              style={{ background: PURPLE_DARK }}
            >
              <span>Messages</span>
              <span>Notifications</span>
            </div>

            <div className="space-y-2 p-2">
              {/* 4 mini cards */}
              <div className="grid grid-cols-4 gap-1.5">
                {miniCard("#EF4444")}
                {miniCard("#22C55E")}
                {miniCard("#06B6D4")}
                {miniCard(PURPLE)}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {/* Left column */}
                <div className="space-y-1.5">
                  <div className="rounded bg-white p-1.5 shadow-sm">
                    <div className="h-1 w-12 rounded bg-slate-300" />
                    <div className="mt-1 flex items-center justify-between">
                      <span className="h-3 w-3 rounded-full bg-indigo-300" />
                      <span className="rounded bg-indigo-500 px-1.5 py-[2px] text-[4px] text-white">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="rounded bg-white p-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[5px] font-semibold text-slate-500">
                        Wallet Balance
                      </span>
                      <span className="text-[7px] font-bold text-slate-800">
                        $1,235.00
                      </span>
                    </div>
                  </div>
                  {/* Payment graph */}
                  <div className="rounded bg-white p-1.5 shadow-sm">
                    <div className="text-[5px] font-semibold text-slate-500">
                      Payment Graph
                    </div>
                    <div className="mt-1 flex h-12 items-end gap-1">
                      {bars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${h}%`,
                            background: i % 2 ? "#3B82F6" : "#22D3EE",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column list */}
                <div className="space-y-1.5 rounded bg-white p-1.5 shadow-sm">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <React.Fragment key={i}>{listRow()}</React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base */}
      <div className="relative mx-auto h-2.5 w-[112%] -translate-x-[5%] rounded-b-xl bg-slate-200 shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-slate-300" />
      </div>
    </div>
  );
}

/* ── Banner ────────────────────────────────────────────────────────── */
export default function WebDevBanner({
  eyebrow = "Crafting Websites That Make You Go 'Whoa!",
  title = "Think Growth. Think Nextwebi—Your Reliable Web Development Company.",
  body = "As a leading custom web development company we ensure that we deliver the best-tailored website according to your business needs with faster loading time, secured features, SEO optimized, interactive, conversion friendly with scalable and flexible features to provide an optimized customer journey. Unlock business digital transformation with our agile custom web development solution.",
  cta = { label: "Get a quote today!", href: "#" },
}) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12"
        style={{ background: BANNER_BG }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <p className="text-[15px] font-semibold text-white/90">{eyebrow}</p>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-[34px]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
              {body}
            </p>
            {cta && (
              <a
                href={cta.href}
                className="mt-8 inline-flex items-center bg-white rounded-lg px-7 py-3.5 text-[15px] font-bold  no-underline shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Laptop */}
          <div className="flex justify-center lg:justify-end">
            <LaptopMockup />
          </div>
        </div>
      </div>
    </section>
  );
}