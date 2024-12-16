import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '641px',
      // => @media (min-width: 640px) { ... }

      'md': '769px',
      // => @media (min-width: 768px) { ... }

      'lg': '1025px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1281px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1537px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true, // Center the container
        padding: {
          DEFAULT: '1rem', // Default padding
          sm: '2rem',
          md: "3rem",     // Padding for small screens
          lg: '4rem',      // Padding for large screens
          xl: '5rem',      // Padding for extra-large screens
          '2xl': '6rem',   // Padding for 2xl screens
        },
      },
      colors: {
        pearlWhite: '#F1F2ED',
        pureWhite: '#FFFFFF',
        burgundy: '#935073',
        lightBurgundy: '#FCF2F7',
        lightGray: '#DEE1E6',
        gray: '#EAEAEA',
        bgGray: '#F3F2F0',
        darkGray: '#858890',
        green: '#87C05A',
        red: '#FF3636',
        blackBerry: '#3F1F32',
        black: '#00031E',
        offBlack: '#222222',
        pureBlack: '#000000'
      }
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
