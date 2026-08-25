"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const contactChannel = getChannelById("contact");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "your site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          channel={channelMarker(contactChannel)}
          eyebrow="Contact"
          title="Let's build something reliable together."
          description="Open to full-time roles, relocation opportunities, and select freelance work. Reach out directly or send a note below."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal className="space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  method.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="glass-panel glass-panel-hover flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-phosphor/10 text-phosphor-soft">
                  <method.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
                    {method.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-ink">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="glass-panel space-y-5 p-7 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-phosphor/50 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-phosphor/50 focus:outline-none"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-phosphor/50 focus:outline-none"
                  placeholder="Tell me a bit about the role or project..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-phosphor px-6 py-3.5 text-sm font-semibold text-void shadow-[0_0_40px_-5px_rgba(57,255,20,0.35)] transition-transform hover:scale-[1.01] sm:w-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </button>
              <p className="text-xs text-ink-faint">
                Opens your email client with this message pre-filled and
                addressed to {profile.email}.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
