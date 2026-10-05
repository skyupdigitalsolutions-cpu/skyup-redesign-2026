import React from "react";
import CtaSection from "@/components/CtaSection";

const BLUE = "#2E6BFF", ORANGE_L = "#FFB066";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/service" },
  { label: "Industries", href: "/industries" },
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
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584820941998&sk=directory_contact_info", src: "/images/facebook.svg" },
  { label: "Instagram", href: "https://www.instagram.com/skyupdigitalsolutions?igsh=ZDN3cDl1bG80bXV4", src: "/images/instagram.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/skyup-digital-solutions/", src: "/images/Linkedin.svg" },
];

function BrandMark() {
  // forced to white so it reads on the dark footer (logo is monochrome)
  return <img src="/images/logo_skyup.svg" alt="SkyUp logo" className="h-auto w-full" style={{ filter: "brightness(0) invert(1)" }} />;
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
        {links.map(({ label, href, src }) => (
          <a key={label} href={href} aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10">
            <img src={src} alt="" className="h-[20px] w-[20px] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
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
