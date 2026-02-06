/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        violet: {
          500: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ['"Outfit"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
