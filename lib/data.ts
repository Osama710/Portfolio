import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  SocialLink,
  StatItem,
} from "@/types";

// ---------------------------------------------------------------------------
// PROFILE — the single source of truth for personal/contact information.
// Every value here comes directly from Muhammad Osama's CV. Nothing invented.
// ---------------------------------------------------------------------------
export const profile = {
  name: "Muhammad Osama",
  initials: "MO",
  title: "Full Stack Software Engineer",
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
    "Senior Software Engineer shipping production fintech and e-commerce systems — from KYC and payment webhooks to admin dashboards used every day by tens of thousands of people.",
  summary:
    "Full Stack Software Engineer with 5+ years of experience building scalable web and fintech applications using Next.js, React, Node.js, and Python (FastAPI). Recently promoted to Senior Software Engineer at Raptr Games for consistent delivery on production fintech and e-commerce systems. Skilled across frontend, backend, and API design, with hands-on experience in payment integrations, database architecture, and cloud deployment.",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

// Stats shown on the hero dashboard card — every number is drawn directly
// from the CV (years of experience, Raptr Wallet's user base, project count).
export const heroStats: StatItem[] = [
  { label: "Years of experience", value: "5", suffix: "+" },
  { label: "Raptr Wallet users", value: "75,000", suffix: "+" },
  { label: "Shipped projects", value: "8" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Senior Software Engineer",
    company: "Raptr Games",
    period: "Feb 2024 — Present",
    location: "Karachi",
    current: true,
    bullets: [
      "Promoted from Software Engineer to Senior Software Engineer for consistent delivery on core product features.",
      "Core/lead engineer on Raptr Wallet, a fintech platform serving 75,000+ users, and Raptr Store, a gaming commodities e-commerce marketplace.",
      "Built KYC workflows, JWT-based authentication, and idempotent payment webhooks for secure, reliable transaction processing.",
      "Built the admin portal from scratch — CRUD operations, AI-powered features, and transaction & settlement reporting with graph-based analytics and role-based permission access.",
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
    period: "Apr 2022 — Jan 2024",
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
    period: "Sept 2020 — Present",
    location: "Remote",
    current: true,
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
    period: "Oct 2021 — Nov 2021",
    location: "Remote",
    bullets: [
      "Learned frontend web development fundamentals using HTML, CSS, and Bootstrap.",
    ],
    tech: ["HTML", "CSS", "Bootstrap"],
  },
  {
    role: "Web Developer Intern",
    company: "Switch Studios",
    period: "Sept 2021 — Oct 2021",
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
      "Marketing site for the Raptr Wallet fintech app — the product Osama leads engineering on, now serving 75,000+ users with KYC, payments, and secure transactions.",
    tech: ["Next.js", "TypeScript"],
    tag: "Fintech",
  },
  {
    name: "Raptr Store",
    domain: "raptrstore.com",
    url: "https://raptrstore.com",
    description:
      "Primary e-commerce marketplace for gaming commodities, built and maintained as core/lead engineer.",
    tech: ["Next.js", "Node.js", "MongoDB", "MySQL"],
    tag: "E-commerce",
  },
  {
    name: "Raptr.gg",
    domain: "raptr.gg",
    url: "https://raptr.gg",
    description:
      "Platform for user registration, wallet creation, and esports tournament participation.",
    tech: ["Next.js", "Tailwind CSS", "Redux", "Node.js", "Express"],
    tag: "Esports",
  },
  {
    name: "Raptr Games",
    domain: "raptrgames.com",
    url: "https://raptrgames.com",
    description: "Corporate site showcasing the full Raptr product suite.",
    tech: ["Next.js"],
    tag: "Corporate",
  },
  {
    name: "Meri Sehat",
    domain: "merisehat.pk",
    url: "https://merisehat.pk",
    description: "Healthcare web app and doctor's panel.",
    tech: ["React.js"],
    tag: "Healthcare",
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
  },
  {
    name: "Ana Batla",
    domain: "anabatla.com",
    url: "https://anabatla.com",
    description: "Static company website showcasing products and services.",
    tech: ["Next.js", "Node.js", "Fastify"],
    tag: "Corporate",
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
    period: "2018 — 2022",
    location: "Karachi, Pakistan",
  },
];

export const certifications: CertificationItem[] = [
  { title: "PCAP: Programming Essentials in Python" },
  { title: "Saylani MTP: Online Python Programming Course" },
  { title: "IEEE Speed Programming Competition Winner, 2020" },
  { title: "Google Hash Code 2020 — 1777th worldwide, 5th in Pakistan" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
