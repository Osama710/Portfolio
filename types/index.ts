export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
}

export interface ProjectItem {
  name: string;
  url?: string;
  domain?: string;
  description: string;
  tech: string[];
  tag: string;
  image?: string;
  screenshot?: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  icon: "layers" | "layout" | "server" | "plug" | "shield" | "test";
  summary: string;
  deliverables: string[];
  tags: string[];
}

export interface GithubProjectItem {
  name: string;
  repo: string;
  period: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  contribution: string;
  tech: string[];
  features: string[];
  screenshot?: string;
}

export interface SkillCategory {
  label: string;
  icon: "code" | "layout" | "server" | "database" | "cloud" | "sparkles";
  skills: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  detail: string;
  period: string;
  location: string;
}

export interface CertificationItem {
  title: string;
  issuer?: string;
}
