/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        default: "var(--default)",
      },
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
      dropShadow: {
        tooltip: "0px 4px 4px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   addUtilities({
    //     ".bg-default": {
    //       "background-image": "var(--default)",
    //     },
    //     ".bg-text-grad": {
    //       background:
    //         "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
    //       "background-clip": "text",
    //     },
    //   });
    // },
  ],
};
