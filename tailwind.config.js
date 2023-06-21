/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,md,njk,svg}'],
  darkMode: 'class',
  corePlugins: {
    touchAction: false,
    ringOffsetWidth: false,
    ringOffsetColor: false,
    scrollSnapType: false,
    borderOpacity: false,
    textOpacity: false,
    fontVariantNumeric: false,
  },
  theme: {
    extend: {
      colors: {
        bgColor: 'var(--theme-bg)',
        textColor: 'var(--theme-text)',
        link: 'var(--theme-link)',
        accent: 'var(--theme-accent)',
        'accent-2': 'var(--theme-accent-2)',
      },
      fontFamily: {
        // Add any custom fonts here
        sans: ['Inter', ...fontFamily.sans],
        serif: [...fontFamily.serif],
        mono: ['Fira Mono', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
}
