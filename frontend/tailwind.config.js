/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#407549",
        "primary-light": "#5A8D63",
        background: "#E8E9E1",
        components: "#F5F6F3",
      }
    }
  },
  plugins: [],
};