/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans:"'Open Sans', sans-serif",
        poppins:" 'Poppins', sans-serif",
        sfProDisplay:" 'SFProDisplay', sans-serif"
      }
    }
  },
  variants:{
    extend:{
      resize:['focus'],
    },
  },
  plugins: [],
}

// font-family: 'Open Sans', sans-serif;
// font-family: '', sans-serif;
