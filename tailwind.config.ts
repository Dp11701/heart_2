import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true, // Force all utilities to be !important
  theme: {
    extend: {
      colors: {
        // Brand primary color - Indigo/Purple for tech feeling
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Main brand color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Accent color - Purple for highlights
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef", // Vibrant purple
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
        // Neutral grays - Better contrast
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Semantic colors for light/dark themes
        background: {
          light: "#ffffff",
          dark: "#0a0a0a", // True black for better contrast
        },
        foreground: {
          light: "#171717",
          dark: "#fafafa",
        },
        card: {
          light: "#ffffff",
          dark: "#1a1a1a", // Dark gray, not too dark
        },
        border: {
          light: "#e5e5e5",
          dark: "#404040",
        },
        muted: {
          light: "#737373",
          dark: "#a3a3a3",
        },
        // Surface colors for layered components
        surface: {
          light: "#f9fafb",
          dark: "#111111",
        },
      },
      fontFamily: {
        sans: ["'Myriad Pro'", "var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        myriad: ["'Myriad Pro'", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%)",
        "gradient-brand": "linear-gradient(135deg, #0369a1 0%, #a21caf 100%)",
        "gradient-page-light":
          "radial-gradient(ellipse at top, #f0f9ff, #ffffff)",
        "gradient-page-dark":
          "radial-gradient(ellipse at top, #0c4a6e, #0a0a0a)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  // Dark mode support
  darkMode: "class",
} as Config;

export default config;
