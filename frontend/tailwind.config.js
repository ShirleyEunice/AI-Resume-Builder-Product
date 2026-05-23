/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {

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