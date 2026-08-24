import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";

const gradients = [
  "from-violet/25 via-violet/5 to-transparent",
  "from-cyan/25 via-cyan/5 to-transparent",
  "from-magenta/20 via-magenta/5 to-transparent",
  "from-mint/20 via-mint/5 to-transparent",
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Projects() {
  const projectsChannel = getChannelById("projects");

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          channel={channelMarker(projectsChannel)}
          eyebrow="Projects"
          title="Products shipped in production, not just prototypes."
          description="A selection of the platforms Osama has built and maintained — spanning fintech, gaming, healthcare, and more."
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.name} delay={(index % 3) * 0.08}>
              <article className="glass-panel glass-panel-hover group flex h-full flex-col overflow-hidden">
                <div
                  className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}
                >
                  <span className="font-display text-3xl font-bold tracking-tight text-white/90">
                    {initialsOf(project.name)}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-void/40 px-2.5 py-1 font-mono text-[0.65rem] text-ink-muted backdrop-blur">
                    {project.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {project.name}
                    </h3>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Visit ${project.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all group-hover:border-violet/40 group-hover:text-violet-soft"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                  </div>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet-soft transition-colors hover:text-cyan"
                    >
                      {project.domain}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
