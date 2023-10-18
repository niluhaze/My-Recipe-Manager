/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ["'Bree Serif'", "Sans"]
    },
    extend: {
      colors: {
        "primary": "#407549",
        "primary-400": "#5A8D63",
        "primary-300": "#66916D",
        "background": "#E8E9E1",
        "components": "#F5F6F3",
        "components-translucent-500": "#F5F6F3A0",
        "gray-translucent-500": "#B0B0B0A0",
        "neutral-450": "#8B8B8B",
        "neutral-350": "#BCBCBC",
        "not-found": "#E0E0D7"
      }
    }
  },
  plugins: [
    // use "child:*class*" to make tailwind class affect children
    function ({ addVariant }) { 
        addVariant('child', '& > *');
    }
],
};