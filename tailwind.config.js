/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'rosa-neon': '#FF1D6C', // Usando variáveis CSS
      },
    },
  },
  plugins: [],
};

