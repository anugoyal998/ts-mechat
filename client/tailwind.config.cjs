/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mBlack: {
          "100": "#16161B",
          "300": "#0A0A11"
        },
        mOrange: "#FD5831",
        mPurple: "#621BE3"
      }
    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar-hide')],
  important: true
}
