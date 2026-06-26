/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  safelist: [
    // greens — ApplicationStatusBadge, MatchBar, ScoreBadge
    "bg-green-50", "text-green-700", "text-green-600", "bg-green-500",
    // blues
    "bg-blue-50", "text-blue-700", "text-blue-600", "bg-blue-500",
    // purples
    "bg-purple-50", "text-purple-700", "text-purple-600",
    // ambers
    "bg-amber-50", "text-amber-700", "text-amber-600", "bg-amber-500",
    // reds
    "bg-red-50", "text-red-700", "text-red-600",
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
        "brand-green": "#16A34A",
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