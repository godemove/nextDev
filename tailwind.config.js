module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bgred: 'rgba(217, 85, 80, 1)',
      darkbg: 'rgba(119, 52, 49, 1)',
      card: 'rgba(255, 255, 255, 0.1)',
      btn: 'rgba(255, 255, 255, 0.2)',
      textwhite: 'rgba(255, 255, 255, 0.9)',
      btnactive: 'rgba(0, 0, 0, 0.15)',
      bigbtn: 'rgba(255, 255, 255, 0.2)',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        ds: ['digital-7', 'sans-mono'],
      },
    },
    plugins: [],
  },
};
