/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0a08",
          800: "#110f0b",
          700: "#16130d",
          600: "#1e1810",
        },
        gold: {
          DEFAULT: "#d4af37",
          bright: "#f4d87a",
          deep: "#a87c2e",
        },
        champagne: "#ecdcae",
        ivory: "#f3ecdd",
        ash: "#b3a892",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        deco: "0.42em",
      },
      boxShadow: {
        gold: "0 24px 60px -22px rgba(212, 175, 55, 0.45)",
        "gold-sm": "0 0 0 1px rgba(212,175,55,0.18), 0 14px 36px -18px rgba(212,175,55,0.4)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(105deg, #a87c2e, #f4d87a 45%, #d4af37 70%, #ecdcae)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};