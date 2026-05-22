/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        background: "#F8F7F4",
        stone: "#F0EDE7",
        border: "#E8E4DD",
        primary: "#1A1916",
        muted: "#6B6760",
        accent: "#2563EB",
        green: "#16A34A",
      },

      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },

      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.06)",
        medium: "0 2px 8px rgba(0,0,0,.08),0 12px 32px rgba(0,0,0,.08)",
      },

      borderRadius: {
        card: "16px",
      },

    },
  },

  plugins: [],
}