import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#EEF4F0",
          100: "#D5E5DA",
          200: "#A3C4A9",
          300: "#7A9E82",
          400: "#5B7F63",
          500: "#2D4A3E",
          600: "#1B3A2D",
          700: "#142B21",
          800: "#0D1C16",
          900: "#070E0B",
        },
        sand: {
          50: "#FAF7F3",
          100: "#F7F3ED",
          200: "#EDE7DE",
          300: "#E0D6CA",
          400: "#D9D0C7",
          500: "#C4A882",
          600: "#B5AA9F",
          700: "#9A8E82",
          800: "#6B5F54",
          900: "#4A4340",
        },
        bark: {
          DEFAULT: "#2A2520",
          light: "#3D352F",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
