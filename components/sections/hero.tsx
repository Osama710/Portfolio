import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { HeroOrbit } from "@/components/sections/hero-orbit";
import {
  heroHighlights,
  heroServiceLinks,
  heroStack,
  heroTraits,
  profile,
} from "@/lib/data";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

const rotatorItems = JSON.stringify(profile.heroRotations);

export function Hero() {
  return (
    <section id="hero" className="hero-stage relative w-full overflow-x-clip">
      <div className="hero-banner site-container relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[5.25rem] sm:pb-10">
        <div className="grid items-center gap-8 overflow-visible lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="hero-copy min-w-0">
            <div className="hero-reveal hero-meta flex flex-wrap items-center gap-2" style={{ animationDelay: "0.05s" }}>
              <span className="hero-live-pill">
                <span className="hero-live-dot" aria-hidden="true" />
                Open to opportunities
              </span>
              {heroTraits.map((trait) => (
                <span key={trait} className="hero-trait-pill">
                  {trait}
                </span>
              ))}
            </div>

            <p
              className="hero-reveal mt-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent-cyan sm:text-xs"
              style={{ animationDelay: "0.1s" }}
            >
              {profile.title}
            </p>

            <h1
              className="hero-reveal mt-2 font-display text-[clamp(2.35rem,6.8vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.045em]"
              style={{ animationDelay: "0.14s" }}
            >
              <span className="hero-name-line block text-ink">{firstName}</span>
              <span className="hero-name-line gradient-text-shimmer block">{lastName}</span>
            </h1>

            <div className="hero-reveal hero-signal mt-4" style={{ animationDelay: "0.2s" }} aria-hidden="true" />

            <div
              className="hero-reveal hero-stack-row mt-4 flex flex-wrap gap-1.5"
              style={{ animationDelay: "0.24s" }}
            >
              {heroStack.map((tech) => (
                <span key={tech} className="hero-stack-pill">
                  {tech}
                </span>
              ))}
            </div>

            <p
              className="hero-reveal hero-rotator-live mt-5 flex min-h-[2.75rem] flex-wrap items-baseline gap-x-2 text-lg font-medium leading-snug sm:min-h-[3rem] sm:text-xl"
              data-items={rotatorItems}
              data-interval="2800"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-ink-muted">I build</span>
              <span className="hero-rotator-word gradient-text-shimmer is-visible sm:whitespace-nowrap">
                {profile.heroRotations[0]}
              </span>
            </p>

            <p
              className="hero-reveal hero-lead mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-[0.95rem] sm:leading-relaxed"
              style={{ animationDelay: "0.36s" }}
            >
              {profile.heroLead}
            </p>

            <div className="hero-reveal hero-bento mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5" style={{ animationDelay: "0.42s" }}>
              {heroHighlights.map((item, index) => (
                <div key={item.label} className={`hero-bento-card hero-bento-card--${index}`}>
                  <p className="font-mono text-[0.58rem] uppercase tracking-widest text-ink-faint">{item.label}</p>
                  <p className="mt-1 font-display text-xl font-bold leading-none text-ink sm:text-2xl">
                    {"counter" in item && item.counter ? (
                      <span
                        suppressHydrationWarning
                        className="hero-count"
                        data-value={item.counter.value}
                        data-suffix={item.counter.suffix}
                        data-duration="650"
                      />
                    ) : (
                      item.value
                    )}
                  </p>
                  <p className="mt-1.5 text-[0.68rem] leading-snug text-ink-muted">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="hero-reveal hero-services mt-4" style={{ animationDelay: "0.48s" }}>
              <p className="mb-2 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-widest text-accent-violet">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                What I deliver
              </p>
              <div className="flex flex-wrap gap-1.5">
                {heroServiceLinks.map((link) => (
                  <a key={link.label} href={link.href} className="hero-service-link group">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-reveal hero-actions mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6" style={{ animationDelay: "0.54s" }}>
              <a href="#projects" className="btn-primary px-5 py-2.5 text-sm">
                <Rocket className="h-4 w-4" aria-hidden="true" />
                View projects
              </a>
              <a href={profile.resumeFile} download className="btn-ghost px-5 py-2.5 text-sm">
                <Download className="h-4 w-4" aria-hidden="true" />
                Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost gap-2 px-4 py-2.5 text-sm"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost gap-2 px-4 py-2.5 text-sm"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>

            <div className="hero-reveal hero-location mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted sm:text-sm" style={{ animationDelay: "0.58s" }}>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden text-ink-faint sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-accent-cyan">{profile.relocation}</span>
            </div>

            <div className="hero-reveal hero-orbit-wrap hero-orbit-wrap-mobile hero-beacon mx-auto my-5 w-full max-w-[280px] origin-center overflow-hidden sm:max-w-[300px] lg:hidden" style={{ animationDelay: "0.62s" }}>
              <HeroOrbit />
            </div>
          </div>

          <div className="hero-reveal hero-orbit-wrap hero-orbit-wrap-desktop hero-beacon relative mx-auto hidden w-full max-w-[420px] origin-center overflow-visible py-4 lg:block" style={{ animationDelay: "0.18s" }}>
            <HeroOrbit />
          </div>
        </div>

        <a
          href="#about"
          className="hero-reveal hero-scroll-cue absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5 text-ink-faint transition-colors hover:text-accent-cyan sm:bottom-4"
          style={{ animationDelay: "0.68s" }}
          aria-label="Scroll to about"
        >
          <span className="text-[0.6rem] uppercase tracking-widest">Scroll down</span>
          <ArrowDown className="hero-scroll-cue-icon h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
