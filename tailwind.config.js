/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'WorkSansRegular': ['Work Sans', 'sans-serif'],
        'WorkSansMedium': ['Work Sans Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

