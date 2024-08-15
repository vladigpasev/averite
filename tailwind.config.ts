import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Exo2: ['Exo 2', 'serif'],
        Jura: ['Jura', 'serif'],
      },
      colors: {
        'primary-bg': '#f0ebe5',
        'secondary-bg': '#f1ece6',
        'accent-bg': '#f1f2eb',
        'highlight-bg': '#f3eee8',
        'muted-bg': '#f2ede7',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
