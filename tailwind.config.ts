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
        'secondary-blue': '#1351B4',
        'footer-blue':'#071D41'
      },
      fontFamily: {
        rawline: ['var(--font-rawline)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;