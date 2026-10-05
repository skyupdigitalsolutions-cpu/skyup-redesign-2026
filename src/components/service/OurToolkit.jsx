import React from "react";
import {
  Search,
  Share2,
  Target,
  Mail,
  Bot,
  BrainCircuit,
  PenTool,
  Palette,
  Code2,
  Sparkles,
} from "lucide-react";
// npm i simple-icons   (ships every brand's official logo + brand color)
// NOTE: import only the icons we actually use — a namespace import
// (`import * as simpleIcons`) pulls the ENTIRE ~26 MB library into the bundle
// because tree-shaking can't remove namespace imports. Named imports below
// tree-shake down to just these logos. Brands simple-icons no longer ships
// (Adobe apps, LinkedIn, OpenAI, Canva, Ahrefs, VS Code) are simply omitted
// and fall back to the tinted monogram automatically — same as before.
import {
  siSemrush,
  siGoogleanalytics,
  siGooglesearchconsole,
  siMeta,
  siGoogleads,
  siMailchimp,
  siMake,
  siZapier,
  siLangchain,
  siFastapi,
  siPostman,
  siN8n,
  siNotion,
  siReplit,
  siTensorflow,
  siPytorch,
  siScikitlearn,
  siHuggingface,
  siFigma,
  siNodedotjs,
  siExpress,
  siReact,
  siBootstrap,
  siTailwindcss,
  siMui,
  siGithub,
  siRender,
  siNetlify,
  siCloudflare,
} from "simple-icons";

/** slug -> icon object, for the icons that exist in simple-icons. */
const ICONS = {
  semrush: siSemrush,
  googleanalytics: siGoogleanalytics,
  googlesearchconsole: siGooglesearchconsole,
  meta: siMeta,
  googleads: siGoogleads,
  mailchimp: siMailchimp,
  make: siMake,
  zapier: siZapier,
  langchain: siLangchain,
  fastapi: siFastapi,
  postman: siPostman,
  n8n: siN8n,
  notion: siNotion,
  replit: siReplit,
  tensorflow: siTensorflow,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
  huggingface: siHuggingface,
  figma: siFigma,
  nodedotjs: siNodedotjs,
  express: siExpress,
  react: siReact,
  bootstrap: siBootstrap,
  tailwindcss: siTailwindcss,
  mui: siMui,
  github: siGithub,
  render: siRender,
  netlify: siNetlify,
  cloudflare: siCloudflare,
};

const BRAND = "#5b8cff";
const BRAND_LIGHT = "rgba(255,255,255,0.04)";

/** tool label -> simple-icons slug. Tools without a real logo here either
 *  use CUSTOM_LOGOS below or fall back to a tinted monogram automatically. */
const SLUGS = {
  SEMrush: "semrush",
  GA4: "googleanalytics",
  GSC: "googlesearchconsole",
  Ahrefs: "ahrefs",
  "Meta Business Suite": "meta",
  Canva: "canva",
  "Adobe Photoshop": "adobephotoshop",
  "Adobe Illustrator": "adobeillustrator",
  "Google Ads": "googleads",
  "Meta Ads Manager": "meta",
  "LinkedIn Ads": "linkedin",
  "Keyword Planner": "googleads",
  Mailchimp: "mailchimp",
  "Make.com": "make",
  Zapier: "zapier",
  LangChain: "langchain",
  OpenAI: "openai",
  FastAPI: "fastapi",
  Postman: "postman",
  n8n: "n8n",
  Notion: "notion",
  Replit: "replit",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "Scikit-learn": "scikitlearn",
  "Hugging Face": "huggingface",
  Figma: "figma",
  "Adobe XD": "adobexd",
  "Adobe Premiere Pro": "adobepremierepro",
  "Adobe After Effects": "adobeaftereffects",
  "Node.js": "nodedotjs",
  Express: "express",
  "React.js": "react",
  Bootstrap: "bootstrap",
  "Tailwind CSS": "tailwindcss",
  "Material UI": "mui",
  GitHub: "github",
  "VS Code": "visualstudiocode",
  Render: "render",
  Netlify: "netlify",
  Cloudflare: "cloudflare",
};

/** tool label -> your own asset in /public (takes priority over simple-icons).
 *  Use this for brands simple-icons doesn't ship (e.g. AWS). Drop the files
 *  in /public/logos/ and add an entry. Square, padding-trimmed SVGs look best. */
const CUSTOM_LOGOS = {
  AWS: "/images/aws.svg",
  // "Screaming Frog": "/logos/screaming-frog.svg",
  // "Notebook LLM": "/logos/notebooklm.svg",
  // "Cursor AI": "/logos/cursor.svg",
};

/** Returns the simple-icons object for a tool, or null if none exists. */
function iconFor(name) {
  const slug = SLUGS[name];
  if (!slug) return null;
  return ICONS[slug] || null;
}

const categories = [
  {
    icon: Search,
    title: "Search Engine Optimization",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: ["SEMrush", "GA4", "GSC", "Screaming Frog", "Ahrefs"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "Meta Business Suite",
      "Canva",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
  },
  {
    icon: Target,
    title: "Performance Marketing",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "LinkedIn Ads",
      "Keyword Planner",
    ],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: ["Mailchimp", "Make.com", "Zapier", "LangChain"],
  },
  {
    icon: Bot,
    title: "AI Automation",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "OpenAI",
      "FastAPI",
      "Postman",
      "n8n",
      "Notion",
      "Notebook LLM",
      "Replit",
      "Cursor AI",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
    ],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: ["Figma", "Adobe XD"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
      "Adobe Premiere Pro",
      "Adobe After Effects",
    ],
  },
  {
    icon: Code2,
    title: "Web Development",
    band: BRAND_LIGHT,
    accent: BRAND,
    tools: [
      "Node.js",
      "Express",
      "React.js",
      "SQL & NoSQL",
      "Bootstrap",
      "Tailwind CSS",
      "Material UI",
      "GitHub",
      "Postman",
      "VS Code",
      "Render",
      "Netlify",
      "Cloudflare",
      "AWS",
    ],
  },
];

function monogram(name) {
  const w = name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/);
  return (w.length === 1 ? w[0].slice(0, 2) : w[0][0] + w[1][0]).toUpperCase();
}

function Pill({ name, accent }) {
  const custom = CUSTOM_LOGOS[name];
  const icon = iconFor(name);
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1]">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-white/20 shadow-sm">
        {custom ? (
          <img
            src={custom}
            alt={name}
            width="17"
            height="17"
            className="object-contain"
          />
        ) : icon ? (
          <svg
            role="img"
            aria-label={name}
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill={`#${icon.hex}`}
          >
            <path d={icon.path} />
          </svg>
        ) : (
          <span
            className="text-[10px] font-bold leading-none"
            style={{ color: accent }}
          >
            {monogram(name)}
          </span>
        )}
      </span>
      {name}
    </span>
  );
}

export default function OurToolkit() {
  return (
    <section className="px-6 py-12 lg:px-[120px] lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur"
            style={{ background: BRAND_LIGHT, color: BRAND }}
          >
            <Sparkles size={13} />
            Our Toolkit
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
            Industry-leading tools we use daily
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            Best-in-class tools for every category so your campaigns and
            products run on rock-solid infrastructure.
          </p>
        </div>

        {/* Category bands */}
        <div className="space-y-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="rounded-3xl border border-white/8 p-6 sm:p-8 backdrop-blur-sm lg:flex lg:items-start lg:gap-10"
                style={{ background: cat.band }}
              >
                <div className="mb-5 flex items-center gap-3 lg:mb-0 lg:w-72 lg:flex-shrink-0">
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${cat.accent}1F`, color: cat.accent }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <h3 className="text-lg font-bold leading-tight text-white sm:text-xl">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-wrap gap-2.5">
                  {cat.tools.map((tool) => (
                    <Pill key={tool} name={tool} accent={cat.accent} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}