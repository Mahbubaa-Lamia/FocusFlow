/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          warm: '#FDFBF7', // Warm White
        },
        lavender: {
          light: '#EBF0FF', // Soft light tint
          DEFAULT: '#DCD6F7', // Soft Lavender
          dark: '#A6B1E1', // Deep Muted Lavender
        },
        mutedGray: '#7E7C84', // Muted Gray for text/icons
        darkText: '#2B2A2F', // Matte Black
      },
    },
  },
  plugins: [],
}