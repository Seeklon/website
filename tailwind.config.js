/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        seeklon: {
          blue: '#2563EB', // Inspired by logo blue
          dark: '#1E293B',
          light: '#F3F4F6',
          teal: '#14B8A6',
        }
      },
    },
  },
  plugins: [],
}
