/** @type {import('tailwindcss').Config} */
// tailwind default colors
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    ,
  ],
  theme: {
    extends: {},
    colors: {
      "vagrao-pink": "#f47477",
      ...colors,
    },
  },
  plugins: [],
};
