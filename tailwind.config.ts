import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        dark: "var(--dark)",
        text: "var(--text)",
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite linear',
        gradient: 'gradient 3s ease infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        widthGrow: {
          '0%, 100%': { width: '0' },
          '50%': { width: '100px' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionDelay: {
        '0': '0ms',
        '300': '300ms',
        '600': '600ms',
        '900': '900ms',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: 'var(--text)',
            a: {
              color: 'var(--accent)',
              '&:hover': {
                color: theme('colors.accent/80'),
              },
            },
            h1: {
              color: 'var(--text)',
            },
            h2: {
              color: 'var(--text)',
            },
            h3: {
              color: 'var(--text)',
            },
            h4: {
              color: 'var(--text)',
            },
            code: {
              color: 'var(--accent)',
              backgroundColor: 'var(--foreground)',
              borderRadius: theme('borderRadius.md'),
              padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: 'var(--accent)',
              color: 'var(--text/80)',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;