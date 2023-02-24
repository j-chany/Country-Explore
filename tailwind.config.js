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
    backgroundImage: {
      space: "url('../public/auth.svg')",
    },
    colors: {
      "vagrao-pink": "#f47477",
      "match-blue": "#3c3fa3",
      ...colors,
    },
  },
  plugins: [],
};
