/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'Open Sans', sans-serif",
        poppins: " 'Poppins', sans-serif",
        sfProDisplay: " 'SFProDisplay', sans-serif",
        ibmPlexSans: " 'IBM Plex Sans', sans-serif",
        comicSans: " 'Comic Sans', sans-serif",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-75%) scale(1.25)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1);",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      resize: ["focus"],
    },
  },
  plugins: [],
};

// font-family: 'Open Sans', sans-serif;
// font-family: '', sans-serif;
