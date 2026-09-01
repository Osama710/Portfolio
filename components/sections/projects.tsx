"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { githubProjects, projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";
import type { GithubProjectItem, ProjectItem } from "@/types";

type ProjectInsight = {
  problem: string;
  solution: string;
  architecture?: string;
  contribution?: string;
  features: string[];
};

type ChromaTone = "coral" | "violet" | "cyan" | "lime" | "amber";

const cutVariants = [
  "project-cut-tr",
  "project-cut-bl",
  "project-cut-br",
  "project-cut-tl",
] as const;

const projectInsights: Record<string, ProjectInsight> = {
  "Raptr Wallet": {
    problem: "Users needed a clear landing page to discover Raptr Wallet and download the app.",
    solution: "Static marketing site highlighting app benefits, features, and download paths.",
    architecture: "HTML, CSS, and JavaScript — lightweight static pages with responsive layout.",
    contribution: "Built and maintained the marketing site; core wallet product (KYC, payments) is separate backend work.",
    features: ["App download CTAs", "Product benefits", "Feature highlights"],
  },
  "Raptr Store": {
    problem: "Needed an e-commerce platform for gaming commodities with accounts and purchases.",
    solution: "Next.js storefront with registration, checkout, coin purchases, and order flows.",
    architecture: "Next.js frontend, Node.js APIs, MongoDB and MySQL, vendor and admin dashboards.",
    contribution: "Lead engineer on catalog, checkout, coin purchases, vendor tracking, and admin tooling.",
    features: ["User registration", "E-commerce checkout", "Coin purchases"],
  },
  "Raptr.gg": {
    problem: "Needed one platform for accounts, wallets, tournaments, and live esports content.",
    solution: "Next.js app for registration, wallet creation, tournament entry, and live streaming.",
    architecture: "Next.js and Redux UI, Node/Express APIs, wallet registration linked to Raptr accounts.",
    contribution: "Built registration, wallet creation, tournament flows, and streaming integration.",
    features: ["User registration", "Wallet creation", "Tournaments & live streams"],
  },
  "Raptr Games": {
    problem: "Company needed a hub site explaining Raptr and routing visitors to each product.",
    solution: "Static corporate site with company info and links to Wallet, Store, and Raptr.gg.",
    architecture: "HTML, CSS, and JavaScript — static pages with cross-site navigation.",
    contribution: "Built the company site and product landing paths to the Raptr ecosystem.",
    features: ["Company overview", "Product links", "Static marketing pages"],
  },
  "Meri Sehat": {
    problem: "Healthcare access outside physical clinic visits.",
    solution: "Patient app and doctor panel for clinical workflows.",
    features: ["Patient portal", "Doctor panel", "Appointments"],
  },
  "The Groves": {
    problem: "Riyadh Season venue needed a public web presence.",
    solution: "Marketing site for a major entertainment destination.",
    features: ["Venue information", "Visitor content", "Next.js build"],
  },
  "Prosper Architect": {
    problem: "Architecture firm needed a public site and client management.",
    solution: "Marketing site and client portal for project tracking.",
    features: ["Portfolio pages", "Client portal", "Role-based access"],
  },
  "Ana Batla": {
    problem: "Company needed a web presence for products and services.",
    solution: "Corporate site with Node.js backend for content.",
    features: ["Product showcase", "Company pages", "Fastify API"],
  },
  "Eats Official": {
    problem: "Needed a structured food reference platform.",
    solution: "Food encyclopedia built on Next.js.",
    features: ["Searchable database", "Editorial content", "Public reference"],
  },
};

const tagThemes: Record<string, { accent: string; glow: string; gradient: string; emoji: string }> =
  {
    Fintech: {
      accent: "#FB7185",
      glow: "rgba(251, 113, 133, 0.4)",
      gradient: "linear-gradient(135deg, #FB7185, #8B5CF6)",
      emoji: "💳",
    },
    "E-commerce": {
      accent: "#8B5CF6",
      glow: "rgba(139, 92, 246, 0.4)",
      gradient: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
      emoji: "🛒",
    },
    Esports: {
      accent: "#22D3EE",
      glow: "rgba(34, 211, 238, 0.4)",
      gradient: "linear-gradient(135deg, #22D3EE, #BEF264)",
      emoji: "🏆",
    },
    Gaming: {
      accent: "#BEF264",
      glow: "rgba(190, 242, 100, 0.35)",
      gradient: "linear-gradient(135deg, #BEF264, #FB7185)",
      emoji: "🎮",
    },
    Healthcare: {
      accent: "#34D399",
      glow: "rgba(52, 211, 153, 0.35)",
      gradient: "linear-gradient(135deg, #34D399, #22D3EE)",
      emoji: "🏥",
    },
    Entertainment: {
      accent: "#F472B6",
      glow: "rgba(244, 114, 182, 0.35)",
      gradient: "linear-gradient(135deg, #F472B6, #8B5CF6)",
      emoji: "🎪",
    },
    "Client Portal": {
      accent: "#60A5FA",
      glow: "rgba(96, 165, 250, 0.35)",
      gradient: "linear-gradient(135deg, #60A5FA, #8B5CF6)",
      emoji: "📐",
    },
    Corporate: {
      accent: "#A78BFA",
      glow: "rgba(167, 139, 250, 0.35)",
      gradient: "linear-gradient(135deg, #A78BFA, #22D3EE)",
      emoji: "🏢",
    },
    Marketing: {
      accent: "#FB7185",
      glow: "rgba(251, 113, 133, 0.4)",
      gradient: "linear-gradient(135deg, #FB7185, #8B5CF6)",
      emoji: "📣",
    },
    Food: {
      accent: "#FBBF24",
      glow: "rgba(251, 191, 36, 0.35)",
      gradient: "linear-gradient(135deg, #FBBF24, #FB7185)",
      emoji: "🍽️",
    },
    "Open Source": {
      accent: "#22D3EE",
      glow: "rgba(34, 211, 238, 0.4)",
      gradient: "linear-gradient(135deg, #22D3EE, #8B5CF6)",
      emoji: "⌨️",
    },
  };

const defaultTheme = tagThemes.Fintech;

function getDeckClass(index: number) {
  return `project-deck-item project-deck-${index}`;
}

function screenshotOf(p: ProjectItem) {
  return p.screenshot ?? p.image;
}

function getInsight(project: ProjectItem): ProjectInsight {
  return (
    projectInsights[project.name] ?? {
      problem: "Client needed a production web product.",
      solution: project.description,
      features: project.tech.slice(0, 3),
    }
  );
}

function ChromaPanel({
  label,
  tone,
  compact,
  children,
}: {
  label: string;
  tone: ChromaTone;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("project-chroma-panel", `project-chroma-panel-${tone}`, compact && "project-chroma-panel-compact")}>
      <p className={cn("project-chroma-label", `project-chroma-label-${tone}`)}>{label}</p>
      <p className="project-chroma-body">{children}</p>
    </div>
  );
}

function ZoneHeading({ label, tone }: { label: string; tone: ChromaTone }) {
  return (
    <div className="project-zone-heading">
      <span className={cn("project-zone-dot", `project-chroma-label-${tone}`)} aria-hidden="true" />
      <span className={cn("project-zone-label", `project-chroma-label-${tone}`)}>{label}</span>
      <span className="project-zone-line" aria-hidden="true" />
    </div>
  );
}

function InsightMatrix({ insight, compact }: { insight: ProjectInsight; compact?: boolean }) {
  return (
    <div className={cn("project-chroma-matrix", compact && "project-chroma-matrix-compact")}>
      <ChromaPanel label="Problem" tone="coral" compact={compact}>
        {insight.problem}
      </ChromaPanel>
      <ChromaPanel label="Solution" tone="violet" compact={compact}>
        {insight.solution}
      </ChromaPanel>
      {insight.architecture ? (
        <ChromaPanel label="Architecture" tone="lime" compact={compact}>
          {insight.architecture}
        </ChromaPanel>
      ) : null}
      {insight.contribution ? (
        <ChromaPanel label="My role" tone="cyan" compact={compact}>
          {insight.contribution}
        </ChromaPanel>
      ) : null}
    </div>
  );
}

function CutoutCardShell({
  index,
  theme,
  children,
  className,
  expanded = false,
}: {
  index: number;
  theme: (typeof tagThemes)[string];
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
}) {
  const cutClass = cutVariants[index % cutVariants.length];
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn("project-card-shell h-full rounded-2xl", expanded && "is-expanded", className)}
      style={
        {
          "--project-accent": theme.gradient,
          "--project-glow": theme.glow,
          "--dossier-glow": theme.glow,
          "--card-tint": theme.accent,
        } as React.CSSProperties
      }
    >
      <div className="project-card-glow" aria-hidden="true" />
      <article className={cn("project-card-inner project-dossier-panel h-full", cutClass)}>
        <span className="project-cut-index" aria-hidden="true">
          {indexLabel}
        </span>
        <div className="h-1 w-full shrink-0" style={{ background: theme.gradient }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
          style={{ background: `radial-gradient(circle at 20% 0%, ${theme.accent}, transparent 45%)` }}
          aria-hidden="true"
        />
        {children}
      </article>
    </div>
  );
}

function ExpandToggle({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <button type="button" className="project-expand-toggle lg:hidden" onClick={onToggle} aria-expanded={expanded}>
        {expanded ? "Hide details" : "View details"}
      </button>
      <p className="project-expand-hint hidden lg:block">Hover for project details</p>
    </>
  );
}

function LiveShipTile({
  project,
  index,
  variant = "tile",
  defaultExpanded = false,
}: {
  project: ProjectItem;
  index: number;
  variant?: "hero" | "tile";
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const insight = getInsight(project);
  const theme = tagThemes[project.tag] ?? defaultTheme;
  const shot = screenshotOf(project);
  const isHero = variant === "hero";
  const compact = !isHero;

  return (
    <CutoutCardShell index={index} theme={theme} expanded={expanded || defaultExpanded}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border-b border-white/[0.07] bg-void/50",
          isHero ? "h-36 sm:h-40" : "h-28 sm:h-32",
        )}
      >
        {shot ? (
          <Image
            src={shot}
            alt={`${project.name} screenshot`}
            fill
            className="object-contain object-top p-3"
            sizes={isHero ? "(max-width:768px) 100vw, 560px" : "(max-width:768px) 100vw, 360px"}
            priority={index < 2}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center font-display text-xl font-bold text-ink/20"
            style={{ background: `linear-gradient(145deg, ${theme.accent}20, transparent)` }}
          >
            {project.name.slice(0, 2)}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/90 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase text-void shadow-lg"
            style={{ background: theme.gradient }}
          >
            Live {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="rounded-md border px-2 py-0.5 text-[0.55rem] font-medium backdrop-blur-md"
            style={{
              borderColor: `${theme.accent}55`,
              background: `${theme.accent}18`,
              color: theme.accent,
            }}
          >
            {theme.emoji} {project.tag}
          </span>
        </div>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="project-card-v2-link absolute right-3 top-3 z-10"
            aria-label={`Visit ${project.name}`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>

      <div className="relative z-[2] flex flex-1 flex-col">
        <div className="px-3.5 py-3 sm:px-4">
          <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-accent-cyan">
            {project.domain ?? "Production build"}
          </p>
          <h3 className={cn("font-display font-bold text-ink", isHero ? "text-xl sm:text-2xl" : "text-lg")}>
            {project.name}
          </h3>
        </div>

        <ExpandToggle expanded={expanded} onToggle={() => setExpanded((v) => !v)} />

        <div className="project-expandable-body">
          <div className="project-expandable-inner">
            <div className="border-t border-white/[0.06] px-3.5 py-3 sm:px-4">
              <InsightMatrix insight={insight} compact={compact} />
            </div>

            <div className="px-3.5 pb-3 sm:px-4">
              <ZoneHeading label="Features" tone="amber" />
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {insight.features.map((f) => (
                  <li
                    key={f}
                    className="project-feature-chip"
                    style={{ borderColor: `${theme.accent}44`, background: `${theme.accent}12`, color: theme.accent }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/[0.06] px-3.5 py-3 sm:px-4">
              <ZoneHeading label="Tech stack" tone="violet" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <TechPill key={t}>{t}</TechPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CutoutCardShell>
  );
}

function ExpressApiPreview() {
  const routes = [
    { method: "POST", path: "/login", tone: "text-accent-lime" },
    { method: "POST", path: "/user", tone: "text-accent-cyan" },
    { method: "GET", path: "/users", tone: "text-accent-violet" },
    { method: "PUT", path: "/user/:id", tone: "text-accent-coral" },
    { method: "POST", path: "/migrate", tone: "text-accent-lime" },
  ];

  return (
    <div className="project-code-preview flex h-full flex-col justify-center p-4 font-mono text-[0.62rem] leading-[1.65] sm:text-[0.68rem]">
      <p className="mb-2 text-[0.55rem] uppercase tracking-widest text-accent-cyan/80">API surface</p>
      {routes.map((route) => (
        <p key={route.path} className="truncate">
          <span className={cn("font-bold", route.tone)}>{route.method}</span>
          <span className="text-ink-muted"> {route.path}</span>
        </p>
      ))}
      <p className="mt-3 text-[0.58rem] text-ink-faint">JWT · Yup · MySQL migrate</p>
    </div>
  );
}

function RepoShot({
  project,
  theme,
  index,
}: {
  project: GithubProjectItem;
  theme: (typeof tagThemes)[string];
  index: number;
}) {
  if (project.screenshot) {
    return (
      <Image
        src={project.screenshot}
        alt={`${project.name} screenshot`}
        fill
        className="object-contain object-top p-3"
        sizes="(max-width:768px) 100vw, 360px"
      />
    );
  }

  return <ExpressApiPreview />;
}

function GithubShipTile({ project, index }: { project: GithubProjectItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const theme = tagThemes["Open Source"];
  const insight: ProjectInsight = {
    problem: project.problem,
    solution: project.solution,
    architecture: project.architecture,
    contribution: project.contribution,
    features: project.features,
  };

  return (
    <CutoutCardShell index={index} theme={theme} className="github-case-card" expanded={expanded}>
      <div className="relative h-28 shrink-0 overflow-hidden border-b border-white/[0.07] bg-void/50 sm:h-32">
        <div
          className="absolute inset-0"
          style={{
            background: project.screenshot
              ? `radial-gradient(120% 80% at 50% 0%, ${theme.accent}14, transparent 55%)`
              : "linear-gradient(145deg, rgba(34,211,238,0.12), rgba(139,92,246,0.08))",
          }}
        />
        <div className="relative h-full">
          <RepoShot project={project} theme={theme} index={index} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/90 via-surface-2/10 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-accent-cyan/20 px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase text-accent-cyan">
            <Github className="h-3 w-3" />
            Repo {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="rounded-md border px-2 py-0.5 text-[0.55rem] font-medium backdrop-blur-sm"
            style={{
              borderColor: `${theme.accent}55`,
              background: `${theme.accent}18`,
              color: theme.accent,
            }}
          >
            {theme.emoji} Open Source
          </span>
        </div>

        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="project-card-v2-link absolute right-3 top-3 z-10"
          aria-label={`View ${project.name} on GitHub`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col">
        <div className="px-3.5 py-3 sm:px-4">
          <p className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-accent-cyan">
            {project.period}
          </p>
          <h3 className="font-display text-lg font-bold text-ink">{project.name}</h3>
        </div>

        <ExpandToggle expanded={expanded} onToggle={() => setExpanded((v) => !v)} />

        <div className="project-expandable-body">
          <div className="project-expandable-inner">
            <div className="border-t border-white/[0.06] px-3.5 py-3 sm:px-4">
              <p className="mb-3 text-xs leading-relaxed text-ink-muted">{project.description}</p>
              <InsightMatrix insight={insight} compact />
            </div>

            <div className="px-3.5 pb-3 sm:px-4">
              <ZoneHeading label="Features" tone="amber" />
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="project-feature-chip"
                    style={{ borderColor: `${theme.accent}44`, background: `${theme.accent}12`, color: theme.accent }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/[0.06] px-3.5 py-3 sm:px-4">
              <ZoneHeading label="Tech stack" tone="violet" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <TechPill key={t}>{t}</TechPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CutoutCardShell>
  );
}

export function Projects() {
  return (
    <section id="projects" className="site-section relative">
      <div className="site-container min-w-0">
        <SectionHeading
          label="Projects"
          title="Production work"
          description="Live sites and apps. Expand a card for scope, role, and stack."
        />

        <div className="section-reveal projects-reveal mt-6">
          <div className="project-bento-meta mb-5 flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-widest text-ink-faint">
            <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-accent-cyan">
              {String(projects.length).padStart(2, "0")} live projects
            </span>
            <span className="rounded-full border border-accent-violet/30 bg-accent-violet/10 px-3 py-1 text-accent-violet">
              {String(githubProjects.length).padStart(2, "0")} GitHub repos
            </span>
          </div>

          <div className="project-deck">
            {projects.map((project, index) => (
              <div key={project.name} className={getDeckClass(index)}>
                <LiveShipTile
                  project={project}
                  index={index}
                  variant={index < 2 ? "hero" : "tile"}
                  defaultExpanded={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-14">
            <div className="mb-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-cyan">Open source</p>
              <h3 className="font-display text-lg font-bold text-ink sm:text-xl">GitHub projects</h3>
            </div>
            <div className="project-github-wall">
              {githubProjects.map((project, index) => (
                <div key={project.name} className="project-github-item">
                  <GithubShipTile project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
