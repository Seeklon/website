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
      colors: {
        background: "#F5F7FA  ",

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
        sans: ["var(--font-inter)", ...fontFamily.sans],
        heading: ["var(--font-jakarta)", ...fontFamily.sans],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'spin-slow': 'spin 20s linear infinite', // Rotation très lente (20s)
        'spin-reverse-slow': 'spin-reverse 25s linear infinite', // Rotation inverse
      },
      keyframes: {
        // ... tes keyframes existantes
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;