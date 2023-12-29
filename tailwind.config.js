/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
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
        sans: ['Inter', defaultTheme.fontFamily.sans],
        serif: [defaultTheme.fontFamily.serif],
        mono: ['Fira Mono', defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
