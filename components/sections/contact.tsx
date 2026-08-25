"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const methods = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: Linkedin, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
  { icon: Github, label: "GitHub", value: profile.githubLabel, href: profile.github },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="site-section">
      <SectionHeading
        label="Contact"
        title="Let's build something"
        description="Open to full-time roles, relocation, and select freelance work."
        align="center"
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          {methods.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.06}>
              <a
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="glass-card glass-card-hover flex items-center gap-4 rounded-2xl p-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent-violet">
                  <m.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {m.label}
                  </p>
                  <p className="truncate text-sm font-medium text-ink">{m.value}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="gradient-border rounded-3xl p-[1px]"
          >
            <div className="glass-card space-y-5 rounded-[23px] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-void/50 px-4 py-3 text-sm text-ink focus:border-accent-violet/50 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-void/50 px-4 py-3 text-sm text-ink focus:border-accent-violet/50 focus:outline-none"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-void/50 px-4 py-3 text-sm text-ink focus:border-accent-violet/50 focus:outline-none"
                  placeholder="Tell me about the role or project..."
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" />
                Send message
              </button>
              <p className="text-xs text-ink-faint">
                Opens your email client addressed to {profile.email}.
              </p>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
