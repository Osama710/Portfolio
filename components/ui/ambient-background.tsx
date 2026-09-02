"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  Code2,
  CreditCard,
  Database,
  Gamepad2,
  GitBranch,
  Layers,
  Server,
  Shield,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap, motionAllowed, registerGsapPlugins } from "@/lib/gsap/register";

type OrbitIcon = { Icon: LucideIcon; start: number; duration: number };

type Cluster = {
  id: string;
  x: string;
  y: string;
  tone: "violet" | "cyan" | "coral";
  hub: LucideIcon;
  ring: number;
  icons: OrbitIcon[];
  mobile?: boolean;
};

const clusters: Cluster[] = [
  {
    id: "stack",
    x: "90%",
    y: "22%",
    tone: "violet",
    hub: Code2,
    ring: 118,
    icons: [
      { Icon: Layers, start: 0, duration: 16 },
      { Icon: GitBranch, start: 120, duration: 18 },
      { Icon: Terminal, start: 240, duration: 20 },
    ],
  },
  {
    id: "backend",
    x: "7%",
    y: "24%",
    tone: "cyan",
    hub: Server,
    ring: 108,
    mobile: true,
    icons: [{ Icon: Database, start: 40, duration: 17 }],
  },
  {
    id: "fintech",
    x: "88%",
    y: "68%",
    tone: "coral",
    hub: CreditCard,
    ring: 112,
    icons: [
      { Icon: Shield, start: 80, duration: 18 },
      { Icon: Database, start: 260, duration: 21 },
    ],
  },
  {
    id: "product",
    x: "10%",
    y: "78%",
    tone: "violet",
    hub: Gamepad2,
    ring: 104,
    icons: [{ Icon: Layers, start: 160, duration: 22 }],
  },
];

export function AmbientBackground() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motionAllowed() || !wrapRef.current) return;
      registerGsapPlugins();

      const scrollCfg = { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true };

      gsap.to(".ambient-blob-violet", {
        y: -100,
        x: 20,
        ease: "none",
        scrollTrigger: { ...scrollCfg, scrub: 0.85 },
      });

      gsap.to(".ambient-blob-cyan", {
        y: -130,
        x: -24,
        ease: "none",
        scrollTrigger: { ...scrollCfg, scrub: 1.05 },
      });

      gsap.to(".ambient-blob-coral", {
        y: -90,
        x: 18,
        ease: "none",
        scrollTrigger: { ...scrollCfg, scrub: 0.9 },
      });

      gsap.to(".ambient-grid, .ambient-field", {
        y: 50,
        ease: "none",
        scrollTrigger: { ...scrollCfg, scrub: 0.45 },
      });

      gsap.to(".ambient-cluster-body", {
        y: (index) => (index % 2 === 0 ? -45 : -70),
        ease: "none",
        stagger: 0.06,
        scrollTrigger: { ...scrollCfg, scrub: 0.65 },
      });

      gsap.to(".ambient-aurora-b", {
        x: "5%",
        y: "-3%",
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".ambient-mesh", {
        rotation: 360,
        duration: 120,
        ease: "none",
        repeat: -1,
      });

      const pointerFine = window.matchMedia("(pointer: fine)").matches;
      if (pointerFine && wrapRef.current) {
        const parallaxX = gsap.quickTo(wrapRef.current, "x", { duration: 1.4, ease: "power3.out" });
        const parallaxY = gsap.quickTo(wrapRef.current, "y", { duration: 1.4, ease: "power3.out" });

        const onMove = (event: MouseEvent) => {
          parallaxX((event.clientX / window.innerWidth - 0.5) * 14);
          parallaxY((event.clientY / window.innerHeight - 0.5) * 10);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="ambient-mesh absolute inset-[-20%] opacity-50" />
      <div className="ambient-stars absolute inset-0" />
      <div className="ambient-grid dot-grid absolute inset-0 opacity-[0.18]" />

      <div className="ambient-field absolute inset-0">
        <div className="ambient-field-grid" aria-hidden="true" />
        {!reduced && (
          <svg
            className="ambient-field-arcs absolute inset-0 h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="fieldArcViolet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#22D3EE" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fieldArcCoral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" stopOpacity="0" />
                <stop offset="50%" stopColor="#FB7185" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="fieldRingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse
              className="ambient-field-ring"
              cx="720"
              cy="118"
              rx="420"
              ry="95"
              fill="none"
              stroke="url(#fieldRingGlow)"
              strokeWidth="1"
            />
            <path
              className="ambient-field-arc ambient-field-arc--a"
              d="M -40 240 Q 720 420 1480 220"
              fill="none"
              stroke="url(#fieldArcViolet)"
              strokeWidth="1.25"
            />
            <path
              className="ambient-field-arc ambient-field-arc--b"
              d="M 80 520 Q 720 680 1360 480"
              fill="none"
              stroke="url(#fieldArcCoral)"
              strokeWidth="1"
            />
            <path
              className="ambient-field-arc ambient-field-arc--c"
              d="M 200 80 Q 720 260 1240 100"
              fill="none"
              stroke="url(#fieldArcViolet)"
              strokeWidth="0.85"
            />
          </svg>
        )}
      </div>

      <div className="aurora-layer absolute inset-0 opacity-85" />
      <div className="ambient-aurora-b absolute inset-0 opacity-40" />

      <div className="ambient-blob ambient-blob-violet" />
      <div className="ambient-blob ambient-blob-cyan" />
      <div className="ambient-blob ambient-blob-coral" />

      {!reduced && (
        <div className="ambient-clusters absolute inset-0">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className={`ambient-cluster ambient-cluster--${cluster.tone} ambient-cluster-id-${cluster.id}${cluster.mobile ? " ambient-cluster--mobile" : ""}`}
              style={{
                left: cluster.x,
                top: cluster.y,
                ["--cluster-ring" as string]: `${cluster.ring}px`,
              }}
            >
              <div className="ambient-cluster-body">
                <span className="ambient-cluster-ring" />
                <span className="ambient-cluster-ring ambient-cluster-ring--inner" />
                <span className="ambient-hub">
                  <cluster.hub strokeWidth={1.6} />
                </span>
                {cluster.icons.map(({ Icon, start, duration }, index) => (
                  <span
                    key={`${cluster.id}-orbit-${index}`}
                    className={`ambient-orbit-icon ambient-orbit-icon--${cluster.tone}`}
                    style={{
                      ["--orbit-start" as string]: `${start}deg`,
                      ["--orbit-radius" as string]: `${cluster.ring * 0.46}px`,
                      animationDuration: `${duration}s`,
                    }}
                  >
                    <Icon strokeWidth={1.5} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!reduced && <div className="ambient-noise" />}

      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}
