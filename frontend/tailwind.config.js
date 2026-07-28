/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'Cambria', 'serif'],
      },

      colors: {
        // Teal Nocturne
        brand: {
          ink: "#0B1220",     // deep base — sidebar / dark panels
          dark: "#0B1220",    // alias (backward compatible with bg-brand-dark)
          primary: "#14B8A6", // teal — CTAs, focus, active
          aqua: "#2DD4BF",    // hover / glow
          sand: "#F5C97B",    // warm highlight on dark surfaces
          accent: "#E0A44D",  // legible warm gold for light surfaces
          cloud: "#F6F9FC",   // app background
          light: "#F6F9FC",   // alias (backward compatible with bg-brand-light)
        },
      },

      boxShadow: {
        brand: "0 10px 30px -12px rgba(20, 184, 166, 0.35)",
        soft: "0 8px 30px -12px rgba(11, 18, 32, 0.12)",
      },

      keyframes: {
        "cf-fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cf-fade-up": "cf-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
