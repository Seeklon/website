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
        // Fond "Cloud Dancer" (Pantone 2026)
        background: "#F0F2F5",

        // Bleu Royal (Confiance/Stabilité)
        primary: {
          DEFAULT: "#1A459C",
          light: "#3B82F6",   // Electric Frost (pour les accents)
          dark: "#112D69",
        },

        // Textes
        text: {
          main: "#0F172A",    // Midnight Navy
          muted: "#64748B",   // Gris bleuté pour les paragraphes
        },

        // Surface (pour l'effet verre)
        glass: {
          border: "rgba(255, 255, 255, 0.4)",
          surface: "rgba(255, 255, 255, 0.7)",
        }
      },
      fontFamily: {
        // Assure-toi de bien charger ces fonts dans ton layout.tsx
        sans: ["var(--font-inter)", ...fontFamily.sans],
        heading: ["var(--font-jakarta)", ...fontFamily.sans],
      },
      animation: {
        'blob': 'blob 7s infinite', // Animation douce pour les ronds en background
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;