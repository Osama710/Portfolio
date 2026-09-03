import type {
  CapabilityItem,
  CertificationItem,
  EducationItem,
  ExperienceItem,
  GithubProjectItem,
  ProjectItem,
  SkillCategory,
  SocialLink,
  StatItem,
} from "@/types";

// ---------------------------------------------------------------------------
// Profile and contact details (source of truth for the site).
// Every value here comes directly from Muhammad Osama's CV. Nothing invented.
// ---------------------------------------------------------------------------
export const profile = {
  name: "Muhammad Osama",
  initials: "MO",
  title: "Full Stack Software Engineer",
  role: "Senior Software Engineer",
  company: "Raptr Games",
  location: "Karachi, Pakistan",
  relocation: "Open to Relocation",
  email: "osamamymini@gmail.com",
  phone: "+92 336 2417513",
  phoneHref: "+923362417513",
  linkedin: "https://www.linkedin.com/in/osama-yousuf-6a1952177",
  linkedinLabel: "linkedin.com/in/osama-yousuf-6a1952177",
  github: "https://github.com/Osama710",
  githubLabel: "github.com/Osama710",
  resumeFile: "/Muhammad_Osama_Resume.pdf",
  tagline:
    "Senior Software Engineer building fintech and e-commerce products — KYC, payments, admin tools, and backend APIs.",
  heroLead:
    "Full-stack engineer with 5+ years shipping production web apps — polished interfaces, secure APIs, admin dashboards, and deployments teams can maintain. Strong in fintech, e-commerce, and SaaS across the entire stack.",
  heroRotations: [
    "interfaces people want to use",
    "APIs built for real traffic",
    "admin tools teams rely on",
    "Next.js products end-to-end",
    "payment & auth flows done right",
    "frontend craft + backend depth",
  ],
  summary:
    "Full stack engineer with 5+ years of experience in Next.js, React, Node.js, and Python (FastAPI). Promoted to Senior Software Engineer at Raptr Games for delivery on production fintech and e-commerce work. Strong across frontend, backend, and API design, including payment integrations, database design, and deployment on Vercel and GCP.",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

// Hero stats (from CV).
export const heroStats: StatItem[] = [
  { label: "Years experience", value: "5", suffix: "+" },
  { label: "Shipped projects", value: "10", suffix: "+" },
];

export const heroStack = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
] as const;

export const heroHighlights = [
  {
    label: "Experience",
    value: "5+",
    detail: "Years building production software",
    counter: { value: "5", suffix: "+" },
  },
  {
    label: "Projects",
    value: "10+",
    detail: "Live apps shipped end-to-end",
    counter: { value: "10", suffix: "+" },
  },
  {
    label: "Stack",
    value: "Full-stack",
    detail: "UI, APIs, dashboards & deploy",
  },
] as const;

export const heroTraits = ["Full-time & contract", "Frontend → backend"] as const;

export const heroServiceLinks = [
  { label: "Frontend UI", href: "#capabilities" },
  { label: "Backend APIs", href: "#capabilities" },
  { label: "Full-stack apps", href: "#capabilities" },
  { label: "Fintech flows", href: "#capabilities" },
] as const;

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Raptr Games",
    period: "Feb 2024 - Present",
    location: "Karachi",
    current: true,
    bullets: [
      "Promoted from Software Engineer to Senior Software Engineer for consistent delivery on core product features.",
      "Core/lead engineer on Raptr Wallet, a fintech platform serving 75,000+ users, and Raptr Store, a gaming commodities e-commerce marketplace.",
      "Built KYC workflows, JWT-based authentication, and idempotent payment webhooks for secure, reliable transaction processing.",
      "Built the admin portal from scratch: CRUD, AI features, transaction and settlement reporting, analytics dashboards, and role-based permissions.",
      "Developed a separate vendor portal for order and transaction tracking, complaint management, graph-based analytics dashboards, and team-based role permissions.",
      "Contributed to Raptr.gg, a platform for user registration, wallet creation, and esports tournament participation.",
      "Designed scalable MySQL/MongoDB schemas and RESTful APIs for authentication, payment gateways, and banking services.",
      "Built vendor/partner-facing APIs with Python FastAPI, and a PWA mini-app for vendor partners to integrate store services within their own apps.",
      "Deployed and monitored systems on Vercel and Google Cloud Console; implemented crypto encryption and Redis session security; worked Agile with JIRA.",
    ],
    tech: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "MySQL",
      "Redis",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "FastAPI",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "WeUno Technologies",
    period: "Apr 2022 - Jan 2024",
    location: "Karachi",
    bullets: [
      "Designed and developed multiple frontend websites and admin panels using React.js, Next.js, Bootstrap, Tailwind CSS, and Ant Design (SSR-enabled).",
      "Built backend web and admin panel RESTful APIs using Node.js, Fastify, Express, JWT, and Sequelize ORM; managed MongoDB and MySQL databases.",
      "Integrated APIs using Redux state management and Context API.",
    ],
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "Fastify",
      "Express",
      "Sequelize",
      "MongoDB",
      "MySQL",
    ],
  },
  {
    role: "Freelance Full Stack & Python Developer",
    company: "Fiverr & Upwork",
    period: "Sept 2020 - Apr 2022",
    location: "Remote",
    bullets: [
      "Completed multiple Python projects and GUI-based desktop applications using Tkinter.",
      "Designed frontend web UIs using HTML, CSS, jQuery, React.js, Next.js, and Tailwind CSS.",
      "Developed full-stack websites using React.js, Next.js, Flask, Node.js, Express, and TypeScript; deployed with Vercel.",
    ],
    tech: ["Python", "Flask", "React.js", "Next.js", "TypeScript", "Tkinter"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Interns Pakistan",
    period: "Oct 2021 - Nov 2021",
    location: "Remote",
    bullets: [
      "Learned frontend web development fundamentals using HTML, CSS, and Bootstrap.",
    ],
    tech: ["HTML", "CSS", "Bootstrap"],
  },
  {
    role: "Web Developer Intern",
    company: "Switch Studios",
    period: "Sept 2021 - Oct 2021",
    location: "Karachi",
    bullets: ["Worked on frontend web projects using HTML, CSS, and WordPress."],
    tech: ["HTML", "CSS", "WordPress"],
  },
];

export const projects: ProjectItem[] = [
  {
    name: "Raptr Wallet",
    domain: "raptrwallet.com",
    url: "https://raptrwallet.com",
    description:
      "Static marketing site (HTML, CSS, JavaScript) that promotes the Raptr Wallet app — download links, product benefits, and feature highlights.",
    tech: ["HTML", "CSS", "JavaScript"],
    tag: "Marketing",
    screenshot: "/projects/raptr-wallet.png",
  },
  {
    name: "Raptr Store",
    domain: "raptrstore.com",
    url: "https://raptrstore.com",
    description:
      "Next.js e-commerce platform with user registration, product checkout, in-app coin purchases, and vendor-facing flows.",
    tech: ["Next.js", "Node.js", "MongoDB", "MySQL", "Redux"],
    tag: "E-commerce",
    screenshot: "/projects/raptr-store.png",
  },
  {
    name: "Raptr.gg",
    domain: "raptr.gg",
    url: "https://raptr.gg",
    description:
      "Next.js platform for user registration, wallet creation, esports tournament sign-up, and live streaming features.",
    tech: ["Next.js", "Tailwind CSS", "Redux", "Node.js", "Express"],
    tag: "Esports",
    screenshot: "/projects/raptr-gg.png",
  },
  {
    name: "Raptr Games",
    domain: "raptrgames.com",
    url: "https://raptrgames.com",
    description:
      "Static company website (HTML, CSS, JavaScript) covering Raptr Games and linking to Wallet, Store, and Raptr.gg with product details.",
    tech: ["HTML", "CSS", "JavaScript"],
    tag: "Corporate",
    screenshot: "/projects/raptr-games.png",
  },
  {
    name: "Meri Sehat",
    domain: "merisehat.pk",
    url: "https://merisehat.pk",
    description: "Healthcare web app and doctor's panel.",
    tech: ["React.js"],
    tag: "Healthcare",
    screenshot: "/projects/meri-sehat.png",
  },
  {
    name: "The Groves",
    domain: "thegroves-sa.com",
    url: "https://thegroves-sa.com",
    description:
      "Website for a major entertainment and festival destination at Riyadh Season, Saudi Arabia.",
    tech: ["Next.js"],
    tag: "Entertainment",
  },
  {
    name: "Prosper Architect",
    domain: "prosperarch.com",
    url: "https://prosperarch.com",
    description:
      "Architecture firm website with a client portal for managing clients and projects.",
    tech: ["Next.js", "PHP", "Laravel"],
    tag: "Client Portal",
    screenshot: "/projects/prosper-architect.png",
  },
  {
    name: "Ana Batla",
    domain: "anabatla.com",
    url: "https://anabatla.com",
    description: "Static company website showcasing products and services.",
    tech: ["Next.js", "Node.js", "Fastify"],
    tag: "Corporate",
    screenshot: "/projects/ana-batla.png",
  },
  {
    name: "Eats Official",
    description:
      "Food encyclopedia and reference site built on Next.js.",
    tech: ["Next.js"],
    tag: "Food",
    screenshot: "/projects/eats-official.png",
  },
];

export const capabilities: CapabilityItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Apps",
    icon: "layers",
    summary: "Full product builds: UI, APIs, data layer, and deployment.",
    deliverables: [
      "Next.js / React product surfaces",
      "Node.js & FastAPI service layers",
      "Admin, vendor & internal dashboards",
    ],
    tags: ["Next.js", "React", "Node.js", "FastAPI"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: "layout",
    summary: "Production UIs that stay fast, accessible, and maintainable.",
    deliverables: [
      "Marketing sites & landing pages",
      "Dashboard & portal interfaces",
      "Design-system friendly components",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    summary: "Secure REST APIs, auth flows, and data models built to scale.",
    deliverables: [
      "RESTful API design & implementation",
      "JWT auth & role-based access",
      "MySQL / MongoDB schema design",
    ],
    tags: ["Node.js", "Express", "FastAPI", "Prisma"],
  },
  {
    id: "fintech",
    title: "Fintech Integrations",
    icon: "plug",
    summary: "Payment flows, webhooks, and third-party services wired safely.",
    deliverables: [
      "Payment gateway integrations",
      "Idempotent webhook handlers",
      "KYC & transaction workflows",
    ],
    tags: ["Payments", "Webhooks", "KYC"],
  },
  {
    id: "integrations",
    title: "API & Service Integrations",
    icon: "shield",
    summary: "Third-party APIs, partner integrations, and secure service connections.",
    deliverables: [
      "Partner & vendor-facing APIs",
      "Third-party SDK / REST integrations",
      "Redis sessions & encryption patterns",
    ],
    tags: ["REST", "Redis", "Cloud"],
  },
  {
    id: "quality",
    title: "Testing & Production Hardening",
    icon: "test",
    summary: "Validation, error handling, monitoring, and production deployment support.",
    deliverables: [
      "Schema validation & error handling",
      "Staging / production deployment support",
      "Agile delivery with clear documentation",
    ],
    tags: ["Validation", "Vercel", "GCP"],
  },
];

export const githubProjects: GithubProjectItem[] = [
  {
    name: "Express TypeScript Boilerplate",
    repo: "https://github.com/Osama710/express-typescript-boilerplate",
    period: "University · Open source",
    description:
      "Starter API with JWT auth, Yup validation, and MySQL user CRUD for new Node backends.",
    problem:
      "New Node backends repeat the same auth, validation, and migration setup every time.",
    solution:
      "Packaged a typed Express boilerplate with login, protected routes, and a migrate endpoint for MySQL tables.",
    architecture:
      "Express + TypeScript, JWT auth middleware, Yup request validation, MySQL with migration endpoint.",
    contribution:
      "Designed the project structure, auth flow, user CRUD routes, and database migration pattern.",
    tech: ["Express", "TypeScript", "JWT", "MySQL", "Yup"],
    features: ["JWT auth", "Yup validation", "User CRUD", "DB migrate endpoint"],
  },
  {
    name: "Accounting Cycle",
    repo: "https://github.com/Osama710/Accounting-Cycle",
    period: "University · Desktop app",
    description:
      "Python desktop app for ledgers, trial balance, income statements, and balance sheets.",
    problem:
      "Manual accounting workflows needed a local system for ledgers, updates, and financial statements.",
    solution:
      "Built a Tkinter desktop app with SQLite storage, ledger management, and automated statement generation.",
    architecture:
      "Python + Tkinter UI, SQLite database layer, modular report preparation and Excel export scripts.",
    contribution:
      "Solo project: database design, UI forms, accounting logic, and financial report modules.",
    tech: ["Python", "Tkinter", "SQLite"],
    features: ["Ledger management", "Trial balance", "Income & balance sheets", "Excel export"],
    screenshot: "/projects/github/accounting-cycle.png",
  },
  {
    name: "Snipping Tool",
    repo: "https://github.com/Osama710/Snipping-Tool-with-Python",
    period: "University · Desktop utility",
    description:
      "Python snipping tool with region capture, live coordinate readout, auto-save, and a packaged Windows executable.",
    problem:
      "Quick screen captures needed a lightweight tool with instant save and coordinate feedback for dev work.",
    solution:
      "Built a Tkinter + PyAutoGUI utility that captures snip regions and saves timestamped PNG files locally.",
    architecture:
      "Python desktop app with Tkinter UI, PyAutoGUI screen capture, and a release-built .exe for easy sharing.",
    contribution:
      "Solo project: capture UI, coordinate overlay, save workflow, and Windows executable packaging.",
    tech: ["Python", "Tkinter", "PyAutoGUI"],
    features: ["Region snip capture", "Live coordinates", "Auto-save PNG", "Packaged .exe"],
    screenshot: "/projects/github/snipping-tool.png",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    icon: "code",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP"],
  },
  {
    label: "Frontend",
    icon: "layout",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "Context API",
      "Tailwind CSS",
      "SCSS",
      "Bootstrap",
      "Ant Design",
      "Chart.js",
      "HTML",
      "CSS",
      "jQuery",
      "SSR",
      "PWA Development",
    ],
  },
  {
    label: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "Express",
      "Fastify",
      "FastAPI",
      "Flask",
      "RESTful API Design",
      "JWT",
      "Sequelize ORM",
      "Yup Validation",
    ],
  },
  {
    label: "Databases",
    icon: "database",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    label: "Tools & Cloud",
    icon: "cloud",
    skills: [
      "Vercel",
      "Google Cloud Console",
      "Git",
      "NGINX",
      "ElectronJS",
      "JIRA",
      "Payment Gateway Integration",
      "Crypto Encryption & Session Security",
    ],
  },
  {
    label: "AI-Assisted Development",
    icon: "sparkles",
    skills: ["Cursor", "Claude"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "BS Computer Science",
    school: "Usman Institute of Technology (NED Affiliated)",
    detail: "CGPA 3.23",
    period: "2018 - 2022",
    location: "Karachi, Pakistan",
  },
];

export const certifications: CertificationItem[] = [
  { title: "PCAP: Programming Essentials in Python" },
  { title: "Saylani MTP: Online Python Programming Course" },
  { title: "IEEE Speed Programming Competition Winner, 2020" },
  { title: "Google Hash Code 2020, 1777th worldwide, 5th in Pakistan" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#capabilities" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
