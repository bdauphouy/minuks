/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				tertiary: '#e1b61c'
			},
			fontFamily: {
				sans: ['Roboto Mono', 'monospace']
			}
		}
	},
	plugins: []
};
