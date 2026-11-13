/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12303B',
        mist: '#E9F0EE',
        paper: '#F8FAF9',
        line: '#B7C9C6',
        brand: '#1B5E73',
        brandDark: '#134556',
        ok: '#17694B',
        okBg: '#D7EDE1',
        atencao: '#7A4A00',
        atencaoBg: '#F8E7C2',
        alerta: '#A31F17',
        alertaBg: '#F6D9D5',
      },
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
