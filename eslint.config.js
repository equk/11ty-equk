import js from '@eslint/js'
import nodePlugin from 'eslint-plugin-n'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
  js.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  {
    rules: {
      'n/exports-style': ['error', 'module.exports'],
      'n/no-process-exit': ['off', false],
    },
  },
  prettierPlugin,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    ignores: ['_site/**/*', 'dist/**/*', 'public/**/*', 'src/_assets/**/*'],
  },
]
