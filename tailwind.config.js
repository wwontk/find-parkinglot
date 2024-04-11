/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-color": "#18253D",
        "point-color": "#576785",
      },
      maxWidth: {
        default: "24rem",
      },
    },
  },
  plugins: [],
};
