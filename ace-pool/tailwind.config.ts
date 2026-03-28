import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0c1f3f",
          light: "#122a52",
          dark: "#081529",
        },
        brand: {
          DEFAULT: "#0369a1",
          light: "#0284c7",
          dark: "#025d8c",
        },
        aqua: {
          DEFAULT: "#14b8a6",
          light: "#2dd4bf",
          dark: "#0d9488",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "ripple": "ripple 3.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "water-shimmer": "linear-gradient(110deg, transparent 25%, rgba(20, 184, 166, 0.15) 50%, transparent 75%)",
      },
      boxShadow: {
        "luxury": "0 4px 32px rgba(12, 31, 63, 0.12), 0 1px 4px rgba(12, 31, 63, 0.06)",
        "luxury-lg": "0 8px 64px rgba(12, 31, 63, 0.16), 0 2px 8px rgba(12, 31, 63, 0.08)",
        "aqua-glow": "0 0 24px rgba(20, 184, 166, 0.25)",
        "brand-glow": "0 0 24px rgba(3, 105, 161, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
