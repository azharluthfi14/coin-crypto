/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#161a1e",
          800: "#1e2026",
          700: "#2a2d35",
          600: "#252930",
          500: "#444643",
        },
      },
    },
  },
  plugins: [],
};
