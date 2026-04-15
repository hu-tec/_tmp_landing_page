import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#f3f6fc",
          100: "#e5ecf7",
          200: "#c3d1ea",
          300: "#8aa6d4",
          400: "#4c72b3",
          500: "#264d90",
          600: "#1a3a78",
          700: "#122c5f",
          800: "#0f2a5c",
          900: "#0b1e3f",
          950: "#07132a",
        },
        burgundy: {
          50:  "#fdf3f4",
          100: "#fbe4e8",
          200: "#f4b8c2",
          300: "#e98a9a",
          400: "#d9556c",
          500: "#b8334a",
          600: "#9a2438",
          700: "#8c1c2e",
          800: "#6b1424",
          900: "#4c0d19",
        },
        ink: "#0b1e3f",
        parchment: "#f8f6f1",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
        display: ["var(--font-noto)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
