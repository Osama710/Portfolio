"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["#hero", ...navLinks.map((l) => l.href)]
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-nav-enter fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav
          className={cn(
            "site-container flex h-14 min-w-0 max-w-full items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-6",
            scrolled || open
              ? "border-white/10 bg-surface/90 shadow-card backdrop-blur-md"
              : "border-transparent bg-transparent",
          )}
          aria-label="Main"
        >
          <a href="#hero" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-xs font-bold text-white shadow-glow">
              {profile.initials}
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="font-display text-sm font-semibold leading-none text-ink">
                {profile.name.split(" ")[0]}
              </span>
              <span className="text-[0.65rem] text-ink-faint">Portfolio</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  active === link.href
                    ? "bg-white/[0.08] text-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeFile}
              download
              className="btn-ghost hidden py-2 pl-3 pr-4 sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <a href="#projects" className="btn-primary hidden py-2.5 sm:inline-flex">
              Work
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-ink md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-card backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium",
                    active === link.href
                      ? "bg-gradient-brand-soft text-ink"
                      : "text-ink-muted",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resumeFile}
                download
                onClick={() => setOpen(false)}
                className="btn-ghost mt-2 justify-center"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
