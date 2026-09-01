import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const journey = [
  { year: "2020", label: "Freelance", emoji: "💼", detail: "Fiverr and Upwork during university", hue: "violet" },
  { year: "2022", label: "WeUno Technologies", emoji: "🏢", detail: "Agency work on client products", hue: "cyan" },
  { year: "2024", label: "Raptr Games", emoji: "🎮", detail: "Fintech and e-commerce products", hue: "coral" },
  { year: "2025", label: "Senior Engineer", emoji: "🚀", detail: "Wallet, Store, and admin systems", hue: "lime" },
];

const aboutStats = [
  { n: "5+", label: "Years experience", c: "text-accent-violet" },
  { n: "9", label: "Shipped projects", c: "text-accent-cyan" },
  { n: "3", label: "Live platforms", c: "text-accent-coral" },
  { n: "PK", label: "Open to relocate", c: "text-accent-lime" },
];

const hueMap = {
  violet: "from-accent-violet/25 to-transparent border-accent-violet/30 hover:border-accent-violet/50",
  cyan: "from-accent-cyan/25 to-transparent border-accent-cyan/30 hover:border-accent-cyan/50",
  coral: "from-accent-coral/25 to-transparent border-accent-coral/30 hover:border-accent-coral/50",
  lime: "from-accent-lime/20 to-transparent border-accent-lime/30 hover:border-accent-lime/50",
};

export function About() {
  return (
    <section id="about" className="site-section relative z-10">
      <div className="site-container">
        <SectionHeading
          label="About"
          title="Background"
          description="Full stack engineer focused on fintech and e-commerce in production."
        />

        <div className="section-reveal about-reveal mt-8">
          <div className="relative grid items-start gap-6 lg:grid-cols-12">
            <div className="panel-vivid lg:col-span-5">
              <p className="font-display text-5xl font-bold leading-none text-ink/10 sm:text-6xl">{profile.initials}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-coral">Summary</p>
              <p className="mt-4 text-lg font-medium leading-relaxed text-ink sm:text-xl">
                I build <span className="text-accent-cyan">production web systems</span> for fintech and e-commerce — user apps, admin panels, and backend APIs.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Promoted to Senior Software Engineer at Raptr Games. Stack: Next.js, React, Node.js, FastAPI, MongoDB, and MySQL.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Full stack", "Fintech", "E-commerce", "API design"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-muted transition-all hover:border-accent-violet/30 hover:text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-hud lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">Overview</p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{profile.summary}</p>
              <p className="mt-4 border-l-2 border-accent-violet/40 pl-4 text-sm leading-relaxed text-ink-faint">
                I started freelancing on Fiverr and Upwork in 2020 while at university. After graduating, I joined
                WeUno Technologies, then Raptr Games, where I was promoted to{" "}
                <span className="font-medium text-accent-coral">Senior Software Engineer</span>. I still take freelance
                work alongside my full-time role.
              </p>
            </div>

            <div className="panel-hud lg:col-span-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-violet">At a glance</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {aboutStats.map((s) => (
                  <div key={s.label} className="stat-chip text-center sm:text-left">
                    <p className={`font-display text-2xl font-bold ${s.c}`}>{s.n}</p>
                    <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-ink-faint">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent-cyan">Timeline</p>
            <div className="panel-hud">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
                {journey.map((step, i) => (
                  <div key={step.year} className="relative flex flex-col items-center text-center">
                    <span
                      className={`hover-lift flex h-14 w-14 cursor-default items-center justify-center rounded-2xl border bg-gradient-to-br text-2xl ${hueMap[step.hue as keyof typeof hueMap]}`}
                    >
                      {step.emoji}
                    </span>
                    {i < journey.length - 1 ? (
                      <span
                        className="absolute -right-2 top-7 hidden h-px w-4 bg-gradient-to-r from-accent-violet/50 to-accent-cyan/30 sm:block"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="mt-3 font-mono text-xs font-bold text-accent-violet">{step.year}</span>
                    <span className="mt-1 font-display text-sm font-semibold text-ink">{step.label}</span>
                    <span className="mt-1 text-[0.65rem] leading-snug text-ink-faint">{step.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
