/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
    fontFamily: {
      'titillium':['Titillium Web']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

