import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E8A0BF',
          dark: '#D78BAA',
          vanilla: '#FDF8E1',
          matcha: '#D0E3C5',
          taro: '#E1D5E7',
          choco: '#8B5A2B',
          mint: '#C1E1C1',
          lemon: '#FFFACD',
          berry: '#FFD1DC'
        },
      },
    },
  },
  plugins: [],
};
export default config;
