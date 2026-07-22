import React from "react";
import CtaSection from "@/components/CtaSection";

const BLUE = "#2E6BFF", ORANGE_L = "#FFB066";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/service" },
  { label: "Blogs", href: "/blogs" },
  { label: "Works", href: "/works" },
  { label: "Contact us", href: "/contact" },
];

const Service_Links = [
  { label: "Web Development", href: "/service/web-development" },
  { label: "SEO", href: "/service/seo" },
  { label: "Social Media Marketing", href: "/service/social-media-marketing" },
  { label: "Performance Marketing", href: "/service/performance-marketing" },
  { label: "AI Automation", href: "/service/ai-automation" },
  { label: "Video Editing", href: "/service/video-editing" },
  { label: "UI/UX Design", href: "/service/ui-ux-design" },
  { label: "Branding", href: "/service/graphic-design" }, // display "Branding", slug graphic-design (Project Memory §7)
];

const LEGAL_LINKS = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/110886969/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/skyupdigitalsolutions",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584820941998",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
];

function BrandMark() {
  // full-colour logo (blue + orange); dark ink pre-swapped to white for the dark footer
  return <img src="/images/skyup-logo.svg" alt="SkyUp logo" width="351" height="115" className="h-auto w-full" />;
}

function ColHeading({ children }) {
  return (
    <h3 className="relative inline-block pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
      {children}
      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#2E6BFF] via-[#87b6f4] to-[#FFB066]" />
    </h3>
  );
}

function LinkColumn({ heading, links }) {
  return (
    <div>
      <ColHeading>{heading}</ColHeading>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="group inline-flex items-center text-[15px] text-white/60 transition-colors duration-200 hover:text-white">
              <span className="w-1 -translate-x-1 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100" style={{ color: ORANGE_L }}>→</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">{l.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialRow({ links }) {
  return (
    <div>
      <ColHeading>Follow us</ColHeading>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map(({ label, href, path }) => (
          <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
              <path d={path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactChip({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(46,107,255,.16)", color: "#9DBBFF" }}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold uppercase tracking-wider text-white/80">{label}</span>
        <span className="block text-[14px] font-medium text-white/55 transition-colors group-hover:text-white">{value}</span>
      </span>
    </>
  );
  return href ? <a href={href} className="group flex items-start gap-3">{inner}</a> : <div className="flex items-start gap-3">{inner}</div>;
}

export default function Footer({
  logo = <BrandMark />,
  addressLines = ["2nd Floor, No 23, 14A, Dasarahalli Main Rd,", " E Block, Sahakar Nagar, Byatarayanapura", "Bengaluru, Karnataka 560092"],
  phone = "+91 8867867775",
  email = "contact@skyupdigitalsolutions.com",
  tagline = "We help brands empower with result-oriented digital marketing, creative branding, and smart automation — turning visibility into real business growth.",
  quickLinks = QUICK_LINKS,
  socialLinks = SOCIAL_LINKS,
  legalLinks = LEGAL_LINKS,
  copyright = `© ${new Date().getFullYear()} SKYUP Digital Solutions. All rights reserved.`,
  ctaProps = {},
}) {
  const scrollTop = () => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ fontFamily: "'Poppins',sans-serif" }}>
      <div className="relative z-20" style={{ background: "#06070D" }}>
        <CtaSection {...ctaProps} className={`!bg-transparent ${ctaProps.className ?? ""}`} />
      </div>

      <div className="relative z-10">
        <div className="relative -mt-16 overflow-hidden rounded-t-[2rem] border-t border-white/10 px-6 pb-10 pt-28 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.6)] sm:-mt-24 sm:pt-36 lg:px-[120px]"
          style={{ background: "#0A0B12" }}>
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(50% 60% at 15% 0%, ${BLUE}12, transparent 70%)` }} />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-12 pt-[50px] lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="w-[180px]">{logo}</div>
                <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/50">{tagline}</p>
                <div className="mt-8 space-y-4">
                  <ContactChip icon={PinIcon} label="Visit us" value={addressLines} />
                  <ContactChip icon={PhoneIcon} label="Call us" value={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} />
                  <ContactChip icon={MailIcon} label="Email us" value={email} href={`mailto:${email}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
                <LinkColumn heading="Quick links" links={quickLinks} />
                <LinkColumn heading="Services" links={Service_Links} />
                <SocialRow links={socialLinks} />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
              <p className="text-sm text-white/55">{copyright}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {legalLinks.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">{l.label}</a>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={scrollTop} aria-label="Back to top"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all hover:-translate-y-0.5 hover:border-transparent hover:text-white"
                  style={{ background: undefined }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.05)")}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Contact icons ---- */
function PinIcon(props) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" /><circle cx="12" cy="10" r="3" /></svg>);
}
function PhoneIcon(props) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.69 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0122 16.92z" /></svg>);
}
function MailIcon(props) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
}
