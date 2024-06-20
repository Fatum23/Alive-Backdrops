/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				default: 'var(--default)',
				light: 'var(--light)',
				dark: 'var(--dark)',
				text: 'var(--text)',
				yellow: 'var(--yellow)',
				'dark-yellow': 'var(--dark-yellow)',
			},
			animation: {
				loading: 'spin 1s linear infinite',
			},
		},
	},
	plugins: [],
}
