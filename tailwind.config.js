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
        background: "#F2F7F8",
        paper: "#F2F7F8",
        ink: {
          DEFAULT: "#081126",
          muted: "#4C5A70",
        },
        electric: "#0C6DF8",
        cobalt: "#1A88F8",
        coral: "#FF806B",

        primary: {
          DEFAULT: "#0C6DF8",
          light: "#1A88F8",
          dark: "#0756C9",
        },

        // Textes
        text: {
          main: "#081126",
          muted: "#4C5A70",
        },

        // Surface: On adapte légèrement la bordure pour qu'elle ne jure pas avec le fond crème
        glass: {
          border: "rgba(255, 255, 255, 0.6)", // Bordure un peu plus visible
          surface: "rgba(255, 255, 255, 0.6)", // Surface laiteuse
        }
      },
      fontFamily: {
        heading: ['"Alexandria"', '"Cabinet Grotesk"', 'sans-serif'],
        display: ['"Alexandria"', '"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"Cabinet Grotesk"', ...fontFamily.sans],
        accent: ['"Swear Display"', 'serif'],
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
