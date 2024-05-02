import js from '@eslint/js'
import nodePlugin from 'eslint-plugin-n'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default [
  js.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  {
    rules: {
      'n/exports-style': ['error', 'module.exports'],
    },
  },
  prettierPlugin,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    ignores: ['_site/**/*', 'dist/**/*', 'public/**/*', 'src/_assets/**/*'],
  },
]
