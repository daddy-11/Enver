import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "Menlo", "Consolas", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        // Core palette: Industrial Ember
        void: "#080808",
        carbon: "#0f0f0f",
        graphite: "#1a1a1a",
        ash: "#2d2d2d",
        zinc: "#3d3d3d",
        smoke: "#6b6b6b",
        mist: "#9b9b9b",
        chalk: "#d4d4d4",
        white: "#f5f5f0",

        // Signal colors
        ember: {
          50: "#fff8f0",
          100: "#ffe8c8",
          200: "#ffc87a",
          300: "#ff9f35",
          400: "#f07d00",
          500: "#c95f00",
          600: "#a04500",
          700: "#7a3000",
          800: "#581f00",
          900: "#3a1000",
        },
        acid: "#d4ff4a",
        cyan: "#00e5cc",
        fault: "#ff3b3b",
        signal: "#ff6b00",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "120": "30rem",
        "140": "35rem",
        "160": "40rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem", letterSpacing: "0.1em" }],
        "10xl": ["10rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "11xl": ["12rem", { lineHeight: "1", letterSpacing: "-0.05em" }],
      },
      animation: {
        "scan-line": "scan-line 8s linear infinite",
        "data-pulse": "data-pulse 2s ease-in-out infinite",
        "grid-drift": "grid-drift 20s ease-in-out infinite",
        "ember-glow": "ember-glow 3s ease-in-out infinite",
        "type-blink": "type-blink 1s step-end infinite",
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-left": "reveal-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "counter-tick": "counter-tick 0.1s ease-out forwards",
        "noise": "noise 0.15s steps(2) infinite",
        "horizontal-scroll": "horizontal-scroll 30s linear infinite",
      },
      keyframes: {
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "data-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "grid-drift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(-2%, 1%)" },
          "50%": { transform: "translate(1%, -2%)" },
          "75%": { transform: "translate(-1%, 1%)" },
        },
        "ember-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(240, 125, 0, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(240, 125, 0, 0.4)" },
        },
        "type-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-left": {
          "0%": { opacity: "0", transform: "translateX(-2rem)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "counter-tick": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "noise": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "horizontal-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-ember":
          "linear-gradient(rgba(240,125,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,125,0,0.05) 1px, transparent 1px)",
        "noise-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "ember-sm": "0 0 8px rgba(240,125,0,0.2)",
        "ember-md": "0 0 20px rgba(240,125,0,0.3)",
        "ember-lg": "0 0 40px rgba(240,125,0,0.4)",
        "acid-sm": "0 0 8px rgba(212,255,74,0.2)",
        "inset-top": "inset 0 1px 0 rgba(255,255,255,0.05)",
        "inset-bottom": "inset 0 -1px 0 rgba(255,255,255,0.03)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
