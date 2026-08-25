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
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        void: "#050508",
        surface: "#0B0B12",
        "surface-2": "#12121C",
        ink: {
          DEFAULT: "#F4F4F8",
          muted: "#9898A8",
          faint: "#5C5C6E",
        },
        accent: {
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          coral: "#FB7185",
          lime: "#BEF264",
          blue: "#3B82F6",
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
        "gradient-brand":
          "linear-gradient(135deg, #8B5CF6 0%, #22D3EE 50%, #FB7185 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.1) 50%, rgba(251,113,133,0.12) 100%)",
        "gradient-text":
          "linear-gradient(135deg, #F4F4F8 0%, #C4B5FD 40%, #22D3EE 70%, #FB7185 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(139, 92, 246, 0.45)",
        "glow-cyan": "0 0 50px -10px rgba(34, 211, 238, 0.4)",
        "glow-coral": "0 0 50px -10px rgba(251, 113, 133, 0.35)",
        card: "0 24px 48px -12px rgba(0, 0, 0, 0.55)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "gradient-flow": "gradient-flow 6s ease infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
