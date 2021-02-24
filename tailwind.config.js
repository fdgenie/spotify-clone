module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "cards-background": "#181818",
        "cards-background-hover": "#282828"
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
