"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Code2, Database, GitBranch, Server, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap, motionAllowed, registerGsapPlugins } from "@/lib/gsap/register";

type Floater = {
  Icon: LucideIcon;
  x: string;
  y: string;
  size: number;
  delay: number;
  drift: number;
};

const techFloaters: Floater[] = [
  { Icon: Code2, x: "6%", y: "14%", size: 20, delay: 0, drift: 12 },
  { Icon: Database, x: "88%", y: "12%", size: 19, delay: 1.4, drift: -10 },
  { Icon: Server, x: "92%", y: "62%", size: 20, delay: 2.1, drift: 11 },
  { Icon: GitBranch, x: "10%", y: "68%", size: 18, delay: 0.8, drift: -9 },
];

const emojiFloaters = [
  { emoji: "⚡", x: "78%", y: "38%", delay: 0.6 },
  { emoji: "🚀", x: "18%", y: "42%", delay: 2.2 },
];

export function AmbientBackground() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionAllowed() || !wrapRef.current) return;
      registerGsapPlugins();

      gsap.to(".ambient-blob-violet", {
        y: -80,
        x: 16,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });

      gsap.to(".ambient-blob-cyan", {
        y: -120,
        x: -24,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.1 },
      });

      gsap.to(".ambient-grid", {
        y: 60,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });

      gsap.from(".ambient-tech-icon", {
        scale: 0.7,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "back.out(1.5)",
        delay: 0.5,
      });
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="ambient-mesh absolute inset-[-20%] opacity-55" />
      <div className="ambient-grid dot-grid absolute inset-0 opacity-40" />
      <div className="aurora-layer absolute inset-0 opacity-100" />
      <div className="ambient-blob ambient-blob-violet" />
      <div className="ambient-blob ambient-blob-cyan" />

      {!reduced &&
        techFloaters.map(({ Icon, x, y, size, delay, drift }, index) => (
          <span
            key={`tech-floater-${index}`}
            className="ambient-tech-icon ambient-floater absolute"
            style={
              {
                left: x,
                top: y,
                animationDelay: `${delay}s`,
                "--drift": `${drift}px`,
              } as React.CSSProperties
            }
          >
            <Icon style={{ width: size, height: size }} strokeWidth={1.5} />
          </span>
        ))}

      {!reduced &&
        emojiFloaters.map((item) => (
          <span
            key={item.emoji + item.x}
            className="ambient-emoji ambient-floater float-emoji absolute select-none text-base sm:text-lg"
            style={{ left: item.x, top: item.y, animationDelay: `${item.delay}s` }}
          >
            {item.emoji}
          </span>
        ))}

      {!reduced && <div className="ambient-noise" />}

      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}
