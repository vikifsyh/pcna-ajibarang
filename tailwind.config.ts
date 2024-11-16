import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#01A54D",
          500: "#106A33",
        },
        secondary: {
          DEFAULT: "#FAE233",
          100: "#DFDF82",
        },
        neutral: {
          DEFAULT: "#E9EFE5",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
