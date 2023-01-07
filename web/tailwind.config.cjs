module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 1s ease-in-out forwards",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(60px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      fontFamily: {
        default: ["Noto Sans"],
        nico: ["Nico Moji"],
        poppins: ["Poppins"],
        zenkaku: ["Press Start 2P"],
      },
      colors: {
        background: "#10032B",
        accent: "#CB2BF3",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
``;
