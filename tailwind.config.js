/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xs: "300px",
      // => @media (min-width: 300px) { ... }

      sm: "600px",
      // => @media (min-width: 640px) { ... }

      md: "1000px",
      // => @media (min-width: 1024px) { ... }

      lg: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        logo: "url('assets/images/logo.png')",
      },
      textColor: {
        heading: "#191A1C",
      },
    },
  },
  plugins: [],
};
