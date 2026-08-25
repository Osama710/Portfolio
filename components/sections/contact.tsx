"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "your site"}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="viewport-section">
      <SectionHeading
        eyebrow="// Contact"
        title="Let's build something reliable together."
        description="Open to full-time roles, relocation opportunities, and select freelance work. Reach out directly or send a note below."
        align="center"
        className="mb-12"
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <ScrollReveal className="space-y-3">
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
              className="editor-panel-card editor-panel-card-hover flex items-center gap-4 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-editor-blue/10 text-editor-blue">
                <method.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
                  {method.label}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-ink">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="editor-panel-card space-y-4 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="editor-input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="editor-input"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="editor-input resize-none"
                placeholder="Tell me a bit about the role or project..."
              />
            </div>

            <button type="submit" className="editor-btn-primary w-full sm:w-auto">
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
    </section>
  );
}
