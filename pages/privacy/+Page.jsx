import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CosmicBg from "@/components/ui/CosmicBg";

const SITE = "https://www.skyupdigitalsolutions.com";
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE}/privacy` },
  ],
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-[#B9C0D4] leading-relaxed">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="font-poppins text-[#E8ECF8] min-h-screen relative">
      <CosmicBg />
      <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />

      <div className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase bg-gradient-to-r from-[#FA9F43] to-[#FFC978] bg-clip-text text-transparent mb-3">Legal</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-[#8A93AC] text-sm mb-12">Last updated: July 2026</p>

          <Section title="Introduction">
            <p>Skyup Digital Solutions ("we") respect your privacy and are committed to protecting the personal information you share with us through our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with us.</p>
          </Section>

          <Section title="Information We Collect">
            <p>We may collect the following information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, email address, phone number, company name, and any other details you provide through contact forms, enquiry forms, or service requests.</li>
              <li>Technical information such as IP address, browser type, device information, operating system, pages visited, and time spent on the website.</li>
              <li>Cookies and similar tracking data used to improve website performance and user experience.</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Deliver, improve, and personalise our services.</li>
              <li>Communicate with you about updates, offers, or service-related information.</li>
              <li>Analyse website usage and improve performance.</li>
              <li>Maintain security, prevent fraud, and ensure proper website operation.</li>
            </ul>
          </Section>

          <Section title="Cookies and Tracking">
            <p>We use cookies and similar technologies to enhance your browsing experience, understand website traffic, and improve our services. You can manage or disable cookies through your browser settings, although some parts of the website may not function properly if cookies are disabled.</p>
          </Section>

          <Section title="Sharing Your Information">
            <p>We do not sell your personal information. We may share your information only with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Trusted service providers who help us operate our website, manage communications, or deliver services.</li>
              <li>Legal authorities, when required by law or to protect our rights, property, or safety.</li>
              <li>A third party in connection with a business transfer, merger, acquisition, or restructuring.</li>
            </ul>
          </Section>

          <Section title="Data Retention">
            <p>We retain personal information only for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required by law, regulation, or legitimate business needs.</p>
          </Section>

          <Section title="Data Security">
            <p>We take reasonable administrative, technical, and organizational measures to protect your personal information from unauthorised access, loss, misuse, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="Your Rights">
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction or deletion of your personal information.</li>
              <li>Withdraw consent for marketing communications.</li>
              <li>Object to or restrict certain processing of your personal information.</li>
            </ul>
            <p>To exercise these rights, contact us using the details below.</p>
          </Section>

          <Section title="Third-Party Links">
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices, content, or security of those external websites. We encourage you to review their privacy policies before sharing any information.</p>
          </Section>

          <Section title="Children's Privacy">
            <p>Our website and services are not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we learn that we have collected information from a child without appropriate consent, we will take steps to delete it.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this page periodically to stay informed about how we protect your information.</p>
          </Section>

          <Section title="Contact Us">
            <p>Questions about this Privacy Policy? Email us at <a href="mailto:contact@skyupdigitalsolutions.com" className="text-[#FA9F43] hover:underline">contact@skyupdigitalsolutions.com</a> or call +91 8867867775.</p>
          </Section>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}
