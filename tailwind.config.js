/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#333537',
        secondary: '#d0cfc6',
        tertiary: '#e1b61c',
      },
      fontFamily: {
        sans: ['Roboto Mono', 'monospace']
      }
    },
  },
  plugins: [],
}

