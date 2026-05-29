/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      boxShadow: {
        'lux-panel': '0 25px 70px -35px rgba(0, 0, 0, 0.55)',
        'lux-panel-hover': '0 35px 90px -40px rgba(0, 0, 0, 0.6)',
        'lux-title': '0 10px 28px -18px rgba(0, 0, 0, 0.6)',
        'lux-chip': '0 8px 20px -14px rgba(0, 0, 0, 0.6)',
        'lux-card': '0 20px 50px -30px rgba(0, 0, 0, 0.6)',
        'lux-menu': '0 20px 60px -35px rgba(0, 0, 0, 0.7)',
        'lux-table': '0 18px 60px -30px rgba(0, 0, 0, 0.45)',
        'lux-table-modern': '0 18px 55px -28px rgba(15, 23, 42, 0.45)',
        'lux-details': '0 12px 40px -30px rgba(0, 0, 0, 0.45)',
        'lux-details-dark': '0 12px 40px -30px rgba(15, 23, 42, 0.45)',
      },
      colors: {
        primary: {
          DEFAULT: "#2fa2dc", 
          dark: "#4fc2fc",
        },
        BgPrimary: {
          DEFAULT: "#EAF6FC", 
          dark: "rgb(94,94,93)",
        },
        titleText: {
          DEFAULT: "#606060", 
          dark: "#dcdcdc", 
        },
        redError: {
          DEFAULT: "#ff0000", 
          dark: "#ff4d4d",
        },
        GreenError: {
          DEFAULT: "rgb(38,250,175)", 
          dark: "rgb(38,250,175)",
        },
        bgColor: {
          DEFAULT: "#F4F3F2",
          dark: "#2B3037",
        },
        boxColor: {
          DEFAULT: "#FFFFFF",
          dark: "#494b50",
        },
        bgHoverColor: {
          DEFAULT: "#FBFAFA",
          dark: "#444444",
        },
        boxBorderColor: {
          DEFAULT: "#D8D8D8",
          dark: "#6B6E74",
        },
        boxColor2: {
          DEFAULT: "#54565C",
          dark: "#494b50",
        },
        boxBorderColor2: {
          DEFAULT: "#D8D8D8",
          dark: "#6B6E74",
        },
        buttonColor: {
          DEFAULT: "#FFFFFF",
          dark: "#54565C",
        },
        buttonBorderColor: {
          DEFAULT: "#ededed",
          dark: "#6B6E74",
        },
        buttonSelectedColor: {
          DEFAULT: "#eaf6fc",
          dark: "#54565C",
        },
        buttonSelectedBorderColor: {
          DEFAULT: "#9fd4ef",
          dark: "#2fa2dc",
        },
        'blue-grad-start': '#63C3FF',
        'blue-grad-end': '#4BA5FF',
        'red-grad-start': '#F87171',
        'red-grad-end': '#DC2626',
        'yellow-grad-start': '#FDE047',
        'yellow-grad-end': '#CA8A04',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};