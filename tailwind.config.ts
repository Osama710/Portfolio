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
        surface: "#0A0A12",
        "surface-2": "#11111C",
        ink: {
          DEFAULT: "#F8F8FC",
          muted: "#9B9BB0",
          faint: "#5E5E72",
        },
        accent: {
          violet: "#A78BFA",
          cyan: "#22D3EE",
          coral: "#FB7185",
          lime: "#BEF264",
          blue: "#818CF8",
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
          "linear-gradient(135deg, #8B5CF6 0%, #6366F1 35%, #22D3EE 70%, #FB7185 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(34,211,238,0.12) 50%, rgba(251,113,133,0.14) 100%)",
        "gradient-text":
          "linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 35%, #22D3EE 65%, #FB7185 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(139, 92, 246, 0.55)",
        "glow-cyan": "0 0 50px -10px rgba(34, 211, 238, 0.45)",
        "glow-coral": "0 0 50px -10px rgba(251, 113, 133, 0.4)",
        card: "0 24px 48px -12px rgba(0, 0, 0, 0.55)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "gradient-flow": "gradient-flow 5s ease infinite",
        marquee: "marquee 40s linear infinite",
        "border-spin": "spin-slow 8s linear infinite",
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
