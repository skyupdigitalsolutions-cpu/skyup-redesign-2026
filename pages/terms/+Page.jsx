import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CosmicBg from "@/components/ui/CosmicBg";

const SITE = "https://www.skyupdigitalsolutions.com";
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: `${SITE}/terms` },
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
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Terms &amp; Conditions</h1>
          <p className="text-[#8A93AC] text-sm mb-12">Includes our Refund Policy · Last updated: July 2026</p>

          <Section title="Introduction">
            <p>Welcome to SKYUP Digital Solutions. By accessing our website, engaging with our services, or entering into a business relationship with us, you agree to comply with and be bound by the following Terms &amp; Conditions and Refund Policy. Please read this page carefully before using our services.</p>
          </Section>

          <Section title="Use of Website">
            <ul className="list-disc pl-5 space-y-2">
              <li>The content on this website is for general information purposes only.</li>
              <li>You agree not to misuse the website or attempt unauthorized access to systems or data.</li>
              <li>We reserve the right to update or modify website content at any time without prior notice.</li>
            </ul>
          </Section>

          <Section title="Client Responsibilities">
            <p>Clients agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate, complete, and timely information required for project execution.</li>
              <li>Approve creatives, campaigns, and content within reasonable timelines.</li>
              <li>Ensure that all materials provided (logos, images, data) do not violate third-party rights.</li>
            </ul>
            <p>Delays caused by incomplete information or approvals may impact timelines and outcomes.</p>
          </Section>

          <Section title="Payments and Pricing">
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices are quoted in Indian Rupees (INR) unless stated otherwise.</li>
              <li>Payments must be made as per the agreed payment schedule (advance, milestone, or monthly retainers).</li>
              <li>Delayed payments may result in suspension of services.</li>
            </ul>
          </Section>

          <Section title="Advertising Spend">
            <ul className="list-disc pl-5 space-y-2">
              <li>Advertising budgets paid to platforms such as Google, Meta, or LinkedIn are separate from service fees.</li>
              <li>SKYUP Digital Solutions is not responsible for platform policy changes, account suspensions, or fluctuations in performance.</li>
              <li>Results may vary based on market conditions, competition, and platform algorithms.</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <ul className="list-disc pl-5 space-y-2">
              <li>All strategies, creatives, reports, and content created by SKYUP Digital Solutions remain our intellectual property until full payment is received.</li>
              <li>Upon full payment, final deliverables may be used by the client for agreed business purposes.</li>
              <li>Unauthorized reproduction or resale is prohibited.</li>
            </ul>
          </Section>

          <Section title="Limitation of Liability">
            <p>SKYUP Digital Solutions shall not be liable for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Any indirect, incidental, or consequential damages.</li>
              <li>Loss of revenue, data, or business opportunities.</li>
              <li>Performance outcomes influenced by external platforms or client-side factors.</li>
            </ul>
            <p>Our liability, if any, shall not exceed the fees paid for the specific service in question.</p>
          </Section>

          <Section title="Termination of Services">
            <ul className="list-disc pl-5 space-y-2">
              <li>Either party may terminate services with written notice as per the agreed contract or proposal.</li>
              <li>Fees for services already rendered or in progress are payable and non-refundable.</li>
            </ul>
          </Section>

          <Section title="Refund Policy">
            <ul className="list-disc pl-5 space-y-2">
              <li>Payments made for digital marketing services are non-refundable once the service has commenced.</li>
              <li>No refunds will be issued for work already completed or delivered, advertising spend paid to third-party platforms, or monthly retainers after the billing cycle has started.</li>
              <li>In case of duplicate payment or billing errors, eligible refunds will be processed after internal verification.</li>
            </ul>
            <p>Approved refunds, if any, will be processed within 7–10 business days.</p>
          </Section>

          <Section title="Governing Law">
            <p>These Terms &amp; Conditions and Refund Policy shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.</p>
          </Section>

          <Section title="Updates to This Page">
            <p>SKYUP Digital Solutions reserves the right to update these Terms &amp; Conditions and Refund Policy at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
          </Section>

          <Section title="Contact Us">
            <p>Questions about these terms? Email <a href="mailto:contact@skyupdigitalsolutions.com" className="text-[#FA9F43] hover:underline">contact@skyupdigitalsolutions.com</a> or call +91 8867867775.</p>
          </Section>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
}
