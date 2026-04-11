import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#E21F26",
          light: "#E64D52",
          dark: "#A9191D",
        },
        secondary: {
          DEFAULT: "#2E3192",
          light: "#423DB2",
          dark: "#242775",
        },
        accent: {
          DEFAULT: "#2E3192",
          muted: "#0e1e2e",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #05010d, #0e1e2e)',
      },
    },
  },
  plugins: [],
};
export default config;
