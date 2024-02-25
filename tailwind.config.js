/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        customGrey: "#333333"
      }
    },
  },
  plugins: [],
}

