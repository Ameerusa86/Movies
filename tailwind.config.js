/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#090E17", // Page background color
        secondary: "#303D4F", // Card background color
        clean: "#F8F9FA", // Text color for high contrast
        accent: "#4AB9FF", // Accent color (optional for buttons, etc.)
      },
    },
  },
  plugins: [],
};
