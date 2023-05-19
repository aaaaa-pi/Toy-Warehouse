/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
