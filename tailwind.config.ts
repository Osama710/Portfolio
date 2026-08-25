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
        "editor-blue": {
          DEFAULT: "#4B8BF5",
          soft: "#5B8DEF",
          dim: "#3B6FD4",
        },
        "editor-orange": {
          DEFAULT: "#FF9347",
          soft: "#FFA94D",
          dim: "#E67A2E",
        },
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
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
