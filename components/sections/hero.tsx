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
import { HeroAnimatedCounter } from "@/components/sections/hero-animated-counter";
import { HeroOrbit } from "@/components/sections/hero-orbit";
import { HeroTypewriterRotator } from "@/components/sections/hero-typewriter-rotator";
import {
  heroHighlights,
  heroServiceLinks,
  heroTraits,
  profile,
} from "@/lib/data";

export function Hero() {
  return (
    <section id="hero" className="hero-stage relative w-full overflow-x-clip">
      <div className="hero-banner site-container relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-[5.25rem] lg:pb-16 lg:pt-[5.5rem]">
        <div className="hero-grid grid items-center gap-8 overflow-visible lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-12">
          <div className="hero-copy flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-5 xl:gap-6">
            <div className="hero-reveal hero-meta flex flex-wrap items-center gap-2.5" style={{ animationDelay: "0.05s" }}>
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
              className="hero-reveal font-mono text-xs uppercase tracking-[0.22em] text-accent-cyan sm:text-sm lg:text-base"
              style={{ animationDelay: "0.1s" }}
            >
              {profile.title}
            </p>

            <h1
              className="hero-reveal font-display text-[clamp(2.5rem,7vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] lg:text-[clamp(3rem,4.8vw,5rem)]"
              style={{ animationDelay: "0.14s" }}
            >
              <span className="hero-name-line whitespace-nowrap text-ink">{profile.name.split(" ")[0]} </span>
              <span className="hero-name-line gradient-text-shimmer whitespace-nowrap">
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <div className="hero-reveal hero-signal mt-1" style={{ animationDelay: "0.18s" }} aria-hidden="true" />

            <div className="hero-reveal mt-1" style={{ animationDelay: "0.22s" }}>
              <HeroTypewriterRotator items={profile.heroRotations} />
            </div>

            <p
              className="hero-reveal hero-lead mt-1 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base lg:max-w-2xl lg:leading-relaxed"
              style={{ animationDelay: "0.28s" }}
            >
              {profile.heroLead}
            </p>

            <div
              className="hero-reveal hero-bento mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3"
              style={{ animationDelay: "0.34s" }}
            >
              {heroHighlights.map((item, index) => (
                <div key={item.label} className={`hero-bento-card hero-bento-card--${index}`}>
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-ink-faint sm:text-[0.62rem]">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-bold leading-none text-ink sm:text-3xl">
                    {"counter" in item && item.counter ? (
                      <HeroAnimatedCounter
                        value={item.counter.value}
                        suffix={item.counter.suffix}
                        duration={1800}
                      />
                    ) : (
                      item.value
                    )}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-snug text-ink-muted sm:text-xs">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="hero-reveal hero-services mt-1" style={{ animationDelay: "0.4s" }}>
              <p className="mb-2.5 flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-accent-violet sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                What I deliver
              </p>
              <div className="flex flex-wrap gap-2">
                {heroServiceLinks.map((link) => (
                  <a key={link.label} href={link.href} className="hero-service-link group">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div
              className="hero-reveal hero-actions mt-1 flex flex-wrap items-center gap-2.5 sm:gap-3"
              style={{ animationDelay: "0.46s" }}
            >
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

            <div
              className="hero-reveal hero-location mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden text-ink-faint sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-accent-cyan">{profile.relocation}</span>
            </div>

            <div className="hero-reveal mt-2 lg:hidden" style={{ animationDelay: "0.54s" }}>
              <div className="hero-orbit-wrap hero-orbit-wrap-mobile hero-beacon mx-auto w-full max-w-[280px] origin-center overflow-visible sm:max-w-[300px]">
                <div className="hero-orbit-zoom">
                  <HeroOrbit className="max-w-[280px] sm:max-w-[300px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-reveal hidden lg:block" style={{ animationDelay: "0.16s" }}>
            <div className="hero-orbit-wrap hero-orbit-wrap-desktop hero-beacon relative mx-auto w-full max-w-[min(400px,36vw)] origin-center overflow-visible">
              <div className="hero-orbit-zoom">
                <HeroOrbit className="max-w-[min(400px,36vw)]" />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="hero-reveal hero-scroll-cue absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ink-faint transition-colors hover:text-accent-cyan lg:bottom-5"
          style={{ animationDelay: "0.58s" }}
          aria-label="Scroll to about"
        >
          <span className="text-[0.62rem] uppercase tracking-widest">Scroll down</span>
          <ArrowDown className="hero-scroll-cue-icon h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
