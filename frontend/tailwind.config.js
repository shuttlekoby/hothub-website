// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|avatar|button|card|dropdown|image|input|modal|navbar|tabs|divider|ripple|spinner|menu|popover|form).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};