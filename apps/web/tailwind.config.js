/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      colors: {
        primary: "#7216F4",
        secondary: "#eab308",
        bg: "#f9fafb",
        darkBg: "#181818",
        error: "#ef4444",
      },
    },
  },
  darkMode: "class",
};
