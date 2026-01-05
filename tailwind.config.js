/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primaryTxt: "#F1F1F1",
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /text-(left|right|center)/ },
    { pattern: /bg-(red|green|blue)-(100|200|300)/ },
    "opacity-100",
    "translate-y-0",
  ],
};
