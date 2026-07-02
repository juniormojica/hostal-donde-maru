/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1180px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        terracotta: "#804240",
        cream: "#FFF8EA",
        mustard: "#FFC107",
        caribbeanGreen: "#4CAF50",
        clay: "#5E302E",
        warmStone: "#F5F0E8",
        ink: "#2A1D1B",
        primaryGray: "#804240",
        secondaryYellow: "#FFC107",
        accentGreen: "#4CAF50",
        lightGray: "#F5F5F5",
        darkGray: "#757575",
        white: "#FFFFFF", // Blanco
        heroText:'#804240'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"], // Agregamos Poppins como fuente personalizada
      },
    },
  },
  plugins: [],
}

