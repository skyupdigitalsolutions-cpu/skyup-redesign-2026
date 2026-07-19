import React from "react";

const HEADING_NAVY = "#1B2440";
const BODY = "#9A7F6E"; // muted brown body copy
const CHECK = "#2F6FE0"; // blue checkmark

function Check({ className = "h-4 w-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={CHECK}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

const CARDS = [
  {
    bg: "#ffe4c0",
    title: "Web development outsourcing",
    paragraphs: [
      "The practice of contracting an outside organization as a contracted partner to carry out and oversee website development work is known as outsourcing to a third-party website development company.",
      "Many businesses mistakenly think that hiring a single developer or even creating an in-house development team would be preferable to working with an outsourced firm. In most circumstances, this is incredibly wrong. Companies that choose to outsource website development to a third party can get a variety of advantages, including flexibility, scalability, cost savings, risk reduction, broader skill sets, and talent availability. The services include:",
    ],
    list: ["Staff Augmentation", "Dedicated team deployment", "Process Outsourcing"],
  },
  {
    bg: "#E9F1FB",
    title: "Web development consulting",
    paragraphs: [
      "Web development experts at Nextwebi are client-focused and customer-centric, they excel in developing agile websites that produce measurable business benefits and assist businesses in navigating every aspect of the digital landscape.",
    ],
    list: [
      "Deciding on the best platform or technology to use to create the project.",
      "Gathering information on target markets, rivals, and product attributes.",
      "Assessing current websites or apps and discovering UX & UI issues.",
      "Helping to design the new project and making sure the code is light-weight, the website is secured, and the pages load quickly.",
      "Assisting marketing initiatives through multiple mediums.",
    ],
  },
  {
    bg: "#E9F1FB",
    title: "Website maintenance and support",
    paragraphs: [
      "Nextwebi provide complete website maintenance and support including content and image updates, bug fixing, SSL installation, version upgrades, and vital security updates to name a few. Our expert team of professionals has several years of experience and is ready to face any challenges to keep your website running seamlessly and efficiently. Get a secured and hassle-free website maintenance experience customized to meet any size of business.",
    ],
    list: [
      "Content and image updation",
      "SSL Installation",
      "Site performance and checkup",
      "CMS support and updates",
      "Regular site backups",
      "Technical support",
      "Website version upgrade",
      "Fix Browser Compatibility Issues",
      "Monthly Website Analysis",
    ],
  },
  {
    bg: "#ffe4c0",
    title: "Web Development cost",
    paragraphs: [
      "The web development services cost varies from business to business and is based on a number of different criteria. Planning to develop a new website or redesign an existing one the cost will vary based on the requirements. The web development costs depend on multiple factors like the degree of technical difficulty, the length of the development process, etc. The web development costs also vary based on each company's experience, expertise, and skills, this estimate may vary. Major factors affecting the cost of web development include:",
    ],
    list: [
      "Size of the project",
      "Type of website",
      "Theme of the website",
      "Plugins and extensions",
      "CMS Integrations",
      "SEO optimization",
    ],
  },
];

function Card({ bg, title, paragraphs, list }) {
  return (
    <div className="rounded-lg p-7 sm:p-8" style={{ background: bg }}>
      <h3
        className="text-[18px] font-bold tracking-tight"
        style={{ color: HEADING_NAVY }}
      >
        {title}
      </h3>

      <div className="mt-3 space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[14px] leading-relaxed" style={{ color: BODY }}>
            {p}
          </p>
        ))}
      </div>

      <ul className="mt-5 space-y-2.5">
        {list.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-0.5 shrink-0">
              <Check />
            </span>
            <span className="text-[14px] leading-snug text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WebDevInfoGrid({
  title = "Turning Ideas into Interfaces—Powered by Coffee, Driven by Our Web Development Agency",
  cards = CARDS,
}) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="max-w-5xl text-[26px] font-extrabold leading-snug tracking-tight sm:text-[36px]"
          style={{ color: HEADING_NAVY }}
        >
          {title}
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}