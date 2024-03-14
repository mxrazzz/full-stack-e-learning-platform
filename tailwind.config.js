module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your JavaScript/TypeScript files
    "./public/**/*.html", // Include HTML files if you use Tailwind classes in them
  ],
  theme: {
    extend: { cream: "#F5F5DC", darkGold: "#B08D57", gold: "#D4AF37" },
  },
  plugins: [],
};
