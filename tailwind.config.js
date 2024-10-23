/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      customFont: ['"Playwrite CU"', "sans-serif"],
      customFont1: ['"Roboto"', "sans-serif"],
      customFont2: ['"Poppins"', "sans-serif"]
      // Ensure fonts with spaces have " " surrounding it.
    },

  },
  plugins: [require("tailgrids/plugin", 'daisyui')],
}