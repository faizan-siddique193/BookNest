/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50",
        secondary: "#FFFFFF",
        accent: "#E67E22",
        background: "#F9F9F9",
        text: "#2D2D2D",
        muted: "#7F8C8D",
        success: "#27AE60",
        danger: "#C0392B",
      },
    },
  },
  plugins: [],
};
