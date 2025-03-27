module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode using class
    theme: {
      extend: {},
    },
    plugins: [],
  }


<antArtifact identifier="tailwind-config" type="application/vnd.ant.code" language="javascript" title="Updated Tailwind Config">
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables class-based dark mode
  theme: {
    extend: {
      // You can add custom dark mode colors here if needed
    },
  },
  plugins: [],
}
  