import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tiffany: {
          DEFAULT: '#0ABAB5',
          light: '#33C4C0',
          dark: '#08968F',
        },
        primary: '#0ABAB5',
      },
    },
  },
  plugins: [],
};
export default config;
