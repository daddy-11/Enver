import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Syne", "system-ui", "sans-serif"],
        mono: ["DM Mono", "Menlo", "monospace"],
      },
      colors: {
        navy:   "#1B2B4B",
        orange: "#E8660A",
        green:  "#3A9A3C",
      },
    },
  },
  plugins: [],
};

export default config;
