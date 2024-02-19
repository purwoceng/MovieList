/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-600": "var(--neutral-600)",
        hero: "#F1F0FE",
        button: "#8170F2",
        button1: "#F1F0FE",
      },

      fontFamily: {
        "paragraph-default": "var(--paragraph-default-font-family)",
        "text-single-200-regular": "var(--text-single-200-regular-font-family)",
      },
    },
  },
  plugins: [],
};
