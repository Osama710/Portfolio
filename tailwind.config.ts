import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        void: "#08080C",
        surface: "#0E0E16",
        "surface-2": "#15151F",
        border: "rgba(255,255,255,0.09)",
        violet: {
          DEFAULT: "#7C5CFF",
          soft: "#A594FF",
          dim: "#5A42C4",
        },
        cyan: {
          DEFAULT: "#22D3EE",
        },
        magenta: {
          DEFAULT: "#FF4FD8",
        },
        mint: {
          DEFAULT: "#34D399",
        },
        ink: {
          DEFAULT: "#F5F5F7",
          muted: "#9AA0AC",
          faint: "#5B6270",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "glow-violet":
          "radial-gradient(circle, rgba(124,92,255,0.4), transparent 70%)",
        "glow-cyan":
          "radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)",
        "glow-magenta":
          "radial-gradient(circle, rgba(255,79,216,0.3), transparent 70%)",
      },
      boxShadow: {
        glass: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        "glow-violet": "0 0 50px -5px rgba(124,92,255,0.35)",
        "glow-cyan": "0 0 50px -5px rgba(34,211,238,0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 34s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        draw: "draw 1.8s ease forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(52,211,153,0.6)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 0 6px rgba(52,211,153,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
