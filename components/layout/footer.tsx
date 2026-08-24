import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks, profile, socialLinks } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();
  const contactChannel = getChannelById("contact");

  return (
    <footer className="border-t border-phosphor/10">
      <div className="container flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <a
            href="#hero"
            className="inline-flex flex-col"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-phosphor/60">
              OSAMA.SYS
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {profile.title} based in {profile.location} — {profile.relocation}
            .
          </p>
          <p className="channel-tag mt-4">
            <span className="h-px w-4 bg-phosphor/40" aria-hidden="true" />
            Off air — end of broadcast
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Connect</p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {Icon ? (
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : null}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-2 border-t border-white/5 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono uppercase tracking-[0.14em]">
          {channelMarker(contactChannel)} · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
