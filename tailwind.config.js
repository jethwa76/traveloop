/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#102033",
          sky: "#2f80ed",
          teal: "#19a7a8",
          coral: "#ff7a59",
          mint: "#63d6ad",
        },
      },
      boxShadow: {
        soft: "0 16px 45px -24px rgba(15, 23, 42, 0.45)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
