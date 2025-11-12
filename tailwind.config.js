const { semanticColors } = require('./app/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Add this line for dark mode
  theme: {
    extend: {
      colors: {
        ...semanticColors, // Merge semantic colors
        danger: "#e3342f", // Keep existing danger color
      },
    },
  },
  plugins: [],
}
