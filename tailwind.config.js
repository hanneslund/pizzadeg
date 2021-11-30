const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      purple: colors.violet,
      pink: colors.pink,
    },
    extend: {
      boxShadow: {
        "zeit-xs": "0px 2px 4px rgba(0,0,0,0.1)",
        "zeit-sm": "0px 4px 8px rgba(0,0,0,0.12)",
        "zeit-md": "0 5px 10px rgba(0,0,0,0.12)",
        "zeit-lg": "0 8px 30px rgba(0,0,0,0.12)",
        "zeit-xl": "0 30px 60px rgba(0,0,0,0.12)",
        "zeit-hover": "0 30px 60px rgba(0,0,0,0.12)",
        "zeit-sticky": "0 12px 10px -10px rgba(0,0,0,0.12)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
