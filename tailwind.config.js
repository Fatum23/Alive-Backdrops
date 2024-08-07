/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "var(--default)",
        light: "var(--light)",
        dark: "var(--dark)",
        text: "var(--text)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        link: "var(--link)",
      },
      animation: {
        loading: "spin 1s linear infinite",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
