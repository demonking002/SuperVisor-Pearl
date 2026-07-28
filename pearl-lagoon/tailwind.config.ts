import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lagoon: {
          deep: "#0B4A4A",
          DEFAULT: "#0F6B6B",
          light: "#17948F",
        },
        seafoam: {
          DEFAULT: "#6FD6C4",
          light: "#B7EEE1",
          dark: "#3FAF9C",
        },
        sand: {
          DEFAULT: "#F6E7C1",
          light: "#FDF8EC",
          dark: "#E8CE94",
        },
        coral: {
          DEFAULT: "#FF6B7A",
          dark: "#E14F60",
          light: "#FF98A2",
        },
        ink: {
          DEFAULT: "#0B2E33",
          light: "#184048",
        },
        night: {
          DEFAULT: "#061417",
          deep: "#03090B",
        },
        rhgreen: {
          DEFAULT: "#00C805",
          dark: "#00A804",
          light: "#4ADE60",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F2D879",
          dark: "#A6862A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        blink: {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        "tail-wag": {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(14deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        bob: "bob 3s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        blink: "blink 5s ease-in-out infinite",
        "tail-wag": "tail-wag 1.6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 46, 51, 0.2)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
