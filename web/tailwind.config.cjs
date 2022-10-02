module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["Noto Sans"],
        nico: ["Nico Moji"],
      },
      colors: {
        background: "#10032B",
        accent: "#CB2BF3",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("/node_modules/flowbite/plugin.js")
  ],
};
``;
