import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Wide and tall enough to pin the journey slider while the page scrolls.
        pin: { raw: "(min-width: 1024px) and (min-height: 620px)" },
      },
      colors: {
        background: "#F0F5FF",

        // Home (Figma "Seeklon — Site vitrine")
        ink: {
          DEFAULT: "#0B0B0C",
          soft: "#4F4E49",
          faint: "#57554F",
        },
        azure: {
          DEFAULT: "#0C6DF8",
          deep: "#0A56C4",
          mist: "#B4D5FF",
        },

        primary: {
          DEFAULT: "#1A459C", // Deep Royal
          light: "#3B82F6",   // Electric Frost
          dark: "#112D69",
        },

        // Textes
        text: {
          main: "#0F172A",    // Midnight Navy
          muted: "#64748B",
        },

        // Surface: On adapte légèrement la bordure pour qu'elle ne jure pas avec le fond crème
        glass: {
          border: "rgba(255, 255, 255, 0.6)", // Bordure un peu plus visible
          surface: "rgba(255, 255, 255, 0.6)", // Surface laiteuse
        }
      },
      fontFamily: {
        heading: ["var(--font-cabinet)", "sans-serif"],
        sans: ["var(--font-jakarta)", ...fontFamily.sans],
        accent: ['"Swear Display"', 'serif'],
        grotesk: ["var(--font-host-grotesk)", ...fontFamily.sans],
        genoid: ["var(--font-genoid)", "var(--font-host-grotesk)", ...fontFamily.sans],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'spin-slow': 'spin 20s linear infinite', // Rotation très lente (20s)
        'spin-reverse-slow': 'spin-reverse 25s linear infinite', // Rotation inverse
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // ... tes keyframes existantes
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;