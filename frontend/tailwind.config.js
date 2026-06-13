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
  },

  colors: {

    brand: {

      dark: "#0F172A",

      primary: "#14B8A6",

      accent: "#F59E0B",

      light: "#F8FAFC",
    },
  },
},
  },
  plugins: [],
};