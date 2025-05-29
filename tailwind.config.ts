import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'secondary_blue': '#1351B4',
        'footer_blue': '#071D41',
        'text_color': 'rgb(51,51,51)',
        'green_color':'#00A91C'
      },
      fontFamily: {
        rawline: ['var(--font-rawline)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;