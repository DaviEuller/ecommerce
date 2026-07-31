/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        illury: {
          dourado: {
            DEFAULT: '#fef08a',
            escuro: '#ca8a04'
          },
          verde: {
            DEFAULT: '#4ec99c',
            escuro: '#166534'
          },
          marrom: {
            DEFAULT: '#918d8b',
            escuro: '#44403c'
          },
          beje: {
            DEFAULT: '#fef3c7',
            escuro: '#78350f'
          },
          pessego: {
            DEFAULT: '#ffdab9',
            escuro: '#9a3412'
          }
        }
      }
    },
  },
  plugins: [],
}
