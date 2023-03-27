const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--inter-font)", ...fontFamily.sans],
        serif: ["var(--inter-font)", ...fontFamily.serif],
        manrope: ["var(--manrope-font)", ...fontFamily.serif],
      },
      animation: {
        blob1: "blob1 40s infinite",
        blob2: "blob2 40s infinite",
        blob3: "blob3 40s infinite",
      },
      keyframes: {
        blob1: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "33%": { transform: "translateX(0.5%) translateY(1%) rotate(10deg)" },
          "66%": {
            transform: "translateX(-0.5%) translateY(1%) rotate(-10deg)",
          },
        },
        blob2: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "33%": {
            transform: "translateX(-1.5%) translateY(-0.3%) rotate(10deg)",
          },
          "66%": {
            transform: "translateX(-0.5%) translateY(1%) rotate(-10deg)",
          },
        },
        blob3: {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "33%": {
            transform: "translateX(-0.5%) translateY(0.5%) rotate(10deg)",
          },
          "66%": {
            transform: "translateX(1%) translateY(1.5%) rotate(-10deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
