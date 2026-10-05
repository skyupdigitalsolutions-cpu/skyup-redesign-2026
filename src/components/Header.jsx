import { useState, useEffect, useRef } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

const SERVICE_LINKS = [
  { label: "Custom Software Development", href: "/service/custom-software-development" },
  { label: "Mobile App Development",      href: "/service/mobile-app-development" },
  { label: "Web Development",             href: "/service/web-development" },
  { label: "AI Automation",               href: "/service/ai-automation" },
  { label: "SEO",                         href: "/service/seo" },
  { label: "Social Media Marketing",      href: "/service/social-media-marketing" },
  { label: "Performance Marketing",       href: "/service/performance-marketing" },
  { label: "UI/UX Design",               href: "/service/ui-ux-design" },
  { label: "Branding",                    href: "/service/graphic-design" },
];

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Service",  href: "/service", hasDropdown: true },
  { label: "Works",    href: "/works" },
  { label: "Blogs",    href: "/blogs" },
];

const socialLinks = [
  {
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/110886969/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    alt: "Instagram",
    href: "https://www.instagram.com/skyupdigitalsolutions",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    alt: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584820941998",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
];

const BRAND_GRADIENT = "bg-[linear-gradient(135deg,#3D6BF0,#0037CA)]";
const REVEAL_AT = 1.2;

export default function Header() {
  const { urlPathname } = usePageContext();
  const isHome = urlPathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(!isHome);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setRevealed(!isHome || y > window.innerHeight * REVEAL_AT);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const onDoc = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header
      className="fixed top-0 z-[120] w-full transition-all duration-500"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: revealed ? "auto" : "none",
      }}
    >
      <div className={`w-full transition-all duration-300 ${scrolled ? "bg-[#0A0805]/85 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-8 lg:px-12">

          {/* Logo */}
          <a href="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.03]">
            <img src="/images/skyup-logo.svg" alt="Skyup Digital Solutions" width="147" height="48" className="h-[48px] w-auto object-contain" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md lg:flex">
            {navLinks.map(({ label, href, hasDropdown }) => {
              const isActive = urlPathname === href || (hasDropdown && urlPathname.startsWith("/service"));

              if (hasDropdown) {
                return (
                  <div key={href} className="relative" ref={dropRef}>
                    <button
                      type="button"
                      onClick={() => setDropOpen((v) => !v)}
                      className={`flex items-center gap-1 rounded-full px-5 py-2.5 text-[15px] font-medium tracking-wide transition-all duration-300 ${isActive ? `${BRAND_GRADIENT} text-white shadow-[0_6px_16px_-4px_rgba(0,55,202,0.6)]` : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                    >
                      {label}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* FLAT HORIZONTAL DROPDOWN */}
                    {dropOpen && (
                      <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f1e]/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                        style={{ minWidth: "max-content" }}>
                        {/* All services in one horizontal row with pipe separators */}
                        <div className="flex items-center flex-wrap px-5 py-3">
                          {SERVICE_LINKS.map(({ label, href }, idx) => (
                            <span key={href} className="flex items-center">
                              <a
                                href={href}
                                onClick={() => setDropOpen(false)}
                                className={`px-3 py-1.5 text-[13px] font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${urlPathname === href ? "text-blue-400 bg-blue-600/10" : "text-white/70 hover:text-white hover:bg-white/8"}`}
                              >
                                {label}
                              </a>
                              {idx < SERVICE_LINKS.length - 1 && (
                                <span className="text-white/20 select-none">|</span>
                              )}
                            </span>
                          ))}
                        </div>
                        {/* View all */}
                        <div className="border-t border-white/10 px-5 py-2.5 flex justify-center">
                          <a
                            href="/service"
                            onClick={() => setDropOpen(false)}
                            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#FA9F43] hover:opacity-80 transition-opacity"
                          >
                            → View all services
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={href}
                  href={href}
                  className={`rounded-full px-5 py-2.5 text-[15px] font-medium tracking-wide transition-all duration-300 ${isActive ? `${BRAND_GRADIENT} text-white shadow-[0_6px_16px_-4px_rgba(0,55,202,0.6)]` : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Right: socials + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-1">
              {socialLinks.map(({ path, href, alt }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
            <span className="h-6 w-px bg-white/15" />
            <a href="/contact"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#FA9F43,#F1891A)", boxShadow: "0 6px 16px -4px rgba(250,159,67,0.6)" }}>
              Contact Us
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button type="button" onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/10 lg:hidden"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`relative z-[125] overflow-hidden border-b border-white/5 bg-[#0A0805]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden ${menuOpen ? "max-h-[800px] opacity-100" : "pointer-events-none invisible max-h-0 opacity-0"}`}>
        <div className="px-5 py-5">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map(({ label, href, hasDropdown }) => {
              const isActive = urlPathname === href || (hasDropdown && urlPathname.startsWith("/service"));
              if (hasDropdown) {
                return (
                  <div key={href}>
                    <button type="button" onClick={() => setMobileServiceOpen((v) => !v)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-300 ${isActive ? `${BRAND_GRADIENT} text-white` : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
                      {label}
                      <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServiceOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-[max-height] duration-300 ${mobileServiceOpen ? "max-h-[500px]" : "max-h-0"}`}>
                      <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-4">
                        {SERVICE_LINKS.map(({ label, href }) => (
                          <a key={href} href={href}
                            onClick={() => { setMenuOpen(false); setMobileServiceOpen(false); }}
                            className="rounded-lg px-3 py-2 text-[13px] text-white/65 transition-all hover:bg-white/5 hover:text-white">
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-300 ${isActive ? `${BRAND_GRADIENT} text-white` : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
                  {label}
                </a>
              );
            })}
          </nav>

          <a href="/contact" onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#FA9F43,#F1891A)" }}>
            Contact Us <ArrowUpRight size={18} />
          </a>

          <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/10 pt-5">
            {socialLinks.map(({ path, href, alt }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d={path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
