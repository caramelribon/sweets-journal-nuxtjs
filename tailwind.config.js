module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: "#f2ebe5",
        lightblue: "#717d7f",
        lightpink: "#c6ada6",
        navyblue: "#4f5666",
        navypink: "#a76e63",
        navybrown: "#927d6e",
        navygray: "#6d6d6d",
        lightgray: "#8d8985",
        lightgreen: "#969687",
        nvybrown: "#754035",
        lgtpink: "#ff8882",
        lgtyellow: "#efdc71",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
