/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
            main: "#cf9425", // Gold color from the navigation text
            dark: "#0C1C19",
          },
          secondary: {
            main: "#FFFFFF", // White color for "Contact Us" text
            dark: "#0C1C19",
          },
          background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
            dark: "#0C1C19",
          },
          text: {
            primary: "#cf9425",
            secondary: "#FFFFFF",
            dark: "#0C1C19",
          },
      },
      animation: {
        bounce: 'bounce .5s infinite',
        bounce2: 'bounce2 .5s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}; 