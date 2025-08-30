/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./**/*.{js,ts,jsx,tsx}",   // add this to cover ALL folders and apply all styles
],

  theme: {
    extend: {},
  },
  plugins: [],
}
