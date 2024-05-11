/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Correct content scan
    "./public/index.html",        // Include other content sources if needed
  ],
  theme: {
    extend: {
      // Additional theme customization here
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for better form styling
    // Add any other plugins here
  ],
};
